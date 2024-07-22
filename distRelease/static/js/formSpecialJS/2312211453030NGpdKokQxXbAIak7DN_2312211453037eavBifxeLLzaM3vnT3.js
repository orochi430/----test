// 陕西一体化 省领导请假（报备）审批单（移动）
(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("selectDateTime", function (busObj) {
      let start = formData.main["C-LEAVE-0002"].value
      let end = formData.main["C-LEAVE-0003"].value
      if ((busObj.metaData.metaId == "C-LEAVE-0002" || busObj.metaData.metaId == "C-LEAVE-0003") && start && end) {
        if (new Date(start).getTime() >= new Date(end).getTime()) {
          dsf.layer.toast("结束日期必须大于开始日期")
          vueData.$set(formData.main[busObj.metaData.metaId], "value", 0)
        }
        let total = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24);
        vueData.$set(formData.main["C-LEAVE-0006"], "value", total)
      }
    })
  }
  window.spJS = exportObj
})();
