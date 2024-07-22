// 一体化市监局 收文
;(function () {
  const exportObj = {}
  // 流转情况
  exportObj.showFlow = function (formData, formStruct, vueData) {
    if (formData.main['C-LW-0015'].value != 4) {
      dsf.layer.toast('该文件正在办理过程中，详细信息请于电脑端查看')
    } else {
      vueData.componentName = "movingDialog";
    }
  }
  window.spJS = exportObj
})()
