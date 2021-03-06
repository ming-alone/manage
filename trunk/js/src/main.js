define(function(require, exports, module) {
    'use strict';

    var pub = {};

    pub.init = function(urlFile) {
        if (typeof urlFile !== 'string') {
            urlFile = '';
            var pathName = window.location.pathname.split("/"); //获取 url 地址
            for (var x in pathName) { //判断第一个是 page
                if (pathName[x] === 'page') {
                    continue;
                }
                urlFile += (pathName[x] !== undefined && pathName[x] !== '') ? pathName[x] + '/' : '';
            }
            urlFile = urlFile.slice(0, -1); //删除最后一个多余的斜杆

            if (urlFile.slice(-5) === '.html') { //删除最尾巴的 '.html'
                urlFile = urlFile.slice(0, -5);
            }
        }
        require.async(urlFile, function(m) {
            m.init();
        });
    };

    module.exports = pub;
});
