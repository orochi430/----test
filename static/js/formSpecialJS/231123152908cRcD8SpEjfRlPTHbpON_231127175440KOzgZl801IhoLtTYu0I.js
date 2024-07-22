// 克拉玛依请销假管理

(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    function filterTime(time) {
      var str = time.replace(/-/g, "/")
      return Date.parse(str)
    }
    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == "C-QJSQ-LEAVE-006" || busObj.metaData.metaId == "C-QJSQ-LEAVE-005") {
        if (vueData.formData.main["C-QJSQ-LEAVE-006"].value && vueData.formData.main["C-QJSQ-LEAVE-005"].value) {
          let start = filterTime(formData.main["C-QJSQ-LEAVE-005"].value)
          let end = filterTime(formData.main["C-QJSQ-LEAVE-006"].value)
          let utc = end - start;
          let dayTimes = Math.floor(utc / (24 * 60 * 60 * 1000)) + 1
          if (dayTimes > 0) {
            vueData.$set(vueData.formData.main, "C-QJSQ-LEAVE-007", { value: dayTimes })
          } else {
            vueData.$set(vueData.formData.main, "C-QJSQ-LEAVE-007", { value: "" })
            vueData.$set(vueData.formData.main, "C-QJSQ-LEAVE-006", { value: "" })
            vueData.$set(vueData.formData.main, "C-QJSQ-LEAVE-005", { value: "" })
            dsf.layer.toast("结束时间必须晚于开始时间")
          }
        }
      }
    })
  }

  window.spJS = exportObj;
})();




