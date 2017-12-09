jQuery(document).ready(function ($) {
    $("#play-btn").click(function () {
        var state = $("#play-btn").attr("name");
        if (state == 'play') {
            $(this).attr("name", "pause").css("background-position", "-60px -140px");
            $("#my-audio")[0].play();
        }
        else {
            $(this).attr("name", "play").css("background-position", "-97px -140px");
            $("#my-audio")[0].pause();
        }
    });
    //设置下标播放歌曲
    var audIndex = 0;
    playAud(audIndex);

    function playAud(Index) {
        var num = $(".right p:eq(" + Index + ")").attr("title");
        $("#my-audio").attr("src", num);
    }

    //点击指定歌曲播放
    choose();

    function choose() {
        $(".right p").click(function () {
            //获取当前播放下标
            audIndex = $(this).index();
            $(".right p").removeClass();
            $(this).addClass("active");
            //修改顶部样式
            var state = $("#play-btn").attr("name");
            $("#play-btn").attr("name", "pause").css("background-position", "-60px -140px");
            //执行播放
            var num = $(".right p:eq(" + audIndex + ")").attr("title");
            $("#my-audio").attr("src", num);
            $("#my-audio")[0].play();
        })
    }

    //定义播放时间
    function dTime() {
        // audIndex = $(this).index();
        var fullTime = $("#my-audio")[0].duration;
        var currentTime = $("#my-audio")[0].currentTime;
        if (isNaN(fullTime))
            $("#time-length").html("00:00:00" + "/" + "00:00:00");
        else {
            $("#time-length").html(format(currentTime) + "/" + format(fullTime));
            //给当前播放时间设置进度条
            var length = parseInt(currentTime) / parseInt(fullTime) * 100;
            $(".progress div").css("width", length + "%");
        }
    }

    function format(times) {
        //获取分钟
        var mm = parseInt(times / 60);
        //获取秒数
        var ss = parseInt(times - mm * 60);
        if (mm < 10) {
            mm = "0" + mm;
        }
        if (ss < 10) {
            ss = "0" + ss;
        }
        var str = mm + ":" + ss;
        return str;

    }

    setInterval(dTime, 1000);
    //上一首/下一首切换
    $("#back").click(function () {
        if (audIndex <= 0) {
            $(".right p").removeClass();
            playAud(audIndex);
            $("#my-audio")[0].pause();
        }
        else {
            $(".right p").removeClass();
            audIndex--;
            playAud(audIndex);
            $("#my-audio")[0].play();
        }
        $(".right p").eq(audIndex).addClass("active");
    });
    $("#forward").click(function () {
        if (audIndex >= 5) {
            $(".right p").removeClass();
            playAud(audIndex);
            $("#my-audio")[5].pause();
        }
        else {
            $(".right p").removeClass();
            audIndex++;
            playAud(audIndex);
            $("#my-audio")[0].play();
        }
        $(".right p").eq(audIndex).addClass("active");
    });
    //注意此处未测试是否可行
    $("#my-audio")[0].onended = function () {
        var len = $("#musics li").length;
        if (audIndex == (len - 1)) {
            audIndex = 0;
        } else {
            audIndex++;
        }
    }
    //音量


});