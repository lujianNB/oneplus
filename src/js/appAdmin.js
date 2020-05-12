require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        cookie: "./cookie",
        admin: "./admin"
    },
    shim: {
        lazyload: ['jquery'],
        admin: ['jquery']
    }
});
require(['jquery','cookie', 'admin'], function($, cookie, admin) {
    admin.admin();
});