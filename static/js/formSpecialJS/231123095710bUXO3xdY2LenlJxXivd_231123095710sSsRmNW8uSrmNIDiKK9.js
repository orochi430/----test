// 陕西一体化  请假管理
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == "C-LEAVE-0002" || busObj.metaData.metaId == "C-LEAVE-0003") {
        let startTime = formData.main["C-LEAVE-0002"].value
        let endTime = formData.main["C-LEAVE-0003"].value
        if (startTime && endTime) {
          let leaveDays = (new Date(endTime) - new Date(startTime)) / 1000 / 60 / 60 / 24
          formData.main["C-LEAVE-0006"].value = leaveDays + 1
        }
      }
    })
  }
  window.spJS = exportObj;
})();