type AppConfig = {
  DEFAULT_PERIOD_FOR_COMPUTATION: 'weekly' | 'daily' | 'monthly' | 'yearly';
  DEFAULT_TIME_ZONE: string;
  DEFAULT_LANGUAGE: string;
  DEFAULT_DATE_TIME_FORMAT: string;
  PROCESS_TASK_DELAY: number;
  MAX_JOB_RETRY_COUNT: number;
};

const appConfig: AppConfig = Object.freeze({
  DEFAULT_PERIOD_FOR_COMPUTATION: 'weekly',
  DEFAULT_TIME_ZONE: 'Asia/Kolkata',
  DEFAULT_LANGUAGE: 'en',
  DEFAULT_DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  PROCESS_TASK_DELAY: 20000,
  MAX_JOB_RETRY_COUNT: 3,
}) as AppConfig;

export default appConfig;
