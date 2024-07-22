// 秘书 领导待阅
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        listId: listid,
        distribId: itemValue["FYMK.S-BASE-0001.value"],
        fdistribId: itemValue["FYMK.S-DISTRIB-USER-0002.value"]
      }
    })
  }
  exportObj["xform.shareToLeader"] = function (data, vueData) {
    dsf.layer.loading()
    dsf.http.post("ctrl/leaderShareRead/changeProcessMode", { distribIds: data.dataValue["FYMK.S-BASE-0001.value"], type: 2 }).then(res => {
      dsf.layer.clear()
      if (res.data.code == 200) {
        dsf.layer.toast("发送成功")
        vueData.onRefresh()
      } else {
        dsf.layer.toast(res.data.message)
      }
    })
  }
  // 批量送领导
  exportObj.custom1 = function (btn, vueData) {
    vueData.showCheck = true
    vueData.$eventBus.onDefaultListCheck(vueData, function (data) {
      console.log(data)
      if (btn.action == "custom1") {
        dsf.layer.loading()
        dsf.http.post("ctrl/leaderShareRead/changeProcessMode", { distribIds: data.map(item => item.dataValue["FYMK.S-BASE-0001.value"]).join(","), type: 2 }).then(res => {
          dsf.layer.clear()
          if (res.data.code == 200) {
            vueData.showCheck = false
            dsf.layer.toast("发送成功")
            vueData.onRefresh()
          } else {
            dsf.layer.toast(res.data.message)
          }
        })
      }
    })
  }
  window.spListJS = exportObj
})()
