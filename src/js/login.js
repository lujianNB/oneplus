define(['jquery', 'md5', 'cookie'], function() {
    return {
        login: function() {
            // 载入头尾
            $('header').load('../lib/header.html');
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