// 一体化办公厅 已阅
;(function () {
  const exportObj = {}
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    dsf.layer.loading()
    dsf.http
      .post(`ctrl/p2433Common/check/instructions`, { pk: pk, distribId: itemValue.distribId })
      .then(res => {
        dsf.layer.clear()
        if (res.data.code == 200 && res.data.data && res.data.data.nrId) {
          let data = res.data.data
          if (res.data.data.isRead) {
            dsf.util.filePreview({ fileId: data.nrId, fileName: data.fileName, moduleId: itemValue.moduleId })
          }
        } else {
          vueData.$router.push({
            path: `/commonForm/${itemValue.moduleId}/${itemValue.id}`,
            query: {
              type: "yywj",
              distribId: 0,
              fdistribId: 0,
              realDistribId: itemValue.distribId
            }
          })
        }
      })
      .catch(err => {
        vueData.$router.push({
          path: `/commonForm/${itemValue.moduleId}/${itemValue.id}`,
          query: {
            type: "yywj",
            distribId: 0,
            fdistribId: 0,
            realDistribId: itemValue.distribId
          }
        })
      })
  }
  window.spListJS = exportObj
})()
