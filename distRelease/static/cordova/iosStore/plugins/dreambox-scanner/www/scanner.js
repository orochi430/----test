cordova.define("dreambox-scanner", function(require, exports, module) {


var  exec = require('cordova/exec');

 var req ={
 	"open":function(arg,successCallback,errorCallback){
 	     exec(successCallback,errorCallback, "BarcodePlugin", "openBarcode", [arg]);	
 	}
 }
 
 module.exports = req;

});
