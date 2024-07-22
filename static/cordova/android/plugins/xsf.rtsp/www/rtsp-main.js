cordova.define("rtsp-main-plugin", function(require, exports, module) {
var exec = require('cordova/exec');


var showRtsp = {
    show:function(arg0) {//显示
        exec(null, null, "xsfRtsp", "show", [arg0]);
    },
    hide:function(arg0) { //隐藏
        exec(null, null, "xsfRtsp", "hide", [arg0]);
    },
     showAndGetMessage:function(arg0) { //初始化窗口并獲取數據（浦東愛黨建）
         exec(null, null, "xsfRtsp", "showAndGetMessage", [arg0]);
     }

};

module.exports = showRtsp;
});
