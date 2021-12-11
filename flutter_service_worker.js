'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "a8ec1266ba1268b8be68e93d65d0d709",
"assets/assets/audio/attack.mp3": "52777c78972495ae0bf0c1932fda1a73",
"assets/assets/audio/damaged.mp3": "35efddc4c4b10fa37ff849bddd9ed060",
"assets/assets/audio/ohagi.mp3": "e6655ae346e7e8ec6c317899d120e707",
"assets/assets/audio/pa.mp3": "9df71ee4488a07f7959b15b03f83a45c",
"assets/assets/audio/pi.mp3": "52777c78972495ae0bf0c1932fda1a73",
"assets/assets/audio/result0.mp3": "e182308ea8edee66fc5ad6a130a65512",
"assets/assets/audio/result1.mp3": "3d953e157a7c305c5c781485c88f0c4e",
"assets/assets/audio/result2.mp3": "dfc91a3d4b03d1f63ac9cc21f82598e9",
"assets/assets/audio/resultmoji.mp3": "81da01fb73e6be0dcd47180936b2cd2e",
"assets/assets/audio/start.mp3": "4b945bf70c0498068a3f10c38a2113e2",
"assets/assets/audio/start0.mp3": "81da01fb73e6be0dcd47180936b2cd2e",
"assets/assets/images/annnai.png": "593045448fffd89800b4ec99889c7ea9",
"assets/assets/images/background.png": "5cfee4e50430862e6705c50720ead728",
"assets/assets/images/damagedEnemy.png": "5847403b41578b7a5ab9e6542acebd4b",
"assets/assets/images/enemy0.png": "618efcb908014e27bbb602f3a211c278",
"assets/assets/images/enemy1.png": "f0ac7c3366d8d808c3f085644581a104",
"assets/assets/images/enemy2.png": "e4bc6ebb07364d2c09786770623037bb",
"assets/assets/images/kekka.png": "b437da6981b22062720c77c546641c5a",
"assets/assets/images/minimini.png": "84141e396c1222be1a2df60b1f0de44f",
"assets/assets/images/ohagi.png": "8a07d2b9747fb35a70a2dca9534a932e",
"assets/assets/images/sanemichaIdle.png": "8c504adcc4580184a158d6f24a161fa1",
"assets/assets/images/sanemichaLeft.png": "cd0c2ecaf2660657780a15125626c205",
"assets/assets/images/sanemichaRight.png": "d1e5ae9a7d56534b758ff9ecacf8fd8f",
"assets/assets/images/splash.png": "44cc880b19682f4488b0c881bebfce48",
"assets/assets/images/splash2.png": "5e001ceb363cb3c2cf9969afe52de775",
"assets/assets/images/start.png": "b1dce2cafacd2905101db9fd8c1bbac8",
"assets/assets/images/sudare.png": "c4c4af29147a95b68c1dcb64b1e672ad",
"assets/assets/images/twitter.png": "2c0ebb3dd3a23a433c76dcb831afb506",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "2f738694cbcd807f88fb97224060a5b2",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flame_splash_screen/assets/layer1.png": "31625c711892b1d250fe3bb58ad32850",
"assets/packages/flame_splash_screen/assets/layer2.png": "51efb74c8ec5a2fd21f622392678f607",
"assets/packages/flame_splash_screen/assets/layer3.png": "24a8fdc53b85d6d749cc2857c708de49",
"canvaskit/canvaskit.js": "62b9906717d7215a6ff4cc24efbd1b5c",
"canvaskit/canvaskit.wasm": "b179ba02b7a9f61ebc108f82c5a1ecdb",
"canvaskit/profiling/canvaskit.js": "3783918f48ef691e230156c251169480",
"canvaskit/profiling/canvaskit.wasm": "6d1b0fc1ec88c3110db88caa3393c580",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "a5b3c82d66fc56eeb928234b371f62ff",
"/": "a5b3c82d66fc56eeb928234b371f62ff",
"main.dart.js": "918c51ae7cf11056fcb413940cd09a06",
"manifest.json": "6bb642bc525394d507dbd7f2db699bc1",
"version.json": "b2471ef83a87b68fb3cf1946cf96722a"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
