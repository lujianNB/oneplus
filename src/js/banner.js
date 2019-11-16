(function($) {
    $.fn.extend({
        fade: function() {
            var $timer = setTimeout(move, 3000);
            var $flag = true;
            var $index = 0;

            function move() {
                $index++;
                if ($index == 2) { $index = 0; }
                $('.img').eq($index).stop().fadeIn(500, function() {
                    if ($flag) {
                        clearTimeout($timer);
                        $timer = setTimeout(move, 3000);
                    }
                }).siblings().stop().fadeOut(500);
            }

            $('#banner').hover(function() {
                $flag = false;
                clearTimeout($timer);
                $('.pre').off('click').click(function() {
                    $index--;
                    if ($index == -1) { $index = 1; }
                    $('.img').eq($index).stop().fadeIn(500).siblings().stop().fadeOut(500);
                }).next('button').off('click').click(function() {
                    $index++;
                    if ($index == 2) { $index = 0; }
                    $('.img').eq($index).stop().fadeIn(500).siblings().stop().fadeOut(500);
                })
            }, function() {
                $flag = true;
                $timer = setTimeout(move, 3000);
            });
            $('#banner>button').each(function(index, items) { items.onselectstart = items.onmousedown = items.onmouseup = function() { return false; } });
            return this;
        }
    })
}(jQuery))