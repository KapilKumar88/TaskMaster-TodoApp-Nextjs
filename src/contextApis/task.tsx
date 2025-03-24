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
  status?: TaskStatus | "all";
  priority?: TaskPriority | "all";
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
  searchText: string | null | undefined;
  setSearchText: Dispatch<SetStateAction<string | null | undefined>>;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [taskFilter, setTaskFilter] = useState<TaskFilter>({
    status: "all",
    priority: "all",
  });

  const [taskSorting, setTaskSorting] = useState<TaskSort>({
    sortBy: "dueDate",
    sortDirection: "asc",
  });

  const [pagination, setPagination] = useState<TaskPagination>({
    page: 1,
    pageSize: 10,
    totalNumberOfRecords: 0,
  });

  const [searchText, setSearchText] = useState<string | null | undefined>(null);

  const value = useMemo(
    () => ({
      taskFilter,
      setTaskFilter,
      taskSorting,
      setTaskSorting,
      pagination,
      setPagination,
      setSearchText,
      searchText,
    }),
    [
      taskFilter,
      setTaskFilter,
      taskSorting,
      setTaskSorting,
      pagination,
      setPagination,
      setSearchText,
      searchText,
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
