import ResetPasswordForm from '@/components/auth/reset-password-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function ResetPasswordPage({
  searchParams,
}: Readonly<{
  searchParams: { token: string };
}>) {
  const [queryParams] = await Promise.all([searchParams]);
  if (!queryParams.token) {
    throw new Error('Invalid Link');
  }

  return (
    <Card className="w-full max-w-md border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="relative w-12 h-12 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">T</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
          Reset Password
        </CardTitle>
        <CardDescription className="text-slate-700 dark:text-slate-200">
          Enter your new password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResetPasswordForm token={queryParams.token} />
      </CardContent>
    </Card>
  );
}
