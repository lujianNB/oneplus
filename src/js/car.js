define(['jquery', 'cookie'], function() {
    return {
        car: function() {
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

            //未登录无权限购物车，跳转至登陆界面
            if (!cookie.get('isLogin')) {
                $('#main>.container').load('../lib/noshop.html');
                $('.air-view').fadeIn(300).fadeOut(600);
                setTimeout(function() {
                    location.href = './login.html';
                }, 900)
            }

            //登录成功后,获取cookie中的用户phone
            var phone = cookie.get('phone');
            if (phone) {
                $.ajax({
                    type: "get",
                    url: "../lib/user-car.php",
                    data: {
                        phone: phone,
                    },
                    success: function(shop) {
                        shop = JSON.parse(shop);
                        shop = shop.product;
                        if (shop != '[]') {
                            shop = JSON.parse(shop);
                            // 发送idList 查询
                            console.log(shop)
                            var idList = shop.map(elm => elm.id).join();
                            $.ajax({
                                type: "get",
                                url: "../lib/car.php",
                                data: {
                                    'idList': idList
                                },
                                dataType: "json",
                                success: function(data) {
                                    var tempstr = '';
                                    data.forEach((elm, i) => {
                                        let pic = JSON.parse(elm.pic);
                                        // 过滤，使拿到的id和数据库的id相匹配  不然会乱  id和num不对应
                                        var arr = shop.filter((val, i) => {
                                            return val.id == elm.id;
                                        });
                                        // 拼接字符串
                                        tempstr += `
                                        <li class="item">
                                            <div class="item-pic">
                                                <img src="..${pic[0].src}" alt="" id="${elm.id}">
                                            </div>
                                            <div class="item-msg">
                                                <h3>${elm.name}</h3>
                                                <div class="price">
                                                    <span>￥${elm.price}</span>
                                                    <em>节省：￥<i> ${(elm.price-(Math.floor(elm.price*elm.discount))/10).toFixed(2)}</i></em>
                                                </div>
                                                <div class="num-btn">
                                                    <div class="num-box">
                                                        <span class="sub-btn"></span>
                                                        <input type="text" name="num" class="num" value="${arr[0].num}">
                                                        <span class="add-btn"></span>
                                                    </div>
                                                </div>
                                                <span class="f-price">￥<i> ${((Math.floor((elm.price*elm.discount))/10)*arr[0].num).toFixed(2)}</i></span>
                                                <div class="del">
                                                    <i class="del-btn">
                                                        <em></em>
                                                        <em></em>
                                                    </i>
                                                </div>
                                            </div>
                                        </li>`;
                                    });
                                    $('.car-items').append(tempstr);

                                    //购物车图片点击跳转
                                    $('.item-pic').on('click', function() {
                                        console.log($(this).find('img')[0].id);
                                        var id = $(this).find('img')[0].id;
                                        location.href = '../html/product?id=' + id;
                                    })

                                    //价格计算
                                    function analyze() {
                                        //总价
                                        function sumprice(elm, sp) {
                                            var total = elm.text();
                                            var arr = total.split(sp);
                                            var sum = 0
                                            for (var i = 0; i < arr.length; i++) {
                                                arr[i] = Number(arr[i]);
                                                sum += arr[i];
                                            }
                                            sum = sum.toFixed(2);
                                            return sum;
                                        }

                                        //小计和节省
                                        function totalp(elm, sp) {
                                            var total = elm.text();
                                            var arr = total.split(sp);
                                            arr.shift();
                                            var arr2 = elm.parents().find('.item').find('.num');
                                            arr2 = Array.from(elm.parents().find('.item').find('.num'));
                                            for (var j = 0; j < arr2.length; j++) {
                                                arr2[j] = Number(arr2[j].value);
                                            }
                                            var sum = 0;
                                            for (var i = 0; i < arr.length; i++) {
                                                arr[i] = Number(arr[i]);
                                                sum += arr[i] * arr2[i];
                                            }
                                            sum = sum.toFixed(2);
                                            return sum;
                                        }
                                        //数量
                                        function num(elm) {
                                            var arr = Array.from(elm);
                                            var sum = 0;
                                            for (var i = 0; i < arr.length; i++) {
                                                sum += Number(arr[i].value);
                                            }
                                            return sum;
                                        }

                                        var sum1 = '',
                                            sum2 = '',
                                            sum3 = '',
                                            sum4 = '';

                                        //小计
                                        sum1 = totalp($('.price>span'), '￥')
                                        $('.subtotal>span').html('￥ ' + sum1);

                                        // 总价
                                        sum2 = sumprice($('.f-price>i'), ' ')
                                        $('.total-p').html('￥ ' + sum2);

                                        //节省
                                        sum3 = totalp($('.price>em>i'), ' ')
                                        $('.discount>span').html('￥ -' + sum3);

                                        //数量
                                        sum4 = num($('.num-box>.num'))
                                        $('.select-num>em').html(sum4);
                                    }
                                    analyze();

                                    //操作数据库改变用户购物车
                                    function itemChange() {
                                        var arr1 = Array.from($('.item-pic>img'));
                                        var arr2 = Array.from($('.num'));
                                        var product = [];
                                        for (var i = 0; i < arr1.length; i++) {
                                            // 对象传入数组
                                            var obj = {
                                                'id': arr1[i].id,
                                                'num': arr2[i].value
                                            }
                                            product.push(obj);
                                        }
                                        var phone = cookie.get('phone');
                                        //通过当前信息生成一个JSON数组，传入数据库
                                        $.ajax({
                                            type: "get",
                                            url: "../lib/push.php",
                                            data: {
                                                phone: phone,
                                                product: JSON.stringify(product)
                                            },
                                            success: function(res) {
                                                // console.log("写入成功");
                                            }
                                        });
                                    }
                                    itemChange();


                                    //添加商品数量
                                    $('.sub-btn').on('click', function() {
                                        // 获取商品数量
                                        var num = Number($(this).siblings()[0].value);
                                        // 获得商品价格
                                        var price = $(this).parents().eq(2).find('.price>span')[0].innerHTML.slice(1) - $(this).parents().eq(2).find('.price>em>i')[0].innerHTML.slice(1); //
                                        // 最少一件
                                        if (num <= 1) {
                                            $(this).siblings()[0].value = num
                                        } else {
                                            $(this).siblings()[0].value = Number($(this).siblings().val()) - 1;
                                            num--;
                                        }
                                        // 总价计算
                                        $(this).parents().eq(2).find('.f-price>i')[0].innerHTML = ' ' + (price * num).toFixed(2);
                                        analyze();
                                        itemChange();
                                    })

                                    //减少商品数量
                                    $('.add-btn').on('click', function() {
                                        var num = Number($(this).siblings()[1].value);
                                        var price = $(this).parents().eq(2).find('.price>span')[0].innerHTML.slice(1) - $(this).parents().eq(2).find('.price>em>i')[0].innerHTML.slice(1);
                                        // 最多5件
                                        if (num >= 5) {
                                            $(this).siblings()[1].value = num
                                        } else {
                                            $(this).siblings()[1].value = Number($(this).siblings()[1].value) + 1;
                                            num++;
                                        }
                                        $(this).parents().eq(2).find('.f-price>i')[0].innerHTML = ' ' + (price * num).toFixed(2);
                                        analyze();
                                        itemChange();
                                    })

                                    //删除商品
                                    $('.del-btn').on('click', function() {
                                        $(this).parents().eq(2).remove();
                                        analyze();
                                        itemChange();
                                        if ($('.item').length == 0) {
                                            $('#main>.container').load('../lib/noshop.html');
                                        }
                                    })
                                }
                            });
                        } else {
                            $('#main>.container').load('../lib/noshop.html');
                        }
                    }
                });
            }
        }
    }
})