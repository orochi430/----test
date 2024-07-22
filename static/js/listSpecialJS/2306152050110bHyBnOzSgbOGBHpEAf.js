// 一体化 我负责的列表
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
      vueData.$router.push({
        path: `/commonForm/${itemValue['G-RESPONSIBLE-FILE-002']}/${itemValue['G-RESPONSIBLE-FILE-001']}`,
      })
  }
  window.spListJS = exportObj
})()
