/**
 * seajs配置文件
 **/

var ver = '20180523'; //JS版本

function check_env(developers) {
    var host = document.domain;
    var arr = host.split('.');
    switch (arr.slice(-2).join('.')) {
        case 'i7391.com':
            return 0;
            break;
        case '7391test.com':
            var developer = arr.slice(-3)[0];
            for (var x in developers) {
                if (developers[x] === developer) {
                    return -1;
                }
            }
            return -2;
            break;
        case 'luckygobuy.com':
            return -3;
            break;
        default:
            return -1;
    }
}

seajs.production = false; //开发模式

var psl, jsPath, basePath;

var developers = new Array('lik', 'qiujm');

try {
    var env = check_env(developers, developer);
    switch (env) {
        case 0: //生产环境
            seajs.production = true;
            psl = '.i7391.com/'
            basePath = '//manageweb' + psl;
            jsPath = 'dist/';
            break;
        case -1: //开发
            var developer = document.domain == 'localhost' || document.domain == '127.0.0.1' ? 'qiujm' : document.domain.split('.').slice(-3)[0];
            psl = '.7391test.com/'
            basePath = '//manageweb.' + developer + psl;
            jsPath = 'src/';
            break;
        case -2: //测试
            psl = '.7391test.com/'
            basePath = '//manageweb' + psl;
            jsPath = 'dist/';
            break;
        case -3: //wh测试
            psl = '.luckygobuy.com/'
            basePath = '//manageweb' + psl;
            jsPath = 'dist/';
            break;
    }

} catch (e) {
    console.log(e);
}

seajs.config({
    base: basePath + 'js/' + jsPath,

    paths: {
        jsPath: '',
        JS_Site: ''
    },

    vars: {
        _ENV: env,
        _DEVELOPER: developer,
        _DOMAIN_SITE: psl
    },

    alias: {
        jquery: '//jscdn.i7391.com/jquery/1.11.1/jquery.min.js',
        zui: '//jscdn.i7391.com/zui/1.8.0/zui.min.js',
        clipboard: '//jscdn.i7391.com/clipboard/2.0.1/clipboard.min.js',
        tabs: 'lib/zui.tabs.min.js',
        tables: 'lib/zui.datatable.min.js',
        grids: 'lib/zui.datagrid.min.js',
        uploads: 'lib/zui.uploader.min.js',
        siteCfg: 'config/config.js',
        siteFun: 'config/function.js',
        cookie: 'lib/cookie.js',
        manage: 'manage/manage.js',
        login: 'login/login.js',
        bind: 'bind/bind.js',
        bind_detail: 'bind/bind_detail.js',
        index: 'index.js',
        board: 'lib/zui.board.min.js',
        chosen: 'lib/chosen.min.js'
    },

    map: [
        ['.css', '.css?v=' + ver],
        ['.js', '.js?v=' + ver]
    ]
})
