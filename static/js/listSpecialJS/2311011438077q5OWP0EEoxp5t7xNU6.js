// 机要秘书 批示信息
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${itemValue['MAININFO.A0001']}`,
      query: {
        listId: listid,
        distribId: itemValue["G_INSTRUCTIONS_INFO.S-INSTRUCTIONS-INFO-0001.value"],
        fdistribId: 0,
        toPsj: 1,
        insId: itemValue["G_INSTRUCTIONS_INFO.S-BASE-0001.value"]
      }
    })
  }
  exportObj["xform.secToPsj"] = function (data, vueData) {
    dsf.layer.confirm(
      {
        message: "是否需要转批示件？",
        confirmButtonText: "确认"
      },
      () => {
        dsf.layer.loading()
        dsf.http
          .post("ctrl/instructionsInfo/secToPsj", {
            insId: data.dataValue["G_INSTRUCTIONS_INFO.S-BASE-0001.value"]
          })
          .then(res => {
            dsf.layer.clear()
            if (res.data.code == 200) {
              dsf.layer.toast("操作成功", "success", () => {
                vueData.onRefresh()
              })
            } else {
              dsf.layer.toast(res.data.message)
            }
          })
      }
    )
  }
  exportObj["xform.secReadEnd"] = function (data, vueData) {
    dsf.layer.confirm(
      {
        message: "是否需要阅毕？",
        confirmButtonText: "确认"
      },
      () => {
        dsf.layer.loading()
        dsf.http
          .post("ctrl/instructionsInfo/shareEnd", {
            insId: data.dataValue["G_INSTRUCTIONS_INFO.S-BASE-0001.value"]
          })
          .then(res => {
            dsf.layer.clear()
            if (res.data.code == 200) {
              dsf.layer.toast("操作成功", "success", () => {
                vueData.onRefresh()
              })
            } else {
              dsf.layer.toast(res.data.message)
            }
          })
      }
    )
  }
  window.spListJS = exportObj
})()
