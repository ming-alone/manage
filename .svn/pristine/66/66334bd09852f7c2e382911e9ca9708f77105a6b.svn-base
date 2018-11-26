define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    require('zui');
    var siteCfg = require('config/config');
    var siteFun = require('config/function');

    var pub = {}

    pub.init = function () {
        ajax_get_allgame_data();
        ajax_get_gametype_data();
        ajax_get_rate();
        ajax_get_card_category();
        ajax_get_card_point();
    }

    var ajax_get_allgame_data = function () {
        $(document).on('click', '[href="i7391_API/getdata/get_allgame_data"]', function () {
            get_update_data(siteCfg.REQUEST_URL.GET_ALLGAME_DATA, siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    var get_update_data = function (url, callbackFun, errorFunction) {
        console.log(url);
        $.ajax({
            type: 'GET',
            // url: siteCfg.REQUEST_URL.GET_ALLGAME_DATA,
            url: url,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.status === true) {
                    if ($.isFunction(callbackFun)) {
                        callbackFun(returnData.info);
                    }
                } else {
                    if ($.isFunction(errorFunction)) {
                        errorFunction(returnData.info);
                    }
                }
            }
        })
    }

    var ajax_get_gametype_data = function () {
        $(document).on('click', '[href="i7391_API/getdata/get_gametype_data"]', function () {
            get_update_data(siteCfg.REQUEST_URL.GET_GAMETYPE_DATA, siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    var ajax_get_rate = function () {
        $(document).on('click', '[href="i7391_API/getdata/get_rate"]', function () {
            get_update_data(siteCfg.REQUEST_URL.GET_RATE, siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    var ajax_get_card_category = function () {
        $(document).on('click', '[href="i7391_API/getdata/get_card_category"]', function () {
            get_update_data(siteCfg.REQUEST_URL.GET_CARD_CATEGORY, siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    var ajax_get_card_point = function () {
        $(document).on('click', '[href="i7391_API/getdata/get_card_point"]', function () {
            get_update_data(siteCfg.REQUEST_URL.GET_CARD_POINT, siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    module.exports = pub;
})