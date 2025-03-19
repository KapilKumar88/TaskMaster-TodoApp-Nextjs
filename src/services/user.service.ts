import "server-only";
import { generateHashedValue } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export async function createUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await generateHashedValue(payload.password);
  return await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });
}

export async function getUserDetailsByEmailId(email: string) {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}
