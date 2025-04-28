import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { WORKER_QUEUE } from '../constants';
import admin from '../firebase/firebase-admin';

const connection = new Redis(
  process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  process.env.REDIS_HOST!,
  {
    maxRetriesPerRequest: null,
  },
);

const worker = new Worker(
  WORKER_QUEUE.QUEUE_NAMES.TASK_NOTIFICATION,
  async (job) => {
    console.info('Processing job:', job.id);
    await admin.messaging().send({
      token: job.data.fcmToken,
      notification: {
        title: job.data.title,
        body: job.data.body,
      },
      data: {
        link: job.data.link,
        taskId: job.data.taskId.toString(),
      },
    });
    console.info('Notification sent successfully');
  },
  {
    connection,
  },
);

worker.on('ready', () => {
  console.info('✅ Worker is connected to Redis');
});

worker.on('completed', (job) => {
  console.info(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});
