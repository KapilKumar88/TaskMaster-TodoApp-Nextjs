import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { WORKER_QUEUE } from '../constants';
import { prisma } from '../prisma';
import { JobStatus, TaskStatus } from '@prisma/client';
import moment, { DurationInputArg2 } from 'moment-timezone';

const connection = new Redis(
  process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  process.env.REDIS_HOST!,
  {
    maxRetriesPerRequest: null,
  },
);

/**
 *
 * Process task queue started
 */
const processTaskQueueWorker = new Worker(
  WORKER_QUEUE.QUEUE_NAMES.PROCESS_TASK,
  async (job) => {
    const [userSettings, task] = await Promise.all([
      prisma.settings.findFirst({
        where: {
          userId: job.data.userId,
        },
      }),
      prisma.task.findFirst({
        where: {
          id: job.data.taskId,
        },
      }),
    ]);

    if (
      TaskStatus.ACTIVE === task?.status &&
      (userSettings?.emailNotifications || userSettings?.pushNotification)
    ) {
      let taskDueDateTime = moment(task.dueDateTime)
        .tz(userSettings.timeZone)
        .utc();
      taskDueDateTime = taskDueDateTime.subtract(
        userSettings.taskDueTime,
        userSettings.taskDueTimeFrequency as DurationInputArg2,
      );

      await prisma.jobs.create({
        data: {
          name: WORKER_QUEUE.TASK_NAME.NOTIFY_ABOUT_TASK_DUE,
          taskId: task.id,
          userId: task.userId,
          jobId: 'task-due-' + task.id,
          status: JobStatus.PENDING,
          scheduledTime: taskDueDateTime.toDate(),
          fcmNotificationRequested: userSettings.pushNotification,
          emailNotificationRequested: userSettings.emailNotifications,
        },
      });
    }
  },
  {
    connection,
  },
);

processTaskQueueWorker.on('ready', () => {
  console.info('✅ processTaskQueueWorker Worker is connected to Redis');
});

processTaskQueueWorker.on('completed', (job) => {
  console.info(`✅ Job ${job.id} completed in the processTaskQueueWorker`);
});

processTaskQueueWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} in processTaskQueueWorker failed:`, err);
});

/**
 * Process task queue end
 */
