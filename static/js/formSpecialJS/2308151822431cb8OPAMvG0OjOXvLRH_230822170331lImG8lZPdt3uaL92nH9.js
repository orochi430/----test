// 静安区委办发文
; (function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    let bwrq = formStruct.controls.find(ctr => ctr.metaId == 'B0005')
    if (bwrq && bwrq.defaultValue.value && (!formData.main['B0005'] || !formData.main['B0005'].value)) {
      vueData.$set(formData.main, "B0005",bwrq.defaultValue);
    }
  }
  window.spJS = exportObj
})()
