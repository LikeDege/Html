/**
 * Created by laiyidan on 2016/1/20.
 */
$(document).ready(function () {
    $("#btnFace").click(showFace);
    $("#btnImg").click(selectImg);
    $("#inputImg").change(showImg);
    $("#btnPublish").click(publish);

    function initeScroll() {
        this.pageNo = 1,
            this.pageSize = 20,
            this.totalCount = -1,
            this.isLoading = false,
            this.isRendering = false,
            this.renderData = [],
            this.renderIndex = 0,
            this.renderHtml = template.compile($('#bbqTemplate').html());
        var self = this;
        $(window).scroll(function () {
            self.render();
        });
    }

    initeScroll.prototype = {
        constructor: initeScroll,
        renderComplete: function () {
            return this.renderIndex >= this.renderData.length;
        },
        loadComplete: function () {
            return this.pageNo == 3;
        },
        isScrollBottom: function () {
            return $("body").scrollTop() >= $("#main").height() - $("body").height();
        },
        render: function () {
            var self = this;
            var tIsRendering = self.isRendering;
            var tRenderComplete = self.renderComplete();
            if (!tIsRendering && (self.isScrollBottom() || self.needToRender()) && !tRenderComplete) {
                self.isRendering = true;
                (function renderOne(source) {
                    var html = self.renderHtml(self.renderData[self.renderIndex++]);
                    if ($("#bbqList1").height() <= $("#bbqList2").height()) {
                        $("#bbqList1").append(html);
                    } else {
                        $("#bbqList2").append(html);
                    }
                    $(".bbq-block:hidden").fadeIn(200, function () {
                        // 当可视区域留空白就继续渲染
                        if ((self.needToRender() || self.isScrollBottom()) && !self.renderComplete()) {
                            renderOne('inner');
                        } else {
                            self.isRendering = false;
                            self.renderComplete() && self.loadMore();
                        }
                    });
                })('scroll');
            } else if (!tIsRendering && tRenderComplete) {
                self.loadMore();
            }
        },
        loadMore: function () {
            var self = this;
            if (self.canBeLoad()) {
                self.isLoading = true;
                $.get('./data' + this.pageNo + '.json', function (data) {
                    if (data.post.length > 0) {
                        self.renderData = data.post;
                        self.renderIndex = 0;
                        self.pageNo++;
                        self.render();
                    } else {
                        self.renderData = [];
                        self.renderIndex = 0;
                    }
                    self.isLoading = false;
                });
            }
        },
        needToRender: function () {
            var readHeight = $("body").height() + $("body").scrollTop();
            var h1 = $("#bbqList1").offset().top + $("#bbqList1").height();
            var h2 = $("#bbqList2").offset().top + $("#bbqList2").height();
            return readHeight - h1 > 100 || readHeight - h2 > 100;
        },
        canBeLoad: function () {
            return this.isLoading || this.isRendering ? false : !this.loadComplete();
        }
    };

    initData();
    function initData() {
        var scroll = new initeScroll();
        scroll.render();
    }

    function publish() {
        var render = template.compile($('#bbqTemplate').html());
        var post = {
            "imgwidth": 720,
            "apassedtime": null,
            "commenttime": 0,
            "latitude": 29.6672330,
            "postid": 37688,
            "upassedtime": null,
            "iscream": null,
            "userid": 3269,
            "content": $("#txtaBBQ").val(),
            "adminpassed": null,
            "nickname": "0宁子欧尼0",
            "userip": "183.64.214.192",
            "theme": null,
            "state": 30,
            "isanonymous": "0",
            "longitude": 107.1985260,
            "imgheight": 691,
            "mobile": null,
            "userpassed": null,
            "uptime": 0,
            "collecttime": 0,
            "audiourl": null,
            "videourl": null,
            "addtime": "2016-03-18 10:31:24",
            "posttype": "2",
            "imageurl": null,
            "location": "重庆市涪陵区本祠街",
            "user": {
                "sex": "1",
                "nickname": "0宁子欧尼0",
                "userid": 3269,
                "headpic": "http:\/\/static.biaobaiqiang.net\/upload\/headpic\/3269\/20160317213507.jpg"
            }
        };
        var html = render(post);

        if ($("#bbqList1").height() <= $("#bbqList2").height()) {
            $("#bbqList1").prepend(html);
        } else {
            $("#bbqList2").prepend(html);
        }
        $(".bbq-block:hidden").slideDown("slow");
    }

    function showFace() {
        closePop();
        var btnFace = document.getElementById("btnFace");
        var btnFaceOffset = $("#btnFace").offset();
        var popTop = btnFaceOffset.top + btnFace.offsetHeight + 11;
        var popLeft = btnFaceOffset.left;
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

    //选择要上传的图片
    function selectImg() {
        document.getElementById("inputImg").click();
    }

    function showImg() {
        closePop();
        var btnImg = document.getElementById("btnImg");
        var btnImgOffset = $("#btnImg").offset();
        var popTop = btnImgOffset.top + btnImg.offsetHeight + 11;
        var popLeft = btnImgOffset.left;
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
            $(".bbq-pop").each(function () {
                if ($(this).css("display") != "none") {
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
