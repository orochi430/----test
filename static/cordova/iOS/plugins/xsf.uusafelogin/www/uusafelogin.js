cordova.define("xsf.uusafelogin", function(require, exports, module) {
               function onSucceed(args){
               alert("succeed:" + args);
               }
               
               function onError(err){
               alert("error:" + err);
               }
               
               function call(callee,args,succeedCallback,errorCallback){
               onSucceed = succeedCallback || onSucceed;
               onError = errorCallback || onError;
               exec(onSucceed,onError, "UuSafeLoginPlugin", callee,args);
               }
               var exec = require('cordova/exec');
               module.exports = {
               UuSafeLoginMode : function(data,onSucceed,onError){
               call('UuSafeLoginMode',[data],onSucceed,onError);
               },UuSafeLogin : function(data,onSucceed,onError){
               call('UuSafeLogin',[data],onSucceed,onError);
               },setAppBadge : function(data,onSucceed,onError){
                   call('setAppBadge',[data],onSucceed,onError);
                   }
               };
               });
