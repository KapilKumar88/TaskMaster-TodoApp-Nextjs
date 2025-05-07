import 'server-only';
import serverSideConfig from '@/config/server.config';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { WORKER_QUEUE } from '../constants';

const connection = new IORedis(
  parseInt(serverSideConfig.REDIS.PORT),
  serverSideConfig.REDIS.HOST,
  {},
);

export const processTaskQueue = new Queue(
  WORKER_QUEUE.QUEUE_NAMES.PROCESS_TASK,
  {
    connection,
  },
);

processTaskQueue
  .waitUntilReady()
  .then(() => {
    console.info(
      `✅ ${WORKER_QUEUE.QUEUE_NAMES.PROCESS_TASK} Queue is connected to Redis`,
    );
  })
  .catch((err) => {
    console.error(
      `❌ ${WORKER_QUEUE.QUEUE_NAMES.PROCESS_TASK} Queue failed to connect to Redis:`,
      err,
    );
  });
