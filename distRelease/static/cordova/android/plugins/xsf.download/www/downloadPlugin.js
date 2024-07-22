cordova.define("DownloadPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

var DownloadPlugin = {
   download:function(arg0) {
        exec(null, null, "DownloadPlugin", "download", [arg0]);
    }
};

module.exports = DownloadPlugin;
});
