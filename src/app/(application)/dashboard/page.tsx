import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TodoList } from "@/components/todo-list";
import { CategoryDistributionChart } from "@/components/category-distribution-chart";
import TopStats from "@/components/dashboard/top-stats";
import WeeklyProgressChart from "@/components/dashboard/weekly-progress-chart";
import TaskCompletionChart from "@/components/dashboard/task-completion-chart";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <TopStats />
      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyProgressChart />
          </CardContent>
        </Card>

        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Task Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaskCompletionChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryDistributionChart />
          </CardContent>
        </Card>

        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-slate-900 dark:text-white">
              Tasks
            </CardTitle>
            <Tabs defaultValue="all">
              <TabsList className="bg-white/40">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                >
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TodoList />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
