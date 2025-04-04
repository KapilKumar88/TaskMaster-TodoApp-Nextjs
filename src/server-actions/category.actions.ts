'use server';
import 'server-only';

import { auth } from '@/auth';
import { AddCategoryFormState } from '@/lib/interfaces/server-action.interface';
import { createCategory } from '@/services/category.service';

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

    const newCategory = await createCategory({
      userId: userSession.user.id,
      name: formData.get('categoryName') as string,
      color: formData.get('categoryColor') as string,
    });

    return {
      success: true,
      errors: {},
      formValues: {
        name: newCategory.name,
        color: newCategory.color,
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
