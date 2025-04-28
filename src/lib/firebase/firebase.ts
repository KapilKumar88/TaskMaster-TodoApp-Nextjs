import clientSideConfig from '@/config/client.config';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: clientSideConfig.FIREBASE.API_KEY,
  authDomain: clientSideConfig.FIREBASE.AUTH_DOMAIN,
  projectId: clientSideConfig.FIREBASE.PROJECT_ID,
  storageBucket: clientSideConfig.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: clientSideConfig.FIREBASE.MESSAGING_SENDER_ID,
  appId: clientSideConfig.FIREBASE.APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: clientSideConfig.FIREBASE.VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error('An error occurred while fetching the token:', err);
    return null;
  }
};

export { app, messaging };
