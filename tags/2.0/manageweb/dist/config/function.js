define("config/function",["jquery","zui","config/config","config/cookie"],function(require,exports,module){"use strict";var i=require("jquery");require("zui");var t=require("config/config"),l=require("config/cookie");i.ajaxSetup({error:function(t,e,o){var i="介面出錯: "+t.status;i+="<br /> 介面: "+this.url,i+="<br /> 方式: "+this.type,i+="<br /> 資料: "+this.data,n.show(i)},beforeSend:function(t){i("#ajax_loading").removeClass("hidden").addClass("show")},complete:function(t,e){i("#ajax_loading").removeClass("show").addClass("hidden")}}),i(".nav").on("click","li",function(t){t.preventDefault()}),i(document).on("click","#checkAll",function(){var t=i(this).prop("checked");i(".che").prop("checked",t)}),i(document).on("click",".che",function(){i(".che").length==i(".che:checked").length?i("#checkAll").prop("checked",!0):i("#checkAll").prop("checked",!1)}),i(document).keydown(function(t){switch(t.keyCode){case 13:case 32:return!1}}),i(document).on("input porpertychange",'input[type="text"]',function(t){i(this).tooltip("destroy");var e=i('input[type="text"]');""==i(this).val()&&i(this).tooltip("show","請填寫"+i(this).next().html());for(var o=0;o<e.length;o++){if(""==e[o].value){i(".up").addClass("disabled");break}i(".up").removeClass("disabled")}});exports.show_picture_upload=function(){return'<div id="tableUploader" class="uploader"><div class="uploader-message text-center"><div class="content"></div><button type="button" class="close">×</button></div><table class="table table-bordered"><thead><tr><th colspan="2">檔名</th><th style="width: 100px">大小</th><th style="width: 160px; text-align: center;">狀態/操作</th></tr></thead><tbody class="uploader-files"><tr class="file template"><td style="width: 38px; padding: 3px"><div class="file-icon"></div></td><td style="padding: 0"><div style="position: relative; padding: 8px;"><strong class="file-name"></strong><div class="file-progress-bar"></div></div></td><td><span class="file-size text-muted"></span></td><td class="actions text-right" style="padding: 0 4px;"><div class="file-status" data-toggle="tooltip" style="margin: 8px;"><i class="icon"></i> <span class="text"></span></div><a data-toggle="tooltip" class="btn btn-link btn-download-file" target="_blank"><i class="icon icon-download-alt"></i></a><button type="button" data-toggle="tooltip" class="btn btn-link btn-reset-file" title="Repeat"><i class="icon icon-repeat"></i></button><button type="button" data-toggle="tooltip" class="btn btn-link btn-rename-file" title="Rename"><i class="icon icon-pencil"></i></button><button type="button" data-toggle="tooltip" title="Remove" class="btn btn-link btn-delete-file"><i class="icon icon-trash text-danger"></i></button></td></tr></tbody><tfoot><tr><td colspan="4" style="padding: 4px 0"><div style="position: relative;"><div class="uploader-status pull-right text-muted" style="margin-top: 5px;"></div><button type="button" class="btn btn-link uploader-btn-browse"><i class="icon icon-plus"></i> 選擇檔案</button><button type="button" class="btn btn-link uploader-btn-start"><i class="icon icon-cloud-upload"></i> 開始上傳</button></div></td></tr></tfoot></table></div>'};exports.show_upload_options=function(){i("#tableUploader").uploader({url:t.REQUEST_URL.UPLOAD,lang:"zh_tw",filters:{mime_types:[{title:"圖片",extensions:"jpg,gif,png"}]},limitFilesCount:1,deleteActionOnDone:function(t,e){e()},onFileUploaded:function(t,e){var o=JSON.parse(e.response);i("#imgUrlInput").val(o.data)}})};exports.show_picture_tooltip=function(){i(document).on("mouseover",".pic-show:not(:eq(0))",function(){i(this).tooltip("destroy");var t=i(this).html(),e=/^\/\//;!0===e.test(t)&&(t=t.replace(e,"http://"));var o="<img src="+t+' class="img-rounded">';i('[data-toggle="tooltip"]').tooltip({container:"#datagridPageExample",placement:"right",html:!0,title:o}),i(this).tooltip("show",o)})};var n=new i.zui.Messager("",{type:"danger",icon:"exclamation-sign",cssClass:"my-messager",contentClass:"my-messager-content",placement:"center",time:!0===seajs.data.debug?1e4:4e3});exports.get_user_i7391_cookie=function(t){var e=[],o=l("User_Cookie_Name");if(null===o||""===o)return!1;var i=o.split("&");for(var n in i){var a=i[n].split("=");e[a[0]]=a[1]}return void 0!==e[t]&&e[t]},exports.getUrlParam=function(t){var e=window.location.hash.match(new RegExp("(?:#|&)"+t+"=([^&]*)(&|$)"));return(e?decodeURIComponent(e[1]):"")||function(t,e){e||(e=window.location.href);t=t.replace(/[\[\]]/g,"\\$&");var o=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(e);return o?o[2]?decodeURIComponent(o[2].replace(/\+/g," ")):"":null}(t)};exports.show_error_tip=function(t){var e=t;new i.zui.Messager({type:"danger",time:2e3,close:!1}).show(e)};exports.show_success_tip=function(t){var e=t;new i.zui.Messager({type:"success",time:2e3,close:!1}).show(e)}}),define("config/config",[],function(require,exports,module){"use strict";var t=seajs.data.vars._DOMIAN_SITE,e=seajs.data.vars._PASSPORT_SITE;exports.DOMAIN_SITE=t,exports.PASSPORT_SITE=e,exports.REQUEST_URL={LOGIN:e+"passport/work_wechat_callback.html",LOGOUT:e+"passport/logout.html",UPLOAD:e+"i7391_CMS/common/upload.html",MENU_LIST:e+"common/get_menu_list.html",GROUP_LIST:e+"admin/group_list.html",GROUP_ADD:e+"admin/group_add.html",GROUP_EDIT:e+"admin/group_edit.html",GROUP_DELETE:e+"admin/group_delete.html",GET_GROUP_INFO:e+"admin/group_edit.html?action=getGroupInfo",JQ_GET_DATA:e+"admin/group_authority_edit.html?action=jqGetData",GROUP_AUTHORITY_EIDT:e+"admin/group_authority_edit.html",ADMIN_LIST:e+"admin/admin_list.html",ADMIN_ADD:e+"admin/admin_add.html",ADMIN_EDIT:e+"admin/admin_edit.html",ADMIN_DELETE:e+"admin/admin_delete.html",ADMIN_WX_BIND:e+"wxqr/admin_bind.html",ADMIN_WX_UNBIND:e+"admin/wx_unbind.html",GET_ADMIN_INFO:e+"admin/admin_edit.html?action=getAdminInfo",GET_GROUP_LIST:e+"admin/admin_add.html?action=getGroupList",BANNER_LOGIN_LIST:e+"i7391_CMS/banner_pc/banner_login_list.html",BANNER_LOGIN_ADD:e+"i7391_CMS/banner_pc/banner_login_add.html",BANNER_LOGIN_EDIT:e+"i7391_CMS/banner_pc/banner_login_edit.html",BANNER_LOGIN_DELETE:e+"i7391_CMS/banner_pc/banner_login_delete.html",GET_BANNER_INFO:e+"i7391_CMS/banner_pc/banner_login_edit.html?action=getBannerInfo",BANNER_LOGIN_FOOTER_LIST:e+"i7391_CMS/banner_pc/banner_login_footer_list.html",BANNER_LOGIN_FOOTER_ADD:e+"/i7391_CMS/banner_pc/banner_login_footer_add.html",BANNER_LOGIN_FOOTER_EDIT:e+"/i7391_CMS/banner_pc/banner_login_footer_edit.html",BANNER_LOGIN_FOOTER_DELETE:e+"/i7391_CMS/banner_pc/banner_login_footer_delete.html",GET_FOOTER_INFO:e+"i7391_CMS/banner_pc/banner_login_footer_edit.html?action=getBannerInfo",CAROUSEL_LIST:e+"i7391_CMS/carousel/carousel_list.html",CAROUSEL_ADD:e+"i7391_CMS/carousel/carousel_add.html",CAROUSEL_EDIT:e+"i7391_CMS/carousel/carousel_edit.html",CAROUSEL_DELETE:e+"i7391_CMS/carousel/carousel_delete.html",GET_CAROUSEL_INFO:e+"i7391_CMS/carousel/carousel_edit.html?action=getCarouselInfo",GAME_LIST:e+"i7391_CMS/game/game_list.html",GAME_ADD:e+"i7391_CMS/game/game_add.html",GAME_EDIT:e+"i7391_CMS/game/game_edit.html",GAME_DELETE:e+"i7391_CMS/game/game_detele.html",GET_GAME_INFO:e+"i7391_CMS/game/game_edit.html?action=getGameInfo",POINTCARD_LIST:e+"i7391_CMS/pointcard/pointcard_list.html",POINTCARD_ADD:e+"i7391_CMS/pointcard/pointcard_add.html",POINTCARD_EDIT:e+"i7391_CMS/pointcard/pointcard_edit.html",POINTCARD_DELETE:e+"i7391_CMS/pointcard/pointcard_delete.html",GET_POINTCARD_INFO:e+"i7391_CMS/pointcard/pointcard_edit.html?action=getPointcardInfo",MOBILEGAME_LIST:e+"i7391_CMS/mobilegame/mobilegame_list.html",MOBILEGAME_ADD:e+"i7391_CMS/mobilegame/mobilegame_add.html",MOBILEGAME_EDIT:e+"i7391_CMS/mobilegame/mobilegame_edit.html",MOBILEGAME_DELETE:e+"i7391_CMS/mobilegame/mobilegame_delete.html",GET_MOBILEGAME_INFO:e+"i7391_CMS/mobilegame/mobilegame_edit.html?action=getMobileGameInfo",GOODS_LIST:e+"i7391_CMS/goods/goods_list.html",GOODS_ADD:e+"i7391_CMS/goods/goods_add.html",GOODS_EDIT:e+"i7391_CMS/goods/goods_edit.html",GOODS_DELETE:e+"i7391_CMS/goods/goods_detele.html",GET_GOODS_INFO:e+"i7391_CMS/goods/goods_edit.html?action=getGoodsInfo",GOODS_PC_LIST:e+"i7391_CMS/goods_pc/goods_list.html",GOODS_PC_ADD:e+"i7391_CMS/goods_pc/goods_add.html",GOODS_PC_EDIT:e+"i7391_CMS/goods_pc/goods_edit.html",GOODS_PC_DELETE:e+"i7391_CMS/goods_pc/goods_detele.html",GET_GOODS_PC_INFO:e+"i7391_CMS/goods_pc/goods_edit.html?action=getGoodsInfo",GET_RECORD:e+"8591/contrast/game_contrast.html?action=getRecord",GAME_CONTRAST:e+"8591/contrast/game_contrast.html",GET_ADDGAME_DATA:e+"i7391_API/getdata/get_allgame_data.html",GET_GAMETYPE_DATA:e+"i7391_API/getdata/get_gametype_data",GET_RATE:e+"i7391_API/getdata/get_rate.html",GET_CARD_CATEORY:e+"i7391_API/getdata/get_card_category.html",GET_CARD_POINT:e+"i7391_API/getdata/get_card_point.html"}}),define("config/cookie",["jquery"],function(require,exports,module){"use strict";var m=require("jquery");module.exports=function(t,e,o){if(void 0===e){var i=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),a=0;a<n.length;a++){var l=m.trim(n[a]);if(l.substring(0,t.length+1)==t+"="){i=decodeURIComponent(l.substring(t.length+1));break}}return i}o=o||{},null===e&&(e="",o.expires=-1);var _,s="";o.expires&&("number"==typeof o.expires||o.expires.toUTCString)&&("number"==typeof o.expires?(_=new Date).setTime(_.getTime()+24*o.expires*60*60*1e3):_=o.expires,s="; expires="+_.toUTCString());var d=o.path?"; path="+o.path:"",r=o.domain?"; domain="+o.domain:"",c=o.secure?"; secure":"";document.cookie=[t,"=",encodeURIComponent(e),s,d,r,c].join("")}});