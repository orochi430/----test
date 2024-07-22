(function() {
  // 杭州党校待办
  const exportObj = {};
  function singleton(vueData) {
    return new Promise(function(resolve, reject) {
      let user_id;
      if(typeof(dsf.util.loadLocalStore("user"))=="string"){
        user_id = dsf.util.loadLocalStore("user").user_id;
      }else{
        user_id = dsf.util.loadLocalStore("user").user_id;
      }

      dsf.http
        .post("fn/mobile/user/singleton", { userId: user_id })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.signPhoto?.length) {
              resolve();
            } else {
              reject("暂无签名照片，请先上传签名照");
            }
          } else {
            reject("获取签名照异常，请联系管理员");
          }
        })
        .error(e => {
          reject("暂无签名照片，请先上传签名照");
        });
    });
  }
  exportObj.faSong = function(itemValue, vueData) {
    // debug
    if (itemValue.dataValue.moduleId == "220216153829YKuzKF4NHWtoURD6yr1") {
      singleton().then(
        () => {
          vueData["action-faSong"](itemValue);
        },
        err => {
          dsf.layer.toast(err);
        }
      );
    } else {
      vueData["action-faSong"](itemValue);
    }
  };
  window.spListJS = exportObj;
})();
