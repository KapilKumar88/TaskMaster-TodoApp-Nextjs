import 'server-only';
import { prisma } from '@/lib/prisma';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import { startOfDay } from 'date-fns';

export async function createCategory(payload: {
  name: string;
  color: string;
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
    color: string;
  }>,
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
      DEFAULT_CATEGORIES.map((c) => ({
        name: c.name,
        color: c.color,
        userId: userId,
      })),
    );
    return getUserCategories(userId);
  }

  return categories;
}

export async function allCategoryTaskCount(userId: string) {
  return await prisma.category.findMany({
    take: 20,
    select: {
      name: true,
      id: true,
      color: true,
      _count: {
        select: {
          tasks: {
            where: {
              dueDate: {
                gte: startOfDay(new Date()),
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
}
