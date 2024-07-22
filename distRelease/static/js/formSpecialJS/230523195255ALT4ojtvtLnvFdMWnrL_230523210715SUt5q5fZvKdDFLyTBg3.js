// 驻京办 请假申请
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
      if (busObj.metaData.metaId == "B0013" || busObj.metaData.metaId == "B0005") {
        let start = filterTime(formData.main["B0013"].value)
        let end = filterTime(formData.main["B0005"].value)
        if (start && end && start > end) {
          vueData.$set(formData.main, "B0005", { value: "" })
          dsf.layer.toast("结束日期必须大于开始日期")
        } else if (start && end && formData.main["230523204730wKwdKfL18rqqnD0sf2W"].value && formData.main["2305232047595WqJsjcLCGiaqd756eS"].value) {
          count(formData.main["B0013"].value, formData.main["B0005"].value, formData.main["230523204730wKwdKfL18rqqnD0sf2W"].value, formData.main["2305232047595WqJsjcLCGiaqd756eS"].value).then(data => {
            vueData.$set(formData.main, "230523201050PBF6EbmjA1q4UNNJbyZ", { value: data.work })
            // vueData.$set(formData.main, "C-LEAVE-0007", { value: data.work })
          })
        }
      }
    })
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "230523204730wKwdKfL18rqqnD0sf2W" || busObj.metaData.metaId == "2305232047595WqJsjcLCGiaqd756eS") {
        if (formData.main["B0013"].value && formData.main["B0005"].value && formData.main["230523204730wKwdKfL18rqqnD0sf2W"].value && formData.main["2305232047595WqJsjcLCGiaqd756eS"].value) {
          count(formData.main["B0013"].value, formData.main["B0005"].value, formData.main["230523204730wKwdKfL18rqqnD0sf2W"].value, formData.main["2305232047595WqJsjcLCGiaqd756eS"].value)
            .then(data => {
              vueData.$set(formData.main, "230523201050PBF6EbmjA1q4UNNJbyZ", { value: data.work })
              // vueData.$set(formData.main, "C-LEAVE-0007", { value: data.work })
            })
            .catch(err => {
              console.log(err)
            })
        }
      } else if (busObj.metaData.metaId == "230523195528sgNZmBXvv5YlbJF49VM") {
        // 请假类别 获取 可休假天数
        dsf.http.post('fn/attnd/getAnnualLeave', { type: busObj.value }).then(res => {
          if (res.data.code == 200) {
            if (res.data.data.available != undefined) {
              vueData.$set(formData.main, "2305232011170bYhFIJvyazLaV0y7bC", { value: res.data.data.available.toString() })
              vueData.$set(formData.main, "2305232011331zJuLxMHoXl0VjcLrz8", { value: res.data.data.used.toString() })
              vueData.$set(formData.main, "230523201156RoP2pzOHxdfKta8Zoqi", { value: res.data.data.residue.toString() })
            } else {
              vueData.$set(formData.main, "2305232011170bYhFIJvyazLaV0y7bC", { value: '' })
              vueData.$set(formData.main, "2305232011331zJuLxMHoXl0VjcLrz8", { value: '' })
              vueData.$set(formData.main, "230523201156RoP2pzOHxdfKta8Zoqi", { value: '' })
            }
          }
        })
      }
    })
  }

  window.spJS = exportObj
})()
