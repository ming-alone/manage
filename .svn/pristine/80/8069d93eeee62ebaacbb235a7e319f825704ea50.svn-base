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
        ajax_get_banner_list();
        btn_banner_add_modal();
        ajax_get_banner_add();
        ajax_get_banner_info();
        ajax_post_banner_edit();
        ajax_get_banner_delete();
        ajax_get_banner_delete_all();
        // ajax_render_table();
    }

    var ajax_get_banner_list = function () {
        get_banner_list();
    }

    /*獲取登入頁banner列表 */
    var get_banner_list = function (rows) {
        var rows = rows || 0;
        var getData = {
            page: 1,
            rows: rows
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.BANNER_LOGIN_LIST,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.records > getData.rows) {
                    var sss = getData.rows += 10;
                    console.log(sss);
                    get_banner_list(sss);
                    return false;
                }
                if (returnData.rows == undefined || returnData.rows == '') {
                    siteFun.show_error_tip('沒有資料');
                    return false;
                } else {
                    table_render(returnData);
                }
                // if ($.isFunction(callbackFun)) {
                //     callbackFun(returnData);
                // }
            }
        })
    }
    /*獲取登入頁banner列表 */

    /*重新渲染表格 */
    var ajax_render_table = function (rows) {
        var gridList = [];
        var rows = rows || 0;
        var getData = {
            page: 1,
            rows: rows
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.BANNER_LOGIN_LIST,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.records > getData.rows) {
                    var sss = getData.rows + 10;
                    ajax_render_table(sss);
                    return false;
                }
                if (returnData.rows == undefined || returnData.rows == '') {
                    siteFun.show_error_tip('沒有資料');
                    return false;
                } else {
                    var data = returnData.rows || [];
                    var dataList = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].cell.IsShow == 1) {
                            dataList.push(data[i]);
                        }
                    }
                    for (var j = 0; j < data.length; j++) {
                        var rows = {
                            id: data[j].cell.Id,
                            Title: data[j].cell.Title,
                            ImgUrl: data[j].cell.ImgUrl,
                            HrefUrl: data[j].cell.HrefUrl,
                            Sort: data[j].cell.Sort,
                            IsShow: data[j].cell.IsShow == 1 ? '是' : '否',
                            option: '<div class="btn-group">' +
                                '<button data-id=' + data[j].cell.Id + ' class="btn edit">編輯</button>' +
                                '<button data-id=' + data[j].cell.Id + ' class="btn del">刪除</button>' +
                                '</div>'
                        }
                        gridList.push(rows);
                    }
                    var myDataGrid = $('#datagridPageExample').data('zui.datagrid');
                    myDataGrid.setDataSource(gridList);
                    myDataGrid.render();
                    $('#datagridPageExample').on('onRender', function () {
                        var page = parseInt($('li[class="active"] .pager-item').html());
                        myDataGrid.setPager(page || 1);
                    });
                }
            }
        })
    }
    /*重新渲染表格 */

    /*表格渲染 */
    var table_render = function (returnData) {
        var data = returnData.rows || [];
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
                HrefUrl: data[j].cell.HrefUrl,
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
                        label: 'banner名稱'
                    },
                    {
                        name: 'ImgUrl',
                        label: '圖片地址',
                        className: 'pic-show'
                    },
                    {
                        name: 'HrefUrl',
                        label: '跳轉地址'
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
            var myDataGrid = $('#datagridPageExample').data('zui.datagrid');
            var page = parseInt($('li[class="active"] .pager-item').html());
            myDataGrid.setPager(page || 1);
            $('.pic-show:not(:eq(0))').attr('data-toggle', 'tooltip');
            siteFun.show_picture_tooltip();
        });
    }
    /*表格渲染 */

    var btn_banner_add_modal = function () {
        $(document).on('click', 'a[href="i7391_CMS/banner_pc/banner_login_add"]', function () {
            banner_add_modal();
        })
    }

    /*新增模態框 */
    var banner_add_modal = function () {
        var html = '<div class="input-control has-label-left-lg">' +
            '<input id="titleInput" type="text" class="form-control" placeholder="">' +
            '<label for="titleInput" class="input-control-label-left text-right">banner名稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="hrefUrlInput" type="text" class="form-control" placeholder="">' +
            '<label for="hrefUrlInput" class="input-control-label-left text-right">跳轉地址</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="imgUrlInput" type="text" class="form-control" placeholder="圖片上傳後自動生成">' +
            '<label for="imgUrlInput" class="input-control-label-left disabled text-right">圖片地址</label>' +
            '</div>' +
            siteFun.show_picture_upload() +
            '<div class="input-control has-label-left-lg">' +
            '<input id="sortInput" type="text" class="form-control" placeholder="">' +
            '<label for="sortInput" class="input-control-label-left text-right">排序</label>' +
            '</div>' +
            '<div class="switch">' +
            '<input id="isShowInput" type="checkbox">' +
            '<label>顯示</label>' +
            '</div>' +
            '<button id="bannerAddButton" class="btn btn-block btn-primary disabled up" type="button">新增</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '新增登入頁banner',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
        siteFun.show_upload_options();
    }
    /*新增模態框 */

    var ajax_get_banner_add = function () {
        $(document).on('click', '#bannerAddButton', function () {
            get_banner_add(siteFun.show_success_tip, siteFun.show_error_tip)
        })
    }

    /*新增登入頁banner */
    var get_banner_add = function (callbackFun, errorFuntion) {
        var title = $('#titleInput').val();
        var imgUrl = $('#imgUrlInput').val();
        var hrefUrl = $('#hrefUrlInput').val();
        var sort = $('#sortInput').val();
        var isShow = $('#isShowInput').prop('checked') == true ? 1 : 0;
        var getData = {
            title: title,
            imgUrl: imgUrl,
            hrefUrl: hrefUrl,
            sort: sort,
            isShow: isShow
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.BANNER_LOGIN_ADD,
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
    /*新增登入頁banner */

    var ajax_get_banner_info = function () {
        $(document).on('click', '.edit', function (e) {
            e.stopPropagation();
            var bannerId = $(this).attr('data-id');
            get_banner_info(bannerId, banner_edit_modal, siteFun.show_error_tip)
        })
    }

    /*獲取登入頁banner詳情 */
    var get_banner_info = function (bannerId, callbackFun, errorFuntion) {
        var getData = {
            bannerId: bannerId
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.GET_BANNER_INFO,
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
    /*獲取登入頁banner詳情 */

    /*編輯登入頁banner模態框 */
    var banner_edit_modal = function (returnData) {
        var data = returnData.data;
        var checkStatus = data.IsShow == 1 ? 'checked' : '';
        var html = '<div class="input-control has-label-left-lg">' +
            '<input id="titleInput" type="text" class="form-control" value=' + data.Title + ' placeholder="">' +
            '<label for="titleInput" class="input-control-label-left text-right">banner名稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="hrefUrlInput" type="text" class="form-control" value=' + data.HrefUrl + ' placeholder="">' +
            '<label for="hrefUrlInput" class="input-control-label-left text-right">跳轉地址</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="imgUrlInput" type="text" class="form-control" value=' + data.ImgUrl + ' placeholder="圖片上傳後自動生成">' +
            '<label for="imgUrlInput" class="input-control-label-left text-right">圖片地址</label>' +
            '</div>' +
            siteFun.show_picture_upload() +
            '<div class="input-control has-label-left-lg">' +
            '<input id="sortInput" type="text" class="form-control" value=' + data.Sort + ' placeholder="">' +
            '<label for="sortInput" class="input-control-label-left text-right">排序</label>' +
            '</div>' +
            '<div class="switch">' +
            '<input id="isShowInput" ' + checkStatus + ' type="checkbox">' +
            '<label>顯示</label>' +
            '</div>' +
            '<button id="bannerEditButton" data-id=' + data.Id + ' class="btn btn-block btn-primary up" type="button">儲存</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '編輯登入頁banner',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
        siteFun.show_upload_options();
    }
    /*編輯登入頁banner模態框 */

    var ajax_post_banner_edit = function () {
        $(document).on('click', '#bannerEditButton', function () {
            var bannerId = $(this).attr('data-id');
            post_banner_edit(bannerId, siteFun.show_success_tip, siteFun.show_error_tip)
        })
    }

    /*編輯登入頁banner */
    var post_banner_edit = function (bannerId, callbackFun, errorFuntion) {
        var title = $('#titleInput').val();
        var imgUrl = $('#imgUrlInput').val();
        var hrefUrl = $('#hrefUrlInput').val();
        var sort = $('#sortInput').val();
        var isShow = $('#isShowInput').prop('checked') == true ? 1 : 0;
        var postData = {
            bannerId: bannerId,
            title: title,
            imgUrl: imgUrl,
            hrefUrl: hrefUrl,
            sort: sort,
            isShow: isShow
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.BANNER_LOGIN_EDIT,
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
    /*編輯登入頁banner */

    var ajax_get_banner_delete = function () {
        $(document).on('click', '.del', function (e) {
            e.stopPropagation();
            var idString = $(this).attr('data-id');
            banner_delete_modal(idString);
        });
        confirm_delete_banner();
    }

    var confirm_delete_banner = function () {
        $(document).on('click', '#confirm', function () {
            var idString = $(this).attr('data-id');
            get_banner_delete(idString, siteFun.show_success_tip, siteFun.show_error_tip);
        })
        $(document).on('click', '#cancel', function () {

        })
    }

    /*刪除登入頁banner提示 */
    var banner_delete_modal = function (idString) {
        var html = '<h4>確認要刪除嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-id=' + idString + ' data-dismiss="modal" id="confirm" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: '300px',
            height: 'auto',
            className: 'in_auto',
            title: '刪除登入頁banner',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*刪除登入頁banner提示 */

    /*刪除登入頁banner */
    var get_banner_delete = function (idString, callbackFun, errorFuntion) {
        var getData = {
            idString: idString
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.BANNER_LOGIN_DELETE,
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
    /*刪除登入頁banner */

    /*多選刪除登入頁banner */
    var ajax_get_banner_delete_all = function () {
        $(document).on('click', 'a[href="i7391_CMS/banner_pc/banner_login_delete"]', function (e) {
            banner_delete_all_modal();
        })
        $(document).on('click', '#continue', function () {
            var idList = $(".che:checked").parents('.datagrid-row').find('.del');
            var idString = [];
            for (var i = 0; i < idList.length; i++) {
                idString.push(parseInt(idList[i].getAttribute('data-id')));
            }
            if (idString.length === 0) {
                siteFun.show_error_tip('請選擇要刪除的banner');
                return false;
            }
            get_banner_delete(idString.toString(), siteFun.show_success_tip, siteFun.show_error_tip)
        })
    }
    /*多選刪除登入頁banner */

    /*多選刪除登入頁banner提示 */
    var banner_delete_all_modal = function () {
        var html = '<h4>確認要刪除所選的banner嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-dismiss="modal" id="continue" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: '300px',
            height: 'auto',
            className: 'in_auto',
            title: '刪除登入頁banner',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*多選刪除登入頁banner提示 */

    module.exports = pub;
})