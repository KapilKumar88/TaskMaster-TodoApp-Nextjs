'use client';
import { LoaderPinwheel, RefreshCw } from 'lucide-react';
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { toast } from '../common/sonner';
import { ToastVariation } from '@/lib/enums';
import { CUSTOM_ERROR_CODES } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { resendVerificationLinkServerAction } from '@/server-actions/auth.actions';

export default function EmailVerification({
  response,
}: Readonly<{
  response: {
    message: string;
    code: string;
    success: boolean;
  };
}>) {
  const [loading, setLoading] = useState(false);

  const resentLink = async () => {
    setLoading(true);
    const result = await resendVerificationLinkServerAction();
    setLoading(false);
    toast({
      message: result.message,
      variation: result.success ? ToastVariation.SUCCESS : ToastVariation.ERROR,
    });
  };

  useEffect(() => {
    if (response?.success) {
      toast({
        message: response.message,
        variation: ToastVariation.SUCCESS,
      });
    }

    if (response?.code === CUSTOM_ERROR_CODES.TASK_002.code) {
      toast({
        message: response.message,
        variation: ToastVariation.INFO,
      });
    }
  }, [response]);

  return (
    <Card className="w-full max-w-md border border-white/30 bg-white/20 backdrop-blur-xl shadow-xl">
      <CardHeader className="space-y-1 text-center pb-2">
        <div className="flex justify-center mb-2">
          <div className="relative w-12 h-12 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">T</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
          {response?.message}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col space-y-3">
        {(response?.code === CUSTOM_ERROR_CODES.TASK_003.code ||
          response?.code === CUSTOM_ERROR_CODES.TASK_001.code) && (
          <Button
            onClick={() => {
              resentLink();
            }}
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
          >
            {!loading && (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Resend Link
              </>
            )}
            {loading && (
              <>
                <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />
                Sending Link....
              </>
            )}
          </Button>
        )}
        {(response?.code === CUSTOM_ERROR_CODES.TASK_002.code ||
          response?.success) && (
          <Button
            asChild
            variant="outline"
            className="w-full border-white/30 bg-white/30 hover:bg-white/40"
          >
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
