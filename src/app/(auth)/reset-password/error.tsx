'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string; code?: string };
  reset: () => void;
}>) {
  return (
    <Card className="w-full max-w-md border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl">
      <CardHeader className="space-y-1 text-center pb-2">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
          Something went wrong
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4 pb-6">
        <p className="text-slate-700 dark:text-slate-200">
          We&apos;re sorry, but we encountered an error while processing your
          request.
        </p>
        <div className="h-px bg-white/20 w-full my-2" />
        <div className="bg-white/30 rounded-lg p-3 text-left">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            Error details:
          </p>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 break-words">
            {error.message || 'An unexpected error occurred'}
          </p>
          {error.digest && (
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button
          onClick={reset}
          className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full border-white/30 bg-white/30 hover:bg-white/40"
        >
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
