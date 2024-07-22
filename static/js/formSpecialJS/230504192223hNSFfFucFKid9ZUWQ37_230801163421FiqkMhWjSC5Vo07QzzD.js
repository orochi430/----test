// 一体化办公厅 签报
; (function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    let B0036 = formStruct.controls.find(ctr => ctr.metaId == 'B0036')
    if (B0036 && JSON.stringify(B0036.defaultValue) != "{}" && (!formData.main['B0036'] || formData.main['B0036'].value == '')) {
      vueData.$set(formData.main, 'B0036', B0036.defaultValue)
      console.log(formData.main['B0036'])
    }
    formStruct.controls.forEach(ctr => {
      if (ctr.controlType != 'controlEditOpinion' && ctr.privilege.visible) ctr.show = 1
    })
  }

  window.spJS = exportObj
})()
