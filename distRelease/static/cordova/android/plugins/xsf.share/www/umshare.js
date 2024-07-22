cordova.define("umshare", function(require, exports, module) {
var exec = require('cordova/exec');

var UMSharePlugin = {
   share:function(arg0) {
        exec(null, null, "UMSharePlugin", "share", [arg0]);
    }
};

module.exports = UMSharePlugin;
});
