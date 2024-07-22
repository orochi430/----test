// 一体化市监局 收文查询列表 点击进查看节点
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    console.log(vueData)
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        listId: listid,
        method: "view",
        validateByList: 1,
      }
    })
  }
  window.spListJS = exportObj
})()
