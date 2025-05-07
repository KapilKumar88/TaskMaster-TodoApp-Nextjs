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
        const updateJobPayload: Prisma.JobsUpdateInput = {
          status: JobStatus.COMPLETED,
          emailSent: false,
          fcmSent: false,
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
          updateJobPayload.errorLog = `Task with id ${job.taskId} not found`;
          await prisma.jobs.update({
            where: {
              id: jobId,
            },
            data: updateJobPayload,
          });
          continue;
        }

        if (job.fcmNotificationRequested && !job.fcmSent && user.fcmToken) {
          const response = await fcmNotification(user.fcmToken, taskDetails);
          updateJobPayload.fcmSent = response;
        }

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
          }
        }

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
          where: {
            id: job.id,
          },
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
    }

    return sendResponse({
      message: 'Successfully executed cron job',
    });
  } catch (error) {
    console.log(error);
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
