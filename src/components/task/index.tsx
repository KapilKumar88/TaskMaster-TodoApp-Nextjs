"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskForm } from "@/components/task/task-form";
import {  Plus } from "lucide-react";
import TaskListCard from "./task-list-card";
import TaskStatsByCategory from "./task-stats-by-category";
import { TaskContextProvider } from "@/contextApis/task";
import FilterButton from "./filter-button";
import SortButton from "./sort-button";
import SearchInput from "./search-input";

export default function Task({
  categories,
}: Readonly<{
  categories: { id: number; name: string }[];
}>) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  return (
    <TaskContextProvider>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
          Tasks
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput />

          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <FilterButton />
            <SortButton />
            <Button
              className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white sm:whitespace-nowrap"
              onClick={() => setShowTaskForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white/40 border border-white/30 mb-6 w-full overflow-x-auto flex-nowrap md:w-auto">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="today"
            className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <TabsContent value="all" className="mt-0">
              <TaskListCard cardTitle="All Tasks" />
            </TabsContent>

            <TabsContent value="today" className="mt-0">
              <TaskListCard cardTitle="Today&apos;s Tasks" filter="today" />
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              <TaskListCard cardTitle="Upcoming Tasks" filter="upcoming" />
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <TaskListCard cardTitle="Completed Tasks" filter="completed" />
            </TabsContent>
          </div>

          <div>
            <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md sticky top-20">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  {showTaskForm ? "Add New Task" : "Task Categories"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showTaskForm ? (
                  <TaskForm
                    categories={categories}
                    onClose={() => setShowTaskForm(false)}
                  />
                ) : (
                  <div className="space-y-4">
                    <TaskStatsByCategory />

                    <div className="pt-4 border-t border-white/30">
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                        Quick Add
                      </h3>
                      <Button
                        className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
                        onClick={() => setShowTaskForm(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        New Task
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </TaskContextProvider>
  );
}
