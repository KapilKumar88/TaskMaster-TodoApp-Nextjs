import { PrismaClient, TaskPriority, TaskStatus } from '@prisma/client';
import { generateRandomNumber } from './seed';
import { faker } from '@faker-js/faker';

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
  numOfDaysInFuture?: number,
) => {
  const dateToConsider = date ? new Date(date) : new Date();

  const startOfDayV2 = new Date(
    dateToConsider.getFullYear(),
    dateToConsider.getMonth(),
    dateToConsider.getDate(),
  );

  let randomDate = startOfDayV2;

  if (numOfDaysInPast) {
    randomDate = new Date(
      startOfDayV2.getTime() - numOfDaysInPast * 24 * 60 * 60 * 1000,
    );
  }

  if (numOfDaysInFuture) {
    randomDate = new Date(
      startOfDayV2.getTime() + numOfDaysInFuture * 24 * 60 * 60 * 1000,
    );
  } else {
    const randomDays = Math.floor(generateRandomNumber(1, 1460)); // approx 4 years of dates
    const futurePast = generateRandomNumber(0, 1);
    if (futurePast === 0) {
      randomDate = new Date(
        startOfDayV2.getTime() - randomDays * 24 * 60 * 60 * 1000,
      );
    }

    if (futurePast === 1) {
      randomDate = new Date(
        startOfDayV2.getTime() + randomDays * 24 * 60 * 60 * 1000,
      );
    }
  }

  const randomHours = Math.floor(generateRandomNumber(1, 23) * 24);
  const randomMinutes = Math.floor(generateRandomNumber(1, 59) * 60);
  const randomSeconds = Math.floor(generateRandomNumber(1, 59) * 60);
  randomDate.setHours(randomHours);
  randomDate.setMinutes(randomMinutes);
  randomDate.setSeconds(randomSeconds);

  return randomDate;
};

export default async function seedTasks(
  prismaClient: PrismaClient,
  userIds: string[],
  categoryIds: Array<{
    userId: string;
    categoryId: number[];
  }>,
) {
  for (let i = 0; i < userIds?.length; i++) {
    const categories = categoryIds.find((x) => x.userId === userIds[i]);
    for (let j = 0; j < numberOfTask; j++) {
      const categoryId =
        categories?.categoryId[
          generateRandomNumber(0, categories?.categoryId.length - 1)
        ];
      const taskStatus = status[generateRandomNumber(0, status.length - 1)];
      const createdAtDate = generateRandomDate();
      const dueDateTime = generateRandomDate(
        createdAtDate,
        undefined,
        generateRandomNumber(1, 10),
      );
      const completedOnDate = generateRandomDate(
        createdAtDate,
        undefined,
        generateRandomNumber(1, 40),
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
          dueDateTime: dueDateTime,
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
