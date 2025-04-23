import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { WORKER_QUEUE } from '../constants';

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
    console.info('Processing job:', job.id, job.data);
    // Your job logic here
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
