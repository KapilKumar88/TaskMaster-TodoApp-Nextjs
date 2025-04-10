import { TaskPriority, TaskStatus } from '@prisma/client';
import { startOfToday } from 'date-fns';
import { object, string } from 'zod';
import z from 'zod';

export const alphaNumericRegex = /^[a-zA-Z0-9 _-]+$/; // it will allow the alphanumeric character, spaces, underscore, hyphens

export const createTaskSchema = object({
  title: string({ required_error: 'Title is required' })
    .trim()
    .min(1, 'Title is required')
    .regex(
      alphaNumericRegex,
      'Only Alphabets, Numbers, spaces, underscore, hyphens are allowed',
    )
    .default('Title is required'),
  description: string({ required_error: 'Description is required' })
    .trim()
    .min(1, 'Description is required')
    .regex(
      alphaNumericRegex,
      'Only Alphabets, Numbers, spaces, underscore, hyphens are allowed',
    ),
  categoryId: z
    .number({ required_error: 'Category is required' })
    .min(1, 'Category is required'),
  priority: z.enum([TaskPriority.HIGH, TaskPriority.MEDIUM, TaskPriority.LOW], {
    message: 'Priority is required',
  }),
  dueDate: z
    .date({ message: 'Due Date is required' })
    .min(startOfToday(), 'Date must be in the future'),
  dueTime: z.string({ message: 'Due Time is required' }).time(),
});

export const updateTaskSchema = object({
  taskId: z
    .number({ message: 'Task Id is required' })
    .min(1, 'Task Id is required'),
  title: string({ required_error: 'Title is required' })
    .trim()
    .min(1, 'Title is required')
    .regex(
      alphaNumericRegex,
      'Only Alphabets, Numbers, spaces, underscore, hyphens are allowed',
    )
    .default('Title is required'),
  description: string({ required_error: 'Description is required' })
    .trim()
    .min(1, 'Description is required')
    .regex(
      alphaNumericRegex,
      'Only Alphabets, Numbers, spaces, underscore, hyphens are allowed',
    ),
  categoryId: z
    .number({ required_error: 'Category is required' })
    .min(1, 'Category is required'),
  priority: z.enum([TaskPriority.HIGH, TaskPriority.MEDIUM, TaskPriority.LOW], {
    message: 'Priority is required',
  }),
  status: z.enum(
    [
      TaskStatus.ACTIVE,
      TaskStatus.COMPLETED,
      TaskStatus.DRAFT,
      TaskStatus.OVERDUE,
    ],
    {
      message: 'Status is required',
    },
  ),
  dueDate: z
    .date({ message: 'Due Date is required' })
    .min(startOfToday(), 'Date must be in the future'),
  dueTime: z.string().time(),
  markTaskImportant: z.boolean(),
});
