// 驻京办 离京申请
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    function filterTime(time) {
      var str = time.replace(/-/g, "/")
      return Date.parse(str)
    }
    function count(start, end, startH, endH) {
      return new Promise((resolve, reject) => {
        dsf.http
          .post("ctrl/leave/approval/calcDays", {
            start: start,
            end: end,
            startH: startH,
            endH: endH
          })
          .then(res => {
            if (res.data.code == 200) {
              resolve(res.data.data)
            } else {
              reject()
            }
          })
          .catch(err => {
            reject()
          })
      })
    }
    console.log(vueData.formData)
    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == "C-QT-CUSTOM-0020" || busObj.metaData.metaId == "C-QT-CUSTOM-0021") {
        let start = filterTime(formData.main["C-QT-CUSTOM-0020"].value)
        let end = filterTime(formData.main["C-QT-CUSTOM-0021"].value)
        if (start && end && start > end) {
          vueData.$set(formData.main, "C-QT-CUSTOM-0021", { value: "" })
          dsf.layer.toast("结束日期必须大于开始日期")
        } else if (start && end && formData.main["C-QT-CUSTOM-0026"].value && formData.main["C-QT-CUSTOM-0027"].value) {
          count(
            formData.main["C-QT-CUSTOM-0020"].value,
            formData.main["C-QT-CUSTOM-0021"].value,
            formData.main["C-QT-CUSTOM-0026"].value,
            formData.main["C-QT-CUSTOM-0027"].value
          ).then(data => {
            vueData.$set(formData.main, "C-QT-CUSTOM-0010", { value: data.work })
            // vueData.$set(formData.main, "C-LEAVE-0007", { value: data.work })
          })
        }
      }
    })
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "C-QT-CUSTOM-0026" || busObj.metaData.metaId == "C-QT-CUSTOM-0027") {
        if (
          formData.main["C-QT-CUSTOM-0020"].value &&
          formData.main["C-QT-CUSTOM-0021"].value &&
          formData.main["C-QT-CUSTOM-0026"].value &&
          formData.main["C-QT-CUSTOM-0027"].value
        ) {
          count(
            formData.main["C-QT-CUSTOM-0020"].value,
            formData.main["C-QT-CUSTOM-0021"].value,
            formData.main["C-QT-CUSTOM-0026"].value,
            formData.main["C-QT-CUSTOM-0027"].value
          )
            .then(data => {
              vueData.$set(formData.main, "C-QT-CUSTOM-0010", { value: data.work })
              // vueData.$set(formData.main, "C-LEAVE-0007", { value: data.work })
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    })
  }

  window.spJS = exportObj
})()
