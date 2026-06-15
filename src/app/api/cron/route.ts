import serverSideConfig from '@/config/server.config';
import { prisma } from '@/lib/prisma';
import { sendResponse } from '@/lib/utils';
import { NextRequest } from 'next/server';
import moment from 'moment-timezone';
import { Jobs, JobStatus, Prisma } from '@prisma/client';
import appConfig from '@/config/app.config';
import {
  emailNotification,
  fcmNotification,
} from '@/services/notification.service';
import { WORKER_QUEUE } from '@/lib/constants';
import { EMAIL_NOTIFICATION_TEMPLATE } from '@/lib/enums';

async function sendFcmNotificationIfNeeded(
  job: Jobs,
  fcmToken: string | null,
  taskDetails: Awaited<ReturnType<typeof getTaskDetails>>,
  updatePayload: Prisma.JobsUpdateInput,
) {
  if (job.fcmNotificationRequested && !job.fcmSent && fcmToken && taskDetails) {
    updatePayload.fcmSent = await fcmNotification(fcmToken, taskDetails);
  }
}

async function sendEmailNotificationIfNeeded(
  job: Jobs,
  userEmail: string,
  userName: string | null,
  taskDetails: Awaited<ReturnType<typeof getTaskDetails>>,
  updatePayload: Prisma.JobsUpdateInput,
) {
  if (job.emailNotificationRequested && !job.emailSent && taskDetails) {
    let emailTemplate = null;
    if (job.name === WORKER_QUEUE.TASK_NAME.NOTIFY_ABOUT_TASK_DUE) {
      emailTemplate = EMAIL_NOTIFICATION_TEMPLATE.TASK_DUE;
    }
    if (emailTemplate) {
      updatePayload.emailSent = await emailNotification(
        userEmail,
        userName ?? '',
        taskDetails,
        emailTemplate,
      );
    }
  }
}

async function getTaskDetails(taskId: number) {
  return prisma.task.findFirst({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    where: {
      id: taskId,
    },
  });
}

async function updateJobWithFailure(
  jobId: number,
  retryCount: number,
  errorLog: string,
) {
  await prisma.jobs.update({
    where: { id: jobId },
    data: {
      status: JobStatus.FAILED,
      retryCount: retryCount + 1,
      errorLog,
    },
  });
}

async function processJob(
  job: Jobs,
  user: { email: string; fcmToken: string | null; name: string | null },
) {
  const updateJobPayload: Prisma.JobsUpdateInput = {
    status: JobStatus.COMPLETED,
    emailSent: false,
    fcmSent: false,
  };

  const taskDetails = await getTaskDetails(job.taskId);

  if (!taskDetails) {
    await updateJobWithFailure(
      job.id,
      job.retryCount,
      `Task with id ${job.taskId} not found`,
    );
    return;
  }

  await sendFcmNotificationIfNeeded(
    job,
    user.fcmToken,
    taskDetails,
    updateJobPayload,
  );
  await sendEmailNotificationIfNeeded(
    job,
    user.email,
    user.name,
    taskDetails,
    updateJobPayload,
  );

  let notification = null;
  if (!job.notificationAdded) {
    notification = await prisma.notification.create({
      data: {
        name: taskDetails.title,
        description: taskDetails.description,
        notificationReceivedTime: job.scheduledTime,
        user: {
          connect: {
            id: taskDetails.userId,
          },
        },
      },
    });
  }

  await prisma.jobs.update({
    where: { id: job.id },
    data: {
      ...updateJobPayload,
      notificationAdded: notification !== null,
      status:
        updateJobPayload.fcmSent && updateJobPayload.emailSent
          ? JobStatus.COMPLETED
          : JobStatus.FAILED,
      retryCount:
        updateJobPayload.fcmSent && updateJobPayload.emailSent
          ? job.retryCount
          : job.retryCount + 1,
    },
  });
}

export async function GET(req: NextRequest) {
  let jobId = null;
  try {
    if (req.headers.get('authorization') !== serverSideConfig.CRON_JOB_SECRET) {
      return sendResponse({
        status: 'error',
        statusCode: 401,
        message: 'Unauthorized',
      });
    }

    const jobToBeExecuted = await prisma.jobs.findMany({
      where: {
        scheduledTime: {
          lte: moment().utc().toDate(),
        },
        status: {
          in: [JobStatus.PENDING, JobStatus.FAILED],
        },
        retryCount: {
          lte: appConfig.MAX_JOB_RETRY_COUNT,
        },
      },
      orderBy: {
        userId: 'asc',
      },
      take: 20,
    });

    const groupByUserId = jobToBeExecuted.reduce(
      (acc: Record<string, Jobs[]>, job) => {
        acc[job.userId] ??= [];
        acc[job.userId].push(job);
        return acc;
      },
      {},
    );

    for (const userJobs in groupByUserId) {
      const user = await prisma.user.findFirst({
        select: {
          email: true,
          fcmToken: true,
          name: true,
        },
        where: {
          id: userJobs,
        },
      });

      if (!user) {
        continue;
      }

      for (const job of groupByUserId[userJobs]) {
        jobId = job.id;
        await processJob(job, user);
      }
    }

    return sendResponse({
      message: 'Successfully executed cron job',
    });
  } catch (error) {
    console.error(error);
    if (jobId) {
      prisma.jobs.update({
        where: {
          id: jobId,
        },
        data: {
          status: JobStatus.FAILED,
          retryCount: appConfig.MAX_JOB_RETRY_COUNT,
          errorLog: (error as Error)?.message,
        },
      });
    }
    return sendResponse({
      status: 'error',
      statusCode: 500,
      message: (error as Error)?.message ?? 'Internal Server Error',
    });
  }
}
