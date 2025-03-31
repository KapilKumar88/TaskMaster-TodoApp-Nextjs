import "server-only";
import { prisma } from "@/lib/prisma";
import { TaskTimeFrequency, User } from "@prisma/client";

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
      autoArchiveTimeFrequency: TaskTimeFrequency.Day,
      autoArchive: false,
    },
  });
}
