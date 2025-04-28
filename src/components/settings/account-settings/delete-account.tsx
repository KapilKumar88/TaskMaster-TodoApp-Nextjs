'use client';
import { AlertCircle, LoaderPinwheel, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import ErrorAlertDialogBox from '@/components/common/alert-box/error-alert-box';
import { startTransition, useState } from 'react';
import { deleteUserAccountServerAction } from '@/server-actions/user.actions';
import { signOut } from 'next-auth/react';
import { toast } from '@/components/common/sonner';
import { ToastVariation } from '@/lib/enums';
export default function DeleteAccount() {
  const [openDeleteAlertBox, setOpenDeleteAlertBox] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <div>
        <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
          Danger Zone
        </h3>
        <Alert
          variant="destructive"
          className="bg-red-100/50 border-red-300 text-red-800"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDescription>
        </Alert>
        <Button
          type="button"
          variant="destructive"
          className="mt-4"
          disabled={loading}
          onClick={() => setOpenDeleteAlertBox(true)}
        >
          {loading ? (
            <>
              <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </>
          )}
        </Button>
      </div>
      <ErrorAlertDialogBox
        open={openDeleteAlertBox}
        dialogTitle="Delete Account Permanently?"
        dialogDescription="Are you sure you want to delete this account? This action cannot be undone."
        onConfirm={() => {
          setLoading(true);
          startTransition(async () => {
            const response = await deleteUserAccountServerAction();
            if (response?.success) {
              await signOut();
              toast({
                variation: ToastVariation.SUCCESS,
                message: response?.message,
              });
            } else {
              toast({
                variation: ToastVariation.ERROR,
                message: response?.message,
              });
            }
            setLoading(false);
          });
          setOpenDeleteAlertBox(false);
        }}
        onCancel={() => {
          setLoading(false);
          setOpenDeleteAlertBox(false);
        }}
      />
    </>
  );
}
