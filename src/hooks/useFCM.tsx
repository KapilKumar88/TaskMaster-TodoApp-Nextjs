import { messaging, getToken } from '@/lib/firebase';
import { saveFCMTokenServerAction } from '@/server-actions/auth.actions';
import { useEffect } from 'react';

const useFCM = () => {
  useEffect(() => {
    if (!messaging) return;

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted' && messaging) {
        getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        }).then((currentToken) => {
          if (currentToken) {
            saveFCMTokenServerAction(currentToken);
          }
        });
      }
    });
  }, [messaging]);
};

export default useFCM;
