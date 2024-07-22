// 秘书 领导阅件
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        listId: listid,
        distribId: itemValue["FYMK.S-BASE-0001.value"]
      }
    })
  }
  window.spListJS = exportObj
})()
