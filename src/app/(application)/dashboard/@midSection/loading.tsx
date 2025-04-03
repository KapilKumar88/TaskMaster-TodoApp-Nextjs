import { ChartSkeleton } from '@/components/common/skeletons/chart-skeleton';

export default function Loading() {
  return (
    <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7">
      <div className="lg:col-span-4">
        <ChartSkeleton title="Weekly Progress" />
      </div>

      <div className="lg:col-span-3">
        <ChartSkeleton title="Task Completion" />
      </div>
    </div>
  );
}
