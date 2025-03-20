import "server-only";
import { prisma } from "@/lib/prisma";
import { defaultCategories } from "@/lib/constants";

export async function createCategory(payload: {
  name: string;
  userId: string;
}) {
  return await prisma.category.create({
    data: {
      ...payload,
    },
  });
}

export async function createCategoryBulk(
  payload: Array<{
    name: string;
    userId: string;
  }>
) {
  return await prisma.category.createMany({
    data: payload,
  });
}

export async function getUserCategories(userId: string) {
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
    },
  });
  if (categories?.length === 0) {
    await createCategoryBulk(
      defaultCategories.map((c) => ({ name: c, userId: userId }))
    );
    return getUserCategories(userId);
  }

  return categories;
}
