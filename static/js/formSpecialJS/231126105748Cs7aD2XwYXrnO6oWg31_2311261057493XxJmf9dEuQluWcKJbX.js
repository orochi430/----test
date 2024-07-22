// 陕西一体化 发文
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    // 工作秘密字样显隐
    // 初始化
    let flag = formData.main["B0023"].value == "-2"
    vueData.$set(formData.main["B0041"], "value", flag ? "工作秘密" : "")
    formStruct.controls.find(item => item.metaId == "B0041").show = flag
    // 省长特殊逻辑
    dsf.http.post("fn/FWReportController/isSz").then(({ data }) => {
      if (data.data) {
        formStruct.controls.find(item => item.metaId == "B0041").show = false
        vueData.$set(formData.main["B0041"], "value", "")
      }
    })
    // 属性联动
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "B0023") {
        let flag = busObj.value == "-2";
        vueData.$set(formData.main["B0041"], "value", flag ? "工作秘密" : "")
        formStruct.controls.find(item => item.metaId == "B0041").show = flag
      }
    })
  }
  window.spJS = exportObj;
})();