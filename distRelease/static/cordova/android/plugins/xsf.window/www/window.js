var __ret = {};
function doChildViewDidUnload(){
    if(typeof(__ret.onClose) == "function"){
        __ret.onClose();
    }else{
        if(typeof(__ret.onExit) == "function"){
            __ret.onExit();
        }
    }
}
cordova.define("xsf.window", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,callback){
		callback = callback || onSucceed;
		exec(callback,onError, "WindowPlugin", callee,args);
	}

	function call2(callback,onError,param){
	    exec(callback,onError, "OpenWebPlugin","openWebAction",[param]);
	}
	function call3(callback,onError,param){
	    exec(callback,onError, "OpenWebPlugin","closeWebAction",[param]);
	}


	var exec = require('cordova/exec');
	module.exports = {
		open : function(url,title,isToolBar){
            if(isToolBar){
            //alert(isToolBar)
               return window.open(url, '_blank', 'title=' + title + ',location=no');
            }else{
               if(url.indexOf(":")<0){
                    var href = window.location.href;
                    var p = href.lastIndexOf("/");
                    if(p > 0){
                        url = href.substring(0,p+1) + url;
                    }
               }
               //alert(url);
               call('open',[url,title]);
               return __ret;
            }
		},
		open1 : function(url,title,callback){
            call('open1',[url,title],callback);
        },
        showTab : function(json,callback){
            call('showTab',[json],callback);
            return __ret;
        },
        close : function(n,callback){
            call('close',n?[n]:[],callback);
        },
        rotation : function(n,callback){
            call('rotation',[],callback);
        },
        resetRotation : function(n,callback){
            call('resetRotation',[],callback);
        },
        zoom : function(isZoom,callback){
            call('zoom',[isZoom],callback);
        },
        openWebView:function(param,callback,onError){
            call2(callback,onError,param);
        },
        closeWebView:function(param,callback,onError){
            call3(callback,onError,param);
        }
               
	};

});
