cordova.define("dreambox-bjca", function(require, exports, module) {
      var  exec = require('cordova/exec');
      var req = {
                  execute:function(arg,success,error) {
                      var param = {
                          method:arg.method || "",
                          param:arg.param || {}
                      };
                      if(!param.method){
                          alert("请指定方法名!");
                          return;
                      }
                      exec(success, error, "BJCAPlugin", "execute", [param.method,param.param]);
                  },
                  getCerStatus:function(jsonParam,success,error){
                      req.execute({method:"getCerStatus",param:jsonParam},success,error)
                  },
                  getCertWithPinAuth:function(jsonParam,success,error){
                      req.execute({method:"getCertWithPinAuth",param:jsonParam},success,error)
                  },
              };
      module.exports = req;
  });