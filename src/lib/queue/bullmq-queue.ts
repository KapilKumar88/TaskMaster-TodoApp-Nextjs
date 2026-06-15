import 'server-only';
import serverSideConfig from '@/config/server.config';
import { Queue } from 'bullmq';
import { WORKER_QUEUE } from '../constants';

const connection = {
  host: serverSideConfig.REDIS.HOST,
  port: parseInt(serverSideConfig.REDIS.PORT),
};

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
