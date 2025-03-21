import "server-only";
import { prisma } from "@/lib/prisma";
import { Prisma, TaskPriority, TaskStatus } from "@prisma/client";
import { endOfDay, startOfDay } from "date-fns";

export async function createTask(payload: {
  title: string;
  description: string;
  categoryId: number;
  priority: TaskPriority;
  dueDate: Date;
  userId: string;
  status?: TaskStatus;
}) {
  const input: Prisma.TaskCreateInput = {
    title: payload.title,
    description: payload.description,
    category: {
      connect: {
        id: payload.categoryId,
      },
    },
    priority: payload.priority,
    dueDate: payload.dueDate,
    status: payload?.status ?? TaskStatus.ACTIVE,
    // dueTime: payload.dueDate,
    user: {
      connect: {
        id: payload?.userId,
      },
    },
  };
  return await prisma.task.create({
    data: input,
  });
}

export async function getUserTaskList({
  userId,
  filter,
  pageNumber,
  pageLimit,
}: {
  userId: string;
  filter?: string;
  pageNumber?: number;
  pageLimit?: number;
}) {
  const conditions: {
    where: {
      userId: string;
      dueDate?: {
        gte?: Date;
        lte?: Date;
      };
      status?: TaskStatus;
    };
  } = {
    where: {
      userId: userId,
      dueDate: undefined,
    },
  };

  if (filter === "today") {
    conditions.where["dueDate"] = {
      gte: startOfDay(new Date()),
      lte: endOfDay(new Date()),
    };
  }

  if (filter === "upcoming") {
    conditions.where["dueDate"] = {
      gte: endOfDay(new Date()),
    };
  }

  if (filter === "completed") {
    conditions.where["status"] = TaskStatus.COMPLETED;
  }

  const omitRecords =
    pageNumber && pageLimit ? (pageNumber - 1) * pageLimit : 0;

  const totalRecords = await prisma.task.count({
    where: conditions.where,
  });

  const records = await prisma.task.findMany({
    take: pageLimit,
    skip: omitRecords,
    include: {
      category: true,
    },
    ...conditions,
  });

  return {
    records,
    totalRecordsCount: totalRecords,
  };
}

export async function deleteTask(taskId: number, userId: string) {
  return await prisma.task.delete({ where: { id: taskId, userId: userId } });
}

export async function markTaskImportant(
  taskId: number,
  isImportant: boolean,
  userId: string
) {
  return await prisma.task.update({
    where: {
      id: taskId,
      userId: userId,
    },
    data: {
      markAsImportant: isImportant,
    },
  });
}

export async function changeTaskStatus(
  taskId: number,
  userId: string,
  status: TaskStatus
) {
  return await prisma.task.update({
    where: {
      id: taskId,
      userId: userId,
    },
    data: {
      status: status,
    },
  });
}
