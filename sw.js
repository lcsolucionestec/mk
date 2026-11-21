const CACHE='lc-portal-shell-v1';
const OFFLINE='./offline.html';
self.addEventListener('install',event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll([OFFLINE]);await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;if(url.pathname.includes('/rest/v1/')||url.pathname.includes('/auth/v1/')||url.pathname.includes('/functions/v1/'))return;if(req.mode==='navigate'){event.respondWith((async()=>{try{return await fetch(req);}catch(_){return (await caches.match(OFFLINE))||Response.error();}})());}});
