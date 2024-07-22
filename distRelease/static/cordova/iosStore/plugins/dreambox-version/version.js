cordova.define("dreambox-version", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
 	"getCurrentVersion":function(arg,successCallback,errorCallback){
 	     exec(successCallback,errorCallback, "VersionPlugin", "getCurrentVersion", [arg]);
 	},
   "getIsIphoneX":function(arg,successCallback,errorCallback){
        exec(successCallback,errorCallback, "VersionPlugin", "getIsIphoneX", [arg]);
   }
 }
 
 module.exports = req;

});
