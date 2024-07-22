cordova.define("dreambox-phoneCall", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
               call:function(arg,succeedCallback,errorCallback){
                                  exec(succeedCallback,errorCallback, "PhoneCall", "call", [arg]);
                             },
    dosth:function(arg,succeedCallback,errorCallback){
                       exec(succeedCallback,errorCallback, "PhoneCall", "dosth", [arg]);
                  },
    execute:function(act,param,succeedCallback,errorCallback){
        var action = act || ""
        var iParam = param
        if(!param || typeof(param) == "function"){
            iParam = {}
            error = succeedCallback
            succeedCallback = param
                   
        }
        if(!action){
                       console.log("error:action is empty!")
                       return;
                   }
                       exec(succeedCallback,errorCallback, "PhoneCall", "execute", [action,iParam]);
                  },
            };

    module.exports = req;

});
