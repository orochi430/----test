// 一体化 市领导外出维护
;(function () {
  const exportObj = {}
  exportObj.custom1 = function (itemValue, vueData) {
    dsf.layer.confirm(
      {
        message: "是否确认审核通过",
        confirmButtonText: "确认",
      },
      () => {
        dsf.http.post(`/fn/leaderout/update`, { pk: itemValue.dataValue["A0001"] }).then(res => {
          if (res.data.code == 200) {
            dsf.layer.toast("审核通过")
            vueData.onRefresh()
          } else {
            dsf.layer.toast(res.data.message)
          }
        })
      }
    )
  }
  window.spListJS = exportObj
})()
