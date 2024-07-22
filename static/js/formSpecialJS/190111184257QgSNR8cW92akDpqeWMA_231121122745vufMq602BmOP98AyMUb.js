(function () {
  // 会议申请表单查看议题tab--jf
  const exportObj = {};
  exportObj.initHandle = async function (formData, formStruct, vueData) {
    // // 会议议题tab页也要根据会议类型 来控制是否显示，审批时要根据是否有议题来看议题tab也是否显示
    dsf.http
      .post("/fn/meetingNotice/getTopic", {
        pk: vueData.formData.main["A0001"].value,
      })
      .then((res) => {
        if (
          res.data.code != 200 ||
          res.data.data.length != 0 ||
          formData.main["c-meetingsq-080"].value != "1"
        ) {
          vueData.formMeta.controls.forEach((item) => {
            item.controlId == "7zRDIRpwlpMdiDmU"
              ? vueData.$set(item, "show", 0)
              : "";
            item.controlId == "9hYHr70GtPPOZtu0"
              ? vueData.$set(item, "show", 0)
              : "";
            item.controlId == "4HnK6jjs8Wfilq6Y"
              ? vueData.$set(item, "show", 0)
              : "";
          });
        }
      });
    RenderList();
    renderForm();

    let meetingData = dsf.util.loadSessionStore("checkedMettingRoom")
      ? dsf.util.loadSessionStore("checkedMettingRoom")
      : null;
    if (meetingData) {
      vueData.$set(vueData.formData.main, "c-meetingsq-009", {
        value: meetingData.value,
        text: meetingData.text,
      });
    }

    if (meetingData && dsf.util.loadSessionStore("checkedMettingStime")) {
      vueData.$set(vueData.formData.main, "c-meetingsq-007", {
        value: dsf.util.loadSessionStore("checkedMettingStime").value,
      });
      // vueData.$set(vueData.formData.main, "c-meetingsq-008", {
      //   value: moment(
      //     new Date(dsf.util.loadSessionStore("checkedMettingStime").value)
      //   )
      //     .add(3, "hours")
      //     .format("YYYY-MM-DD HH:mm"),
      // });
    }

    if (formStruct.parameters.nodeId == 0) {
      //拟稿会议申请初始化
      setTimeout(() => {
        sortMeet(
          formData.main["c-meetingsq-075"].value,
          0,
          formData.main["c-meetingsq-075"].text
        );
        defaultMeet(formData.main["c-meetingsq-009"].value);
      }, 500);
      let obj = ["会议届次"];
      formStruct.controls.forEach((item) => {
        obj.includes(item.label) ? (item.show = 0) : "";
      });
      //拟稿会议申请初始化
    } else if (vueData.$route.query.renderType) {
      //议题转会议申请初始化
      sortMeet(
        formData.main["c-meetingsq-075"].value || "",
        0,
        formData.main["c-meetingsq-075"].text
      );
    } else {
      //编辑及其他节点初始化
      sortMeet(
        formData.main["c-meetingsq-075"].value || "",
        1,
        formData.main["c-meetingsq-075"].text
      );
    }



    vueData.$bus.on("blurBus", function (busObj) {
      if (busObj.metaData.metaId == "C-MEETING-TOPIC-0006") {
        RenderTime();
      }
    });

    vueData.$bus.on("getUser", function (data) {
      console.log(data);
      console.log(formData.main["c-meetingsq-007"].value);
      if (data.metaData.metaId == "c-meetingsq-009") {
        vueData.$bus.emit(
          "codeSelect",
          `&startTime=${formData.main["c-meetingsq-007"].value}&endTime=${formData.main["c-meetingsq-008"].value}`
        );
      }
    });

    let sourData = []; //会议资源最大数量限制
    vueData.$bus.on("subFormTreeSelect", function (data) {
      data.selectArr.forEach((item, index) => {
        // 判重
        if (data.subFormId == "2207211022396tdrTOsshP5lQlAErld") {
          if (
            formData.multinfos["2207211022396tdrTOsshP5lQlAErld"].rows.find(
              (row) => row["2207211022396tdrTOsshP5lQlAErld"].value == item.id
            )
          )
            return;
          // 新增子表
          if (!sourData.find((ele) => ele.id == item.id)) {
            sourData.push({
              id: item.id,
              name: item.name,
              maxVal: item.attrs.limitMaxNum,
            });
          }
          if (vueData.$refs.formTab[0]) {
            vueData.$refs.formTab[0].$refs[
              "2207211022396tdrTOsshP5lQlAErld"
            ][0].$refs.subform
              .addCard(false)
              .then((newData) => {
                //会议使用资源-资源类别
                vueData.$set(newData, "C-MEETING-RESOURCE-001", {
                  value: item.attrs.resourceTypeText,
                });
                //会议使用资源-资源名称
                vueData.$set(newData, "C-MEETING-RESOURCE-003", {
                  value: item.name,
                });
                //会议使用资源-资源分类id
                vueData.$set(newData, "C-MEETING-RESOURCE-002", {
                  value: item.attrs.resourceTypeId,
                });
                //会议使用资源-资源id
                vueData.$set(newData, "C-MEETING-RESOURCE-004", {
                  value: item.id,
                });
                //会议使用资源-资源名称
                vueData.$set(newData, "C-MEETING-RESOURCE-006", {
                  value: item.attrs.isWirteNum,
                  text: item.attrs.isWirteNum > 0 ? "是" : "否",
                });
                if (item.attrs.isWirteNum < 0) {
                  newData.structControl.find(
                    (item) => item.metaId == "C-MEETING-RESOURCE-005"
                  ).show = false;
                }
              })
              .then(() => {
                RenderList();
              });
          }
        }
      });
    });

    if (
      formStruct.parameters.nodeId != 0 &&
      formStruct.parameters.nodeId != "-2"
    ) {
      if (!formData.main["B0003"].value) {
        let obj = ["会议届次"];
        formStruct.controls.forEach((item) => {
          obj.includes(item.label) ? (item.show = 0) : "";
        });
      }
    }

    // 新增、删除子表计算议题时间
    vueData.$watch(
      function () {
        return vueData.formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"]
          .rows.length;
      },
      function (n, o) {
        RenderTime();
        renderForm();
      },
      {
        deep: true,
        immediate: true,
      }
    );

    // 冲突子表，无子表，隐藏
    vueData.$watch(
      function () {
        return vueData.formData.multinfos["2306131516053U1mdIcjAHX9w2wThOG"]
          .rows;
      },
      function (n, o) {
        if (n?.length > 0) {
          formStruct.controls.forEach((item) => {
            item.metaId == "2306131516053U1mdIcjAHX9w2wThOG"
              ? vueData.$set(item, "show", 1)
              : ""; //冲突子表
          });
        } else if (n.length == 0) {
          formStruct.controls.forEach((item) => {
            item.metaId == "2306131516053U1mdIcjAHX9w2wThOG"
              ? vueData.$set(item, "show", 0)
              : ""; //冲突子表
          });
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    // 修改开始时间计算议题时间
    vueData.$watch(
      function () {
        return vueData.formData.main["c-meetingsq-007"].value;
      },
      function (n, o) {
        RenderTime();
      },
      {
        deep: true,
        immediate: true,
      }
    );

    function RenderTime() {
      let startTime = formData.main["c-meetingsq-007"].value;
      vueData.formData.multinfos[
        "210618155422Xgcs9ChmODWRV36fMHJ"
      ].rows.forEach((row) => {
        if (row.action != "Deleted") {
          row["C-MEETING-TOPIC-0062"].value = startTime;
          row["C-MEETING-TOPIC-0063"].value = formatTime(
            startTime,
            row["C-MEETING-TOPIC-0006"].value || 0
          );
          startTime = formatTime(
            startTime,
            row["C-MEETING-TOPIC-0006"].value || 0
          );
        }
      });
    }

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
                  function () {
                    return vueData.formData.multinfos[key].rows;
                  },
                  function (n, o) {
                    if (
                      formData.multinfos[key].rows[index] &&
                      formData.multinfos[key].rows[index].structControl
                    ) {
                      formData.multinfos[key].rows[index].structControl.forEach(
                        (row) => {
                          row.label == "资源分类id" ? (row.show = 0) : "";
                          row.label == "资源id" ? (row.show = 0) : "";
                          row.label == "是否填写数量" ? (row.show = 0) : "";
                        }
                      );
                    }
                  },
                  {
                    deep: true,
                    immediate: true,
                  }
                );
              }
            }
            formData.multinfos[key].rows.forEach((row) => {
              if (
                row["C-MEETING-RESOURCE-006"] &&
                row["C-MEETING-RESOURCE-006"].value == "-1"
              ) {
                row.structControl.forEach((item) => {
                  item.label == "数量" ? (item.show = 0) : "";
                });
              }
            });
          }
        }
      }
    }

    vueData.$bus.on("subFormSelect", function (data) {
      let params = "";
      data.checkItems.forEach((ele) => {
        params += ele.dataValue.A0001 + ",";
      });
      dsf.http
        .post("fn/meetingTopic/getTpoicData", {
          topicIds: params,
        })
        .then((res) => {
          console.log(res);
          let newobj = {};
          res.data.data = res.data.data.reduce((preVal, curVal) => {
            newobj[curVal.id] ? "" : (newobj[curVal.id] = preVal.push(curVal));
            return preVal;
          }, []);
          res.data.data.forEach((item) => {
            if (vueData.$refs.formTab[0]) {
              let fileArr = [];

              if (
                formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"].rows
                  .length > 0 &&
                formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"].rows.find(
                  (row) =>
                    row["210618155422Xgcs9ChmODWRV36fMHJ"] &&
                    row["210618155422Xgcs9ChmODWRV36fMHJ"].value == item.id
                )
              ) {
                dsf.layer.toast(`重复选择，请重新选择`);
                return true; //去重
              }
              vueData.$refs.formTab[0].$refs[
                "210618155422Xgcs9ChmODWRV36fMHJ"
              ][0].$refs.subform
                .addCard(false)
                .then((newData) => {
                  //会议议题-"议题主键"
                  vueData.$set(newData, "210618155422Xgcs9ChmODWRV36fMHJ", {
                    value: item.id,
                    foreign: formStruct.parameters.pk,
                  });

                  //会议议题-"议题标题"
                  vueData.$set(newData, "B0001", {
                    value: item.title,
                  });

                  if (item.ytlyValue == "1") {
                    //会议议题-"内单位汇报人"
                    vueData.$set(newData, "C-MEETING-TOPIC-0004", {
                      value: item.reporter,
                      schema: item.reporterSchema,
                      text: item.reporterText,
                    });
                    //会议议题-"汇报部门"
                    vueData.$set(newData, "C-MEETING-TOPIC-0003", {
                      value: item.reportDept,
                      schema: item.reportDeptSchema,
                      text: item.reportDeptText,
                    });
                  } else {
                    //会议议题-"外单位汇报人"
                    vueData.$set(newData, "C-MEETING-TOPIC-0065", {
                      value: item.dwhbrValue,
                    });
                    //会议议题-"汇报单位"
                    vueData.$set(newData, "C-MEETING-TOPIC-0066", {
                      value: item.hbdwValue,
                      schema: item.hbdwSchema,
                      text: item.hbdwText,
                    });
                  }

                  //会议议题-"汇报时长"
                  vueData.$set(newData, "C-MEETING-TOPIC-0006", {
                    value: item.reportTime,
                  });
                  //会议议题-"列席"
                  vueData.$set(newData, "C-MEETING-TOPIC-0008", {
                    value: item.attendDept,
                    schema: item.attendDeptSchema,
                    text: item.attendDeptText,
                  });
                  //会议议题-"会议类型"
                  vueData.$set(newData, "C-MEETING-TOPIC-0042", {
                    value: item.topicType,
                    text: item.topicTypeText,
                  });
                  //会议议题-"议题状态"
                  vueData.$set(newData, "C-MEETING-TOPIC-0021", {
                    value: 2,
                    text: "已通过",
                  });
                  //会议议题-"提议来源"
                  vueData.$set(newData, "C-MEETING-TOPIC-0064", {
                    value: item.ytlyValue,
                    text: item.ytlyText,
                  });
                  //会议议题-"是否管理员创建"
                  vueData.$set(newData, "C-MEETING-TOPIC-0072", {
                    value: "1",
                    text: "是",
                  });

                  item.files.forEach((ele) => {
                    fileArr.push({
                      id: ele.id,
                      fileName: ele.fileName,
                      title: ele.fileName,
                      infoId: ele.infoId,
                      filePath: ele.filePath,
                      showFileSize: (ele.showFileSize / 1000).toFixed(1) + "kb",
                    });
                  });
                  //会议使用资源-"议题材料"
                  vueData.$set(newData, "attach", {
                    "attach-1": fileArr,
                  });

                  vueData.$set(newData, "action", "Updated");

                  let Arr1 = ["C-MEETING-TOPIC-0004", "C-MEETING-TOPIC-0003"]; //单位外隐藏
                  let Arr2 = ["C-MEETING-TOPIC-0065", "C-MEETING-TOPIC-0066"]; //单位内隐藏
                  newData.structControl.forEach((row) => {
                    if (item.ytlyValue == "1") {
                      Arr2.includes(row.metaId)
                        ? vueData.$set(row, "show", 0)
                        : "";
                    } else {
                      Arr1.includes(row.metaId)
                        ? vueData.$set(row, "show", 0)
                        : "";
                      Arr2.includes(row.metaId)
                        ? vueData.$set(row, "show", 1)
                        : "";
                    }
                    if (row.metaId == "attach-1") {
                      vueData.$set(row.allFile[0], "file", fileArr);
                      vueData.$set(row.extra, "file", fileArr);
                    }
                  });
                });
            }
          });
        });
    });

    //会议室联动3500--代码选择
    vueData.$bus.on("selectUserBus", function (data) {
      if (data.metaData.metaId == "c-meetingsq-009") {
        defaultMeet(data.value);
      }
    });
    vueData.$bus.on("selectDateTime", function (data) {
      if (data.metaData.metaId == "c-meetingsq-007") {
        dsf.http
          .post("/fn/meetingType/getMeetingType", {
            meetingTypeId: formData.main["c-meetingsq-075"].value,
          })
          .then((res) => {
            if (res.data.code == 200 && res.data.data) {
              let data = res.data.data;
              if (res.data.data.duration && res.data.data.duration != 0) {
                vueData.$set(formData.main, "c-meetingsq-008", {
                  value: formatMsToDate(
                    Number(res.data.data.duration * 3600000) +
                    Number(
                      new Date(
                        formData.main["c-meetingsq-007"].value
                      ).getTime()
                    )
                  ),
                }); //结束时间
              } else {
                vueData.$set(formData.main, "c-meetingsq-008", {
                  value: "",
                }); //结束时间
              }
              // 校验会议冲突人员
              if (data.verifyArrangeValue == "1") {
                Conflict(data);
              }
            }
          });
      }
      if (data.metaData.metaId == "c-meetingsq-008") {
        dsf.http
          .post("/fn/meetingType/getMeetingType", {
            meetingTypeId: formData.main["c-meetingsq-075"].value,
          })
          .then((res) => {
            if (res.data.code == 200 && res.data.data) {
              let data = res.data.data;
              // 校验会议冲突人员
              if (data.verifyArrangeValue == "1") {
                Conflict(data);
              }
            }
          });
      }
    });

    vueData.$bus.on("checkVal", function (data) {
      if (data.metaData.metaId == "c-meetingsq-075") {
        sortMeet(data.value, 0, data.text);
      }
      //会议地址赋值39006--下拉框
      if (data.metaData.metaId == "c-meetingsq-009") {
        defaultMeet(data.value);
      }
    });

    // 会议室获取默认资源
    function defaultMeet(id) {
      dsf.http
        .post("/fn/meetingRoom/getMeetingRoomDefaultResource", {
          roomId: id,
        })
        .then((res) => {
          if (res && res.data && res.data.data && res.data.data.dzValue) {
            vueData.$set(formData.main, "c-meetingsq-122", {
              value: res.data.data.dzValue,
              text: res.data.data.hymrzyText,
            }); //默认资源
            vueData.$set(formData.main, "c-meetingsq-090", {
              value: res.data.data.dzValue,
            }); //会议室地址
          }
        });
    }
    var noticeBtn = formStruct.buttons.mainButtons.filter(
      (btn) => btn.action == "DSF.Meeting.Action.issueNotice"
    ); //下发通知按钮
    var sendBtn = formStruct.buttons.mainButtons.filter(
      (btn) => btn.action == "DSF.Meeting.Action.meetingNgSend"
    ); //发送按钮

    // 议题子表格式化
    function renderForm() {
      let Arr = ["C-MEETING-TOPIC-0062", "C-MEETING-TOPIC-0063"]; //不可编辑项
      let Arr1 = ["C-MEETING-TOPIC-0004", "C-MEETING-TOPIC-0003"]; //单位外隐藏
      let Arr2 = ["C-MEETING-TOPIC-0065", "C-MEETING-TOPIC-0066"]; //单位内隐藏
      if (
        vueData.formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"].rows
          .length > 0
      ) {
        vueData.formData.multinfos[
          "210618155422Xgcs9ChmODWRV36fMHJ"
        ].rows.forEach((row) => {
          if (row && row.structControl && row.structControl.length > 0) {
            row.structControl.forEach((ele) => {
              ele.privilege.editable = Arr.includes(ele.metaId)
                ? false
                : ele.privilege.editable;
              if (
                ele.metaId == "B0019" ||
                ele.metaId == "C-MEETING-TOPIC-0072"
              ) {
                vueData.$set(ele, "show", 0);
              }
            });
            if (row["C-MEETING-TOPIC-0064"].value == "1") {
              row.structControl.forEach((ele) => {
                Arr2.includes(ele.metaId) ? vueData.$set(ele, "show", 0) : "";
              });
            } else if (row["C-MEETING-TOPIC-0064"].value == "2") {
              row.structControl.forEach((ele) => {
                Arr1.includes(ele.metaId) ? vueData.$set(ele, "show", 0) : "";
              });
            }
            if (row["B0001"].value == "") {
              row.structControl.forEach((ele) => {
                Arr2.includes(ele.metaId) ? vueData.$set(ele, "show", 0) : "";
              });
            }
            if (row.action == "Added") {
              vueData.$set(row, "C-MEETING-TOPIC-0072", {
                value: "1",
                text: "是",
              });
              vueData.$set(row, "C-MEETING-TOPIC-0064", {
                value: "1",
                text: "单位内",
              });
            }
          }
        });
      }
    }

    // 会议类型联动
    function sortMeet(id, type, text) {
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
        "冲突提醒",
      ];
      formStruct.controls.forEach((item) => {
        Obj.includes(item.label) ? (item.show = 0) : "";
      });
      if (!id) {
        return;
      }
      dsf.http
        .post("/fn/meetingType/getMeetingType", {
          meetingTypeId: id,
        })
        .then((res) => {
          if (res.data.code == 200 && res.data.data) {
            let data = res.data.data;
            if (data.chdxText) {
              data.chdxText += "参会人员";
              formStruct.controls.forEach((item) => {
                if (data.chdxText.includes(item.label)) {
                  item.show = 1;
                }
              });
            }
            if (data.isYtLx && data.isYtLx == "1") {
              vueData.formMeta.controls.forEach((item) => {
                item.controlId == "4PheCMgUGJoh5do8"
                  ? vueData.$set(item, "show", 1)
                  : ""; //相关议题
                item.controlId == "vyOGRsirWy2juycU"
                  ? vueData.$set(item, "show", 1)
                  : ""; //相关议题子表
              });
            } else {
              vueData.formMeta.controls.forEach((item) => {
                item.controlId == "4PheCMgUGJoh5do8"
                  ? vueData.$set(item, "show", 0)
                  : ""; //相关议题
                item.controlId == "vyOGRsirWy2juycU"
                  ? vueData.$set(item, "show", 0)
                  : ""; //相关议题子表
              });
            }

            /// 拟稿节点0或编辑节点-2+有流程审批时，不显示下发会议通知按钮（下发通知按钮和发送按钮只能存在一个）
            if (
              formStruct.parameters.nodeId == 0 ||
              formStruct.parameters.nodeId == -2
            ) {
              let noticeBtnIndex = vueData.formButtons.mainButtons.findIndex(
                (button) => button.action == "DSF.Meeting.Action.issueNotice"
              );
              let sendBtnIndex = vueData.formButtons.mainButtons.findIndex(
                (button) => button.action == "DSF.Meeting.Action.meetingNgSend"
              );
              if (data.lcxz) {
                if (noticeBtnIndex >= 0) {
                  vueData.formButtons.mainButtons.splice(noticeBtnIndex, 1);
                  if (sendBtn && sendBtn[0] && sendBtnIndex < 0) {
                    vueData.formButtons.mainButtons.splice(
                      sendBtnIndex,
                      0,
                      sendBtn[0]
                    );
                  }
                }
              } else {
                if (sendBtnIndex >= 0) {
                  vueData.formButtons.mainButtons.splice(sendBtnIndex, 1);
                  if (noticeBtn && noticeBtn[0] && noticeBtnIndex < 0) {
                    vueData.formButtons.mainButtons.splice(
                      noticeBtnIndex,
                      0,
                      noticeBtn[0]
                    );
                  }
                }
                // vueData.formButtons.mainButtons.forEach((btn) => {
                //   if (btn.action == "DSF.Meeting.Action.issueNotice") {
                //     if (data.sqztzValue == "1") {
                //       btn.name = "转会议通知";
                //     } else {
                //       btn.name = "确认";
                //     }
                //   }
                // });
              }
            }

            if (data.sfxyhzyValue && data.sfxyhzyValue == 1) {
              vueData.formMeta.controls.find((item) => {
                item.controlId == "4fcSEOAxsJ9aoZvH"
                  ? vueData.$set(item, "show", 1)
                  : ""; //会场资源
                item.controlId == "4L71kg2bshyuCCiV"
                  ? vueData.$set(item, "show", 1)
                  : ""; //默认资源
                item.controlId == "cRbjNY98jjIXqTTu"
                  ? vueData.$set(item, "show", 1)
                  : ""; //会议使用资源-子表主键
              });
            } else {
              //没有会场资源隐藏控件
              vueData.formMeta.controls.find((item) => {
                item.controlId == "4fcSEOAxsJ9aoZvH"
                  ? vueData.$set(item, "show", 0)
                  : ""; //会场资源
                item.controlId == "4L71kg2bshyuCCiV"
                  ? vueData.$set(item, "show", 0)
                  : ""; //默认资源
                item.controlId == "cRbjNY98jjIXqTTu"
                  ? vueData.$set(item, "show", 0)
                  : ""; //会议使用资源-子表主键
              });
            }

            //会议届次联动
            if (data.hyjcValue) {
              vueData.formMeta.controls.find((item) => {
                if (item.metaId == "B0003") {
                  vueData.$set(item, "show", 1);
                }
              });
            } else {
              vueData.formMeta.controls.find((item) => {
                if (item.metaId == "B0003") {
                  vueData.$set(item, "show", 0);
                  // vueData.$set(item.extra, "rules", [])
                }
              });
              vueData.$set(formData.main, "B0003", {
                value: "",
              }); //
            }

            

            if (data.isYtLx && data.isYtLx == "1") {
              vueData.formMeta.controls.forEach((item) => {
                item.controlId == "4PheCMgUGJoh5do8"
                  ? vueData.$set(item, "show", 1)
                  : ""; //相关议题
                item.controlId == "vyOGRsirWy2juycU"
                  ? vueData.$set(item, "show", 1)
                  : ""; //相关议题子表
              });
            } else {
              vueData.formMeta.controls.forEach((item) => {
                item.controlId == "4PheCMgUGJoh5do8"
                  ? vueData.$set(item, "show", 0)
                  : ""; //相关议题
                item.controlId == "vyOGRsirWy2juycU"
                  ? vueData.$set(item, "show", 0)
                  : ""; //相关议题子表
              });
            }

            if (
              res.data.data.duration &&
              res.data.data.duration != 0 &&
              formData &&
              !formData.main["c-meetingsq-008"].value
            ) {
              vueData.$set(formData.main, "c-meetingsq-008", {
                value: formatMsToDate(
                  Number(res.data.data.duration * 3600000) +
                  Number(
                    new Date(formData.main["c-meetingsq-007"].value).getTime()
                  )
                ),
              }); //结束时间
            }

            

            if (type) return; //初始化时不赋值

            //主持人联动
            if (data.zcrValue) {
              vueData.$set(formData.main, "c-meetingsq-011", {
                value: data.zcrValue,
                text: data.zcrText,
                schema: data.zcrSchema,
              });
            } else {
              vueData.$set(formData.main, "c-meetingsq-011", {
                value: '',
                text: '',
                schema: '',
              });
            }

            if (data.sqztzValue == "1" || data.sqztzValue == "-1") {
              vueData.$set(formData.main, "c-meetingsq-126", {
                value: data.sqztzValue,
                text: data.sqztzText,
              }); //是否下发通知
            }


            // 校验会议冲突人员
            if (data.verifyArrangeValue == "1") {
              Conflict(data);
            } else {
              formStruct.controls.forEach((item) => {
                item.metaId == "2306131516053U1mdIcjAHX9w2wThOG"
                  ? vueData.$set(item, "show", 0)
                  : ""; //冲突子表
              });
            }

            if (data.lcxz) {
              //根据类型走不同的会议流程
              vueData.$set(formStruct.parameters, "flowId", data.lcxz);
            }

            //会议名称赋值
            if (data.hyjcValue) {
              getFileCode(data.hyjcValue);
              vueData.$bus.on("changeFileCode", function () {
                vueData.$set(formData.main, "B0001", {
                  value: formData.main["B0003"].value
                    ? formData.main["B0003"].value + text
                    : "",
                });
              });
            }

            vueData.$set(formData.main, "c-meetingsq-069", {
              value: data.hyyq,
            }); //会议要求

            vueData.$set(formData.main, "c-meetingsq-052", {
              value: data.nonvotingLeader,
              text: data.nonvotingLeaderText,
              schema: data.nonvotingLeaderSchema,
            }); //出席领导
            vueData.$set(formData.main, "c-meetingsq-115", {
              value: data.lxLeader,
              text: data.lxLeaderText,
              schema: data.lxLeaderSchema,
            }); //列席领导
            vueData.$set(formData.main, "c-meetingsq-042", {
              value: data.chbm,
              text: data.chbmText,
              schema: data.chbmSchema,
            }); //出席部门
            vueData.$set(formData.main, "c-meetingsq-043", {
              value: data.lxbm,
              text: data.lxbmText,
              schema: data.lxbmSchema,
            }); //列席部门
            vueData.$set(formData.main, "c-meetingsq-116", {
              value: data.cxUnit,
              text: data.cxUnitText,
              schema: data.cxUnitSchema,
            }); //出席单位
            vueData.$set(formData.main, "c-meetingsq-117", {
              value: data.lxUnit,
              text: data.lxUnitText,
              schema: data.lxUnitSchema,
            }); //列席单位
            

            // 初始化出席人员带上拟稿人
            if (formStruct.parameters.nodeId == 0&&data.chdxText.includes('出席人员')) {
              if (data.chr) {
                vueData.$set(formData.main, "c-meetingsq-013", {
                  value: formData.main["A0010"].value + ',' + data.chr,
                  text: formData.main["A0011"].value+ ',' + data.chrText,
                  schema: '1::' + formData.main["A0012"].value+ ',' + data.chrSchema,
                }); //出席人员
              }else{
                vueData.$set(formData.main, "c-meetingsq-013", {
                  value: formData.main["A0010"].value,
                  text: formData.main["A0011"].value,
                  schema: '1::' + formData.main["A0012"].value,
                }); //出席人员
              }
            }else{
              vueData.$set(formData.main, "c-meetingsq-013", {
                value: data.chr,
                text: data.chrText,
                schema: data.chrSchema,
              }); //出席人员
            }

            vueData.$set(formData.main, "c-meetingsq-053", {
              value: data.lxUser,
              text: data.lxUserText,
              schema: data.lxUserSchema,
            }); //列席人员
            vueData.$set(formData.main, "c-meetingsq-118", {
              value: data.tyUser,
              text: data.tyUserText,
              schema: data.tyUserSchema,
            }); //特邀人员
            vueData.$set(formData.main, "c-meetingsq-112", {
              value: data.workUser,
              text: data.workUserText,
              schema: data.workUserSchema,
            }); //工作人员
            vueData.$set(formData.main, "c-meetingsq-119", {
              value: data.wdwUser,
              text: data.wdwUserText,
              schema: data.wdwUserSchema,
            }); //外单位人员
            vueData.$set(formData.main, "c-meetingsq-080", {
              value: data.isYtLx,
            }); //外单位人员
          }
        });
    }
    //获取文号规则
    function getFileCode(id) {
      dsf.http
        .post("fn/filecode/docType", {
          //获取文号规则
          element: "ctx8zlMCjIPpboY6", //会议届次空间ID
          targetRuleId: id,
          moduleId: formStruct.parameters.moduleId,
          moduleName: "会议申请",
          flowId: formStruct.parameters.flowId,
          formId: formStruct.parameters.formId,
          formType: formStruct.parameters.formType,
          pk: formStruct.parameters.pk,
          nodeId: formStruct.parameters.nodeId,
          __VALUE: formStruct.parameters.formId,
          mid: formStruct.parameters.moduleId,
          mId: formStruct.parameters.moduleId,
        })
        .then((res) => {
          if (res.data.code == 200 && res.data.data.rules) {
            let control = vueData.formMeta.controls.find(
              (item) => item.controlId == "ctx8zlMCjIPpboY6"
            );
            vueData.$set(control.extra.rules, 0, res.data.data.rules[0]);
            vueData.$eventBus.emitRefreshFilecode(vueData, {});
          }
        });
    }

    //人员冲突提示
    function Conflict(data) {
      let conflictId =
        data.cxUnit +
        "," +
        data.lxUnit +
        "," +
        data.chr +
        "," +
        data.lxUser +
        "," +
        data.tyUser +
        "," +
        data.workUser +
        "," +
        data.wdwUser;
      if (data.arrangeRangeValue.includes("1")) {
        conflictId += data.nonvotingLeader;
      }
      if (data.arrangeRangeValue.includes("2")) {
        conflictId += data.lxLeader;
      }
      if (data.arrangeRangeValue.includes("3")) {
        conflictId += data.chbm;
      }
      if (data.arrangeRangeValue.includes("4")) {
        conflictId += data.lxbm;
      }

      conflictId = conflictId.replace(new RegExp(",+", "gm"), ",");
      conflictId = conflictId.substring(0, conflictId.lastIndexOf(","));
      if (
        formData.main["c-meetingsq-007"].value &&
        formData.main["c-meetingsq-008"].value &&
        conflictId
      ) {
        dsf.http
          .post("ctrl/meetingUser/verifyArrangeByUserId", {
            userIds: conflictId,
            startTime: formData.main["c-meetingsq-007"].value,
            endTime: formData.main["c-meetingsq-008"].value,
          })
          .then((res) => {
            if (res.status == "200" && res.data.data == "1") {
              vueData.refreshListKey = Math.random(); // 刷新列表组件
              vueData.commonPopParam = {
                listId: "2306140947171y006ycpXfIBORLJxol",
                moduleId: "190111184257QgSNR8cW92akDpqeWMA",
                params: {
                  userIds: conflictId,
                  startTime: formData.main["c-meetingsq-007"].value,
                  endTime: formData.main["c-meetingsq-008"].value,
                  title: "冲突人员信息",
                },
              };
              vueData.checkType = "checkBox";
              vueData.commonPop = true;
            }
          });
      }
    }

    // 时间计算
    function formatTime(val, n) {
      var data = new Date(val);
      var hm = data.getTime() + n * 60000;
      return formatMsToDate(hm);
    }

    function formatMsToDate(ms) {
      if (ms) {
        var oDate = new Date(ms),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oTime =
            oYear +
            "-" +
            addZero(oMonth) +
            "-" +
            addZero(oDay) +
            " " +
            addZero(oHour) +
            ":" +
            addZero(oMin);
        return oTime;
      } else {
        return "";
      }
    }
    function addZero(num) {
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    }

    vueData.$bus.$off("userClickBus").on("userClickBus", function (busObj) {
      console.log(busObj)
      return
      console.log(busObj.metaId == "c-meetingsq-042" || "c-meetingsq-043" || "c-meetingsq-116" || "c-meetingsq-117");
      if ((busObj.metaId == "c-meetingsq-042" || busObj.metaId == "c-meetingsq-043" || busObj.metaId == "c-meetingsq-116" || busObj.metaId == "c-meetingsq-117")) {
        if (busObj.user.attrs.noselect) {
          let ids
          busObj.user.children.forEach((element, i) => {
            element.checked = false
            if (i == 0) ids += element.attrs.idValue
            else ids += ',' + element.attrs.idValue
          });
          checkDeptUser(ids).catch(() => {
            busObj.callback2(busObj.user)
          })
        } else {
          if (busObj.user.checked) {
            checkDeptUser(busObj.user.attrs.idValue).catch(() => {
              busObj.user.checked = false
              busObj.callback(busObj.user)
            })
          }
        }
      }
    })

    vueData.$bus.$off("usercheckAllBus").on("usercheckAllBus", function (busObj) {
      return
      console.log(busObj)
      if ((busObj.metaId == "c-meetingsq-042" || busObj.metaId == "c-meetingsq-043" || busObj.metaId == "c-meetingsq-116" || busObj.metaId == "c-meetingsq-117") && busObj.user.children && busObj.user.children.length > 0) {
        let ids
        busObj.user.children.forEach((element, i) => {
          element.checked = false
          if (i == 0) ids += element.attrs.idValue
          else ids += ',' + element.attrs.idValue
        });
        checkDeptUser(ids).catch(() => {
          busObj.callback(busObj.user, true)
        })
      }
    })

    //判断部门是否有接收人
    function checkDeptUser(deptIds) {
      let loading = dsf.layer.loading('操作中')
      return new Promise((resolve, reject) => {
        dsf.http.post('ctrl/meetingRole/validDeptRoleUserNum', {
          deptIds: deptIds,
          moduleId: vueData.moduleId
        }).then(res => {
          dsf.layer.closeLoading(loading)
          if (res.data?.data?.valid == '1') {
            dsf.layer.toast(res.data.data.msg)
            reject()
          } else {
            resolve()
          }
        })
      })
    }
  };

  // 冲突人员列表选择
  (exportObj.choose = function (checkItems, vueData) {
    vueData.commonPop = false;
    vueData.formData.multinfos["2306131516053U1mdIcjAHX9w2wThOG"].rows = [];
    checkItems.forEach((ele, i) => {
      vueData.$refs.formTab[0].$refs[
        "2306131516053U1mdIcjAHX9w2wThOG"
      ][0].$refs.subform
        .addCard(false)
        .then((newData) => {
          //部门
          vueData.$set(newData, "C-MEETING-CONFLICT-0001", {
            value: ele.dataValue["230614094812YhP69ADJYsE9Q2LKCG4"],
          });
          //姓名
          vueData.$set(newData, "C-MEETING-CONFLICT-0002", {
            value: ele.dataValue["230614094848ySvgua9gpvJO5cnPLCS"],
          });
          //部门
          vueData.$set(newData, "B0060", {
            value: ele.dataValue["2306140949364qP6bSdRMBvQr6lcoSC"],
          });
        });
    });
  }),
    (exportObj.saveFilter = function (formData, formStruct, vueData, action) {
      return new Promise(function (resolve, reject) {
        if (
          formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"].rows.find(
            (row) => row["C-MEETING-TOPIC-0006"].value > 60
          )
        ) {
          reject("议题汇报时长不能超过60分钟，请重新输入");
        } else {
          if (
            formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"].rows.length >
            0
          ) {
            formData.multinfos["210618155422Xgcs9ChmODWRV36fMHJ"].rows.forEach(
              (row) => {
                vueData.$set(row["B0019"], "value", formatTime2());
              }
            );
          }

          resolve();
        }
      });
      function formatTime2() {
        var oDate = new Date(),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oTime = oYear + "-" + addZero(oMonth) + "-" + addZero(oDay);
        return oTime;
      }

      function addZero(num) {
        if (parseInt(num) < 10) {
          num = "0" + num;
        }
        return num;
      }
    });

  window.spJS = exportObj;
})();
