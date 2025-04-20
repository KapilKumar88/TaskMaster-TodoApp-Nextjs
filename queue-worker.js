const { Worker } = require('bullmq');
const Redis = require('ioredis');
const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null
});

const worker = new Worker(
  'notifications',
  async (job) => {
    // console.log('Worker processing job', job);
    const { taskId, userId } = job.data;
    console.log(`Notify user ${userId} about task ${taskId}`);
    // e.g., send email or push notification
  },
  { connection },
);

worker.on('completed', (job) => console.log(`✅ Job ${job.id} done`));
worker.on('failed', (job, err) =>
  console.error(`❌ Job ${job.id} failed`, err),
);
