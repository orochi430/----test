cordova.define("haikang-main-plugin", function(require, exports, module) {
var exec = require('cordova/exec');


var showHaikang = {
    show:function(arg0) {//显示
        exec(null, null, "xsfHaikang", "show", [arg0]);
    },
    hide:function(arg0) { //隐藏
        exec(null, null, "xsfHaikang", "hide", [arg0]);
    },
    finish:function(arg0) { //隐藏
        exec(null, null, "xsfHaikang", "finish", [arg0]);
    }

};

module.exports = showHaikang;
});
