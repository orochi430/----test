// 驻京办 调休申请
;(function () {
  const exportObj = {}
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
  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (!vueData.$route.params.pk) {
      dsf.http.post("fn/attnd/getAnnualLeave", { type: 0 }).then(res => {
          if (res.data.code == 200) {
            if (res.data.data) {
              vueData.$set(formData.main, "230523173022o78VEAGHHMb8GOOTJvk", { value: res.data.data.available.toString() });
              vueData.$set(formData.main, "23052317311801mePpeY1U9CbNcGqm8", { value: res.data.data.used.toString() })
              vueData.$set(formData.main, "230523173153BV7vp71N2FhS0HIPh30", { value: res.data.data.residue.toString() })
            }
          }
        })
    }
    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == "B0021" || busObj.metaData.metaId == "B0019") {
        let start = filterTime(formData.main["B0021"].value)
        let end = filterTime(formData.main["B0019"].value)
        if (start && end && start > end) {
          vueData.$set(formData.main, "B0019", { value: "" })
          dsf.layer.toast("结束日期必须大于开始日期")
        } else if (start && end && formData.main["230523180437YZC9y7hRhVbHZixdDTv"].value && formData.main["2305231805213zOmypGYfwqY9y65r73"].value) {
          count(
            formData.main["B0021"].value,
            formData.main["B0019"].value,
            formData.main["230523180437YZC9y7hRhVbHZixdDTv"].value,
            formData.main["2305231805213zOmypGYfwqY9y65r73"].value
          ).then(data => {
            vueData.$set(formData.main, "2305231733244UKj7l0lXmS9TEPNt49", { value: data.work })
            // vueData.$set(formData.main, "C-LEAVE-0007", { value: data.work })
          })
        }
      }
    })
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "230523180437YZC9y7hRhVbHZixdDTv" || busObj.metaData.metaId == "2305231805213zOmypGYfwqY9y65r73") {
        if (
          formData.main["B0021"].value &&
          formData.main["B0019"].value &&
          formData.main["230523180437YZC9y7hRhVbHZixdDTv"].value &&
          formData.main["2305231805213zOmypGYfwqY9y65r73"].value
        ) {
          count(
            formData.main["B0021"].value,
            formData.main["B0019"].value,
            formData.main["230523180437YZC9y7hRhVbHZixdDTv"].value,
            formData.main["2305231805213zOmypGYfwqY9y65r73"].value
          )
            .then(data => {
              vueData.$set(formData.main, "2305231733244UKj7l0lXmS9TEPNt49", { value: data.work })
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
