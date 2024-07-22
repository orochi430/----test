// 陕西一体化 领导批示
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    dsf.http.post("fn/FWReportController/isSz").then(({ data }) => {
      if (data.data) {
        formStruct.controls.find(item => {
          if (item.metaId == "C-FW-0031") item.show = false
        })
      }
    })
  }
  window.spJS = exportObj;
})();