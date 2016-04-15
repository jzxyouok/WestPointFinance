$(function () {
    var isWx = /MicroMessenger/i.test(window.navigator.userAgent);
    if (isWx) {
        $.ajax({
            url: 'getWxJsApiSignPackage.php?url=' + encodeURIComponent(location.href.split('#')[0]),
            method: 'GET',
            dataType: 'text',
            success: function (rsp) {
                if (rsp && rsp.length > 0) {
                    var sign = JSON.parse(rsp);
                    wx.config({
                        debug: true,
                        appId: sign.appId,
                        timestamp: sign.timestamp,
                        nonceStr: sign.nonceStr,
                        signature: sign.signature,
                        jsApiList: [
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone'
                        ]
                    });
                    wx.ready(function () {
                        wx.onMenuShareAppMessage({
                            title: sign.title,
                            desc: sign.desc,
                            imgUrl: sign.logo,
                        });
                        wx.onMenuShareTimeline({
                            title: sign.desc,
                            desc: sign.desc,
                            imgUrl: sign.logo,
                        });
                        wx.onMenuShareQQ({
                            title: sign.title,
                            desc: sign.desc,
                            imgUrl: sign.logo,
                        });
                        wx.onMenuShareWeibo({
                            title: sign.title,
                            desc: sign.desc,
                            imgUrl: sign.logo,
                        });
                        wx.onMenuShareQZone({
                            title: sign.title,
                            desc: sign.desc,
                            imgUrl: sign.logo,
                        });
                    })
                }
            }
        })
    }
})
