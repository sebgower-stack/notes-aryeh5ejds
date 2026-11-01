const VERSION="2026-11-02T10:38:47";
const CACHE="mfm-"+VERSION;
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','index.html']).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 if(u.pathname.endsWith('version.json')||u.pathname.endsWith('sw.js')){e.respondWith(fetch(r,{cache:'no-store'}));return;}
 if(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html')){
  e.respondWith(fetch(r.url,{cache:'no-store'}).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('index.html',cp));return res;}).catch(()=>caches.match('index.html').then(m=>m||caches.match('./'))));return;}
 if(/\.(png|jpe?g|webp|gif|pdf)$/i.test(u.pathname)){
  e.respondWith(caches.open(CACHE).then(c=>c.match(r).then(m=>{const f=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res;}).catch(()=>m);return m||f;})));}
});
