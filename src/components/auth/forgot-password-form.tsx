'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordServerAction } from '@/server-actions/auth.actions';
import { LoaderPinwheel } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { toast } from '../common/sonner';
import { ToastVariation } from '@/lib/enums';

export default function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPasswordServerAction, {
    errors: {},
    formValues: {
      email: '',
    },
    message: '',
    success: false,
  });

  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (state?.errors) {
      setEmailError(
        Array.isArray(state?.errors?.email) && state.errors.email?.length > 0
          ? state.errors.email[0]
          : '',
      );

      if (state.errors?.general) {
        toast({
          message: state.errors.general,
          variation: ToastVariation.ERROR,
        });
        return;
      }
    }

    if (state.success) {
      toast({
        message: state.message,
        variation: ToastVariation.SUCCESS,
      });
      state.success = false;
    }
  }, [state]);

  return (
    <form className="space-y-4" action={action}>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-900 dark:text-white">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          defaultValue={state?.formValues?.email}
          onChange={() => {
            setEmailError('');
          }}
          placeholder="your@email.com"
          className="bg-white/40 border-white/40 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
        disabled={pending}
      >
        {pending && <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />}
        {pending ? 'Sending...' : 'Send Instructions'}
      </Button>
    </form>
  );
}
