require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        lazyload: "./jquery.lazyload",
        banner: "./banner",
        store: "./store"
    },
    shim: {
        lazyload: ['jquery'],
        banner: ['jquery'],
        store: ['jquery', 'banner', 'lazyload']
    }
});
require(['jquery', 'banner', 'lazyload', 'store'], function($, banner, lazyload, store) {
    store.store();
});