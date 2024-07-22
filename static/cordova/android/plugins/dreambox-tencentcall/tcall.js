cordova.define("dreambox-tcall", function(require, exports, module) {
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
                      exec(success, error, "TCallPlugin", "execute", [param.method,param.param]);
                  },
                  login:function(jsonParam,success,error){
                      req.execute({method:"login",param:jsonParam},success,error)
                  },
                  singleCall:function(jsonParam,success,error){
                      req.execute({method:"singleCall",param:jsonParam},success,error)
                  },
                  groupCall:function(jsonParam,success,error){
                      req.execute({method:"groupCall",param:jsonParam},success,error)
                  },
                  setSelfInfo:function(jsonParam,success,error){
                      req.execute({method:"setSelfInfo",param:jsonParam},success,error)
                  },
              };
      module.exports = req;
  });