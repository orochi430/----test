// 驻京办 用车分配
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (formData.main["C-OA-TRANSPORT-SINGLE-0001"].value) {
      let userCtr = formStruct.subform["230525160042jlbiurbfDxdsbGkaKhs"].controls.find(item => item.metaId == "C-OA-TRAVEL-ITINERARY-0019")
      userCtr.extra.tabs[0].action += `?perPro=${formData.main["C-OA-TRANSPORT-SINGLE-0001"].value}`
      if (formData.multinfos["230525160042jlbiurbfDxdsbGkaKhs"].rows) {
        formData.multinfos["230525160042jlbiurbfDxdsbGkaKhs"].rows.forEach(row => {
          let userCtr = row.structControl.find(item => item.metaId == "C-OA-TRAVEL-ITINERARY-0019")
          userCtr.extra.tabs[0].action += `&perPro=${formData.main["C-OA-TRANSPORT-SINGLE-0001"].value}`
        })
      }
    }
    vueData.$bus.on("selectUserBus", function (busObj) {
      console.log(busObj)
      if (busObj.metaData.metaId == "C-OA-TRAVEL-ITINERARY-0003") {
        if (formData.multinfos["230525160042jlbiurbfDxdsbGkaKhs"].rows.find(row => row["C-OA-TRAVEL-ITINERARY-0003"].value == busObj.value)) {
          dsf.layer.toast("请不要重复选择")
          vueData.$set(formData.multinfos["230525160042jlbiurbfDxdsbGkaKhs"].rows[busObj.subFormIndex], "C-OA-TRAVEL-ITINERARY-0003", { value: "", text: "" })
          return
        }
        dsf.http.post("ctrl/official/getSelectDriverInfo", { id: busObj.value }).then(res => {
          if (res.data.code == 200) {
            vueData.$set(formData.multinfos["230525160042jlbiurbfDxdsbGkaKhs"].rows[busObj.subFormIndex], "C-OA-TRAVEL-ITINERARY-0004", { value: res.data.data })
          }
        })
      } else if (busObj.metaData.metaId == "C-OA-TRAVEL-ITINERARY-0002") {
        if (formData.multinfos["230525160042jlbiurbfDxdsbGkaKhs"].rows.find(row => row["C-OA-TRAVEL-ITINERARY-0002"].value == busObj.value)) {
          dsf.layer.toast("请不要重复选择")
          vueData.$set(formData.multinfos["230525160042jlbiurbfDxdsbGkaKhs"].rows[busObj.subFormIndex], "C-OA-TRAVEL-ITINERARY-0002", { value: "" })
        }
      }
    })
  }

  window.spJS = exportObj
})()
