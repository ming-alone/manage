define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    require('zui');
    require('grids');
    var siteCfg = require('config/config');
    var siteFun = require('config/function');

    var pub = {}

    pub.init = function () {
        ajax_get_admin_list();
        ajax_get_group_list();
        ajax_post_admin_add();
        ajax_get_admin_info();
        ajax_post_admin_edit();
        ajax_get_admin_delete();
        ajax_get_admin_bind();
        ajax_get_admin_delete_all();
    }

    var ajax_get_admin_list = function () {
        get_admin_list(table_render, siteFun.show_error_tip);
    }

    /*獲取管理員列表 */
    var get_admin_list = function (callbackFun, errorFunction) {
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.ADMIN_LIST,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.rows && returnData.rows != "") {
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
    /*獲取管理員列表 */

    /*重新渲染表格 */
    var ajax_render_table = function () {
        var gridList = [];
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.ADMIN_LIST,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                var data = returnData.rows;
                for (var i = 0; i < data.length; i++) {
                    var status = data[i].cell.Status == 1 ? '正常' : '鎖定';
                    var btnValue = data[i].cell.WxUserId == '' || data[i].cell.WxUserId == null ? '繫結' : '解綁';
                    var btnClass = data[i].cell.WxUserId == '' || data[i].cell.WxUserId == null ? 'bind' : 'unbind'
                    var rows = {
                        GroupName: data[i].cell.GroupName,
                        WxUserId: data[i].cell.WxUserId,
                        Status: status,
                        UserName: data[i].cell.UserName,
                        option: '<div class="btn-group">' +
                            '<button data-id=' + data[i].cell.UserId + ' class="btn edit">編輯</button>' +
                            '<button data-id=' + data[i].cell.UserId + ' class="btn del">刪除</button>' +
                            '<button data-id=' + data[i].cell.UserId + ' class="btn ' + btnClass + '">' + btnValue + '</button>' +
                            '</div>'
                    }
                    gridList.push(rows);
                }
            }
        })
        var page = parseInt($('#datagridPageExample li[class="active"] .pager-item').html());
        var myDataGrid = $('#datagridPageExample').data('zui.datagrid');
        myDataGrid.setDataSource(gridList);
        myDataGrid.render();
        $('#datagridPageExample').on('onRender', function (event) {
            myDataGrid.setPager(page);
        });
    }
    /*重新渲染表格 */

    /*表格渲染 */
    var table_render = function (returnData) {
        var data = returnData.rows;
        var gridList = [];
        for (var i = 0; i < data.length; i++) {
            var status = data[i].cell.Status == 1 ? '正常' : '鎖定';
            var btnValue = data[i].cell.WxUserId == '' || data[i].cell.WxUserId == null ? '繫結' : '解绑';
            var btnClass = data[i].cell.WxUserId == '' || data[i].cell.WxUserId == null ? 'bind' : 'unbind'
            var rows = {
                GroupName: data[i].cell.GroupName,
                UserName: data[i].cell.UserName,
                WxUserId: data[i].cell.WxUserId,
                Status: status,
                option: '<div class="btn-group">' +
                    '<button data-id=' + data[i].cell.UserId + ' class="btn edit">編輯</button>' +
                    '<button data-id=' + data[i].cell.UserId + ' class="btn del">刪除</button>' +
                    '<button data-id=' + data[i].cell.UserId + ' class="btn ' + btnClass + '">' + btnValue + '</button>' +
                    '</div>'
            }
            gridList.push(rows);
        }
        $('#datagridPageExample').datagrid({
            dataSource: {
                cols: [{
                        name: 'GroupName',
                        label: '組名'
                    },
                    {
                        name: 'UserName',
                        label: '使用者名稱'
                    },
                    {
                        name: 'WxUserId',
                        label: '微信ID'
                    },
                    {
                        name: 'Status',
                        label: '狀態'
                    },
                    {
                        name: 'option',
                        label: '操作',
                        html: true,
                    }
                ],
                array: gridList
            },
            states: {
                pager: {
                    page: returnData.page,
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
        });
    }
    /*表格渲染 */

    var ajax_get_group_list = function () {
        $(document).on('click', '[href="admin/admin_add"]', function () {
            get_group_list(admin_add_modal, siteFun.show_error_tip);
        })
    }

    /*獲取組列表 */
    var get_group_list = function (callbackFun, errorFunction) {
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GET_GROUP_LIST,
            dataType: 'json',
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
    /*獲取組列表 */

    /*新增模態框 */
    var admin_add_modal = function (returnData) {
        var html = '<div id="datagridModel" class="datagrid">' +
            '<div class="input-control search-box search-box-circle has-icon-left has-icon-right" id="searchboxExample" style="margin-bottom: 10px; max-width: 300px">' +
            '<input id="inputSearchExample" type="search" class="form-control search-input" placeholder="搜尋">' +
            '<label for="inputSearchExample" class="input-control-icon-left search-icon"><i class="icon icon-search"></i></label>' +
            '<a href="#" class="input-control-icon-right search-clear-btn"><i class="icon icon-remove"></i></a>' +
            '</div>' +
            '<div class="datagrid-container"></div>' +
            '<div class="pager"></div>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="adminNameInput" type="text" class="form-control" placeholder="">' +
            '<label for="adminNameInput" class="input-control-label-left text-right">管理員姓名</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="groupIdInput" type="text" class="form-control" placeholder="">' +
            '<label for="groupIdInput" class="input-control-label-left text-right">組ID</label>' +
            '</div>' +
            '<div class="switch">' +
            '<input id="adminCheckInput" type="checkbox">' +
            '<label>鎖定</label>' +
            '</div>' +
            '<button id="adminAddButton" class="btn btn-block btn-primary disabled up" type="button">新增</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '新增管理員',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
        admin_table_data(returnData);
    }
    /*新增模態框 */

    /*渲染組列表 */
    var admin_table_data = function (returnData) {
        var data = returnData.data;
        var gridList = [];
        for (var i = 0; i < data.length; i++) {
            var rows = {
                Id: data[i].Id,
                GroupName: data[i].GroupName,
                GroupInfo: data[i].GroupInfo
            }
            gridList.push(rows);
        }
        $('#datagridModel').datagrid({
            dataSource: {
                cols: [{
                        name: 'Id',
                        label: '管理員組ID'
                    },
                    {
                        name: 'GroupName',
                        label: '管理員組名稱'
                    },
                    {
                        name: 'GroupInfo',
                        label: '組描述'
                    }
                ],
                array: gridList
            },
            states: {
                pager: {
                    page: 1,
                    recPerPage: 5
                }
            },
            showRowIndex: false,
            sortable: true,
            height: 'page'
        })
    }
    /*渲染組列表 */

    var ajax_post_admin_add = function () {
        $(document).on('click', '#adminAddButton', function () {
            post_admin_add(siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*新增管理員 */
    var post_admin_add = function (callbackFun, errorFunction) {
        var userName = $('#adminNameInput').val();
        var groupId = $('#groupIdInput').val();
        var status = $('#adminCheckInput').prop('checked') == true ? 0 : 1;
        var postData = {
            userName: userName,
            groupId: groupId,
            status: status
        }
        $('#adminCheckInput').addClass('disabled');
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.ADMIN_ADD,
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
                $('#adminCheckInput').removeClass('disabled');
            }
        })
    }
    /*新增管理員 */

    var ajax_get_admin_info = function () {
        $(document).on('click', '.edit', function (e) {
            e.stopPropagation();
            var adminId = $(this).attr('data-id');
            get_admin_info(adminId, admin_edit_modal, siteFun.show_error_tip)
        })
    }

    /*獲取管理員詳情 */
    var get_admin_info = function (adminId, callbackFun, errorFunction) {
        var getData = {
            adminId: adminId
        };
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GET_ADMIN_INFO,
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
                    get_group_list(admin_table_data);
                } else {
                    if ($.isFunction(errorFunction)) {
                        errorFunction(returnData.info);
                    }
                }
            }
        })
    }
    /*獲取管理員詳情 */

    /*編輯管理員模態框 */
    var admin_edit_modal = function (returnData) {
        var data = returnData.data;
        var checkStatus = data.Status == 0 ? 'checked' : '';
        var html = '<div id="datagridModel" class="datagrid">' +
            '<div class="input-control search-box search-box-circle has-icon-left has-icon-right" id="searchboxExample" style="margin-bottom: 10px; max-width: 300px">' +
            '<input id="inputSearchExample" type="search" class="form-control search-input" placeholder="搜尋">' +
            '<label for="inputSearchExample" class="input-control-icon-left search-icon"><i class="icon icon-search"></i></label>' +
            '<a href="#" class="input-control-icon-right search-clear-btn"><i class="icon icon-remove"></i></a>' +
            '</div>' +
            '<div class="datagrid-container"></div>' +
            '<div class="pager"></div>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="adminNameInput" type="text" class="form-control" value=' + data.UserName + ' placeholder="">' +
            '<label for="adminNameInput" class="input-control-label-left text-right">管理員姓名</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="groupIdInput" type="text" class="form-control" value=' + data.GroupId + ' placeholder="">' +
            '<label for="groupIdInput" class="input-control-label-left text-right">組ID</label>' +
            '</div>' +
            '<div class="switch">' +
            '<input id="groupCheckInput" type="checkbox" ' + checkStatus + '>' +
            '<label>鎖定</label>' +
            '</div>' +
            '<button id="adminEditButton" data-id=' + data.UserId + ' class="btn btn-block btn-primary up" type="button">儲存</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '編輯管理員',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*編輯管理員模態框 */

    var ajax_post_admin_edit = function () {
        $(document).on('click', '#adminEditButton', function () {
            var adminId = $(this).attr('data-id');
            post_admin_edit(adminId, siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*編輯管理員 */
    var post_admin_edit = function (adminId, callbackFun, errorFunction) {
        var userName = $('#adminNameInput').val();
        var groupId = $('#groupIdInput').val();
        var status = $('#adminCheckInput').prop('checked') == true ? 0 : 1;
        var postData = {
            adminId: adminId,
            userName: userName,
            groupId: groupId,
            status: status
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.ADMIN_EDIT,
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
    /*編輯管理員 */

    var ajax_get_admin_delete = function () {
        $(document).on('click', '.del', function (e) {
            e.stopPropagation();
            var idString = $(this).attr('data-id');
            admin_delete_modal(idString);
        })
        confirm_delete_admin();
    }

    var confirm_delete_admin = function () {
        $(document).on('click', '#confirm', function () {
            var idString = $(this).attr('data-id');
            get_admin_delete(idString, siteFun.show_success_tip, siteFun.show_error_tip);
        })
        $(document).on('click', '#cancel', function () {

        })
    }

    /*刪除管理員提示 */
    var admin_delete_modal = function (idString) {
        var html = '<h4>確認要刪除嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-id=' + idString + ' data-dismiss="modal" id="confirm" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: '300px',
            height: 'auto',
            className: 'in_auto',
            title: '刪除管理員',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*刪除管理員提示 */

    /*刪除管理員 */
    var get_admin_delete = function (idString, callbackFun, errorFunction) {
        var getData = {
            idString: idString
        };
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.ADMIN_DELETE,
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
    /*刪除管理員 */

    /*多選刪除管理員 */
    var ajax_get_admin_delete_all = function () {
        $(document).on('click', 'a[href="admin/admin_delete"]', function (e) {
            group_delete_all_modal();
        })
        $(document).on('click', '#continue', function () {
            var idList = $(".che:checked").parents('.datagrid-row').find('.del');
            var idString = [];
            for (var i = 0; i < idList.length; i++) {
                idString.push(parseInt(idList[i].getAttribute('data-id')));
            }
            if (idString.length === 0) {
                siteFun.show_error_tip('請選擇要刪除的管理員');
                return false;
            }
            get_admin_delete(idString.toString(), siteFun.show_success_tip, siteFun.show_error_tip)
        })
    }
    /*多選刪除管理員 */

    /*多選刪除管理員提示 */
    var group_delete_all_modal = function () {
        var html = '<h4>確認要刪除所選的管理員嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-dismiss="modal" id="continue" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: '300px',
            height: 'auto',
            className: 'in_auto',
            title: '刪除管理員',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*多選刪除管理員提示 */

    var ajax_get_admin_bind = function () {
        $(document).on('click', '.bind', function (e) {
            e.stopPropagation();
            var adminId = $(this).attr('data-id');
            window.location.href = 'http://manageweb.qiujm.7391test.com/bind.html?' + 'adminId=' + adminId;
        })
    }

    var ajax_get_admin_unbind = function () {
        $(document).on('click', '.unbind', function (e) {
            e.stopPropagation();
            var adminId = $(this).attr('data-id');
            window.location.href = 'http://manageweb.qiujm.7391test.com/bind.html?' + 'adminId=' + adminId;
        })
    }

    module.exports = pub;
})