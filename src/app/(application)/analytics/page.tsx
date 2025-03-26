"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TaskCompletionChart from "@/components/dashboard/task-completion-chart";
import { CategoryDistributionChart } from "@/components/category-distribution-chart";
import WeeklyProgressChart from "@/components/dashboard/weekly-progress-chart";
import { ProductivityChart } from "@/components/productivity-chart";
import { CompletionRateChart } from "@/components/completion-rate-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Download } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AnalyticsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 2, 1),
    to: new Date(2025, 2, 19),
  });
  return (
    <main className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
          Analytics
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-auto justify-start text-left font-normal border-white/30 bg-white/40",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-white/90 backdrop-blur-xl border-white/30"
              align="end"
            >
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
                className="bg-transparent md:hidden"
              />
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className="bg-transparent hidden md:block"
              />
            </PopoverContent>
          </Popover>

          <Select defaultValue="weekly">
            <SelectTrigger className="w-full sm:w-[180px] border-white/30 bg-white/40">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-white/30 bg-white/40">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

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
              <span className="text-emerald-600 dark:text-emerald-400">
                ↑12%
              </span>{" "}
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
              <span className="text-emerald-600 dark:text-emerald-400">
                ↑8%
              </span>{" "}
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

      <div className="grid gap-4 md:gap-6 mt-4 md:mt-6 grid-cols-1 md:grid-cols-2">
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyProgressChart />
          </CardContent>
        </Card>

        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Productivity by Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProductivityChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 mt-4 md:mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Task Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaskCompletionChart />
          </CardContent>
        </Card>

        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryDistributionChart />
          </CardContent>
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
    </main>
  );
}
