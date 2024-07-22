//公文交换 已签收列表
;(function () {
  const exportObj = {}

  exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
    let rcvRecordId = ""
    let isJoint = itemValue["C-R-RCV-0042.value"]
    let isFeedback = itemValue["C-R-RCV-0041.value"]
    let backDoc = itemValue["C-R-RCV-0056"]

    let url = ""
    let lwType = itemValue["C-R-RCV-0002"]
    let modeType = itemValue["C-R-RCV-0089.value"]
    if (lwType == "便笺发送" || lwType == "便笺回复") {
      url = `/commonForm/${moduleId}/${pk}?listId=20082313555438zby5yWOGo2grZPrkJ&method=noteRcv&validateByList=1`
    } else if (modeType == "6" || modeType == "8") {
      let sourceId = itemValue["A0003"]
      if (sourceId != "") {
        await dsf.http.post("ctrl/remoteExchangeData/getInboxData", { pk: sourceId }).then(result => {
          if ("success" == result.data.type) {
            let targetObj = result.data.data
            if (targetObj.pid != "" && targetObj.pnid) {
              url = `/commonForm/${targetObj.moduleId}/${sourceId}?todoId=${targetObj.pid}_${targetObj.pnid}`
              // url += "?moduleId="+targetObj.moduleId+"&pk="+sourceId+"&todoId="+targetObj.pid+"_"+targetObj.pnid;
            } else {
              url = `/commonForm/${targetObj.moduleId}/${sourceId}?listId=20082313555438zby5yWOGo2grZPrkJ&method=customNode&openNodeId=-1&validateByList=1`
              // url += "?moduleId="+targetObj.moduleId+"&pk="+sourceId+"&listId=20082313555438zby5yWOGo2grZPrkJ&method=meetingRcv&validateByList=1";
            }
          } else {
            url = `/commonForm/${moduleId}/${pk}?listId=20082313555438zby5yWOGo2grZPrkJ&method=noteMeetingRcv&validateByList=1`
            // url += "?moduleId=" + moduleId + "&pk=" + pk + "&listId=20082313555438zby5yWOGo2grZPrkJ&method=noteMeetingRcv&validateByList=1"
          }
        })
      } else {
        url = `/commonForm/${moduleId}/${pk}?listId=20082313555438zby5yWOGo2grZPrkJ&method=noteMeetingRcv&validateByList=1`
        // url += "?moduleId=" + moduleId + "&pk=" + pk + "&listId=20082313555438zby5yWOGo2grZPrkJ&method=noteMeetingRcv&validateByList=1"
      }
    } else if (isFeedback == "1") {
      url = `/commonForm/${moduleId}/${pk}?listId=20082313555438zby5yWOGo2grZPrkJ&method=customNode&openNodeId=feedback&validateByList=1`
    } else if (backDoc != null && backDoc != "") {
      url = `/commonForm/${moduleId}/${pk}?listId=20082313555438zby5yWOGo2grZPrkJ&method=customNode&openNodeId=back&validateByList=1`
    } else if (isJoint == 4) {
      //open意见征求(专用纸)
      url = `/commonForm/${moduleId}/${pk}?listId=ExchangeRecvList&method=solicit&isJoint=${isJoint}&validateByList=1`
    } else {
      url = `/commonForm/${moduleId}/${pk}?listId=ExchangeRecvList&method=view&validateByList=1&rcvRecordId=${rcvRecordId}`
    }
    vueData.$router.push(url)
  }

  window.spListJS = exportObj
})()
