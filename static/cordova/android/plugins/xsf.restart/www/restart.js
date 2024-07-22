cordova.define("restart-main-plugin", function(require, exports, module) {
var exec = require('cordova/exec');


var restart = {
    restart:function(arg0) {//重启
        exec(null, null, "xsfRestart", "restart", [arg0]);
    }

};

module.exports = restart;
});
