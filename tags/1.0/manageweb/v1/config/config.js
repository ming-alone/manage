define(function (require, exports, module) {
    'use strict';

    var DOMAIN_SITE = seajs.data.vars._DOMIAN_SITE;
    var PASSPORT_SITE = seajs.data.vars._PASSPORT_SITE;
    exports.DOMAIN_SITE = DOMAIN_SITE;
    exports.PASSPORT_SITE = PASSPORT_SITE;
    exports.REQUEST_URL = {
        LOGIN: PASSPORT_SITE + 'passport/work_wechat_callback.html',
        LOGOUT: PASSPORT_SITE + 'passport/logout.html',
        UPLOAD: PASSPORT_SITE + 'i7391_CMS/common/upload.html',
        MENU_LIST: PASSPORT_SITE + 'common/get_menu_list.html',
        GROUP_LIST: PASSPORT_SITE + 'admin/group_list.html',
        GROUP_ADD: PASSPORT_SITE + 'admin/group_add.html',
        GROUP_EDIT: PASSPORT_SITE + 'admin/group_edit.html',
        GROUP_DELETE: PASSPORT_SITE + 'admin/group_delete.html',
        GET_GROUP_INFO: PASSPORT_SITE + 'admin/group_edit.html?action=getGroupInfo',
        JQ_GET_DATA: PASSPORT_SITE + 'admin/group_authority_edit.html?action=jqGetData',
        GROUP_AUTHORITY_EIDT: PASSPORT_SITE + 'admin/group_authority_edit.html',
        ADMIN_LIST: PASSPORT_SITE + 'admin/admin_list.html',
        ADMIN_ADD: PASSPORT_SITE + 'admin/admin_add.html',
        ADMIN_EDIT: PASSPORT_SITE + 'admin/admin_edit.html',
        ADMIN_DELETE: PASSPORT_SITE + 'admin/admin_delete.html',
        ADMIN_WX_BIND: PASSPORT_SITE + 'wxqr/admin_bind.html',
        ADMIN_WX_UNBIND: PASSPORT_SITE + 'admin/wx_unbind.html',
        GET_ADMIN_INFO: PASSPORT_SITE + 'admin/admin_edit.html?action=getAdminInfo',
        GET_GROUP_LIST: PASSPORT_SITE + 'admin/admin_add.html?action=getGroupList',
        BANNER_LOGIN_LIST: PASSPORT_SITE + 'i7391_CMS/banner_pc/banner_login_list.html',
        BANNER_LOGIN_ADD: PASSPORT_SITE + 'i7391_CMS/banner_pc/banner_login_add.html',
        BANNER_LOGIN_EDIT: PASSPORT_SITE + 'i7391_CMS/banner_pc/banner_login_edit.html',
        BANNER_LOGIN_DELETE: PASSPORT_SITE + 'i7391_CMS/banner_pc/banner_login_delete.html',
        GET_BANNER_INFO: PASSPORT_SITE + 'i7391_CMS/banner_pc/banner_login_edit.html?action=getBannerInfo',
        BANNER_LOGIN_FOOTER_LIST: PASSPORT_SITE + 'i7391_CMS/banner_pc/banner_login_footer_list.html',
        BANNER_LOGIN_FOOTER_ADD: PASSPORT_SITE + '/i7391_CMS/banner_pc/banner_login_footer_add.html',
        BANNER_LOGIN_FOOTER_EDIT: PASSPORT_SITE + '/i7391_CMS/banner_pc/banner_login_footer_edit.html',
        BANNER_LOGIN_FOOTER_DELETE: PASSPORT_SITE + '/i7391_CMS/banner_pc/banner_login_footer_delete.html',
        GET_FOOTER_INFO: PASSPORT_SITE + 'i7391_CMS/banner_pc/banner_login_footer_edit.html?action=getBannerInfo',
        CAROUSEL_LIST: PASSPORT_SITE + 'i7391_CMS/carousel/carousel_list.html',
        CAROUSEL_ADD: PASSPORT_SITE + 'i7391_CMS/carousel/carousel_add.html',
        CAROUSEL_EDIT: PASSPORT_SITE + 'i7391_CMS/carousel/carousel_edit.html',
        CAROUSEL_DELETE: PASSPORT_SITE + 'i7391_CMS/carousel/carousel_delete.html',
        GET_CAROUSEL_INFO: PASSPORT_SITE + 'i7391_CMS/carousel/carousel_edit.html?action=getCarouselInfo',
        GAME_LIST: PASSPORT_SITE + 'i7391_CMS/game/game_list.html',
        GAME_ADD: PASSPORT_SITE + 'i7391_CMS/game/game_add.html',
        GAME_EDIT: PASSPORT_SITE + 'i7391_CMS/game/game_edit.html',
        GAME_DELETE: PASSPORT_SITE + 'i7391_CMS/game/game_detele.html',
        GET_GAME_INFO: PASSPORT_SITE + 'i7391_CMS/game/game_edit.html?action=getGameInfo',
        POINTCARD_LIST: PASSPORT_SITE + 'i7391_CMS/pointcard/pointcard_list.html',
        POINTCARD_ADD: PASSPORT_SITE + 'i7391_CMS/pointcard/pointcard_add.html',
        POINTCARD_EDIT: PASSPORT_SITE + 'i7391_CMS/pointcard/pointcard_edit.html',
        POINTCARD_DELETE: PASSPORT_SITE + 'i7391_CMS/pointcard/pointcard_delete.html',
        GET_POINTCARD_INFO: PASSPORT_SITE + 'i7391_CMS/pointcard/pointcard_edit.html?action=getPointcardInfo',
        MOBILEGAME_LIST: PASSPORT_SITE + 'i7391_CMS/mobilegame/mobilegame_list.html',
        MOBILEGAME_ADD: PASSPORT_SITE + 'i7391_CMS/mobilegame/mobilegame_add.html',
        MOBILEGAME_EDIT: PASSPORT_SITE + 'i7391_CMS/mobilegame/mobilegame_edit.html',
        MOBILEGAME_DELETE: PASSPORT_SITE + 'i7391_CMS/mobilegame/mobilegame_delete.html',
        GET_MOBILEGAME_INFO: PASSPORT_SITE + 'i7391_CMS/mobilegame/mobilegame_edit.html?action=getMobileGameInfo',
        GOODS_LIST: PASSPORT_SITE + 'i7391_CMS/goods/goods_list.html',
        GOODS_ADD: PASSPORT_SITE + 'i7391_CMS/goods/goods_add.html',
        GOODS_EDIT: PASSPORT_SITE + 'i7391_CMS/goods/goods_edit.html',
        GOODS_DELETE: PASSPORT_SITE + 'i7391_CMS/goods/goods_detele.html',
        GET_GOODS_INFO: PASSPORT_SITE + 'i7391_CMS/goods/goods_edit.html?action=getGoodsInfo',
        GOODS_PC_LIST: PASSPORT_SITE + 'i7391_CMS/goods_pc/goods_list.html',
        GOODS_PC_ADD: PASSPORT_SITE + 'i7391_CMS/goods_pc/goods_add.html',
        GOODS_PC_EDIT: PASSPORT_SITE + 'i7391_CMS/goods_pc/goods_edit.html',
        GOODS_PC_DELETE: PASSPORT_SITE + 'i7391_CMS/goods_pc/goods_detele.html',
        GET_GOODS_PC_INFO: PASSPORT_SITE + 'i7391_CMS/goods_pc/goods_edit.html?action=getGoodsInfo',
        GET_RECORD: PASSPORT_SITE + '8591/contrast/game_contrast.html?action=getRecord',
        GAME_CONTRAST: PASSPORT_SITE + '8591/contrast/game_contrast.html',
        GET_ALLGAME_DATA: PASSPORT_SITE + 'i7391_API/getdata/get_allgame_data.html',
        GET_GAMETYPE_DATA: PASSPORT_SITE + 'i7391_API/getdata/get_gametype_data',
        GET_RATE: PASSPORT_SITE + 'i7391_API/getdata/get_rate.html',
        GET_CARD_CATEGORY: PASSPORT_SITE + 'i7391_API/getdata/get_card_category.html',
        GET_CARD_POINT: PASSPORT_SITE + 'i7391_API/getdata/get_card_point.html'
    }
})