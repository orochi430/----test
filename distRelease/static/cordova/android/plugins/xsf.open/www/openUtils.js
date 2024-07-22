cordova.define("OpenPlugin", function(require, exports, module) {
var exec = require('cordova/exec');


var OpenPlugin = {
    openUrlOutSide:function(param) {
        exec(null, null, "OpenPlugin", "openUrlOutSide", [{url:param}]);
    },
};

module.exports = OpenPlugin;
});
