// 会议室预定   民政部表单 2022年9月21日12:42:16
(function () {
  const exportObj = {};
  //取消预定
  exportObj.cancelMeetingRoom = function (formData, formStruct, vueData) {
    dsf.layer.confirm({
      message: '确认要取消预定？',
      confirmButtonText: '确认'
    }, () => {
      dsf.http
        .get("fn/mcaSystemController/customMettingRoomCancelled", { masterIds: formData.main["B0035"].value })
        .done(res => {
          if (res.type == "success") {
            dsf.layer.toast("操作成功", true, () => vueData.backSucces());
          } else {
            dsf.layer.toast(res.message, false);
          }
        });
    })
  };
  function deepCopy(data) {
    return JSON.parse(JSON.stringify(data))
  }
  //会议类型联动
  function controlChange_hylx(busObj, formData, formStruct, vueData) {
    var meetingType = formData.main["c-meetingsq-075"];
    if (meetingType.value) {
      dsf.http.post("ctrl/meetingType/getMeetingType", {
        "meetingTypeId": meetingType.value
      }).then(({
        data
      }) => {
        let result = data;
        if (result.type == "success") {
          var data = result.data;
          //出席领导
          vueData.$set(formData.main, "c-meetingsq-052", {
            value: data.nonvotingLeader,
            text: data.nonvotingLeaderText,
            schema: data.nonvotingLeaderSchema
          })
          //参会部门
          vueData.$set(formData.main, "c-meetingsq-042", {
            value: data.chbm,
            text: data.chbmText,
            schema: data.chbmSchema
          })
          //参会人员
          vueData.$set(formData.main, "c-meetingsq-013", {
            value: data.chr,
            text: data.chrText,
            schema: data.chrSchema
          })
          //列席部门
          vueData.$set(formData.main, "c-meetingsq-043", {
            value: data.lxbm,
            text: data.lxbmText,
            schema: data.lxbmSchema
          })
        }
      });
    }
  }
  //会议室联动
  function controlChange_hys(busObj, formData, formStruct, vueData) {
    let value = "";
    let k = "210623152428L07zjDL6Kr847o48g6K";
    let isInit = false;
    if (busObj == null) {
      isInit = true
      value = formData.main["c-meetingsq-009"].value;
      if (value == "QT") {
        formStruct.controls.find(element => element.metaId == "c-meetingsq-090").show = 1;
      } else {
        formStruct.controls.find(element => element.metaId == "c-meetingsq-090").show = 0;
        formData.main["c-meetingsq-090"].value = "";
      }
    } else {
      value = busObj.value;
    }
    let subformOldData;//formData.subform[k];
    if (formData.multinfos[k] && formData.multinfos[k].rows) {
      subformOldData = formData.multinfos[k].rows;
        if (value != hysIdOld) {
          hysIdOld = value;
          //会场资源清空
          subformOldData.forEach(element => {
            element.action = "Deleted";
          });
        } else {
          return;
        }
        if (value == "QT") {
          formStruct.controls.find(element => element.metaId == "c-meetingsq-090").show = 1;
        } else {
          formStruct.controls.find(element => element.metaId == "c-meetingsq-090").show = 0;
          formData.main["c-meetingsq-090"].value = "";

          let nodeId = formStruct.parameters.nodeId;
          if (value && (isInit || nodeId == "0" || nodeId == "-2")) {
            //加载会场资源
            let hyzyIds = {};
            subformOldData.forEach(element => {
              hyzyIds[element.B0035.value] = element
            });

            dsf.http.post("fn/meetingResource/getResourceTypeDataForHy", {
              hys: value
            }).then(({
              data
            }) => {
              let result = data;
              if (result.type == "success") {
                let subformData = [];
                let pk = formStruct.parameters.pk;
                result.data.forEach(item => {
                  if (!hyzyIds[item.id]) {
                    subformData.push({
                      "210623152428L07zjDL6Kr847o48g6K": {
                        "foreign": pk,
                        "value": ""
                      },
                      "C-MEETINGBI-0022": {
                        "value": item.mc
                      },
                      "B0035": {
                        "value": item.id
                      },
                      "action": "Updated"
                    });
                  } else {
                    vueData.$set(hyzyIds[item.id], "action", "Updated")
                  }
                });

                subformOldData = [];
                Object.entries(hyzyIds).forEach((item) => {
                  subformOldData.push(item[1]);
                });
                let subformDefaultData = JSON.parse(JSON.stringify(formStruct.subform[k].controls.find(item => item.metaId == k).defaultValue));
                if (subformData.length) {
                  let postdata = {
                    size: subformData.length,
                    multiple: true
                  };
                  dsf.http.get("fn/common/generateUUID", postdata).then(({
                    data
                  }) => {
                    let uuidArray = data.data.UUID;
                    subformData.forEach((item, index) => {
                      let newData = {}
                      newData = deepCopy(subformDefaultData)
                      newData[k].value = uuidArray[index]
                      newData["C-MEETINGBI-0022"] = item["C-MEETINGBI-0022"];
                      newData["B0035"] = item["B0035"];
                      newData["action"] = item.action;
                      newData["structControl"] = deepCopy(vueData.$refs.formTab[0].$refs['210623152428L07zjDL6Kr847o48g6K'][0].$refs.subform.structControl);
                      subformOldData.push(newData);
                    });
                    vueData.$set(formData.multinfos[k], "rows", subformOldData)
                  })
                } else {
                  vueData.$set(formData.multinfos[k], "rows", subformOldData)
                }
              }
            });
          }
        }
    }
  
  }
  let hysIdOld = "";
  exportObj.initHandle = function (formData, formStruct, vueData) {
    //console.log('新会议室预定')
    hysIdOld = formData.main["c-meetingsq-009"].value;
    let meetingId = dsf.util.loadSessionStore("checkedMettingRoom") ? dsf.util.loadSessionStore("checkedMettingRoom").value : null
    let addressData
    let addressArr = vueData.formMeta.controls.filter(control => control.metaId == "c-meetingsq-009")
    if (meetingId && addressArr.length && addressArr[0].enumData) {
      addressData = addressArr[0].enumData.filter(data => data.value == meetingId)[0]
      formData.main["c-meetingsq-009"].value = addressData.value
      formData.main["c-meetingsq-009"].text = addressData.text
    }
    controlChange_hys(null, formData, formStruct, vueData);

    //会议室联动
    vueData.$bus.on("checkVal", function (busObj) {
      //console.log(busObj);
      if (busObj.metaData.metaId == "c-meetingsq-009") {
        controlChange_hys(busObj, formData, formStruct, vueData);
      }

      if (busObj.metaData.metaId == "c-meetingsq-075") {
        //controlChange_hylx(busObj, formData, formStruct, vueData);
      }

    })
  }

  exportObj.saveFilter = function (formData, formStruct, vueData) {
    function filterTime(time) {
      // console.log(time)
      var str = time.replace(/-/g, "/")
      return str
    }
    return new Promise(function (resolve, reject) {
      try {
        // resolve()
        // return
        let startTime = Date.parse(filterTime(formData.main["c-meetingsq-007"].value)) || ""
        let endTime = Date.parse(filterTime(formData.main["c-meetingsq-008"].value)) || ""
        let now = new Date()
        // console.log(startTime, endTime)
        if (startTime && endTime) {
          if (now > startTime) {
            reject("开始时间已过")
          } else if (endTime <= startTime) {
            reject("结束时间必须大于开始时间")
          } else {
            if (!vueData.$route.query.todoId) {
              // 非待办发送 先判断会议室占用情况
              dsf.http.post('fn/meetingRoomOccupy/checkRoomOccupy', {
                pk: formData.main['B0035'].value, //vueData.formMeta.parameters.pk
                hys: formData.main['c-meetingsq-009'].value,
                sdate: formData.main['c-meetingsq-007'].value,
                edate: formData.main['c-meetingsq-008'].value
              }).done(res => {
                if (res.type == 'success') {
                  // 会议室预定时，不同的会议室可以走不同的流程，为空时走默认流程
                  let button = [...vueData.formButtons.mainButtons, ...vueData.formButtons.commonButtons].find(button => button.action == 'send');
                  if (button && button.parameters) {
                    // 会议室预定时，不同的会议室可以走不同的流程，为空时走默认流程
                    dsf.http.post('/fn/meetingRoom/getFlowByHys', {
                      hys: formData.main['c-meetingsq-009'].value
                    }).done(response => {
                      if (response.code == 200 && response.data) {
                        button.parameters.find(item => item.key == 'wfId').value = response.data
                      }
                      resolve()
                    })
                  } else {
                    resolve()
                  }
                } else {
                  reject(res.message);
                }
              })
            } else {
              resolve()
            }
          }
        } else {
          reject("请填写会议时间")
        }
        // resolve()
      } catch (error) {
        console.log(error)
        resolve()
      }

    })
  }

  window.spJS = exportObj;
})();

