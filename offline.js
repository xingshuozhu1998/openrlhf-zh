// Install a local resource resolver without changing original links or image attributes.
if ('serviceWorker' in navigator && window.isSecureContext) {
  const base = new URL('.', document.currentScript.src);
  let refreshed = false;
  if (!navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshed) { refreshed = true; location.reload(); }
    });
  }
  navigator.serviceWorker.register(new URL('offline-worker.js', base), {scope: base.pathname})
    .catch(error => console.warn('Local resource cache:', error));
}
