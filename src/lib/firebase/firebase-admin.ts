import 'server-only';
import admin from 'firebase-admin';
import serverSideConfig from '@/config/server.config';

function getAdminApp() {
  if (admin.apps.length) {
    return admin.apps[0]!;
  }
  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serverSideConfig.FIREBASE.FIREBASE_PROJECT_ID,
      clientEmail: serverSideConfig.FIREBASE.FIREBASE_CLIENT_EMAIL,
      privateKey: serverSideConfig.FIREBASE.FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        '\n',
      ),
    }),
  });
}

export { getAdminApp };
export default admin;
