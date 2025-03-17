import "server-only";
type ServerSideConfig = {
  NODE_ENV: string;
};

const serverSideConfig: ServerSideConfig = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
}) as ServerSideConfig;

export default serverSideConfig;
