cordova.define("dreambox-mfile", function(require, exports, module) {

    var  exec = require('cordova/exec');
    module.exports = {
                execute:function(param,success,error) {

                    exec(success, error, "MFile", "execute", [param.method,param.param]);
                }
            };

});
