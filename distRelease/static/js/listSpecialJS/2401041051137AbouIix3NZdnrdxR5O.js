// 提案答复--走访情况列表
;(function () {
    const exportObj = {}
    exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
      vueData.$router.push({
        path: `/commonForm/${moduleId}/${pk}`,
        query: {
          listId: listid,
          method: 'view',
          validateByList: '1',
        }
      })
    }
    window.spListJS = exportObj
  })()
  