cordova.define("xsf.chartutility", function(require, exports, module) {
               function onSucceed(args){
               alert("succeed:" + args);
               }
               
               function onError(err){
               alert("error:" + err);
               }
               
               function call(callee,args,succeedCallback,errorCallback){
               onSucceed = succeedCallback || onSucceed;
               onError = errorCallback || onError;
               exec(onSucceed,onError, "ChartUtilityPlugin", callee,args);
               }
               var exec = require('cordova/exec');
               module.exports = {
               showChartView : function(data,onSucceed,onError){
               call('showChartView',[data],onSucceed,onError);
               },remove : function(onSucceed,onError){
               call('remove',[],onSucceed,onError);
               }, getWifiInformation: function(onSucceed,onError){
               call('getWifiInformation',[],onSucceed,onError);
               }, getHealthData: function(onSucceed,onError){
               call('getHealthData',[],onSucceed,onError);
               }
               };
               });
