'use client';

import { registerUserServerAction } from '@/server-actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderPinwheel } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { RegisterFormState } from '@/lib/interfaces/server-action.interface';
import { toast } from '../common/sonner';
import { ToastVariation } from '@/lib/enums';

export default function RegisterForm() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [state, action, pending] = useActionState<RegisterFormState, FormData>(
    registerUserServerAction,
    {
      errors: {},
      formValues: {
        fullName: '',
        email: '',
      },
      message: '',
      success: false,
    },
  );

  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    email?: string;
    confirmPassword?: string;
    password?: string;
  }>({
    fullName: undefined,
    email: undefined,
    confirmPassword: undefined,
    password: undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors({
      ...formErrors,
      [e.target.name]: undefined,
    });
  };

  useEffect(() => {
    if (state?.errors) {
      setFormErrors({
        ...formErrors,
        fullName:
          Array.isArray(state?.errors?.fullName) &&
          state.errors.fullName?.length > 0
            ? state.errors.fullName[0]
            : undefined,
        email:
          Array.isArray(state?.errors?.email) && state.errors.email?.length > 0
            ? state.errors.email[0]
            : undefined,
        confirmPassword:
          Array.isArray(state?.errors?.confirmPassword) &&
          state.errors.confirmPassword?.length > 0
            ? state.errors.confirmPassword[0]
            : undefined,
        password:
          Array.isArray(state?.errors?.password) &&
          state.errors.password?.length > 0
            ? state.errors.password[0]
            : undefined,
      });

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
      redirect('/dashboard');
    }
  }, [state]);

  return (
    <form
      action={(formData) => {
        formData.append('timeZone', timeZone);
        action(formData);
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-slate-900 dark:text-white">
          Full Name
        </Label>
        <Input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          className="bg-white/40 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={state?.formValues?.fullName ?? ''}
          onChange={handleInputChange}
        />
        {formErrors?.fullName && (
          <p className="text-red-500 text-sm">{formErrors.fullName}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-900 dark:text-white">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          className="bg-white/40 border-white/40 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={state?.formValues?.email ?? ''}
          onChange={handleInputChange}
        />
        {formErrors?.email && (
          <p className="text-red-500 text-sm">{formErrors?.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-900 dark:text-white">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="********"
          className="bg-white/40 border-white/40 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
          onChange={handleInputChange}
        />
        {formErrors?.password && (
          <p className="text-red-500 text-sm">{formErrors.password}</p>
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
          placeholder="********"
          className="bg-white/40 border-white/40 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
          onChange={handleInputChange}
        />
        {formErrors?.confirmPassword && (
          <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
        )}
      </div>
      <Button
        // type="submit"
        className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
        disabled={pending}
      >
        {pending && <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />}
        {!pending && 'Register'}
      </Button>
    </form>
  );
}
