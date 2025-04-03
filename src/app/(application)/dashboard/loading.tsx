import { ChartSkeleton } from '@/components/common/skeletons/chart-skeleton';
import { DashboardCardsSkeleton } from '@/components/common/skeletons/dashboard-cards-skeleton';
import { TaskListSkeleton } from '@/components/common/skeletons/task-list-skeleton';

export default function Loading() {
  return (
    <main className="p-4 md:p-6">
      <DashboardCardsSkeleton />

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <ChartSkeleton title="Weekly Progress" />
        </div>

        <div className="lg:col-span-3">
          <ChartSkeleton title="Task Completion" />
        </div>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-3">
          <ChartSkeleton title="Categories" />
        </div>

        <div className="lg:col-span-4">
          <div className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md rounded-lg">
            <div className="p-6 pb-2 flex flex-row items-center justify-between">
              <div className="h-6 w-16 bg-slate-200/70 dark:bg-slate-700/40 rounded"></div>
              <div className="h-10 w-40 bg-slate-200/70 dark:bg-slate-700/40 rounded"></div>
            </div>
            <div className="p-6">
              <TaskListSkeleton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
