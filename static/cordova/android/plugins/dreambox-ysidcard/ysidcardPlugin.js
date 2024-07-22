cordova.define("dreambox-ysidcard", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
                execute:function(arg,success,error) {
                    exec(success, error, "YsidCardPlugin", "execute", arg);
                },
            };
    module.exports = req;

});
