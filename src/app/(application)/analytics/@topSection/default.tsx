import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  export default function Default() {
    return (
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-700 dark:text-slate-300">
              Total Tasks
            </CardDescription>
            <CardTitle className="text-2xl text-slate-900 dark:text-white">
              24
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <span className="text-emerald-600 dark:text-emerald-400">↑12%</span>{" "}
              from previous period
            </div>
          </CardContent>
        </Card>
  
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-700 dark:text-slate-300">
              Completion Rate
            </CardDescription>
            <CardTitle className="text-2xl text-slate-900 dark:text-white">
              66%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <span className="text-emerald-600 dark:text-emerald-400">↑8%</span>{" "}
              from previous period
            </div>
          </CardContent>
        </Card>
  
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-700 dark:text-slate-300">
              Avg. Completion Time
            </CardDescription>
            <CardTitle className="text-2xl text-slate-900 dark:text-white">
              2.4 days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <span className="text-emerald-600 dark:text-emerald-400">
                ↓0.5 days
              </span>{" "}
              from previous period
            </div>
          </CardContent>
        </Card>
  
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-700 dark:text-slate-300">
              Overdue Rate
            </CardDescription>
            <CardTitle className="text-2xl text-slate-900 dark:text-white">
              12.5%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <span className="text-red-600 dark:text-red-400">↑2.5%</span> from
              previous period
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  