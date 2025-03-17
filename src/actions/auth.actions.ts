"use server";

import { signIn } from "@/auth";
import { FormState } from "@/lib/types";
import { registerSchema } from "@/validationsSchemas/auth.validation";

export async function registerUserServerAction(
  state: FormState,
  formData: FormData
): Promise<FormState> {
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
