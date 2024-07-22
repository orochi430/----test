cordova.define("take-picture-plugin", function(require, exports, module) {
   var  exec = require('cordova/exec');
    var req = {
                execute:function(arg,success,error) {
                    var param = {
                        method:"",
                        param:{}
                    }


                    exec(success, error, "xsfTakePicture", "execute", [param.method,param.param]);
                },

                 show:function(arg0) {//显示
                        exec(null, null, "xsfTakePicture", "show", [arg0]);
                    },

                 hide:function(arg0) {//显示
                                          exec(null, null, "xsfTakePicture", "hide", [arg0]);
                                      }



            };

    module.exports = req;

});
