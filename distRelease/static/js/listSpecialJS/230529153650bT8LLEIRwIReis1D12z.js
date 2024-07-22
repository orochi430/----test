//政务微信 每日要情 附件预览
;(function () {
  const exportObj = {}
  exportObj.link = function (listId, moduleId, pk, vueData, itemValue) {
    dsf.http.post("ctrl/reportReadLog/accessed", { infoId: pk }).then(res => {})
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
            title: itemValue["B0001"]
          }
        })
      } else {
        dsf.layer.toast("暂无附件")
      }
    })
  }

  window.spListJS = exportObj
})()
