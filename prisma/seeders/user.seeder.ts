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
    userIds.push(user.id);
  }

  return userIds;
}
