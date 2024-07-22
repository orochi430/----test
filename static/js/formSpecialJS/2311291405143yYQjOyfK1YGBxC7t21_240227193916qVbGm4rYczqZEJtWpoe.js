(function () {
  // 请假管理
  const exportObj = {};
	exportObj.initHandle = function (formData, formStruct, vueData) {
    if (!formData.main['C-QJSQ-LEAVE-002'].value) {
      let userId = formData.main["C-QJSQ-LEAVE-008"].value
      dsf.http.post("fn/sjyjcustom/getUserInfo", {"userId": userId}).then(res => {
          if (res.data && res.data.type == "success") {
              vueData.$set(formData.main, "C-QJSQ-LEAVE-002", {"value": res.data.data.position});
          }
      })
    }
  }
  exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise(function (resolve, reject) {
      vueData.$set(formData.main, "B0001", {
        value: `【${formData.main["C-QJSQ-LEAVE-008"].text}】于【${formData.main["B0022"].value}】提交的请假登记办理单`,
      });
      resolve()
    })
  }
	window.spJS = exportObj;
})();
