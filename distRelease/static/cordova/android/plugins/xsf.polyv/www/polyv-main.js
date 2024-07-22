cordova.define("polyv-main-plugin", function(require, exports, module) {
var exec = require('cordova/exec');


var showPolyv = {
    test:function(arg0) {//测试页面
        exec(null, null, "xsfPolyv", "test", [arg0]);
    },
    play:function(arg0) { //打开播放页面
        exec(null, null, "xsfPolyv", "play", [arg0]);
    },
    openDownload:function(arg0) {  //打开缓存页面
        exec(null, null, "xsfPolyv", "openDownload", [arg0]);
    }
};

module.exports = showPolyv;
});
