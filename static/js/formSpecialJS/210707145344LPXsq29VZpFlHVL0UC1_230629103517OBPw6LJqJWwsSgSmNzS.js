// 产品公文交换 退文单
;(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (formData.main['B0020'].value == 0) {
      formStruct.controls.find(item => item.metaId == 'B0020').show = 0
    }
  }

  window.spJS = exportObj
})()
