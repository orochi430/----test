// 秘书 领导已阅
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
      path: `/commonForm/${moduleId}/${pk}`,
      query: {
        listId: listid,
        distribId: itemValue["FYMK.S-BASE-0001.value"],
        fdistribId: itemValue["FYMK.S-DISTRIB-USER-0002.value"],
        dataFrom: 3
      }
    })
  }
  exportObj["xform.shareLeaderConfirm"] = function (data, vueData) {
    dsf.layer.loading()
    dsf.http.post("ctrl/leaderShareRead/changeProcessMode", { distribIds: data.dataValue["FYMK.S-BASE-0001.value"], type: 4 }).then(res => {
      dsf.layer.clear()
      if (res.data.code == 200) {
        dsf.layer.toast("操作成功")
        vueData.onRefresh()
      } else {
        dsf.layer.toast(res.data.message)
      }
    })
  }
  exportObj["xform.toJySec"] = function (data, vueData) {
    dsf.layer.loading();
    dsf.http
      .post("ctrl/instructionsInfo/toSec", {
        distribId: data.dataValue["FYMK.S-BASE-0001.value"]
      })
      .then((res) => {
        dsf.layer.clear();
        if (res.data.code == 200) {
          dsf.layer.toast("发送成功", "success", () => {
          vueData.onRefresh()
          });
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
  }
  window.spListJS = exportObj
})()
