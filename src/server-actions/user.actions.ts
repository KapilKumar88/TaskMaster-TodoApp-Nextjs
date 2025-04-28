'use server';
import 'server-only';
import { auth } from '@/auth';
import { ServerActionInterface } from '@/lib/interfaces/server-action.interface';
import { deleteUserAccount } from '@/services/user.service';

export async function deleteUserAccountServerAction(): Promise<ServerActionInterface> {
  try {
    const userSession = await auth();
    if (!userSession?.user.id) {
      throw new Error('Unauthorized');
    }
    await deleteUserAccount(userSession?.user.id);
    return {
      success: true,
      message: 'Account deleted successfully',
    };
  } catch (error) {
    return {
      errors: {
        general:
          (error as { message: string }).message ??
          'Something went wrong. Please try again',
      },
      success: false,
      message: 'Server error',
    };
  }
}
