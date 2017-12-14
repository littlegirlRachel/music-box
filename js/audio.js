jQuery(document).ready(function ($) {
    $("#play-btn").click(function () {
        var state = $("#play-btn").attr("name");
        if (state == 'play') {
            $("#my-audio")[0].play();
            $(this).attr("name", "pause").css("background-position", "-60px -140px");
            $("#waiting").css("visibility", "hidden");
        }
        else {
            $(this).attr("name", "play").css("background-position", "-97px -140px");
            $("#my-audio")[0].pause();
            $("#waiting").css("visibility", "visible");
        }
    });

    //设置播放按钮状态

    function playBtn() {
        {
            var state = $("#play-btn").attr("name");
            if (state == 'play') {
                $(this).attr("name", "pause").css("background-position", "-60px -140px");
                $("#my-audio")[0].play();
            }
            else {
                $(this).attr("name", "play").css("background-position", "-97px -140px");
                $("#my-audio")[0].pause();

            }
        }
    }

    //设置下标播放歌曲
    var audIndex = 0;
    function playAud(Index) {
        var num = $(".right p:eq(" + Index + ")").attr("title");
        $("#my-audio").attr("src", num);
        var num2 = $(".right p:eq(" + Index + ")").attr("name");
        $("#left img").removeAttr("src");
        $("#left img").attr("src", num2);
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
            //设置左边图片
            // playAud(audIndex);
            $("#my-audio")[0].play();
        })
    }
    //定义播放时间

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


    //上一首/下一首切换
    $("#back").click(function () {
        if (audIndex <= 0) {
            $(".right p").removeClass();
            audIndex = 5;
            playAud(5);
        }
        else {
            $(".right p").removeClass();
            audIndex--;
            playAud(audIndex);
        }
        $("#play-btn").attr("name", "pause").css("background-position", "-60px -140px");
        $(".right p").eq(audIndex).addClass("active");
        $("#my-audio")[0].play();
    });
    $("#forward").click(function () {
        if (audIndex >= 5) {
            $(".right p").removeClass();
            audIndex = 0;
            playAud(audIndex);
        }
        else {
            $(".right p").removeClass();
            audIndex++;
            playAud(audIndex);
        }
        $("#my-audio")[0].play();
        $("#play-btn").attr("name", "pause").css("background-position", "-60px -140px");
        $(".right p").eq(audIndex).addClass("active");
    });
//进度调节
    playPro();

    function playPro() {
        $(".progress").mouseup(function (star) {
            var left1 = star.pageX;
            var left2 = $(".progress").offset().left;
            var left = left1 - left2;
            if (left > 320) left = 320;
            else if (left < 0) left = 0;
            else {
                left = left1 - left2;
            }
            // if($("#my-audio")[0].canplaythrough)
            $(".pprogress").css("width", left + "px");
            $("#my-audio")[0].currentTime = (left / 320) * $("#my-audio")[0].duration;

        });

    }

    function dTime() {
        // audIndex = $(this).index();
        let fullTime = $("#my-audio")[0].duration;
        let currentTime = $("#my-audio")[0].currentTime;
        if (isNaN(fullTime))
            $("#time-length").html("00:00:00" + "/" + "00:00:00");
        else {
            $("#time-length").html(format(currentTime) + "/" + format(fullTime));
            //给当前播放时间设置进度条
            var length = parseInt(currentTime) / parseInt(fullTime) * 100;
            $(".progress div").css("width", length + "%");
        }
    }

    setInterval(dTime, 1000);
    //音量大小调节（手调）
    volume1();

    function volume1() {
        $(".vprogress").mouseup(function (star) {
            var left1 = star.pageX;
            //获取音量区域
            var left2 = $(".vprogress").offset().left;
            var left = left1 - left2;
            if (left > 90) {
                left = 90;
            }
            if (left < 0) {
                left = 0;
            }
            $("#v-bar").css("width", left + "px");
            $("#my-audio")[0].volume = left / 90;
            // testV = false;
        });
    }

    //音量大小按钮调节
    $("#icon-1").click(function () {
        var volume = $("#my-audio")[0].volume;
        volume = volume / 2;
        $("#my-audio")[0].volume = volume;
        var left = volume * 90;
        $("#v-bar").css("width", left + "px");
    });
    $("#icon-2").click(function () {
        var volume = $("#my-audio")[0].volume;
        if (volume < 1) {
            volume = volume + 0.1;
            $("#my-audio")[0].volume = volume;
            var left = volume * 90;
            $("#v-bar").css("width", left + "px");
        }
    });

    //播放选项 随机或单曲
    function random() {
        var n = parseInt(6 * Math.random());
        audIndex = n;
        if (n <= 5) {
            playAud(n);
        }
        else {
            playAud(0);
        }
        $(".right p").removeClass("active");
        $(".right p").eq(n).addClass("active");
    }

    document.getElementById("my-audio").onended = function () {
        if ($("#my-audio").attr("name") == "random") {
            random();
        }
        //顺序播放
        else if ($("#my-audio").attr("class") == "normal") {
            var lenth = $(".right p").length;
            if (audIndex == (lenth - 1)) {
                audIndex = 0;
            }
            else {
                audIndex++;
            }
        }
        else {
            $("#my-audio").attr("loop") == "loop";
        }
        //改变播放歌曲的背景色
        $(".right p").removeClass("active");
        $(".right p").eq(audIndex).addClass("active");
        playAud(audIndex);
        $("#my-audio")[0].play();
    };
    $(".mode").click(function () {
        if ($("#my-audio").attr("name") == "normal") {
            //顺序变为单曲
            $(".mode").css("background", "url('./images/loop.png') no-repeat");
            $("#my-audio").attr("name", "loop");
            $("#my-audio").attr("loop", "loop");
        }
        //单曲变为单曲
        else if ($("#my-audio").attr("name") == "loop") {
            $("#my-audio").removeAttr("name", "loop");
            $("#my-audio").removeAttr("loop", "loop");
            $("#my-audio").attr("name", "random");
            $(".mode").css("background", "url('./images/random.png') no-repeat");
        }
        else {
            //随机播放
            $(".mode").css("background", "url('./images/shunxu.png') no-repeat");
            $("#my-audio").attr("name", "normal");
            $("#my-audio").removeAttr("loop", "loop");
            console.log(audIndex);
        }
    });
    var ff = 0;
    $("#enlarge").click(function () {
        if (ff == 0) {
            $("#main").css("visibility", "hidden");
            $("#bg").css("visibility", "hidden");
            ff = 1;
        }
        else {
            ff = 0;
            $("#main").css("visibility", "visible");
            $("#bg").css("visibility", "visible");
        }

    })
});