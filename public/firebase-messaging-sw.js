importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

// Firebase client config values are public identifiers, not secrets.
// Security is enforced by Firebase Security Rules, not key secrecy.
// See https://firebase.google.com/docs/projects/api-keys
// snyk:ignore:javascript/HardcodedNonCryptoSecret
const firebaseConfig = {
  apiKey: 'AIzaSyASXV-gSXDVPMR2EMNjNknru6Houp2A0KI', // snyk:ignore:javascript/HardcodedNonCryptoSecret
  authDomain: 'taskmaster-nextjs.firebaseapp.com',
  projectId: 'taskmaster-nextjs',
  storageBucket: 'taskmaster-nextjs.appspot.com',
  messagingSenderId: '1234567890',
  appId: '1:1234567890:web:abcdef123456',
  measurementId: 'G-ABCDEFGH',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const link = payload.fcmOptions?.link || payload.data?.link;

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './app-icon.png',
    data: { url: link },
  };
  globalThis.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

globalThis.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;

        if (!url) return;

        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      }),
  );
});
