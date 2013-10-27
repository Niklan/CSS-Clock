/**
 * Механизм, который заставляет часы ожить.
 */
(function ($) {
    var time;
    var hr;
    var min;
    var sec;

    function setTime(date) {
        time = new Date(date)
        hr = time.getHours();
        min = time.getMinutes();
        sec = time.getSeconds();
    }

    setInterval(function () {
        $.ajax({
            dataType: 'jsonp',
            url: 'http://json-time.appspot.com/time.json?tz=Asia/Yekaterinburg',
            success: function (data) {
                setTime(data.datetime);
            }
        });

        // 1 час - 30 градусов.
        // Из-за того что стрелки на 0 градусов показывает 6 часов
        // мы вычитаем из полученного эти часы, а они равны 180 градусам.
        var hrDeg = hr * 30 - 180;
        // То же самое и с минутами.
        // 1 минута - 6 градусов.
        var minDeg = min * 6 - 180;

        $("#hour").css({
            '-webkit-transform': 'rotate(' + hrDeg + 'deg)',
            '-moz-transform': 'rotate(' + hrDeg + 'deg)',
            '-ms-transform': 'rotate(' + hrDeg + 'deg)',
            '-o-transform': 'rotate(' + hrDeg + 'deg)',
            'transform': 'rotate(' + hrDeg + 'deg)'
        });

        $("#minute").css({
            '-webkit-transform': 'rotate(' + minDeg + 'deg)',
            '-moz-transform': 'rotate(' + minDeg + 'deg)',
            '-ms-transform': 'rotate(' + minDeg + 'deg)',
            '-o-transform': 'rotate(' + minDeg + 'deg)',
            'transform': 'rotate(' + minDeg + 'deg)'
        });

        $("#clock-text").html(hr + ":" + min + ":" + sec);
    }, 1000);
})(jQuery);
