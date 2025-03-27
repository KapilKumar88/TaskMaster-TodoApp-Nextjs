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

const generateRandomDate = (
  date?: string | Date,
  numOfDaysInPast?: number,
  numOfDaysInFuture?: number
) => {
  const dateToConsider = date ? new Date(date) : new Date();

  const startOfDayV2 = new Date(
    dateToConsider.getFullYear(),
    dateToConsider.getMonth(),
    dateToConsider.getDate()
  );

  if (numOfDaysInPast) {
    const pastDate = new Date(
      startOfDayV2.getTime() - numOfDaysInPast * 24 * 60 * 60 * 1000
    );
    return pastDate;
  }

  if (numOfDaysInFuture) {
    const futureDate = new Date(
      startOfDayV2.getTime() + numOfDaysInFuture * 24 * 60 * 60 * 1000
    );
    return futureDate;
  }

  const randomDays = Math.floor(generateRandomNumber(1, 1460)); // approx 4 years of dates
  const randomDate = new Date(
    startOfDayV2.getTime() - randomDays * 24 * 60 * 60 * 1000
  );
  return randomDate;
};

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
      const categoryId =
        categories?.categoryId[
          generateRandomNumber(0, categories?.categoryId.length - 1)
        ];
      const taskStatus = status[generateRandomNumber(0, status.length - 1)];
      const createdAtDate = generateRandomDate();
      const dueDate = generateRandomDate(
        createdAtDate,
        undefined,
        generateRandomNumber(1, 10)
      );
      const completedOnDate = generateRandomDate(
        createdAtDate,
        undefined,
        generateRandomNumber(1, 40)
      );

      await prismaClient.task.create({
        data: {
          title: faker.lorem.word(),
          description: faker.lorem.sentence(),
          category: {
            connect: {
              id: categoryId,
            },
          },
          dueDate: dueDate,
          priority: priority[generateRandomNumber(0, priority.length - 1)],
          status: taskStatus,
          completedOn:
            taskStatus === TaskStatus.COMPLETED ? completedOnDate : null,
          user: {
            connect: {
              id: userIds[i],
            },
          },
          createdAt: createdAtDate,
          updatedAt: completedOnDate,
        },
      });
    }
  }
}
