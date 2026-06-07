const CACHE_NAME = 'jira-cache-v1';
const ALLOWED_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/profile',
  '/dashboard',
  '/dashboard/task-detail',
  '/admin/profile',
  '/admin/dashboard',
  '/admin/dashboard/user-detail',
];

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (
    !ALLOWED_ROUTES.includes(url.pathname) ||
    url.href.includes('firestore.googleapis.com')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200)
            return networkResponse;
          const responseToCache = networkResponse.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseToCache));
          return networkResponse;
        })
      );
    })
  );
});
