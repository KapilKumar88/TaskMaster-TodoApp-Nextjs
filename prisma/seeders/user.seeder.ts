import { generateHashedValue } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const numberOfUsers = 100;

export default async function seedUsers(prismaClient: PrismaClient) {
  const userIds: string[] = [];
  for (let i = 0; i < numberOfUsers; i++) {
    const user = await prismaClient.user.create({
      data: {
        name: faker.person.firstName(),
        email: faker.internet.email({
          provider: "mailinator.com",
        }),
        password: await generateHashedValue(faker.internet.password()),
        profileImage: faker.image.avatar(),
      },
    });
    await prismaClient.settings.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        timeZone: faker.location.timeZone(),
        dateFormat: "MM/DD/YYYY",
        autoArchiveTime: 30,
        autoArchive: false,
      },
    });
    userIds.push(user.id);
  }

  return userIds;
}
