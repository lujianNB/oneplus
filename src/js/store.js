define(['jquery', 'banner', 'lazyload'], function() {
    return {
        store: function() {
            // 加载头尾
            $('header').load('../lib/header.html');
            $('footer').load('../lib/footer.html');

            // bnner图
            $('#banner').fade();

            //获得所有商品
            $.ajax({
                type: "get",
                url: "../lib/getall.php",
                dataType: "json",
                success: function(data) {
                    let temp = '';
                    data.forEach((elm, i) => {
                        let pic = JSON.parse(elm.pic);
                        // 无折扣时
                        if (elm.discount == 10) {
                            temp += `
                                <li>
                                    <a href="product.html?id=${elm.id}">
                                        <img class="lazy" data-original="..${pic[0].src}" alt="">
                                        <h3>${elm.name}</h3>
                                        <p>
                                            <span>￥${elm.price}</span>
                                        </p>
                                    </a>
                                </li>
                                `
                        } else {
                            // 有折扣时
                            temp += `
                            <li>
                                <a href="product.html?id=${elm.id}">
                                    <img class="lazy" data-original="..${pic[0].src}" alt="">
                                    <h3>${elm.name}</h3>
                                    <p>
                                        <del>￥${elm.price}</del>
                                        <span>最低价￥${(Math.floor((elm.price*elm.discount))/10).toFixed(2)}</span>
                                    </p>
                                    <i>${elm.discount}折</i>
                                </a>
                            </li>
                            `
                        }
                    })
                    $('.p-list').append(temp);

                    //懒加载
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                }
            });

            //商品选项卡
            $('.nav-box>div').on('click', function() {
                if ($(this).find('ul').hasClass('show')) {
                    $(this).find('ul').removeClass('show');
                    $(this).find('i').css({ transform: 'translate(-5px, -5px) rotate(135deg)' });
                } else {
                    $(this).find('ul').addClass('show');
                    $(this).siblings().find('ul').removeClass('show');
                    $(this).find('i').css({ transform: 'translate(-5px, -0px) rotate(-45deg)' });
                    $(this).siblings().find('i').css({ transform: 'translate(-5px, -5px) rotate(135deg)' });
                }
            })
        }
    }
})