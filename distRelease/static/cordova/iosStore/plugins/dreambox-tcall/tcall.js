cordova.define("dreambox-tcall", function(require, exports, module) {

    var  exec = require('cordova/exec');
    var req = {
               
    login:function(arg,succeedCallback,errorCallback){
                                  exec(succeedCallback,errorCallback, "TCallPlugin", "login", [arg]);
                             },
    singleCall:function(arg,succeedCallback,errorCallback){
                       exec(succeedCallback,errorCallback, "TCallPlugin", "singleCall", [arg]);
                  },
    groupCall:function(arg,succeedCallback,errorCallback){
                       exec(succeedCallback,errorCallback, "TCallPlugin", "groupCall", [arg]);
                  },
    setSelfInfo:function(arg,succeedCallback,errorCallback){
                       exec(succeedCallback,errorCallback, "TCallPlugin", "setSelfInfo", [arg]);
                  },
              
            };

    module.exports = req;

});
