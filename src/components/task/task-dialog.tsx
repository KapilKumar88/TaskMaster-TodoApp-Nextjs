'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TaskForm } from './task-form';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDialog({ open, onOpenChange }: Readonly<TaskDialogProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-white/80 backdrop-blur-xl border-white/30">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your list. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <TaskForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
