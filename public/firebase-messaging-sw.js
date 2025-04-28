self.addEventListener('push', function (event) {
  const data = event.data?.json();
  const title = data?.notification?.title;
  const options = {
    body: data?.notification?.body,
    icon: '/placeholder-logo.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
