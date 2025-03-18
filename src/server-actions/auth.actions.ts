"use server";

import { signIn } from "@/auth";
import { LoginFormState, RegisterFormState } from "@/lib/interface";
import {
  loginSchema,
  registerSchema,
} from "@/validationsSchemas/auth.validation";

export async function registerUserServerAction(
  state: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  try {
    const getFormPayload = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const validatedFields = registerSchema.safeParse({
      fullName: getFormPayload.fullName,
      email: getFormPayload.email,
      password: getFormPayload.password,
      confirmPassword: getFormPayload.confirmPassword,
    });

    if (!validatedFields.success) {
      return {
        ...state,
        errors: validatedFields.error.flatten().fieldErrors,
        formValues: {
          fullName: getFormPayload.fullName,
          email: getFormPayload.email,
        },
        success: false,
        message: "Validation error",
      };
    }

    await signIn("credentialsSignUp", {
      fullName: getFormPayload.fullName,
      email: getFormPayload.email,
      password: getFormPayload.password,
      redirect: false,
    });

    return {
      success: true,
      message: "Registered successfully",
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general: "Something went wrong. Please try again",
      },
      success: false,
      message: "Server error",
    };
  }
}

export async function loginUserServerAction(
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  try {
    const getFormPayload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validatedFields = loginSchema.safeParse({
      email: getFormPayload.email,
      password: getFormPayload.password,
    });
    console.log(validatedFields, '>>>>>>>>>validatedFields>>>>>>');

    if (!validatedFields.success) {
      return {
        ...state,
        errors: validatedFields.error.flatten().fieldErrors,
        formValues: {
          email: getFormPayload.email,
        },
        success: false,
        message: "Validation error",
      };
    }

    await signIn("credentials", {
      email: getFormPayload.email,
      password: getFormPayload.password,
      redirect: false,
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general: "Something went wrong. Please try again",
      },
      success: false,
      message: "Server error",
    };
  }
}
