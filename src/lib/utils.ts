import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { TaskPriority, TaskStatus } from '@prisma/client';
import {
  addDays,
  differenceInDays,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from 'date-fns';
import appConfig from '@/config/app.config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateHashedValue = async (value: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
};

export const verifyHash = async (value: string, hash: string) => {
  return bcrypt.compare(value, hash);
};

export function capitalizeFirstLetters(words: string): string {
  if (!words) {
    return words;
  }

  return words
    .split(' ')
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function sendResponse({
  status = 'success',
  statusCode = 200,
  message,
  data,
}: {
  status?: string;
  statusCode?: number;
  message: string;
  data?: unknown;
}) {
  const resSchema = { status, statusCode, message, data };
  return NextResponse.json(resSchema, { status: statusCode });
}

export const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.HIGH:
      return 'bg-red-500/80 hover:bg-red-500';
    case TaskPriority.MEDIUM:
      return 'bg-amber-500/80 hover:bg-amber-500';
    case TaskPriority.LOW:
      return 'bg-emerald-500/80 hover:bg-emerald-500';
  }
};

export const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.ACTIVE:
      return 'bg-blue-500/80 hover:bg-blue-500';
    case TaskStatus.COMPLETED:
      return 'bg-emerald-500/80 hover:bg-emerald-500';
    case TaskStatus.OVERDUE:
      return 'bg-red-500/80 hover:bg-red-500';
    case TaskStatus.DRAFT:
      return 'bg-gray-500/80 hover:bg-gray-500';
  }
};

export const generateRandomNumber = (min: number, max: number) => {
  if (min > max) throw new Error('Min must be less than or equal to Max');
  const range = max - min + 1;
  const array = new Uint32Array(10);
  window.crypto?.getRandomValues(array);
  return (array[0] % range) + 1;
};

export const getThePreviousDuration = (
  startDate: string | Date,
  endDate: string | Date,
) => {
  const periodDuration = differenceInDays(
    endOfDay(endDate),
    startOfDay(startDate),
  );
  const previousStartDate = subDays(startDate, periodDuration);
  const previousEndDate = addDays(previousStartDate, periodDuration);

  return {
    startDate: previousStartDate,
    endDate: previousEndDate,
  };
};

export const generateRandomDate = (
  date?: string | Date,
  numOfDaysInPast?: number,
  numOfDaysInFuture?: number,
) => {
  const dateToConsider = startOfDay(date ?? new Date());

  if (numOfDaysInPast) {
    return subDays(dateToConsider, numOfDaysInPast);
  }

  if (numOfDaysInFuture) {
    return addDays(dateToConsider, numOfDaysInFuture);
  }

  return subDays(dateToConsider, generateRandomNumber(1, 1460)); // approx 4 years of dates
};

export const getDefaultDateTime = () => {
  const dateInstance = new Date();

  if (appConfig.DEFAULT_PERIOD_FOR_COMPUTATION === 'weekly') {
    return {
      startDate: startOfWeek(dateInstance),
      endDate: endOfWeek(dateInstance),
    };
  } else if (appConfig.DEFAULT_PERIOD_FOR_COMPUTATION === 'daily') {
    return {
      startDate: startOfDay(dateInstance),
      endDate: endOfDay(dateInstance),
    };
  } else if (appConfig.DEFAULT_PERIOD_FOR_COMPUTATION === 'monthly') {
    return {
      startDate: startOfMonth(dateInstance),
      endDate: endOfMonth(dateInstance),
    };
  } else if (appConfig.DEFAULT_PERIOD_FOR_COMPUTATION === 'yearly') {
    return {
      startDate: startOfYear(dateInstance),
      endDate: endOfYear(dateInstance),
    };
  }
  return {
    startDate: startOfWeek(dateInstance),
    endDate: endOfWeek(dateInstance),
  };
};
