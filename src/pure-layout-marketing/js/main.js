/**
 * Created by laiyidan on 2016/1/20.
 */
$(document).ready(function() {
    $("#btnFace").click(showFace);
    $("#btnImage").click(selectImage);
    $("#file").change(showImage);

    function showFace() {
        closePanel();
        var btnFace = document.getElementById("btnFace");
        var panelTop = getOffsetTop(btnFace) + btnFace.offsetHeight + 11;
        var panelLeft = getOffsetLeft(btnFace);
        var facePanel = $('<div id="facePanel"></div>');
        facePanel.css({
            "position": "absolute",
            "top": panelTop + "px",
            "left": panelLeft + "px",
            "width": "375px",
            "border": "1px solid #ccc",
            "boxShadow": "0 4px 20px 1px rgba(0,0,0,0.2)",
            "backgroundColor": "#ffffff",
            "padding": "1em"
        });
        var close = $("<a></a>");
        close.css({
            "position": "absolute",
            "zIndex": 2,
            "top": 0,
            "right": "2px",
            "fontSize": "18px",
            "cursor": "pointer",
            "color": "#696e78"
        });
        close.click(closePanel);
        close.text("X");
        var arrow = document.createElement("div");
        arrow.classList.add("arrow");
        var ul = document.createElement("ul");
        ul.id = "face";
        ul.style.listStyle = "none";
        ul.style.padding = "0";
        for (var i = 0; i < 105; i++) {
            var l = document.createElement("li");
            l.style.cursor = "pointer";
            l.style.float = "left";
            l.style.border = "1px solid #e8e8e8";
            l.style.height = "32px";
            l.style.width = "32px";
            l.style.overflow = "hidden";
            l.style.margin = "-1px 0 0 -1px";
            l.style.padding = "4px 2px";
            l.style.textAlign = "center";
            l.onclick = selectFace;
            var img = document.createElement("img");
            img.style.width = "22px";
            img.style.height = "22px";
            img.src = "./img/emoji/smiley_" + i + ".png";
            l.title = "表情" + i;
            l.appendChild(img);
            ul.appendChild(l);
        }
        facePanel.append(close);
        facePanel.append(arrow);
        facePanel.append(ul);
        $(document.body).append(facePanel);

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

    function selectImage() {
        document.getElementById("file").click();
    }

    function showImage(imgUrl) {
        closePanel();
        var btnFace = document.getElementById("btnFace");
        var panelTop = getOffsetTop(btnFace) + btnFace.offsetHeight + 11;
        var panelLeft = getOffsetLeft(btnFace);
        var imgPanel = document.createElement("div");
        imgPanel.id = "imgPanel";
        imgPanel.style.position = "absolute";
        imgPanel.style.top = panelTop + "px";
        imgPanel.style.left = panelLeft + "px";
        imgPanel.style.width = "200px";
        imgPanel.style.height = "200px";
        imgPanel.style.border = "1px solid #ccc";
        imgPanel.style.boxShadow = "0 4px 20px 1px rgba(0,0,0,0.2)";
        imgPanel.style.backgroundColor = "#ffffff";
        imgPanel.style.textAlign = "center";
        imgPanel.style.padding = "1em";
        var close = document.createElement("a");
        close.style.position = "absolute";
        close.style.zIndex = "2";
        close.style.top = "0";
        close.style.right = "2px";
        close.style.fontSize = "18px";
        close.style.cursor = "pointer";
        close.style.color = "#696e78";
        close.onclick = closePanel;
        close.text = "X";
        var arrow = document.createElement("div");
        arrow.classList.add("arrow");
        var img = document.createElement("img");
        img.style.width = "100px";
        img.style.height = "100px";
        var reader = new FileReader();
        reader.onload = function (evt) {
            img.src = evt.target.result;
        }
        reader.readAsDataURL(document.getElementById("file").files[0]);
        imgPanel.appendChild(close);
        imgPanel.appendChild(arrow);
        imgPanel.appendChild(img);
        document.body.appendChild(imgPanel);
    }

    function closePanel() {
        if (document.getElementById("facePanel")) {
            document.getElementById("facePanel").remove();
        }
        if (document.getElementById("imgPanel")) {
            document.getElementById("imgPanel").remove();
        }
    }

    /**
     * 表情选择
     */
    function selectFace() {
        var face = $(this)[0];
        $("#textareaBbq")[0].value = $("#textareaBbq")[0].value + "[" + face.title + "]";
    }
});
