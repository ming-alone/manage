define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    var siteCfg = require('config/config');

    var pub = {};

    pub.init = function () {
        var iframeUrl = "https://open.work.weixin.qq.com/wwopen/sso/qrConnect?";
        iframeUrl += 'appid=' + 'wwbae682afdefe5279';
        iframeUrl += '&agentid=' + siteCfg.WORK_WECHAT_AGENTID;
        iframeUrl += '&redirect_uri=' + encodeURIComponent(siteCfg.WORK_WECHAT_RETURN_URL);
        iframeUrl += '&state=' + siteCfg.WORK_WECHAT_AGENTID;
        iframeUrl += '&login_type=jssdk';
        $('#iframeLogin').attr('src', iframeUrl);
    }

    module.exports = pub;

})
