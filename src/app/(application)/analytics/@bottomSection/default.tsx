import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompletionRateChart } from "@/components/completion-rate-chart";

export default function Default() {
  return (
    <div className="grid gap-4 md:gap-6 mt-4 md:mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Task Completion
          </CardTitle>
        </CardHeader>
        <CardContent>{/* <TaskCompletionChart /> */}</CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>{/* <CategoryDistributionChart /> */}</CardContent>
      </Card>

      <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">
            Completion Rate Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CompletionRateChart />
        </CardContent>
      </Card>
    </div>
  );
}
