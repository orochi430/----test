cordova.define("xsf.filehelp", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
		onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "FileHelpPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		copy : function(data,onSucceed,onError){
			call('copy',[data],onSucceed,onError);
        }
	};

});
