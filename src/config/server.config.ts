import 'server-only';
type ServerSideConfig = {
  NODE_ENV: string;
  APP_NAME: string;
  APP_URL: string;
  ENCRYPTION_ALGORITHM: string;
  REDIS_URL: string;
  MAIL_HOST: string;
  MAIL_USERNAME: string;
  MAIL_PASSWORD: string;
  MAIL_SECURE: string;
  MAIL_PORT: string;
  MAIL_FROM_ADDRESS: string;
};

const serverSideConfig: ServerSideConfig = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  APP_URL: process.env.APP_URL,
  REDIS_URL: process.env.REDIS_URL,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_SECURE: process.env.MAIL_SECURE,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
  ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM ?? 'aes-256-cbc',
}) as ServerSideConfig;

export default serverSideConfig;
