// 经信委列表跳转
(function () {
  const exportObj = {}
  exportObj.link = function (listId, moduleId, pk, vueData, itemValue) {
    console.log(itemValue);
    vueData.$dialog.confirm({
      title: "提示",
      message: `是否拨打电话<span style="color: #0086D9">${itemValue['c-meetingchry-0010']}</span>`,
      confirmButtonText: '呼叫'
    }).then(() => {
      window.location.href = `tel:${itemValue['c-meetingchry-0010']}`
     }).catch(() => {})

  }
  window.spListJS = exportObj
})()