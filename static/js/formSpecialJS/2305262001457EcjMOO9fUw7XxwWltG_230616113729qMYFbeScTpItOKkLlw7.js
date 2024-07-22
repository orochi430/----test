// 一体化市监局 收文
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (formStruct.parameters.nodeId == '-2') {
      if (formData.main['C-LW-0015'].value == '2') { //局领导批办
        vueData.$set(formData.main, 'C-LW-0032', {value: 1, text: '通过'})
      }
    }
  }
  window.spJS = exportObj
})()
