import "server-only";
import { generateHashedValue } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { createCategoryBulk } from "./category.service";
import { defaultCategories } from "@/lib/constants";

export async function createUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await generateHashedValue(payload.password);
  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });
  createCategoryBulk(
    defaultCategories.map((c) => ({ name: c, userId: user.id }))
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
