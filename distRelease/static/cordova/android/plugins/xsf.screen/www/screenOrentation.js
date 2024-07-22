cordova.define("ScreenOrientationPlugin", function(require, exports, module) {
var exec = require('cordova/exec');


var ScreenOrientationPlugin = {
    setScreenOrientation:function(param) {
        //// 0 竖屏，1 横屏，2 随方向切换
        exec(null, null, "ScreenOrientationPlugin", "setting", [{orientation:param}]);
    },
};

module.exports = ScreenOrientationPlugin;
});
