import serverSideConfig from '@/config/server.config';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { WORKER_QUEUE } from '../constants';

const connection = new IORedis(
  parseInt(serverSideConfig.REDIS.PORT),
  serverSideConfig.REDIS.HOST,
  {},
);

export const notificationQueue = new Queue(
  WORKER_QUEUE.QUEUE_NAMES.TASK_NOTIFICATION,
  {
    connection,
  },
);

notificationQueue
  .waitUntilReady()
  .then(() => {
    console.info('✅ Queue is connected to Redis');
  })
  .catch((err) => {
    console.error('❌ Queue failed to connect to Redis:', err);
  });
