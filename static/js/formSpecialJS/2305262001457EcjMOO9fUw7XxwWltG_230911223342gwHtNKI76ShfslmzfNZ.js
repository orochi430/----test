// 一体化市监局 收文
;(function () {
  const exportObj = {}
  // 流转情况
  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (formData.main['C-LW-0033'] && formData.main['C-LW-0033'].value == 1) {
      dsf.layer.confirm({
        title: '提示',
        message: '不得在互联网上存储、处理、传递工作秘密或内部敏感信息，请确定是否需要打开或办理该文件。',
        confirmButtonText: '确定',
        showCancelButton: false
      })
    }
    vueData.$bus.on("checkVal", function (busObj) {
      // 是否为工作秘密
      if (busObj.metaData.metaId == "C-LW-0033" && busObj.value == 1) {
        setTimeout(() => {
          dsf.layer.confirm({
            title: '提示',
            message: '不得在互联网上存储、处理、传递工作秘密或内部敏感信息，请确定是否需要打开或办理该文件。',
            confirmButtonText: '确定',
            showCancelButton: false
          })
        }, 10)
      }
    })
    vueData.$bus.on("inputRadio", function (busObj) {
      // 是否加急办理
      if (busObj.metaData.metaId == "B0058") {
        if (busObj.value == -1) {
          vueData.$set(formData.main, 'B0006', {value: 0, text: '正常'})
        } else {
          vueData.$set(formData.main, 'B0006', {value: 2, text: '加急'})
        }
      }
    })
  }
  window.spJS = exportObj
})()
