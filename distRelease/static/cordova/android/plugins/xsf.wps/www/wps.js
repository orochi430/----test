cordova.define("xsf.wps", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
        onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "WPSPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		open : function(url,fileName,id,readOnly,revision,succeedCallback,errorCallback){
			call('open',[url,fileName,id,readOnly,revision],succeedCallback,errorCallback);
		},
		 downAndOpen:function(arg,success,error) {
                            exec(success, error, "WPSPlugin", "downAndOpen", [arg]);
                        },

                        upload:function(arg,success,error) {
                            exec(success, error, "WPSPlugin", "upload", [arg]);
                        },
                        openFile:function(arg,success,error){
                            exec(success, error, "WPSPlugin", "openFile", [arg]);
                        },
                        PDFHandWrite:function(arg,success,error){
                            exec(success, error, "WPSPlugin", "PDFHandWrite", [arg]);
                        },
                        opinionDownload:function(arg,success,error){
                            exec(success, error, "WPSPlugin", "opinionDownload", [arg]);
                        },
                        PDFViewer:function(arg,success,error){
                            exec(success, error, "WPSPlugin", "PDFViewer", [arg]);
                        }
	};

});
