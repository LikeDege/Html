/**
 * Created by laiyidan on 2016/1/20.
 */
$(document).ready(function() {
    $("#btnFace").click(showFace);
    $("#btnImg").click(selectImg);
    $("#inputImg").change(showImg);
    $("#btnPublish").click(publish);
    initData();
    /*
    function initData() {
        $.get('./data.json', function(data) {
            if(data.post.length > 0) {
                (function initOne(i){
                    if(i == data.post.length) {
                        return;
                    }

                    var render = template.compile($('#bbqTemplate').html());
                    var html = render(data.post[i]);
                    if($("#bbqList1").height() <= $("#bbqList2").height()){$("#bbqList1").append(html)}else {$("#bbqList2").append(html)}
                    $(".bbq-block:hidden").fadeIn(200, function(){
                        initOne(i+1);
                    });
                })(0);
            }
        }); // ajax获取数据
    }*/
    function initData() {
        $.get('./data.json', function(data) {
            if(data.post.length > 0) {
                (function initOne(i){
                    if(i == data.post.length) {
                        return;
                    }
                    var render = template.compile($('#bbqTemplate').html());
                    var html = render(data.post[i]);
                    if(i % 2 == 0){$("#bbqList1").append(html)}else {$("#bbqList2").append(html)}
                    initOne(i+1);
                })(0);
                $(window).scroll(function(){
                    if($("body").scrollTop() >= $("#main").height() - $("body").height()){
                            $("#bbqList1").find(":hidden:first").fadeIn(200);
                        $("#bbqList1").find(":hidden:first").fadeIn(200);
                            $("#bbqList2").find(":hidden:first").fadeIn(200);
                        $("#bbqList2").find(":hidden:first").fadeIn(200);
                    }
                });
                $(window).scroll();

            } else {
                $("#bbqLoading").height($("body").height() - $("#main").height()).show();
            }
        }); // ajax获取数据

    }

    function valHandler(key, val) {
        if(key == 'user.headpic' && !val) {
            // 如果logo为空, 路径改成默认logo路径
            val = './img/df.jpg';
        }
        return val;
    }

    function publish(){
        $("#bbqList1").fadeOut(400, function(){
            if($(this).css("float")=="left"){$(this).css("float","right")}
        }).delay(500).fadeIn(400);
        $("#bbqList2").fadeOut(1000, function(){
            if($(this).css("float")=="left"){$(this).css("float","right")}
        }).delay(500).fadeIn(1000);
    }

    function showFace() {
        closePop();
        var btnFace = document.getElementById("btnFace");
        var popTop = getOffsetTop(btnFace) + btnFace.offsetHeight + 11;
        var popLeft = getOffsetLeft(btnFace);
        if ($("#bbqFaces").length == 0) {
            var bbqPop = $("<div id='bbqFaces' class='bbq-pop'><div class='bbq-pop-arrow'></div><a class='bbq-pop-close'></a></div>");
            bbqPop.css({
                "top": popTop + "px",
                "left": popLeft + "px",
                "width": "375px"
            });
            bbqPop.find(".bbq-pop-close").click(closePop);
            var bbqFacesTemplate = "<ul class='bbq-faces'>";
            for (var i = 0; i < 105; i++) {
                bbqFacesTemplate += "<li class='bbq-face' title='表情" + i + "'><img src='./img/emoji/smiley_" + i + ".png'/></li>";
            }
            bbqFacesTemplate += "</ul>";
            var bbqFaces = $(bbqFacesTemplate);
            bbqFaces.find(".bbq-face").click(selectFace);
            bbqPop.append(bbqFaces);
            $("body").append(bbqPop);
        }
        $("#bbqFaces").slideDown("fast");
    }

    //获取元素的纵坐标（相对于窗口）
    function getOffsetTop(e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += getOffsetTop(e.offsetParent);
        return offset;
    }

    //获取元素的横坐标（相对于窗口）
    function getOffsetLeft(e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += getOffsetLeft(e.offsetParent);
        return offset;
    }

    //选择要上传的图片
    function selectImg() {
        document.getElementById("inputImg").click();
    }

    function showImg() {
        closePop();
        var btnImg = document.getElementById("btnImg");
        var popTop = getOffsetTop(btnImg) + btnImg.offsetHeight + 11;
        var popLeft = getOffsetLeft(btnImg);
        if ($("#bbqPreviewImg").length == 0) {
            var bbqPop = $("<div id='bbqPreviewImg' class='bbq-pop'><div class='bbq-pop-arrow'></div><a class='bbq-pop-close'></a></div>");
            bbqPop.css({
                "top": popTop + "px",
                "left": popLeft + "px",
                "width": "200px",
                "height": "200px"
            });
            bbqPop.find(".bbq-pop-close").click(closePop);
            var bbqPreviewImg = $("<img class='bbq-preview-img'/>");
            var reader = new FileReader();
            reader.onload = function (evt) {
                bbqPreviewImg.attr("src", evt.target.result);
            }
            reader.readAsDataURL(document.getElementById("inputImg").files[0]);
            bbqPop.append(bbqPreviewImg);
            $("body").append(bbqPop);
        }
        $("#bbqPreviewImg").slideDown("fast");
    }

    /**
     * 关闭pop层
     */
    function closePop() {
        if ($(".bbq-pop").length > 0) {
            $(".bbq-pop").each(function(){
                if($(this).css("display") != "none"){
                    $(this).hide();
                }
            })
        }
    }

    /**
     * 表情选择
     */
    function selectFace() {
        var face = $(this)[0];
        $("#txtaBBQ")[0].value = $("#txtaBBQ")[0].value + "[" + face.title + "]";
    }
});
