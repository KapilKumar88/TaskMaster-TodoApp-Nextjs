'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Clock, LoaderPinwheel, Star, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import {
  capitalizeFirstLetters,
  getPriorityColor,
  getStatusColor,
} from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { TaskInterface } from '@/lib/interfaces/task.interface';
import { TaskStatus } from '@prisma/client';
import { startTransition, useActionState, useEffect, useState } from 'react';
import {
  deleteTask,
  makeTaskCompleted,
  markTaskImportant,
} from '@/server-actions/task.actions';
import { UpdateTaskFormState } from '@/lib/interfaces/server-action.interface';
import { toast } from '../common/sonner';
import { ToastVariation } from '@/lib/enums';

export function TaskDetail({
  task,
  close,
}: Readonly<{
  task: TaskInterface;
  close: () => void;
}>) {
  const [tempTask, setTempTask] = useState(task);
  const [
    markTaskImportState,
    markTaskImportantAction,
    markTaskImportantPending,
  ] = useActionState<UpdateTaskFormState, FormData>(markTaskImportant, {
    message: '',
    success: false,
    formValues: {
      taskId: tempTask.id,
      markAsImportant: tempTask.markAsImportant,
    },
  });
  const [
    markTaskCompleteState,
    markTaskCompleteAction,
    markTaskCompletePending,
  ] = useActionState<UpdateTaskFormState, FormData>(makeTaskCompleted, {
    message: '',
    success: false,
    formValues: {
      taskId: tempTask.id,
      markAsCompleted: tempTask.status === TaskStatus.COMPLETED,
    },
  });
  const [deleteTaskState, deleteTaskAction, deleteTaskPending] = useActionState<
    UpdateTaskFormState,
    FormData
  >(deleteTask, {
    message: '',
    success: false,
    formValues: {
      taskId: tempTask.id,
    },
  });

  useEffect(() => {
    if (markTaskCompleteState.success) {
      toast({
        message: markTaskCompleteState.message,
        variation: ToastVariation.SUCCESS,
      });
      setTempTask((prevState) => {
        return {
          ...prevState,
          status: markTaskCompleteState?.formValues?.markAsCompleted
            ? TaskStatus.COMPLETED
            : TaskStatus.ACTIVE,
        };
      });
      markTaskCompleteState.success = false;
      markTaskCompleteState.message = '';
    }

    if (markTaskImportState.success) {
      toast({
        message: markTaskImportState.message,
        variation: ToastVariation.SUCCESS,
      });
      setTempTask((prevState) => {
        return {
          ...prevState,
          markAsImportant:
            markTaskImportState?.formValues?.markAsImportant ?? false,
        };
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
      close();
    }
  }, [markTaskCompleteState, markTaskImportState, deleteTaskState]);

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className="text-slate-900 dark:text-white text-xl pr-8 flex">
            {task?.title}
            <div className="flex items-center gap-2 ml-2">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${tempTask?.markAsImportant ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
                onClick={() => {
                  startTransition(() => {
                    const formData = new FormData();
                    formData.append('taskId', task.id.toString());
                    formData.append(
                      'markAsImportant',
                      (!tempTask.markAsImportant).toString(),
                    );
                    markTaskImportantAction(formData);
                  });
                }}
              >
                {markTaskImportantPending ? (
                  <LoaderPinwheel className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Star
                      className={`h-5 w-5 ${tempTask?.markAsImportant ? 'fill-amber-500' : ''}`}
                    />
                    <span className="sr-only">
                      {tempTask?.markAsImportant ? 'Unstar' : 'Star'}
                    </span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="text-slate-700 dark:text-slate-300">
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge
              variant="outline"
              className={`text-xs text-white ${getPriorityColor(
                task.priority,
              )}`}
            >
              {task.priority}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs text-white"
              style={{
                backgroundColor: task.category?.color,
              }}
            >
              {capitalizeFirstLetters(task.category?.name ?? '')}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4 py-4">
        {task.description && (
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
              Description
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
              {task.description}
            </p>
          </div>
        )}

        <Separator className="bg-white/30" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
              Due Date
            </h3>
            <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
              <Clock className="h-4 w-4 mr-2" />
              {task.dueDate
                ? format(new Date(task.dueDate), 'PPP')
                : 'No due date'}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">
              Status
            </h3>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full ${getStatusColor(
                  tempTask.status,
                )} mr-2`}
              ></div>
              <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">
                {tempTask.status}
              </span>
            </div>
          </div>
        </div>

        <Separator className="bg-white/30" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="completed-view"
              defaultChecked={tempTask.status === TaskStatus.COMPLETED}
              checked={tempTask.status === TaskStatus.COMPLETED}
              onCheckedChange={(value) => {
                startTransition(() => {
                  const formData = new FormData();
                  formData.append('taskId', task.id.toString());
                  formData.append('markAsCompleted', value.toString());
                  markTaskCompleteAction(formData);
                });
              }}
            />
            <Label
              htmlFor="completed-view"
              className="text-slate-900 dark:text-white"
            >
              {markTaskCompletePending && (
                <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
              )}
              {!markTaskCompletePending &&
                (tempTask.status === TaskStatus.COMPLETED
                  ? 'Completed'
                  : 'Mark as completed')}
            </Label>
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                startTransition(() => {
                  const formData = new FormData();
                  formData.append('taskId', task.id.toString());
                  deleteTaskAction(formData);
                });
              }}
            >
              {deleteTaskPending ? (
                <>
                  <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
