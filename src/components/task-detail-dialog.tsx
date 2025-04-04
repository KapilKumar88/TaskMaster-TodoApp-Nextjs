'use client';

import { useState, useEffect } from 'react';
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
  Clock,
  Edit,
  Plus,
  Save,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ColorPicker } from './color-picker';

type Priority = 'low' | 'medium' | 'high';
type Category = string;
type Status = 'active' | 'completed' | 'overdue';

interface CategoryWithColor {
  name: string;
  color: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string;
  status: Status;
  starred: boolean;
}

interface TaskDetailDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskUpdate?: (updatedTask: Task) => void;
  onTaskDelete?: (taskId: string) => void;
}

// Default categories with colors
const defaultCategories: CategoryWithColor[] = [
  { name: 'work', color: '#6366f1' }, // indigo
  { name: 'personal', color: '#8b5cf6' }, // violet
  { name: 'study', color: '#3b82f6' }, // blue
  { name: 'health', color: '#14b8a6' }, // teal
];

export function TaskDetailDialog({
  task,
  open,
  onOpenChange,
  onTaskUpdate,
  onTaskDelete,
}: TaskDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [categories, setCategories] =
    useState<CategoryWithColor[]>(defaultCategories);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategoryColor, setSelectedCategoryColor] = useState('#6366f1'); // Default color
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Reset state when task changes
  useEffect(() => {
    setIsEditing(false);
    setEditedTask(task);

    if (task?.dueDate) {
      setDate(new Date(task.dueDate));
    } else {
      setDate(undefined);
    }

    // Load categories from localStorage if available
    const savedCategories = localStorage.getItem('taskCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, [task]);

  if (!task) return null;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: keyof Task, value: string) => {
    if (!editedTask) return;

    setEditedTask({
      ...editedTask,
      [field]: value,
    });
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);

    if (newDate && editedTask) {
      handleInputChange('dueDate', newDate.toISOString().split('T')[0]);
    }
  };

  const handleSave = () => {
    if (!editedTask) return;

    // Update task
    if (onTaskUpdate) {
      onTaskUpdate(editedTask);
    }

    toast.success('Task updated', {
      description: 'Your task has been updated successfully',
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!task) return;

    toast({
      title: 'Delete task?',
      description:
        'Are you sure you want to delete this task? This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: () => {
          if (onTaskDelete) {
            onTaskDelete(task.id);
          }

          toast.success('Task deleted', {
            description: 'Your task has been deleted successfully',
          });

          onOpenChange(false);
        },
      },
      cancel: {
        label: 'Cancel',
      },
    });
  };

  const handleToggleCompleted = () => {
    if (!editedTask) return;

    const newStatus = editedTask.completed ? 'active' : 'completed';

    setEditedTask({
      ...editedTask,
      completed: !editedTask.completed,
      status: newStatus as Status,
    });
  };

  const handleToggleStarred = () => {
    if (!editedTask) return;

    setEditedTask({
      ...editedTask,
      starred: !editedTask.starred,
    });
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const categoryExists = categories.some(
      (cat) => cat.name.toLowerCase() === newCategory.toLowerCase(),
    );

    if (categoryExists) {
      toast.error('Category already exists', {
        description: 'Please use a different name for your category',
      });
      return;
    }

    const updatedCategories = [
      ...categories,
      { name: newCategory, color: selectedCategoryColor },
    ];

    setCategories(updatedCategories);

    // Save to localStorage
    localStorage.setItem('taskCategories', JSON.stringify(updatedCategories));

    // Set the new category as the selected one
    if (editedTask) {
      handleInputChange('category', newCategory);
    }

    // Reset form
    setNewCategory('');
    setShowAddCategory(false);

    toast.success('Category added', {
      description: `New category "${newCategory}" has been added`,
    });
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category?.color || '#6366f1'; // Default to indigo if not found
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/80 hover:bg-red-500';
      case 'medium':
        return 'bg-amber-500/80 hover:bg-amber-500';
      case 'low':
        return 'bg-emerald-500/80 hover:bg-emerald-500';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500/80 hover:bg-blue-500';
      case 'completed':
        return 'bg-emerald-500/80 hover:bg-emerald-500';
      case 'overdue':
        return 'bg-red-500/80 hover:bg-red-500';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-white/80 backdrop-blur-xl border-white/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-slate-900 dark:text-white text-xl pr-8">
              {isEditing ? (
                <Input
                  value={editedTask?.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                />
              ) : (
                task.title
              )}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${editedTask?.starred ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
                onClick={handleToggleStarred}
              >
                <Star
                  className={`h-5 w-5 ${editedTask?.starred ? 'fill-amber-500' : ''}`}
                />
                <span className="sr-only">
                  {editedTask?.starred ? 'Unstar' : 'Star'}
                </span>
              </Button>
              {!isEditing ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-slate-700"
                  onClick={handleEditToggle}
                >
                  <Edit className="h-5 w-5" />
                  <span className="sr-only">Edit</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-slate-700"
                  onClick={handleEditToggle}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Cancel</span>
                </Button>
              )}
            </div>
          </div>
          <DialogDescription className="text-slate-700 dark:text-slate-300">
            {!isEditing && (
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  variant="outline"
                  className={`text-xs text-white ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs text-white"
                  style={{ backgroundColor: getCategoryColor(task.category) }}
                >
                  {task.category}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs text-white ${getStatusColor(task.status)}`}
                >
                  {task.status}
                </Badge>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isEditing ? (
            <>
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
                  value={editedTask?.description || ''}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
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
                      value={editedTask?.category}
                      onValueChange={(value) =>
                        handleInputChange('category', value)
                      }
                    >
                      <SelectTrigger
                        id="category"
                        className="bg-white/40 border-white/30 text-slate-900 dark:text-white flex-1"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              <span className="capitalize">
                                {category.name}
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
                      onClick={() => setShowAddCategory(!showAddCategory)}
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
                  <Select
                    value={editedTask?.priority}
                    onValueChange={(value) =>
                      handleInputChange('priority', value as Priority)
                    }
                  >
                    <SelectTrigger
                      id="priority"
                      className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {showAddCategory && (
                <div className="p-4 border border-white/30 bg-white/30 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                      Add New Category
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setShowAddCategory(false)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label
                        htmlFor="new-category"
                        className="text-slate-900 dark:text-white"
                      >
                        Category Name
                      </Label>
                      <Input
                        id="new-category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter category name"
                        className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-900 dark:text-white">
                        Category Color
                      </Label>
                      <ColorPicker
                        value={selectedCategoryColor}
                        onChange={setSelectedCategoryColor}
                      />
                    </div>
                    <Button
                      type="button"
                      className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
                      onClick={handleAddCategory}
                      disabled={!newCategory.trim()}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Category
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="status"
                  className="text-slate-900 dark:text-white"
                >
                  Status
                </Label>
                <Select
                  value={editedTask?.status}
                  onValueChange={(value) =>
                    handleInputChange('status', value as Status)
                  }
                >
                  <SelectTrigger
                    id="status"
                    className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="due-date"
                  className="text-slate-900 dark:text-white"
                >
                  Due Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="due-date"
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal border-white/30 bg-white/40',
                        !date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white/90 backdrop-blur-xl border-white/30">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="completed"
                  checked={editedTask?.completed}
                  onCheckedChange={handleToggleCompleted}
                />
                <Label
                  htmlFor="completed"
                  className="text-slate-900 dark:text-white"
                >
                  Mark as completed
                </Label>
              </div>
            </>
          ) : (
            <>
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
                      className={`w-3 h-3 rounded-full ${
                        task.status === 'completed'
                          ? 'bg-emerald-500'
                          : task.status === 'overdue'
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                      } mr-2`}
                    ></div>
                    <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/30" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="completed-view"
                    checked={task.completed}
                    onCheckedChange={handleToggleCompleted}
                  />
                  <Label
                    htmlFor="completed-view"
                    className="text-slate-900 dark:text-white"
                  >
                    {task.completed ? 'Completed' : 'Mark as completed'}
                  </Label>
                </div>

                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          {isEditing ? (
            <Button
              className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
              onClick={handleEditToggle}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Task
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
