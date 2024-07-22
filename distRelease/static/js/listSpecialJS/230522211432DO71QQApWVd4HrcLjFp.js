// 一体化 培训 我报名的
;(function () {
  const exportObj = {}
  exportObj.dataFilter = function (listData, vueData) {
  listData.forEach(element => {
    let currentTime = new Date().getTime()
    let sdate = new Date(element.dataValue["C-ERP-TRAIN-INFO-0002"].replace("-", "/")).getTime()
    let edate = new Date(element.dataValue["C-ERP-TRAIN-INFO-0003"].replace("-", "/")).getTime()
    if (currentTime < sdate) {
      vueData.$set(element.dataValue, "C-ERP-TRAIN-INFO-0005", '<font color="#AAA">未开始</font>')
    } else if (currentTime > edate) {
      vueData.$set(element.dataValue, "C-ERP-TRAIN-INFO-0005", '<font color="#8080FF">已结束</font>')
    } else {
      vueData.$set(element.dataValue, "C-ERP-TRAIN-INFO-0005", '<font color="#F59A23">进行中</font>')
    }
  })
}
  window.spListJS = exportObj
})()
