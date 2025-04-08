'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  CalendarIcon,
  LoaderPinwheel,
  PlusCircleIcon,
  SaveIcon,
  Star,
} from 'lucide-react';
import { format } from 'date-fns';
import {
  capitalizeFirstLetters,
  cn,
  getPriorityColor,
  getStatusColor,
} from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { TaskInterface } from '@/lib/interfaces/task.interface';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { updateTaskServerAction } from '@/server-actions/task.actions';
import { UpdateTaskFormState } from '@/lib/interfaces/server-action.interface';
import { toast } from '../common/sonner';
import { ToastVariation } from '@/lib/enums';
import CategorySelectBox from '../common/select/catgeory-select-box';
import AddCategoryForm from '../category/add-category-form';

interface TaskDetailDialogProps {
  task: TaskInterface;
  close: () => void;
  setIsEditing: () => void;
}

export function TaskEditForm({
  task,
  setIsEditing,
  close,
}: Readonly<TaskDetailDialogProps>) {
  const [tempTask, setTempTask] = useState(task);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    title?: string;
    description?: string;
    categoryId?: string;
    priority?: string;
    dueDate?: string;
    dueTime?: string;
    status?: string;
  }>({
    title: undefined,
    description: undefined,
    categoryId: undefined,
    priority: undefined,
    dueDate: undefined,
    dueTime: undefined,
    status: undefined,
  });
  const [updateTaskState, updateTaskAction, updateTaskPending] = useActionState<
    UpdateTaskFormState,
    FormData
  >(updateTaskServerAction, {
    errors: {},
    formValues: {
      taskId: tempTask.id,
      title: tempTask.title,
      description: tempTask.description,
      categoryId: tempTask.categoryId?.toString() ?? '0',
      priority: tempTask.priority,
      status: tempTask.status,
      dueDate: tempTask?.dueDate?.toString(),
      markAsImportant: tempTask.markAsImportant,
      markAsCompleted: tempTask.status === TaskStatus.COMPLETED,
    },
    message: '',
    success: false,
  });

  useEffect(() => {
    if (updateTaskState?.errors) {
      setFormErrors((previousState) => {
        return {
          ...previousState,
          title:
            Array.isArray(updateTaskState?.errors?.title) &&
            updateTaskState.errors.title?.length > 0
              ? updateTaskState.errors.title[0]
              : undefined,
          description:
            Array.isArray(updateTaskState?.errors?.description) &&
            updateTaskState.errors.description?.length > 0
              ? updateTaskState.errors.description[0]
              : undefined,
          categoryId:
            Array.isArray(updateTaskState?.errors?.categoryId) &&
            updateTaskState.errors.categoryId?.length > 0
              ? updateTaskState.errors.categoryId[0]
              : undefined,
          priority:
            Array.isArray(updateTaskState?.errors?.priority) &&
            updateTaskState.errors.priority?.length > 0
              ? updateTaskState.errors.priority[0]
              : undefined,
          status:
            Array.isArray(updateTaskState?.errors?.status) &&
            updateTaskState.errors.status?.length > 0
              ? updateTaskState.errors.status[0]
              : undefined,
          dueDate:
            Array.isArray(updateTaskState?.errors?.dueDate) &&
            updateTaskState.errors.dueDate?.length > 0
              ? updateTaskState.errors.dueDate[0]
              : undefined,
          dueTime:
            Array.isArray(updateTaskState?.errors?.dueTime) &&
            updateTaskState.errors.dueTime?.length > 0
              ? updateTaskState.errors.dueTime[0]
              : undefined,
        };
      });

      if (updateTaskState.errors?.general || updateTaskState.errors?.taskId) {
        const taskIdErrorMessage =
          Array.isArray(updateTaskState?.errors?.taskId) &&
          updateTaskState.errors.taskId?.length > 0
            ? updateTaskState.errors.taskId[0]
            : '';
        toast({
          variation: ToastVariation.ERROR,
          message: updateTaskState.errors.general ?? taskIdErrorMessage,
        });
        return;
      }
    }

    if (updateTaskState.success) {
      toast({
        message: updateTaskState.message,
        variation: ToastVariation.SUCCESS,
      });
      close();
      updateTaskState.message = '';
      updateTaskState.success = false;
    }
  }, [updateTaskState]);

  return (
    <form
      action={(formData) => {
        formData.append('taskId', tempTask.id.toString());
        formData.append('markAsImportant', tempTask.markAsImportant.toString());
        formData.append('categoryId', tempTask.categoryId.toString());
        formData.append('dueDate', tempTask.dueDate.toString());
        updateTaskAction(formData);
      }}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="text-slate-900 dark:text-white text-xl pr-8">
            <Input
              defaultValue={tempTask?.title}
              name="title"
              className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
            />
            {formErrors?.title && (
              <p className="text-red-500 text-sm">{formErrors?.title}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${tempTask?.markAsImportant ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
              onClick={() => {
                setTempTask((prevState) => {
                  return {
                    ...prevState,
                    markAsImportant: !prevState.markAsImportant,
                  };
                });
              }}
            >
              <Star
                className={`h-5 w-5 ${tempTask?.markAsImportant ? 'fill-amber-500' : ''}`}
              />
              <span className="sr-only">
                {tempTask?.markAsImportant ? 'Unstar' : 'Star'}
              </span>
            </Button>
          </div>
        </div>
        <div className="text-slate-700 dark:text-slate-300">
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge
              variant="outline"
              className={`text-xs text-white ${getPriorityColor(
                tempTask.priority,
              )}`}
            >
              {tempTask.priority}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs text-white"
              style={{
                backgroundColor: tempTask.category?.color,
              }}
            >
              {capitalizeFirstLetters(tempTask.category?.name ?? '')}
            </Badge>
            <Badge
              variant="outline"
              className={`text-sm font-medium text-left ${getStatusColor(tempTask.status)}`}
            >
              {tempTask.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-slate-900 dark:text-white"
          >
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter task description"
            className="min-h-[100px] bg-white/40 border-white/30 text-slate-900 dark:text-white"
            defaultValue={tempTask?.description}
          />
          {formErrors?.description && (
            <p className="text-red-500 text-sm">{formErrors?.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="category"
                className="text-slate-900 dark:text-white"
              >
                Category <span className="text-red-500">*</span>
              </Label>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => {
                  setShowAddCategory(true);
                }}
                className="h-4 w-4"
              >
                <PlusCircleIcon className="h-4 w-4" />
              </Button>
            </div>
            <CategorySelectBox
              errorMsg={formErrors?.categoryId}
              selectedCategoryId={tempTask.categoryId}
              setSelectedCategoryId={(id: number) => {
                setTempTask((previousState) => {
                  return {
                    ...previousState,
                    categoryId: id,
                  };
                });
              }}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="priority"
              className="text-slate-900 dark:text-white"
            >
              Priority
            </Label>
            <Select defaultValue={tempTask?.priority} name="priority">
              <SelectTrigger
                id="priority"
                className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
              >
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                <SelectItem value={TaskPriority.LOW}>Low</SelectItem>
                <SelectItem value={TaskPriority.MEDIUM}>Medium</SelectItem>
                <SelectItem value={TaskPriority.HIGH}>High</SelectItem>
              </SelectContent>
            </Select>
            {formErrors?.priority && (
              <p className="text-red-500 text-sm">{formErrors?.priority}</p>
            )}
          </div>
        </div>

        {showAddCategory && (
          <AddCategoryForm closeForm={() => setShowAddCategory(false)} />
        )}

        <div className="space-y-2">
          <Label htmlFor="status" className="text-slate-900 dark:text-white">
            Status
          </Label>
          <Select defaultValue={tempTask?.status} name="status">
            <SelectTrigger
              id="status"
              className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
              <SelectItem value={TaskStatus.ACTIVE}>Active</SelectItem>
              <SelectItem value={TaskStatus.COMPLETED}>Completed</SelectItem>
              <SelectItem value={TaskStatus.OVERDUE}>Overdue</SelectItem>
              <SelectItem value={TaskStatus.DRAFT}>Draft</SelectItem>
            </SelectContent>
          </Select>
          {formErrors?.status && (
            <p className="text-red-500 text-sm">{formErrors?.status}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="due-date" className="text-slate-900 dark:text-white">
            Due Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="due-date"
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal border-white/30 bg-white/40',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {tempTask?.dueDate ? (
                  format(tempTask?.dueDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white/90 backdrop-blur-xl border-white/30">
              <Calendar
                mode="single"
                selected={tempTask?.dueDate}
                onSelect={(payload) => {
                  setTempTask((previousState) => {
                    return {
                      ...previousState,
                      dueDate: payload ?? tempTask?.dueDate,
                    };
                  });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {formErrors?.dueDate && (
            <p className="text-red-500 text-sm">{formErrors?.dueDate}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant="outline"
          onClick={() => {
            setIsEditing();
          }}
          className="border-white/30 bg-white/40"
          disabled={updateTaskPending}
        >
          Cancel
        </Button>
        <Button
          className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
          disabled={updateTaskPending}
        >
          {updateTaskPending ? (
            <>
              <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <SaveIcon className="h-4 w-4 mr-2" />
              Update
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
