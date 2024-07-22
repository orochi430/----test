// 一体化办公厅 待阅
;(function () {
  const exportObj = {}
    exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    dsf.layer.loading()
    dsf.http.post(`ctrl/p2433Common/check/instructions`, { pk: pk, distribId: itemValue.distribId }).then(res => {
      dsf.layer.clear()
      if (res.data.code == 200 && res.data.data && res.data.data.isRead) {
        vueData.$eventBus.refresh(vueData)
      }
      if (res.data.code == 200 && res.data.data && res.data.data.nrId) {
        let data = res.data.data
        let type = data.fileName.substr(data.fileName.lastIndexOf(".") + 1)
        let file = {
          id: data.nrId,
          title: (type != "ofd" && type != "pdf") ? data.fileName.substr(0, data.fileName.lastIndexOf(".")) + ".pdf" : data.fileName,
          isHandleWrite: data.isNeed,
          isAfterReading: !data.isNeed,
          openToPage: data.pagination || 0
        }
        let formData = {
          info_id: itemValue.info_id,
          moduleId: itemValue.moduleId,
          nodeId: itemValue.nodeId,
          distribId: itemValue.distribId,
          type: 'toRead'
        }
        if (res.data.data.isRead) {
          dsf.util.filePreview({fileId: data.nrId, fileName: data.fileName, moduleId: itemValue.moduleId})
        } else {
          dsf.shuke.shGovShuke(file, formData, shukeRes => {
            console.log(shukeRes)
            if (shukeRes.openTime) {
              dsf.http.post('/fn/approvalFileInformation/save', {
                infoId: formData.info_id,
                fileId: file.id,
                startTime: moment(Number(shukeRes.openTime)).format('yyyy-MM-DD hh:mm:ss'),
                endTime: moment(Number(shukeRes.closeTime)).format('yyyy-MM-DD hh:mm:ss'),
                pagination: shukeRes.currentPage,
                readingTime: Math.floor((shukeRes.closeTime - shukeRes.openTime) / 1000)
              }).then(res => {})
            }
            vueData.$eventBus.refresh(vueData)
          })
        }
      } else {
        vueData.$router.push(`/commonForm/${moduleId}/${pk}?type=ToRead&distribId=${itemValue.distribId}`)
      }
    }).catch(err => {
      vueData.$router.push(`/commonForm/${moduleId}/${pk}?type=ToRead&distribId=${itemValue.distribId}`)
    })
  }
  window.spListJS = exportObj
})()
