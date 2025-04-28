import { toast } from '@/components/common/sonner';
import { ToastVariation } from '@/lib/enums';
import { messaging, fetchToken } from '@/lib/firebase/firebase';
import { onMessage, Unsubscribe } from 'firebase/messaging';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

async function getNotificationPermissionAndToken() {
  if (!('Notification' in window)) {
    return null;
  }

  if (Notification.permission === 'granted') {
    return await fetchToken();
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      return await fetchToken();
    }
  }
  return null;
}

const useFCM = () => {
  const router = useRouter();
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission | null>(null); // State to store the notification permission status.
  const [token, setToken] = useState<string | null>(null); // State to store the FCM token.
  const retryLoadToken = useRef(0); // Ref to keep track of retry attempts.
  const isLoading = useRef(false); // Ref to keep track if a token fetch is currently in progress.

  const loadToken = async () => {
    if (isLoading.current) return;

    isLoading.current = true;
    const token = await getNotificationPermissionAndToken();

    if (Notification.permission === 'denied') {
      setNotificationPermissionStatus('denied');
      console.info(
        '%cPush Notifications issue - permission denied',
        'color: green; background: #c7c7c7; padding: 8px; font-size: 20px',
      );
      isLoading.current = false;
      return;
    }

    if (!token) {
      if (retryLoadToken.current >= 3) {
        alert('Unable to load token, refresh the browser');
        console.info(
          '%cPush Notifications issue - unable to load token after 3 retries',
          'color: green; background: #c7c7c7; padding: 8px; font-size: 20px',
        );
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error('An error occurred while retrieving token. Retrying...');
      isLoading.current = false;
      await loadToken();
      return;
    }

    setNotificationPermissionStatus(Notification.permission);
    setToken(token);
    isLoading.current = false;
  };

  useEffect(() => {
    if ('Notification' in window) {
      loadToken();
    }
  }, []);

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return;

      const m = await messaging();
      if (!m) return;

      const unsubscribe = onMessage(m, (payload) => {
        if (Notification.permission !== 'granted') return;

        const link = payload.fcmOptions?.link ?? payload.data?.link;

        if (link) {
          toast({
            variation: ToastVariation.LINK,
            message: payload.notification?.title ?? '',
            linkAction: () =>
              router.push(payload.fcmOptions?.link ?? payload.data?.link ?? ''),
          });
        } else {
          toast({
            variation: ToastVariation.INFO,
            message: payload.notification?.title ?? '',
          });
        }
      });

      return unsubscribe;
    };

    let unsubscribe: Unsubscribe | null = null;

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    return () => unsubscribe?.();
  }, [token, router, toast]);

  return { token, notificationPermissionStatus };
};

export default useFCM;
