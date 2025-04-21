'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToastVariation } from '@/lib/enums';
import { resetPasswordServerAction } from '@/server-actions/auth.actions';
import { LoaderPinwheel } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { toast } from '../common/sonner';

export default function ResetPasswordForm({
  token,
}: Readonly<{
  token: string;
}>) {
  const [state, action, pending] = useActionState(resetPasswordServerAction, {
    errors: {},
    message: '',
    formValues: {
      password: '',
      confirmPassword: '',
      token: '',
    },
    success: false,
  });

  const [formErrors, setFormErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (state?.errors) {
      setFormErrors({
        ...formErrors,
        confirmPassword:
          Array.isArray(state?.errors?.confirmPassword) &&
          state.errors.confirmPassword?.length > 0
            ? state.errors.confirmPassword[0]
            : '',
        password:
          Array.isArray(state?.errors?.password) &&
          state.errors.password?.length > 0
            ? state.errors.password[0]
            : '',
      });

      if (
        Array.isArray(state?.errors?.token) &&
        state.errors.token?.length > 0
      ) {
        toast({
          message: state.errors.token[0],
          variation: ToastVariation.ERROR,
        });

        return;
      }

      if (state.errors?.general) {
        toast({
          message: state.errors.general,
          variation: ToastVariation.ERROR,
        });
        return;
      }
    }

    if (state?.success) {
      toast({
        message: state.message,
        variation: ToastVariation.SUCCESS,
      });
      state.success = false;
    }
  }, [state]);

  return (
    <form
      className="space-y-4"
      action={(formData) => {
        formData.append('token', token);
        action(formData);
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-900 dark:text-white">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          name="password"
          onChange={() => {
            setFormErrors({
              ...formErrors,
              password: '',
            });
          }}
          className="bg-white/40 border-white/40 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
        />
        {formErrors?.password && (
          <p className="text-red-500 text-sm">{formErrors?.password}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="text-slate-900 dark:text-white"
        >
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          onChange={() => {
            setFormErrors({
              ...formErrors,
              confirmPassword: '',
            });
          }}
          className="bg-white/40 border-white/40 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
        />
        {formErrors?.confirmPassword && (
          <p className="text-red-500 text-sm">{formErrors?.confirmPassword}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
        disabled={pending}
      >
        {pending && <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />}
        {pending ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
