'use client';
import useFCM from '@/hooks/useFCM';
import { saveFCMTokenServerAction } from '@/server-actions/auth.actions';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function NotificationPermission() {
  const { token } = useFCM();
  const { data: userSession, update } = useSession();

  useEffect(() => {
    const saveFCMToken = async () => {
      if (token && userSession) {
        await saveFCMTokenServerAction(token);
        update({
          user: {
            ...userSession.user,
            fcmToken: token,
          },
        });
      }
    };

    if (token !== userSession?.user.fcmToken && token) {
      saveFCMToken();
    }
  }, [token, userSession]);
  return null;
}
