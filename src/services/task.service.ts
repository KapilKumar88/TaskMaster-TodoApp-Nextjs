import "server-only";
import { prisma } from "@/lib/prisma";
import { Prisma, TaskPriority, TaskStatus } from "@prisma/client";
import {
  endOfDay,
  endOfWeek,
  format,
  startOfDay,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { capitalizeFirstLetters } from "@/lib/utils";

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

export async function totalUserTasksCountByDate(
  startDate: Date,
  endDate: Date
) {
  return await prisma.task.count({
    where: {
      dueDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
}

export async function totalTaskStatsForDashboard(userId: string) {
  const currentWeekStartDate = startOfWeek(new Date());
  const currentWeekEndDate = endOfWeek(new Date());
  const lastWeek = subWeeks(currentWeekStartDate, 1);
  const lastWeekStartDate = startOfWeek(lastWeek);
  const lastWeekEndDate = endOfWeek(lastWeek);
  const [currentWeekCount, lastWeekCount] = await Promise.all([
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentWeekStartDate,
          lte: currentWeekEndDate,
        },
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: lastWeekStartDate,
          lte: lastWeekEndDate,
        },
      },
    }),
  ]);
  const percentageDifference =
    ((currentWeekCount - lastWeekCount) / lastWeekCount) * 100;
  return {
    currentWeekCount,
    lastWeekCount,
    percentageDifference: percentageDifference,
  };
}

export async function totalCompletedTaskStatsForDashboard(userId: string) {
  const currentWeekStartDate = startOfWeek(new Date());
  const currentWeekEndDate = endOfWeek(new Date());
  const lastWeek = subWeeks(currentWeekStartDate, 1);
  const lastWeekStartDate = startOfWeek(lastWeek);
  const lastWeekEndDate = endOfWeek(lastWeek);
  const [currentWeekCount, lastWeekCount] = await Promise.all([
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentWeekStartDate,
          lte: currentWeekEndDate,
        },
        status: TaskStatus.COMPLETED,
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: lastWeekStartDate,
          lte: lastWeekEndDate,
        },
        status: TaskStatus.COMPLETED,
      },
    }),
  ]);
  const percentageDifference =
    ((currentWeekCount - lastWeekCount) / lastWeekCount) * 100;
  return {
    currentWeekCount,
    lastWeekCount,
    percentageDifference: percentageDifference,
  };
}

export async function totalInprogressTaskStatsForDashboard(userId: string) {
  const currentWeekStartDate = startOfWeek(new Date());
  const currentWeekEndDate = endOfWeek(new Date());
  const lastWeek = subWeeks(currentWeekStartDate, 1);
  const lastWeekStartDate = startOfWeek(lastWeek);
  const lastWeekEndDate = endOfWeek(lastWeek);
  const [currentWeekCount, lastWeekCount] = await Promise.all([
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentWeekStartDate,
          lte: currentWeekEndDate,
        },
        status: TaskStatus.ACTIVE,
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: lastWeekStartDate,
          lte: lastWeekEndDate,
        },
        status: TaskStatus.ACTIVE,
      },
    }),
  ]);
  const percentageDifference =
    ((currentWeekCount - lastWeekCount) / lastWeekCount) * 100;
  return {
    currentWeekCount,
    lastWeekCount,
    percentageDifference: percentageDifference,
  };
}

export async function totalOverDueTaskStatsForDashboard(userId: string) {
  const currentWeekStartDate = startOfWeek(new Date());
  const currentWeekEndDate = endOfWeek(new Date());
  const lastWeek = subWeeks(currentWeekStartDate, 1);
  const lastWeekStartDate = startOfWeek(lastWeek);
  const lastWeekEndDate = endOfWeek(lastWeek);
  const [currentWeekCount, lastWeekCount] = await Promise.all([
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentWeekStartDate,
          lte: currentWeekEndDate,
        },
        status: TaskStatus.OVERDUE,
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: lastWeekStartDate,
          lte: lastWeekEndDate,
        },
        status: TaskStatus.OVERDUE,
      },
    }),
  ]);
  const percentageDifference =
    ((currentWeekCount - lastWeekCount) / lastWeekCount) * 100;
  return {
    currentWeekCount,
    lastWeekCount,
    percentageDifference: percentageDifference,
  };
}

export async function weeklyProgressChartStats(userId: string) {
  const result = await prisma.task.findMany({
    where: {
      userId: userId,
      dueDate: {
        gte: startOfWeek(new Date()),
        lte: endOfWeek(new Date()),
      },
    },
  });
  const finalOutput = result.reduce(
    (acc, curr) => {
      const getCurrentDay = format(curr.createdAt, "EEE");
      const findDayIndex = acc.findIndex(
        (item) => item.day.toLowerCase() == getCurrentDay.toLowerCase()
      );
      if (acc[findDayIndex] !== undefined) {
        acc[findDayIndex] = {
          ...acc[findDayIndex],
          completed:
            acc[findDayIndex].completed +
            (curr.status == TaskStatus.COMPLETED ? 1 : 0),
          created: acc[findDayIndex].created + 1,
        };
        return acc;
      }
      return acc;
    },
    [
      { day: "Mon", completed: 0, created: 0 },
      { day: "Tue", completed: 0, created: 0 },
      { day: "Wed", completed: 0, created: 0 },
      { day: "Thu", completed: 0, created: 0 },
      { day: "Fri", completed: 0, created: 0 },
      { day: "Sat", completed: 0, created: 0 },
      { day: "Sun", completed: 0, created: 0 },
    ]
  );
  return finalOutput;
}

export async function taskCompletionChartStats(userId: string) {
  const result = await prisma.task.groupBy({
    by: ["status"],
    _count: true,
    where: {
      userId: userId,
      dueDate: {
        gte: startOfWeek(new Date()),
        lte: endOfWeek(new Date()),
      },
    },
  });

  const data = [
    {
      name: "Draft",
      value: result.find((x) => x.status == TaskStatus.DRAFT)?._count ?? 0,
      color: "rgba(59, 68, 65, 0.73)",
    }, // grey
    {
      name: "Completed",
      value: result.find((x) => x.status == TaskStatus.COMPLETED)?._count ?? 0,
      color: "rgb(16, 185, 129)",
    }, // Emerald
    {
      name: "Active",
      value: result.find((x) => x.status == TaskStatus.ACTIVE)?._count ?? 0,
      color: "rgb(79, 70, 229)",
    }, // Indigo
    {
      name: "Overdue",
      value: result.find((x) => x.status == TaskStatus.OVERDUE)?._count ?? 0,
      color: "rgb(239, 68, 68)",
    }, // Red
  ];

  return data;
}

export async function getCategoryDistributionTaskStats(userId: string) {
  const result = await prisma.task.findMany({
    select: {
      category: {
        select: {
          name: true,
          color: true,
        },
      },
    },
    where: {
      userId: userId,
      dueDate: {
        gte: startOfWeek(new Date()),
        lte: endOfWeek(new Date()),
      },
    },
  });
  const data = result.reduce(
    (acc: Array<{ name: string; value: number; color: string }>, curr) => {
      const findIndex = acc.findIndex(
        (item) => item.name.toLowerCase() == curr.category.name.toLowerCase()
      );

      if (findIndex !== -1) {
        acc[findIndex] = {
          ...acc[findIndex],
          value: acc[findIndex].value + 1,
        };
      } else {
        acc.push({
          name: capitalizeFirstLetters(curr.category.name),
          value: 1,
          color: curr.category.color,
        });
      }

      return acc;
    },
    []
  );
  return data;
}
