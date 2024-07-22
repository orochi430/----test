// 政务微信 政研动态列表 点击附件
;(function () {
  const exportObj = {}
  exportObj.initHandle = function (vueData) {
    vueData.readStatusKey = "XXBS_FWJL.230601155316AhhCZ7nIfqa8jZ0ZcHE"
    vueData.haveReadVal = 1
  }
  exportObj.link = function (listId, moduleId, pk, vueData, itemValue) {
    dsf.http.post("ctrl/reportReadLog/accessed", { infoId: pk }).then(res => {
      if (res.data.code == 200) {
        itemValue["XXBS_FWJL.230601155316AhhCZ7nIfqa8jZ0ZcHE"] = 1
      }
    })
    let params = {
      pk: pk,
      nrType: ""
    }
    dsf.http.post("fn/editor/getAttachInfoData", params).then(({ data }) => {
      let fileArray = data.data.fileArray

      let firstFile = fileArray.find(file => file.attvalue == 3)
      if (!firstFile) {
        firstFile = fileArray.find(file => file.attvalue == 2)
      }
      if (!firstFile) {
        firstFile = fileArray.find(file => file.attvalue == 0)
      }

      if (firstFile) {
        vueData.$router.push({
          path: `/filePreview/${firstFile.fileId}/210104164115YE5FsFODVtUQG3cWkTt`,
          query: {
            title: itemValue["KWXX.B0001"]
          }
        })
      } else {
        dsf.layer.toast("暂无附件")
      }
    })
  }

  window.spListJS = exportObj
})()
