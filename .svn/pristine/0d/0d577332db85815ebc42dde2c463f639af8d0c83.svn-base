define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');
    require('zui');
    require('grids');
    require('uploads');
    var siteCfg = require('config/config');
    var siteFun = require('config/function');

    var pub = {}

    pub.init = function () {
        ajax_get_pointcard_list();
        btn_pointcard_add_modal();
        ajax_get_pointcard_add();
        ajax_get_pointcard_info();
        ajax_post_pointcard_edit();
        ajax_get_pointcard_delete();
        ajax_get_pointcard_delete_all();
    }

    var ajax_get_pointcard_list = function () {
        get_pointcard_list(table_render);
    }

    /*獲取點數卡列表 */
    var get_pointcard_list = function (callbackFun) {
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.POINTCARD_LIST,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.rows == undefined || returnData.rows == '') {
                    siteFun.show_error_tip('沒有資料');
                    return false;
                }
                if ($.isFunction(callbackFun)) {
                    callbackFun(returnData);
                }
            }
        })
    }
    /*獲取點數卡列表 */

    /*重新渲染表格 */
    var ajax_render_table = function () {
        var gridList = [];
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.POINTCARD_LIST,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                var data = returnData.rows;
                var dataList = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].cell.IsShow == 1) {
                        dataList.push(data[i]);
                    }
                }
                for (var j = 0; j < data.length; j++) {
                    var rows = {
                        Title: data[j].cell.Title,
                        ImgUrl: data[j].cell.ImgUrl,
                        HrefID: data[j].cell.HrefID,
                        Sort: data[j].cell.Sort,
                        IsShow: data[j].cell.IsShow == 1 ? '是' : '否',
                        option: '<div class="btn-group">' +
                            '<button data-id=' + data[j].cell.Id + ' class="btn edit">編輯</button>' +
                            '<button data-id=' + data[j].cell.Id + ' class="btn del">刪除</button>' +
                            '</div>'
                    }
                    gridList.push(rows);
                }
            }
        })
        var page = parseInt($('li[class="active"] .pager-item').html());
        var myDataGrid = $('#datagridPageExample').data('zui.datagrid');
        myDataGrid.setDataSource(gridList);
        myDataGrid.renderData();
        $('#datagridPageExample').on('onRender', function (event) {
            myDataGrid.setPager(page);
            $('.pic-show:not(:eq(0))').attr('data-toggle', 'tooltip');
            siteFun.show_picture_tooltip();
        });
    }
    /*重新渲染表格 */

    /*表格渲染 */
    var table_render = function (returnData) {
        var data = returnData.rows;
        var dataList = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].cell.IsShow == 1) {
                dataList.push(data[i]);
            }
        }
        var gridList = [];
        for (var j = 0; j < data.length; j++) {
            var rows = {
                Title: data[j].cell.Title,
                ImgUrl: data[j].cell.ImgUrl,
                HrefID: data[j].cell.HrefID,
                Sort: data[j].cell.Sort,
                IsShow: data[j].cell.IsShow == 1 ? '是' : '否',
                option: '<div class="btn-group">' +
                    '<button data-id=' + data[j].cell.Id + ' class="btn edit">編輯</button>' +
                    '<button data-id=' + data[j].cell.Id + ' class="btn del">刪除</button>' +
                    '</div>'
            }
            gridList.push(rows);
        }
        $('#datagridPageExample').datagrid({
            dataSource: {
                cols: [{
                        name: 'Title',
                        label: '點數卡名稱'
                    },
                    {
                        name: 'ImgUrl',
                        label: '圖片地址',
                        className: 'pic-show'
                    },
                    {
                        name: 'HrefID',
                        label: '點數卡ID'
                    },
                    {
                        name: 'Sort',
                        label: '排序'
                    },
                    {
                        name: 'IsShow',
                        label: '顯示'
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
        });
        $('#datagridPageExample').on('onRender', function (event) {
            $('.pic-show:not(:eq(0))').attr('data-toggle', 'tooltip');
            siteFun.show_picture_tooltip();
        });
    }
    /*表格渲染 */

    var btn_pointcard_add_modal = function () {
        $(document).on('click', 'a[href="i7391_CMS/pointcard/pointcard_add"]', function () {
            pointcard_add_modal();
        })
    }

    /*新增模態框 */
    var pointcard_add_modal = function () {
        var html = '<div class="input-control has-label-left-lg">' +
            '<input id="titleInput" type="text" class="form-control" placeholder="">' +
            '<label for="titleInput" class="input-control-label-left text-right">點數卡名稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="imgUrlInput" type="text" class="form-control" placeholder="圖片上傳後自動生成">' +
            '<label for="imgUrlInput" class="input-control-label-left text-right">圖片地址</label>' +
            '</div>' +
            siteFun.show_picture_upload() +
            '<div class="input-control has-label-left-lg">' +
            '<input id="hrefIDInput" type="text" class="form-control" placeholder="">' +
            '<label for="hrefIDInput" class="input-control-label-left text-right">點數卡ID</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="sortInput" type="text" class="form-control" placeholder="">' +
            '<label for="sortInput" class="input-control-label-left text-right">排序</label>' +
            '</div>' +
            '<div class="switch">' +
            '<input id="isShowInput" type="checkbox">' +
            '<label>顯示</label>' +
            '</div>' +
            '<button id="pointcardAddButton" class="btn btn-block btn-primary disabled up" type="button">新增</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '新增點數卡',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
        siteFun.show_upload_options();
    }
    /*新增模態框 */

    var ajax_get_pointcard_add = function () {
        $(document).on('click', '#pointcardAddButton', function () {
            get_pointcard_add(siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*新增點數卡 */
    var get_pointcard_add = function (callbackFun, errorFuntion) {
        var title = $('#titleInput').val();
        var imgUrl = $('#imgUrlInput').val();
        var hrefID = $('#hrefIDInput').val();
        var sort = $('#sortInput').val();
        var isShow = $('#isShowInput').prop('checked') == true ? 1 : 0;
        var getData = {
            title: title,
            imgUrl: imgUrl,
            hrefID: hrefID,
            sort: sort,
            isShow: isShow
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.POINTCARD_ADD,
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
                    if ($.isFunction(errorFuntion)) {
                        errorFuntion(returnData.info);
                    }
                }
            }
        })
    }
    /*新增點數卡 */

    var ajax_get_pointcard_info = function () {
        $(document).on('click', '.edit', function () {
            var pointcardId = $(this).attr('data-id');
            get_pointcard_info(pointcardId, pointcard_edit_modal, siteFun.show_error_tip);
        })
    }

    /*獲取點數卡詳情 */
    var get_pointcard_info = function (pointcardId, callbackFun, errorFuntion) {
        var getData = {
            pointcardId: pointcardId
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.GET_POINTCARD_INFO,
            data: getData,
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
                    if ($.isFunction(errorFuntion)) {
                        errorFuntion(returnData.info);
                    }
                }
            }
        })
    }
    /*獲取點數卡詳情 */

    /*編輯點數卡模態框 */
    var pointcard_edit_modal = function (returnData) {
        var data = returnData.data;
        var checkStatus = data.IsShow == 1 ? 'checked' : '';
        var html = '<div class="input-control has-label-left-lg">' +
            '<input id="titleInput" type="text" class="form-control" value=' + data.Title + ' placeholder="">' +
            '<label for="titleInput" class="input-control-label-left text-right">點數卡名稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="imgUrlInput" type="text" class="form-control" value=' + data.ImgUrl + ' placeholder="圖片上傳後自動生成">' +
            '<label for="imgUrlInput" class="input-control-label-left text-right">圖片地址</label>' +
            '</div>' +
            siteFun.show_picture_upload() +
            '<div class="input-control has-label-left-lg">' +
            '<input id="hrefIDInput" type="text" class="form-control" value=' + data.HrefID + ' placeholder="">' +
            '<label for="hrefIDInput" class="input-control-label-left text-right">跳轉地址</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="sortInput" type="text" class="form-control" value=' + data.Sort + ' placeholder="">' +
            '<label for="sortInput" class="input-control-label-left text-right">排序</label>' +
            '</div>' +
            '<div class="switch">' +
            '<input id="isShowInput" ' + checkStatus + ' type="checkbox">' +
            '<label>顯示</label>' +
            '</div>' +
            '<button id="pointcardEditButton" data-id=' + data.Id + ' class="btn btn-block btn-primary up" type="button">儲存</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '編輯點數卡',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
        siteFun.show_upload_options();
    }
    /*編輯點數卡模態框 */

    var ajax_post_pointcard_edit = function () {
        $(document).on('click', '#pointcardEditButton', function () {
            var pointcardId = $(this).attr('data-id');
            post_pointcard_edit(pointcardId, siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*編輯點數卡 */
    var post_pointcard_edit = function (pointcardId, callbackFun, errorFuntion) {
        var title = $('#titleInput').val();
        var imgUrl = $('#imgUrlInput').val();
        var hrefID = $('#hrefIDInput').val();
        var sort = $('#sortInput').val();
        var isShow = $('#isShowInput').prop('checked') == true ? 1 : 0;
        var postData = {
            pointcardId: pointcardId,
            title: title,
            imgUrl: imgUrl,
            hrefID: hrefID,
            sort: sort,
            isShow: isShow
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.POINTCARD_EDIT,
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
                    if ($.isFunction(errorFuntion)) {
                        errorFuntion(returnData.info);
                    }
                }
            }
        })
    }
    /*編輯點數卡 */

    var ajax_get_pointcard_delete = function () {
        $(document).on('click', '.del', function () {
            var idString = $(this).attr('data-id');
            pointcard_delete_modal(idString);
        })
        confirm_delete_pointcard();
    }

    var confirm_delete_pointcard = function () {
        $(document).on('click', '#confirm', function () {
            var idString = $(this).attr('data-id');
            get_pointcard_delete(idString, siteFun.show_success_tip, siteFun.show_error_tip);
        })
        $(document).on('click', '#cancel', function () {

        })
    }

    /*刪除點數卡提示 */
    var pointcard_delete_modal = function (idString) {
        var html = '<h4>確認要刪除嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-id=' + idString + ' data-dismiss="modal" id="confirm" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: '300px',
            height: 'auto',
            className: 'in_auto',
            title: '刪除點數卡',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*刪除點數卡提示 */

    /*刪除點數卡 */
    var get_pointcard_delete = function (idString, callbackFun, errorFuntion) {
        var getData = {
            idString: idString
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.POINTCARD_DELETE,
            data: getData,
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
                    ajax_render_table();
                } else {
                    if ($.isFunction(errorFuntion)) {
                        errorFuntion(returnData.info);
                    }
                }
            }
        })
    }
    /*刪除點數卡 */

    /*多選刪除點數卡 */
    var ajax_get_pointcard_delete_all = function () {
        $(document).on('click', 'a[href="i7391_CMS/pointcard/pointcard_delete"]', function (e) {
            pointcard_delete_all_modal();
        })
        $(document).on('click', '#continue', function () {
            var idList = $(".che:checked").parents('.datagrid-row').find('.del');
            var idString = [];
            for (var i = 0; i < idList.length; i++) {
                idString.push(parseInt(idList[i].getAttribute('data-id')));
            }
            if (idString.length === 0) {
                siteFun.show_error_tip('請選擇要刪除的點數卡');
                return false;
            }
            get_pointcard_delete(idString.toString(), siteFun.show_success_tip, siteFun.show_error_tip)
        })
    }
    /*多選刪除點數卡 */

    /*多選刪除點數卡提示 */
    var pointcard_delete_all_modal = function () {
        var html = '<h4>確認要刪除所選的點數卡嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-dismiss="modal" id="continue" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: '300px',
            height: 'auto',
            className: 'in_auto',
            title: '刪除點數卡',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*多選刪除點數卡提示 */

    module.exports = pub;
})