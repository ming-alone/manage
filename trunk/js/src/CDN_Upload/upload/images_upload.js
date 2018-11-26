define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    require('zui');
    require('lib/zui.uploader.min');
    var siteCfg = require('config/config');
    var siteFun = require('config/function');
    require('lib/clipboard.min');
    var pub = {};

    pub.init = function() {
        show_upload_config();
        clipboard_copy();
    }

    var show_upload_config = function() {
        var num = 0;
        $('#tableUploader').uploader({
            url: siteCfg.API_TOOLS_SITE + 'CDN_Upload/upload/qcloud_img.html',
            lang: 'zh_tw',
            filters: {
                mime_types: [{
                    title: '圖片',
                    extensions: 'jpg,gif,png'
                }]
            },
            limitFilesCount: 100,
            onError: function(error) {
                console.log('上传失败', error);

            },
            deleteActionOnDone: function(file, doRemoveFile) {
                doRemoveFile();
            },
            onFileUploaded: function(file, responseObject) {
                var data = JSON.parse(responseObject.response);
                // var num = $('[data-original-title="已上傳"]').length;
                var html = '';
                num += 1
                html += '<tr><td>' + num + '</td><td class="show_pic">' + data.url + '</td><td></td></tr>';
                $('.panel').removeClass('hidden');
                $('#pictureInfo').append(html);
                $('.show_pic').attr('data-toggle', 'tooltip');
                show_picture_tooltip();
            },
            responseHandler: function(responseObject, file) {

            }
        });
    }

    var show_picture_tooltip = function() {
        $(document).on('mouseover', '.show_pic', function() {
            $(this).tooltip('destroy');
            var html = $(this).html();
            var regExp = /^\/\//;
            if (regExp.test(html) === true) {
                html = html.replace(regExp, 'http://');
            }
            var imgHtml = '<img src=http://' + html + ' class="img-rounded">';
            $('[data-toggle="tooltip"]').tooltip({
                placement: 'right',
                html: true,
                title: imgHtml
            });
            // console.log(imgHtml);
            $(this).tooltip('show', imgHtml);
        })
    }

    var clipboard_copy = function() {
        var clipboard = new ClipboardJS('.show_pic', {
            text: function(trigger) {
                var html = $(trigger).html();
                return html;
            }
        });
        clipboard.on('success', function(e) {
            siteFun.show_success_tip('複製成功');
        });
        clipboard.on('error', function(e) {
            siteFun.show_error_tip('複製失敗');
        });
    }
    module.exports = pub;
})
