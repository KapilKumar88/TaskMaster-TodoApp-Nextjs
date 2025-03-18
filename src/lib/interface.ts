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
