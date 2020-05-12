define(['jquery', 'cookie'], function() {
    return {
        product: function() {
            //载入头尾
            $('header').load('../lib/header.html', function() {
                // 如果登录，登录按钮转为登出按钮
                if (cookie.get('isLogin')) {
                    var elm = `<a href="javascript:;">登出${cookie.get('phone')}</a>`;
                    $('.login-btn').html(elm);
                    $('.login>a').attr('href', 'javascript:;');
                }
                // 绑定登出事件：清除cookie并刷新
                $('.login-btn').on('click', function() {
                    cookie.remove('isLogin');
                    cookie.remove('phone');
                    location.reload();
                })
            });
            $('footer').load('../lib/footer.html');


            //轮播图
            function banner() {
                var t;
                var index = 0;
                var times = 3000;
                t = setInterval(play, times);

                function play() {
                    index++;
                    if (index >= 4) {
                        index = 0
                    };
                    $('.img').eq(index).fadeIn(500).siblings().fadeOut(500);
                    $('.label').eq(index).addClass('active').siblings().removeClass('active');
                }

                $('.label').on('click', function() {
                    clearInterval(t);
                    $(this).addClass('active').siblings().removeClass('active')
                    index = $(this).index();
                    $('.img').stop().eq(index).fadeIn(500).siblings().fadeOut(500);
                    t = setInterval(play, times);
                });
            }


            //动态载入商品
            let id = location.search.split('=')[1]; // 获得id
            $.ajax({
                type: "get",
                url: "../lib/product.php",
                data: {
                    id: id
                },
                dataType: "json",
                success: function(data) {
                    let pic = JSON.parse(data.pic);
                    let bigpic = `
                <li class="img"><img src="..${pic[1].src}" alt=""></li>
                <li class="img"><img src="..${pic[2].src}" alt=""></li>
                <li class="img"><img src="..${pic[3].src}" alt=""></li>
                <li class="img"><img src="..${pic[4].src}" alt=""></li>
            `;
                    $('.bigpic').append(bigpic);

                    let list = `
                <li class="label active"><img src="..${pic[1].src}" alt=""></li>
                <li class="label"><img src="..${pic[2].src}" alt=""></li>
                <li class="label"><img src="..${pic[3].src}" alt=""></li>
                <li class="label"><img src="..${pic[4].src}" alt=""></li>
            `;
                    $('.pic-list').append(list);

                    let title = data.name;
                    $('.info-title').append(title);

                    let price = '';
                    if (data.discount == 10) {
                        price += `
                <span>￥${data.price}</span>
                `
                    } else {
                        price += `
                <del>￥${data.price}</del><span>￥${(Math.floor((data.price*data.discount))/10).toFixed(2)}</span>
                `
                    }
                    $('.price').append(price);

                    //加入购物车
                    $('.push-btn').on('click', function() {
                        if (!cookie.get('isLogin')) {
                            $('.air-view').fadeIn(600).fadeOut(600);
                            setTimeout(function() {
                                location.href = './login.html';
                            }, 1200)
                        }
                        addItem(data.id);
                    })
                    banner();
                }
            });


            //加入购物车功能
            function addItem(id) {
                var phone = cookie.get('phone');
                //通过用户phone从数据库获取用户的 购物车数据
                $.ajax({
                    type: "get",
                    url: "../lib/user-car.php",
                    data: {
                        phone: phone,
                    },
                    success: function(data) {
                        var shop = data; //获取对应用户购物车数据
                        var product = {
                            id: id,
                            num: 1
                        };
                        // 有数据，操作数据
                        if (JSON.parse(shop).product) {
                            shop = JSON.parse(shop);
                            shop = JSON.parse(shop.product);
                            // 相同商品覆盖
                            if (shop.some(elm => elm.id == id)) {
                                shop.forEach(elm => {
                                    elm.id == id ? elm.num = 1 : null;
                                });
                            } else {
                                shop.push(product);
                            }
                        } else { //无数据，初始化shop,并加入当前商品
                            shop = [];
                            shop.push(product);
                        }
                        shop = JSON.stringify(shop);

                        //写入数据到用户的购物车
                        $.ajax({
                            type: "get",
                            url: "../lib/push.php",
                            data: {
                                phone: phone,
                                product: shop
                            },
                            success: function(res) {
                                // console.log('写入完成');
                                // 写入成功后跳转至购物车
                                location.href = './car.html';
                            }
                        });
                    }
                });
            }
        }
    }
})