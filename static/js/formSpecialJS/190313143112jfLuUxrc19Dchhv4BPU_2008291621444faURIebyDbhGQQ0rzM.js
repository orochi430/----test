// 产品公文交换 待签收-退文
;(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (formData.main['B0039'].value == 0) {
      formStruct.controls.find(item => item.metaId == 'B0039').show = 0
    }
  }

  window.spJS = exportObj
})()
