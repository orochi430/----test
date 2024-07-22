(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    console.log('itemValue', itemValue)
    vueData.$router.push({
      path: `/commonForm/${itemValue['hhht_fw.A0004']}/${itemValue['hhht_fw.A0001']}`,
      query: {},
    })
  }
  window.spListJS = exportObj
})()
