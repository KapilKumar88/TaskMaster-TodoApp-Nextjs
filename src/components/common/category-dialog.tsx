'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoryDialog({
  open,
  onOpenChange,
}: Readonly<CategoryDialogProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Add a new category to your list. Fill in below details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="categoryName"
              className="text-slate-900 dark:text-white"
            >
              Category Name
            </Label>
            <Input
              id="categoryName"
              name="categoryName"
              placeholder="Enter category name"
              className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
            />
          </div>

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
              className="min-h-[80px] bg-white/40 border-white/30 text-slate-900 dark:text-white"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
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
              <Select
              // value={category} onValueChange={setCategory}
              >
                <SelectTrigger
                  id="category"
                  className="bg-white/40 border-white/30 text-slate-900 dark:text-white"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 backdrop-blur-xl border-white/30">
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="priority"
                className="text-slate-900 dark:text-white"
              >
                Priority
              </Label>
              <Select
              // value={priority} onValueChange={setPriority}
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
                  // className={cn(
                  //   "w-full justify-start text-left font-normal border-white/30 bg-white/40",
                  //   !date && "text-muted-foreground",
                  // )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white/90 backdrop-blur-xl border-white/30">
                <Calendar
                  mode="single"
                  // selected={date} onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-white/30 bg-white/40"
          >
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
            // onClick={handleCreateTask}
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
