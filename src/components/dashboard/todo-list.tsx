'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { LoaderPinwheel, Star, Trash2 } from 'lucide-react';
import { TaskInterface } from '@/lib/interfaces/task.interface';
import { TaskStatus } from '@prisma/client';
import { capitalizeFirstLetters, getPriorityColor } from '@/lib/utils';
import { TaskDetailDialog } from '../task/task-detail-dialog';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { UpdateTaskFormState } from '@/lib/interfaces/server-action.interface';
import {
  deleteTask,
  makeTaskCompleted,
  markTaskImportant,
} from '@/server-actions/task.actions';
import { toast } from '../common/sonner';
import { ToastVariation } from '@/lib/enums';
import ErrorAlertDialogBox from '../common/alert-box/error-alert-box';
import { useDateTimeSettingContext } from '@/contextApis/date-time-setting';

export function TodoList({ tasks }: Readonly<{ tasks: TaskInterface[] }>) {
  const { formatDateTime } = useDateTimeSettingContext();
  const [openTaskDetailBox, setOpenTaskDetailBox] = useState<boolean>(false);
  const [openDeleteAlertBox, setOpenDeleteAlertBox] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskInterface | null>(null);
  const [
    markTaskImportState,
    markTaskImportantAction,
    markTaskImportantPending,
  ] = useActionState<UpdateTaskFormState, FormData>(markTaskImportant, {
    message: '',
    success: false,
  });
  const [markTaskCompleteState, markTaskCompleteAction] = useActionState<
    UpdateTaskFormState,
    FormData
  >(makeTaskCompleted, {
    message: '',
    success: false,
  });
  const [deleteTaskState, deleteTaskAction, deleteTaskPending] = useActionState<
    UpdateTaskFormState,
    FormData
  >(deleteTask, {
    message: '',
    success: false,
  });

  useEffect(() => {
    if (markTaskCompleteState.success) {
      toast({
        message: markTaskCompleteState.message,
        variation: ToastVariation.SUCCESS,
      });
      markTaskCompleteState.success = false;
      markTaskCompleteState.message = '';
    }

    if (markTaskImportState.success) {
      toast({
        message: markTaskImportState.message,
        variation: ToastVariation.SUCCESS,
      });
      markTaskImportState.success = false;
      markTaskImportState.message = '';
    }

    if (deleteTaskState.success) {
      toast({
        message: deleteTaskState.message,
        variation: ToastVariation.SUCCESS,
      });
      deleteTaskState.success = false;
      deleteTaskState.message = '';
    }
  }, [markTaskCompleteState, markTaskImportState, deleteTaskState]);

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
            className="flex items-center justify-between rounded-lg border border-white/30 bg-white/40 p-3 backdrop-blur-sm w-full"
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={todo.status === TaskStatus.COMPLETED}
                onCheckedChange={(value) => {
                  startTransition(() => {
                    const formData = new FormData();
                    formData.append('taskId', todo.id.toString());
                    formData.append('markAsCompleted', value.toString());
                    markTaskCompleteAction(formData);
                  });
                }}
                className="border-slate-400 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
              <button
                type="button"
                onClick={() => {
                  setOpenTaskDetailBox(true);
                  setSelectedTask(todo);
                }}
              >
                <p
                  className={`text-sm font-medium text-left ${
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
                    style={{
                      backgroundColor: todo.category?.color,
                    }}
                  >
                    {capitalizeFirstLetters(todo.category?.name ?? '')}
                  </Badge>
                  <span className="text-xs text-slate-700 dark:text-slate-300">
                    Due: {formatDateTime(todo.dueDateTime)}
                  </span>
                </div>
              </button>
            </div>
            <div className="flex items-start">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-700 dark:text-slate-300 hover:text-amber-500"
                onClick={() => {
                  setSelectedTask(todo);
                  startTransition(() => {
                    const formData = new FormData();
                    formData.append('taskId', todo.id.toString());
                    formData.append(
                      'markAsImportant',
                      (!todo?.markAsImportant)?.toString(),
                    );
                    markTaskImportantAction(formData);
                  });
                }}
              >
                {markTaskImportantPending && selectedTask?.id === todo.id ? (
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Star
                    className={`h-4 w-4 ${
                      todo.markAsImportant
                        ? 'fill-amber-400 text-amber-400'
                        : ''
                    }`}
                  />
                )}

                <span className="sr-only">Star task</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  setOpenDeleteAlertBox(true);
                }}
              >
                {deleteTaskPending && selectedTask?.id === todo.id ? (
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-1" />
                )}
                <span className="sr-only">Delete Task</span>
              </Button>
              <ErrorAlertDialogBox
                open={openDeleteAlertBox}
                dialogTitle="Delete Task?"
                dialogDescription="Are you sure you want to delete this task? This action cannot be undone."
                onConfirm={() => {
                  setSelectedTask(todo);
                  startTransition(() => {
                    const formData = new FormData();
                    formData.append('taskId', todo.id.toString());
                    deleteTaskAction(formData);
                  });
                  setOpenDeleteAlertBox(false);
                }}
                onCancel={() => {
                  setOpenDeleteAlertBox(false);
                }}
              />
            </div>
          </div>
        ))}
      {selectedTask && (
        <TaskDetailDialog
          task={selectedTask}
          open={openTaskDetailBox}
          onOpenChange={setOpenTaskDetailBox}
        />
      )}
    </div>
  );
}
