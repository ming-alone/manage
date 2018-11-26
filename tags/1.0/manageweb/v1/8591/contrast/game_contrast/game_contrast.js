define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    require('zui');
    require('grids');
    require('chosen');
    var siteCfg = require('config/config');
    var siteFun = require('config/function');

    var pub = {}

    pub.init = function () {
        ajax_get_game_contrast_list();
        ajax_get_game_contrast();
        show_game_tooltip();
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
        var gridList = [];
        for (var i = 0; i < data.length; i++) {
            var rows = {
                Id: data[i].Id,
                CreateTime: data[i].CreateTime
            }
            gridList.push(rows);
        }
        $('#datagridPageExample').datagrid({
            dataSource: {
                cols: [{
                        name: 'Id',
                        label: '記錄id'
                    },
                    {
                        name: 'CreateTime',
                        label: '建立時間'
                    }
                ],
                array: gridList
            },
            states: {
                pager: {
                    page: 1,
                    recPerPage: 10
                }
            },
            configs: {
                R0C0: {
                    label: '#'
                },
                C0: {
                    label: '<input type="checkbox" class="che">',
                    html: true,
                }
            },
            sortable: true,
            height: 'page'
        });
    }
    /*表格渲染 */

    var ajax_get_game_contrast = function () {
        $(document).on('click', '.che', function () {
            if ($('.che:checked').length >= 2) {
                $('.che:not(:checked)').attr('disabled', true);
            } else {
                $('.che:not(:checked)').attr('disabled', false);
            }
        })
        $(document).on('click', 'a[href="8591/contrast/game_contrast"]', function () {
            var idList = $('.che:checked').parents('.datagrid-row').find('[data-col="1"]');
            var list = [];
            for (var i = 0; i < idList.length; i++) {
                var date = idList[i].innerHTML;
                list.push(date);
            }
            list.sort(function (a, b) {
                return a - b
            });
            var newId = list[1];
            var oldId = list[0];
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
        var html = '<ul class="nav nav-tabs">' +
            '<li class="active"><a data-tab href="#tabContent1">增加的遊戲資訊</a></li>' +
            '<li><a data-tab href="#tabContent2">減少的遊戲資訊</a></li>' +
            '<li><a data-tab href="#tabContent3">改變的遊戲資訊</a></li>' +
            '</ul>' +
            '<div class="tab-content">' +
            '<div class="tab-pane active" id="tabContent1">' +
            '<div id="addGameModal" class="datagrid">' +
            '<div class="input-control search-box search-box-circle has-icon-left has-icon-right" id="addGameSearchbox" style="margin-bottom: 10px; max-width: 300px">' +
            '<input id="addGameSearch" type="search" class="form-control search-input" placeholder="搜尋">' +
            '<label for="addGameSearch" class="input-control-icon-left search-icon"><i class="icon icon-search"></i></label>' +
            '<a href="#" class="input-control-icon-right search-clear-btn"><i class="icon icon-remove"></i></a>' +
            '</div>' +
            '<div class="datagrid-container"></div>' +
            '<div class="pager block"></div>' +
            '</div>' +
            '</div>' +
            '<div class="tab-pane" id="tabContent2">' +
            '<div id="reduceGameModal" class="datagrid">' +
            '<div class="input-control search-box search-box-circle has-icon-left has-icon-right" id="reduceGameSearchbox" style="margin-bottom: 10px; max-width: 300px">' +
            '<input id="reduceGameSearch" type="search" class="form-control search-input" placeholder="搜尋">' +
            '<label for="reduceGameSearch" class="input-control-icon-left search-icon"><i class="icon icon-search"></i></label>' +
            '<a href="#" class="input-control-icon-right search-clear-btn"><i class="icon icon-remove"></i></a>' +
            '</div>' +
            '<div class="datagrid-container"></div>' +
            '<div class="pager block"></div>' +
            '</div>' +
            '</div>' +
            '<div class="tab-pane" id="tabContent3">' +
            '<div id="changeGameModal" class="datagrid">' +
            '<div class="input-control search-box search-box-circle has-icon-left has-icon-right" id="changeGameSearchbox" style="margin-bottom: 10px; max-width: 300px">' +
            '<input id="changeGameSearch" type="search" class="form-control search-input" placeholder="搜尋">' +
            '<label for="changeGameSearch" class="input-control-icon-left search-icon"><i class="icon icon-search"></i></label>' +
            '<a href="#" class="input-control-icon-right search-clear-btn"><i class="icon icon-remove"></i></a>' +
            '</div>' +
            '<div class="datagrid-container"></div>' +
            '<div class="pager block"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '對比結果',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
        game_contrast_data(returnData);
    }
    /*對比結果 */

    var game_contrast_data = function (returnData) {
        var data = returnData.data;
        console.log(data);
        var addGameData = data.addGameData;
        var reduceGameData = data.reduceGameData;
        var changeGameData = data.changeGameData;
        var addList = [];
        var reduceList = [];
        var changeList = [];
        for (var i = 0; i < addGameData.length; i++) {
            var option = subMenu(addGameData[i].serverData || []);
            var addRow = {
                addGameId: addGameData[i].GameId,
                addGameName: addGameData[i].GameName,
                addGameServer: '<select class="chosen-select form-control right_position">' +
                    option +
                    '</select>'
            };
            addList.push(addRow);
        }
        for (var i = 0; i < reduceGameData.length; i++) {
            var option = subMenu(reduceGameData[i].serverData || []);
            var reduceRow = {
                reduceGameId: reduceGameData[i].GameId,
                reduceGameName: reduceGameData[i].GameName,
                reduceGameServer: '<select class="chosen-select form-control right_position">' +
                    option +
                    '</select>'
            };
            reduceList.push(reduceRow);
        }
        for (var i = 0; i < changeGameData.length; i++) {
            var addOption = subSelect(changeGameData[i].addServerData || []);
            var reduceOption = subSelect(changeGameData[i].reduceServerData || []);
            var changeRow = {
                changeGameName: changeGameData[i].gameName,
                addServerData: '<select class="chosen-select form-control right_position">' +
                    addOption +
                    '</select>',
                reduceServerData: '<select class="chosen-select form-control right_position">' +
                    reduceOption +
                    '</select>'
            };
            changeList.push(changeRow);
        }
        $('#addGameModal').datagrid({
            dataSource: {
                cols: [{
                        name: 'addGameId',
                        label: '遊戲ID'
                    },
                    {
                        name: 'addGameName',
                        label: '遊戲名稱',
                        className: 'gameName'
                    },
                    {
                        name: 'addGameServer',
                        label: '伺服器',
                        html: true
                    }
                ],
                array: addList
            },
            states: {
                pager: {
                    page: 1,
                    recPerPage: 10
                }
            },
            sortable: true,
            height: 'page'
        });
        $('#reduceGameModal').datagrid({
            dataSource: {
                cols: [{
                        name: 'reduceGameId',
                        label: '遊戲ID'
                    },
                    {
                        name: 'reduceGameName',
                        label: '遊戲名稱',
                        className: 'gameName'
                    },
                    {
                        name: 'reduceGameServer',
                        label: '伺服器',
                        html: true
                    }
                ],
                array: reduceList
            },
            states: {
                pager: {
                    page: 1,
                    recPerPage: 10
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
                        className: 'gameName'
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
                array: changeList
            },
            states: {
                pager: {
                    page: 1,
                    recPerPage: 10
                }
            },
            sortable: true,
            height: 'page'
        });
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
        var option = "";
        for (var x in data) {
            option += '<option value =' + data[x] + '>' + data[x] + '</option>';
        }
        return option;
    }

    var subMenu = function (data) {
        var option = "";
        for (var i = 0; i < data.length; i++) {
            option += '<option value =' + data[i] + '>' + data[i] + '</option>'
        }
        return option;
    }

    module.exports = pub;
})