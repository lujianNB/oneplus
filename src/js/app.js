require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        lazyload: "./jquery.lazyload",
        banner: "./banner",
        cookie: "./cookie",
        store: "./store"
    },
    shim: {
        lazyload: ['jquery'],
        banner: ['jquery'],
        store: ['jquery', 'banner', 'lazyload']
    }
});
require(['jquery', 'banner', 'lazyload', 'cookie', 'store'], function($, banner, lazyload, cookie, store) {
    store.store();
});