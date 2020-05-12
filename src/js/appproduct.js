require.config({
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        cookie: "./cookie",
        product: "./product"
    },
    shim: {
        product: ['jquery', 'cookie']
    }
});
require(['jquery', 'cookie', 'product'], function(jquery, cookie, product) {
    product.product();
})