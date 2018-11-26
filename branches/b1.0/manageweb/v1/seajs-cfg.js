/**
 * seajs配置文件
 **/

var ver = '20180523'; //JS版本

function checkEnv(developers) {
  var env = 0;
  var host = window.location.host;
  for (var x in developers) {
    if (host.indexOf(developers[x]) > -1) {
      env = (window.location.protocol === 'https:') ? -2 : -1;
      break;
    } else {
      env = 0;
    }
  }
  return env;
}

var developerPath, jsLibPath, cssLibPath, cssPath,
  domain_site, passportSiteOld, passportSite, wapAPiSite, memberSiteOld,
  jsPath, basePath;

var developers = new Array('qiujm', 'test');

try {
  var env = checkEnv(developers, developer);
  switch (env) {
    case 0: //生产环境
      seajs.production = true;
      domain_sites = '.i7391.com';
      jsPath = 'manageweb/dist/';
      passportSite = 'http://tools.lik.7391test.com/';
      cssPath = 'css/';
      basePath = '//manageweb.i7391.com/';
      break;
    case -1: //开发模式
      var developer = window.location.host.split(".")[1];
      seajs.production = false;
      domain_sites = '.7391test.com';
      jsPath = 'manageweb/v1/';
      passportSite = 'http://tools.lik.7391test.com/';
      cssPath = 'css/';
      basePath = '//manageweb.' + developer + '.7391test.com/';
      break;
    case 2:
      seajs.production = false;
      domain_sites = '.7391test.com';
      jsPath = 'manageweb/v1/';
      passportSite = 'http://tools.lik.7391test.com/';
      basePath = '//manageweb.test.7391test.com/';
      cssPath = 'css/';
      break;
  }
} catch (e) {
  console.log(e);
}

seajs.config({
  base: basePath + jsPath,

  paths: {
    jsPath: '',
    JS_Site: ''
  },

  vars: {
    _VERSION: 'v1/',
    _DOMAIN_SITE: domain_sites,
    _PASSPORT_PATH: '',
    _PASSPORT_SITE: passportSite,
  },

  alias: {
    jquery: '//jscdn.i7391.com/jquery/1.11.1/jquery.min.js',
    zui: '//jscdn.i7391.com/zui/1.8.0/zui.min.js',
    tabs: 'config/zui.tabs.min.js',
    tables: 'config/zui.datatable.min.js',
    grids: 'config/zui.datagrid.min.js',
    uploads: 'config/zui.uploader.min.js',
    siteCfg: 'config/config.js',
    siteFun: 'config/function.js',
    cookie: 'config/cookie.js',
    manage: 'manage/manage.js',
    login: 'login/login.js',
    bind: 'bind/bind.js',
    bind_detail: 'bind/bind_detail.js',
    index: 'index.js',
    board: 'config/zui.board.min.js',
    chosen: 'config/chosen.min.js'
  },

  map: [
    ['.css', '.css?v=' + ver],
    ['.js', '.js?v=' + ver]
  ]
})