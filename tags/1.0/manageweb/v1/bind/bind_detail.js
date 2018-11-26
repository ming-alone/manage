define(function (require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var siteFun = require('config/function');
    var siteCfg = require('config/config');
    var cookie = require('config/cookie');
    var pub = {};

    pub.init = function () {
        get_wx_bind_result();
    }

    var get_wx_bind_result = function () {
        var getData = {};
        var code = siteFun.getUrlParam('code');
        if (code !== '' && code !== null) {
            cookie('code', code);
        }
        var adminId = siteFun.getUrlParam('state');
        getData = {
            adminId: adminId,
            code: code
        }
        $.ajax({
            type: 'get',
            url: siteCfg.REQUEST_URL.ADMIN_WX_BIND,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                console.log(returnData);
                if (returnData.status === true) {
                    // location.href = "http://manageweb.qiujm.7391test.com/manage.html"
                }
            }
        })
    }

    module.exports = pub;
})