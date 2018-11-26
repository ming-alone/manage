define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    require('zui');
    require('lib/zui.datagrid.min');
    require('chosen');
    var siteCfg = require('config/config');
    var siteFun = require('config/function');

    var pub = {}

    pub.init = function () {
        ajax_get_game_contrast_list();
        ajax_get_game_contrast();
        // show_game_tooltip();
    }

    var ajax_get_game_contrast_list = function () {
        get_game_contrast_list(table_render);
    }

    /*獲取記錄列表 */
    var get_game_contrast_list = function (callbackFun) {
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GET_RECORD,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.data == undefined || returnData.data == '') {
                    siteFun.show_error_tip('沒有資料');
                    return false;
                } else {
                    if ($.isFunction(callbackFun)) {
                        callbackFun(returnData);
                    }
                }
            }
        })
    }
    /*獲取記錄列表 */

    /*表格渲染 */
    var table_render = function (returnData) {
        var data = returnData.data;
        var html = "<option value=''></option>";
        for (var i = 0; i < data.length; i++) {
            html += '<option value=' + data[i].Id + '>' + data[i].CreateTime + '</option>';
        }
        $('select.chosen-select').html(html);
        $('select.chosen-select').chosen({
            lang: 'zh_cn',
            no_results_text: '沒有找到',
            disable_search_threshold: 10,
            search_contains: true
        });
        var page = parseInt((document.body.offsetHeight - 142) / 38);
        $('#addGameModal').datagrid({
            dataSource: {
                cols: [{
                        name: 'addGameId',
                        label: '遊戲ID',
                        width: 0.2
                    },
                    {
                        name: 'addGameName',
                        label: '遊戲名稱',
                        className: 'gameName',
                        width: 0.2
                    },
                    {
                        name: 'addGameServer',
                        label: '伺服器',
                        html: true
                    }
                ],
                array: []
            },
            states: {
                pager: {
                    page: 1,
                    recPerPage: 15
                }
            },
            sortable: true,
            height: 'page'
        });
        $('#reduceGameModal').datagrid({
            dataSource: {
                cols: [{
                        name: 'reduceGameId',
                        label: '遊戲ID',
                        width: 0.03
                    },
                    {
                        name: 'reduceGameName',
                        label: '遊戲名稱',
                        className: 'gameName',
                        width: 0.03
                    },
                    {
                        name: 'reduceGameServer',
                        label: '伺服器',
                        html: true
                    }
                ],
                array: []
            },
            states: {
                pager: {
                    page: 1,
                    recPerPage: 15
                }
            },
            sortable: true,
            height: 'page'
        });
        $('#changeGameModal').datagrid({
            dataSource: {
                cols: [{
                        name: 'changeGameName',
                        label: '遊戲名稱',
                        className: 'gameName',
                        width: 0.03
                    },
                    {
                        name: 'addServerData',
                        label: '增加的伺服器',
                        html: true
                    },
                    {
                        name: 'reduceServerData',
                        label: '減少的伺服器',
                        html: true
                    }
                ],
                array: []
            },
            states: {
                pager: {
                    page: 1,
                    recPerPage: 15
                }
            },
            sortable: true,
            height: 'page'
        });
    }

    /*表格渲染 */
    var ajax_get_game_contrast = function () {
        $(document).on('click', 'a[href="/8591/contrast/game_contrast"]', function () {
            var newId = $('#newSelect').val();
            var oldId = $('#oldSelect').val();
            get_game_contrast(newId, oldId, game_contrast_modal, siteFun.show_error_tip)
        })
    }

    /*遊戲對比 */
    var get_game_contrast = function (newId, oldId, callbackFun, errorFunction) {
        var getData = {
            newId: newId,
            oldId: oldId
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GAME_CONTRAST,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.status === true) {
                    if ($.isFunction(callbackFun)) {
                        callbackFun(returnData);
                    }
                } else {
                    if ($.isFunction(errorFunction)) {
                        errorFunction(returnData.info);
                    }
                }

            }
        })
    }
    /*遊戲對比 */

    /*對比結果 */
    var game_contrast_modal = function (returnData) {
        game_contrast_data(returnData);
    }
    /*對比結果 */

    var game_contrast_data = function (returnData) {
        var data = returnData.data;
        var addGameData = data.addGameData;
        var reduceGameData = data.reduceGameData;
        var changeGameData = data.changeGameData;
        var addList = [];
        var reduceList = [];
        var changeList = [];
        for (var i = 0; i < addGameData.length; i++) {
            var span = subMenu(addGameData[i].serverData || []);
            var addRow = {
                addGameId: addGameData[i].GameId,
                addGameName: addGameData[i].GameName,
                // addGameServer: addGameData[i].serverData.toString()
                addGameServer: span
            };
            addList.push(addRow);
        }
        for (var i = 0; i < reduceGameData.length; i++) {
            var span = subMenu(reduceGameData[i].serverData || []);
            var reduceRow = {
                reduceGameId: reduceGameData[i].GameId,
                reduceGameName: reduceGameData[i].GameName,
                // reduceGameServer: reduceGameData[i].serverData.toString()
                reduceGameServer: span
            };
            reduceList.push(reduceRow);
        }
        for (var i = 0; i < changeGameData.length; i++) {
            var addSpan = subSelect(changeGameData[i].addServerData || []);
            var reduceSpan = subSelect(changeGameData[i].reduceServerData || []);
            var changeRow = {
                changeGameName: changeGameData[i].gameName,
                // addServerData: changeGameData[i].addServerData.toString(),
                // reduceServerData: changeGameData[i].reduceServerData.toString()
                addServerData: addSpan,
                reduceServerData: reduceSpan
            };
            changeList.push(changeRow);
        }
        change_source('addGameModal', addList);
        change_source('reduceGameModal', reduceList);
        change_source('changeGameModal', changeList);

        $('.datagrid-cell-cell span:odd').addClass('like_color');
    }

    /*遊戲名稱提示 */
    var show_game_tooltip = function () {
        $(document).on('mouseover', '.gameName', function () {
            $(this).tooltip('destroy');
            var html = $(this).html();
            $('.gameName').tooltip({
                container: '#triggerModal',
                placement: 'top',
                html: html
            });
            $(this).tooltip('show', html);
        })
    }
    /*遊戲名稱提示 */

    var subSelect = function (data) {
        var span = "";
        for (var x in data) {
            span += '<span>' + data[x] + '  ' + '</span>';
        }
        return span;
    }

    var subMenu = function (data) {
        var span = "";
        for (var i = 0; i < data.length; i++) {
            span += '<span>' + data[i] + '  ' + '</span>';
        }
        return span;
    }

    var change_source = function (id, gridList) {
        var myDataGrid = $('#' + id).data('zui.datagrid');
        myDataGrid.setDataSource(gridList);
        myDataGrid.render();
        $('#' + id).on('onRender', function (event) {
            $('.datagrid-cell span').css('white-space', 'wrap');
            $('.datagrid-row-cell').removeClass('active');
            $('.datagrid-cell-cell span:odd').addClass('like_color');
        });
    }

    module.exports = pub;
})