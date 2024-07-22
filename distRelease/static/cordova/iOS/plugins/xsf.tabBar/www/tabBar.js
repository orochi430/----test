cordova.define("xsf.tabBar", function(require, exports, module) {
	function onSucceed(args){
		alert("succeed:" + args);
	}
	
	function onError(err){
		alert("error:" + err);
	}
	
	function call(callee,args,succeedCallback,errorCallback){
		onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "TabbarPlugin", callee,args);
	}
	
	
	var exec = require('cordova/exec');
	module.exports = {
		addTabBar : function(data,onSucceed,onError){
               
			call('addTabBar',[data],onSucceed,onError);
        }
	};
});
