// 一体化 约稿通知
;(function () {
  const exportObj = {}
  exportObj.initHandle = function (vueData) {
    vueData.readStatusKey = 'C-REPORT-NOTICE-RECEIVE-0004.value'
    vueData.haveReadVal = 1
  }
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    dsf.http.post("ctrl/editor/ygtzChangeReadStatus", { pk: pk }).then(res => {
      if (res.data.code == 200) {
        itemValue['C-REPORT-NOTICE-RECEIVE-0004.value'] = 1
      }
    })
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        listId: listid,
      }
    })
  }
  window.spListJS = exportObj
})()
