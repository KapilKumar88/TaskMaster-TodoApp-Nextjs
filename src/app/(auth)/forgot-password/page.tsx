import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: `Forgot Password`,
};

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="relative w-12 h-12 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">T</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-slate-700 dark:text-slate-200">
          Enter your email to receive password reset instructions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-slate-700 dark:text-slate-200 text-sm">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
