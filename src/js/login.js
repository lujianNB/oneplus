define(['jquery', 'md5', 'cookie'], function() {
    return {
        login: function() {
            // 载入头尾
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

            // 点击登录
            $('.submit').on('click', function() {
                // 加密密码
                var password = $.md5($('#password').val());
                // 发送ajax请求验证手机号密码是否正确
                $.ajax({
                    type: "POST",
                    url: "../lib/login.php",
                    data: {
                        phone: $('#phone').val(),
                        password: password
                    },
                    success: function(response) {
                        var data = JSON.parse(response);
                        if (!data.isLogin) {
                            $('.false').css('display', 'block');
                        } else {
                            // 登陆成功弹窗
                            $('.air-view').fadeIn(600).fadeOut(600);
                            // 存cookie
                            cookie.set('isLogin', 'true', 1);
                            cookie.set('phone', $('#phone').val(), 1);
                            // 弹窗完成后跳转
                            setTimeout(function() {
                                location.href = './store.html';
                            }, 1200)
                        }
                    }
                });
            })
        }
    }
})