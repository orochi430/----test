// 驻京办 入住登记
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (vueData.$route.query.roomId) {
      vueData.$set(formData.main, "B0051", { value: vueData.$route.query.roomId, text: vueData.$route.query.roomName })
    }
  }

  window.spJS = exportObj
})()
