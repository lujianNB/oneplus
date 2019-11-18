define(['jquery', 'md5', 'cookie'], function() {
    return {
        reg: function() {
            // 加载头尾
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

            //密文发送ajax注册
            $('.submit').on('click', function() {
                // 加密 密码
                var password = $.md5($('#password').val());
                $.ajax({
                    type: "POST",
                    url: "../lib/reg.php",
                    data: {
                        'phone': $('#phone').val(),
                        'password': password
                    },
                    success: function(response) {
                        var data = JSON.parse(response);
                        if (data.has) {
                            $('.hasname').css('display', 'block');
                        } else {
                            $('.air-view').fadeIn(600).fadeOut(600);
                            setTimeout(function() {
                                location.href = './login.html';
                            }, 1200)
                        }
                    }
                });
            });

            // 事件委托 验证
            $('#reg').on('keyup', '#password,#phone', function() {
                // 手机号正则验证
                var reg = /^1[356789]\d{9}$/;
                if (!reg.test($('#phone').val())) {
                    // 未通过验证，弹窗
                    $('.u-rule').addClass('show');
                    $('#phone').css('border-color', '#eb0028');
                    // 类名操作，添加data-true 
                    $('#phone').removeClass('data-true');
                } else {
                    $('.u-rule').removeClass('show');
                    $('#phone').addClass('data-true');
                    $('#phone').css('border-color', 'rgba(0,0,0,0.1)');
                }

                // 密码正则验证
                reg1 = /^.{6,16}$/;
                reg2 = /[A-z]+/;
                reg3 = /[0-9]+/;

                // 需6~16位
                if (reg1.test($('#password').val())) {
                    $('.p-rule span:nth-child(1)').css({
                        'color': '#7db93f',
                        'text-indent': '0'
                    }).html('√&nbsp;6 ～16 位字符').addClass('p-rule-true');
                } else {
                    $('.p-rule span:nth-child(1)').css({
                        'color': '#000',
                        'text-indent': '10px'
                    }).html('<i></i>6 ～16 位字符').removeClass('p-rule-true');
                }

                // 需包含字母
                if (reg2.test($('#password').val())) {
                    $('.p-rule span:nth-child(2)').css({
                        'color': '#7db93f',
                        'text-indent': '0'
                    }).html('√&nbsp;包含字母').addClass('p-rule-true');
                } else {
                    $('.p-rule span:nth-child(2)').css({
                        'color': '#000',
                        'text-indent': '10px'
                    }).html('<i></i>包含字母').removeClass('p-rule-true');
                }

                // 需包含数字
                if (reg3.test($('#password').val())) {
                    $('.p-rule span:nth-child(3)').css({
                        'color': '#7db93f',
                        'text-indent': '0'
                    }).html('√&nbsp;包含数字').addClass('p-rule-true');
                } else {
                    $('.p-rule span:nth-child(3)').css({
                        'color': '#000',
                        'text-indent': '10px'
                    }).html('<i></i>包含数字').removeClass('p-rule-true');
                }

                // 若三个密码验证都通过，取消弹窗，添加data-true类名
                if ($('.p-rule-true').length == 3) {
                    $('.p-rule').removeClass('show');
                    $('#password').addClass('data-true');
                } else {
                    $('.p-rule').addClass('show');
                    $('#password').removeClass('data-true');
                }

                // data-true 手机号和密码都通过才能点击创建账号
                if ($('.data-true').length == 2) {
                    $('.submit').removeAttr('disabled');
                } else {
                    $('.submit').attr('disabled', 'disabled');
                }


            })

            //密码正则提示
            $('#password').on('click', function() {
                $('.p-rule').addClass('show')
            });

            //用户名已存在
            $('#phone').on('keyup', function() {
                $('.hasname').css('display', 'none');
            })
        }
    }
})