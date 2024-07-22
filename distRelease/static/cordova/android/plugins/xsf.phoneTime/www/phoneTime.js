cordova.define("time-main-plugin", function(require, exports, module) {
	function onSucceed(args){
		alert("succeed:" + args);
	}

	function onError(err){
		alert("error:" + err);
	}

	function call(callee,args,succeedCallback,errorCallback){
		onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "xsfTime", callee,args);
	}

	var exec = require('cordova/exec');
	module.exports = {
		getTime : function(url,isWebViewVisible,onSucceed,onError){
			call('getTime',[url , isWebViewVisible],onSucceed,onError);
        }
	};
});
