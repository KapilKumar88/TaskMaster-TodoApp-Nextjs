import "server-only";
import { generateHashedValue, verifyHash } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { createCategoryBulk } from "./category.service";
import { DEFAULT_CATEGORIES } from "@/lib/constants";
import { createUserSettings } from "./settings.service";
import appConfig from "@/config/app.config";
import { User } from "@prisma/client";

export async function createUser(payload: {
  name: string;
  email: string;
  password: string;
  timeZone: string;
}) {
  const hashedPassword = await generateHashedValue(payload.password);
  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
      name: payload.name,
      email: payload.email,
    },
  });

  createUserSettings({
    userId: user.id,
    timeZone: payload.timeZone,
    dateFormat: appConfig.DEFAULT_DATE_FORMAT,
  });

  createCategoryBulk(
    DEFAULT_CATEGORIES.map((c) => ({
      name: c.name,
      color: c.color,
      userId: user.id,
    }))
  );
  return user;
}

export async function getUserDetailsByEmailId(email: string) {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function changePassword(payload: {
  userId: User["id"];
  currentPassword: string;
  newPassword: string;
}) {
  const userDetails = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.userId,
    },
  });

  const isValidPassword = await verifyHash(
    payload.currentPassword,
    userDetails.password
  );

  if (!isValidPassword) {
    throw new Error("Current Password didn't match");
  }

  const hashedPassword = await generateHashedValue(payload.newPassword);

  return await prisma.user.update({
    where: {
      id: payload.userId,
    },
    data: {
      password: hashedPassword,
    },
  });
}
