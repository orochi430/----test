cordova.define("xsf.messagesCenter", function(require, exports, module) {
               function onSucceed(args){
               //alert("succeed:" + args);
               }
               function onError(err){
               //alert("error:" + err);
               }
               function call(callee,args,succeedCallback,errorCallback){
               onSucceed = succeedCallback || onSucceed;
               onError = errorCallback || onError;
               exec(onSucceed,onError, "ShowMessagesCenterPlugin", callee,args);
               }
               var exec = require('cordova/exec');
               module.exports = {
               showMessagesCenter : function(options,onSucceed,onError){
               call('showMessagesCenter',[options],onSucceed,onError);
               }
               
               };
               
               });
