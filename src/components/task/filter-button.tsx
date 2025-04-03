import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { Filter } from 'lucide-react';
import { useTaskContext } from '@/contextApis/task';
import { TaskPriority, TaskStatus } from '@prisma/client';

export default function FilterButton() {
  const { setTaskFilter } = useTaskContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-white/30 bg-white/40">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white/90 backdrop-blur-xl border-white/30">
        <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-slate-500">
            Status
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              setTaskFilter((previousState) => {
                return {
                  ...previousState,
                  status: 'all',
                };
              })
            }
          >
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setTaskFilter((previousState) => {
                return {
                  ...previousState,
                  status: TaskStatus.ACTIVE,
                };
              })
            }
          >
            Active
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setTaskFilter((previousState) => {
                return {
                  ...previousState,
                  status: TaskStatus.COMPLETED,
                };
              })
            }
          >
            Completed
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setTaskFilter((previousState) => {
                return {
                  ...previousState,
                  status: TaskStatus.OVERDUE,
                };
              })
            }
          >
            Overdue
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-slate-500">
            Priority
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              setTaskFilter((previousState) => {
                return {
                  ...previousState,
                  priority: 'all',
                };
              })
            }
          >
            All
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setTaskFilter((previousState) => {
                return {
                  ...previousState,
                  priority: TaskPriority.HIGH,
                };
              })
            }
          >
            High
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setTaskFilter((previousState) => {
                return {
                  ...previousState,
                  priority: TaskPriority.MEDIUM,
                };
              })
            }
          >
            Medium
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setTaskFilter((previousState) => {
                return {
                  ...previousState,
                  priority: TaskPriority.LOW,
                };
              })
            }
          >
            Low
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
