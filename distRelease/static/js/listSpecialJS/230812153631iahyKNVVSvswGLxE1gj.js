// 秘书 领导已办
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${itemValue['S-INBOX-0006']}/${itemValue['S-INBOX-0002']}/1`,
      query: {
        todoId: `${itemValue['S-INBOX-0003']}_${itemValue['S-INBOX-0030']}`,
        leaderId: itemValue['S-INBOX-0012.value'],
        status: itemValue['S-INBOX-0085.value'],
        agencyType: '2',
        agencyUserId: itemValue['S-INBOX-0012.value'],
        agencyUserName: itemValue['S-INBOX-0012.text']
      }
    })
  }
  // exportObj["xform.shareToLeader"] = function (data, vueData) {
  //   dsf.layer.loading()
  //   dsf.http.post("fn/flow/updateInboxSecretaryStatus", { pnId: data.dataValue["FYMK.S-BASE-0001.value"], type: 2 }).then(res => {
  //     dsf.layer.clear()
  //     if (res.data.code == 200) {
  //       dsf.layer.toast("发送成功")
  //       vueData.onRefresh()
  //     } else {
  //       dsf.layer.toast(res.data.message)
  //     }
  //   })
  // }
  // 批量送领导
  // exportObj.custom1 = function (btn, vueData) {
  //   vueData.showCheck = true
  //   vueData.$eventBus.onDefaultListCheck(vueData, function (data) {
  //     console.log(data)
  //     if (btn.action == "custom1") {
  //       dsf.layer.loading()
  //       dsf.http.post("fn/flow/updateInboxSecretaryStatus", { pnId: data.map(item => item.dataValue["S-INBOX-0030"]).join(","), status: 2 }).then(res => {
  //         dsf.layer.clear()
  //         if (res.data.code == 200) {
  //           vueData.showCheck = false
  //           dsf.layer.toast("发送成功")
  //           vueData.onRefresh()
  //         } else {
  //           dsf.layer.toast(res.data.message)
  //         }
  //       })
  //     }
  //   })
  // }
  window.spListJS = exportObj
})()
