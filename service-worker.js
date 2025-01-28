// service-worker.js

// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: 'nick-maltbie',
    suffix: 'v1.1',
    precache: 'precache',
    runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.skipWaiting();
workbox.clientsClaim();

// default to `networkFirst` strategy
workbox.routing.setDefaultHandler(workbox.strategies.networkFirst());

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// use `networkFirst` strategy for `*.html`, like all my posts
workbox.routing.registerRoute(
    /\.html$/,
    workbox.strategies.networkFirst()
);

// use `cacheFirst` strategy for icons
workbox.routing.registerRoute(
    /\.ico$/,
    workbox.strategies.cacheFirst()
);

// use `cacheFirst` strategy for images
workbox.routing.registerRoute(
    /assets\/(projects|icons|imgs)/,
    workbox.strategies.cacheFirst()
);

// use `cacheFirst` strategy for logo
workbox.routing.registerRoute(
    /logo/,
    workbox.strategies.cacheFirst()
);

// use `networkFirst` strategy for scripts
workbox.routing.registerRoute(
    /assets\/(scripts|js|lib)\/\.js$/,
    workbox.strategies.networkFirst()
);

// use `networkFirst` strategy for style sheets
workbox.routing.registerRoute(
    /\.css$/,
    workbox.strategies.networkFirst()
);

// third party files
workbox.routing.registerRoute(
    /^https?:\/\/nickmaltbie.com/,
    workbox.strategies.staleWhileRevalidate()
);
