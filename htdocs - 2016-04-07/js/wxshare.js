if (wx) {
    var hidden = document.getElementById('jsApiSignPackage');
    if (hidden) {
        var title = "西点金融";
        var desc = "西点金融网为广大客户提供更为优质的香港保险产品";
        var logo = "www.westpointfinance.cn/images/21-bg.jpg";

        var signPackage = JSON.parse(hidden.value);

        wx.config({
            debug: signPackage.debug,
            appId: signPackage.appId,
            timestamp: signPackage.timestamp,
            nonceStr: signPackage.nonceStr,
            signature: signPackage.signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ'
            ]
        });

        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: desc,
                desc: desc,
                imgUrl: logo,
            });

            wx.onMenuShareAppMessage({
                title: title,
                desc: desc,
                imgUrl: logo,
            });
        });
    }
}
