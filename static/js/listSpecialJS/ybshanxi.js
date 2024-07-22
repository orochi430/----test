;(function () {
    const exportObj = {}
   
    exportObj.dataFilter = function (listData, vueData) {
      listData.forEach(item => {
        if(item.dataValue.isLeaderWrite == ''){
            item.dataValue["readStyle"] = {"backgroundColor": "#FF0000"}
        }else{
            item.dataValue["readStyle"] = { "backgroundColor": "#228b22" }
        }
      })
    }
    exportObj.initHandle = function (vueData) {
      vueData.alwaysShowStatus = true
    }
    exportObj.updateContent = function (itemValue,vueData) {
        console.log('点击');
        vueData.componentName = 'opinionSxDialog'
    }
    window.spListJS = exportObj
  })()