define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    var siteFun = require('config/function');
    var siteCfg = require('config/config');
    var cookie = require('lib/cookie');

    var pub = {};

    pub.init = function () {
        get_wx_bind_result();
    }

    var get_wx_bind_result = function () {
        var getData = {};
        var code = siteFun.getUrlParam('code');
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
                var s = 2;
                if (returnData.status === true) {
                    $('.alert').addClass('alert-success');
                    $('.content').html(returnData.info + '  ' + s + 'S後跳轉到登入頁');
                    $('i').addClass('icon-ok-sign');
                    setTimeout(function () {
                        s--;
                        $('.content').html(returnData.info + '  ' + s + 'S後跳轉到登入頁');
                        location.href = "/login.html"
                    }, 2000)
                } else {
                    $('.alert').addClass('alert-danger');
                    $('i').addClass('icon-remove-sign');
                    $('.content').html(returnData.info);
                }
            }
        })
    }

    module.exports = pub;
})
