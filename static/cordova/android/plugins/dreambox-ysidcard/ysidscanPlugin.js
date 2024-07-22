cordova.define("dreambox-ysidscan", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
                execute:function(arg,success,error) {
                    exec(success, error, "YsidScanPlugin", "execute", arg);
                },
            };
    module.exports = req;

});
