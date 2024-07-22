;(function () {
  // 市教委两会办理
  const exportObj = {}
  exportObj.initHandle = function (vueData) {
    vueData.readStatusKey = "status";
    vueData.haveReadVal = 1;
  }
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${itemValue.moduleId}/${itemValue.infoId}/1`,
      query: {
        todoId: `${itemValue.pid}_${itemValue.pnid}`
      }
    })
  }
  exportObj.dataFilter = function (listData, vueData) {
    vueData.columns[0].showMetaColumn = 'showBt'
    listData.forEach(item => {
      item.dataValue.showBt = `<span style="color: var(--normal)">[${item.dataValue.actname}]</span> ${item.dataValue.bt}`
      item.dataValue.moduleNameAndNode = item.dataValue.moduleName
    })
  }
  window.spListJS = exportObj
})()
