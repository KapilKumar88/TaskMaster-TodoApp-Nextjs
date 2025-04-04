'use server';
import 'server-only';

import { auth, signIn, signOut } from '@/auth';
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
} from '@/validationsSchemas/auth.validation';
import { AuthError } from 'next-auth';
import {
  ChangePasswordState,
  LoginFormState,
  RegisterFormState,
} from '@/lib/interfaces/server-action.interface';
import { changePassword } from '@/services/user.service';

export async function registerUserServerAction(
  state: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  try {
    const getFormPayload = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
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
        message: 'Validation error',
      };
    }

    await signIn('credentialsSignUp', {
      fullName: validatedFields.data.fullName,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });

    return {
      success: true,
      message: 'Registered successfully',
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          error instanceof AuthError
            ? error.message
            : 'Something went wrong. Please try again',
      },
      success: false,
      message: 'Server error',
    };
  }
}

export async function loginUserServerAction(
  state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  try {
    const getFormPayload = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validatedFields = loginSchema.safeParse({
      email: getFormPayload.email,
      password: getFormPayload.password,
    });

    if (!validatedFields.success) {
      return {
        ...state,
        errors: validatedFields.error.flatten().fieldErrors,
        formValues: {
          email: getFormPayload.email,
        },
        success: false,
        message: 'Validation error',
      };
    }

    await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });

    return {
      success: true,
      message: 'Login successful',
    };
  } catch (error) {
    let errorMsg = 'Something went wrong. Please try again';
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        errorMsg = error.cause.err.message;
      }
      if (error.type == 'CredentialsSignin') {
        errorMsg = 'Invalid credentials';
      }
    }

    return {
      ...state,
      errors: {
        general: errorMsg,
      },
      success: false,
      message: 'Server error',
    };
  }
}

export async function signoutServerAction(redirectTo?: string) {
  await signOut({
    redirect: true,
    redirectTo: redirectTo ?? '/login',
  });
}

export async function changePasswordAction(
  state: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  try {
    const userSession = await auth();

    if (!userSession?.user.id) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    const getFormPayload = {
      currentPassword: formData.get('currentPassword') as string,
      newPassword: formData.get('newPassword') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    const validatedFields = changePasswordSchema.safeParse({
      currentPassword: getFormPayload.currentPassword,
      newPassword: getFormPayload.newPassword,
      confirmPassword: getFormPayload.confirmPassword,
    });

    if (!validatedFields.success) {
      return {
        ...state,
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
        message: 'Validation error',
      };
    }

    await changePassword({
      userId: userSession?.user.id,
      currentPassword: validatedFields.data.currentPassword,
      newPassword: validatedFields.data.newPassword,
    });

    return {
      success: true,
      errors: {},
      message: 'Password changed successfully',
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as { message: string })?.message ??
          'Something went wrong. Please try again',
      },
      success: false,
      message: 'Server error',
    };
  }
}
