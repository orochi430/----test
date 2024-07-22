// 一体化财政局 发文
;(function () {
  const exportObj = {}
  function openShuke(item, vueData) {
    let type = item.title.substr(item.title.lastIndexOf(".") + 1)
    let file = {
      id: item.id,
      title: type != "ofd" && type != "pdf" ? item.title.substr(0, item.title.lastIndexOf(".")) + ".pdf" : item.title,
      isHandleWrite: true,
      isAfterReading: false,
      openToPage: item.pagination || 0
    }
    let formData = {
      info_id: vueData.formMeta.parameters.pk,
      moduleId: vueData.formMeta.parameters.moduleId,
      nodeId: vueData.formMeta.parameters.nodeId,
      nodeName: vueData.formMeta.parameters.nodeName,
      flowId: vueData.formMeta.parameters.flowId,
      pId: vueData.formMeta.parameters.pId,
      pnId: vueData.formMeta.parameters.pnId,
      type: "todo"
    }
    try {
      dsf.shuke.shGovShuke(file, formData, shukeRes => {
        console.log(shukeRes)
        if (shukeRes.openTime) {
          item.pagination = shukeRes.currentPage
          dsf.http
            .post("/fn/approvalFileInformation/save", {
              infoId: vueData.formMeta.parameters.pk,
              fileId: item.id,
              startTime: moment(Number(shukeRes.openTime)).format("yyyy-MM-DD hh:mm:ss"),
              endTime: moment(Number(shukeRes.closeTime)).format("yyyy-MM-DD hh:mm:ss"),
              pagination: shukeRes.currentPage,
              readingTime: Math.floor((shukeRes.closeTime - shukeRes.openTime) / 1000)
            })
            .then(res => {})
        }
        if (shukeRes.type == "send" || shukeRes.type == "save") {
          vueData.$bus.emit("iSignatureSend", {
            act: "send"
          })
        }
      })
    } catch (error) {

    }
  }
  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (
      vueData.formMeta.parameters.nodeId == "BbIyck4OdOOmc0g" ||
      vueData.formMeta.parameters.nodeId == "7tq3AGkQJQCKex3"
    ) {
      // 领导批示环节直接打开签批件
      let attachType = vueData.allFile.find(item => item.attachType == 12)
      if (attachType && attachType.file.length) {
        openShuke(attachType.file[0], vueData)
      }
    }
  }
  exportObj.custom1 = function (formData, formStruct, vueData) {
    console.log(formData, formStruct, vueData)
    vueData.componentName = 'calendarDialog'
  }
  exportObj.closeDialogCallback = function (data, actionName, formData, formMeta, vueData) {
    console.log(data, actionName)
    if (actionName == 'calendarDialog') {
      vueData.$set(formData.main, 'B0005', { value: data })
      if (formData.main['B0005'].value) vueData.handleActionClick("send")
    }
  }
  // 签批发送
  exportObj['iSignatureSend.send'] = function (formData, formStruct, vueData) {
    if (formStruct.parameters.nodeId == '7tq3AGkQJQCKex3') {
      vueData.handleActionClick("custom1")
    } else {
      vueData.handleActionClick("send")
    }
  }
  window.spJS = exportObj
})()
