import { DIFFERENT_COLOR_CODES } from '@/lib/constants';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { generateRandomNumber } from './seed';

const numberOfCategories = 50;

export default async function seedCategories(
  prismaClient: PrismaClient,
  userIds: string[],
) {
  const finalResponse: Array<{
    userId: string;
    categoryId: number[];
  }> = [];
  for (let i = 0; i < userIds?.length; i++) {
    const categoryIds: number[] = [];
    for (let j = 0; j < numberOfCategories; j++) {
      const category = await prismaClient.category.create({
        data: {
          name: faker.lorem.word(),
          color:
            DIFFERENT_COLOR_CODES[
              generateRandomNumber(0, DIFFERENT_COLOR_CODES.length - 1)
            ],
          user: {
            connect: {
              id: userIds[i],
            },
          },
        },
      });
      categoryIds.push(category.id);
    }
    finalResponse.push({ userId: userIds[i], categoryId: categoryIds });
  }

  return finalResponse;
}
