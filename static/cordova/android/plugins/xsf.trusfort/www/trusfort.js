cordova.define("trusfort-main-plugin", function(require, exports, module) {
var exec = require('cordova/exec');


var xsfTrusfort = {
    getToken:function(data,successCallback,errorCallback) {//获取token
        call('getToken',[data],successCallback,errorCallback);
    },
   onLogout:function(data,successCallback,errorCallback) {//解绑
        call("onLogout",[data], successCallback,errorCallback);
     },
   getCode:function(data,successCallback,errorCallback) {//获取口令
        call("getCode",[data],successCallback,errorCallback);
     },

     getPushList:function(data,successCallback,errorCallback) {//获取云桌面推送
             call("getPushList",[data],successCallback,errorCallback);
          },

     setCloudLogin:function(data,successCallback,errorCallback) {//云桌面推送登录
             call("setCloudLogin",[data],successCallback,errorCallback);
          },

     startCountDown:function(data,successCallback,errorCallback) {//认证页面失效时间检测
             call("startCountDown",[data],successCallback,errorCallback);
          }

};


	function call(callee,args,callback , errorCallback){
		callback = callback || onSucceed;
		errorCallback = errorCallback || onError;
		exec(callback , errorCallback, "xsfTrusfort", callee,args);
	}


module.exports = xsfTrusfort;
});
