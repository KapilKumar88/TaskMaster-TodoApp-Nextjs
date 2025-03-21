import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskList } from "./task-list";
import { useTaskContext } from "@/contextApis/task";
import {
  PaginationNextWithIcon,
  PaginationPreviousWithIcon,
} from "../ui/pagination";

export default function TaskListCard({
  cardTitle,
  filter,
}: Readonly<{
  cardTitle: string;
  filter?: "all" | "today" | "upcoming" | "completed";
}>) {
  const { pagination, setPagination } = useTaskContext();
  return (
    <Card className="border border-white/30 bg-white/30 backdrop-blur-xl shadow-md">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">
          {cardTitle}
          <PaginationPreviousWithIcon
            aria-disabled={pagination.page === 1}
            onClick={() => {
              setPagination((previousState) => {
                return {
                  ...previousState,
                  page: previousState.page - 1,
                };
              });
            }}
          />
          <PaginationNextWithIcon
            onClick={() => {
              setPagination((previousState) => {
                return {
                  ...previousState,
                  page: previousState.page + 1,
                };
              });
            }}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TaskList filter={filter} />
      </CardContent>
    </Card>
  );
}
