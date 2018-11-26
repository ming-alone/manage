define(function(require, exports, module) {
    var $ = require('jquery');
    var siteCfg = require('config/config');
    //var siteFun = require('config/function');

    require('zui');
    require('lib/zui.uploader.min');

    var pub = {};

    pub.init = function() {
        uploader(get_uploader_file_type);
        checkbox_check();
    }

    function checkbox_check() {

        $("#input :checkbox").on('click', function() {
            console.log(this.checked);
            if (this.checked) {

            }

        });

        $('#cardPic').on('click', function() {
            if ($(this).prop('checked')) {
                //$(this).prop("checked", false);
                $('#gamePic').prop("checked", false);
            } else {
                // $(this).prop("checked", true);
                // $('#gamePic').prop("checked", false);
            }
        });

        $('#gamePic').on('click', function() {
            if ($(this).prop('checked')) {
                //$(this).prop("checked", false);
                $('#cardPic').prop("checked", false);
            } else {
                //$(this).prop("checked", true);
                //$('#cardPic').prop("checked", true);
            }
        });
    }

    function uploader(get_uploader_file_type) {
        $('#uploader').uploader({
            url: siteCfg.API_TOOLS_SITE + 'CDN_Upload/upload/qcloud.html',
            lang: 'zh_tw',
            browse_button: '#chooseImg',
            filters: {
                mime_types: [{
                    title: '圖片',
                    extensions: 'jpg,gif,png'
                }]
            },
            limitFilesCount: 100,
            multipart_params: get_uploader_file_type,
            onError: function(error) {
                console.log('上传失败', error);

            },
            deleteActionOnDone: function(file, doRemoveFile) {
                doRemoveFile();
            },
            onFileUploaded: function(file, responseObject) {

            },
            onUploadFile: function(file) {
                console.log(siteCfg.API_TOOLS_SITE + 'CDN_Upload/upload/qcloud.html');
                console.log('上传成功', file);
            },
            responseHandler: function(responseObject, file) {
                console.log(typeof responseObject.response);
                var resp = JSON.parse(responseObject.response);
                if (resp.status === false) {
                    return '上传失败。服务器返回了一个错误：' + resp.info;
                }
            }
        });

        var uploader = $('#uploader').data('zui.uploader');
        uploader_start(uploader);
    }

    function get_uploader_file_type(file, params) {
        var cardType = $('#cardPic').prop('checked');
        var gameType = $('#gamePic').prop('checked');
        var type = cardType === true ? 'card' : 'game';
        return {
            type: type
        };
    }

    function uploader_start(uploader) {
        $('#uploaderStart').on('click', function() {
            var cardType = $('#cardPic').prop('checked');
            var gameType = $('#gamePic').prop('checked');

            if ((cardType || gameType) === false) {
                alert('请选择 游戏 或者 点卡');
                return false;
            }

            if ((cardType === true) && (gameType === true)) {
                alert('只能选择 游戏 或 点卡');
                return false;
            }

            uploader.start();
        });
    }


    module.exports = pub;
})
