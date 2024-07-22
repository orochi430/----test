cordova.define("xsf.suwell", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
        onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "SuWellPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		                openSuWell:function(arg,success,error) {
                            exec(success, error, "SuWellPlugin", "openSuWell", [arg]);
                        }

	};

});
