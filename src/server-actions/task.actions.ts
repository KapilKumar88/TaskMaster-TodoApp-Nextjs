'use server';
import 'server-only';

import {
  CreateTaskFormState,
  UpdateTaskFormState,
} from '@/lib/interfaces/server-action.interface';
import {
  createTaskSchema,
  updateTaskSchema,
} from '@/validationsSchemas/task.validation';
import { TaskPriority, TaskStatus } from '@prisma/client';
import {
  changeTaskStatus,
  createTask,
  markTaskImportant as starTask,
  deleteTask as deleteTaskQuery,
  updateTask,
} from '@/services/task.service';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import moment from 'moment';
import { WORKER_QUEUE } from '@/lib/constants';
import { processTaskQueue } from '@/lib/queue/bullmq-queue';
import appConfig from '@/config/app.config';

export async function createTaskServerAction(
  state: CreateTaskFormState,
  formData: FormData,
): Promise<CreateTaskFormState> {
  try {
    const getFormPayload = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      categoryId:
        formData.get('categoryId') === ''
          ? '0'
          : (formData.get('categoryId') as string),
      priority: formData.get('priority') as TaskPriority,
      dueDate: formData.get('dueDate') as string,
      dueTime: formData.get('dueTime') as string,
      markAsDraft: (formData.get('markAsDraft') as string) === 'true',
    };

    const validatedFields = createTaskSchema.safeParse({
      title: getFormPayload.title,
      description: getFormPayload.description,
      categoryId: parseInt(getFormPayload.categoryId),
      priority: getFormPayload.priority,
      dueDate: new Date(getFormPayload.dueDate),
      dueTime: getFormPayload.dueTime,
    });

    if (!validatedFields.success) {
      return {
        ...state,
        errors: validatedFields.error.flatten().fieldErrors,
        formValues: getFormPayload,
        success: false,
        message: 'Validation error',
      };
    }

    const userSession = await auth();
    if (!userSession?.user?.id) {
      throw new Error('User not found');
    }

    const dueTime = validatedFields.data.dueTime.split(':');
    const taskDueDateTime = moment(validatedFields.data.dueDate).set({
      hour: parseInt(dueTime[0] ?? '23'),
      minute: parseInt(dueTime[1] ?? '59'),
      second: parseInt(dueTime[2] ?? '59'),
    });

    const task = await createTask({
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      categoryId: validatedFields.data.categoryId,
      priority: validatedFields.data.priority,
      dueDateTime: taskDueDateTime.toDate(),
      status: getFormPayload.markAsDraft ? TaskStatus.DRAFT : TaskStatus.ACTIVE,
      userId: userSession?.user?.id,
    });

    if (task.id && TaskStatus.DRAFT !== task.status) {
      processTaskQueue.add(
        WORKER_QUEUE.QUEUE_NAMES.PROCESS_TASK,
        {
          taskId: task.id,
          userId: userSession?.user?.id,
        },
        {
          delay: appConfig.PROCESS_TASK_DELAY,
          attempts: 3,
          backoff: { type: 'exponential', delay: 60000 },
          removeOnComplete: true,
          removeOnFail: false,
        },
      );
    }

    revalidatePath('/dashboard');
    revalidatePath('/tasks');
    revalidatePath('/analytics');

    return {
      success: true,
      message: 'Task Created Successfully',
      formValues: {
        title: '',
        description: '',
        categoryId: '',
        priority: TaskPriority.LOW,
        dueDate: '',
      },
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? 'Something went wrong. Please try again',
      },
      success: false,
      message: 'Server error',
    };
  }
}

export async function updateTaskServerAction(
  state: UpdateTaskFormState,
  formData: FormData,
): Promise<UpdateTaskFormState> {
  try {
    const getFormPayload = {
      taskId:
        formData.get('taskId') === ''
          ? '0'
          : (formData.get('taskId') as string),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      categoryId:
        formData.get('categoryId') === ''
          ? '0'
          : (formData.get('categoryId') as string),
      priority: formData.get('priority') as TaskPriority,
      status: formData.get('status') as TaskStatus,
      dueDate: formData.get('dueDate') as string,
      markTaskImportant:
        (formData.get('markTaskImportant') as string) === 'true',
    };

    const validatedFields = updateTaskSchema.safeParse({
      taskId: parseInt(getFormPayload.taskId),
      title: getFormPayload.title,
      description: getFormPayload.description,
      categoryId: parseInt(getFormPayload.categoryId),
      priority: getFormPayload.priority,
      status: getFormPayload.status,
      dueDate: new Date(getFormPayload.dueDate),
      markTaskImportant: getFormPayload.markTaskImportant,
    });

    if (!validatedFields.success) {
      return {
        ...state,
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
        message: 'Validation error',
      };
    }

    const userSession = await auth();
    if (!userSession?.user?.id) {
      throw new Error('User not found');
    }

    await updateTask({
      userId: userSession?.user?.id,
      taskId: validatedFields.data.taskId,
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      categoryId: validatedFields.data.categoryId,
      priority: validatedFields.data.priority,
      dueDateTime: validatedFields.data.dueDate,
      status: validatedFields.data.status,
      markAsImportant: validatedFields.data.markTaskImportant,
    });

    revalidatePath('/dashboard');
    revalidatePath('/tasks');
    revalidatePath('/analytics');

    return {
      success: true,
      message: 'Task updated Successfully',
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? 'Something went wrong. Please try again',
      },
      success: false,
      message: 'Server error',
    };
  }
}

export async function makeTaskCompleted(
  state: UpdateTaskFormState,
  formData: FormData,
): Promise<UpdateTaskFormState> {
  try {
    const userSession = await auth();
    if (!userSession?.user?.id) {
      throw new Error('User not found');
    }
    const getFormPayload = {
      taskId: parseInt(formData.get('taskId') as string),
      markAsCompleted: formData.get('markAsCompleted') as string,
    };

    const updatedTask = await changeTaskStatus(
      getFormPayload.taskId,
      userSession?.user.id,
      getFormPayload.markAsCompleted === 'true'
        ? TaskStatus.COMPLETED
        : TaskStatus.ACTIVE,
    );
    revalidatePath('/dashboard');

    return {
      success: true,
      message: `Task marked as ${getFormPayload.markAsCompleted === 'true' ? 'completed' : 'active'}`,
      formValues: {
        markAsCompleted: updatedTask.status === TaskStatus.COMPLETED,
      },
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? 'Something went wrong. Please try again',
      },
      success: false,
      message: 'Server error',
    };
  }
}

export async function markTaskImportant(
  state: UpdateTaskFormState,
  formData: FormData,
): Promise<UpdateTaskFormState> {
  try {
    const userSession = await auth();
    if (!userSession?.user?.id) {
      throw new Error('User not found');
    }
    const getFormPayload = {
      taskId: parseInt(formData.get('taskId') as string),
      markAsImportant: (formData.get('markAsImportant') as string) === 'true',
    };

    const updatedTask = await starTask(
      getFormPayload.taskId,
      getFormPayload.markAsImportant,
      userSession?.user.id,
    );
    revalidatePath('/dashboard');

    return {
      success: true,
      message: `Task marked as ${getFormPayload.markAsImportant ? 'important' : 'not important'}`,
      formValues: {
        markAsImportant: updatedTask.markAsImportant,
      },
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? 'Something went wrong. Please try again',
      },
      success: false,
      message: 'Server error',
    };
  }
}

export async function deleteTask(
  state: UpdateTaskFormState,
  formData: FormData,
): Promise<UpdateTaskFormState> {
  try {
    const userSession = await auth();
    if (!userSession?.user?.id) {
      throw new Error('User not found');
    }
    const getFormPayload = {
      taskId: parseInt(formData.get('taskId') as string),
    };
    await deleteTaskQuery(getFormPayload.taskId, userSession?.user.id);
    revalidatePath('/dashboard');
    return {
      success: true,
      message: 'Task deleted successfully',
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? 'Something went wrong. Please try again',
      },
      success: false,
      message: 'Server error',
    };
  }
}
