import 'server-only';
import { prisma } from '@/lib/prisma';
import { Prisma, TaskPriority, TaskStatus } from '@prisma/client';
import {
  differenceInHours,
  endOfDay,
  endOfWeek,
  format,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import { capitalizeFirstLetters, getThePreviousDuration } from '@/lib/utils';
import { DirectionIndicators } from '@/lib/enums';

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

  if (filter === 'today') {
    conditions.where['dueDate'] = {
      gte: startOfDay(new Date()),
      lte: endOfDay(new Date()),
    };
  }

  if (filter === 'upcoming') {
    conditions.where['dueDate'] = {
      gte: endOfDay(new Date()),
    };
  }

  if (filter === 'completed') {
    conditions.where['status'] = TaskStatus.COMPLETED;
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
  userId: string,
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
  status: TaskStatus,
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
  endDate: Date,
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

export async function totalTaskStats(
  userId: string,
  startDate: Date | string,
  endDate: Date | string,
) {
  const previousPeriodDates = getThePreviousDuration(startDate, endDate);
  const currentPeriodStartDate = startOfDay(startDate);
  const currentPeriodEndDate = endOfDay(endDate);
  const [currentPeriodCount, previousPeriodCount] = await Promise.all([
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentPeriodStartDate,
          lte: currentPeriodEndDate,
        },
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: previousPeriodDates.startDate,
          lte: previousPeriodDates.endDate,
        },
      },
    }),
  ]);

  let percentageDifference = 0;

  if (previousPeriodCount > 0 && currentPeriodCount !== 0) {
    percentageDifference =
      ((currentPeriodCount - previousPeriodCount) / previousPeriodCount) * 100;
  }

  return {
    currentPeriodCount,
    previousPeriodCount,
    percentageDifference: Number.isInteger(percentageDifference)
      ? percentageDifference
      : parseFloat(percentageDifference.toFixed(2)),
    percentageDirection:
      percentageDifference > 0
        ? DirectionIndicators.UP
        : DirectionIndicators.DOWN,
  };
}

export async function totalCompletedTaskStats(
  userId: string,
  startDate: Date | string,
  endDate: Date | string,
) {
  const previousPeriodDates = getThePreviousDuration(startDate, endDate);
  const currentPeriodStartDate = startOfDay(startDate);
  const currentPeriodEndDate = endOfDay(endDate);
  const [currentPeriodCount, lastPeriodCount] = await Promise.all([
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentPeriodStartDate,
          lte: currentPeriodEndDate,
        },
        status: TaskStatus.COMPLETED,
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: previousPeriodDates.startDate,
          lte: previousPeriodDates.endDate,
        },
        status: TaskStatus.COMPLETED,
      },
    }),
  ]);
  let percentageDifference = 0;

  if (lastPeriodCount > 0 && currentPeriodCount !== 0) {
    percentageDifference =
      ((currentPeriodCount - lastPeriodCount) / lastPeriodCount) * 100;
  }

  return {
    currentPeriodCount,
    lastPeriodCount,
    percentageDifference: Number.isInteger(percentageDifference)
      ? percentageDifference
      : parseFloat(percentageDifference.toFixed(2)),
    percentageDirection:
      percentageDifference > 0
        ? DirectionIndicators.UP
        : DirectionIndicators.DOWN,
  };
}

export async function taskCompletionRateStats(
  userId: string,
  startDate: Date | string,
  endDate: Date | string,
) {
  const previousPeriodDates = getThePreviousDuration(startDate, endDate);
  const currentPeriodStartDate = startOfDay(startDate);
  const currentPeriodEndDate = endOfDay(endDate);
  const [
    currentPeriodTaskCount,
    previousPeriodTaskCount,
    currentPeriodCompletedTask,
    previousPeriodCompletedTask,
  ] = await Promise.all([
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentPeriodStartDate,
          lte: currentPeriodEndDate,
        },
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: previousPeriodDates.startDate,
          lte: previousPeriodDates.endDate,
        },
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentPeriodStartDate,
          lte: currentPeriodEndDate,
        },
        status: TaskStatus.COMPLETED,
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: previousPeriodDates.startDate,
          lte: previousPeriodDates.endDate,
        },
        status: TaskStatus.COMPLETED,
      },
    }),
  ]);

  const currentPeriodCompletionRate =
    currentPeriodCompletedTask / currentPeriodTaskCount / 100;
  const previousPeriodCompletionRate =
    previousPeriodCompletedTask / previousPeriodTaskCount / 100;

  let percentageDifference = 0;
  if (previousPeriodCompletionRate > 0 && previousPeriodCompletionRate !== 0) {
    percentageDifference =
      (currentPeriodCompletionRate - previousPeriodCompletionRate) /
      previousPeriodCompletionRate;
  }

  return {
    currentPeriodCompletionRate: Number.isInteger(currentPeriodCompletionRate)
      ? currentPeriodCompletionRate
      : parseFloat(currentPeriodCompletionRate.toFixed(2)),
    previousPeriodCompletionRate: Number.isInteger(previousPeriodCompletionRate)
      ? previousPeriodCompletionRate
      : parseFloat(previousPeriodCompletionRate.toFixed(2)),
    percentageDifference: Number.isInteger(percentageDifference)
      ? percentageDifference
      : parseFloat(percentageDifference.toFixed(2)),
    percentageDirection:
      percentageDifference > 0
        ? DirectionIndicators.UP
        : DirectionIndicators.DOWN,
  };
}

export async function avgCompletionTimeStats(
  userId: string,
  startDate: Date | string,
  endDate: string | Date,
) {
  const previousPeriodDates = getThePreviousDuration(startDate, endDate);
  const currentPeriodStartDate = startOfWeek(startDate);
  const currentPeriodEndDate = endOfWeek(endDate);
  const [currentPeriodTasks, previousPeriodTask] = await Promise.all([
    prisma.task.findMany({
      select: {
        createdAt: true,
        updatedAt: true,
        completedOn: true,
      },
      where: {
        userId: userId,
        dueDate: {
          gte: currentPeriodStartDate,
          lte: currentPeriodEndDate,
        },
        status: TaskStatus.COMPLETED,
      },
    }),
    prisma.task.findMany({
      select: {
        createdAt: true,
        updatedAt: true,
        completedOn: true,
      },
      where: {
        userId: userId,
        dueDate: {
          gte: previousPeriodDates.startDate,
          lte: previousPeriodDates.endDate,
        },
        status: TaskStatus.COMPLETED,
      },
    }),
  ]);

  const currentPeriodCompletionTime = currentPeriodTasks.reduce((acc, curr) => {
    const taskCompletionTime = differenceInHours(
      curr.completedOn!,
      curr.createdAt,
      {
        roundingMethod: 'ceil',
      },
    );
    return acc + taskCompletionTime;
  }, 0);

  const previousPeriodCompletionTime = previousPeriodTask.reduce(
    (acc, curr) => {
      const taskCompletionTime = differenceInHours(
        curr.completedOn!,
        curr.createdAt,
        {
          roundingMethod: 'ceil',
        },
      );
      return acc + taskCompletionTime;
    },
    0,
  );

  let avgCurrentPeriodTime = 0;

  if (currentPeriodTasks?.length > 0 && currentPeriodCompletionTime !== 0) {
    avgCurrentPeriodTime =
      currentPeriodCompletionTime / currentPeriodTasks?.length;
  }

  let avgPreviousPeriodTime = 0;

  if (previousPeriodTask?.length > 0 && previousPeriodCompletionTime !== 0) {
    avgPreviousPeriodTime =
      previousPeriodCompletionTime / previousPeriodTask?.length;
  }

  let percentageDifference = 0;
  if (avgPreviousPeriodTime > 0 && avgCurrentPeriodTime !== 0) {
    percentageDifference =
      ((avgCurrentPeriodTime - avgPreviousPeriodTime) / avgPreviousPeriodTime) *
      100;
  }

  percentageDifference = percentageDifference / 24; // to convert into days

  avgCurrentPeriodTime =
    avgCurrentPeriodTime > 0 ? avgCurrentPeriodTime / 24 : avgCurrentPeriodTime; // to convert into days
  avgPreviousPeriodTime =
    avgPreviousPeriodTime > 0
      ? avgPreviousPeriodTime / 24
      : avgPreviousPeriodTime; // to convert into days

  return {
    avgCurrentPeriodTime: Number.isInteger(avgCurrentPeriodTime)
      ? avgCurrentPeriodTime
      : parseFloat(avgCurrentPeriodTime.toFixed(2)),
    avgPreviousPeriodTime: Number.isInteger(avgPreviousPeriodTime)
      ? avgPreviousPeriodTime
      : parseFloat(avgPreviousPeriodTime.toFixed(2)),
    percentageDifference: Number.isInteger(percentageDifference)
      ? percentageDifference
      : parseFloat(percentageDifference.toFixed(2)),
    percentageDirection:
      percentageDifference > 0
        ? DirectionIndicators.UP
        : DirectionIndicators.DOWN,
  };
}

export async function overdueRateStats(
  userId: string,
  startDate: Date | string,
  endDate: string | Date,
) {
  const previousPeriodDates = getThePreviousDuration(startDate, endDate);
  const currentPeriodStartDate = startOfWeek(startDate);
  const currentPeriodEndDate = endOfWeek(endDate);
  const [
    currentPeriodTaskCount,
    previousPeriodTaskCount,
    currentPeriodOverdueTaskCount,
    previousPeriodOverdueTaskCount,
  ] = await Promise.all([
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentPeriodStartDate,
          lte: currentPeriodEndDate,
        },
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: previousPeriodDates.startDate,
          lte: previousPeriodDates.endDate,
        },
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentPeriodStartDate,
          lte: currentPeriodEndDate,
        },
        status: TaskStatus.OVERDUE,
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: previousPeriodDates.startDate,
          lte: previousPeriodDates.endDate,
        },
        status: TaskStatus.OVERDUE,
      },
    }),
  ]);

  const currentPeriodOverdueRate =
    currentPeriodOverdueTaskCount / currentPeriodTaskCount / 100;
  const previousPeriodOverdueRate =
    previousPeriodOverdueTaskCount / previousPeriodTaskCount / 100;
  let percentageDifference = 0;

  if (previousPeriodOverdueRate > 0 && currentPeriodOverdueRate !== 0) {
    percentageDifference =
      (currentPeriodOverdueRate - previousPeriodOverdueRate) /
      previousPeriodOverdueRate;
  }
  return {
    currentPeriodOverdueRate: Number.isInteger(currentPeriodOverdueRate)
      ? currentPeriodOverdueRate
      : parseFloat(currentPeriodOverdueRate.toFixed(2)),
    previousPeriodOverdueRate: Number.isInteger(previousPeriodOverdueRate)
      ? previousPeriodOverdueRate
      : parseFloat(previousPeriodOverdueRate.toFixed(2)),
    percentageDifference: Number.isInteger(percentageDifference)
      ? percentageDifference
      : parseFloat(percentageDifference.toFixed(2)),
    percentageDirection:
      percentageDifference > 0
        ? DirectionIndicators.UP
        : DirectionIndicators.DOWN,
  };
}

export async function totalInprogressTaskStats(
  userId: string,
  startDate: Date | string,
  endDate: Date | string,
) {
  const previousPeriodDates = getThePreviousDuration(startDate, endDate);
  const currentPeriodStartDate = startOfDay(startDate);
  const currentPeriodEndDate = endOfDay(endDate);
  const [currentPeriodCount, previousPeriodCount] = await Promise.all([
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentPeriodStartDate,
          lte: currentPeriodEndDate,
        },
        status: TaskStatus.ACTIVE,
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: previousPeriodDates.startDate,
          lte: previousPeriodDates.endDate,
        },
        status: TaskStatus.ACTIVE,
      },
    }),
  ]);

  let percentageDifference = 0;

  if (previousPeriodCount > 0 && currentPeriodCount !== 0) {
    percentageDifference =
      ((currentPeriodCount - previousPeriodCount) / previousPeriodCount) * 100;
  }
  return {
    currentPeriodCount,
    previousPeriodCount,
    percentageDifference: Number.isInteger(percentageDifference)
      ? percentageDifference
      : parseFloat(percentageDifference.toFixed(2)),
    percentageDirection:
      percentageDifference > 0
        ? DirectionIndicators.UP
        : DirectionIndicators.DOWN,
  };
}

export async function totalOverDueTaskStats(
  userId: string,
  startDate: Date | string,
  endDate: Date | string,
) {
  const previousPeriodDates = getThePreviousDuration(startDate, endDate);
  const currentPeriodStartDate = startOfDay(startDate);
  const currentPeriodEndDate = endOfDay(endDate);
  const [currentPeriodCount, previousPeriodCount] = await Promise.all([
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: currentPeriodStartDate,
          lte: currentPeriodEndDate,
        },
        status: TaskStatus.OVERDUE,
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        dueDate: {
          gte: previousPeriodDates.startDate,
          lte: previousPeriodDates.endDate,
        },
        status: TaskStatus.OVERDUE,
      },
    }),
  ]);

  let percentageDifference = 0;

  if (previousPeriodCount > 0 && currentPeriodCount !== 0) {
    percentageDifference =
      ((currentPeriodCount - previousPeriodCount) / previousPeriodCount) * 100;
  }

  return {
    currentPeriodCount,
    previousPeriodCount,
    percentageDifference: Number.isInteger(percentageDifference)
      ? percentageDifference
      : parseFloat(percentageDifference.toFixed(2)),
    percentageDirection:
      percentageDifference > 0
        ? DirectionIndicators.UP
        : DirectionIndicators.DOWN,
  };
}

export async function weeklyProgressChartStats(
  userId: string,
  startDate: Date | string,
  endDate: Date | string,
) {
  const currentPeriodStartDate = startOfDay(startDate);
  const currentPeriodEndDate = endOfDay(endDate);

  const result = await prisma.task.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: currentPeriodStartDate,
        lte: currentPeriodEndDate,
      },
    },
  });

  const finalOutput = result.reduce(
    (acc, curr) => {
      const getCurrentDay = format(curr.createdAt, 'EEE');
      const findDayIndex = acc.findIndex(
        (item) => item.day.toLowerCase() == getCurrentDay.toLowerCase(),
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
      { day: 'Mon', completed: 0, created: 0 },
      { day: 'Tue', completed: 0, created: 0 },
      { day: 'Wed', completed: 0, created: 0 },
      { day: 'Thu', completed: 0, created: 0 },
      { day: 'Fri', completed: 0, created: 0 },
      { day: 'Sat', completed: 0, created: 0 },
      { day: 'Sun', completed: 0, created: 0 },
    ],
  );
  return finalOutput;
}

export async function productivityChartData(
  userId: string,
  startDate: Date | string,
  endDate: Date | string,
) {
  const currentPeriodStartDate = startOfWeek(startDate);
  const currentPeriodEndDate = endOfWeek(endDate);

  const result = await prisma.task.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: currentPeriodStartDate,
        lte: currentPeriodEndDate,
      },
      status: TaskStatus.COMPLETED,
    },
  });

  const finalOutput = result.reduce(
    (acc, curr) => {
      const getCurrentDay = format(curr.createdAt, 'EEE');
      const findDayIndex = acc.findIndex(
        (item) => item.day.toLowerCase() == getCurrentDay.toLowerCase(),
      );
      if (acc[findDayIndex] !== undefined) {
        acc[findDayIndex] = {
          ...acc[findDayIndex],
          Tasks:
            acc[findDayIndex].Tasks +
            (curr.status == TaskStatus.COMPLETED ? 1 : 0),
        };
        return acc;
      }
      return acc;
    },
    [
      { day: 'Mon', Tasks: 0 },
      { day: 'Tue', Tasks: 0 },
      { day: 'Wed', Tasks: 0 },
      { day: 'Thu', Tasks: 0 },
      { day: 'Fri', Tasks: 0 },
      { day: 'Sat', Tasks: 0 },
      { day: 'Sun', Tasks: 0 },
    ],
  );
  return finalOutput;
}

export async function taskCompletionChartStats(
  userId: string,
  startDate: Date | string,
  endDate: Date | string,
) {
  const result = await prisma.task.groupBy({
    by: ['status'],
    _count: true,
    where: {
      userId: userId,
      createdAt: {
        gte: startOfDay(startDate),
        lte: endOfDay(endDate),
      },
    },
  });

  const data = [
    {
      name: 'Draft',
      value: result.find((x) => x.status == TaskStatus.DRAFT)?._count ?? 0,
      color: 'rgba(59, 68, 65, 0.73)',
    }, // grey
    {
      name: 'Completed',
      value: result.find((x) => x.status == TaskStatus.COMPLETED)?._count ?? 0,
      color: 'rgb(16, 185, 129)',
    }, // Emerald
    {
      name: 'Active',
      value: result.find((x) => x.status == TaskStatus.ACTIVE)?._count ?? 0,
      color: 'rgb(79, 70, 229)',
    }, // Indigo
    {
      name: 'Overdue',
      value: result.find((x) => x.status == TaskStatus.OVERDUE)?._count ?? 0,
      color: 'rgb(239, 68, 68)',
    }, // Red
  ];

  return data;
}

export async function getCategoryDistributionTaskStats(
  userId: string,
  startDate: Date | string,
  endDate: Date | string,
) {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          tasks: {
            where: {
              createdAt: {
                gte: startOfDay(startDate),
                lte: endOfDay(endDate),
              },
            },
          },
        },
      },
    },
    where: {
      userId: userId,
    },
  });

  return result.map((x) => {
    return {
      name: capitalizeFirstLetters(x.name),
      value: x?._count?.tasks ?? 0,
      color: x.color,
    };
  });
}

export async function getTaskCompletionRate(
  userId: string,
  startDate: Date | string,
  endDate: Date | string,
) {
  const result = await prisma.task.findMany({
    select: {
      status: true,
      createdAt: true,
      completedOn: true,
    },
    where: {
      userId: userId,
      createdAt: {
        gte: startOfDay(startDate),
        lte: endOfDay(endDate),
      },
    },
  });

  const finalOutput = result.reduce(
    (acc, curr) => {
      const findIndex = acc.findIndex(
        (item) =>
          item.month.toLowerCase() ===
          format(curr.createdAt, 'MMM').toLowerCase(),
      );

      if (findIndex !== -1) {
        acc[findIndex] = {
          ...acc[findIndex],
          rate: acc[findIndex].rate + 1,
        };
      } else {
        acc.push({
          month: format(curr.createdAt, 'MMM').toLowerCase(),
          rate: 1,
        });
      }

      return acc;
    },
    [
      { month: 'Jan', rate: 0 },
      { month: 'Feb', rate: 0 },
      { month: 'Mar', rate: 0 },
      { month: 'Apr', rate: 0 },
      { month: 'May', rate: 0 },
      { month: 'Jun', rate: 0 },
      { month: 'Jul', rate: 0 },
      { month: 'Aug', rate: 0 },
      { month: 'Sep', rate: 0 },
      { month: 'Oct', rate: 0 },
      { month: 'Nov', rate: 0 },
      { month: 'Dec', rate: 0 },
    ],
  );

  return finalOutput;
}

export async function getImportantTaskListOfGivenPeriod({
  userId,
  startDate,
  endDate,
  status,
  fetchImportantTasks,
}: {
  userId: string;
  startDate: Date | string;
  endDate: Date | string;
  status?: TaskStatus;
  fetchImportantTasks?: boolean;
}) {
  const whereCondition: Prisma.TaskWhereInput = {
    userId: userId,
    dueDate: {
      gte: startOfDay(startDate),
      lte: endOfDay(endDate),
    },
  };

  if (fetchImportantTasks) {
    whereCondition.markAsImportant = true;
  }
  if (status) {
    whereCondition.status = status;
  }

  return prisma.task.findMany({
    include: {
      category: true,
    },
    where: whereCondition,
  });
}
