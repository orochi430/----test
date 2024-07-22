cordova.define("xsf.imagedownloadandsave", function(require, exports, module) {
               function onSucceed(args){
               alert("succeed:" + args);
               }
               
               function onError(err){
               alert("error:" + err);
               }
               
               function call(callee,args,succeedCallback,errorCallback){
               onSucceed = succeedCallback || onSucceed;
               onError = errorCallback || onError;
               exec(onSucceed,onError, "ImageDownloadAndSavePlugin", callee,args);
               }
               var exec = require('cordova/exec');
               module.exports = {
               save : function(data,onSucceed,onError){
               call('save',[data],onSucceed,onError);
               },remove : function(onSucceed,onError){
               call('remove',[],onSucceed,onError);
               }
               };
               });
