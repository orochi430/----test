cordova.define("xsf.app", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
		onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "XSFAppPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		goDesktop : function(data,onSucceed,onError){
			call('goDesktop',[data],onSucceed,onError);
        },finishActivity : function(onSucceed,onError){
        	call('finishActivity',[],onSucceed,onError);
        },goHome : function(onSucceed,onError){
            call('goHome',[],onSucceed,onError);
        }
	};

});
