'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <main className="p-4 md:p-6">
      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md bg-gradient-to-br from-teal-500/30 to-indigo-600/30 p-4 w-full">
        <CardHeader className="space-y-1 text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>
          </div>
          <CardDescription className="text-slate-700 dark:text-slate-300"></CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-700 dark:text-slate-300 text-center">
            We&apos;re sorry, but we encountered an error while processing your
            request.
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={reset}
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
