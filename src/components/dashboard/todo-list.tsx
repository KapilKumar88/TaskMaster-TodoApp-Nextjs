'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { TaskInterface } from '@/lib/interfaces/task.interface';
import { TaskStatus } from '@prisma/client';
import { getPriorityColor } from '@/lib/utils';

export function TodoList({ tasks }: { tasks: TaskInterface[] }) {
  return (
    <div className="space-y-2">
      {tasks?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-700 dark:text-slate-300">No tasks found</p>
        </div>
      )}
      {tasks?.length > 0 &&
        tasks?.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between rounded-lg border border-white/30 bg-white/40 p-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={todo.status === TaskStatus.COMPLETED}
                // onCheckedChange={() => toggleTodo(todo.id)}
                className="border-slate-400 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
              <div>
                <p
                  className={`text-sm font-medium ${
                    todo.status === TaskStatus.COMPLETED
                      ? 'text-slate-500 line-through'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {todo.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs text-white ${getPriorityColor(
                      todo.priority,
                    )}`}
                  >
                    {todo.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs text-white ${todo.category?.color}`}
                  >
                    {todo.category?.name}
                  </Badge>
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        ))}
    </div>
  );
}
