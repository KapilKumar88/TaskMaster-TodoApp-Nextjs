import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500/30 to-indigo-600/30 p-4">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-400/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-amber-400/30 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl">
        <CardHeader className="space-y-1 text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
              <FileQuestion className="h-10 w-10 text-indigo-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white">
            404
          </CardTitle>
          <p className="text-xl font-medium text-slate-900 dark:text-white">
            Page Not Found
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-4 pb-6">
          <p className="text-slate-700 dark:text-slate-200">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <div className="h-px bg-white/20 w-full my-2" />
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Check the URL or try navigating back to the dashboard.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-white/30 bg-white/30 hover:bg-white/40"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
