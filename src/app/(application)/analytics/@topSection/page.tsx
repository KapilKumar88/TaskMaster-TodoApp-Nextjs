import { auth } from '@/auth';
import Unauthorized from '@/components/common/unauthorized';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDefaultDateTime } from '@/lib/utils';
import {
  avgCompletionTimeStats,
  overdueRateStats,
  taskCompletionRateStats,
  totalTaskStats as totalTaskStatsQuery,
} from '@/services/task.service';

export default async function TopSectionAnalytics({
  searchParams,
}: Readonly<{
  searchParams: { startDate: string; endDate: string };
}>) {
  const [userSession, queryParams] = await Promise.all([auth(), searchParams]);
  const defaultDateTime = getDefaultDateTime();
  const startDate = queryParams?.startDate ?? defaultDateTime?.startDate;
  const endDate = queryParams?.endDate ?? defaultDateTime?.endDate;

  if (userSession === null) {
    return <Unauthorized />;
  }

  const [
    totalTaskStats,
    taskCompletionRate,
    avgCompletionStats,
    overdueRateStatsData,
  ] = await Promise.all([
    totalTaskStatsQuery(userSession.user.id, startDate, endDate),
    taskCompletionRateStats(userSession.user.id, startDate, endDate),
    avgCompletionTimeStats(userSession.user.id, startDate, endDate),
    overdueRateStats(userSession.user.id, startDate, endDate),
  ]);

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            Total Tasks
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {totalTaskStats?.currentPeriodCount ?? 0}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-700 dark:text-slate-300">
            {totalTaskStats?.percentageDifference !== 0 &&
              (totalTaskStats?.percentageDifference > 0 ? (
                <>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    ↑{totalTaskStats?.percentageDifference?.toFixed(2) ?? 0}%
                  </span>
                  {' from previous period'}
                </>
              ) : (
                <>
                  <span className="text-red-600 dark:text-red-400">
                    ↓
                    {totalTaskStats?.percentageDifference?.toFixed(2) ?? 0}{' '}
                  </span>
                  {' from previous period'}
                </>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            Completion Rate
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {taskCompletionRate?.currentPeriodCompletionRate.toFixed(2) ?? 0}%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-700 dark:text-slate-300">
            {taskCompletionRate?.percentageDifference !== 0 &&
              (taskCompletionRate?.percentageDifference > 0 ? (
                <>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    ↑{taskCompletionRate?.percentageDifference?.toFixed(2) ?? 0}
                    %
                  </span>
                  {' from previous period'}
                </>
              ) : (
                <>
                  <span className="text-red-600 dark:text-red-400">
                    ↓
                    {taskCompletionRate?.percentageDifference?.toFixed(2) ??
                      0}{' '}
                  </span>
                  {' from previous period'}
                </>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            Avg. Completion Time
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {(avgCompletionStats?.avgCurrentPeriodTime / 24).toFixed(2)} days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-700 dark:text-slate-300">
            {avgCompletionStats?.percentageDifference !== 0 &&
              (avgCompletionStats?.percentageDifference > 0 ? (
                <>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    ↑
                    {(avgCompletionStats?.percentageDifference / 24)?.toFixed(
                      2,
                    ) ?? 0}
                    %
                  </span>
                  {' from previous period'}
                </>
              ) : (
                <>
                  <span className="text-red-600 dark:text-red-400">
                    ↓
                    {(avgCompletionStats?.percentageDifference / 24)?.toFixed(
                      2,
                    ) ?? 0}{' '}
                    days
                  </span>
                  {' from previous period'}
                </>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            Overdue Rate
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {overdueRateStatsData?.currentPeriodOverdueRate?.toFixed(2)}%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-700 dark:text-slate-300">
            {overdueRateStatsData?.percentageDifference !== 0 &&
              (overdueRateStatsData?.percentageDifference > 0 ? (
                <>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    ↑
                    {(overdueRateStatsData?.percentageDifference / 24)?.toFixed(
                      2,
                    ) ?? 0}
                    %
                  </span>
                  {' from previous period'}
                </>
              ) : (
                <>
                  <span className="text-red-600 dark:text-red-400">
                    ↓
                    {(overdueRateStatsData?.percentageDifference / 24)?.toFixed(
                      2,
                    ) ?? 0}{' '}
                    days
                  </span>
                  {' from previous period'}
                </>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
