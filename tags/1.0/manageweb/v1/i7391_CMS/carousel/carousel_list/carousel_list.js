define(function (require, exports, module) {
    'use strict';
    var $ = require('jquery');
    require('zui');
    require('grids');
    var siteCfg = require('config/config');
    var siteFun = require('config/function');
    var pub = {}

    pub.init = function () {
        ajax_get_carousel_list();
    }

    var ajax_get_carousel_list = function () {
        $.ajax({
            type: 'GET',
            url: siteCfg.REQUEST_URL.CAROUSEL_LIST,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (returnData) {
                console.log(returnData);
                table_render(returnData);
            }
        })
    }

    var table_render = function (returnData) {
        var data = returnData.rows;
        var gridList = [];
        for (var i = 0; i < data.length; i++) {
            var rows = {
                Id: data[i].cell.Id,
                HrefUrl: data[i].cell.HrefUrl,
                ImgUrl: data[i].cell.ImgUrl,
                Title: data[i].cell.Title,
                option: '<div class="btn-group">' +
                    '<button data-id=' + data[i].cell.Id + ' class="btn edit">编辑</button>' +
                    '<button data-id=' + data[i].cell.Id + ' class="btn del">删除</button>' +
                    '</div>'
            }
            gridList.push(rows);
        }
        $('#datagridPageExample').datagrid({
            dataSource: {
                cols: [{
                        name: 'Id',
                        label: 'Id',
                        width: 0.03,
                        className: 'text-center'
                    }, {
                        name: 'HrefUrl',
                        label: '路径'
                    },
                    {
                        name: 'ImgUrl',
                        label: '图片'
                    },
                    {
                        name: 'Title',
                        label: '标题'
                    }, {
                        name: 'option',
                        label: '操作',
                        html: true
                    }
                ],
                array: gridList
            },
            states: {
                pager: {
                    page: returnData.page,
                    recPerPage: returnData.total,
                    recPerPage: 10
                }
            },
            configs: {
                R0C0: {
                    label: '<input type="checkbox" style="width:15px;height:15px;" id="checkAll">',
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

    module.exports = pub;
})