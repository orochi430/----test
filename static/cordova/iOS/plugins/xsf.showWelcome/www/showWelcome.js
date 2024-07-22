cordova.define("xsf.showWelcome", function(require, exports, module) {
               function onSucceed(args){
               //alert("succeed:" + args);
               }
               function onError(err){
               //alert("error:" + err);
               }
               function call(callee,args,succeedCallback,errorCallback){
               onSucceed = succeedCallback || onSucceed;
               onError = errorCallback || onError;
               exec(onSucceed,onError, "ShowWelcomePlugin", callee,args);
               }
               var exec = require('cordova/exec');
               module.exports = {
               showWelcomePage : function(options,onSucceed,onError){
               call('showWelcomePage',[options],onSucceed,onError);
               }
               
               };
               
               });
