import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDefaultDateTime } from "../@topSection/page";
import { auth } from "@/auth";
import Unauthorized from "@/components/common/unauthorized";
import { weeklyProgressChartStats } from "@/services/task.service";
import WeeklyProgressChart from "@/components/dashboard/weekly-progress-chart";

export default async function MidSectionAnalytics({
  searchParams,
}: {
  searchParams: { startDate: string; endDate: string };
}) {
  const [userSession, queryParams] = await Promise.all([auth(), searchParams]);
  const defaultDateTime = getDefaultDateTime();
  const startDate = queryParams?.startDate ?? defaultDateTime?.startDate;
  const endDate = queryParams?.endDate ?? defaultDateTime?.endDate;

  if (userSession === null) {
    return <Unauthorized />;
  }

  const [weeklyProgressChatData] = await Promise.all([
    weeklyProgressChartStats(userSession?.user.id, startDate, endDate),
  ]);

  return (
    <div className="grid gap-4 md:gap-6 mt-4 md:mt-6 grid-cols-1 md:grid-cols-2">
      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
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

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Productivity by Day
          </CardTitle>
        </CardHeader>
        <CardContent>{/* <ProductivityChart /> */}</CardContent>
      </Card>
    </div>
  );
}
