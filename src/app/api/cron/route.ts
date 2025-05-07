import serverSideConfig from '@/config/server.config';
import { prisma } from '@/lib/prisma';
import { sendResponse } from '@/lib/utils';
import { NextRequest } from 'next/server';
import moment from 'moment-timezone';
import { Jobs, JobStatus, Prisma } from '@prisma/client';
import appConfig from '@/config/app.config';
import { emailNotification } from '@/services/notification.service';
import { WORKER_QUEUE } from '@/lib/constants';
import { EMAIL_NOTIFICATION_TEMPLATE } from '@/lib/enums';

export async function GET(req: NextRequest) {
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
        const updateJobPayload: Prisma.JobsUpdateInput = {
          status: JobStatus.COMPLETED,
        };
        const taskDetails = await prisma.task.findFirst({
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
          where: {
            id: job.taskId,
          },
        });

        if (!taskDetails) {
          updateJobPayload.status = JobStatus.FAILED;
          updateJobPayload.retryCount = job.retryCount + 1;
          continue;
        }
        // if (job.fcmNotificationRequested) {
        // }

        if (job.emailNotificationRequested && !job.emailSent) {
          let emailTemplate = null;

          if (job.name === WORKER_QUEUE.TASK_NAME.NOTIFY_ABOUT_TASK_DUE) {
            emailTemplate = EMAIL_NOTIFICATION_TEMPLATE.TASK_DUE;
          }

          if (emailTemplate) {
            const response = await emailNotification(
              user.email,
              user.name,
              taskDetails,
              emailTemplate,
            );
            updateJobPayload.emailSent = response;
            updateJobPayload.retryCount = job.retryCount + 1;
          } else {
            updateJobPayload.emailSent = false;
            updateJobPayload.status = JobStatus.FAILED;
            updateJobPayload.retryCount = job.retryCount + 1;
          }
        }
        await prisma.jobs.update({
          where: {
            id: job.id,
          },
          data: updateJobPayload,
        });
      }
    }

    return sendResponse({
      message: 'Successfully executed cron job',
    });
  } catch (error) {
    console.log(error);
    return sendResponse({
      status: 'error',
      statusCode: 500,
      message: (error as Error)?.message ?? 'Internal Server Error',
    });
  }
}
