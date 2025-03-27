import { Skeleton } from "@/components/ui/skeleton"

export function TaskListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-start justify-between rounded-lg border border-white/30 bg-white/40 p-4 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3 flex-1">
            <Skeleton className="h-5 w-5 rounded-sm mt-1" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md ml-1" />
          </div>
        </div>
      ))}
    </div>
  )
}

