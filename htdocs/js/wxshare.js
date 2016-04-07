if (wx) {
    var hidden = document.getElementById('jsApiSignPackage');
    if (hidden) {
        var title = "西点金融 - 优质香港保险";
        var desc = "西点金融网为广大客户提供更为优质的香港保险产品，香港保险费率更低，保障更全，保额更高，投资回报高。立即预约，即可获得香港保险顾问一对一为您定制的投保计划书";
        var logo = "http://www.westpointfinance.cn/images/shareLogo.jpg";

        var signPackage = JSON.parse(hidden.value);

        wx.config({
            debug: signPackage.debug,
            appId: signPackage.appId,
            timestamp: signPackage.timestamp,
            nonceStr: signPackage.nonceStr,
            signature: signPackage.signature,
            jsApiList: [
              'onMenuShareAppMessage',
              'onMenuShareTimeline',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone',
            ]
        });

        wx.ready(function () {
            wx.onMenuShareAppMessage({
                title: title,
                desc: desc,
                imgUrl: logo,
            });

            wx.onMenuShareTimeline({
                title: desc,
                desc: desc,
                imgUrl: logo,
            });


            wx.onMenuShareQQ({
                title: title,
                desc: desc,
                imgUrl: logo,
            });

            wx.onMenuShareWeibo({
                title: title,
                desc: desc,
                imgUrl: logo,
            });

            wx.onMenuShareQZone({
                title: title,
                desc: desc,
                imgUrl: logo,
            });
        });
    }
}
