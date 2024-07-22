// 驻京办 干部培训
;(function () {
    const exportObj = {}
  
    exportObj.initHandle = function (formData, formStruct, vueData) {
      function filterTime(time) {
        var str = time.replace(/-/g, "/")
        return Date.parse(str)
      }
  
      vueData.$bus.on("selectDateTime", function (busObj) {
        if (busObj.metaData.metaId == "C-OUTMANAGE-0001" || busObj.metaData.metaId == "C-OUTMANAGE-0002") {
          let start = filterTime(formData.main["C-OUTMANAGE-0001"].value)
          let end = filterTime(formData.main["C-OUTMANAGE-0002"].value)
          if (start && end) {
            if (start > end) {
              vueData.$set(formData.main, "B0020", { value: "" })
              dsf.layer.toast("结束日期必须大于开始日期")
            } else {
              const startDate = moment(start);
              const endDate = moment(end);
              const daysDiff = endDate.diff(startDate, 'days') + 1;

              vueData.$set(formData.main, "B0020", { value: daysDiff })
            }
          }
        }
      })
    }
  
    window.spJS = exportObj
  })()
  