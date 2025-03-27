import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryDistributionChart } from "@/components/category-distribution-chart";
import { auth } from "@/auth";
import { getCategoryDistributionTaskStats } from "@/services/task.service";
import { ChartSkeleton } from "@/components/common/skeletons/chart-skeleton";
import Unauthorized from "@/components/common/unauthorized";

export default async function DashboardPage() {
  const userSession = await auth();
  if (userSession === null) {
    return <Unauthorized />;
  }

  const categoryDistributionTaskData = await getCategoryDistributionTaskStats(
    userSession?.user.id
  );

  return (
    <>
      {!categoryDistributionTaskData && <ChartSkeleton title="Categories" />}
      {categoryDistributionTaskData && (
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryDistributionChart
              categoryDistributionTaskData={categoryDistributionTaskData}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
