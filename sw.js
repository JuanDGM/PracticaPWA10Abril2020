

importScripts('js/sw-utils.js');

const CACHE_STATIC = 'static-v1';
const CACHE_INMUTABLE = 'inmutable-v1';
const CACHE_DYNAMIC = 'dynamic-v1';


const APP_SHEL = [
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/spiderman.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/wolverine.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/hulk.jpg',
    'js/app.js'
];
const inmitable = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];


self.addEventListener('install', e=>{
    
    const respuesta = caches.open(CACHE_STATIC).then(cache=>{
        cache.addAll(APP_SHEL);
    });
    
    const respuesta2 = caches.open(CACHE_INMUTABLE).then(cache=>{
        cache.addAll(inmitable);
    });
    
    e.waitUntil(Promise.all([respuesta,respuesta2]));
    
});


self.addEventListener('activate',e=>{
    
    const respuesta = caches.keys().then(keys=>{
        
        keys.forEach(key=>{
            if(key!==CACHE_STATIC && key.includes('static')){
                caches.delete(key);
            }
        });
    });
    
    e.waitUntil(respuesta);
});


self.addEventListener('fetch', e=>{
    
   const respuesta =  caches.match(e.request).then(res=>{
       
       if(res){
           return res;
       }else{
           fetch(e.request).then(newRes=>{
               peticionFallaCache(e.request, CACHE_DYNAMIC, newRes);
           });
       }
   });
    e.respondWith(respuesta);
    
});


