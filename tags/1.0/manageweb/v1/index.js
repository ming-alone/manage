define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery');

    var pub = {};

    pub.init = function () {
        var pathName = window.location.pathname.split("/");
        var urlFile;
        var urlFile = pathName[1] + '/' + pathName[2] + '/' + pathName[3] + '/' + pathName[3] + '.js';
        require.async(seajs.data.vars._PASSPORT_PATH + urlFile, function (m) {
            m.init();
        });
    };

    module.exports = pub;
});