import { TaskPriority } from "@prisma/client";

export interface ServerActionInterface {
  message: string;
  success: boolean;
  errors?: unknown;
  formValues?: unknown;
}

export interface RegisterFormState extends ServerActionInterface {
  errors?: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string[] | string;
  };
  formValues?: {
    fullName: string;
    email: string;
  };
}

export interface LoginFormState extends ServerActionInterface {
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[] | string;
  };
  formValues?: {
    email: string;
  };
}

export interface CreateTaskFormState extends ServerActionInterface {
  errors?: {
    title?: string[];
    description?: string[];
    categoryId?: string[];
    priority?: string[];
    dueDate?: string[];
    dueTime?: string[];
    general?: string[] | string;
  };
  formValues?: {
    title: string;
    description: string;
    categoryId: string;
    priority: TaskPriority;
    dueDate: string;
    dueTime?: string;
  };
}


