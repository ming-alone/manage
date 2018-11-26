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
        ajax_get_goods_list();
        btn_goods_add_modal();
        ajax_get_goods_add();
        ajax_get_goods_info();
        ajax_post_goods_edit();
        ajax_get_goods_delete();
        ajax_get_goods_delete_all();
    }

    var ajax_get_goods_list = function () {
        get_goods_list(table_render);
    }

    /*獲取推薦商品列表 */
    var get_goods_list = function (callbackFun) {
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GOODS_LIST,
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
    /*獲取推薦商品列表 */

    /*重新渲染表格 */
    var ajax_render_table = function () {
        var gridList = [];
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GOODS_LIST,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                var data = returnData.rows;
                for (var i = 0; i < data.length; i++) {
                    var rows = {
                        GoodsNo: data[i].cell.GoodsNo,
                        GoodsName: data[i].cell.GoodsName,
                        GoodsSubtitle: data[i].cell.GoodsSubtitle,
                        ImgUrl: data[i].cell.ImgUrl,
                        Type: data[i].cell.Type,
                        Price: data[i].cell.Price,
                        Bouns: data[i].cell.Bouns,
                        Sort: data[i].cell.Sort,
                        IsShow: data[i].cell.IsShow == 1 ? '是' : '否',
                        option: '<div class="btn-group">' +
                            '<button data-id=' + data[i].cell.Id + ' class="btn edit">編輯</button>' +
                            '<button data-id=' + data[i].cell.Id + ' class="btn del">刪除</button>' +
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
        var gridList = [];
        for (var i = 0; i < data.length; i++) {
            var rows = {
                GoodsNo: data[i].cell.GoodsNo,
                GoodsName: data[i].cell.GoodsName,
                GoodsSubtitle: data[i].cell.GoodsSubtitle,
                ImgUrl: data[i].cell.ImgUrl,
                Type: data[i].cell.Type,
                Price: data[i].cell.Price,
                Bouns: data[i].cell.Bouns,
                Sort: data[i].cell.Sort,
                IsShow: data[i].cell.IsShow == 1 ? '是' : '否',
                option: '<div class="btn-group">' +
                    '<button data-id=' + data[i].cell.Id + ' class="btn edit">編輯</button>' +
                    '<button data-id=' + data[i].cell.Id + ' class="btn del">刪除</button>' +
                    '</div>'
            }
            gridList.push(rows);
        }
        $('#datagridPageExample').datagrid({
            dataSource: {
                cols: [{
                        name: 'GoodsNo',
                        label: '商品編號'
                    },
                    {
                        name: 'GoodsName',
                        label: '商品名稱'
                    },
                    {
                        name: 'GoodsSubtitle',
                        label: '商品簡稱'
                    },
                    {
                        name: 'ImgUrl',
                        label: '圖片地址',
                        className: 'pic-show'
                    },
                    {
                        name: 'Type',
                        label: '型別'
                    },
                    {
                        name: 'Price',
                        label: '價格'
                    },
                    {
                        name: 'Bouns',
                        label: '紅利'
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

    var btn_goods_add_modal = function () {
        $(document).on('click', 'a[href="i7391_CMS/goods/goods_add"]', function () {
            goods_add_modal();
        })
    }

    /*新增模態框 */
    var goods_add_modal = function () {
        var html = '<div class="input-control has-label-left-lg">' +
            '<input id="goodsNoInput" type="text" class="form-control" placeholder="">' +
            '<label for="goodsNoInput" class="input-control-label-left text-right">商品編號</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="goodsNameInput" type="text" class="form-control" placeholder="">' +
            '<label for="goodsNameInput" class="input-control-label-left text-right">商品名稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="goodsSubtitleInput" type="text" class="form-control" placeholder="">' +
            '<label for="goodsSubtitleInput" class="input-control-label-left text-right">商品簡稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="imgUrlInput" type="text" class="form-control" placeholder="圖片上傳後自動生成">' +
            '<label for="imgUrlInput" class="input-control-label-left text-right">圖片地址</label>' +
            '</div>' +
            siteFun.show_picture_upload() +
            '<div class="input-control has-label-left-lg">' +
            '<input id="typeInput" type="text" class="form-control" placeholder="">' +
            '<label for="typeInput" class="input-control-label-left text-right">商品型別</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="priceInput" type="text" class="form-control" placeholder="">' +
            '<label for="priceInput" class="input-control-label-left text-right">價格</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="bounsInput" type="text" class="form-control" placeholder="">' +
            '<label for="bounsInput" class="input-control-label-left text-right">紅利</label>' +
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

    var ajax_get_goods_add = function () {
        $(document).on('click', '#goodsAddButton', function () {
            get_goods_add(siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*新增推薦商品 */
    var get_goods_add = function (callbackFun, errorFuntion) {
        var goodsNo = $('#goodsNoInput').val();
        var goodsName = $('#goodsNameInput').val();
        var goodsSubtitle = $('#goodsSubtitleInput').val();
        var imgUrl = $('#imgUrlInput').val();
        var type = $('#typeInput').val();
        var price = $('#priceInput').val();
        var bouns = $('#bounsInput').val();
        var sort = $('#sortInput').val();
        var isShow = $('#isShowInput').prop('checked') == true ? 1 : 0;
        var getData = {
            goodsNo: goodsNo,
            goodsName: goodsName,
            goodsSubtitle: goodsSubtitle,
            imgUrl: imgUrl,
            type: type,
            price: price,
            bouns: bouns,
            sort: sort,
            isShow: isShow
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GOODS_ADD,
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
    /*新增推薦商品 */

    var ajax_get_goods_info = function () {
        $(document).on('click', '.edit', function () {
            var goodsId = $(this).attr('data-id');
            get_goods_info(goodsId, goods_edit_modal, siteFun.show_error_tip);
        })
    }

    /*獲取推薦商品詳情 */
    var get_goods_info = function (goodsId, callbackFun, errorFuntion) {
        var getData = {
            goodsId: goodsId
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.GET_GOODS_INFO,
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
    var goods_edit_modal = function (returnData) {
        var data = returnData.data;
        var checkStatus = data.IsShow == 1 ? 'checked' : '';
        var html = '<div class="input-control has-label-left-lg">' +
            '<input id="goodsNoInput" type="text" class="form-control" value=' + data.GoodsNo + ' placeholder="">' +
            '<label for="goodsNoInput" class="input-control-label-left text-right">商品編號</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="goodsNameInput" type="text" class="form-control" value=' + data.GoodsName + ' placeholder="">' +
            '<label for="goodsNameInput" class="input-control-label-left text-right">商品名稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="goodsSubtitleInput" type="text" class="form-control" value=' + data.GoodsSubtitle + ' placeholder="">' +
            '<label for="goodsSubtitleInput" class="input-control-label-left text-right">商品簡稱</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="imgUrlInput" type="text" class="form-control" value=' + data.ImgUrl + ' placeholder="圖片上傳後自動生成">' +
            '<label for="imgUrlInput" class="input-control-label-left text-right">圖片地址</label>' +
            '</div>' +
            siteFun.show_picture_upload() +
            '<div class="input-control has-label-left-lg">' +
            '<input id="typeInput" type="text" class="form-control" value=' + data.Type + ' placeholder="">' +
            '<label for="typeInput" class="input-control-label-left text-right">商品型別</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="priceInput" type="text" class="form-control" value=' + data.Price + ' placeholder="">' +
            '<label for="priceInput" class="input-control-label-left text-right">價格</label>' +
            '</div>' +
            '<div class="input-control has-label-left-lg">' +
            '<input id="bounsInput" type="text" class="form-control" value=' + data.Bouns + ' placeholder="">' +
            '<label for="bounsInput" class="input-control-label-left text-right">紅利</label>' +
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

    var ajax_post_goods_edit = function () {
        $(document).on('click', '#goodsEditButton', function () {
            var goodsId = $(this).attr('data-id');
            post_goods_edit(goodsId, siteFun.show_success_tip, siteFun.show_error_tip);
        })
    }

    /*編輯推薦商品 */
    var post_goods_edit = function (goodsId, callbackFun, errorFuntion) {
        var goodsNo = $('#goodsNoInput').val();
        var goodsName = $('#goodsNameInput').val();
        var goodsSubtitle = $('#goodsSubtitleInput').val();
        var imgUrl = $('#imgUrlInput').val();
        var type = $('#typeInput').val();
        var price = $('#priceInput').val();
        var bouns = $('#bounsInput').val();
        var sort = $('#sortInput').val();
        var isShow = $('#isShowInput').prop('checked') == true ? 1 : 0;
        var postData = {
            goodsId: goodsId,
            goodsNo: goodsNo,
            goodsName: goodsName,
            goodsSubtitle: goodsSubtitle,
            imgUrl: imgUrl,
            type: type,
            price: price,
            bouns: bouns,
            sort: sort,
            isShow: isShow
        }
        $.ajax({
            type: 'POST',
            url: siteCfg.REQUEST_URL.GOODS_EDIT,
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
    /*編輯推薦商品 */

    var ajax_get_goods_delete = function () {
        $(document).on('click', '.del', function () {
            var idString = $(this).attr('data-id');
            goods_delete_modal(idString);
        })
        confirm_delete_goods();
    }

    var confirm_delete_goods = function () {
        $(document).on('click', '#confirm', function () {
            var idString = $(this).attr('data-id');
            get_goods_delete(idString, siteFun.show_success_tip, siteFun.show_error_tip);
        })
        $(document).on('click', '#cancel', function () {

        })
    }

    /*刪除推薦商品提示 */
    var goods_delete_modal = function (idString) {
        var html = '<h4>確認要刪除嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-id=' + idString + ' data-dismiss="modal" id="confirm" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';
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
    var get_goods_delete = function (idString, callbackFun, errorFuntion) {
        var getData = {
            idString: idString
        }
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.GOODS_DELETE,
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
    /*刪除推薦商品 */

    /*多選刪除推薦商品 */
    var ajax_get_goods_delete_all = function () {
        $(document).on('click', 'a[href="i7391_CMS/goods/goods_delete"]', function (e) {
            goods_delete_all_modal();
        })
        $(document).on('click', '#continue', function () {
            var idList = $(".che:checked").parents('.datagrid-row').find('.del');
            var idString = [];
            for (var i = 0; i < idList.length; i++) {
                idString.push(parseInt(idList[i].getAttribute('data-id')));
            }
            if (idString.length === 0) {
                siteFun.show_error_tip('請選擇要刪除的推薦商品');
                return false;
            }
            get_goods_delete(idString.toString(), siteFun.show_success_tip, siteFun.show_error_tip)
        })
    }
    /*多選刪除推薦商品 */

    /*多選刪除推薦商品提示 */
    var goods_delete_all_modal = function () {
        var html = '<h4>確認要刪除所選的推薦商品嗎?</h4>' +
            '<hr/>' +
            '<button type="button" data-dismiss="modal" id="continue" class="btn btn-block btn-primary">確定</button>' +
            '<button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';
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