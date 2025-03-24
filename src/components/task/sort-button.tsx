import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useTaskContext } from "@/contextApis/task";

export default function SortButton() {
  const { taskSorting, setTaskSorting } = useTaskContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-white/30 bg-white/40">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-xl border-white/30">
        <DropdownMenuLabel>Sort Tasks</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            setTaskSorting((previousState) => {
              return {
                ...previousState,
                sortBy: "dueDate",
                sortDirection: "asc",
              };
            })
          }
        >
          Due Date (Ascending)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            setTaskSorting((previousState) => {
              return {
                ...previousState,
                sortBy: "dueDate",
                sortDirection: "desc",
              };
            })
          }
        >
          Due Date (Descending)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            setTaskSorting((previousState) => {
              return {
                ...previousState,
                sortBy: "priority",
                sortDirection: "asc",
              };
            })
          }
        >
          Priority (High to Low)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            setTaskSorting((previousState) => {
              return {
                ...previousState,
                sortBy: "priority",
                sortDirection: "desc",
              };
            })
          }
        >
          Priority (Low to High)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            setTaskSorting((previousState) => {
              return {
                ...previousState,
                sortBy: "alphabetical",
                sortDirection: "asc",
              };
            })
          }
        >
          Alphabetical (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            setTaskSorting((previousState) => {
              return {
                ...previousState,
                sortBy: "alphabetical",
                sortDirection: "desc",
              };
            })
          }
        >
          Alphabetical (Z-A)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
