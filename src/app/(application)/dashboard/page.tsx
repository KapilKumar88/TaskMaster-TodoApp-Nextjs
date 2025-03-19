"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { TodoList } from "@/components/todo-list";
import { TaskCompletionChart } from "@/components/task-completion-chart";
import { CategoryDistributionChart } from "@/components/category-distribution-chart";
import { WeeklyProgressChart } from "@/components/weekly-progress-chart";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              16
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={66}
              className="h-2 bg-slate-200/70"
              // indicatorClassName="bg-emerald-500"
            />
            <div className="mt-1 text-xs text-slate-700 dark:text-slate-300">
              66% completion rate
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-700 dark:text-slate-300">
              In Progress
            </CardDescription>
            <CardTitle className="text-2xl text-slate-900 dark:text-white">
              5
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={20}
              className="h-2 bg-slate-200/70"
              // indicatorClassName="bg-indigo-500"
            />
            <div className="mt-1 text-xs text-slate-700 dark:text-slate-300">
              20% of all tasks
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-700 dark:text-slate-300">
              Overdue
            </CardDescription>
            <CardTitle className="text-2xl text-slate-900 dark:text-white">
              3
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <span className="text-red-600 dark:text-red-400">↓25%</span> from
              last week
            </div>
          </CardContent>
        </Card>
      </div>

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
