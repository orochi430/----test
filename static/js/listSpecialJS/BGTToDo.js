//平台 待办列表时间特殊处理
;(function () {
  const exportObj = {}
  function getDateFieldContent(time) {
    let serverTime = new Date().getTime()
    const itemTime = new Date(time).getTime()
    const diff = parseInt((serverTime - itemTime) / 1000)
    let str = ""
    const level1 = 60,
      level2 = 60 * 60,
      level3 = 60 * 60 * 24,
      level4 = 60 * 60 * 24 * 4
    if (diff < level1) {
      str = "1分钟内"
    } else if (diff >= level1 && diff < level2) {
      str = `${parseInt(diff / level1)}分钟前`
    } else if (diff >= level2 && diff < level3) {
      str = `${parseInt(diff / level2)}小时前`
    } else if (diff >= level3 && diff < level4) {
      str = `${parseInt(diff / level3)}天前`
    } else if (diff >= level4) {
      str = time.split(" ")[0]
    }
    return str
  }
  exportObj.init = function (vueData) {
    if (vueData.data.length) {
      vueData.data.forEach(item => {
        item.dataValue.moduleNameAndNode = item.dataValue.moduleNameAndNode.split("(")[0]
        item.dataValue.time = item.dataValue.arrivalTime
      })
    }
  }
  exportObj.dataFilter = function (listData, vueData) {
    // vueData.columns[1].icon = 'iconleixing'
    // vueData.columns[2].icon = 'iconren'
    // vueData.columns[3].icon = 'iconrili'
    // vueData.columns[4].showCategory = ''
    listData.forEach(item => {
      item.dataValue.moduleNameAndNode = item.dataValue.moduleNameAndNode.split("(")[0]
      item.dataValue.time = item.dataValue.arrivalTime
    })
    // vueData.columns.push({
    //   showCategory: "userTemplate"
    // })
  }
  // exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  //   dsf.layer.loading()
  //   dsf.http
  //     .post(`ctrl/instructions/signedFile`, { id: moduleId=='230716135502ednDlLWLSO8VsLwqzrC' ? itemValue.id : pk, moduleId: moduleId})
  //     .then(res => {
  //       dsf.layer.clear()
  //       if (res.data.code == 200 && res.data.data && res.data.data.fileId) {
  //         let data = res.data.data
  //           vueData.$parent.$parent.$parent.selected = itemValue
  //           let type = data.fileName.substr(data.fileName.lastIndexOf(".") + 1)
  //           let file = {
  //             id: data.fileId,
  //             title: type != "ofd" && type != "pdf" ? data.fileName.substr(0, data.fileName.lastIndexOf(".")) + ".pdf" : data.fileName,
  //             isHandleWrite: true
  //           }
  //           let formData = {
  //             info_id: itemValue.info_id,
  //             moduleId: itemValue.moduleId,
  //             nodeId: itemValue.nodeId,
  //             nodeName: itemValue.nodeName,
  //             flowId: itemValue.flowId,
  //             pId: itemValue.pid,
  //             pnId: itemValue.pnid,
  //             type: 'todo'
  //           }
  //           dsf.shuke.shGovShuke(file, formData, shukeRes => {
  //             console.log(shukeRes)
  //             if (shukeRes.type == "send" || shukeRes.type == "save") {
  //               vueData.$parent.$parent.$parent.showFlowSend = true
  //               vueData.$parent.$parent.$parent.$nextTick(() => {
  //                 vueData.$parent.$parent.$parent.$refs["sendPop"].$el.style.display = "none"
  //                 vueData.$parent.$parent.$parent.$refs.sendFile.show("isList")
  //               })
  //             } else if (shukeRes.type == "close" || shukeRes.type == 'back') {
  //               vueData.$eventBus.refresh(vueData)
  //             }
  //           })
  //       } else {
  //         vueData.$router.push({
  //           path: `/commonForm/${moduleId}/${pk}/1?todoId=${itemValue.todoId}`
  //         })
  //       }
  //     })
  //     .catch(err => {
  //       vueData.$router.push({
  //         path: `/commonForm/${moduleId}/${pk}/1?todoId=${itemValue.todoId}`
  //       })
  //     })
  // }
  window.spListJS = exportObj
})()
