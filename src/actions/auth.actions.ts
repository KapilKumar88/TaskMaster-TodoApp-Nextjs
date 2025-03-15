"use server";

import { FormState } from "@/lib/types";
import { registerSchema } from "@/validationsSchemas/auth.validation";

export async function registerServerAction(
  state: FormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = registerSchema.safeParse({
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    password: formData.get("password") ?? "",
    confirmPassword: formData.get("confirmPassword") ?? "",
  });

  console.log(state, ">>>>>>>>>>>>lklkkllkklstate");

  // console.log(validatedFields?.error, formData, ">>>>>>>>>>>>>>>lklkkllkkl");

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    const tempErrors = validatedFields.error.flatten().fieldErrors;
    console.log(tempErrors, ">>>>>>>>>tempErrors>>>>>>>>>>>>>>>>>>");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log(
    validatedFields.data,
    ">>>>>>>>>validatedFields.data>>>>>>>>>>>>>>>>>>"
  );
}
