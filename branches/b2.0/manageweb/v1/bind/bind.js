define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    var siteFun = require('config/function');
    var siteCfg = require('config/config');
    var cookie = require('config/cookie');

    var pub = {};

    pub.init = function () {
        show_iframe_src();
        // get_wx_bind_result();
    }

    var get_wx_bind_result = function () {
        var code = siteFun.getUrlParam('code');
        var adminId = siteFun.getUrlParam('state');
        var getData = {
            adminId: adminId,
            code: code
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.ADMIN_WX_BIND,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.status === true) {
                    // location.href = "http://manageweb.qiujm.7391test.com/manage.html"
                }
            }
        })
    }

    var show_iframe_src = function () {
        var adminId = siteFun.getUrlParam('adminId');
        var iframeSrc = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=wwbae682afdefe5279&agentid=1000011&redirect_uri=http%3A%2F%2Fmanageweb.qiujm.7391test.com%2Fbind_detail.html&state=' + adminId + '&login_type=jssdk&status=true';
        $('#bind-iframe').attr('src', iframeSrc)
    }

    module.exports = pub;
})