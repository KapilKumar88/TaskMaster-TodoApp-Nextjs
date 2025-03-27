import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ChartSkeletonProps {
  title?: string
  height?: number
}

export function ChartSkeleton({ title = "Loading chart...", height = 240 }: ChartSkeletonProps) {
  return (
    <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <Skeleton className="w-full rounded-md" style={{ height: `${height}px` }} />
        </div>
      </CardContent>
    </Card>
  )
}

