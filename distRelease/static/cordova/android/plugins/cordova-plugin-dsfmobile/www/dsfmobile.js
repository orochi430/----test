cordova.define("cordova-plugin-dsfmobile", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
                execute:function(act,param,success,error) {
                    var action = act || ""
                    var iParam = param
                    console.log(param)
                    if(!param || typeof(param) == "function"){
                        iParam = {}
                        error = success
                        success = param
                    }
                    console.log(iParam)
                    // $.extend(param,arg);
                    if(!action){
                        console.log("error:action is empty!")
                        return;
                    }
                    exec(success, error, "DsfMobilePlugin", "execute", [action,iParam]);
                },
            };
    module.exports = req;

});
