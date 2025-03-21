import { PrismaClient, TaskPriority, TaskStatus } from "@prisma/client";
import { generateRandomNumber } from "./seed";
import { faker } from "@faker-js/faker";

const numberOfTask = 1000;
const status = [
  TaskStatus.ACTIVE,
  TaskStatus.COMPLETED,
  TaskStatus.OVERDUE,
  TaskStatus.DRAFT,
];
const priority = [TaskPriority.HIGH, TaskPriority.MEDIUM, TaskPriority.LOW];

export default async function seedTasks(
  prismaClient: PrismaClient,
  userIds: string[],
  categoryIds: Array<{
    userId: string;
    categoryId: number[];
  }>
) {
  for (let i = 0; i < userIds?.length; i++) {
    for (let j = 0; j < numberOfTask; j++) {
      const categories = categoryIds.find((x) => x.userId === userIds[i]);
      const categoryId = categories?.categoryId[generateRandomNumber(0, categories?.categoryId.length-1)];
      await prismaClient.task.create({
        data: {
          title: faker.lorem.word(),
          description: faker.lorem.sentence(),
          category: {
            connect: {
              id: categoryId
            },
          },
          priority: priority[generateRandomNumber(0, priority.length - 1)],
          status: status[generateRandomNumber(0, status.length - 1)],
          dueDate: faker.date.anytime(),
          user: {
            connect: {
              id: userIds[i],
            },
          },
        },
      });
    }
  }
}
