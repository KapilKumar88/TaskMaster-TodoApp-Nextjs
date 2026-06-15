import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DashboardCardsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {(['total', 'active', 'completed', 'overdue'] as const).map((slot) => (
        <Card
          key={slot}
          className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md"
        >
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-8 w-16" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
