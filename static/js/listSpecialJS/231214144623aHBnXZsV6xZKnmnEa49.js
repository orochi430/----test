// 一体化 我负责的列表-新（加了数据扩展和按钮）
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
      vueData.$router.push({
        path: `/commonForm/${itemValue['G-RESPONSIBLE-FILE-002']}/${itemValue['G-RESPONSIBLE-FILE-001']}`,
      })
  }
  exportObj.custom1 = function (itemValue, vueData) {
    dsf.layer.confirm(
      {
        message: "是否确认移除",
        confirmButtonText: "确认",
      },
      () => {
        dsf.http.post(`fn/responsibleFile/removeResponsibleFile`, { infoId: itemValue.dataValue["G-RESPONSIBLE-FILE-001"] }).then(res => {
          if (res.data.code == 200) {
            dsf.layer.toast("操作成功")
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
