type AppConfig = {
  DEFAULT_PERIOD_FOR_COMPUTATION: "weekly" | "daily" | "monthly" | "yearly";
  DEFAULT_TIME_ZONE: string;
  DEFAULT_LANGUAGE: string;
  DEFAULT_DATE_FORMAT: string;
};

const appConfig: AppConfig = Object.freeze({
  DEFAULT_PERIOD_FOR_COMPUTATION: "weekly",
  DEFAULT_TIME_ZONE: "Asia/Kolkata",
  DEFAULT_LANGUAGE: "en",
  DEFAULT_DATE_FORMAT: "dd/MM/yyyy",
}) as AppConfig;

export default appConfig;
