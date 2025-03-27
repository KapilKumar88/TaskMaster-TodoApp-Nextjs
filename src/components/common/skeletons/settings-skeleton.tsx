import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function SettingsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-7">
      <div className="md:col-span-5">
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-1" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-10 w-full sm:w-[180px]" />
                </div>

                <div className="h-px bg-white/30" />
              </div>
            ))}
          </CardContent>
          <div className="p-6 pt-0">
            <Skeleton className="h-10 w-32" />
          </div>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-white/40 p-4">
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="rounded-lg bg-white/40 p-4">
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

