define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    var siteCfg = require('config/config');
    var siteFun = require('config/function');

    var pub = {};

    pub.init = function () {
        var postData = {};
        var code = siteFun.getUrlParam('code');
        var state = siteFun.getUrlParam('state');
        var appid = siteFun.getUrlParam('appid');
        postData = {
            code: code,
            state: state,
            appid: appid
        }
        if (code == '' || code == undefined) {
            return false;
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
                    window.location.href = "/"
                } else {
                    $('#result').html(returnData.info);
                }
            }
        });
    }

    module.exports = pub;

})
