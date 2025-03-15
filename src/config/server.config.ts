type ServerSideConfig = {
  APP_NAME: string;
};

const serverSideConfig: ServerSideConfig = Object.freeze({
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
}) as ServerSideConfig;

export default serverSideConfig;
