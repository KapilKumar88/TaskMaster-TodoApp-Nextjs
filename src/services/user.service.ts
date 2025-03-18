"use server";
import "server-only";
import { generateHashedValue } from "@/lib/utils";
import getPrismaInstance from "@/lib/prisma";

const prismaInstance = await getPrismaInstance();

export async function createUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await generateHashedValue(payload.password);
  return await prismaInstance.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });
}

export async function getUserDetailsByEmailId(email: string) {
  return await prismaInstance.user.findFirst({
    where: {
      email: email,
    },
  });
}
