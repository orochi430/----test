// 经信委列表跳转
(function () {
  const exportObj = {}
  exportObj.link = function (listId, moduleId, pk, vueData, itemValue) {
    console.log(itemValue);
    if(itemValue['c-meetingchry-0010']) window.location.href = `tel:${itemValue['c-meetingchry-0010']}`
  }
  window.spListJS = exportObj
})()