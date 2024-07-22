//电气 阅文专用单 标题点击
(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    // for (let item of formStruct.controls) {
    //   if (item.label == "标题" && item.privilege.editable == false) {
    //     let textAttach = formData.attach["attach-0"]
    //     if (textAttach.length > 0) {
    //       let paramVal = {
    //         fileId: textAttach[0].id,
    //         moduleId: formStruct.parameters.moduleId,
    //         fileName: textAttach[0].fileName,
    //         nodeId: -7,
    //         screenWidth: 375,
    //         "x-auth-token": dsf.util.loadSessionStore("loginToken"),
    //         addLoading: 1
    //       }

    //       let titleEle = vueData.$refs.formTab[0].$refs.B0001[0].$refs.controlTextBox.$el.childNodes[0].childNodes[0];
    //       titleEle.innerHTML = `<span class="van-field__control" id="goElc" onclick="goEnc()">${formData.main["B0001"].value}</span>`
    //       document.getElementById("goElc").onclick = function goEnc() {
    //         dsf.http.post('/fn/office/openMobileOffice', paramVal).then(res => {
    //           if (res.data.code == 200) {
    //             vueData.$router.push({
    //               name: "dsfIframe",
    //               query: {
    //                 url: res.data.message,
    //                 title: textAttach[0].fileName
    //               },
    //             });

    //           }
    //         })
    //       };
    //     } else {
    //       dsf.layer.toast("无正文文件")
    //     }
    //     break
    //   }
    // }

    if (!vueData.pk) {
      let param = {
        deptId: "",
        type: 1
      }
      //初始化
      dsf.http.post("ctrl/applicationForm/getDeptUser", param).then(res => {
        if (res.data.type == "success") {
          vueData.$set(formData.main, "C-ELECTRIC-READING-007", {
            schema: res.data.data.userSchema,
            text: res.data.data.userText,
            value: res.data.data.userValue
          })
          // formData.main["C-ELECTRIC-READING-007"].schema=res.data.data.userSchema;
          // formData.main["C-ELECTRIC-READING-007"].text=res.data.data.userText;
          // formData.main["C-ELECTRIC-READING-007"].value=res.data.data.userValue;
        } else {
          dsf.layer.toast("获取失败！")
        }
      })
    }
    dsf.http.post("ctrl/ReadCommonController/ifShowOption", {}).then(result => {
      if (result.data.type == "success") {
        let data = result.data.data;
        if (!data) {
          formStruct.controls.find(item =>
            item.metaId == "controlShareOpinion"
          ).show = 0
        }
      }
    })

  }
  //传阅领导和传阅部门其中必须选一个
  exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise((resolve, reject) => {
      console.log(formData);
      if (formData.main["C-ELECTRIC-READING-005"].value || formData.main["C-ELECTRIC-READING-006"].value) {
        // let leader = formData.main["C-ELECTRIC-READING-005"];
        let dept = formData.main["C-ELECTRIC-READING-006"].value;
        if (dept) {
          dsf.http.post("ctrl/ReadCommonController/ifExitDeptLeader", {
            "deptIds": dept
          }).then(result => {
            if (result.data.type == "success") {
              if (!result.data.data) {
                reject("所传阅部门下不存在部门负责人角色的用户");
              } else {
                resolve()
              }
            }
          })
        } else
          resolve()
      } else {
        reject("请选择传阅领导或传阅部门")
      }

    })
  }

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
