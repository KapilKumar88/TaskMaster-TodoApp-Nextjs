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
} from '@/services/task.service';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

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
      markAsDraft: (formData.get('markAsDraft') as string) === 'true',
    };

    const validatedFields = createTaskSchema.safeParse({
      title: getFormPayload.title,
      description: getFormPayload.description,
      categoryId: parseInt(getFormPayload.categoryId),
      priority: getFormPayload.priority,
      dueDate: new Date(getFormPayload.dueDate),
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

    await createTask({
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      categoryId: validatedFields.data.categoryId,
      priority: validatedFields.data.priority,
      dueDate: validatedFields.data.dueDate,
      status: getFormPayload.markAsDraft ? TaskStatus.DRAFT : TaskStatus.ACTIVE,
      userId: userSession?.user?.id,
    });

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
      markAsCompleted: (formData.get('markAsCompleted') as string) === 'true',
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
      markAsCompleted: getFormPayload.markAsCompleted,
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

    // await createTask({
    //   title: validatedFields.data.title,
    //   description: validatedFields.data.description,
    //   categoryId: validatedFields.data.categoryId,
    //   priority: validatedFields.data.priority,
    //   dueDate: validatedFields.data.dueDate,
    //   status: getFormPayload.markAsDraft ? TaskStatus.DRAFT : TaskStatus.ACTIVE,
    //   userId: userSession?.user?.id,
    // });

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
