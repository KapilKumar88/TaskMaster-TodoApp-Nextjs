import { Task } from '@prisma/client';

export interface TaskInterface extends Task {
  category?: { id: number; name: string; color: string };
  starred?: boolean;
}
