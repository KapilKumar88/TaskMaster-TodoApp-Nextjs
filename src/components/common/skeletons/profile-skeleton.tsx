import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ProfileSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div>
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader className="pb-2 text-center">
            <div className="flex justify-center mb-4">
              <Skeleton className="w-24 h-24 rounded-full" />
            </div>
            <Skeleton className="h-6 w-32 mx-auto mb-1" />
            <Skeleton className="h-4 w-40 mx-auto" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2 mb-4">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="space-y-3 text-center">
              <Skeleton className="h-5 w-40 mx-auto" />

              <div className="flex justify-center gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>

            <div className="my-4 h-px bg-white/30" />

            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-1" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

