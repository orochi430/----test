cordova.define("JPush", function(require, exports, module) {
               function onSucceed(args){
               
               }
               function onError(err){
               
               }
               function call(callee,args,callback,errorCallback){
               callback = callback || onSucceed;
               errorCallback = errorCallback || onError;
               
               exec(callback,errorCallback, "JPushPlugin", callee,args);
               }
               var exec = require('cordova/exec');
               module.exports = {
               setJPushUserInfo:function(args){
               call('setJPushUserInfo',[args],null,null);
               },
               loginOut:function(args){
               call('loginOut',[args],null,null);
               }
               };
               });
