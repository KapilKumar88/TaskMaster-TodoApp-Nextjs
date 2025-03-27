import { ChartSkeleton } from "@/components/common/skeletons/chart-skeleton";

export default function Loading() {
  return (
    <div className="grid gap-4 md:gap-6 mt-4 md:mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <ChartSkeleton title="Task Completion" />
      <ChartSkeleton title="Categories" />
      <ChartSkeleton title="Completion Rate Trend" />
    </div>
  );
}
