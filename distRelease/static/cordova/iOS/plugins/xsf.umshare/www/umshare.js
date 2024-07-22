cordova.define("xsf.umshare", function(require, exports, module) {
               function onSucceed(args){
               alert("succeed:" + args);
               }
               
               function onError(err){
               alert("error:" + err);
               }
               
               function call(callee,args,succeedCallback,errorCallback){
               onSucceed = succeedCallback || onSucceed;
               onError = errorCallback || onError;
               exec(onSucceed,onError, "UmSharePlugin", callee,args);
               }
               var exec = require('cordova/exec');
               module.exports = {
               share : function(data,onSucceed,onError){
               call('share',[data],onSucceed,onError);
               },remove : function(onSucceed,onError){
               call('remove',[],onSucceed,onError);
               }
               };
               });
