cordova.define("xsf", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,callback,errorCallback){
		callback = callback || onSucceed;
        errorCallback = errorCallback || onError;
		exec(callback,errorCallback, "XSFPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		getDeviceId : function(callback){
			call('getDeviceId',[],callback);
		},getDeviceInfo : function(callback){
			call('getDeviceInfo',[],callback);
		},set : function(key,value){
			call('set',[key,value]);
		},get : function(key,defaultValue,callback){
		    call('get', [key, defaultValue], callback);
               
        },startApp : function(packageOrURI , paramObject , callback,errorCallback){
               alert('2');
            call('startApp' , [packageOrURI , paramObject || {}] , callback,errorCallback);
        },openApp : function(packageName,className,params){
            call('openApp',[packageName,className,params||{}]);
        },startService : function(ation,params){
			call('startService',[ation,params||{}]);
		},playVideo : function(url){
			call('playVideo',[url]);
		},telto : function(phoneNum){
			call('telto',[phoneNum]);
		},smsto : function(phoneNum){
			call('smsto',[phoneNum]);
		},openUrl : function(url){
			call('openUrl',[path]);
		},open:function(path){
			xsfFileOpener.open(path);
        },goHome:function(){
            call('goHome',[]);
        },login:function(){
            call('login',[]);
        },logout:function(){
            call('logout',[]);
        },getVPN:function(callback){
               call('getVPN',[],callback);
        },openMeetingQuery:function(callback){
               call('openMeetingQuery',[],callback);
        }
	};
	//

});
