import { TaskPriority, TaskStatus } from '@prisma/client';
import { startOfToday } from 'date-fns';
import z, { object, string } from 'zod';

export const alphaNumericRegex = /^[a-zA-Z0-9 _-]+$/; // it will allow the alphanumeric character, spaces, underscore, hyphens

export const createTaskSchema = object({
  title: string({ error: 'Title is required' })
    .trim()
    .min(1, 'Title is required')
    .regex(
      alphaNumericRegex,
      'Only Alphabets, Numbers, spaces, underscore, hyphens are allowed',
    )
    .default('Title is required'),
  description: string({ error: 'Description is required' })
    .trim()
    .min(1, 'Description is required')
    .regex(
      alphaNumericRegex,
      'Only Alphabets, Numbers, spaces, underscore, hyphens are allowed',
    ),
  categoryId: z
    .number({ error: 'Category is required' })
    .min(1, 'Category is required'),
  priority: z.enum([TaskPriority.HIGH, TaskPriority.MEDIUM, TaskPriority.LOW], {
    error: 'Priority is required',
  }),
  dueDate: z
    .date({ error: 'Due Date is required' })
    .min(startOfToday(), 'Date must be in the future'),
  dueTime: z.iso.time({ error: 'Due Time is required' }),
});

export const updateTaskSchema = object({
  taskId: z
    .number({ error: 'Task Id is required' })
    .min(1, 'Task Id is required'),
  title: string({ error: 'Title is required' })
    .trim()
    .min(1, 'Title is required')
    .regex(
      alphaNumericRegex,
      'Only Alphabets, Numbers, spaces, underscore, hyphens are allowed',
    )
    .default('Title is required'),
  description: string({ error: 'Description is required' })
    .trim()
    .min(1, 'Description is required')
    .regex(
      alphaNumericRegex,
      'Only Alphabets, Numbers, spaces, underscore, hyphens are allowed',
    ),
  categoryId: z
    .number({ error: 'Category is required' })
    .min(1, 'Category is required'),
  priority: z.enum([TaskPriority.HIGH, TaskPriority.MEDIUM, TaskPriority.LOW], {
    error: 'Priority is required',
  }),
  status: z.enum(
    [
      TaskStatus.ACTIVE,
      TaskStatus.COMPLETED,
      TaskStatus.DRAFT,
      TaskStatus.OVERDUE,
    ],
    {
      error: 'Status is required',
    },
  ),
  dueDate: z
    .date({ error: 'Due Date is required' })
    .min(startOfToday(), 'Date must be in the future'),
  dueTime: z.iso.time(),
  markTaskImportant: z.boolean(),
});
