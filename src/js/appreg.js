require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        md5: "./jquery.md5",
        cookie: "./cookie",
        reg: "./reg"
    },
    shim: {
        md5: ['jquery'],
        reg: ['jquery', 'md5']
    }
});
require(['jquery', 'md5', 'cookie', 'reg'], function($, md5, cookie, reg) {
    reg.reg();
})