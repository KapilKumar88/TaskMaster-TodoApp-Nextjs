"use client";

import { registerServerAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderPinwheel } from "lucide-react";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(registerServerAction, {
    errors: {},
  });

  console.log(state, ">>>>>>>>>>>>>>>>lklkklklklllk");

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // action({ [e.target.name]: e.target.value });
  //   if (state && state?.errors && state.errors) {
  //     state?.errors?.fullName = [];
  //   }
  // };

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-slate-900 dark:text-white">
          Full Name
        </Label>
        <Input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="bg-white/40 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
          // onChange={handleInputChange}
        />
        {state?.errors?.fullName && (
          <p className="text-red-500 text-sm">{state.errors.fullName[0]}</p>
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
          // onChange={handleInputChange}
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
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
          className="bg-white/40 border-white/40 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
          // onChange={handleInputChange}
        />
        {state?.errors?.password && (
          <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
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
          className="bg-white/40 border-white/40 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500"
          // onChange={handleInputChange}
        />
        {state?.errors?.confirmPassword && (
          <p className="text-red-500 text-sm">
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </div>
      <Button
        // type="submit"
        className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
        disabled={pending}
      >
        {pending && <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />}
        {!pending && "Register"}
      </Button>
    </form>
  );
}
