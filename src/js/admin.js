define(['jquery', 'cookie'], function() {
    return {
        admin: function() {
            //无权限进入管理页面
            if (cookie.get('phone') === '15055449475') {
                $('.user').html(`管理员：${cookie.get('phone')}<span class="out" style="color: #fff;cursor:pointer;">退出</span>`)
            } else {
                alert('您没有权限访问此页面')
                window.location.href = '../html/store'
            }

            // 退出
            $('.out').on('click', function () {
                cookie.remove('isLogin');
                cookie.remove('phone');
                window.location.href = '../html/store'
            })

            // 渲染商品详情
            $.ajax({
                type: "get",
                url: "../lib/getall.php",
                dataType: "json",
                success: function(data) {
                    let temp = '';
                    data.forEach((elm, i) => {
                        let pic = JSON.parse(elm.pic);
                            temp += `
                                <li>
                                    <div>${elm.id}</div>
                                    <div>${elm.name}</div>
                                    <div>${elm.discount}</div>
                                    <div>${elm.price}</div>
                                    <div>${elm.num}</div>
                                    <div class="opration">
                                        <div class="update ${elm.id}">编辑</div>
                                        <div class="delete ${elm.id}">删除</div>
                                    </div>
                                </li>`
                    })
                    $('.p-list').append(temp);
                    $('.update').on('click', function(){
                        const id = this.className.slice(7)
                        let value = data.filter(item => {
                            return item.id == id
                        })
                        $('.isShow').css({'display': 'flex'})
                        $('.id').html(value[0].id)
                        $('.name>input').val(value[0].name)
                        $('.discount>input').val(value[0].discount)
                        $('.price>input').val(value[0].price)
                        $('.num>input').val(value[0].num)
                    })
                    $('.delete').on('click', function(){
                        const id = this.className.slice(7)
                        $.ajax({
                            type: "get",
                            url: "../lib/delete.php",
                            data: {
                                id
                            },
                            dataType: "json",
                            success: function(data) {
                                window.location.reload()
                            }
                        });
                    })
                }
            });
            $('.no').on('click', function(){
                $('.isShow').css({'display': 'none'})
            })
            $('.yes').on('click', function(){
                $.ajax({
                    type: "get",
                    url: "../lib/updataProduct.php",
                    data: {
                        id: $('.id').html(),
                        name: $('.name>input').val(),
                        discount: $('.discount>input').val(),
                        price: $('.price>input').val(),
                        num: $('.num>input').val()
                    },
                    dataType: "json",
                    success: function(data) {
                    }
                });
                window.location.reload()
            })
        }
    }
})