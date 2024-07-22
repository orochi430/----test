// 经信委--值班查看
;(function () {
  const exportObj = {}

  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    dsf.layer.loading()
    dsf.http
      .post("ctrl/dutyEconomic/getAttachmentId", {
        infoId: pk,
        // moduleId: moduleId,
        // nodeId: -1,
        // formId: ""
      })
      .then(res => {
        dsf.layer.clear()
        let fileId = res.data.data.fileId
        let fileName = res.data.data.fileName
        if (fileId) {
          dsf.util.filePreview({ fileId: fileId, fileName: fileName, moduleId: moduleId })
        } else {
          vueData.$router.push({
            path: `/commonForm/${moduleId}/${pk}?listId=${listid}`
          })
        }
      })
      .catch(err => {
        vueData.$router.push({
          path: `/commonForm/${moduleId}/${pk}?listId=${listid}`
        })
      })
  }
  window.spListJS = exportObj
})()
