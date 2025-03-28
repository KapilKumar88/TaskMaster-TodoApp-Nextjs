type AppConfig = {
  DEFAULT_PERIOD_FOR_COMPUTATION: 'weekly' | 'daily' | 'monthly' | 'yearly';
};

const appConfig: AppConfig = Object.freeze({
  DEFAULT_PERIOD_FOR_COMPUTATION: 'weekly',
}) as AppConfig;

export default appConfig;
