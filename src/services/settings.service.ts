import 'server-only';
import { prisma } from '@/lib/prisma';
import {
  AppTheme,
  Prisma,
  TimeFrequency,
  User,
  WeekStartDay,
} from '@prisma/client';

export async function createUserSettings(payload: {
  userId: User['id'];
  timeZone: string;
  dateFormat: string;
}) {
  return await prisma.settings.create({
    data: {
      user: {
        connect: {
          id: payload.userId,
        },
      },
      timeZone: payload.timeZone,
      dateFormat: payload.dateFormat,
      autoArchiveTime: 30,
      autoArchiveTimeFrequency: TimeFrequency.day,
      autoArchive: false,
    },
  });
}

export async function getUserSettings(userId: User['id']) {
  return await prisma.settings.findFirst({
    where: {
      user: {
        id: userId,
      },
    },
  });
}

export async function updateUserGeneralSettings(payload: {
  userId: User['id'];
  timeZone: string;
  dateFormat: string;
  weekStartDay: WeekStartDay;
  autoArchive: boolean;
  autoArchiveTime?: number;
  timeFrequency?: TimeFrequency;
}) {
  return await prisma.settings.update({
    where: {
      userId: payload.userId,
    },
    data: {
      timeZone: payload.timeZone,
      dateFormat: payload.dateFormat,
      weekStartDay: payload.weekStartDay,
      autoArchiveTime: payload.autoArchiveTime,
      autoArchiveTimeFrequency: payload.timeFrequency,
      autoArchive: payload.autoArchive,
    },
  });
}

export async function updateUserAppearanceSettings(payload: {
  userId: User['id'];
  theme: AppTheme;
  accentColor: string;
  glassEffectIntensity: number;
}) {
  return await prisma.settings.update({
    where: {
      userId: payload.userId,
    },
    data: {
      appTheme: payload.theme,
      accentColor: payload.accentColor,
      glassEffectIntensity: payload.glassEffectIntensity,
    },
  });
}

export async function updateUserNotificationSettings(payload: {
  userId: User['id'];
  emailNotification: boolean;
  pushNotification: boolean;
  taskDueReminder: boolean;
  weeklySummary: boolean;
  taskDueTime?: number;
  taskDueTimeFrequency?: TimeFrequency;
}) {
  const data: Prisma.SettingsUpdateInput = {
    emailNotifications: payload.emailNotification,
    pushNotification: payload.pushNotification,
    taskDueReminder: payload.taskDueReminder,
    weeklySummary: payload.weeklySummary,
  };

  if (payload.taskDueReminder) {
    data['taskDueTime'] = payload.taskDueTime;
    data['taskDueTimeFrequency'] = payload.taskDueTimeFrequency;
  }

  return await prisma.settings.update({
    where: {
      userId: payload.userId,
    },
    data: data,
  });
}
