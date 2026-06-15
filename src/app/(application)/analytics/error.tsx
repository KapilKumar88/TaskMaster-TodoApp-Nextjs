'use client';

import SectionError from '@/components/common/section-error';

export default function ErrorBoundary({
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <main className="p-4 md:p-6">
      <SectionError reset={reset} />
    </main>
  );
}
