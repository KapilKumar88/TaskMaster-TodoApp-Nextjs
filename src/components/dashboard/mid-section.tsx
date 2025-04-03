import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WeeklyProgressChart from '@/components/dashboard/weekly-progress-chart';
import TaskCompletionChart from '@/components/dashboard/task-completion-chart';
import {
  taskCompletionChartStats,
  weeklyProgressChartStats,
} from '@/services/task.service';
import { Session } from 'next-auth';
import { getDefaultDateTime } from '@/app/(application)/analytics/@topSection/page';

export default async function MidSection({
  userSession,
}: Readonly<{
  userSession: Session;
}>) {
  const defaultDates = getDefaultDateTime();
  const [weeklyProgressChatData, taskCompletionChartData] = await Promise.all([
    weeklyProgressChartStats(
      userSession?.user.id,
      defaultDates?.startDate,
      defaultDates?.endDate,
    ),
    taskCompletionChartStats(
      userSession?.user.id,
      defaultDates?.startDate,
      defaultDates?.endDate,
    ),
  ]);

  return (
    <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7">
      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyProgressChart
            weeklyProgressChatData={weeklyProgressChatData}
          />
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Task Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TaskCompletionChart data={taskCompletionChartData} />
        </CardContent>
      </Card>
    </div>
  );
}
