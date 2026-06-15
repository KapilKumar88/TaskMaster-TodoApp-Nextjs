import 'server-only';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import serverSideConfig from '@/config/server.config';

function getAdminApp() {
  const apps = getApps();
  if (apps.length) {
    return apps[0];
  }
  return initializeApp({
    credential: cert({
      projectId: serverSideConfig.FIREBASE.FIREBASE_PROJECT_ID,
      clientEmail: serverSideConfig.FIREBASE.FIREBASE_CLIENT_EMAIL,
      privateKey: serverSideConfig.FIREBASE.FIREBASE_PRIVATE_KEY?.replaceAll(
        String.raw`\n`,
        '\n',
      ),
    }),
  });
}

export { getAdminApp };
