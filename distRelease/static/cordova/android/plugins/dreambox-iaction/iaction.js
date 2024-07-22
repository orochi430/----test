cordova.define("dreambox-iaction", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
                execute:function(arg,success,error) {
                    var param = {
                        method:arg.method || "",
                        param:arg.param || {}
                    };
                    // $.extend(param,arg);
                    if(!param.method){
                        alert("请指定方法名!");
                        return;
                    }
                    exec(success, error, "IActionPlugins", "execute", [param.method,param.param]);
                },
                downloadPhoto:function(jsonParam,success,error){
                    req.execute({method:"downloadPhoto",param:jsonParam},success,error)
                },
                downloadFile:function(jsonParam,success,error){
                    req.execute({method:"downloadFile",param:jsonParam},success,error)
                },
                callPhone:function(jsonParam,success,error){
                    req.execute({method:"callPhone",param:jsonParam},success,error)
                },
                savePhoneNumber:function(jsonParam,success,error){
                    req.execute({method:"savePhoneNumber",param:jsonParam},success,error)
                },
                encrypt:function(jsonParam,success,error){
                    req.execute({method:"encrypt",param:jsonParam},success,error)
                },
                decode:function(jsonParam,success,error){
                    req.execute({method:"decode",param:jsonParam},success,error)
                },
                getIdentityCardMsg:function(jsonParam,success,error){
                    req.execute({method:"getIdentityCardMsg",param:jsonParam},success,error)
                },
                clearCache:function(jsonParam,success,error){
                    req.execute({method:"clearCache",param:jsonParam},success,error)
                }
            };

    module.exports = req;

});
