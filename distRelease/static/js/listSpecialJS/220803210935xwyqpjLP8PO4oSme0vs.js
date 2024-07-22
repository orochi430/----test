// 稿费核定表
(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commontabs/SdzyGfhdbd?title=稿费核定`,
      query: {
        pk: itemValue["A0001"]
      }
    })
  }
  window.spListJS = exportObj
})()
