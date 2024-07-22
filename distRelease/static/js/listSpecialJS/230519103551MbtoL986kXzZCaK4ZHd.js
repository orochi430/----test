//一体化 刊物管理 附件预览
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
        let privileges = dsf.util.loadLocalStore("user").privileges || [];
        vueData.$router.push({
          path: `/filePreview/${firstFile.fileId}`,
          query: {
            title: itemValue['KWXX.B0001'],
            moduleId: moduleId,
            isShowAddPage: 0,
            isHandwrite: privileges.find(item => item.name == '刊物查看领导') ? 1 : 0,
            leaderUser: privileges.find(item => item.name == '刊物查看领导') ? dsf.util.loadLocalStore("user").user_id : ''
          }
        })
      } else {
        dsf.layer.toast("暂无附件")
      }
    })
  }

  window.spListJS = exportObj
})()
