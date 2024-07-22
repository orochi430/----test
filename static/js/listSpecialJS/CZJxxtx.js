;(function () {
  const exportObj = {}
  exportObj.initHandle = function (vueData) {
    vueData.readStatusKey = "readStatus"
    vueData.haveReadVal = 1
  }
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    dsf.http.post("fn/remind/read?ids=" + itemValue.id).then(res => {
      itemValue.readStatus = 1
      if (itemValue.mobileUrl) {
        // itemValue.mobileUrl为全路径，截取index.html#后路由
        let path = itemValue.mobileUrl.slice(itemValue.mobileUrl.indexOf("index.html#") + 11)
        vueData.$router.push(path)
      } else {
        dsf.layer.alert({ message: itemValue.content })
      }
    })
  }
  window.spListJS = exportObj
})()
