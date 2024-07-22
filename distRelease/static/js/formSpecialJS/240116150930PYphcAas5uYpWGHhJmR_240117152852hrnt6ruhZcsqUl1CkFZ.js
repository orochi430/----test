

// 成都一体化 请假管理
(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    // 计算请假天数 排除节假日
    vueData.$bus.on("selectDateTime", function (busObj) {
      if (busObj.metaData.metaId == "C-LEAVE-0002" || busObj.metaData.metaId == "C-LEAVE-0003") {
        // 请假开始日期
        let startDate = formData.main["C-LEAVE-0002"].value
        // 请假结束日期
        let endDate = formData.main["C-LEAVE-0003"].value


        if (startDate && endDate) {
          dsf.http.post("fn/leave/calcLeaveDay", {
            "startDate": startDate,
            "endDate": endDate
          }).then(res => {
            if (res.data.type == "success")
              vueData.$set(formData.main["C-LEAVE-0007"], "value", res.data.data.weekdays)
            else
              dsf.layer.toast(res.data.message)
          }).catch(err => {
            dsf.layer.toast("计算失败")

          })

        }
      }
    })
    vueData.$bus.on("selectUserBus", function (busObj) {
      if (busObj.metaData.metaId == "C-OA-WCBB-0031") {
        if (busObj.value) {
          dsf.http.post("fn/leave/getMobileNumber", { "ids": busObj.value })
            .then(res => {
              if (res.data.type == "success") {
                vueData.$set(formData.main["C-OA-WCBB-0013"], "value", res.data.data.mobile)
              }
              else
                dsf.layer.toast(res.data.message)
            })
        }
        else
          vueData.$set(formData.main["C-OA-WCBB-0013"], "value", "")

      }
    })



  }

  window.spJS = exportObj
})()
