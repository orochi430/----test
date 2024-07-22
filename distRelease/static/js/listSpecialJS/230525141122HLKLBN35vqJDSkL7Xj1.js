// 驻京办 用车分配
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    if (itemValue['B0030.value'] == 1) {
      vueData.$router.push({
        path: `/commonForm/${moduleId}/${pk}?listId=${listid}&method=view&formId=230523174712jCzLMnxI903anrn5EQE&title=用车分配`
      })
    } else {
      vueData.$router.push({
        path: `/commonForm/${moduleId}/${pk}?listId=${listid}&method=assign&formId=230523174712jCzLMnxI903anrn5EQE&title=用车分配`
      })
    }

  }

  exportObj.createRow = function (btn, vueData) {
    vueData.$router.push({
      path: '/commonForm/2305231140418Ms8TVG4XZEqfDtLRQX?formId=230523174712jCzLMnxI903anrn5EQE&title=用车分配'
    })
  }

  window.spListJS = exportObj
})()
