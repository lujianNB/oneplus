require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        cookie: "./cookie",
        car: "./car"
    },
    shim: {
        car: ['jquery', 'cookie']
    }
});
require(['jquery', 'cookie', 'car'], function(jquery, cookie, car) {
    car.car();
})