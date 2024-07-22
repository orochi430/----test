cordova.define("xsf.jPush", function(require, exports, module) {
var exec = require('cordova/exec');


var JPush = {
    setJPushUserInfo:function(arg0) {//绑定
        setJPushUserInfo(arg0,null,null)
    },
    setJPushUserInfo:function(arg0,success,fail) {//绑定
        exec(success, fail, "JPush", "setJPushUserInfo", [arg0]);
    },
    loginOut:function(arg0,success,fail) { //退出
        exec(success, fail, "JPush", "loginOut", [arg0]);
    },
    loginOut:function(arg0) { //退出
        loginOut(arg0, null,null);
    }

};

module.exports = JPush;
});