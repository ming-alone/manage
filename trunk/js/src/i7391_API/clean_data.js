define(function (require, exports, module) {
    var pub = {};
    pub.init = function () {
        console.log('it is a test');
    }
    module.exports = pub;
})