import 'server-only';
type ServerSideConfig = {
  NODE_ENV: string;
  APP_NAME: string;
  APP_URL: string;
  ENCRYPTION_ALGORITHM: string;
  REDIS: {
    URL: string;
    HOST: string;
    PORT: string;
  };
  MAIL: {
    MAIL_HOST: string;
    MAIL_USERNAME: string;
    MAIL_PASSWORD: string;
    MAIL_SECURE: string;
    MAIL_PORT: string;
    MAIL_FROM_ADDRESS: string;
  };
  FIREBASE: {
    FIREBASE_PROJECT_ID: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_PRIVATE_KEY: string;
  };
};

const serverSideConfig: ServerSideConfig = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  APP_URL: process.env.APP_URL,
  REDIS: {
    URL: process.env.REDIS_URL,
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
  },
  ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM ?? 'aes-256-cbc',
  MAIL: {
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_SECURE: process.env.MAIL_SECURE,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
  },
  FIREBASE: {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  },
}) as ServerSideConfig;

export default serverSideConfig;
