
function peticionFallaCache(req, cacheName, nRes){
    
    caches.open(cacheName).then(cache=>{
                   cache.put(req, nRes);
               });
               return nRes.clone();
    
}

