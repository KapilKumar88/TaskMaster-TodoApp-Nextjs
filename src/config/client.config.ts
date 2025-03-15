type ClientSideConfig = {
  APP_NAME: string;
};

const clientSideConfig: ClientSideConfig = Object.freeze({
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
}) as ClientSideConfig;

export default clientSideConfig;
