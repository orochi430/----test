(function() {
  // 民政办 督办模块
  const exportObj = {};
  
  exportObj.feedback2105 = function(formData, formMeta, vueData) {
    dsf.layer.toast("请在定期反馈情况下方填写本月办理情况。");
    vueData.headTab="supervising";
    function changeFileByConvert(sourcePk, convertId) {
      dsf.http
        .post("ctrl/convert/moduleRuleConvert", {
          convertId: convertId, //指定转换的类型
          initDataSource: 0, // 0：转换后的数据直接存到数据库 1：转换后的数据存到redis中
          srcInfo: sourcePk //原来数据的主键
        })
        .then(result => {
          if (result.data.type == "success") {
            // var data = result.data;
            // let route = {
            //   name: "commonForm",
            //   params: {
            //     pk: data.data.pk,
            //     moduleId: data.data.moduleId
            //   },
            // //   query:{
            // //     activeTab:"supervising",
            // //   }
            // };
            // vueData.$router.push(route);
            // var url =
            //   DSF.getURLRoot() +
            //   "ctrl/formControl/form?moduleId=" +
            //   data.moduleId +
            //   "&pk=" +
            //   data.pk +
            //   "&sourcePk=" +
            //   sourcePk +
            //   "&relationId=" +
            //   sourcePk;
            // url += "&initDataSource=1"; //增加初始化
            // // simpleWin(this, {"url": url, "isfresh": true, "name": result.data.moduleName});
            // window.location.reload();
          } else {
            dsf.layer.toast(result.data.message);
          }
        })
        .error(function() {});
    }
    let params = {
      pk: formMeta.parameters.pk
    };
    dsf.http
      .post("/ctrl/leeSupervise/doGenerateFeedback", params)
      .then(res => {
        if (res.data.type == "success") {
            if(res.data.data == 0){
                changeFileByConvert(
                    formMeta.parameters.pk,
                    "210902154448jJuxMMu9GgHHWnQXQPv"
                  );
            }
          
        } else {
          dsf.layer.toast("生成失败!");
        }
      })
      .error(function() {});
  };

  window.spJS = exportObj;
})();
