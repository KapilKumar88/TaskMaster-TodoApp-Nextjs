import { TaskPriority, TaskStatus, WeekStartDay } from '@prisma/client';

export interface ServerActionInterface {
  message: string;
  success: boolean;
  errors?: Record<string, unknown> | { general?: string };
  formValues?: Record<string, unknown>;
}

export interface RegisterFormState extends ServerActionInterface {
  errors?: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string;
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

export interface ForgotPasswordFormState extends ServerActionInterface {
  errors?: {
    email?: string[];
    general?: string;
  };
  formValues?: {
    email: string;
  };
}

export interface ResetPasswordState extends ServerActionInterface {
  errors?: {
    password?: string[];
    confirmPassword?: string[];
    token?: string[];
    general?: string;
  };
}

export interface ChangePasswordState extends ServerActionInterface {
  errors?: {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
    general?: string;
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
    general?: string;
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
    taskId?: string[];
    title?: string[];
    description?: string[];
    categoryId?: string[];
    priority?: string[];
    status?: string[];
    dueDate?: string[];
    dueTime?: string[];
    general?: string;
  };
  formValues?: {
    taskId?: number;
    title?: string;
    description?: string;
    categoryId?: string;
    priority?: TaskPriority;
    dueDate?: string;
    dueTime?: string;
    markAsImportant?: boolean;
    markAsCompleted?: boolean;
    status?: TaskStatus;
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
    general?: string;
  };
  formValues?: {
    timeZone: string;
    dateFormat: string;
    weekStartDay: WeekStartDay;
    autoArchive: boolean;
    autoArchiveTime: string | null;
  };
}

export interface AppearanceSettingsFormState extends ServerActionInterface {
  errors?: {
    general?: string;
  };
}

export interface ResendVerificationMailFormState extends ServerActionInterface {
  errors?: {
    general?: string;
  };
}

export interface NotificationsSettingsFormState extends ServerActionInterface {
  errors?: {
    general?: string;
  };
}

export interface AddCategoryFormState extends ServerActionInterface {
  errors?: {
    categoryName?: string[];
    categoryColor?: string[];
    general?: string;
  };
  formValues?: {
    categoryName: string;
    categoryColor: string;
    id?: number;
  };
}
