require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        md5: "./jquery.md5",
        cookie: "./cookie",
        login: "./login"
    },
    shim: {
        md5: ['jquery'],
        login: ['jquery', 'md5', 'cookie']
    }
});
require(['jquery', 'md5', 'cookie', 'login'], function($, md5, cookie, login) {
    login.login()
})