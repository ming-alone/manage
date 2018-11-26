define("admin/admin_list/admin_list",["jquery","zui","grids","config/config","config/function"],function(require,exports,module){"use strict";var c=require("jquery");require("zui"),require("grids");var n=require("config/config"),i=require("config/function"),t={init:function(){e(),s(),p(),m(),b(),I(),D(),S()}},e=function(){a(l,i.show_error_tip)},a=function(e,a){c.ajax({type:"GET",url:n.REQUEST_URL.ADMIN_LIST,dataType:"json",xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){t.rows&&""!=t.rows?c.isFunction(e)&&e(t):c.errorFunction(e)&&a(t.info)}})},o=function(){var s=[];c.ajax({type:"GET",url:n.REQUEST_URL.ADMIN_LIST,dataType:"json",xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){for(var e=t.rows,a=0;a<e.length;a++){var i=1==e[a].cell.Status?"正常":"鎖定",n=""==e[a].cell.WxUserId||null==e[a].cell.WxUserId?"繫結":"解綁",o=""==e[a].cell.WxUserId||null==e[a].cell.WxUserId?"bind":"unbind",l={GroupName:e[a].cell.GroupName,WxUserId:e[a].cell.WxUserId,Status:i,UserName:e[a].cell.UserName,option:'<div class="btn-group"><button data-id='+e[a].cell.UserId+' class="btn edit">編輯</button><button data-id='+e[a].cell.UserId+' class="btn del">刪除</button><button data-id='+e[a].cell.UserId+' class="btn '+o+'">'+n+"</button></div>"};s.push(l)}}});var e=parseInt(c('#datagridPageExample li[class="active"] .pager-item').html()),a=c("#datagridPageExample").data("zui.datagrid");a.setDataSource(s),a.render(),c("#datagridPageExample").on("onRender",function(t){a.setPager(e)})},l=function(t){for(var e=t.rows,a=[],i=0;i<e.length;i++){var n=1==e[i].cell.Status?"正常":"鎖定",o=""==e[i].cell.WxUserId||null==e[i].cell.WxUserId?"繫結":"解绑",l=""==e[i].cell.WxUserId||null==e[i].cell.WxUserId?"bind":"unbind",s={GroupName:e[i].cell.GroupName,UserName:e[i].cell.UserName,WxUserId:e[i].cell.WxUserId,Status:n,option:'<div class="btn-group"><button data-id='+e[i].cell.UserId+' class="btn edit">編輯</button><button data-id='+e[i].cell.UserId+' class="btn del">刪除</button><button data-id='+e[i].cell.UserId+' class="btn '+l+'">'+o+"</button></div>"};a.push(s)}c("#datagridPageExample").datagrid({dataSource:{cols:[{name:"GroupName",label:"組名"},{name:"UserName",label:"使用者名稱"},{name:"WxUserId",label:"微信ID"},{name:"Status",label:"狀態"},{name:"option",label:"操作",html:!0}],array:a},states:{pager:{page:t.page,recPerPage:10}},configs:{R0C0:{label:'<input type="checkbox" id="checkAll">',html:!0},C0:{label:'<input type="checkbox" class="che">',html:!0}},sortable:!0,height:"page"})},s=function(){c(document).on("click",'[href="admin/admin_add"]',function(){d(r,i.show_error_tip)})},d=function(e,a){c.ajax({type:"GET",url:n.REQUEST_URL.GET_GROUP_LIST,dataType:"json",xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){!0===t.status?c.isFunction(e)&&e(t):c.isFunction(a)&&a(t.info)}})},r=function(t){new c.zui.ModalTrigger({width:"auto",height:"auto",className:"in_auto",title:"新增管理員",custom:'<div id="datagridModel" class="datagrid"><div class="input-control search-box search-box-circle has-icon-left has-icon-right" id="searchboxExample" style="margin-bottom: 10px; max-width: 300px"><input id="inputSearchExample" type="search" class="form-control search-input" placeholder="搜尋"><label for="inputSearchExample" class="input-control-icon-left search-icon"><i class="icon icon-search"></i></label><a href="#" class="input-control-icon-right search-clear-btn"><i class="icon icon-remove"></i></a></div><div class="datagrid-container"></div><div class="pager"></div></div><div class="input-control has-label-left-lg"><input id="adminNameInput" type="text" class="form-control" placeholder=""><label for="adminNameInput" class="input-control-label-left text-right">管理員姓名</label></div><div class="input-control has-label-left-lg"><input id="groupIdInput" type="text" class="form-control" placeholder=""><label for="groupIdInput" class="input-control-label-left text-right">組ID</label></div><div class="switch"><input id="adminCheckInput" type="checkbox"><label>鎖定</label></div><button id="adminAddButton" class="btn btn-block btn-primary disabled up" type="button">新增</button>',backdrop:"static"}).show(),u(t)},u=function(t){for(var e=t.data,a=[],i=0;i<e.length;i++){var n={Id:e[i].Id,GroupName:e[i].GroupName,GroupInfo:e[i].GroupInfo};a.push(n)}c("#datagridModel").datagrid({dataSource:{cols:[{name:"Id",label:"管理員組ID"},{name:"GroupName",label:"管理員組名稱"},{name:"GroupInfo",label:"組描述"}],array:a},states:{pager:{page:1,recPerPage:5}},showRowIndex:!1,sortable:!0,height:"page"})},p=function(){c(document).on("click","#adminAddButton",function(){_(i.show_success_tip,i.show_error_tip)})},_=function(e,a){var t={userName:c("#adminNameInput").val(),groupId:c("#groupIdInput").val(),status:1==c("#adminCheckInput").prop("checked")?0:1};c("#adminCheckInput").addClass("disabled"),c.ajax({type:"POST",url:n.REQUEST_URL.ADMIN_ADD,dataType:"json",data:t,xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){!0===t.status?(c.isFunction(e)&&e(t.info),o()):c.isFunction(a)&&a(t.info),c("#adminCheckInput").removeClass("disabled")}})},m=function(){c(document).on("click",".edit",function(t){t.stopPropagation();var e=c(this).attr("data-id");h(e,g,i.show_error_tip)})},h=function(t,e,a){var i={adminId:t};c.ajax({type:"GET",url:n.REQUEST_URL.GET_ADMIN_INFO,dataType:"json",data:i,xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){!0===t.status?(c.isFunction(e)&&e(t),d(u)):c.isFunction(a)&&a(t.info)}})},g=function(t){var e=t.data,a=0==e.Status?"checked":"",i='<div id="datagridModel" class="datagrid"><div class="input-control search-box search-box-circle has-icon-left has-icon-right" id="searchboxExample" style="margin-bottom: 10px; max-width: 300px"><input id="inputSearchExample" type="search" class="form-control search-input" placeholder="搜尋"><label for="inputSearchExample" class="input-control-icon-left search-icon"><i class="icon icon-search"></i></label><a href="#" class="input-control-icon-right search-clear-btn"><i class="icon icon-remove"></i></a></div><div class="datagrid-container"></div><div class="pager"></div></div><div class="input-control has-label-left-lg"><input id="adminNameInput" type="text" class="form-control" value='+e.UserName+' placeholder=""><label for="adminNameInput" class="input-control-label-left text-right">管理員姓名</label></div><div class="input-control has-label-left-lg"><input id="groupIdInput" type="text" class="form-control" value='+e.GroupId+' placeholder=""><label for="groupIdInput" class="input-control-label-left text-right">組ID</label></div><div class="switch"><input id="groupCheckInput" type="checkbox" '+a+'><label>鎖定</label></div><button id="adminEditButton" data-id='+e.UserId+' class="btn btn-block btn-primary up" type="button">儲存</button>';new c.zui.ModalTrigger({width:"auto",height:"auto",className:"in_auto",title:"編輯管理員",custom:i,backdrop:"static"}).show()},b=function(){c(document).on("click","#adminEditButton",function(){var t=c(this).attr("data-id");f(t,i.show_success_tip,i.show_error_tip)})},f=function(t,e,a){var i={adminId:t,userName:c("#adminNameInput").val(),groupId:c("#groupIdInput").val(),status:1==c("#adminCheckInput").prop("checked")?0:1};c.ajax({type:"POST",url:n.REQUEST_URL.ADMIN_EDIT,dataType:"json",data:i,xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){!0===t.status?(c.isFunction(e)&&e(t.info),o()):c.isFunction(a)&&a(t.info)}})},I=function(){c(document).on("click",".del",function(t){t.stopPropagation();var e=c(this).attr("data-id");v(e)}),E()},E=function(){c(document).on("click","#confirm",function(){var t=c(this).attr("data-id");T(t,i.show_success_tip,i.show_error_tip)}),c(document).on("click","#cancel",function(){})},v=function(t){var e='<h4>確認要刪除嗎?</h4><hr/><button type="button" data-id='+t+' data-dismiss="modal" id="confirm" class="btn btn-block btn-primary">確定</button><button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>';new c.zui.ModalTrigger({width:"300px",height:"auto",className:"in_auto",title:"刪除管理員",custom:e,backdrop:"static"}).show()},T=function(t,e,a){var i={idString:t};c.ajax({type:"GET",url:n.REQUEST_URL.ADMIN_DELETE,dataType:"json",data:i,xhrFields:{withCredentials:!0},crossDomain:!0,success:function(t){!0===t.status?(c.isFunction(e)&&e(t.info),o()):c.isFunction(a)&&a(t.info)}})},S=function(){c(document).on("click",'a[href="admin/admin_delete"]',function(t){x()}),c(document).on("click","#continue",function(){for(var t=c(".che:checked").parents(".datagrid-row").find(".del"),e=[],a=0;a<t.length;a++)e.push(parseInt(t[a].getAttribute("data-id")));if(0===e.length)return i.show_error_tip("請選擇要刪除的管理員"),!1;T(e.toString(),i.show_success_tip,i.show_error_tip)})},x=function(){new c.zui.ModalTrigger({width:"300px",height:"auto",className:"in_auto",title:"刪除管理員",custom:'<h4>確認要刪除所選的管理員嗎?</h4><hr/><button type="button" data-dismiss="modal" id="continue" class="btn btn-block btn-primary">確定</button><button type="button" data-dismiss="modal" id="cancel" class="btn btn-block btn-primary">取消</button>',backdrop:"static"}).show()},D=function(){c(document).on("click",".bind",function(t){t.stopPropagation();var e=c(this).attr("data-id");window.location.href="http://manageweb.qiujm.7391test.com/bind.html?adminId="+e})};module.exports=t}),define("config/config",[],function(require,exports,module){"use strict";var t=seajs.data.vars._DOMIAN_SITE,e=seajs.data.vars._PASSPORT_SITE;exports.DOMAIN_SITE=t,exports.PASSPORT_SITE=e,exports.REQUEST_URL={LOGIN:e+"passport/work_wechat_callback.html",LOGOUT:e+"passport/logout.html",UPLOAD:e+"i7391_CMS/common/upload.html",MENU_LIST:e+"common/get_menu_list.html",GROUP_LIST:e+"admin/group_list.html",GROUP_ADD:e+"admin/group_add.html",GROUP_EDIT:e+"admin/group_edit.html",GROUP_DELETE:e+"admin/group_delete.html",GET_GROUP_INFO:e+"admin/group_edit.html?action=getGroupInfo",JQ_GET_DATA:e+"admin/group_authority_edit.html?action=jqGetData",GROUP_AUTHORITY_EIDT:e+"admin/group_authority_edit.html",ADMIN_LIST:e+"admin/admin_list.html",ADMIN_ADD:e+"admin/admin_add.html",ADMIN_EDIT:e+"admin/admin_edit.html",ADMIN_DELETE:e+"admin/admin_delete.html",ADMIN_WX_BIND:e+"wxqr/admin_bind.html",ADMIN_WX_UNBIND:e+"admin/wx_unbind.html",GET_ADMIN_INFO:e+"admin/admin_edit.html?action=getAdminInfo",GET_GROUP_LIST:e+"admin/admin_add.html?action=getGroupList",BANNER_LOGIN_LIST:e+"i7391_CMS/banner_pc/banner_login_list.html",BANNER_LOGIN_ADD:e+"i7391_CMS/banner_pc/banner_login_add.html",BANNER_LOGIN_EDIT:e+"i7391_CMS/banner_pc/banner_login_edit.html",BANNER_LOGIN_DELETE:e+"i7391_CMS/banner_pc/banner_login_delete.html",GET_BANNER_INFO:e+"i7391_CMS/banner_pc/banner_login_edit.html?action=getBannerInfo",BANNER_LOGIN_FOOTER_LIST:e+"i7391_CMS/banner_pc/banner_login_footer_list.html",BANNER_LOGIN_FOOTER_ADD:e+"/i7391_CMS/banner_pc/banner_login_footer_add.html",BANNER_LOGIN_FOOTER_EDIT:e+"/i7391_CMS/banner_pc/banner_login_footer_edit.html",BANNER_LOGIN_FOOTER_DELETE:e+"/i7391_CMS/banner_pc/banner_login_footer_delete.html",GET_FOOTER_INFO:e+"i7391_CMS/banner_pc/banner_login_footer_edit.html?action=getBannerInfo",CAROUSEL_LIST:e+"i7391_CMS/carousel/carousel_list.html",CAROUSEL_ADD:e+"i7391_CMS/carousel/carousel_add.html",CAROUSEL_EDIT:e+"i7391_CMS/carousel/carousel_edit.html",CAROUSEL_DELETE:e+"i7391_CMS/carousel/carousel_delete.html",GET_CAROUSEL_INFO:e+"i7391_CMS/carousel/carousel_edit.html?action=getCarouselInfo",GAME_LIST:e+"i7391_CMS/game/game_list.html",GAME_ADD:e+"i7391_CMS/game/game_add.html",GAME_EDIT:e+"i7391_CMS/game/game_edit.html",GAME_DELETE:e+"i7391_CMS/game/game_detele.html",GET_GAME_INFO:e+"i7391_CMS/game/game_edit.html?action=getGameInfo",POINTCARD_LIST:e+"i7391_CMS/pointcard/pointcard_list.html",POINTCARD_ADD:e+"i7391_CMS/pointcard/pointcard_add.html",POINTCARD_EDIT:e+"i7391_CMS/pointcard/pointcard_edit.html",POINTCARD_DELETE:e+"i7391_CMS/pointcard/pointcard_delete.html",GET_POINTCARD_INFO:e+"i7391_CMS/pointcard/pointcard_edit.html?action=getPointcardInfo",MOBILEGAME_LIST:e+"i7391_CMS/mobilegame/mobilegame_list.html",MOBILEGAME_ADD:e+"i7391_CMS/mobilegame/mobilegame_add.html",MOBILEGAME_EDIT:e+"i7391_CMS/mobilegame/mobilegame_edit.html",MOBILEGAME_DELETE:e+"i7391_CMS/mobilegame/mobilegame_delete.html",GET_MOBILEGAME_INFO:e+"i7391_CMS/mobilegame/mobilegame_edit.html?action=getMobileGameInfo",GOODS_LIST:e+"i7391_CMS/goods/goods_list.html",GOODS_ADD:e+"i7391_CMS/goods/goods_add.html",GOODS_EDIT:e+"i7391_CMS/goods/goods_edit.html",GOODS_DELETE:e+"i7391_CMS/goods/goods_detele.html",GET_GOODS_INFO:e+"i7391_CMS/goods/goods_edit.html?action=getGoodsInfo",GOODS_PC_LIST:e+"i7391_CMS/goods_pc/goods_list.html",GOODS_PC_ADD:e+"i7391_CMS/goods_pc/goods_add.html",GOODS_PC_EDIT:e+"i7391_CMS/goods_pc/goods_edit.html",GOODS_PC_DELETE:e+"i7391_CMS/goods_pc/goods_detele.html",GET_GOODS_PC_INFO:e+"i7391_CMS/goods_pc/goods_edit.html?action=getGoodsInfo",GET_RECORD:e+"8591/contrast/game_contrast.html?action=getRecord",GAME_CONTRAST:e+"8591/contrast/game_contrast.html",GET_ADDGAME_DATA:e+"i7391_API/getdata/get_allgame_data.html",GET_GAMETYPE_DATA:e+"i7391_API/getdata/get_gametype_data",GET_RATE:e+"i7391_API/getdata/get_rate.html",GET_CARD_CATEORY:e+"i7391_API/getdata/get_card_category.html",GET_CARD_POINT:e+"i7391_API/getdata/get_card_point.html"}}),define("config/function",["jquery","zui","config/config","config/cookie"],function(require,exports,module){"use strict";var i=require("jquery");require("zui");var t=require("config/config"),l=require("config/cookie");i.ajaxSetup({error:function(t,e,a){var i="介面出錯: "+t.status;i+="<br /> 介面: "+this.url,i+="<br /> 方式: "+this.type,i+="<br /> 資料: "+this.data,n.show(i)},beforeSend:function(t){i("#ajax_loading").removeClass("hidden").addClass("show")},complete:function(t,e){i("#ajax_loading").removeClass("show").addClass("hidden")}}),i(".nav").on("click","li",function(t){t.preventDefault()}),i(document).on("click","#checkAll",function(){var t=i(this).prop("checked");i(".che").prop("checked",t)}),i(document).on("click",".che",function(){i(".che").length==i(".che:checked").length?i("#checkAll").prop("checked",!0):i("#checkAll").prop("checked",!1)}),i(document).keydown(function(t){switch(t.keyCode){case 13:case 32:return!1}}),i(document).on("input porpertychange",'input[type="text"]',function(t){i(this).tooltip("destroy");var e=i('input[type="text"]');""==i(this).val()&&i(this).tooltip("show","請填寫"+i(this).next().html());for(var a=0;a<e.length;a++){if(""==e[a].value){i(".up").addClass("disabled");break}i(".up").removeClass("disabled")}});exports.show_picture_upload=function(){return'<div id="tableUploader" class="uploader"><div class="uploader-message text-center"><div class="content"></div><button type="button" class="close">×</button></div><table class="table table-bordered"><thead><tr><th colspan="2">檔名</th><th style="width: 100px">大小</th><th style="width: 160px; text-align: center;">狀態/操作</th></tr></thead><tbody class="uploader-files"><tr class="file template"><td style="width: 38px; padding: 3px"><div class="file-icon"></div></td><td style="padding: 0"><div style="position: relative; padding: 8px;"><strong class="file-name"></strong><div class="file-progress-bar"></div></div></td><td><span class="file-size text-muted"></span></td><td class="actions text-right" style="padding: 0 4px;"><div class="file-status" data-toggle="tooltip" style="margin: 8px;"><i class="icon"></i> <span class="text"></span></div><a data-toggle="tooltip" class="btn btn-link btn-download-file" target="_blank"><i class="icon icon-download-alt"></i></a><button type="button" data-toggle="tooltip" class="btn btn-link btn-reset-file" title="Repeat"><i class="icon icon-repeat"></i></button><button type="button" data-toggle="tooltip" class="btn btn-link btn-rename-file" title="Rename"><i class="icon icon-pencil"></i></button><button type="button" data-toggle="tooltip" title="Remove" class="btn btn-link btn-delete-file"><i class="icon icon-trash text-danger"></i></button></td></tr></tbody><tfoot><tr><td colspan="4" style="padding: 4px 0"><div style="position: relative;"><div class="uploader-status pull-right text-muted" style="margin-top: 5px;"></div><button type="button" class="btn btn-link uploader-btn-browse"><i class="icon icon-plus"></i> 選擇檔案</button><button type="button" class="btn btn-link uploader-btn-start"><i class="icon icon-cloud-upload"></i> 開始上傳</button></div></td></tr></tfoot></table></div>'};exports.show_upload_options=function(){i("#tableUploader").uploader({url:t.REQUEST_URL.UPLOAD,lang:"zh_tw",filters:{mime_types:[{title:"圖片",extensions:"jpg,gif,png"}]},limitFilesCount:1,deleteActionOnDone:function(t,e){e()},onFileUploaded:function(t,e){var a=JSON.parse(e.response);i("#imgUrlInput").val(a.data)}})};exports.show_picture_tooltip=function(){i(document).on("mouseover",".pic-show:not(:eq(0))",function(){i(this).tooltip("destroy");var t=i(this).html(),e=/^\/\//;!0===e.test(t)&&(t=t.replace(e,"http://"));var a="<img src="+t+' class="img-rounded">';i('[data-toggle="tooltip"]').tooltip({container:"#datagridPageExample",placement:"right",html:!0,title:a}),i(this).tooltip("show",a)})};var n=new i.zui.Messager("",{type:"danger",icon:"exclamation-sign",cssClass:"my-messager",contentClass:"my-messager-content",placement:"center",time:!0===seajs.data.debug?1e4:4e3});exports.get_user_i7391_cookie=function(t){var e=[],a=l("User_Cookie_Name");if(null===a||""===a)return!1;var i=a.split("&");for(var n in i){var o=i[n].split("=");e[o[0]]=o[1]}return void 0!==e[t]&&e[t]},exports.getUrlParam=function(t){var e=window.location.hash.match(new RegExp("(?:#|&)"+t+"=([^&]*)(&|$)"));return(e?decodeURIComponent(e[1]):"")||function(t,e){e||(e=window.location.href);t=t.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(e);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null}(t)};exports.show_error_tip=function(t){var e=t;new i.zui.Messager({type:"danger",time:2e3,close:!1}).show(e)};exports.show_success_tip=function(t){var e=t;new i.zui.Messager({type:"success",time:2e3,close:!1}).show(e)}}),define("config/cookie",["jquery"],function(require,exports,module){"use strict";var p=require("jquery");module.exports=function(t,e,a){if(void 0===e){var i=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),o=0;o<n.length;o++){var l=p.trim(n[o]);if(l.substring(0,t.length+1)==t+"="){i=decodeURIComponent(l.substring(t.length+1));break}}return i}a=a||{},null===e&&(e="",a.expires=-1);var s,c="";a.expires&&("number"==typeof a.expires||a.expires.toUTCString)&&("number"==typeof a.expires?(s=new Date).setTime(s.getTime()+24*a.expires*60*60*1e3):s=a.expires,c="; expires="+s.toUTCString());var d=a.path?"; path="+a.path:"",r=a.domain?"; domain="+a.domain:"",u=a.secure?"; secure":"";document.cookie=[t,"=",encodeURIComponent(e),c,d,r,u].join("")}});