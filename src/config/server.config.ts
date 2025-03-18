import "server-only";
type ServerSideConfig = {
  NODE_ENV: string;
  APP_NAME: string;
};

const serverSideConfig: ServerSideConfig = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
}) as ServerSideConfig;

export default serverSideConfig;
