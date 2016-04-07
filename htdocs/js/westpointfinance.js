var isSubmit

$("#vpan").delegate("li", "click", function (e) {

    var tempIndex = ~~$(this).attr("st");
    $("#vpan li").removeClass("current")
    $(this).addClass("current")
    $("#vpan .content").addClass("fn-hide")
    $($("#vpan .content")[tempIndex]).removeClass("fn-hide")
})

$("#kefuBtn").bind("click", function () {
    if (T.browser.weixin) {
        location.href = "http://kefu.hzins.com/chat/chatting?domain=hzins&referrer=" + encodeURIComponent(location.href) + "&businessType=CQrZsSwiESg&language=zh&platform=mobile";
    } else {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && /(MQQ)/i.test(navigator.userAgent)) {
            location.href = "http://kefu.hzins.com/chat/chatting?domain=hzins&referrer=" + encodeURIComponent(location.href) + "&businessType=CQrZsSwiESg&language=zh&platform=mobile";
        }
        else {
            window.open("http://kefu.hzins.com/chat/chatting?domain=hzins&referrer=" + encodeURIComponent(location.href) + "&businessType=CQrZsSwiESg&language=zh&platform=mobile");
        }
    }
})

$("#process").delegate("li", "click", function () {
    var tempIndex = ~~$(this).attr("st");
    $("#process li").removeClass("current");
    $(this).addClass("current");
    $("#tabs div").addClass("fn-hide")
    $($("#tabs div")[tempIndex]).removeClass("fn-hide")
})

$("#ultip").delegate("li", "click", function () {
    var tempIndex = ~~$(this).attr("st");
    $("#ultip li").removeClass("current");
    $(this).addClass("current");
    $("#tippan>div").addClass("fn-hide")
    $($("#tippan>div")[tempIndex]).removeClass("fn-hide")
})

$('#summary').delegate("li", "click", function () {
    var tempIndex = ~~$(this).attr("st");
    $("#summary li").removeClass("current");
    $(this).addClass("current");
    $("#summarypan div").addClass("fn-hide")
    $($("#summarypan div")[tempIndex]).removeClass("fn-hide")
})

$(".closeSu").bind("click", function () {
    $("#success").hide();
})

$(".closefa").bind("click", function () {
    $("#fail").hide();
})

function selectFemale() {
    $(".sexMale").removeClass("current");
    $(".sexFemale").addClass("current");
}

function selectMale() {
    $(".sexMale").addClass("current");
    $(".sexFemale").removeClass("current");
}

function CheckMobile(mobile) {
    var nReg = new RegExp("^[0-9\-]+$");
    if (!nReg.test(mobile)) {
        return false;
    }
    return true;
}

function getReferrer() {
    var ref = '';
    if (document.referrer.length > 0) {
        ref = document.referrer;
    }
    try {
        if (ref.length == 0 && opener.location.href.length > 0) {
            ref = opener.location.href;
        }
    } catch (e) { }
    var args = String(ref).split('?');
    return args[0];
}

function submit() {
    var contactName = $.trim($("#contactName").val());
    var sex = $(".sexMale").hasClass("current") ? "先生" : "女士";
    var contactTel = $.trim($("#telPhone").val());
    $(".error-mg").remove();
    if (contactName == "") {
        showError($("#contactName").parent(), "请输入您的姓名")
        return false;
    }
    if (!(/^([a-zA-Z\u4e00-\u9fa5 ])*$/.test(contactName))) {
        showError($("#contactName").parent(), "请输入正确的格式")
        return false;
    }
    if (contactTel == "") {
        showError($("#telPhone").parent(), "请输入手机号码")
        return false;
    }
    if (!CheckMobile(contactTel)) {
        showError($("#telPhone").parent(), "请输入正确的手机号码")
        return false;
    }
    if (isSubmit) {
        return false;
    }
    isSubmit = true;
    $(".circle-loader").show();

    $.ajax({
        type: "POST",
        url: "order.php",
        data: { name: encodeURI(contactName), gender: encodeURI(sex), phone: contactTel },
        success: function (data) {
            if (data.status) {
                $("#success").show();
                $("#contactName").val("");
                $("#telPhone").val("");
            } else {
                $("#fail").show();
            }
            $(".circle-loader").hide();
            isSubmit = false;
        },
        error: function () {
            $("#fail").show();
            $(".circle-loader").hide();
            isSubmit = false;
        },
        dataType: "json"
    });
}

function showError(elem, msg) {
    $(elem).append('<p class="mt10 error-mg">' + msg + '</p>')
}

var yuyueTop = $("#tippan").offset().top;
window.onscroll = function () {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || window.scrollY || 0
    if (scrollTop >= yuyueTop && yuyueTop > 0) {
        $("#touxiang").hide();
    } else {
        $("#touxiang").show();
    }
}

$("dl.mt15").click(function () {
    $(this).find("dt").find("span").toggleClass("icon-up").toggleClass("icon-down");
    $(this).find("dd").toggle();
});