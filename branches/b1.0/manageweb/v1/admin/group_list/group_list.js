define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    require('zui');
    require('grids');
    require('board');
    var siteCfg = require('config/config');
    var siteFun = require('config/function');
    var cookie = require('config/cookie');

    var pub = {}

    pub.init = function () {
        // ajax_get_group_list();
        btn_group_add_model();
        ajax_post_group_add();
        ajax_get_group_info();
        ajax_post_group_edit();
        ajax_get_group_delete();
        ajax_get_group_delete_all();
        ajax_get_jq_getdata();
        ajax_get_group_authority_edit();
        get_all_list();
    }

    var ajax_get_group_list = function () {
        get_group_list(table_render);
    }

    var get_all_list = function (rows) {
        var rows = rows || 0;
        var getData = {
            page: 1,
            rows: rows
        };
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GROUP_LIST,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.records > rows) {
                    rows += 100;
                    get_all_list(rows);
                } else {
                    table_render(returnData);
                }
            }
        })
    }

    /*獲取管理員組列表 */
    var get_group_list = function (callbackFun) {
        var getData = {
            page: 1,
            rows: 1000
        };
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GROUP_LIST,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.rows == undefined || returnData.rows == '') {
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
    /*獲取管理員組列表 */

    /*重新渲染表格 */
    var ajax_render_table = function () {
        var gridList = [];
        var getData = {
            page: 1,
            rows: 1000
        };
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GROUP_LIST,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                var data = returnData.rows;
                for (var i = 0; i < data.length; i++) {
                    var status = data[i].cell.Status == 1 ? '啟用' : '禁用';
                    var rows = {
                        GroupName: data[i].cell.GroupName,
                        Status: status,
                        GroupInfo: data[i].cell.GroupInfo,
                        option: '<div class="btn-group">' +
                            '<button data-id=' + data[i].cell.Id + ' href="/admin/group_edit" class="power btn edit">編輯</button>' +
                            '<button data-id=' + data[i].cell.Id + ' href="/admin/group_delete" class="power btn del">刪除</button>' +
                            '<button data-id=' + data[i].cell.Id + ' href="/admin/group_authority_edit" class="power btn auth">許可權</button>' +
                            '</div>'
                    }
                    gridList.push(rows);
                }
            }
        })
        var page = parseInt($('li[class="active"] .pager-item').html());
        var myDataGrid = $('#datagridPageExample').data('zui.datagrid');
        myDataGrid.setDataSource(gridList);
        myDataGrid.render();
        $('#datagridPageExample').on('onRender', function (event) {
            myDataGrid.setPager(page || 1);
        });
    }
    /*重新渲染表格 */

    /*渲染表格 */
    var table_render = function (returnData) {
        var data = returnData.rows || [];
        var gridList = [];
        for (var i = 0; i < data.length; i++) {
            var status = data[i].cell.Status == 1 ? '啟用' : '禁用';
            var rows = {
                GroupName: data[i].cell.GroupName,
                Status: status,
                GroupInfo: data[i].cell.GroupInfo,
                option: '<div class="btn-group">' +
                    '<button data-id=' + data[i].cell.Id + ' href="/admin/group_edit" class="power btn edit">編輯</button>' +
                    '<button data-id=' + data[i].cell.Id + ' href="/admin/group_delete" class="power btn del">刪除</button>' +
                    '<button data-id=' + data[i].cell.Id + ' href="/admin/group_authority_edit" class="power btn auth">許可權</button>' +
                    '</div>'
            }
            gridList.push(rows);
        }
        $('#datagridPageExample').datagrid({
            dataSource: {
                cols: [{
                        name: 'GroupName',
                        label: '管理員組名稱'
                    },
                    {
                        name: 'Status',
                        label: '狀態'
                    },
                    {
                        name: 'GroupInfo',
                        label: '組描述'
                    },
                    {
                        name: 'option',
                        label: '操作',
                        html: true
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
                    label: '<input type="checkbox" id="checkAll">',
                    html: true,
                },
                C0: {
                    label: '<input type="checkbox" class="che">',
                    html: true,
                }
            },
            sortable: true,
            height: 'page'
        })
    }
    /*渲染表格 */

    var btn_group_add_model = function () {
        $(document).on('click', '[href="admin/group_add"]', function (e) {
            group_add_model();
        })
    }

    /*新增組模態框 */
    var group_add_model = function () {
        var html = '<div class="input-control has-label-left-lg">' +
            '<input id="groupNameInput" type="text" class="form-control" placeholder="">' +
            '<label for="groupNameInput" class="input-control-label-left text-right">管理員組名稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="groupInfoInput" type="text" class="form-control" placeholder="">' +
            '<label for="groupinfoInput" class="input-control-label-left text-right">組描述</label>' +
            '</div>' +
            '<div class="switch">' +
            '<input id="groupCheckInput" type="checkbox">' +
            '<label>啟用</label>' +
            '</div>' +
            '<button id="groupAddButton" class="btn btn-block btn-primary disabled up" type="button">新增</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '新增管理員組',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*新增組模態框 */

    var ajax_post_group_add = function () {
        $(document).on('click', '#groupAddButton', function () {
            $('#groupAddButton').addClass('disabled');
            $(document).off('click', '#groupAddButton')
            post_group_add(siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*新增組 */
    var post_group_add = function (callbackFun, errorFunction) {
        var groupName = $('#groupNameInput').val();
        var groupInfo = $('#groupInfoInput').val();
        var status = $('#groupCheckInput').prop('checked') == true ? 1 : 0;
        var postData = {
            groupName: groupName,
            groupInfo: groupInfo,
            status: status
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.GROUP_ADD,
            dataType: 'json',
            data: postData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.status === true) {
                    if ($.isFunction(callbackFun)) {
                        callbackFun(returnData.info);
                    }
                    ajax_render_table();
                } else {
                    if ($.isFunction(errorFunction)) {
                        errorFunction(returnData.info);
                    }
                }
                $('#groupAddButton').removeClass('disabled');
                $(document).on('click', '#groupAddButton', function () {
                    $('#groupAddButton').addClass('disabled');
                    $(document).off('click', '#groupAddButton')
                    post_group_add(siteFun.show_success_tip, siteFun.show_error_tip);
                })
            }
        })
    }
    /*新增組 */

    var ajax_get_group_info = function () {
        $(document).on('click', '.edit', function (e) {
            e.stopPropagation()
            var groupId = $(this).attr('data-id');
            get_group_info(groupId, group_edit_model, siteFun.show_error_tip);
        })
    }

    /*獲取組詳情 */
    var get_group_info = function (groupId, callbackFun, errorFunction) {
        var getData = {
            groupId: groupId
        };
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GET_GROUP_INFO,
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
                    if ($.errorFunction(callbackFun)) {
                        errorFunction(returnData.info);
                    }
                }
            }
        })
    }
    /*獲取組詳情 */

    /*編輯組模態框 */
    var group_edit_model = function (returnData) {
        var data = returnData.data;
        var checkStatus = data.Status == 1 ? 'checked' : '';
        var html = '<div class="input-control has-label-left-lg">' +
            '<input id="groupNameInput" type="text" class="form-control" value=' + data.GroupName + ' placeholder="">' +
            '<label for="groupNameInput" class="input-control-label-left text-right">管理員組名稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="groupInfoInput" type="text" class="form-control" value=' + data.GroupInfo + ' placeholder="">' +
            '<label for="groupinfoInput" class="input-control-label-left text-right">組描述</label>' +
            '</div>' +
            '<div class="switch">' +
            '<input id="groupCheckInput" type="checkbox" ' + checkStatus + '>' +
            '<label>啟用</label>' +
            '</div>' +
            '<button id="groupEditButton" data-id=' + data.Id + ' class="btn btn-block btn-primary up" type="button">儲存</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '編輯管理員組',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*編輯組模態框 */

    var ajax_post_group_edit = function () {
        $(document).on('click', '#groupEditButton', function () {
            var groupId = $(this).attr('data-id');
            post_group_edit(groupId, siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*編輯組 */
    var post_group_edit = function (groupId, callbackFun, errorFunction) {
        var groupName = $('#groupNameInput').val();
        var groupInfo = $('#groupInfoInput').val();
        var status = $('#groupCheckInput').prop('checked') == true ? 1 : 0;
        var postData = {
            groupId: groupId,
            groupName: groupName,
            groupInfo: groupInfo,
            status: status
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.GROUP_EDIT,
            dataType: 'json',
            data: postData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.status === true) {
                    if ($.isFunction(callbackFun)) {
                        callbackFun(returnData.info);
                    }
                    ajax_render_table();
                } else {
                    if ($.isFunction(errorFunction)) {
                        errorFunction(returnData.info);
                    }
                }
            }
        })
    }
    /*編輯組 */

    var ajax_get_group_delete = function () {
        $(document).on('click', '.del', function (e) {
            e.stopPropagation()
            var idString = $(this).attr('data-id');
            group_delete_modal(idString);
        })
        confirm_delete_group();
    }

    var confirm_delete_group = function () {
        $(document).on('click', '#confirm', function () {
            var idString = $(this).attr('data-id');
            get_group_delete(idString, siteFun.show_success_tip, siteFun.show_error_tip);
        })
        $(document).on('click', '#cancel', function () {

        })
    }

    /*刪除組提示 */
    var group_delete_modal = function (idString) {
        var html = '<h4>確認要刪除嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-id=' + idString + ' data-dismiss="modal" id="confirm" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: '300px',
            height: 'auto',
            className: 'in_auto',
            title: '刪除管理員組',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*刪除組提示 */

    /*刪除組 */
    var get_group_delete = function (idString, callbackFun, errorFunction) {
        var getData = {
            idString: idString
        };
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GROUP_DELETE,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.status === true) {
                    if ($.isFunction(callbackFun)) {
                        callbackFun(returnData.info);
                    }
                    ajax_render_table();
                } else {
                    if ($.isFunction(errorFunction)) {
                        errorFunction(returnData.info);
                    }
                }
            }
        })
    }
    /*刪除組 */

    /*多選刪除組 */
    var ajax_get_group_delete_all = function () {
        $(document).on('click', 'a[href="admin/group_delete"]', function (e) {
            group_delete_all_modal();
        })
        $(document).on('click', '#continue', function () {
            var sss = $(".che:checked").parents('.datagrid-row').find('.del');
            var idString = [];
            for (var i = 0; i < sss.length; i++) {
                idString.push(parseInt(sss[i].getAttribute('data-id')));
            }
            if (idString.length === 0) {
                siteFun.show_error_tip('請選擇要刪除的組');
                return false;
            }
            get_group_delete(idString.toString(), siteFun.show_success_tip, siteFun.show_error_tip)
        })
    }
    /*多選刪除組 */

    /*多選刪除組提示 */
    var group_delete_all_modal = function () {
        var html = '<h4>確認要刪除所選的管理組嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-dismiss="modal" id="continue" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: '300px',
            height: 'auto',
            className: 'in_auto',
            title: '刪除管理員組',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*多選刪除組提示 */

    var ajax_get_jq_getdata = function () {
        $(document).on('click', '.auth', function (e) {
            e.stopPropagation();
            var groupId = $(this).attr('data-id');
            get_jq_getdata(groupId, jq_getdata_model, siteFun.show_error_tip);
        })
    }

    /*獲取組許可權 */
    var get_jq_getdata = function (groupId, callbackFun, errorFunction) {
        var getData = {
            groupId: groupId
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.JQ_GET_DATA,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.status === true) {
                    if ($.isFunction(callbackFun)) {
                        callbackFun(returnData, groupId);
                    }
                } else {
                    if ($.isFunction(errorFunction)) {
                        errorFunction(returnData.info);
                    }
                }
            }
        })
    }
    /*獲取組許可權 */

    /*組許可權模態框 */
    var jq_getdata_model = function (returnData, groupId) {
        var html = '<div class="boards" id="myBoards" style="height:500px;overflow: scroll;">' +
            '<div class="board panel">' +
            '<div class="panel-heading">' +
            '<strong>已啟用</strong>' +
            '</div>' +
            '<div class="panel-body">' +
            '<div class="board-list" id="open">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="board panel">' +
            '<div class="panel-heading">' +
            '<strong>未啟用</strong>' +
            '</div>' +
            '<div class="panel-body">' +
            '<div class="board-list" id="close">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<button id="editButton" data-id=' + groupId + ' class="btn btn-primary btn-block" type="button">提交</button>'
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '編輯管理員組許可權',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
        jq_getdata_data(returnData);
    }
    /*組許可權模態框 */

    /*渲染組許可權面板 */
    var jq_getdata_data = function (returnData) {
        var data = returnData.data;
        var groupAllPermData = data.groupAllPerm;
        var groupPermData = data.groupPerm;
        var groupAllPermList = [];
        var groupPermList = [];
        var hasList = [];
        var allList = [];
        for (var x in groupAllPermData) {
            groupAllPermList.push(groupAllPermData[x].action);
        }
        for (var i = 0; i < groupAllPermList.length; i++) {
            for (var j = 0; j < groupAllPermList[i].length; j++) {
                var has = {
                    Id: groupAllPermList[i][j].Id,
                    ActionName: groupAllPermList[i][j].ActionName,
                }
                hasList.push(has);
            }
        }
        for (var x in groupPermData) {
            groupPermList.push(groupPermData[x].action);
        }
        for (var i = 0; i < groupPermList.length; i++) {
            for (var j = 0; j < groupPermList[i].length; j++) {
                var all = {
                    Id: groupPermList[i][j].Id,
                    ActionName: groupPermList[i][j].ActionName,
                }
                allList.push(all);
            }
        }
        var closeList = getNoPerm(allList, hasList);
        var closeHtml = "";
        for (var i = 0; i < closeList.length; i++) {
            closeHtml += '<div data-id=' + closeList[i].Id + ' class="board-item">' + closeList[i].ActionName + '</div>'
        }
        $('#close').html(closeHtml);
        var openHtml = "";
        for (var i = 0; i < allList.length; i++) {
            openHtml += '<div data-id=' + allList[i].Id + ' class="board-item">' + allList[i].ActionName + '</div>'
        }
        $('#open').html(openHtml);
        $('#myBoards').boards({
            drop: function (e) {

            },
            lang: 'zh_tw'
        });
        $(document).on('click', '#open .board-item:not(".board-item-shadow"):not(".board-item-empty")', function () {
            $("#close").append($(this));
        });
        $(document).on('click', '#close .board-item:not(".board-item-shadow"):not(".board-item-empty")', function () {
            $("#open").append($(this));
        });
    }
    /*渲染組許可權面板 */

    /*資料對比 */
    var getNoPerm = function (a, b) {
        a.sort(function (h, k) {
            var s = h.Id;
            var ss = k.Id;
            return s - ss;
        })
        b.sort(function (h, k) {
            var s = h.Id;
            var ss = k.Id;
            return s - ss;
        })
        var result = [];
        for (var i = 0; i < b.length; i++) {
            var obj = b[i];
            var num = obj.Id;
            var flag = false;
            for (var j = 0; j < a.length; j++) {
                var aj = a[j];
                var n = aj.Id;
                if (n == num) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                result.push(obj);
            }
        }
        return result;
    }
    /*資料對比 */

    var ajax_get_group_authority_edit = function () {
        $(document).on('click', '#editButton', function () {
            var groupId = $(this).attr('data-id');
            var openList = $('#open .board-item:not(".board-item-shadow"):not(".board-item-empty")');
            var idString = [];
            for (var i = 0; i < openList.length; i++) {
                idString.push(openList[i].getAttribute('data-id'));
            }
            get_group_authority_edit(groupId, idString.toString(), siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*編輯組許可權 */
    var get_group_authority_edit = function (groupId, idString, callbackFun, errorFunction) {
        var getData = {
            groupId: groupId,
            idString: idString
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GROUP_AUTHORITY_EIDT,
            dataType: 'json',
            data: getData,
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
    /*編輯組許可權 */

    module.exports = pub;
})