self.addEventListener('push', function (event) {
  const data = event.data?.json();
  const title = data?.notification?.title;
  const options = {
    body: data?.notification?.body,
    icon: '/icon.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
