// 会议室预定
(function() {
  const exportObj = {};
  exportObj.handle = function(formData, formStruct) {};

  function deepCopy(data) {
    return JSON.parse(JSON.stringify(data));
  }
  //会议类型联动
  function controlChange_hylx(busObj, formData, formStruct, vueData) {
    var meetingType = formData.main["c-meetingsq-075"];
    if (meetingType.value) {
      dsf.http
        .post("fn/meetingType/getMeetingType", {
          meetingTypeId: meetingType.value
        })
        .then(({ data }) => {
          let result = data;
          if (result.type == "success") {
            var data = result.data;
            //出席领导
            vueData.$set(formData.main, "c-meetingsq-052", {
              value: data.nonvotingLeader,
              text: data.nonvotingLeaderText,
              schema: data.nonvotingLeaderSchema
            });
            //参会部门
            vueData.$set(formData.main, "c-meetingsq-042", {
              value: data.chbm,
              text: data.chbmText,
              schema: data.chbmSchema
            });
            //参会人员
            vueData.$set(formData.main, "c-meetingsq-013", {
              value: data.chr,
              text: data.chrText,
              schema: data.chrSchema
            });
            //列席部门
            vueData.$set(formData.main, "c-meetingsq-043", {
              value: data.lxbm,
              text: data.lxbmText,
              schema: data.lxbmSchema
            });
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
      isInit = true;
      value = formData.main["c-meetingsq-009"].value;
      if (value == "QT") {
        formStruct.controls.find(
          element => element.metaId == "c-meetingsq-090"
        ).show = 1;
      } else {
        formStruct.controls.find(
          element => element.metaId == "c-meetingsq-090"
        ).show = 0;
        formData.main["c-meetingsq-090"].value = "";
      }
    } else {
      value = busObj.value;
    }
    let subformOldData = formData.multinfos[k].rows; //formData.subform[k];
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
      formStruct.controls.find(
        element => element.metaId == "c-meetingsq-090"
      ).show = 1;
    } else {
      formStruct.controls.find(
        element => element.metaId == "c-meetingsq-090"
      ).show = 0;
      formData.main["c-meetingsq-090"].value = "";

      let nodeId = formStruct.parameters.nodeId;
      if (value && (isInit || nodeId == "0" || nodeId == "-2")) {
        //加载会场资源
        let hyzyIds = {};
        subformOldData.forEach(element => {
          hyzyIds[element.B0035.value] = element;
        });

        dsf.http
          .post("fn/meetingResource/getResourceTypeDataForHy", {
            hys: value
          })
          .then(({ data }) => {
            let result = data;
            if (result.type == "success") {
              let subformData = [];
              let pk = formStruct.parameters.pk;
              result.data.forEach(item => {
                if (!hyzyIds[item.id]) {
                  subformData.push({
                    "210623152428L07zjDL6Kr847o48g6K": {
                      foreign: pk,
                      value: ""
                    },
                    "C-MEETINGBI-0022": {
                      value: item.mc
                    },
                    B0035: {
                      value: item.id
                    },
                    action: "Updated"
                  });
                } else {
                  vueData.$set(hyzyIds[item.id], "action", "Updated");
                }
              });

              subformOldData = [];
              Object.entries(hyzyIds).forEach(item => {
                subformOldData.push(item[1]);
              });
              let subformDefaultData = JSON.parse(
                JSON.stringify(
                  formStruct.subform[k].controls.find(item => item.metaId == k)
                    .defaultValue
                )
              );
              if (subformData.length) {
                let postdata = {
                  size: subformData.length,
                  multiple: true
                };
                dsf.http
                  .get("fn/common/generateUUID", postdata)
                  .then(({ data }) => {
                    let uuidArray = data.data.UUID;
                    subformData.forEach((item, index) => {
                      let newData = {};
                      newData = deepCopy(subformDefaultData);
                      newData[k].value = uuidArray[index];
                      newData["C-MEETINGBI-0022"] = item["C-MEETINGBI-0022"];
                      newData["B0035"] = item["B0035"];
                      newData["action"] = item.action;
                      subformOldData.push(newData);
                    });
                    vueData.$set(formData.multinfos[k], "rows", subformOldData);
                  });
              } else {
                vueData.$set(formData.multinfos[k], "rows", subformOldData);
              }
            }
          });
      }
    }
  }
  let hysIdOld = "";
  exportObj.initHandle = function(formData, formStruct, vueData) {
    //console.log('新会议室预定')

    hysIdOld = formData.main["c-meetingsq-009"].value;
    let meetingId = dsf.util.loadSessionStore("checkedMettingRoom")
      ? dsf.util.loadSessionStore("checkedMettingRoom").value
      : null;
    let addressData;
    let addressArr = vueData.formMeta.controls.filter(
      control => control.metaId == "c-meetingsq-009"
    );
    if (meetingId && addressArr.length && addressArr[0].enumData) {
      addressData = addressArr[0].enumData.filter(
        data => data.value == meetingId
      )[0];
      // formData.main["c-meetingsq-009"].value = addressData.value
      // formData.main["c-meetingsq-009"].text = addressData.text
      vueData.$set(vueData.formData.main, "c-meetingsq-009", {
        value: addressData.value,
        text: addressData.text
      });
    }
    if (meetingId && dsf.util.loadSessionStore("checkedMettingStime")) {
      // formData.main["c-meetingsq-007"].value = util.loadSessionStore("checkedMettingStime") ? util.loadSessionStore("checkedMettingStime").value : null;
      vueData.$set(vueData.formData.main, "c-meetingsq-007", {
        value: dsf.util.loadSessionStore("checkedMettingStime").value
      });
      vueData.$set(vueData.formData.main, "c-meetingsq-008", {
        value: moment(
          new Date(dsf.util.loadSessionStore("checkedMettingStime").value)
        )
          .add(2, "hours")
          .format("YYYY-MM-DD HH:mm")
      });

      // let index = vueData.formMeta.controls.findIndex(item=>{
      //     return item.metaId == 'c-meetingsq-007'
      // })
      // vueData.$set(vueData.formMeta.controls[index], "defaultValue", {
      //     value: util.loadSessionStore("checkedMettingStime") ? util.loadSessionStore("checkedMettingStime").value : null,
      //     text: util.loadSessionStore("checkedMettingStime") ? util.loadSessionStore("checkedMettingStime").value : null
      // })
    }
    // controlChange_hys(null, formData, formStruct, vueData);

    //会议室联动
    vueData.$bus.on("checkVal", function(busObj) {
      console.log(busObj);
      if (busObj.metaData.metaId == "c-meetingsq-009") {
        if (
          formData.multinfos["220722142648kKYetU59O4DmtskAkoA"].rows.length > 0
        ) {
          formData.multinfos["220722142648kKYetU59O4DmtskAkoA"].rows.forEach(
            (ele, index) => {
              vueData.$set(
                formData.multinfos["220722142648kKYetU59O4DmtskAkoA"].rows[
                  index
                ],
                "action",
                "Deleted"
              );
            }
          );
        }
        console.log(vueData.formData.subform);
      }
      if (busObj.metaData.metaId == "c-meetingsq-075") {
        controlChange_hylx(busObj, formData, formStruct, vueData);
      }
    });

    vueData.$bus.on("inputRadio", function(busObj) {
      console.log(busObj);
      if (busObj.metaData.metaId == "c-meetingsq-114") {
        vueData.$set(vueData.formData.main, "c-meetingsq-008", {
          value: moment(
            new Date(filterTime(vueData.formData.main["c-meetingsq-007"].value))
          )
            .add(
              parseInt(
                vueData.formData.main["c-meetingsq-114"].text.replace(
                  "分钟",
                  ""
                )
              ),
              "minutes"
            )
            .format("YYYY-MM-DD HH:mm")
        });
      }
    });

    RenderList(); // 隐藏子表字段

    vueData.$bus.on("subFormTreeSelect", function(data) {
      console.log(data);
      data.selectArr.forEach((item, index) => {
        // 判重
        if (
          formData.multinfos["220722142648kKYetU59O4DmtskAkoA"].rows.find(
            row => row["220722142648kKYetU59O4DmtskAkoA"].value == item.id
          )
        )
          return;
        // 新增子表
        if (vueData.$refs.formTab[0]) {
          vueData.$refs.formTab[0].$refs[
            "220722142648kKYetU59O4DmtskAkoA"
          ][0].$refs.subform
            .addCard(false)
            .then(newData => {
              //会议使用资源-资源类别
              vueData.$set(newData, "C-MEETING-RESOURCE-001", {
                value: item.attrs.resourceTypeText
              });
              //会议使用资源-资源名称
              vueData.$set(newData, "C-MEETING-RESOURCE-003", {
                value: item.name
              });
              //会议使用资源-资源分类id
              vueData.$set(newData, "C-MEETING-RESOURCE-002", {
                value: item.attrs.resourceTypeId
              });
              //会议使用资源-资源id
              vueData.$set(newData, "C-MEETING-RESOURCE-004", {
                value: item.id
              });
              //会议使用资源-资源名称
              vueData.$set(newData, "C-MEETING-RESOURCE-006", {
                value: item.attrs.isWirteNum,
                text: item.attrs.isWirteNum > 0 ? "是" : "否"
              });
              if (item.attrs.isWirteNum < 0) {
                newData.structControl.find(
                  item => item.metaId == "C-MEETING-RESOURCE-005"
                ).show = false;
              }
            })
            .then(() => {
              RenderList();
            });
        }
      });
    });

    function RenderList() {
      // 根据回执项, 隐藏不需要显示的子表列
      for (let key in formData.multinfos) {
        if (formData.multinfos[key].rows.length > 0) {
          for (
            let index = 0;
            index < formData.multinfos[key].rows.length;
            index++
          ) {
            for (let key in formStruct.subform) {
              if (vueData.formData.multinfos[key]) {
                vueData.$watch(
                  function() {
                    return vueData.formData.multinfos[key].rows;
                  },
                  function(n, o) {
                    formData.multinfos[key].rows[index].structControl.forEach(
                      row => {
                        row.label == "资源分类id" ? (row.show = 0) : "";
                        row.label == "资源id" ? (row.show = 0) : "";
                        row.label == "是否填写数量" ? (row.show = 0) : "";
                      }
                    );
                  },
                  {
                    deep: true,
                    immediate: true
                  }
                );
              }
            }
            formData.multinfos[key].rows.forEach(row => {
              if (row["C-MEETING-RESOURCE-006"].value == "-1") {
                row.structControl.forEach(item => {
                  item.label == "数量" ? (item.show = 0) : "";
                });
              }
            });
          }
        }
      }
    }
  };
  function filterTime(time) {
    console.log(time);
    var str = time.replace(/-/g, "/");
    return str;
  }
  exportObj.saveFilter = function(formData, formStruct, vueData) {
    return new Promise(function(resolve, reject) {
      try {
        let startTime =
          Date.parse(filterTime(formData.main["c-meetingsq-007"].value)) || "";
        let endTime =
          Date.parse(filterTime(formData.main["c-meetingsq-008"].value)) || "";
        let now = new Date();
        console.log(startTime, endTime);
        if (startTime && endTime) {
          /****
           *1、 这里的判断只判断拟稿的时候时间有没有超
           *2、 在审批的时候不需要判断 让他可以继续走流程
           */
          if (!vueData.$route.query.todoId) {
            if (now > startTime) {
              reject("开始时间已过");
            } else if (endTime <= startTime) {
              reject("结束时间必须大于开始时间");
            } else {
              // 非待办发送 先判断会议室占用情况
              dsf.http
                .post("fn/meetingRoomOccupy/checkRoomOccupy", {
                  pk: formData.main["B0035"].value, //vueData.formMeta.parameters.pk
                  hys: formData.main["c-meetingsq-009"].value,
                  sdate: formData.main["c-meetingsq-007"].value,
                  edate: formData.main["c-meetingsq-008"].value
                })
                .done(res => {
                  if (res.type == "success") {
                    // 会议室预定时，不同的会议室可以走不同的流程，为空时走默认流程
                    let button = [
                      ...vueData.formButtons.mainButtons,
                      ...vueData.formButtons.commonButtons
                    ].find(button => button.action == "send");
                    if (button && button.parameters) {
                      // 会议室预定时，不同的会议室可以走不同的流程，为空时走默认流程
                      dsf.http
                        .post("/fn/meetingRoom/getFlowByHys", {
                          hys: formData.main["c-meetingsq-009"].value
                        })
                        .done(response => {
                          if (response.type == "success" && response.data) {
                            button.parameters.find(
                              item => item.key == "wfId"
                            ).value = response.data;
                          }
                          resolve();
                        });
                    } else {
                      resolve();
                    }
                  } else {
                    reject(res.message);
                  }
                });
            }
          } else {
            resolve();
          }
        } else {
          reject("请填写会议时间");
        }
      } catch (error) {
        console.log(error);
        resolve();
      }
    });
  };

  window.spJS = exportObj;
})();
