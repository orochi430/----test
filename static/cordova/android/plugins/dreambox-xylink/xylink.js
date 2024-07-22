cordova.define("dreambox-xylink", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
                execute:function(arg,success,error) {
                    exec(success, error, "XYLinkPlugin", "execute", arg);
                },
            };
    module.exports = req;

});
