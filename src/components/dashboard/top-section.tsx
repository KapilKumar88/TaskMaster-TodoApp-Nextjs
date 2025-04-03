import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '../ui/progress';
import {
  totalCompletedTaskStats,
  totalInprogressTaskStats,
  totalOverDueTaskStats,
  totalTaskStats,
} from '@/services/task.service';
import { Session } from 'next-auth';
import { DirectionIndicators } from '@/lib/enums';
import { getDefaultDateTime } from '@/lib/utils';

export default async function TopSection({
  userSession,
}: Readonly<{
  userSession: Session;
}>) {
  const defaultDates = getDefaultDateTime();
  const [
    totalsTaskCount,
    totalsCompletedTaskCount,
    totalsInProgressTaskCount,
    totalsOverDueTaskCount,
  ] = await Promise.all([
    totalTaskStats(
      userSession?.user.id,
      defaultDates.startDate,
      defaultDates.endDate,
    ),
    totalCompletedTaskStats(
      userSession?.user.id,
      defaultDates.startDate,
      defaultDates.endDate,
    ),
    totalInprogressTaskStats(
      userSession?.user.id,
      defaultDates.startDate,
      defaultDates.endDate,
    ),
    totalOverDueTaskStats(
      userSession?.user.id,
      defaultDates.startDate,
      defaultDates.endDate,
    ),
  ]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            Total Tasks
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {totalsTaskCount?.currentPeriodCount ?? 0}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-700 dark:text-slate-300">
            {totalsTaskCount.percentageDifference !== 0 && (
              <>
                <span
                  className={
                    totalsTaskCount.percentageDirection ===
                    DirectionIndicators.DOWN
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }
                >
                  {totalsTaskCount.percentageDirection ===
                  DirectionIndicators.DOWN
                    ? '↓'
                    : '↑'}
                  {totalsTaskCount.percentageDifference}%
                </span>{' '}
                from last week
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            Completed
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {totalsCompletedTaskCount.currentPeriodCount}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {totalsCompletedTaskCount.percentageDifference !== 0 && (
            <>
              <Progress
                value={totalsCompletedTaskCount.percentageDifference}
                className="h-2 bg-slate-200/70"
              />
              <div className="mt-1 text-xs text-slate-700 dark:text-slate-300">
                <span
                  className={
                    totalsCompletedTaskCount.percentageDirection ===
                    DirectionIndicators.DOWN
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }
                >
                  {totalsCompletedTaskCount.percentageDirection ===
                  DirectionIndicators.DOWN
                    ? '↓'
                    : '↑'}
                  {totalsCompletedTaskCount.percentageDifference}%
                </span>{' '}
                completion rate
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            In Progress
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {totalsInProgressTaskCount.currentPeriodCount}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {totalsInProgressTaskCount.percentageDifference !== 0 && (
            <>
              <Progress
                value={totalsInProgressTaskCount.percentageDifference}
                className="h-2 bg-slate-200/70"
              />
              <div className="mt-1 text-xs text-slate-700 dark:text-slate-300">
                <span
                  className={
                    totalsInProgressTaskCount.percentageDirection ===
                    DirectionIndicators.DOWN
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }
                >
                  {totalsInProgressTaskCount.percentageDirection ===
                  DirectionIndicators.DOWN
                    ? '↓'
                    : '↑'}
                  {totalsInProgressTaskCount.percentageDifference}%
                </span>{' '}
                of all tasks
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            Overdue
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {totalsOverDueTaskCount.currentPeriodCount}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-700 dark:text-slate-300">
            {totalsOverDueTaskCount.percentageDifference !== 0 && (
              <>
                <span
                  className={
                    totalsOverDueTaskCount.percentageDirection ===
                    DirectionIndicators.DOWN
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }
                >
                  {totalsOverDueTaskCount.percentageDirection ===
                  DirectionIndicators.DOWN
                    ? '↓'
                    : '↑'}
                  {totalsOverDueTaskCount.percentageDifference}%
                </span>{' '}
                from last week
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
