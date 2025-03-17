export type FormState =
  | {
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
      message: string;
      success: boolean;
    }
  | undefined;
