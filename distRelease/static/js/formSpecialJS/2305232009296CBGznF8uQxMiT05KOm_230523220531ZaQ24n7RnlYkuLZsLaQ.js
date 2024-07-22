// 驻京办 干部培训
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    function filterTime(time) {
      var str = time.replace(/-/g, "/")
      return Date.parse(str)
    }

    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == "2305231453586gfBsLjb0C4gvgees0F" || busObj.metaData.metaId == "230523145549bsepmLm99anvO4thIiu") {
        let start = filterTime(formData.main["2305231453586gfBsLjb0C4gvgees0F"].value)
        let end = filterTime(formData.main["230523145549bsepmLm99anvO4thIiu"].value)
        if (start && end) {
          if (start > end) {
            vueData.$set(formData.main, "230523145549bsepmLm99anvO4thIiu", { value: "" })
            dsf.layer.toast("结束日期必须大于开始日期")
          } else {
            let duration = (end - start) / 1000 / 60 / 60
            let roundoff = Math.ceil(duration * 2) / 2 // 以0.5为最小时间颗粒  如：1.01为1.5，0.66为1
            vueData.$set(formData.main, "2305231457363VenCxJKcCFUWkwtoAB", { value: roundoff })
          }
        }
      }
    })
  }

  window.spJS = exportObj
})()
