import 'client-only';
type ClientSideConfig = {
  APP_NAME: string;
  NODE_ENV: string;
};

const clientSideConfig: ClientSideConfig = Object.freeze({
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
}) as ClientSideConfig;

export default clientSideConfig;
