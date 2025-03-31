type AppConfig = {
  DEFAULT_PERIOD_FOR_COMPUTATION: 'weekly' | 'daily' | 'monthly' | 'yearly';
};

const appConfig: AppConfig = Object.freeze({
  DEFAULT_PERIOD_FOR_COMPUTATION: 'weekly',
  DEFAULT_TIME_ZONE: 'Asia/Kolkata',
}) as AppConfig;

export default appConfig;
