import { Skeleton } from '@/components/ui/skeleton';

export default function TaskByCategorySkeleton() {
  return (
    <div className="grid gap-2">
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <div
            key={`skeleton-category-${index * 12}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div>
                <Skeleton className="h-5 w-5 rounded-sm" />
              </div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                <Skeleton className="h-5 w-16 rounded-full" />
              </span>
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              <Skeleton className="h-5 w-5 rounded-sm" />
            </span>
          </div>
        );
      })}
    </div>
  );
}
