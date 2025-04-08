'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TaskInterface } from '@/lib/interfaces/task.interface';
import { TaskDetail } from './task-detail';
import { TaskEditForm } from './task-edit-form';

interface TaskDetailDialogProps {
  task: TaskInterface;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailDialog({
  task,
  open,
  onOpenChange,
}: Readonly<TaskDetailDialogProps>) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
        setIsEditing(false);
      }}
    >
      <DialogContent className="sm:max-w-[550px] bg-white/80 backdrop-blur-xl border-white/30">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Task' : 'Task Details'}</DialogTitle>
        </DialogHeader>
        {isEditing ? (
          <TaskEditForm
            task={task}
            close={() => {
              onOpenChange(false);
              setIsEditing(false);
            }}
            setIsEditing={() => {
              setIsEditing(false);
            }}
          />
        ) : (
          <TaskDetail
            task={task}
            close={() => {
              onOpenChange(false);
              setIsEditing(false);
            }}
          />
        )}
        <DialogFooter>
          {!isEditing && (
            <Button
              className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white"
              onClick={() => {
                setIsEditing(true);
              }}
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
