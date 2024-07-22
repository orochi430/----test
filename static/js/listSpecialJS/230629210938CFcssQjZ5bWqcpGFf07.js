//51348 【上海市人大一体化】移动端列表点击后直接展示表单附件预览
;(function () {
  const exportObj = {}
  exportObj.link = function (listId, moduleId, pk, vueData, itemValue) {
    let params = {
      pk: pk,
      nrType: ""
    }
    dsf.http.post("fn/editor/getAttachInfoData", params).then(({ data }) => {
      let fileArray = data.data.fileArray

      let firstFile = fileArray[0]

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
