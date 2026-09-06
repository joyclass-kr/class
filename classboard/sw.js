// 알림장 서비스 워커.
//
// 이 앱은 화면마다 서버에 물어봐야 하는 것뿐이라 오프라인으로 쓸 수는 없다.
// 그래도 껍데기를 캐시에 넣어 두면, 지하철에서 앱을 열었을 때 흰 화면 대신
// 최소한 틀이라도 뜬다. 늘 서버 것을 먼저 쓰고 실패할 때만 캐시를 꺼낸다.
const CACHE_NAME = 'classboard-v1';
const SHELL = [
  '/classboard/',
  '/classboard/index.html',
  '/classboard/style.css',
  '/classboard/app.js',
  '/classboard/notice-card.js',
  '/classboard/manifest.json',
  '/favicon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    // 하나라도 없으면 addAll 이 통째로 실패해 설치가 안 된다. 한 장씩 넣는다.
    caches.open(CACHE_NAME).then((cache) => Promise.all(
      SHELL.map((url) => cache.add(url).catch(() => null))
    ))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // 서버에 물어보는 것은 캐시하지 않는다. 지난 알림장을 새 것인 양 보여 주면
  // 안 읽은 표시도, 회신 여부도 다 어긋난다.
  if (new URL(event.request.url).pathname.startsWith('/api/')) return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
