// 驻京办 入住登记未安排
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/230523195650wi1cAJX7q18JRpeqzK9?roomId=${itemValue['A0001']}&roomName=${itemValue['C-OA-ROOM-MAINTENANCE-0001']}`
    })
  }
  window.spListJS = exportObj
})()
