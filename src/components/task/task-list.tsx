"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Star } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { API_ENDPOINTS } from "@/lib/constants";
import {
  capitalizeFirstLetters,
  getPriorityColor,
  getStatusColor,
} from "@/lib/utils";
import { TaskStatus } from "@prisma/client";
import { TaskInterface } from "@/lib/interfaces/task.interface";
import TaskPagination from "./task-pagination";
import { useTaskContext } from "@/contextApis/task";
import { set } from "date-fns";

interface TaskListProps {
  filter?: "all" | "today" | "upcoming" | "completed";
}

export function TaskList({ filter = "all" }: Readonly<TaskListProps>) {
  const { pagination, setPagination } = useTaskContext();
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const fetchTaskList = async () => {
      const apiResponse = await fetch(
        `${API_ENDPOINTS.TASK.LIST}?filter=${encodeURIComponent(filter)}&page=${
          pagination.page
        }&limit=${pagination.pageSize}`
      );
      const apiResponseJson = await apiResponse.json();
      setTasks((previousState) => {
        return apiResponseJson?.data?.totalRecordsCount > 0
          ? apiResponseJson.data.records
          : previousState;
      });
      setTotalNumberOfRecords(apiResponseJson?.data?.totalRecordsCount ?? 0);
    };
    fetchTaskList();
  }, [filter, pagination]);

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-700 dark:text-slate-300">No tasks found</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={`task-Id-${task.id}-${task.categoryId}`}
            className="flex items-start justify-between rounded-lg border border-white/30 bg-white/40 p-4 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={task?.status === TaskStatus.COMPLETED}
                // onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1 border-slate-400 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-medium ${
                      task.status === TaskStatus.COMPLETED
                        ? "text-slate-500 line-through"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {task.title}
                  </p>
                  {task.starred && (
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  )}
                </div>
                {task.description && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 line-clamp-2">
                    {task.description}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs text-white ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs text-white ${task.category?.color}`}
                  >
                    {capitalizeFirstLetters(task?.category?.name ?? "")}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs text-white ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </Badge>
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-700 dark:text-slate-300 hover:text-amber-500"
                // onClick={() => toggleStarred(task.id)}
              >
                <Star
                  className={`h-4 w-4 ${
                    task.starred ? "fill-amber-400 text-amber-400" : ""
                  }`}
                />
                <span className="sr-only">Star task</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-xl border-white/30">
                  <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  <DropdownMenuItem>Set Priority</DropdownMenuItem>
                  <DropdownMenuItem>Change Category</DropdownMenuItem>
                  <DropdownMenuItem>Change Due Date</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      )}
      <TaskPagination totalNumberOfRecords={totalNumberOfRecords} />
    </div>
  );
}
