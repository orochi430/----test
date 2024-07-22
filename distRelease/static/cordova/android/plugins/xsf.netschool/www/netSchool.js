cordova.define("netSchool", function(require, exports, module) {
var exec = require('cordova/exec');

var netSchoolPlugin = {
   open:function(arg0) {
        exec(null, null, "NetSchoolPlugin", "open", [arg0]);
    }
};

module.exports = netSchoolPlugin;
});
