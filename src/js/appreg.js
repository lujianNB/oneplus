require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        md5: "./jquery.md5",
        reg: "./reg"
    },
    shim: {
        md5: ['jquery'],
        reg: ['jquery', 'md5']
    }
});
require(['jquery', 'md5', 'reg'], function($, md5, reg) {
    reg.reg();
})