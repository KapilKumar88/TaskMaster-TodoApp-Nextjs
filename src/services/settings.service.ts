import "server-only";
import { prisma } from "@/lib/prisma";
import { TimeFrequency, User, WeekStartDay } from "@prisma/client";

export async function createUserSettings(payload: {
  userId: User["id"];
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

export async function getUserSettings(userId: User["id"]) {
  return await prisma.settings.findFirst({
    where: {
      user: {
        id: userId,
      },
    },
  });
}

export async function updateUserGeneralSettings(payload: {
  userId: User["id"];
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
