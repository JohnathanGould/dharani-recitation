/* Offline support: the app files are cached on install. When online, the app's own files come from the
   network (so an update shows on the next open) and refresh the cache; offline, the cache answers.
   Fonts are served cache-first. Bump VERSION when shipping changes so old caches are cleared. */
const VERSION = 'v9';
const APP = ['./', 'index.html', 'styles.css', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png',
  'src/app.js', 'src/data.js', 'src/grade.js', 'src/pron.js', 'src/store.js', 'src/recorder.js', 'src/words.js', 'src/align.js', 'src/speech.js', 'src/translit.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const ours = url.origin === location.origin, fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!ours && !fonts) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(req, {ignoreSearch: ours});
    const fresh = fetch(req, ours ? {cache: 'no-cache'} : undefined)
      .then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; });
    if (!ours) return hit || fresh;
    return fresh.catch(() => hit || Response.error());
  }));
});
