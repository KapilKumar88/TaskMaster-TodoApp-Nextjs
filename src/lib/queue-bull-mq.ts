import serverSideConfig from '@/config/server.config';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(serverSideConfig.REDIS_URL);

export const notificationQueue = new Queue('notification-queue', {
  connection,
});
export const emailQueue = new Queue('email-queue', { connection });
