// Keep the document's original image and script URLs intact; serve cached bytes locally.
const images = {};
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  let local = images[url.href];
  if (url.origin === 'https://cdn.jsdelivr.net') {
    const math = url.pathname.match(/^\/npm\/mathjax@[^/]+\/(.*)$/);
    const font = url.pathname.match(/^\/npm\/@mathjax\/mathjax-newcm-font@[^/]+\/(.*)$/);
    if (math) local = '/_vendor/mathjax/' + math[1];
    if (font) local = '/_vendor/mathjax-newcm-font/' + font[1];
  }
  if (local) event.respondWith(fetch(new URL(local.replace(/^\//, ''), self.location.href)));
});
