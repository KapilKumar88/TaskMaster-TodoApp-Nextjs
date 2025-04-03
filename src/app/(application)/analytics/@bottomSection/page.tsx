import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryDistributionChart } from '@/components/category-distribution-chart';
import { CompletionRateChart } from '@/components/completion-rate-chart';
import TaskCompletionChart from '@/components/dashboard/task-completion-chart';
import { auth } from '@/auth';
import Unauthorized from '@/components/common/unauthorized';
import {
  getCategoryDistributionTaskStats,
  getTaskCompletionRate,
  taskCompletionChartStats,
} from '@/services/task.service';
import { getDefaultDateTime } from '@/lib/utils';

export default async function BottomSectionAnalytics({
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
    taskCompletionChartData,
    categoryDistributionTaskData,
    getTaskCompletionRateData,
  ] = await Promise.all([
    taskCompletionChartStats(userSession?.user.id, startDate, endDate),
    getCategoryDistributionTaskStats(userSession?.user.id, startDate, endDate),
    getTaskCompletionRate(userSession?.user.id, startDate, endDate),
  ]);

  return (
    <div className="grid gap-4 md:gap-6 mt-4 md:mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Task Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TaskCompletionChart data={taskCompletionChartData} />
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryDistributionChart data={categoryDistributionTaskData} />
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Completion Rate Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CompletionRateChart data={getTaskCompletionRateData} />
        </CardContent>
      </Card>
    </div>
  );
}
