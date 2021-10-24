                        importScripts("/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/honors.html","revision":"9b1010ca320eed1234f1957afbf95f6a"},{"url":"/blog/2014/04/01/Java-Projects.html","revision":"7d58d46b45c8bb6672dcd5c291c7fe52"},{"url":"/blog/2014/07/01/Minecraft-Playscape-Project.html","revision":"e4bebbfe4f702cf35a27785f19bb7e56"},{"url":"/blog/2021/02/02/Project-Cage.html","revision":"ccd3cb99410eba2e46207a71f70e8ef2"},{"url":"/blog/2021/08/14/Falling-Parkour-Blog.html","revision":"94e24e1c8b7e5e59b73964d07e60466e"},{"url":"/blog/2018/08/20/Bark-Bark.html","revision":"9104463d64cc13df247615933262a210"},{"url":"/blog/2018/07/09/ISCB-2018-Poster.html","revision":"85271f9d7aa306bb9acf80fa5d340bb9"},{"url":"/blog/2018/11/25/Grace-Hopper-Celebration.html","revision":"335968276c57fdeff41abdbecd68dff4"},{"url":"/blog/2016/12/16/Medina.html","revision":"c376e589e8c6a60a9f5f77e8162a8e57"},{"url":"/blog/2016/04/01/Player-Count-Message.html","revision":"8ad1a4acaaa03923fb95b99ad480e1e0"},{"url":"/blog/2016/10/10/Fake-Midi.html","revision":"92a174412ae67ef8bcd3a83d0f78568f"},{"url":"/blog/2019/02/28/OCWIC.html","revision":"03dc99f018481aa2e25222fbcb78b1c7"},{"url":"/blog/2019/03/11/Blender-Intro.html","revision":"1b261170c66227cde763f841a1ed275e"},{"url":"/privacy.html","revision":"4d9d2a5ded996ccddf52142b842269bb"},{"url":"/sw-register.js","revision":"88bd49dc9229e23ca9110191f422897c"},{"url":"/logo.svg","revision":"674683e14ac64b8450ef5825d6e53695"},{"url":"/blog.html","revision":"1218a8204f163f1ffa7b30e57d0d8069"},{"url":"/references.html","revision":"c16122b11f1f66cc9a4af61201f562b4"},{"url":"/assets/lib/jquery.min.js","revision":"dc5e7f18c8d36ac1d3d4753a87c98d0a"},{"url":"/assets/main.css","revision":"8b5e33a2c9b290fd7eafbb1b6e0cafef"},{"url":"/assets/minima-social-icons.svg","revision":"3a70b871c930a7ed8af27caa162af123"},{"url":"/assets/scripts/top_button.js","revision":"e6dca4f1a355e741524c1a3c92644800"},{"url":"/assets/scripts/trigBanner.js","revision":"69f7ba4c5b0748fbf12e1a9ab8838614"},{"url":"/assets/scripts/showMores.js","revision":"4df9ea11ec1c2d1a1e4a019fa2ff9351"},{"url":"/assets/icons/facebook.svg","revision":"c2fc737afa1f096dc83689e7a00022f6"},{"url":"/assets/icons/github.svg","revision":"218c31b5ff0a9fbe306f90af32e6725b"},{"url":"/assets/icons/twitter.svg","revision":"a093ac97917793b031b599d9d4bffe7f"},{"url":"/assets/icons/youtube.svg","revision":"23b5c26f56b3175582cce5e211d59177"},{"url":"/assets/icons/posts/japanIcon.svg","revision":"1f4a8082be8b7d79f3a35f52b9173553"},{"url":"/assets/icons/reddit.svg","revision":"124dd03e51ebd9ac6520177328602664"},{"url":"/assets/icons/linkedin.svg","revision":"36ed211fab1acfddbfc6d10b8b6bbfb2"},{"url":"/professional/2017/08/01/CCHMC-Research.html","revision":"cfe4258d96dc4e6cae755064e9bee7d0"},{"url":"/professional/2018/04/20/Infinera-Hardware-Design-Engineer.html","revision":"a57cd876664fbbdc1bbd13a9faae75df"},{"url":"/professional/2020/06/29/Microsoft.html","revision":"cf2152a17472249f2fe7547c8d2c02d1"},{"url":"/professional/2016/10/10/RET-Project.html","revision":"7927bd57956a351f12a4b26be3083a19"},{"url":"/professional/2019/02/28/CCHMC-Co-op.html","revision":"bbd2311cacb6081e8ed3f8349e4413e9"},{"url":"/professional/2019/06/11/Intuit.html","revision":"72359047cdd2319faa868200a5ea86e6"},{"url":"/bubble/report.html","revision":"c9062c8cec22fbad58df82ee3746a44d"},{"url":"/bubble/index.html","revision":"65ca03658ae069b958ab6eb9d428a1a8"},{"url":"/professional.html","revision":"adcbe0d7508eee63d790ca5fd0e138bb"},{"url":"/404.html","revision":"9c83308b9582b62cc5b5bf48f1a1ff12"},{"url":"/service-worker.js","revision":"7e0dc2ed233c9924ec3f9a8437bdab9a"},{"url":"/about.html","revision":"dde7b533a3832432b6631b9349fdb89c"},{"url":"/index.html","revision":"2c68ef8c1bf92e99bc4989b6d4a7472f"},{"url":"/honors/2017/10/19/First-Year-in-Review.html","revision":"71bcbcf5299b0ffaad96fb74ee543441"},{"url":"/honors/2017/10/19/Bearcat-Coders.html","revision":"681ab48511d320a284f1cb45c75fd958"},{"url":"/honors/2017/07/28/Treachery.html","revision":"85a27ca5ce42346be23d07973811ee1f"},{"url":"/honors/2018/04/20/Accessibility-on-UC-Campus.html","revision":"914d9bccffbfd8cac905d13b3476e600"},{"url":"/honors/2018/07/04/Japan-Trip.html","revision":"dd19eba8e580f78566df8320dd618c9f"},{"url":"/honors/2018/07/04/Second-Year-In-Review.html","revision":"c203f13e37388cb4a45c845c008ee39d"},{"url":"/honors/2020/06/22/Fourth-Year-In-Review.html","revision":"0ce3ddb89e43d305ee5136c453d6540e"},{"url":"/honors/2020/12/26/Honors-Unity-DOTS.html","revision":"f4eac5ce78f96f89f5c5814e36b14680"},{"url":"/honors/2016/12/01/Gateway-to-University-Honors.html","revision":"f048367c57c5e61e412f2a7adae602e4"},{"url":"/honors/2019/06/04/Third-Year-In-Review.html","revision":"a5f30173cecfb9deff16794c0d14d23e"},{"url":"/resume.html","revision":"433f5e4bb9df22b5279ccf47fdbd8d0d"}];
            // service-worker.js

// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: 'nick-maltbie',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.skipWaiting();
workbox.clientsClaim();

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

// use `networkFirst` strategy for scripts
workbox.routing.registerRoute(
    /assets\/scripts\/\.js$/,
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

