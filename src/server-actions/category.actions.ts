'use server';
import 'server-only';

import { auth } from '@/auth';
import { AddCategoryFormState } from '@/lib/interfaces/server-action.interface';
import { createCategory } from '@/services/category.service';
import { addCategorySchema } from '@/validationsSchemas/category.validation';

export async function addNewCategoryAction(
  state: AddCategoryFormState,
  formData: FormData,
): Promise<AddCategoryFormState> {
  try {
    const userSession = await auth();

    if (!userSession?.user.id) {
      return {
        success: false,
        message: 'Unauthorized',
      };
    }

    const validatedFields = addCategorySchema.safeParse({
      categoryName: formData.get('categoryName') as string,
      categoryColor: formData.get('categoryColor') as string,
    });

    if (!validatedFields.success) {
      return {
        ...state,
        errors: validatedFields.error.flatten().fieldErrors,
        success: false,
        message: 'Validation error',
      };
    }

    const newCategory = await createCategory({
      userId: userSession.user.id,
      name: validatedFields.data.categoryName,
      color: validatedFields.data.categoryColor,
    });

    return {
      success: true,
      errors: {},
      formValues: {
        categoryName: newCategory.name,
        categoryColor: newCategory.color,
        id: newCategory.id,
      },
      message: 'Category added successfully',
    };
  } catch (error) {
    return {
      ...state,
      errors: {
        general:
          (error as Error)?.message ?? 'Something went wrong. Please try again',
      },
      success: false,
      message: 'Server error',
    };
  }
}
