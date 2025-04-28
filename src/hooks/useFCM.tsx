import { toast } from '@/components/common/sonner';
import clientSideConfig from '@/config/client.config';
import { ToastVariation } from '@/lib/enums';
import { messaging, getToken, onMessage } from '@/lib/firebase/firebase';
import { saveFCMTokenServerAction } from '@/server-actions/auth.actions';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const useFCM = () => {
  const { data: userSession, update } = useSession();
  useEffect(() => {
    if (!messaging) return;

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted' && messaging) {
        getToken(messaging, {
          vapidKey: clientSideConfig.FIREBASE.VAPID_KEY,
        }).then((currentToken) => {
          if (currentToken !== userSession?.user.fcmToken) {
            saveFCMTokenServerAction(currentToken);
            if (userSession) {
              update({
                user: {
                  ...userSession.user,
                  fcmToken: currentToken,
                },
              });
            }
          }
        });
      }
    });

    // Listen for messages when app is active
    const unsubscribe = onMessage(messaging, (payload) => {
      const title = payload.notification?.title ?? 'Notification';
      const body = payload.notification?.body ?? '';
      toast({
        variation: ToastVariation.INFO,
        message: `${title}: ${body}`,
      });
    });

    return () => unsubscribe();
  }, [messaging, userSession]);
};

export default useFCM;
