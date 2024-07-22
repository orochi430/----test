// 静安区委办发文
; (function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    let bwrq = formStruct.controls.find(ctr => ctr.metaId == 'B0005')
    if (bwrq && bwrq.defaultValue.value && (!formData.main['B0005'] || !formData.main['B0005'].value)) {
      vueData.$set(formData.main, "B0005", bwrq.defaultValue);
    }


    vueData.$bus.on("inputRadio", function (busObj) {
      console.log(busObj)
      // 反馈类型控制计划任务
      if (busObj.metaData.metaId == "C-FW-0060") {
        if (formData.main["C-FW-0060"].value == "4") {
          vueData.$set(vueData.formData.main, "C-FW-0031", { value: "国务院第711号令" })
        } else {
          vueData.$set(vueData.formData.main, "C-FW-0031", { value: "" })
        }
      }
    })



  }
  window.spJS = exportObj
})()
