// 会议室预定
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function(formData, formStruct) {};

function deepCopy(data) {
  return JSON.parse(JSON.stringify(data));
}

let hysIdOld = "";
exportObj.initHandle = function(formData, formStruct, vueData) {
  //console.log('新会议室预定')

  hysIdOld = formData.main["c-meetingsq-009"].value;
  let meetingId = util.loadSessionStore("checkedMettingRoom")
    ? util.loadSessionStore("checkedMettingRoom").value
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
  if (meetingId && util.loadSessionStore("checkedMettingStime")) {
    // formData.main["c-meetingsq-007"].value = util.loadSessionStore("checkedMettingStime") ? util.loadSessionStore("checkedMettingStime").value : null;
    vueData.$set(vueData.formData.main, "c-meetingsq-007", {
      value: util.loadSessionStore("checkedMettingStime").value
    });
    vueData.$set(vueData.formData.main, "c-meetingsq-008", {
      value: moment(
        new Date(util.loadSessionStore("checkedMettingStime").value)
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
  sortMeet(formData.main["c-meetingsq-075"].value || "", 1);
  vueData.$bus.on("selectDateTime", function(data) {
    if (data.metaData.metaId == "c-meetingsq-007") {
      dsf.http
        .post("/fn/meetingType/getMeetingType", {
          meetingTypeId: formData.main["c-meetingsq-075"].value
        })
        .then(res => {
          if (res.data.code == 200 && res.data.data) {
            if (res.data.data.duration && res.data.data.duration != 0) {
              vueData.$set(formData.main, "c-meetingsq-008", {
                value: formatDate(
                  Number(res.data.data.duration * 3600000) +
                    Number(
                      new Date(formData.main["c-meetingsq-007"].value).getTime()
                    )
                )
              }); //结束时间
            } else {
              vueData.$set(formData.main, "c-meetingsq-008", { value: "" }); //结束时间
            }
          }
        });
    }
  });
  vueData.$bus.on("checkVal", function(busObj) {
    console.log(busObj);
    if (busObj.metaData.metaId == "c-meetingsq-009") {
      if (
        formData.multinfos["220722142648kKYetU59O4DmtskAkoA"].rows.length > 0
      ) {
        formData.multinfos["220722142648kKYetU59O4DmtskAkoA"].rows.forEach(
          (ele, index) => {
            vueData.$set(
              formData.multinfos["220722142648kKYetU59O4DmtskAkoA"].rows[index],
              "action",
              "Deleted"
            );
          }
        );
      }
      defaultMeet(busObj.value);
    }
    //会议类型联动
    if (busObj.metaData.metaId == "c-meetingsq-075") {
      sortMeet(busObj.value, 0);
    }
  });

  vueData.$bus.on("blurBus", function(busObj) {
    console.log(busObj);
    ["C-MEETING-RESOURCE-004"].value;
    if (busObj.metaData.metaId == "C-MEETING-RESOURCE-005") {
      let id = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex];
      sourData.forEach(ele => {
        if (ele.id == id && ele.maxVal) {
          if (Number(busObj.value) < Number(ele.maxVal + 1)) {
            dsf.layer.toast(`${ele.name}的最大数量为${ele.maxVal},请重新填写`);
            vueData.$set(
              formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex],
              "C-MEETING-RESOURCE-005",
              { value: "" }
            );
          }
        }
      });
    }
  });

  RenderList(); // 隐藏子表字段
  let sourData = []; //会议资源最大数量限制
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
      if (!sourData.find(ele => ele.id == item.id)) {
        sourData.push({
          id: item.id,
          name: item.name,
          maxVal: item.attrs.limitMaxNum
        });
      }
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
  // 获取默认资源
  function defaultMeet(id) {
    dsf.http
      .post("/fn/meetingRoom/getMeetingRoomDefaultResource", {
        roomId: id
      })
      .then(res => {
        console.log(res);
        if (res && res.data && res.data.data && res.data.data.dzValue) {
          vueData.$set(formData.main, "c-meetingsq-122", {
            value: res.data.data.dzValue,
            text: res.data.data.hymrzyText
          }); //默认资源
        }
      });
  }

  // 会议类型联动
  function sortMeet(id, type) {
    let Obj = [
      "出席领导",
      "列席领导",
      "出席部门",
      "列席部门",
      "出席单位",
      "出席人员",
      "列席人员",
      "特邀人员",
      "外单位人员",
      "列席单位",
      "工作人员",
      "参会人员"
    ];
    formStruct.controls.forEach(item => {
      Obj.includes(item.label) ? (item.show = 0) : "";
    });
    dsf.http
      .post("/fn/meetingType/getMeetingType", {
        meetingTypeId: id
      })
      .then(res => {
        console.log(res);
        if (res.data.code == 200 && res.data.data) {
          let data = res.data.data;
          if (data.chdxText) {
            data.chdxText += "参会人员";
            formStruct.controls.forEach(item => {
              if (data.chdxText.includes(item.label)) {
                item.show = 1;
              }
            });
          }
          if (type) return; //初始化时不赋值
          if (
            data.duration &&
            data.duration != 0 &&
            formData &&
            !formData.main["c-meetingsq-008"].value
          ) {
            vueData.$set(formData.main, "c-meetingsq-008", {
              value: formatDate(
                Number(data.duration * 3600000) +
                  Number(
                    new Date(formData.main["c-meetingsq-007"].value).getTime()
                  )
              )
            }); //结束时间
          }
          vueData.$set(formData.main, "c-meetingsq-052", {
            value: data.nonvotingLeader,
            text: data.nonvotingLeaderText,
            schema: data.nonvotingLeaderSchema
          }); //出席领导
          vueData.$set(formData.main, "c-meetingsq-115", {
            value: data.lxLeader,
            text: data.lxLeaderText,
            schema: data.lxLeaderSchema
          }); //列席领导
          vueData.$set(formData.main, "c-meetingsq-042", {
            value: data.chbm,
            text: data.chbmText,
            schema: data.chbmSchema
          }); //出席部门
          vueData.$set(formData.main, "c-meetingsq-043", {
            value: data.lxbm,
            text: data.lxbmText,
            schema: data.lxbmSchema
          }); //列席部门
          vueData.$set(formData.main, "c-meetingsq-116", {
            value: data.cxUnit,
            text: data.cxUnitText,
            schema: data.cxUnitSchema
          }); //出席单位
          vueData.$set(formData.main, "c-meetingsq-117", {
            value: data.lxUnit,
            text: data.lxUnitText,
            schema: data.lxUnitSchema
          }); //列席单位
          vueData.$set(formData.main, "c-meetingsq-013", {
            value: data.chr,
            text: data.chrText,
            schema: data.chrSchema
          }); //出席人员
          vueData.$set(formData.main, "c-meetingsq-053", {
            value: data.lxUser,
            text: data.lxUserText,
            schema: data.lxUserSchema
          }); //列席人员
          vueData.$set(formData.main, "c-meetingsq-118", {
            value: data.tyUser,
            text: data.tyUserText,
            schema: data.tyUserSchema
          }); //特邀人员
          vueData.$set(formData.main, "c-meetingsq-112", {
            value: data.workUser,
            text: data.workUserText,
            schema: data.workUserSchema
          }); //工作人员
          vueData.$set(formData.main, "c-meetingsq-050", {
            value: data.wdwUser,
            text: data.wdwUserText,
            schema: data.wdwUserSchema
          }); //外单位人员

          if (data.isYtLx && data.isYtLx == "1") {
            vueData.formMeta.controls.forEach(item => {
              item.controlId == "4PheCMgUGJoh5do8"
                ? vueData.$set(item, "show", 1)
                : ""; //相关议题
              item.controlId == "vyOGRsirWy2juycU"
                ? vueData.$set(item, "show", 1)
                : ""; //相关议题子表
            });
          } else {
            vueData.formMeta.controls.forEach(item => {
              item.controlId == "4PheCMgUGJoh5do8"
                ? vueData.$set(item, "show", 0)
                : ""; //相关议题
              item.controlId == "vyOGRsirWy2juycU"
                ? vueData.$set(item, "show", 0)
                : ""; //相关议题子表
            });
          }
        }
      });
  }
};

exportObj.saveFilter = function(formData, formStruct, vueData) {
  function filterTime(time) {
    console.log(time);
    var str = time.replace(/-/g, "/");
    return str;
  }
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

//保存后事件
// exportObj.saveAfter = function (vueData, sendButtonParams, formData) {
//     dsf.layer.toast("表单保存成功", undefined, () => vueData.backSucces());
// }

// 发送前判断会议室占用情况[淮安]
exportObj.hysydSend = function(formData, formStruct, vueData) {
  // 判断会议室占用情况
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
                button.parameters.find(item => item.key == "wfId").value =
                  response.data;
              }
              // 发送
              vueData.btnAction("send");
            });
        } else {
          // 发送
          vueData.btnAction("send");
        }
      } else {
        dsf.layer.toast(res.message, false);
      }
    });
};
// exportObj.saveFilter = function(formData, formStruct, vueData) {
//     console.log(formData);
//     console.log(formStruct);
//     console.log(vueData);
//     return new Promise(function(resolve, reject) {
//         try {
//             resolve()
//         } catch (error) {
//             resolve()
//         }
//     })
// }

function formatDate(data) {
  if (data) {
    var oDate = new Date(data),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSen = oDate.getSeconds(),
      oTime =
        oYear +
        "-" +
        formatDay(oMonth) +
        "-" +
        formatDay(oDay) +
        " " +
        formatDay(oHour) +
        ":" +
        formatDay(oMin) +
        ":" +
        formatDay(oSen);
    return oTime;
  } else {
    return "";
  }
}

function formatDay(day) {
  if (parseInt(day) < 10) {
    day = "0" + day;
  }
  return day;
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

export default exportObj;
