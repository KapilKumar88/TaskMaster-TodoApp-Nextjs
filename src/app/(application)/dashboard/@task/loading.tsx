import { TaskListSkeleton } from '@/components/common/skeletons/task-list-skeleton';

export default function loading() {
  return (
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
  );
}
