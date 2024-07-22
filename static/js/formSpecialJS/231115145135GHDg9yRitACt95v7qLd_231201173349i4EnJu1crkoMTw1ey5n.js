// 一体化市教委 收文
; (function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("blurBus", function (busObj) {
      if (busObj.metaData.metaId == "C-LW-0016") {
        if (busObj.value) {
          let val = busObj.value
          val = val.replaceAll("（", "〔");
          val = val.replaceAll("(", "〔");
          val = val.replaceAll("[", "〔");
          val = val.replaceAll("【", "〔");
          val = val.replaceAll("）", "〕");
          val = val.replaceAll(")", "〕");
          val = val.replaceAll("]", "〕");
          val = val.replaceAll("】", "〕");
          vueData.$set(formData.main, 'C-LW-0016', {value: val})
        }
      }
    })
  }
  window.spJS = exportObj
})()
