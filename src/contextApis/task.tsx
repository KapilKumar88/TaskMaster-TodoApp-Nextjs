"use client";
import { TaskPriority, TaskStatus } from "@prisma/client";
import {
  createContext,
  Dispatch,
  JSX,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

type TaskFilter = {
  status?: TaskStatus;
  priority?: TaskPriority;
};

type TaskSort = {
  sortBy?: "dueDate" | "priority" | "alphabetical";
  sortDirection?: "asc" | "desc";
};

type TaskPagination = {
  page: number;
  pageSize: number;
  totalNumberOfRecords: number;
};

export type TaskContextType = {
  taskFilter: TaskFilter;
  setTaskFilter: Dispatch<SetStateAction<TaskFilter>>;
  taskSorting: TaskSort;
  setTaskSorting: Dispatch<SetStateAction<TaskSort>>;
  pagination: TaskPagination;
  setPagination: Dispatch<SetStateAction<TaskPagination>>;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [taskFilter, setTaskFilter] = useState<TaskFilter>({});

  const [taskSorting, setTaskSorting] = useState<TaskSort>({});

  const [pagination, setPagination] = useState<TaskPagination>({
    page: 1,
    pageSize: 10,
    totalNumberOfRecords: 0,
  });

  const value = useMemo(
    () => ({
      taskFilter,
      setTaskFilter,
      taskSorting,
      setTaskSorting,
      pagination,
      setPagination,
    }),
    [
      taskFilter,
      setTaskFilter,
      taskSorting,
      setTaskSorting,
      pagination,
      setPagination,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error(
      "useTaskContext must be used within an TaskContextProvider"
    );
  }
  return context;
};
