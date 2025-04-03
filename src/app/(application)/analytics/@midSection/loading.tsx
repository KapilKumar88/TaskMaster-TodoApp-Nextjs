import { ChartSkeleton } from '@/components/common/skeletons/chart-skeleton';

export default function Loading() {
  return (
    <div className="grid gap-4 md:gap-6 mt-4 md:mt-6 grid-cols-1 md:grid-cols-2">
      <ChartSkeleton title="Weekly Progress" />
      <ChartSkeleton title="Productivity by Day" />
    </div>
  );
}
