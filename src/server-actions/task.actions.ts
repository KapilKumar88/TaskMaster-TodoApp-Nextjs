"use server";
import "server-only";

import {
  CreateTaskFormState,
  UpdateTaskFormState,
} from "@/lib/interfaces/server-action.interface";
import { createTaskSchema } from "@/validationsSchemas/task.validation";
import { TaskPriority, TaskStatus } from "@prisma/client";
import {
  changeTaskStatus,
  createTask,
  markTaskImportant as starTask,
  deleteTask as deleteTaskQuery,
} from "@/services/task.service";
import { auth } from "@/auth";

export async function createTaskServerAction(
  state: CreateTaskFormState,
  formData: FormData
): Promise<CreateTaskFormState> {
  try {
    const getFormPayload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      categoryId:
        formData.get("categoryId") === ""
          ? "0"
          : (formData.get("categoryId") as string),
      priority: formData.get("priority") as TaskPriority,
      dueDate: formData.get("dueDate") as string,
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
        message: "Validation error",
      };
    }

    const userSession = await auth();
    if (!userSession?.user?.id) {
      throw new Error("User not found");
    }

    await createTask({
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      categoryId: validatedFields.data.categoryId,
      priority: validatedFields.data.priority,
      dueDate: validatedFields.data.dueDate,
      status: TaskStatus.ACTIVE,
      userId: userSession?.user?.id,
    });

    return {
      success: true,
      message: "Task Created Successfully",
      formValues: {
        title: "",
        description: "",
        categoryId: "",
        priority: TaskPriority.LOW,
        dueDate: "",
      },
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? "Something went wrong. Please try again",
      },
      success: false,
      message: "Server error",
    };
  }
}

export async function makeTaskCompleted(
  state: UpdateTaskFormState,
  formData: FormData
): Promise<UpdateTaskFormState> {
  try {
    const userSession = await auth();
    const getFormPayload = {
      taskId: parseInt(formData.get("taskId") as string),
      status: formData.get("status") as string,
    };
    await changeTaskStatus(
      getFormPayload.taskId,
      userSession?.user.id,
      getFormPayload.status
    );
    return {
      success: true,
      message: "Task marked as completed",
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? "Something went wrong. Please try again",
      },
      success: false,
      message: "Server error",
    };
  }
}

export async function markTaskImportant(
  state: UpdateTaskFormState,
  formData: FormData
): Promise<UpdateTaskFormState> {
  try {
    const userSession = await auth();
    const getFormPayload = {
      taskId: parseInt(formData.get("taskId") as string),
      isImportant:
        (formData.get("isImportant") as string) === "true" ? true : false,
    };
    await starTask(
      getFormPayload.taskId,
      getFormPayload.isImportant,
      userSession?.user.id
    );
    return {
      success: true,
      message: "Task marked as important",
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? "Something went wrong. Please try again",
      },
      success: false,
      message: "Server error",
    };
  }
}

export async function deleteTask(
  state: UpdateTaskFormState,
  formData: FormData
): Promise<UpdateTaskFormState> {
  try {
    const userSession = await auth();
    const getFormPayload = {
      taskId: parseInt(formData.get("taskId") as string),
    };
    await deleteTaskQuery(getFormPayload.taskId, userSession?.user.id);
    return {
      success: true,
      message: "Task deleted successfully",
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? "Something went wrong. Please try again",
      },
      success: false,
      message: "Server error",
    };
  }
}
