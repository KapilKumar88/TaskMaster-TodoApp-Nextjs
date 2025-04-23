import 'server-only';
import serverSideConfig from '@/config/server.config';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
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

export default admin;
