cordova.define("YOZOPlugin", function(require, exports, module) {
var exec = require('cordova/exec');

var YOZOPlugin = {
   opens:function(arg0) {
        exec(null, null, "YOZOPlugin", "open", [arg0]);
    }
};

module.exports = YOZOPlugin;
});
