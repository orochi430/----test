cordova.define("dreambox-sharedPreferences", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
        onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "SharedPreferencesPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		                 save:function(arg,success,error) {
                            exec(success, error, "SharedPreferencesPlugin", "save", [arg]);
                        },

                        get:function(arg,success,error) {
                            exec(success, error, "SharedPreferencesPlugin", "get", [arg]);
                        },
                        clear:function(success){
                            exec(success, null, "SharedPreferencesPlugin", "clear", [null]);
                        }
	};

});

