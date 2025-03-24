import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";
import { auth } from "@/auth";
import {
  totalCompletedTaskStatsForDashboard,
  totalInprogressTaskStatsForDashboard,
  totalOverDueTaskStatsForDashboard,
  totalTaskStatsForDashboard,
} from "@/services/task.service";

export default async function TopStats() {
  const userSession = await auth();
  const totalsTaskCount = await totalTaskStatsForDashboard(
    userSession?.user.id
  );

  const totalsCompletedTaskCount = await totalCompletedTaskStatsForDashboard(
    userSession?.user.id
  );

  const totalsInProgressTaskCount = await totalInprogressTaskStatsForDashboard(
    userSession?.user.id
  );

  const totalsOverDueTaskCount = await totalOverDueTaskStatsForDashboard(
    userSession?.user.id
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            Total Tasks
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {totalsTaskCount.currentWeekCount}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-700 dark:text-slate-300">
            {totalsTaskCount.percentageDifference < 0 ? (
              <span className="text-red-600 dark:text-red-400">
                ↓{totalsTaskCount.percentageDifference?.toFixed(2)}%
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400">
                ↑{totalsTaskCount.percentageDifference?.toFixed(2)}%
              </span>
            )}{" "}
            from last week
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            Completed
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {totalsCompletedTaskCount.currentWeekCount}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={totalsCompletedTaskCount.percentageDifference}
            className="h-2 bg-slate-200/70"
          />
          <div className="mt-1 text-xs text-slate-700 dark:text-slate-300">
            {totalsCompletedTaskCount.percentageDifference?.toFixed(2)}%
            completion rate
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            In Progress
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {totalsInProgressTaskCount.currentWeekCount}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={totalsInProgressTaskCount.percentageDifference}
            className="h-2 bg-slate-200/70"
            // indicatorClassName="bg-indigo-500"
          />
          <div className="mt-1 text-xs text-slate-700 dark:text-slate-300">
            {totalsInProgressTaskCount.percentageDifference?.toFixed(2)}% of all
            tasks
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader className="pb-2">
          <CardDescription className="text-slate-700 dark:text-slate-300">
            Overdue
          </CardDescription>
          <CardTitle className="text-2xl text-slate-900 dark:text-white">
            {totalsOverDueTaskCount.currentWeekCount}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-slate-700 dark:text-slate-300">
            {totalsOverDueTaskCount.percentageDifference < 0 ? (
              <span className="text-red-600 dark:text-red-400">
                ↓{totalsOverDueTaskCount.percentageDifference?.toFixed(2)}%
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400">
                ↑{totalsOverDueTaskCount.percentageDifference?.toFixed(2)}%
              </span>
            )}{" "}
            from last week
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
