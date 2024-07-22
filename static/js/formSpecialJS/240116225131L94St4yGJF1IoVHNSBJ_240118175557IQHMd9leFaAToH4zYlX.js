// 成都一体化 外出报备
(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("selectUserBus", function (busObj) {
      console.log("reeeeee", busObj);
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
