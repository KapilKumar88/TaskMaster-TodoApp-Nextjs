import { TaskPriority, WeekStartDay } from "@prisma/client";

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

export interface UpdateTaskFormState extends ServerActionInterface {
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
    taskId?: string;
    title?: string;
    description?: string;
    categoryId?: string;
    priority?: TaskPriority;
    dueDate?: string;
    dueTime?: string;
    isImportant?: boolean;
    markAsCompleted?: boolean;
  };
}

export interface GeneralSettingsFormState extends ServerActionInterface {
  errors?: {
    timeZone?: string[];
    dateFormat?: string[];
    weekStartDay?: string[];
    autoArchive?: string[];
    autoArchiveTime?: string[];
    timeFrequency?: string[];
    general?: string[] | string;
  };
  formValues?: {
    timeZone: string;
    dateFormat: string;
    weekStartDay: WeekStartDay;
    autoArchive: boolean;
    autoArchiveTime: string | null;
  };
}
