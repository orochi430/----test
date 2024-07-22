cordova.define("dreambox-BaiduLocation", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
               getLocation:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "BaiduLocation", "getLocation", [arg]);
               },
               openLocation:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "BaiduLocation", "openLocation", [arg]);
               },
               checkCanLocation:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "BaiduLocation", "checkCanLocation", [arg]);
               },
               openLocationService:function(arg,succeedCallback,errorCallback){
                    exec(succeedCallback,errorCallback, "BaiduLocation", "openLocationService", [arg]);
               },
            };

    module.exports = req;

});
