define(function (require, exports, module) {
  'use strict';

  var $ = require('jquery');
  var siteCfg = require('config/config');
  var siteFun = require('config/function');
  require('zui');
  require('tabs');
  var cookie = require('config/cookie');

  var pub = {};

  pub.init = function () {
    ajax_get_menu();
    tree_change();
    tab_rander();
    ajax_get_wx_logout();
  }

  var ajax_get_wx_logout = function () {
    $('#wxLogout').click(function () {
      ajax_wx_logout();
    })
  }

  /*禁用a標籤跳轉 */
  var tree_change = function () {
    $("#treeMenu").on("click", "a", function (e) {
      e.preventDefault();
      if ($(this).attr('href') !== '#') {
        var myTabs = $('#tabs').data('zui.tabs');
        var myTab = {
          id: 'tab_item' + $(this).attr('data-id'),
          url: $(this).attr('href'),
          type: 'iframe',
          title: $(this).html(),
          defaultTitle: $(this).html()
        }
        myTabs.open(myTab);
      }
      $("#treeMenu li.active").removeClass("active");
      $(this).closest("li").addClass("active");
    })
  }
  /*禁用a標籤跳轉 */

  /*渲染樹狀菜單 */
  var tree_rander = function (myTreeData) {
    $('#treeMenu').tree({
      data: myTreeData
    });
    $('#treeMenu .has-list:eq(0)').addClass("active");
  }

  var tab_rander = function () {
    var tabs = [{
      id: 'tab_item6',
      title: '管理员列表',
      url: '/admin/admin_list',
      type: 'iframe'
    }];
    // 初始化标签页管理器
    $('#tabs').tabs({
      tabs: tabs
    });

  }
  /*渲染樹狀菜單 */

  /*獲取樹狀菜單 */
  var get_menu_list = function (returnData) {
    var data = returnData.data;
    console.log(data);
    // var nameList = [];
    var myTreeData = [];
    for (var x in data) {
      console.log(data[x]);
      // nameList.push(data[x]);
      for (var i = 0; i < data[x].action.length; i++) {
        console.log(data[x].action[i]);
        var childrenMenu = get_sub_menu(data[x].action, x - 1);
        var listName = {
          html: '<a href="#"><i class=' + data[x].action[i].iconCls + '></i>' + data[x].Name + '</a>',
          url: '#',
          children: childrenMenu
        };
      }
      myTreeData.push(listName);

    }
    // var myTreeData = [];
    // for (var i = 0; i < nameList.length; i++) {
    //   var childrenMenu = get_sub_menu(nameList[i].action, i);
    //   var listName = {
    //     html: '<a href="#"><i class=' + nameList[i].iconCls + '></i>' + nameList[i].Name + '</a>',
    //     url: '#',
    //     children: childrenMenu
    //   };
    //   myTreeData.push(listName);
    // }
    // console.log(myTreeData);
    return myTreeData;
  }
  /*獲取樹狀菜單 */

  /*獲取樹狀菜單子項 */
  var get_sub_menu = function (menuList, number) {
    var childrenList = [];
    var cookieList = [];
    // console.log(menuList,number)
    for (var i = 0; i < menuList.length; i++) {
      if (menuList[i].IsShow === 1) {
        childrenList.push(menuList[i]);
      } else {
        cookieList.push(menuList[i]);
      }
    }
    for (var i = 0; i < cookieList.length; i++) {
      if (cookieList[i].ActionColumnId == (number + 1)) {
        cookie(cookieList[i].ActionUrl, cookieList[i].ActionUrl)
      }
    }
    var actionList = [];
    for (var i = 0; i < childrenList.length; i++) {
      if (childrenList[i].ActionColumnId == (number + 1)) {
        var actList = {
          html: '<a href=' + childrenList[i].ActionUrl + ' data-id=' + childrenList[i].Id + ' >' + childrenList[i].ActionName + '</a>',
          url: '#'
        }
        actionList.push(actList);
      }
    }
    // console.log(actionList);
    return actionList;
  }
  /*獲取樹狀菜單子項 */

  /*獲取標籤頁 */
  var get_tabs_list = function (returnData) {
    var data = returnData.data;
    var tabsList = [];
    for (var x in data) {
      tabsList.push(data[x]);
    }
    var myTabsData = [];
    for (var i = 0; i < tabsList.length; i++) {
      var tabsArr = tabsList[i].action;
      for (var j = 0; j < tabsArr.length; j++) {
        if (tabsArr[j].ActionColumnId == (i + 1)) {
          var tabList = {
            title: tabsArr[j].ActionName,
            url: tabsArr[j].ActionUrl,
            type: 'auto',
          }
          myTabsData.push(tabList);
        }
      }
    }
    // console.log(myTabsData);
    return myTabsData;
  }
  /*獲取標籤頁 */

  /*微信登出 */
  var ajax_wx_logout = function (callbackFun, errorCallbackFun) {
    $.ajax({
      type: 'GET',
      url: siteCfg.REQUEST_URL.LOGOUT,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function (returnData) {
        if (returnData.status === true) {
          location.href = "http://manageweb.qiujm.7391test.com/login.html";
        } else {
          siteFun.show_error_tip(returnData.info);
        }
      }
    })
  }
  /*微信登出 */

  /*獲取權限數據 */
  var ajax_get_menu = function () {
    $.ajax({
      type: 'GET',
      url: siteCfg.REQUEST_URL.MENU_LIST,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: function (returnData) {
        if (returnData.status === true) {
          console.log(returnData);
          var myTreeData = get_menu_list(returnData);
          tree_rander(myTreeData);
          get_tabs_list(returnData);
        } else {
          siteFun.show_error_tip(returnData.info);
          location.href = "http://manageweb.qiujm.7391test.com/login.html";
        }
      }
    })
  }
  /*獲取權限數據 */

  module.exports = pub;
})