cordova.define("xsf.orgUserPick", function(require, exports, module) {
               function onSucceed(args){
               //alert("succeed:" + args);
               }
               function onError(err){
               //alert("error:" + err);
               }
               function call(callee,args,succeedCallback,errorCallback){
               onSucceed = succeedCallback || onSucceed;
               onError = errorCallback || onError;
               exec(onSucceed,onError, "OrgUserPickPlugin", callee,args);
               }
               var exec = require('cordova/exec');
               module.exports = {
               pick : function(options,onSucceed,onError){
               call('pick',[options],onSucceed,onError);
               },
               pickUsersTransferChat : function(options,onSucceed,onError){
               call('pickUsersTransferChat',[options],onSucceed,onError);
               }
               
               };
               
               });
