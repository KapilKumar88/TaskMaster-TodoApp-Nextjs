import { PrismaClient } from '@prisma/client';
import seedUsers from './user.seeder';
import seedCategories from './category.seeder';
import crypto from 'crypto';
import seedTasks from './task.seeder';

const prisma = new PrismaClient();

export function generateRandomNumber(min: number, max: number) {
  const range = max - min + 1;
  const randomBytes = crypto.randomBytes(4);
  const randomNumber = parseInt(randomBytes.toString('hex'), 16) % range;
  return min + randomNumber;
}

export async function main() {
  console.info('creating users .....');
  const userIds = await seedUsers(prisma);
  console.info('creating users done .....');
  console.info('creating categories .....');
  const categoryIds = await seedCategories(prisma, userIds);
  console.info('creating categories done .....');
  console.info('creating tasks .....');
  await seedTasks(prisma, userIds, categoryIds);
  console.info('creating tasks done.....');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
