define("config/config",[],function(require,exports,module){"use strict";var _,t,e,a,o=seajs.data.vars._DEVELOPER;switch(seajs.data.vars._ENV){case 0:_=".i7391.com/",e="1000004",a="http://manageweb.i7391.com/",t="http://api-tools.i7391.com/";break;case-1:switch(_=".7391test.com/",o){case"qiujm":t="http://tools.lik.7391test.com/",e="1000011",a="http://manageweb.qiujm.7391test.com/";break;case"lik":t="http://tools.lik.7391test.com/",e="1000002",a="http://manageweb.lik.7391test.com/"}break;case-2:_=".7391test.com/",e="1000005",a="http://manageweb.7391test.com/",t="http://api-tools.7391test.com/"}console.log(t),exports.WORK_WECHAT_AGENTID=e,exports.WORK_WECHAT_RETURN_URL=a+"login_cb.html",exports.DOMAIN_SITE=_.slice,exports.API_TOOLS_SITE=t,exports.REQUEST_URL={LOGIN:t+"passport/work_wechat_callback.html",LOGOUT:t+"passport/logout.html",UPLOAD:t+"i7391_CMS/common/upload.html",MENU_LIST:t+"common/get_menu_list.html",GROUP_LIST:t+"admin/group_list.html",GROUP_ADD:t+"admin/group_add.html",GROUP_EDIT:t+"admin/group_edit.html",GROUP_DELETE:t+"admin/group_delete.html",GET_GROUP_INFO:t+"admin/group_edit.html?action=getGroupInfo",JQ_GET_DATA:t+"admin/group_authority_edit.html?action=jqGetData",GROUP_AUTHORITY_EIDT:t+"admin/group_authority_edit.html",ADMIN_LIST:t+"admin/admin_list.html",ADMIN_ADD:t+"admin/admin_add.html",ADMIN_EDIT:t+"admin/admin_edit.html",ADMIN_DELETE:t+"admin/admin_delete.html",ADMIN_WX_BIND:t+"wxqr/admin_bind.html",ADMIN_WX_UNBIND:t+"admin/wx_unbind.html",GET_ADMIN_INFO:t+"admin/admin_edit.html?action=getAdminInfo",GET_GROUP_LIST:t+"admin/admin_add.html?action=getGroupList",BANNER_LOGIN_LIST:t+"i7391_CMS/banner_pc/banner_login_list.html",BANNER_LOGIN_ADD:t+"i7391_CMS/banner_pc/banner_login_add.html",BANNER_LOGIN_EDIT:t+"i7391_CMS/banner_pc/banner_login_edit.html",BANNER_LOGIN_DELETE:t+"i7391_CMS/banner_pc/banner_login_delete.html",GET_BANNER_INFO:t+"i7391_CMS/banner_pc/banner_login_edit.html?action=getBannerInfo",BANNER_LOGIN_FOOTER_LIST:t+"i7391_CMS/banner_pc/banner_login_footer_list.html",BANNER_LOGIN_FOOTER_ADD:t+"/i7391_CMS/banner_pc/banner_login_footer_add.html",BANNER_LOGIN_FOOTER_EDIT:t+"/i7391_CMS/banner_pc/banner_login_footer_edit.html",BANNER_LOGIN_FOOTER_DELETE:t+"/i7391_CMS/banner_pc/banner_login_footer_delete.html",GET_FOOTER_INFO:t+"i7391_CMS/banner_pc/banner_login_footer_edit.html?action=getBannerInfo",CAROUSEL_LIST:t+"i7391_CMS/carousel/carousel_list.html",CAROUSEL_ADD:t+"i7391_CMS/carousel/carousel_add.html",CAROUSEL_EDIT:t+"i7391_CMS/carousel/carousel_edit.html",CAROUSEL_DELETE:t+"i7391_CMS/carousel/carousel_delete.html",GET_CAROUSEL_INFO:t+"i7391_CMS/carousel/carousel_edit.html?action=getCarouselInfo",GAME_LIST:t+"i7391_CMS/game/game_list.html",GAME_ADD:t+"i7391_CMS/game/game_add.html",GAME_EDIT:t+"i7391_CMS/game/game_edit.html",GAME_DELETE:t+"i7391_CMS/game/game_detele.html",GET_GAME_INFO:t+"i7391_CMS/game/game_edit.html?action=getGameInfo",POINTCARD_LIST:t+"i7391_CMS/pointcard/pointcard_list.html",POINTCARD_ADD:t+"i7391_CMS/pointcard/pointcard_add.html",POINTCARD_EDIT:t+"i7391_CMS/pointcard/pointcard_edit.html",POINTCARD_DELETE:t+"i7391_CMS/pointcard/pointcard_delete.html",GET_POINTCARD_INFO:t+"i7391_CMS/pointcard/pointcard_edit.html?action=getPointcardInfo",MOBILEGAME_LIST:t+"i7391_CMS/mobilegame/mobilegame_list.html",MOBILEGAME_ADD:t+"i7391_CMS/mobilegame/mobilegame_add.html",MOBILEGAME_EDIT:t+"i7391_CMS/mobilegame/mobilegame_edit.html",MOBILEGAME_DELETE:t+"i7391_CMS/mobilegame/mobilegame_delete.html",GET_MOBILEGAME_INFO:t+"i7391_CMS/mobilegame/mobilegame_edit.html?action=getMobileGameInfo",GOODS_LIST:t+"i7391_CMS/goods/goods_list.html",GOODS_ADD:t+"i7391_CMS/goods/goods_add.html",GOODS_EDIT:t+"i7391_CMS/goods/goods_edit.html",GOODS_DELETE:t+"i7391_CMS/goods/goods_detele.html",GET_GOODS_INFO:t+"i7391_CMS/goods/goods_edit.html?action=getGoodsInfo",GOODS_PC_LIST:t+"i7391_CMS/goods_pc/goods_list.html",GOODS_PC_ADD:t+"i7391_CMS/goods_pc/goods_add.html",GOODS_PC_EDIT:t+"i7391_CMS/goods_pc/goods_edit.html",GOODS_PC_DELETE:t+"i7391_CMS/goods_pc/goods_detele.html",GET_GOODS_PC_INFO:t+"i7391_CMS/goods_pc/goods_edit.html?action=getGoodsInfo",GET_RECORD:t+"8591/contrast/game_contrast.html?action=getRecord",GAME_CONTRAST:t+"8591/contrast/game_contrast.html",GET_ALLGAME_DATA:t+"i7391_API/getdata/get_allgame_data.html",GET_GAMETYPE_DATA:t+"i7391_API/getdata/get_gametype_data",GET_RATE:t+"i7391_API/getdata/get_rate.html",GET_CARD_CATEGORY:t+"i7391_API/getdata/get_card_category.html",GET_CARD_POINT:t+"i7391_API/getdata/get_card_point.html",CLEAN_DATA:"http://117.27.250.72:8081/_clean/res.php"}});