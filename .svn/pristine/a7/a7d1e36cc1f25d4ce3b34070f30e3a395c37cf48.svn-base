define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    var siteCfg = require('config/config');
    var siteFun = require('config/function');

    var pub = {};

    pub.init = function () {
        get_wx_login_result();
    }

    /*微信登入 */
    var get_wx_login_result = function () {
        var postData = {};
        var code = siteFun.getUrlParam('code');
        var appid = siteFun.getUrlParam('appid');
        postData = {
            code: code,
            appid: appid
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.LOGIN,
            dataType: 'json',
            data: postData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.status === true) {
                    location.href = "http://manageweb.qiujm.7391test.com/manage.html"
                } else {
                    siteFun.show_error_tip(returnData.info);
                }
            }
        })
    }
    /*微信登入 */

    module.exports = pub;

})