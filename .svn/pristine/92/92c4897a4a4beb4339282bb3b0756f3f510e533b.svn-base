define(function (require, exports, module) {
    'use strict';

    var $ = require('jquery');
    require('zui');
    var siteCfg = require('config/config');
    var cookie = require('config/cookie');

    $.ajaxSetup({
        error: function (xhr, text, error) {
            var info = '介面出錯: ' + xhr.status;
            info += '<br /> 介面: ' + this.url;
            info += '<br /> 方式: ' + this.type;
            info += '<br /> 資料: ' + this.data;
            ajax_error_message.show(info);
        },
        beforeSend: function (XHR) {
            $('#ajax_loading').removeClass('hidden').addClass('show');
        },
        complete: function (XHR, TS) {
            $('#ajax_loading').removeClass('show').addClass('hidden');
        }
    });

    $(document).on('click', 'a', function (e) {
        e.preventDefault();
    });

    var show_btn = function () {
        var sss = $('.power');
        for (var i = 0; i < sss.length; i++) {
            var cookieItem = sss[i].getAttribute('href')[0] == '/' ? sss[i].getAttribute('href') : '/' + sss[i].getAttribute('href');
            var cookieList = cookie(cookieItem);
            if (cookieList == (cookieItem)) {
                $('[href="' + cookieItem + '"]').removeClass('hidden');
            } else {
                $('[href="' + cookieItem + '"]').remove();
            }
        }
    }

    exports.show_btn = show_btn;

    // $(document).on('click', '#checkAll', function () {
    //     var status = $(this).prop('checked')
    //     $('.che').prop('checked', status);
    // })

    // $(document).on('click', '.che', function () {
    //     var status = $(this).prop('checked');
    //     $(this).prop('checked', !status);
    //     console.log(status);
    //     console.log($(this).parents('.datagrid-row'));
    //     if (!status == true) {
    //         $(this).parents('.datagrid-row').addClass('active');
    //     } else {
    //         $(this).parents('.datagrid-row').removeClass('active');
    //     }
    //     var a = $('.che').length;
    //     var b = $('.che:checked').length;
    //     console.log(a, b);
    //     if (a == b) {
    //         $('#checkAll').prop('checked', true);
    //     } else {
    //         $('#checkAll').prop('checked', false);
    //     }
    // })

    // $(document).on('click', '.datagrid-row:not(".datagrid-row-head"):not("#triggerModal .datagrid-row")', function () {
    //     var status = $(this).find('.che').prop('checked');
    //     $(this).find('.che').prop('checked', !status);
    //     if (!status == true) {
    //         $(this).addClass('active');
    //     } else {
    //         $(this).removeClass('active');
    //     }
    //     var a = $('.che').length;
    //     var b = $('.che:checked').length;
    //     if (a == b) {
    //         $('#checkAll').prop('checked', true);
    //     } else {
    //         $('#checkAll').prop('checked', false);
    //     }
    // })

    // $(document).on('click', '#checkAll', function () {
    //     var status = $(this).prop('checked');
    //     $('.che').prop('checked', status);
    //     if (status == true) {
    //         $('.che').parents('.datagrid-row').addClass('active');
    //     } else {
    //         $('.che').parents('.datagrid-row').removeClass('active');
    //     }
    // })

    // $(document).on('click', '.che', function () {
    //     var checkLength = $('.che').length;
    //     var actionLength = $('.che:checked').length;
    //     if (checkLength == actionLength) {
    //         $('#checkAll').prop('checked', true);
    //     } else {
    //         $('#checkAll').prop('checked', false);
    //     }
    // })

    $(document).on('click', '.datagrid-row:not(".datagrid-row-head"):not("#triggerModal .datagrid-row")', function () {
        var status = $(this).find('.che').hasClass('checked');
        if (status == false) {
            $(this).find('.che').addClass('checked')
            $(this).addClass('active');
        } else {
            $(this).find('.che').removeClass('checked')
            $(this).removeClass('active');
        }
        var a = $('.che').length;
        var b = $('.che.checked').length;
        if (a == b) {
            $('#checkAll').addClass('checked');
        } else {
            $('#checkAll').removeClass('checked');
        }
    })

    $(document).on('click', '.datagrid-row-head .datagrid-cell-index', function () {
        var status = $(this).find('#checkAll').hasClass('checked');
        if (status == false) {
            $(this).find('#checkAll').addClass('checked');
            $('.che').addClass('checked');
            $('.che').parents('.datagrid-row').addClass('active');
        } else {
            $(this).find('#checkAll').removeClass('checked');
            $('.che').removeClass('checked');
            $('.che').parents('.datagrid-row').removeClass('active');
        }
    })

    $(document).keydown(function (event) {
        switch (event.keyCode) {
            case 13:
                return false;
                break;
            case 32:
                return false;
        }
    });

    $(document).on('input porpertychange change', 'input[type="text"]', function (e) {
        $(this).tooltip('destroy');
        var inputList = $('input[type="text"]');
        if ($(this).val() == '') {
            $(this).tooltip('show', '請填寫' + $(this).next().html());
        }
        for (var i = 0; i < inputList.length; i++) {
            if (inputList[i].value == '') {
                $('.up').addClass('disabled');
                break;
            }
            $('.up').removeClass('disabled');
        }
    });

    var change_page = function (gridList) {
        var page = parseInt($('li[class="active"] .pager-item').html());
        var myDataGrid = $('#datagridPageExample').data('zui.datagrid');
        myDataGrid.setDataSource(gridList);
        myDataGrid.render();
        $('#datagridPageExample').on('onRender', function (event) {
            myDataGrid.setPager(page || 1);
        });
    }

    exports.change_page = change_page;

    var show_option = function () {
        $('#datagridPageExample').on('onRender', function (event) {
            var myDataGrid = $('#datagridPageExample').data('zui.datagrid');
            $('#datagridPageExample').on('click', 'a[href]', function (e) {
                e.preventDefault();
            })
            var alength = $(".power");
            for (var i = 0; i < alength.length; i++) {
                console.log(alength[i]);
                console.log(cookie(alength[i].getAttribute('href')));
                if (cookie(alength[i].getAttribute('href')) == null) {
                    $(".power:eq(" + i + ")").addClass('hidden');
                }
            }
        });
    }

    var show_picture_upload = function () {
        var pictureHtml = '<div id="tableUploader" class="uploader">' +
            '<div class="uploader-message text-center">' +
            '<div class="content"></div>' +
            '<button type="button" class="close">×</button>' +
            '</div>' +
            '<table class="table table-bordered">' +
            '<thead>' +
            '<tr>' +
            '<th colspan="2">檔名</th>' +
            '<th style="width: 100px">大小</th>' +
            '<th style="width: 160px; text-align: center;">狀態/操作</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody class="uploader-files">' +
            '<tr class="file template">' +
            '<td style="width: 38px; padding: 3px"><div class="file-icon"></div></td>' +
            '<td style="padding: 0">' +
            '<div style="position: relative; padding: 8px;">' +
            '<strong class="file-name"></strong>' +
            '<div class="file-progress-bar"></div>' +
            '</div>' +
            '</td>' +
            '<td><span class="file-size text-muted"></span></td>' +
            '<td class="actions text-right" style="padding: 0 4px;">' +
            '<div class="file-status" data-toggle="tooltip" style="margin: 8px;"><i class="icon"></i> <span class="text"></span></div>' +
            '<a data-toggle="tooltip" class="btn btn-link btn-download-file" target="_blank"><i class="icon icon-download-alt"></i></a>' +
            '<button type="button" data-toggle="tooltip" class="btn btn-link btn-reset-file" title="Repeat"><i class="icon icon-repeat"></i></button>' +
            '<button type="button" data-toggle="tooltip" class="btn btn-link btn-rename-file" title="Rename"><i class="icon icon-pencil"></i></button>' +
            '<button type="button" data-toggle="tooltip" title="Remove" class="btn btn-link btn-delete-file"><i class="icon icon-trash text-danger"></i></button>' +
            '</td>' +
            '</tr>' +
            '</tbody>' +
            '<tfoot>' +
            '<tr>' +
            '<td colspan="4" style="padding: 4px 0">' +
            '<div style="position: relative;">' +
            '<div class="uploader-status pull-right text-muted" style="margin-top: 5px;"></div>' +
            '<button type="button" class="btn btn-link uploader-btn-browse"><i class="icon icon-plus"></i> 選擇檔案</button>' +
            '<button type="button" class="btn btn-link uploader-btn-start"><i class="icon icon-cloud-upload"></i> 開始上傳</button>' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</tfoot>' +
            '</table>' +
            '</div>'
        return pictureHtml;
    }

    exports.show_picture_upload = show_picture_upload;

    var show_upload_options = function () {
        $('#tableUploader').uploader({
            url: siteCfg.REQUEST_URL.UPLOAD,
            lang: 'zh_tw',
            filters: {
                mime_types: [{
                    title: '圖片',
                    extensions: 'jpg,gif,png'
                }]
            },
            limitFilesCount: 1,
            deleteActionOnDone: function (file, doRemoveFile) {
                doRemoveFile();
            },
            onFileUploaded: function (file, responseObject) {
                var data = JSON.parse(responseObject.response);
                $('#imgUrlInput').val(data.data);
            }
        });
    }

    exports.show_upload_options = show_upload_options;

    var show_picture_tooltip = function () {
        $(document).on('mouseover', '.pic-show:not(:eq(0))', function () {
            $(this).tooltip('destroy');
            var html = $(this).html();
            var regExp = /^\/\//;
            if (regExp.test(html) === true) {
                html = html.replace(regExp, 'http://');
            }
            var imgHtml = '<img src=' + html + ' class="img-rounded">';
            $('[data-toggle="tooltip"]').tooltip({
                container: '#datagridPageExample',
                placement: 'right',
                html: true,
                title: imgHtml
            });
            $(this).tooltip('show', imgHtml);
        })
    }

    exports.show_picture_tooltip = show_picture_tooltip;

    var get_user_i7391_cookie = function (key) {
        var result = [];
        var User_Cookie_Name = cookie('User_Cookie_Name');

        if (User_Cookie_Name === null || User_Cookie_Name === "") {
            return false;
        }
        var arr = User_Cookie_Name.split('&');

        for (var i in arr) {
            var valueArray = arr[i].split('=');
            result[valueArray[0]] = valueArray[1];
        }

        if (result[key] === undefined) {
            return false;
        } else {
            return result[key];
        }

    };

    var ajax_error_message = new $.zui.Messager('', {
        type: 'danger',
        icon: 'exclamation-sign',
        cssClass: 'my-messager',
        contentClass: 'my-messager-content',
        placement: 'center',
        time: (seajs.data.debug === true) ? 10000 : 4000
    });

    exports.get_user_i7391_cookie = get_user_i7391_cookie;

    exports.getUrlParam = function (n) {
        var m = window.location.hash.match(new RegExp('(?:#|&)' + n + '=([^&]*)(&|$)')),
            result = !m ? '' : decodeURIComponent(m[1]);
        return result || getParameterByName(n);
    };

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var show_error_tip = function (data) {
        var message = data;
        var options = {
            type: 'danger',
            time: 2000,
            close: false
        }
        var myMessager = new $.zui.Messager(options);
        myMessager.show(message);
    }

    exports.show_error_tip = show_error_tip;

    var show_success_tip = function (data) {
        var message = data;
        var options = {
            type: 'success',
            time: 2000,
            close: false
        }
        var myMessager = new $.zui.Messager(options);
        myMessager.show(message);
    }
    exports.show_success_tip = show_success_tip;

    var get_option_appear = function (url) {
        var urlName = cookie(url);

        if (urlName === null || urlName === "") {
            return false;
        } else {
            return true;
        }
    }

    var delete_all_cookie = function () {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
        if (cookies.length > 0) {
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                var domain = location.host.substr(location.host.indexOf('.'));
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + domain;
            }
        }
    }

    exports.delete_all_cookie = delete_all_cookie;

})