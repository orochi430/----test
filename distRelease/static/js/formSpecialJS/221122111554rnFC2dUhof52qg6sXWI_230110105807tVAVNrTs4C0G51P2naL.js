//电气 阅文专用单 
(function () {
  const exportObj = {}

  exportObj.sendAfter = function (formData, formMeta, vueData) {
    // ( infoId,distribId,allowShare,isImport,importPri,selectedTabs,extendOpt)
    //    pk  ,    0 ,       -1        -1       -1           ""       extendOpt:{isNeedNum:-1,roles:'',startNum:B0014,totalNum:B0063}
    if (formMeta.parameters.nodeId == "x0fcWhnQp9BZ4NH") { // 在办公室审核环节进行自动分阅，通过穿越领导和传阅部门
      let usersMap = formData.main['C-ELECTRIC-READING-005']
      let deptMap = formData.main['C-ELECTRIC-READING-006']
      let infoId = formData.main['A0001'].value
      if ((usersMap && usersMap.value && usersMap.value.length > 0) || (deptMap && deptMap.value && deptMap.value.length > 0)) {
        let userIds = usersMap.value;
        let deptIds = deptMap.value;
        dsf.http.post("ctrl/ReadCommonController/getShowFlowInfoNew", {
          "userIds": userIds,
          "deptIds": deptIds,
          "pk": infoId
        }).then(result => {
          if (result.data.type == "success") {
            let responseData = result.data.data
            if (Object.keys(responseData).length < 0) {
              return
            }

            let time = new Date();
            let timeInfo =
              (time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds())
            var data = {
              infoId: infoId,
              userIds: responseData.idsStr,
              userNames: responseData.userNamesStr, //wuj 分阅的时候保存只需要人名 .substring(text.indexOf("-")+1)
              schemaVals: responseData.schemasStr,
              distribId: "0",
              canRedistrib: 1,
              infoType: "",
              infoTypeText: "",
              shareContent: "",
              shareList: "[]",
              isSms: "1",
              filterCharge: -1,
              smsContent: dsf.util.loadSessionStore("user").name + "于" + timeInfo + "给您分阅了阅文专用单《" + formData.main['B0001'].value + "》，请尽快查阅！",
              contentRange: "-1",
              isEndSms: "1"
            }
            doShareRequest(data);
          }
        })

      }
    }
  }

  function doShareRequest(data) {
    dsf.http.post("ctrl/shareRead/toShare", data).then(result => {
      if (result.data.type === "success") {
        vueData.backSucces()
      } else {
        dsf.layer.toast(result.data.message);
      }
    })
  }
  //阅毕
  exportObj.custom1 = function (formData, formStruct, vueData) {
      dsf.http
        .post("fn/mobileToReadOperation/readed", {
          infoIds: vueData.pk,
          distribIds: vueData.$route.query.distribId
        })
        .then(({
          data
        }) => {
          const {
            message,
            result,
            type
          } = data;
          if (type === "success" || result) {

            dsf.http.post("ctrl/ReadCommonController/readedAutoSend", {
              infoid: vueData.pk
            }).then(result => {
              if (result.data.type == "success") {
                let data = result.data.data;
                if (!data) {
                  vueData.backSucces()
                  return;
                }
                var param = {
                  todoData: JSON.stringify(data)
                }
                dsf.http.post("ctrl/flow/batchEndNode", param).then(result => {
                  if (result.data.type == "success") {
                    dsf.http.post("ctrl/ReadCommonController/deletePnodesAbn", {
                      infoid: vueData.pk
                    }).then((res) => {
                      if (res.data.type = "success")
                        vueData.backSucces();
                    })
                  } else {
                    dsf.layer.toast(result.data.message)
                  }
                })
              }
            })
          }
        })

    },


    window.spJS = exportObj
})()
