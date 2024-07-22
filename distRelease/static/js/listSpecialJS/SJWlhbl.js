;(function () {
  // 市教委两会办理
  const exportObj = {}
  exportObj.dataFilter = function (listData, vueData) {
    vueData.columns[0].showMetaColumn = 'showBt'
    listData.forEach(item => {
      item.dataValue.showBt = `<span style="color: var(--normal)">[${item.dataValue.nodeName}]</span> ${item.dataValue.bt}`
      item.dataValue.moduleNameAndNode = item.dataValue.moduleName
    })
  }
  window.spListJS = exportObj
})()
