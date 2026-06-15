'use client';

import SectionError from '@/components/common/section-error';

export default function ErrorBoundary({
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return <SectionError reset={reset} className="grid gap-6 w-full mt-6" />;
}
