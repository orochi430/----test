// 一体化办公厅 审查意见书
;(function () {
  const exportObj = {}

  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    dsf.layer.loading()
    dsf.http
      .post("fn/mobileAttachment/getFormAttachment", {
        info_id: pk,
        infoId: pk,
        nodeId: -1,
        moduleId: moduleId
      })
      .then(res => {
        dsf.layer.clear()
        let attach = res.data.rows.find(item => item.attachType == 15)
        if (attach && attach.document) {
          dsf.util.filePreview({ fileId: attach.document[0].id, fileName: attach.document[0].title, moduleId: moduleId })
        } else {
          vueData.$router.push({
            path: `/commonForm/${moduleId}/${pk}?listId=${listid}`
          })
        }
      })
  }
  window.spListJS = exportObj
})()
