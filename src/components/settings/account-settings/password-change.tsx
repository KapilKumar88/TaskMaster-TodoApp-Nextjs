"use client";
import { toast } from "@/components/common/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastVariation } from "@/lib/enums";
import { changePasswordAction } from "@/server-actions/auth.actions";
import { LoaderPinwheel } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

export default function PasswordChange() {
  const [passwordChangeState, passwordChangeAction, passwordChangePending] =
    useActionState(changePasswordAction, {
      errors: {},
      message: "",
      success: false,
    });

  const [formErrors, setFormErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
    currentPassword?: string;
  }>({
    newPassword: undefined,
    confirmPassword: undefined,
    currentPassword: undefined,
  });

  useEffect(() => {
    if (passwordChangeState?.errors) {
      setFormErrors({
        ...formErrors,
        currentPassword:
          Array.isArray(passwordChangeState?.errors?.currentPassword) &&
          passwordChangeState.errors.currentPassword?.length > 0
            ? passwordChangeState.errors.currentPassword[0]
            : undefined,
        newPassword:
          Array.isArray(passwordChangeState?.errors?.newPassword) &&
          passwordChangeState.errors.newPassword?.length > 0
            ? passwordChangeState.errors.newPassword[0]
            : undefined,
        confirmPassword:
          Array.isArray(passwordChangeState?.errors?.confirmPassword) &&
          passwordChangeState.errors.confirmPassword?.length > 0
            ? passwordChangeState.errors.confirmPassword[0]
            : undefined,
      });

      if (passwordChangeState.errors?.general) {
        toast({
          variation: ToastVariation.ERROR,
          message: passwordChangeState.errors.general,
        });
        return;
      }
    }

    if (passwordChangeState?.success) {
      toast({
        variation: ToastVariation.SUCCESS,
        message: passwordChangeState.message,
      });
    }
  }, [passwordChangeState]);

  return (
    <form action={passwordChangeAction}>
      <div>
        <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
          Password
        </h3>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              name="currentPassword"
              type="password"
              placeholder="Current password"
              className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
            />
          </div>
          {formErrors?.currentPassword && (
            <p className="text-red-500 text-sm">
              {formErrors?.currentPassword}
            </p>
          )}
          <div className="flex gap-2">
            <Input
              name="newPassword"
              type="password"
              placeholder="New password"
              className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
            />
          </div>
          {formErrors?.newPassword && (
            <p className="text-red-500 text-sm">{formErrors?.newPassword}</p>
          )}
          <div className="flex gap-2 flex-col sm:flex-row">
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="bg-white/40 border-white/30 text-slate-900 dark:text-white flex-1"
            />
          </div>
          {formErrors?.confirmPassword && (
            <p className="text-red-500 text-sm">
              {formErrors?.confirmPassword}
            </p>
          )}
          <div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white w-full"
              disabled={passwordChangePending}
            >
              {passwordChangePending && (
                <>
                  <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />
                  Updating...
                </>
              )}
              {!passwordChangePending && "Update"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
