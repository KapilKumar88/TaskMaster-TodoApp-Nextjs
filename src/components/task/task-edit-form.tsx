'use client';

import { useActionState } from 'react';
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
import { CalendarIcon, Plus, SaveIcon, Star } from 'lucide-react';
import { format } from 'date-fns';
import { capitalizeFirstLetters, getPriorityColor } from '@/lib/utils';
import { DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { TaskInterface } from '@/lib/interfaces/task.interface';
import { useCategoryContext } from '@/contextApis/categories';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { updateTaskServerAction } from '@/server-actions/task.actions';
import { UpdateTaskFormState } from '@/lib/interfaces/server-action.interface';

interface TaskDetailDialogProps {
  task: TaskInterface;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
}

export function TaskEditForm({
  task,
  setIsEditing,
}: Readonly<TaskDetailDialogProps>) {
  const { categories } = useCategoryContext();
  const [updateTaskState, updateTaskAction] = useActionState<
    UpdateTaskFormState,
    FormData
  >(updateTaskServerAction, {
    errors: {},
    formValues: {
      id: task.id,
      title: task.title,
      description: task.description,
      categoryId: task.categoryId,
      priority: task.priority,
      status: task.status,
      dueDate: task?.dueDate?.toString(),
      markTaskImportant: task.markAsImportant ?? false,
    },
    message: '',
    success: false,
  });

  return (
    <form action={updateTaskAction}>
      <div>
        <div className="flex items-center justify-between">
          <DialogTitle className="text-slate-900 dark:text-white text-xl pr-8">
            <Input
              defaultValue={updateTaskState.formValues?.title}
              className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
            />
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${updateTaskState.formValues?.markTaskImportant ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
              // onClick={}
            >
              <Star
                className={`h-5 w-5 ${updateTaskState.formValues?.markTaskImportant ? 'fill-amber-500' : ''}`}
              />
              <span className="sr-only">
                {updateTaskState.formValues?.markTaskImportant
                  ? 'Unstar'
                  : 'Star'}
              </span>
            </Button>
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
            <Badge
              variant="outline"
              className={`text-sm font-medium text-left ${
                task.status === TaskStatus.COMPLETED
                  ? 'text-slate-500 line-through'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {task.status}
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
            placeholder="Enter task description"
            className="min-h-[100px] bg-white/40 border-white/30 text-slate-900 dark:text-white"
            defaultValue={updateTaskState.formValues?.description}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-slate-900 dark:text-white"
            >
              Category
            </Label>
            <div className="flex gap-2">
              <Select
                value={updateTaskState.formValues?.categoryId?.toString()}
              >
                <SelectTrigger
                  id="category"
                  className="bg-white/40 border-white/30 text-slate-900 dark:text-white flex-1"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.name}
                      value={category.id?.toString()}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="capitalize">
                          {capitalizeFirstLetters(category.name)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="border-white/30 bg-white/40"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add category</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="priority"
              className="text-slate-900 dark:text-white"
            >
              Priority
            </Label>
            <Select defaultValue={updateTaskState.formValues?.priority}>
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
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-slate-900 dark:text-white">
            Status
          </Label>
          <Select defaultValue={updateTaskState.formValues?.status}>
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
                // className={cn(
                //   'w-full justify-start text-left font-normal border-white/30 bg-white/40',
                //   !date && 'text-muted-foreground',
                // )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {updateTaskState.formValues?.dueDate ? (
                  format(updateTaskState.formValues?.dueDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white/90 backdrop-blur-xl border-white/30">
              <Calendar
                mode="single"
                // selected={date}
                // onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="completed"
            defaultChecked={
              updateTaskState.formValues?.status === TaskStatus.COMPLETED
            }
            // checked={editedTask?.completed}
            // onCheckedChange={handleToggleCompleted}
          />
          <Label htmlFor="completed" className="text-slate-900 dark:text-white">
            Mark as completed
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant="outline"
          onClick={() => {
            setIsEditing(false);
          }}
          className="border-white/30 bg-white/40"
          // disabled={pending}
        >
          Cancel
        </Button>
        <Button
          className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
          // onClick={handleEditToggle}
        >
          <SaveIcon className="h-4 w-4 mr-2" />
          Update
        </Button>
      </div>
    </form>
  );
}
