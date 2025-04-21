import 'server-only';
import { generateHashedValue, verifyHash } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { createCategoryBulk } from './category.service';
import { CUSTOM_ERROR_CODES, DEFAULT_CATEGORIES } from '@/lib/constants';
import { createUserSettings } from './settings.service';
import appConfig from '@/config/app.config';
import { User } from '@prisma/client';
import moment from 'moment';

export async function createUser(payload: {
  name: string;
  email: string;
  password: string;
  timeZone: string;
}) {
  const hashedPassword = await generateHashedValue(payload.password);
  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
      name: payload.name,
      email: payload.email,
    },
  });

  createUserSettings({
    userId: user.id,
    timeZone: payload.timeZone,
    dateFormat: appConfig.DEFAULT_DATE_FORMAT,
  });

  createCategoryBulk(
    DEFAULT_CATEGORIES.map((c) => ({
      name: c.name,
      color: c.color,
      userId: user.id,
    })),
  );
  return user;
}

export async function getUserDetailsByEmailId(email: string) {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function changePassword(payload: {
  userId: User['id'];
  currentPassword: string;
  newPassword: string;
}) {
  const userDetails = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.userId,
    },
  });

  const isValidPassword = await verifyHash(
    payload.currentPassword,
    userDetails.password,
  );

  if (!isValidPassword) {
    throw new Error("Current Password didn't match");
  }

  const hashedPassword = await generateHashedValue(payload.newPassword);

  return await prisma.user.update({
    where: {
      id: payload.userId,
    },
    data: {
      password: hashedPassword,
    },
  });
}

export async function updateEmailVerificationToken(
  token: string,
  userId: string,
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerificationToken: token,
    },
  });
}

export async function setResetPasswordToken(
  token: string | null,
  userId: string,
) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      resetPasswordToken: token,
    },
  });
}

export async function resetPassword(
  password: string,
  token: {
    token: string;
    expiryTime: number;
    userId: string;
  },
) {
  const currentTime = moment().unix();

  if (currentTime > token.expiryTime) {
    throw new Error(CUSTOM_ERROR_CODES.TASK_003.message);
  }

  const checkToken = await prisma.user.findUnique({
    where: {
      id: token.userId,
      resetPasswordToken: token.token,
    },
  });

  if (checkToken === null) {
    throw new Error(CUSTOM_ERROR_CODES.TASK_001.message);
  }

  const hashedPassword = await generateHashedValue(password);
  return prisma.user.update({
    where: {
      id: token.userId,
    },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
    },
  });
}

export async function verifyUserEmail(
  userId: string,
  token: string,
  expireTime: number,
) {
  const currentTime = moment().unix();

  if (currentTime > expireTime) {
    return {
      success: false,
      message: CUSTOM_ERROR_CODES.TASK_003.message,
      code: CUSTOM_ERROR_CODES.TASK_003.code,
    };
  }

  const checkToken = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!checkToken) {
    // invalid Link
    return {
      success: false,
      message: CUSTOM_ERROR_CODES.TASK_001.message,
      code: CUSTOM_ERROR_CODES.TASK_001.code,
    };
  }

  if (checkToken.emailVerifiedAt !== null) {
    // email already verified
    return {
      success: false,
      message: CUSTOM_ERROR_CODES.TASK_002.message,
      code: CUSTOM_ERROR_CODES.TASK_002.code,
    };
  }

  if (checkToken?.emailVerificationToken !== token) {
    //invalid token
    return {
      success: false,
      message: CUSTOM_ERROR_CODES.TASK_001.message,
      code: CUSTOM_ERROR_CODES.TASK_001.code,
    };
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerifiedAt: new Date(),
      emailVerificationToken: null,
    },
  });

  return {
    success: true,
    message: 'Email verified successfully',
    code: '0',
  };
}
