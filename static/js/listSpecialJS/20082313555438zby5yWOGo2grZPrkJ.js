//待签收列表
;(function () {
  const exportObj = {}
  function readNote(pk, moduleId, itemValue) {
    var isRead = itemValue["C-R-RCV-0047.value"]
    if (isRead != 1) {
      var data = { pk: pk, operateType: 54, reason: "" }
      var mode = itemValue["C-R-RCV-0088.value"]
      var modeType = itemValue["C-R-RCV-0089.value"]
      var url = "ctrl/remoteNoteController/remoteDocStatus"
      if (modeType == "5" && mode == "6") {
        url = "ctrl/exRemoteInterfaceController/readDoc"
      }
      dsf.http.post(url, data).then(res => {
        itemValue["C-R-RCV-0047.value"] = 1
      })
    }
  }
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    let isJoint = itemValue["C-R-RCV-0042.value"]
    let signStatus = itemValue["C-R-RCV-0011.value"]
    let mode = itemValue["C-R-RCV-0088.value"]
    let modeType = itemValue["C-R-RCV-0089.value"]
    let lwType = itemValue["C-R-RCV-0002"]
    let isFeedback = itemValue["C-R-RCV-0041.value"]
    let backDoc = itemValue["C-R-RCV-0056"]
    if (lwType == "便笺发送" || lwType == "便笺回复" || (modeType == "5" && mode == "6")) {
      let isread = itemValue["C-R-RCV-0047"]
      if (isread != 1) {
        readNote(pk, moduleId, itemValue)
      }
    }
    if (lwType == "便笺发送" || lwType == "便笺回复" || (modeType == "5" && mode == "6")) {
      let url = "/commonForm/" + moduleId + '/' + pk + "?listId=20082313555438zby5yWOGo2grZPrkJ&method=noteRcv&validateByList=1"
      vueData.$router.push(url)
    } else if (modeType == '6'){
      let url = "/commonForm/" + moduleId + '/' + pk + "?listId=20082313555438zby5yWOGo2grZPrkJ&method=noticeMeetingRcv&validateByList=1";
      vueData.$router.push(url)
    } else if(modeType == '8') {
      let url = "/commonForm/" + moduleId + '/' + pk + "?listId=20082313555438zby5yWOGo2grZPrkJ&method=topicMeetingRcv&validateByList=1";
      vueData.$router.push(url)
    } else if (isFeedback == "1") {
      let url = "/commonForm/" + moduleId + '/' + pk + "?listId=20082313555438zby5yWOGo2grZPrkJ&method=customNode&openNodeId=feedback&validateByList=1"
      vueData.$router.push(url)
    } else if (backDoc != null && backDoc != "") {
      let url = "/commonForm/" + moduleId + '/' + pk + "?listId=20082313555438zby5yWOGo2grZPrkJ&method=customNode&openNodeId=back&validateByList=1"
      vueData.$router.push(url)
    } else {
      let url = ""
      if (isJoint == 4) {
        //open意见征求(专用纸)
        url = "/commonForm/" + moduleId + '/' + pk + "?listId=ExchangeRecvList&method=solicit&isJoint=" + isJoint + "&validateByList=1"
      } else {
        url = "/commonForm/" + moduleId + '/' + pk + "?listId=20082313555438zby5yWOGo2grZPrkJ&isJoint=" + isJoint + "&validateByList=1"
      }

        dsf.http.post("ctrl/remoteExchangeData/getSettings").then(res => {
          if (res.data.data && res.data.data.previewReceived === true && (signStatus == 0 || signStatus == 4)) {
            url += `&isJoint=${isJoint}&fromList=ExchangeUnsignedList`
          }
          vueData.$router.push(url)
        })
    }
  }

  window.spListJS = exportObj
})()
