import { auth } from '@/auth';
import { CategoryDistributionChart } from '@/components/category-distribution-chart';
import { ChartSkeleton } from '@/components/common/skeletons/chart-skeleton';
import Unauthorized from '@/components/common/unauthorized';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategoryDistributionTaskStats } from '@/services/task.service';
import { getDefaultDateTime } from '../analytics/@topSection/page';

export default async function Default() {
  const userSession = await auth();
  if (userSession === null) {
    return <Unauthorized />;
  }

  const defaultDateTime = getDefaultDateTime();

  const categoryDistributionTaskData = await getCategoryDistributionTaskStats(
    userSession?.user.id,
    defaultDateTime.startDate,
    defaultDateTime.endDate,
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
            <CategoryDistributionChart data={categoryDistributionTaskData} />
          </CardContent>
        </Card>
      )}
    </>
  );
}
