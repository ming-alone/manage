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
        ajax_get_goods_pc_list();
        btn_goods_pc_add_modal();
        ajax_get_goods_pc_add();
        ajax_get_goods_pc_info();
        ajax_post_goods_pc_edit();
        ajax_get_goods_pc_delete();
        ajax_get_goods_pc_delete_all();
    }

    var ajax_get_goods_pc_list = function () {
        get_goods_pc_list(1000, table_render);
    }

    /*獲取推薦商品列表 */
    var get_goods_pc_list = function (rows, callbackFun) {
        var rows = rows || 0;
        var getData = {
            page: 1,
            rows: rows
        };
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GOODS_PC_LIST,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.records && returnData.records > getData.rows) {
                    var dataRows = getData.rows += 1000;
                    get_game_list(dataRows, callbackFun);
                    return false;
                }
                if (returnData.rows == undefined || returnData.rows == '') {
                    siteFun.show_error_tip('沒有資料');
                    if ($.isFunction(callbackFun)) {
                        callbackFun(returnData);
                    }
                } else {
                    if ($.isFunction(callbackFun)) {
                        callbackFun(returnData);
                    }
                }
            }
        })
    }
    /*獲取推薦商品列表 */

    /*重新渲染表格 */
    var ajax_render_table = function (rows, callbackFun) {
        var rows = rows || 0;
        var getData = {
            page: 1,
            rows: rows
        };
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GOODS_PC_LIST,
            dataType: 'json',
            data: getData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                if (returnData.records && returnData.records > getData.rows) {
                    var dataRows = getData.rows += 1000;
                    ajax_render_table(dataRows, callbackFun);
                    return false;
                }
                // if (returnData.rows == undefined || returnData.rows == '') {
                //     siteFun.show_error_tip('沒有資料');
                //     if ($.isFunction(callbackFun)) {
                //         callbackFun(get_table_data(returnData));
                //     }
                // }
                else {
                    if ($.isFunction(callbackFun)) {
                        callbackFun(get_table_data(returnData));
                    }
                }
            }
        })
    }
    /*重新渲染表格 */

    var get_table_data = function (returnData) {
        var data = returnData.rows;
        var gridList = [];
        for (var i = 0; i < data.length; i++) {
            var rows = {
                GoodsName: data[i].cell.GoodsName,
                ImgUrl: data[i].cell.ImgUrl,
                HrefUrl: data[i].cell.HrefUrl,
                Price: data[i].cell.Price,
                Sort: data[i].cell.Sort,
                IsShow: data[i].cell.IsShow == 1 ? '是' : '否',
                option: '<div class="btn-group">' +
                    '<button data-id=' + data[i].cell.Id + ' class="btn edit">編輯</button>' +
                    '<button data-id=' + data[i].cell.Id + ' class="btn del">刪除</button>' +
                    '</div>'
            }
            gridList.push(rows);
        }
        return gridList;
    }

    /*表格渲染 */
    var table_render = function (returnData) {
        var gridList = get_table_data(returnData);
        $('#datagridPageExample').datagrid({
            dataSource: {
                cols: [{
                        name: 'GoodsName',
                        label: '商品名稱'
                    },
                    {
                        name: 'ImgUrl',
                        label: '圖片地址',
                        className: 'pic-show'
                    },
                    {
                        name: 'HrefUrl',
                        label: '跳轉連結'
                    },
                    {
                        name: 'Price',
                        label: '價格'
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
            // configs: {
            //     R0C0: {
            //         label: '<input type="checkbox" id="checkAll">',
            //         html: true,
            //     },
            //     C0: {
            //         label: '<input type="checkbox" class="che">',
            //         html: true
            //     }
            // },
            configs: {
                R0C0: {
                    label: '<div id="checkAll" class="checkbox-primary datagrid-checkbox">' +
                        '<label></label>' +
                        '</div>',
                    html: true,
                },
                C0: {
                    label: '<div class="che checkbox-primary datagrid-checkbox">' +
                        '<label></label>' +
                        '</div>',
                    width: '38px',
                    html: true
                }
            },
            sortable: true,
            height: 'page'
        });
        $('#datagridPageExample').on('onRender', function (event) {
            $('.datagrid-row').removeClass('active');
            $('.pic-show:not(:eq(0))').attr('data-toggle', 'tooltip');
            siteFun.show_btn();
            siteFun.show_picture_tooltip();
        });
    }
    /*表格渲染 */

    var btn_goods_pc_add_modal = function () {
        $(document).on('click', 'a[href="/i7391_CMS/goods_pc/goods_add"]', function () {
            goods_pc_add_modal();
        })
    }

    /*新增模態框 */
    var goods_pc_add_modal = function () {
        var html = '<div class="input-control has-label-left-lg">' +
            '<input id="goodsNameInput" type="text" class="form-control" placeholder="">' +
            '<label for="goodsNameInput" class="input-control-label-left text-right">商品名稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="hrefUrlInput" type="text" class="form-control" placeholder="">' +
            '<label for="hrefUrlInput" class="input-control-label-left text-right">跳轉連結</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="imgUrlInput" type="text" class="form-control" placeholder="圖片上傳後自動生成">' +
            '<label for="imgUrlInput" class="input-control-label-left text-right">圖片地址</label>' +
            '</div>' +
            siteFun.show_picture_upload() +
            '<div class="input-control has-label-left-lg">' +
            '<input id="priceInput" type="text" class="form-control" placeholder="">' +
            '<label for="priceInput" class="input-control-label-left text-right">價格</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="sortInput" type="text" class="form-control" placeholder="">' +
            '<label for="sortInput" class="input-control-label-left text-right">排序</label>' +
            '</div>' +
            '<div class="switch">' +
            '<input id="isShowInput" type="checkbox">' +
            '<label>顯示</label>' +
            '</div>' +
            '<button id="goodsAddButton" class="btn btn-block btn-primary disabled up" type="button">新增</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '新增推薦商品',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
        siteFun.show_upload_options();
    }
    /*新增模態框 */

    var ajax_get_goods_pc_add = function () {
        $(document).on('click', '#goodsAddButton', function () {
            $('#goodsAddButton').addClass('disabled');
            get_goods_pc_add(siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*新增推薦商品 */
    var get_goods_pc_add = function (callbackFun, errorFuntion) {
        var goodsName = $('#goodsNameInput').val();
        var imgUrl = $('#imgUrlInput').val();
        var hrefUrl = $('#hrefUrlInput').val();
        var price = $('#priceInput').val();
        var sort = $('#sortInput').val();
        var isShow = $('#isShowInput').prop('checked') == true ? 1 : 0;
        var getData = {
            goodsName: goodsName,
            imgUrl: imgUrl,
            hrefUrl: hrefUrl,
            price: price,
            sort: sort,
            isShow: isShow
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GOODS_PC_ADD,
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
                    $('#triggerModal').modal('hide');
                    ajax_render_table(1000,siteFun.change_page);
                } else {
                    if ($.isFunction(errorFuntion)) {
                        errorFuntion(returnData.info);
                    }
                    $('#goodsAddButton').removeClass('disabled');
                }
            }
        })
    }
    /*新增推薦商品 */

    var ajax_get_goods_pc_info = function () {
        $(document).on('click', '.edit', function (e) {
            e.stopPropagation();
            var goodsId = $(this).attr('data-id');
            get_goods_pc_info(goodsId, goods_pc_edit_modal, siteFun.show_error_tip);
        })
    }

    /*獲取推薦商品詳情 */
    var get_goods_pc_info = function (goodsId, callbackFun, errorFuntion) {
        var getData = {
            goodsId: goodsId
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.GET_GOODS_PC_INFO,
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
    /*獲取推薦商品詳情 */

    /*編輯推薦商品模態框 */
    var goods_pc_edit_modal = function (returnData) {
        var data = returnData.data;
        var checkStatus = data.IsShow == 1 ? 'checked' : '';
        var html = '<div class="input-control has-label-left-lg">' +
            '<input id="goodsNameInput" type="text" class="form-control" value=' + data.GoodsName + ' placeholder="">' +
            '<label for="goodsNameInput" class="input-control-label-left text-right">商品名稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="hrefUrlInput" type="text" class="form-control" value=' + data.HrefUrl + ' placeholder="">' +
            '<label for="hrefUrlInput" class="input-control-label-left text-right">跳轉連結</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="imgUrlInput" type="text" class="form-control" value=' + data.ImgUrl + ' placeholder="圖片上傳後自動生成">' +
            '<label for="imgUrlInput" class="input-control-label-left text-right">圖片地址</label>' +
            '</div>' +
            siteFun.show_picture_upload() +
            '<div class="input-control has-label-left-lg">' +
            '<input id="priceInput" type="text" class="form-control" value=' + data.Price + ' placeholder="">' +
            '<label for="priceInput" class="input-control-label-left text-right">價格</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="sortInput" type="text" class="form-control" value=' + data.Sort + ' placeholder="">' +
            '<label for="sortInput" class="input-control-label-left text-right">排序</label>' +
            '</div>' +
            '<div class="switch">' +
            '<input id="isShowInput" ' + checkStatus + ' type="checkbox">' +
            '<label>顯示</label>' +
            '</div>' +
            '<button id="goodsEditButton" data-id=' + data.Id + ' class="btn btn-block btn-primary up" type="button">儲存</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: 'auto',
            height: 'auto',
            className: 'in_auto',
            title: '編輯推薦商品',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
        siteFun.show_upload_options();
    }
    /*編輯推薦商品模態框 */

    var ajax_post_goods_pc_edit = function () {
        $(document).on('click', '#goodsEditButton', function () {
            $('#goodsEditButton').addClass('disabled');
            var goodsId = $(this).attr('data-id');
            post_goods_pc_edit(goodsId, siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*編輯推薦商品 */
    var post_goods_pc_edit = function (goodsId, callbackFun, errorFuntion) {
        var goodsName = $('#goodsNameInput').val();
        var imgUrl = $('#imgUrlInput').val();
        var hrefUrl = $('#hrefUrlInput').val();
        var price = $('#priceInput').val();
        var sort = $('#sortInput').val();
        var isShow = $('#isShowInput').prop('checked') == true ? 1 : 0;
        var postData = {
            goodsId: goodsId,
            goodsName: goodsName,
            imgUrl: imgUrl,
            hrefUrl: hrefUrl,
            price: price,
            sort: sort,
            isShow: isShow
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.GOODS_PC_EDIT,
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
                    $('#triggerModal').modal('hide');
                    ajax_render_table(1000,siteFun.change_page);                    
                } else {
                    if ($.isFunction(errorFuntion)) {
                        errorFuntion(returnData.info);
                    }
                    $('#goodsEditButton').removeClass('disabled');
                }
            }
        })
    }
    /*編輯推薦商品 */

    var ajax_get_goods_pc_delete = function () {
        $(document).on('click', '.del', function (e) {
            e.stopPropagation();
            var idString = $(this).attr('data-id');
            goods_pc_delete_modal(idString);
        })
        confirm_delete_goods_pc();
    }

    var confirm_delete_goods_pc = function () {
        $(document).on('click', '#confirm', function () {
            $('#confirm').addClass('disabled');
            var idString = $(this).attr('data-id');
            get_goods_pc_delete(idString, siteFun.show_success_tip, siteFun.show_error_tip);
        })
        $(document).on('click', '#cancel', function () {
            $('#triggerModal').modal('hide');
        })
    }

    /*刪除推薦商品提示 */
    var goods_pc_delete_modal = function (idString) {
        var html = '<h4>確認要刪除嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-id=' + idString + ' id="confirm" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" id="cancel" class="btn btn-block btn-primary">取消</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: '300px',
            height: 'auto',
            className: 'in_auto',
            title: '刪除推薦商品',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*刪除推薦商品提示 */

    /*刪除推薦商品 */
    var get_goods_pc_delete = function (idString, callbackFun, errorFuntion) {
        var getData = {
            idString: idString
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GOODS_PC_DELETE,
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
                    $('#triggerModal').modal('hide');
                    ajax_render_table(1000,siteFun.change_page);
                } else {
                    if ($.isFunction(errorFuntion)) {
                        errorFuntion(returnData.info);
                    }
                    $('#triggerModal').modal('hide');
                }
            }
        })
    }
    /*刪除推薦商品 */

    /*多選刪除推薦商品 */
    var ajax_get_goods_pc_delete_all = function () {
        $(document).on('click', 'a[href="/i7391_CMS/goods_pc/goods_detele"]:not(".del")', function (e) {
            goods_pc_delete_all_modal();
        })
        $(document).on('click', '#continue', function () {
            var idList = $(".che.checked").parents('.datagrid-row').find('.del');
            var idString = [];
            for (var i = 0; i < idList.length; i++) {
                idString.push(parseInt(idList[i].getAttribute('data-id')));
            }
            get_goods_pc_delete(idString.toString(), siteFun.show_success_tip, siteFun.show_error_tip)
        })
        $(document).on('click', '#cancel', function () {
            $('#triggerModal').modal('hide');
        })
    }
    /*多選刪除推薦商品 */

    /*多選刪除推薦商品提示 */
    var goods_pc_delete_all_modal = function () {
        var html = '<h4>確認要刪除所選的推薦商品嗎?</h4>' +
            '<hr/>' +
            '<button type="button" id="continue" class="btn btn-block btn-primary">确定</button>' +
            '<button type="button" id="cancel" class="btn btn-block btn-primary">取消</button>';
        var myModalTrigger = new $.zui.ModalTrigger({
            width: '300px',
            height: 'auto',
            className: 'in_auto',
            title: '刪除推薦商品',
            custom: html,
            backdrop: 'static'
        });
        myModalTrigger.show();
    }
    /*多選刪除推薦商品提示 */

    module.exports = pub;
})