'use client';

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
import { CalendarIcon, LoaderPinwheel, PlusCircleIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useActionState, useEffect, useState } from 'react';
import { CreateTaskFormState } from '@/lib/interfaces/server-action.interface';
import { createTaskServerAction } from '@/server-actions/task.actions';
import { TaskPriority } from '@prisma/client';
import { ToastVariation } from '@/lib/enums';
import { toast } from '../common/sonner';
import AddCategoryForm from '../category/add-category-form';
import { Switch } from '../ui/switch';
import CategorySelectBox from '../common/select/catgeory-select-box';

interface TaskFormProps {
  onClose: () => void;
}

const formDataInitialState = {
  dueDate: new Date(),
  categoryId: 0,
  priority: TaskPriority.LOW,
  categoryName: 'Select Category',
  markAsDraft: false,
};

export function TaskForm({ onClose }: Readonly<TaskFormProps>) {
  const [state, action, pending] = useActionState<
    CreateTaskFormState,
    FormData
  >(createTaskServerAction, {
    errors: {},
    formValues: {
      title: '',
      description: '',
      categoryId: '0',
      priority: TaskPriority.LOW,
      dueDate: new Date().toISOString(),
    },
    message: '',
    success: false,
  });

  const [showAddCategory, setShowAddCategory] = useState(false);

  const [formData, setFormData] = useState<{
    dueDate?: Date;
    categoryId?: number;
    categoryName?: string;
    priority?: TaskPriority;
    markAsDraft: boolean;
  }>(formDataInitialState);

  const [formErrors, setFormErrors] = useState<{
    title?: string;
    description?: string;
    categoryId?: string;
    priority?: string;
    dueDate?: string;
    dueTime?: string;
  }>({
    title: undefined,
    description: undefined,
    categoryId: undefined,
    priority: undefined,
    dueDate: undefined,
    dueTime: undefined,
  });

  const handleInputChange = (fieldName: string) => {
    setFormErrors({
      ...formErrors,
      [fieldName]: undefined,
    });
  };

  useEffect(() => {
    if (state?.errors) {
      setFormErrors((previousState) => {
        return {
          ...previousState,
          title:
            Array.isArray(state?.errors?.title) &&
            state.errors.title?.length > 0
              ? state.errors.title[0]
              : undefined,
          description:
            Array.isArray(state?.errors?.description) &&
            state.errors.description?.length > 0
              ? state.errors.description[0]
              : undefined,
          categoryId:
            Array.isArray(state?.errors?.categoryId) &&
            state.errors.categoryId?.length > 0
              ? state.errors.categoryId[0]
              : undefined,
          priority:
            Array.isArray(state?.errors?.priority) &&
            state.errors.priority?.length > 0
              ? state.errors.priority[0]
              : undefined,
          dueDate:
            Array.isArray(state?.errors?.dueDate) &&
            state.errors.dueDate?.length > 0
              ? state.errors.dueDate[0]
              : undefined,
          dueTime:
            Array.isArray(state?.errors?.dueTime) &&
            state.errors.dueTime?.length > 0
              ? state.errors.dueTime[0]
              : undefined,
        };
      });

      if (state.errors?.general) {
        toast({
          variation: ToastVariation.ERROR,
          message: state.errors.general,
        });
        return;
      }
    }

    if (state?.success) {
      toast({
        variation: ToastVariation.SUCCESS,
        message: state.message,
      });
      setFormData(formDataInitialState);
      setShowAddCategory(false);
      onClose();
    }
  }, [state]);

  return (
    <form
      action={(payload) => {
        payload.append('dueDate', formData.dueDate?.toDateString() ?? '');
        payload.append('categoryId', formData?.categoryId?.toString() ?? '');
        payload.append('priority', formData.priority?.toString() ?? '');
        payload.append(
          'markAsDraft',
          formData.markAsDraft?.toString() ?? 'false',
        );
        action(payload);
      }}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="title" className="text-slate-900 dark:text-white">
            Task Title <span className="text-red-500">*</span>
          </Label>
        </div>
        <Input
          id="title"
          name="title"
          placeholder="Enter task title"
          className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
          defaultValue={state.formValues?.title}
          onChange={() => handleInputChange('title')}
        />
        {formErrors?.title && (
          <p className="text-red-500 text-sm">{formErrors?.title}</p>
        )}

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-slate-900 dark:text-white"
          >
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter task description"
            className="min-h-[80px] bg-white/40 border-white/30 text-slate-900 dark:text-white"
            defaultValue={state.formValues?.description}
            onChange={() => handleInputChange('description')}
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
              selectedCategoryId={formData.categoryId ?? 0}
              setSelectedCategoryId={(id) => {
                setFormData((previousState) => {
                  return {
                    ...previousState,
                    categoryId: id,
                  };
                });
              }}
            />
            {formErrors?.categoryId && (
              <p className="text-red-500 text-sm">{formErrors?.categoryId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="priority"
              className="text-slate-900 dark:text-white"
            >
              Priority
            </Label>
            <Select
              defaultValue={state.formValues?.priority}
              onValueChange={(value) => {
                setFormData((previousState) => {
                  return {
                    ...previousState,
                    priority: value as TaskPriority,
                  };
                });
                handleInputChange('priority');
              }}
            >
              <SelectTrigger
                id="priority"
                name="priority"
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
          <Label htmlFor="due-date" className="text-slate-900 dark:text-white">
            Due Date <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="due-date"
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal border-white/30 bg-white/40',
                  !formData.dueDate && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dueDate ? (
                  format(formData.dueDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white/90 backdrop-blur-xl border-white/30">
              <Calendar
                mode="single"
                selected={formData.dueDate}
                onSelect={(payload) => {
                  setFormData((previousState) => {
                    return {
                      ...previousState,
                      dueDate: payload,
                    };
                  });
                  handleInputChange('dueDate');
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {formErrors?.dueDate && (
            <p className="text-red-500 text-sm">{formErrors?.dueDate}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="completed"
            checked={formData.markAsDraft}
            onCheckedChange={() => {
              setFormData((previousState) => {
                return {
                  ...previousState,
                  markAsDraft: !previousState.markAsDraft,
                };
              });
            }}
          />
          <Label htmlFor="completed" className="text-slate-900 dark:text-white">
            Save as draft
          </Label>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/30 bg-white/40"
            disabled={pending}
          >
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
            disabled={pending}
          >
            {pending && (
              <>
                <LoaderPinwheel className="mr-2 h-8 w-8 animate-spin" />
                Saving...
              </>
            )}
            {!pending && 'Create Task'}
          </Button>
        </div>
      </div>
    </form>
  );
}
