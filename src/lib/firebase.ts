import clientSideConfig from '@/config/client.config';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: clientSideConfig.FIREBASE.API_KEY,
  authDomain: clientSideConfig.FIREBASE.AUTH_DOMAIN,
  projectId: clientSideConfig.FIREBASE.PROJECT_ID,
  storageBucket: clientSideConfig.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: clientSideConfig.FIREBASE.MESSAGING_SENDER_ID,
  appId: clientSideConfig.FIREBASE.APP_ID,
};

const app = initializeApp(firebaseConfig);

let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
}

export { messaging, getToken, onMessage };
