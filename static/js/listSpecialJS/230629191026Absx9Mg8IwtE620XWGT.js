;(function () {
  const exportObj = {}
  exportObj.link = function (listId, moduleId, pk, vueData, itemValue) {
    let pk1 = itemValue["R_SEND.A0001"]
    let sourceId = itemValue["R_SEND.A0003"]
    let remoteId = itemValue["R_SEND.A0002"]
    let isJoint = itemValue["R_SEND.C-R-SEND-0018.value"]
    let isFeedback = itemValue["R_SEND.C-R-SEND-0026.value"]
    let oSourceId = sourceId
    if (remoteId != null && remoteId) {
      sourceId = remoteId
    }
    //会办回执 remoteId对应收文Id  需要改回去
    if (isJoint == "4" && isFeedback == "1") {
      sourceId = oSourceId
    }
    dsf.http.post("ctrl/remoteExchangeData/getSourceInfo", { pk: sourceId }).then(res => {
      if (res.data.data && res.data.data.moduleId) {
        //显示原始发文表单
        let moduleId = res.data.data.moduleId
        let method = moduleId === "210707145344LPXsq29VZpFlHVL0UC1" ? "copyWithCC" : "view" //直接退文
        vueData.$router.push({
          path: `/commonForm/${moduleId}/${sourceId}`,
          query: {
            listId: "190316140427ei4dhLyKFj8xMKKXKHs",
            method: method,
            sendRecordId: pk1,
            canSaveFid: false,
            fromList: "sendRecord"
          }
        })
      } else {
        // console.error("打开失败")
        dsf.layer.toast('未找到对应表单')
      }
    })
  }
  exportObj.exchangeBackReason = function (listData, vueData) {
    let pk = listData.dataValue["REMOTE_DETAIL.C-R-SEND-DETAIL-0022"] //退文单的id
    let status = listData.dataValue["REMOTE_DETAIL.C-R-SEND-DETAIL-0004.value"] //退文类型
    if (status == -2) {
      if (listData.dataValue["REMOTE_DETAIL.C-R-SEND-DETAIL-0011.value"]) {
        dsf.layer.alert({
          title: "",
          message: listData.dataValue["REMOTE_DETAIL.C-R-SEND-DETAIL-0011.value"]
        })
      } else {
        dsf.layer.toast("无退回原因")
      }
    } else {
      dsf.http.post("ctrl/common/getFileInfo", { pk: pk }).then(result => {
        let moduleId = result.data.moduleId

        if (status == -4) {
          vueData.$router.push({
            path: `/commonForm/${moduleId}/${pk}?reloadParentFormOnSave=true&listId=ExchangeRecvList&method=view&validateByList=1`
          })
        } else if (status == -5) {
          dsf.http.post("ctrl/remoteExchangeData/getAttachInfo", { pk: pk }, function (res) {
            if (res.data && res.data.type === "success") {
              var fileName = res.data.data.fileName
              var fileId = res.data.data.id
              if (fileId) {
                vueData.$router.push({
                  path: `/filePreview/${fileId}/210104164115YE5FsFODVtUQG3cWkTt`,
                  query: {
                    title: fileName
                  }
                })
              } else {
                dsf.layer.toast("未找到正文")
              }
            } else if (res.data && res.data.type === "error") {
              dsf.layer.toast(res.data.message)
            } else {
              dsf.layer.toast("请求出错")
            }
          })
        } else {
          dsf.layer.toast("不支持查看")
        }
      })
    }
  }
  window.spListJS = exportObj
})()
