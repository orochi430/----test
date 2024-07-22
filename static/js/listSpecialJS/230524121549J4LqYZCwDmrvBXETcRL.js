// 政务微信 约稿通知
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    dsf.http.post("ctrl/editor/ygtzChangeReadStatus", { pk: pk }).then(res => {})
    vueData.$router.push({
      path: `/commonForm/201231145248wvyDv7FqQmoLKle5oPk/${pk}`,
      query: {
        listId: "P1108Common",
        method: "openForm",
        toNodeId: "-1",
        pk: pk,
        validateByList: 1
      }
    })
  }
  window.spListJS = exportObj
})()
