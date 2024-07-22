cordova.define("dreambox-tna", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
                execute:function(arg,success,error) {
                    exec(success, error, "TNAPlugin", "execute", arg);
                },
            };
    module.exports = req;

});
