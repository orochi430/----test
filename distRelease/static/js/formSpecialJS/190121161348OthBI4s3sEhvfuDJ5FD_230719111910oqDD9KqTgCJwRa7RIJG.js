// 会议通知拟稿、编辑
(function () {
  const exportObj = {};
  exportObj.beforeInitAsync = function (formData, formStruct, vueData) {
    //在初始化的时候判断有没有会议议题， 有的话就添加一个会议议题的tab
    dsf.http
      .post("/fn/meetingNotice/getTopic", {
        pk: vueData.formData.main["A0001"].value,
      })
      .then((res) => {
        if (res.data.code == 200 && res.data.data.length > 0) {
          if (
            formStruct.parameters.nodeId != "15" &&
            formStruct.parameters.nodeId != "16"
          ) {
            dsf.util.saveToSessionStore("meetingTopicParams", {
              showall: "1",
            });
          } else {
            dsf.util.saveToSessionStore("meetingTopicParams", {});
          }
          vueData.formTabs.push({
            enable: true,
            name: "meettingTopic",
            title: "会议议题",
          });
        } else {
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
  };

  exportObj.initHandle = function (formData, formStruct, vueData) {
    let person = dsf.util.loadLocalStore("user");
    if (
      person &&
      formData.main["c-meetingtz-049"].value.indexOf(person.user_id) >= 0 &&
      vueData.$route.query.noticeType != 2
    ) {
      let signBtnIndex = vueData.formButtons.mainButtons.findIndex(
        (button) => button.name == "报名"
      );
      if (signBtnIndex >= 0) {
        vueData.formButtons.mainButtons.splice(signBtnIndex, 1);
      }
    }
    if (formStruct.parameters.nodeId == 0) {
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
        "通知提醒",
        "会议届次",
        "回执要素",
        "是否报名反馈",
        "提醒内容",
        "提醒范围",
        "会议通知模板",
        "会议届次",
        "报名截止时间",
        "会前提醒",
        "通知设置",
      ];
      formStruct.controls.forEach((item) => {
        Obj.includes(item.label) ? (item.show = 0) : "";
      });
      //拟稿
      sortMeet(formData.main["c-meetingtz-004"].value, 0);
      defaultMeet(formData.main["c-meetingtz-004"].value);
    } else {
      sortMeet(formData.main["c-meetingtz-004"].value, 1); //编辑节点
    }

    if (
      formStruct.parameters.nodeId != 0 &&
      formStruct.parameters.nodeId != "-2" &&
      !formData.main["B0003"].value
    ) {
      let obj = ["会议届次"];
      formStruct.controls.forEach((item) => {
        obj.includes(item.label) ? (item.show = 0) : "";
      });
    }

    //会议室联动--代码选择
    vueData.$bus.on("selectUserBus", function (data) {
      if (data.metaData.metaId == "c-meetingtz-010") {
        defaultMeet(data.value);
      }
    });

    vueData.$bus.on("selectDateTime", function (data) {
      console.log(data);
      if (data.metaData.metaId == "c-meetingtz-019") {
        dsf.http
          .post("/fn/meetingType/getMeetingType", {
            meetingTypeId: formData.main["c-meetingtz-004"].value,
          })
          .then((res) => {
            let data = res.data.data;
            if (res.data.code == 200) {
              if (data.duration && data.duration != 0) {
                vueData.$set(formData.main, "c-meetingtz-020", {
                  value: formatMsToDate(
                    Number(data.duration * 3600000) +
                      Number(
                        new Date(
                          formData.main["c-meetingtz-019"].value
                        ).getTime()
                      )
                  ),
                }); //结束时间
              } else {
                vueData.$set(formData.main, "c-meetingtz-020", { value: "" }); //结束时间
              }
              if (data.bmfktqsj) {
                let timer = "";
                timer =
                  data.tqsjlx == 1
                    ? data.bmfktqsj * 86400000
                    : data.tqsjlx == 2
                    ? data.bmfktqsj * 3600000
                    : data.bmfktqsj * 60000;
                vueData.$set(formData.main, "c-meetingtz-018", {
                  value: formatMsToDate(
                    Number(
                      new Date(formData.main["c-meetingtz-019"].value).getTime()
                    ) - Number(timer)
                  ),
                }); //报名截止时间
              }
            }
            // 校验会议冲突人员
            if (data.verifyArrangeValue == "1") {
              Conflict(data);
            }
          });
      }
      if (data.metaData.metaId == "c-meetingtz-019") {
        dsf.http
          .post("/fn/meetingType/getMeetingType", {
            meetingTypeId: formData.main["c-meetingtz-004"].value,
          })
          .then((res) => {
            let data = res.data.data;
            if (res.data.code == 200) {
              if (data.duration && data.duration != 0) {
                vueData.$set(formData.main, "c-meetingtz-020", {
                  value: formatMsToDate(
                    Number(data.duration * 3600000) +
                      Number(
                        new Date(
                          formData.main["c-meetingtz-019"].value
                        ).getTime()
                      )
                  ),
                }); //结束时间
              } else {
                vueData.$set(formData.main, "c-meetingtz-020", { value: "" }); //结束时间
              }
              if (data.bmfktqsj) {
                let timer = "";
                timer =
                  data.tqsjlx == 1
                    ? data.bmfktqsj * 86400000
                    : data.tqsjlx == 2
                    ? data.bmfktqsj * 3600000
                    : data.bmfktqsj * 60000;
                vueData.$set(formData.main, "c-meetingtz-018", {
                  value: formatMsToDate(
                    Number(
                      new Date(formData.main["c-meetingtz-019"].value).getTime()
                    ) - Number(timer)
                  ),
                }); //报名截止时间
              }
            }
            // 校验会议冲突人员
            if (data.verifyArrangeValue == "1") {
              Conflict(data);
            }
          });
      }
    });

    vueData.$bus.on("getUser", function (data) {
      console.log(data);
      if (data.metaData.metaId == "c-meeting-hytzhqxxtx-004") {
        vueData.$bus.emit(
          "codeSelect",
          `&meetingTypeId=${formData.main["c-meetingtz-004"].value}`
        );
      }
    });

    // 会议通知会议类型联动
    vueData.$bus.on("checkVal", function (busObj) {
      console.log(busObj);
      //会议地址赋值
      if (busObj.metaData.metaId == "c-meetingtz-010") {
        defaultMeet(busObj.value);
      }
      if (busObj.metaData.metaId == "c-meetingtz-004") {
        sortMeet(busObj.value, 0);
      }
      // 回执要素确认后赋值
      if (busObj.metaData.metaId == "c-meetingtz-057") {
        vueData.$set(vueData.formData.main, "c-meetingtz-057", {
          value: busObj.value,
          text: busObj.text,
        });
      }
    });

    // 是否报名反馈（是，则“回执要素”默认先选中“单位”、“部门”、“姓名”、“联系方式”，并且不可以修改；否，则取消所有回执要素）
    vueData.$bus.on("inputRadio", function (busObj) {
      if (vueData.formData.main["c-meetingtz-016"].value == "1") {
        vueData.$set(vueData.formData.main, "c-meetingtz-057", {
          value:
            "B0001,c-meetingchry-003,c-meetingchry-004,c-meetingchry-002,c-meetingchry-0010",
          text: "职务,单位,部门,姓名,联系方式",
        });
        vueData.formMeta.controls.forEach((item, index) => {
          if (item.metaId == "c-meetingtz-057") {
            vueData.$set(vueData.formMeta.controls[index], "defaultValue", {
              value:
                "B0001,c-meetingchry-003,c-meetingchry-004,c-meetingchry-002,c-meetingchry-0010",
              text: "职务,单位,部门,姓名,联系方式",
            });
          }
        });
      } else {
        vueData.$set(vueData.formData.main, "c-meetingtz-057", {
          value: "",
          text: "",
        });
        vueData.formMeta.controls.forEach((item, index) => {
          if (item.metaId == "c-meetingtz-057") {
            vueData.$set(vueData.formMeta.controls[index], "defaultValue", {});
          }
        });
      }
    });

    //如果当前是个人的话 只有报名按钮 如果是单位 有报名和转交
    if (vueData.$route.query.noticeType == 1) {
      //个人会议通知
      vueData.formMeta.buttons.mainButtons =
        vueData.formMeta.buttons.mainButtons.filter((item) => {
          return item.action != "newMeetingTrunTo";
        });
    }

    //参与人员、联系人信息默认隐藏  、通知设置不显示、
    if (
      vueData.$route.params.pk &&
      vueData.formMeta.parameters.nodeId == "-1"
    ) {
      setTimeout(() => {
        vueData.formMeta.controls.forEach((item, index) => {
          if (
            [
              "q5xy1WtkQmFLp8mj",
              "3P8mZPj6noThSWsw",
              "chNKrz1S8yMD8h4A",
              "qX8iH4A8w5TXJ1Us",
              "GzBcVSvzHVtkRnpM",
              "kUdSwXGHeXzkzlTP",
              "79F0tZ1DNSVVJL7l",
              "7zRDIRpwlpMdiDmU",
              "4HnK6jjs8Wfilq6Y",
              "9hYHr70GtPPOZtu0",
            ].includes(item.controlId)
          ) {
            vueData.$set(vueData.formMeta.controls[index], "show", 0);
          }

          if (
            ["B4L8Slc2TGJMXcak", "EjtaNJ9nF28vK8zO"].includes(item.controlId)
          ) {
            vueData.$set(vueData.formMeta.controls[index].extra, "M-MRSFSF", 1);
          }
        });
      }, 500);
    }

    // 会议类型联动
    function sortMeet(id, type) {
      if (!id) {
        return;
      }
      let Obj1 = [
        "回执要素",
        "是否报名反馈",
        "提醒内容",
        "提醒范围",
        "会议通知模板",
        "会议届次",
        "通知提醒",
        "报名截止时间",
        "会前提醒",
        "通知设置",
      ];
      formStruct.controls.forEach((item) => {
        Obj1.includes(item.label) ? (item.show = 1) : "";
      });
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
        "参会人员",
      ];

      let enumArr = [
        //全提醒范围
        {
          id: "2301101109199akjo5rYe3NG2qVQf69",
          remark: "",
          text: "出席领导",
          value: "1",
          varClass: "layui-col-md3",
        },
        {
          id: "2301101109403fTs0CqD4Anf4xsdvaR",
          remark: "",
          text: "列席领导",
          value: "2",
          varClass: "layui-col-md3",
        },
        {
          id: "230110110949cPudjWjoXAwVQr9MgyS",
          remark: "",
          text: "出席部门",
          value: "3",
          varClass: "layui-col-md3",
        },
        {
          id: "230110110959q612qVP6IHYhkHgAw4B",
          remark: "",
          text: "列席部门",
          value: "4",
          varClass: "layui-col-md3",
        },
        {
          id: "230110111010lkYTrr0EgxckgjAP5BN",
          remark: "",
          text: "出席单位",
          value: "5",
          varClass: "layui-col-md3",
        },
        {
          id: "230110111025DT0BdsznalvffblTvcM",
          remark: "",
          text: "列席单位",
          value: "6",
          varClass: "layui-col-md3",
        },
        {
          id: "230110111039PSF7gfuVR2UiXo9Nrxl",
          remark: "",
          text: "出席人员",
          value: "7",
          varClass: "layui-col-md3",
        },
        {
          id: "2301101110503J1pfzW8Fias9edBSEo",
          remark: "",
          text: "列席人员",
          value: "8",
          varClass: "layui-col-md3",
        },
        {
          id: "2301101111035hhn1GzaXpRhmlBOYii",
          remark: "",
          text: "特邀人员",
          value: "9",
          varClass: "layui-col-md3",
        },
        {
          id: "230110111112SK2SBp6DV1couN0sVkh",
          remark: "",
          text: "工作人员",
          value: "10",
          varClass: "layui-col-md3",
        },
      ];
      formStruct.controls.forEach((item) => {
        Obj.includes(item.label) ? (item.show = 0) : "";
      });
      dsf.http
        .post("/fn/meetingType/getMeetingType", {
          meetingTypeId: id,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            let data = res.data.data;
            if (data.chdxText) {
              let Arr = data.chdxText.split(",");
              Arr.forEach((ele) => {
                formStruct.controls.forEach((item) => {
                  if (item.label == ele) {
                    item.show = 1;
                  }
                });
              });
              formStruct.controls.forEach((item) => {
                if (item.metaId == "c-meetingtz-080") {
                  item.enumData = [];
                  enumArr.forEach((it) => {
                    if (Arr.includes(it.text)) {
                      item.enumData.push(it);
                    }
                  });
                }
              });
            }
            //会议通知模板
            if (data.mbxzValue) {
              let MBText = data.mbxzText.split(",");
              let MBVal = data.mbxzValue.split(",");
              formStruct.controls.forEach((ele) => {
                if (ele.metaId == "c-meetingtz-091") {
                  vueData.$set(ele, "enumData", []);
                  vueData.$set(ele, "show", 1);
                }
              });
              formStruct.controls.forEach((ele, index) => {
                if (ele.metaId == "c-meetingtz-091") {
                  MBVal.forEach((val, i) => {
                    ele.enumData.push({
                      text: MBText[i],
                      value: MBVal[i],
                      varClass: "layui-col-md3",
                    });
                  });
                }
                if (
                  index == 0 &&
                  (formStruct.parameters.nodeId == "0" ||
                    formStruct.parameters.nodeId == "-2")
                ) {
                  //默认选中第一个模版
                  vueData.$set(formData.main, "c-meetingtz-091", {
                    value: MBVal[0],
                    text: MBText[0],
                  });
                }
              });
            } else {
              formStruct.controls.forEach((ele) => {
                if (ele.metaId == "c-meetingtz-091") {
                  vueData.$set(ele, "show", 0);
                }
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
                }
              });
              vueData.$set(formData.main, "B0003", {
                value: "",
              }); //
            }

            if (type) return;

            //主持人联动
            if (data.zcrValue) {
              vueData.$set(formData.main, "c-meetingtz-011", {
                value: data.zcrValue,
                text: data.zcrText,
                schema: data.zcrSchema,
              });
            } else {
              vueData.$set(formData.main, "c-meetingtz-011", {
                value: '',
                text: '',
                schema: '',
              });
            }

            if (
              res.data.data.duration &&
              res.data.data.duration != 0 &&
              formData &&
              formData.main["c-meetingtz-020"] &&
              !formData.main["c-meetingtz-020"].value
            ) {
              vueData.$set(formData.main, "c-meetingtz-020", {
                value: formatMsToDate(
                  Number(res.data.data.duration * 3600000) +
                    Number(
                      new Date(formData.main["c-meetingtz-019"].value).getTime()
                    )
                ),
              }); //结束时间
            }
            if (formData.main["c-meetingtz-019"].value && data.bmfktqsj) {
              let timer = "";
              timer =
                data.tqsjlx == 1
                  ? data.bmfktqsj * 86400000
                  : data.tqsjlx == 2
                  ? data.bmfktqsj * 3600000
                  : data.bmfktqsj * 60000;
              vueData.$set(formData.main, "c-meetingtz-018", {
                value: formatMsToDate(
                  Number(
                    new Date(formData.main["c-meetingtz-019"].value).getTime()
                  ) - Number(timer)
                ),
              }); //报名截止时间
            }

            // 校验会议冲突人员
            if (data.verifyArrangeValue == "1") {
              Conflict(data);
            }

            vueData.$set(formData.main, "c-meetingtz-049", {
              value: data.nonvotingLeader,
              text: data.nonvotingLeaderText,
              schema: data.nonvotingLeaderSchema,
            }); //出席领导
            vueData.$set(formData.main, "c-meetingtz-082", {
              value: data.lxLeader,
              text: data.lxLeaderText,
              schema: data.lxLeaderSchema,
            }); //列席领导
            vueData.$set(formData.main, "c-meetingtz-028", {
              value: data.chbm,
              text: data.chbmText,
              schema: data.chbmSchema,
            }); //出席部门
            vueData.$set(formData.main, "c-meetingtz-041", {
              value: data.lxbm,
              text: data.lxbmText,
              schema: data.lxbmSchema,
            }); //列席部门
            vueData.$set(formData.main, "c-meetingtz-083", {
              value: data.cxUnit,
              text: data.cxUnitText,
              schema: data.cxUnitSchema,
            }); //出席单位
            vueData.$set(formData.main, "c-meetingtz-084", {
              value: data.lxUnit,
              text: data.lxUnitText,
              schema: data.lxUnitSchema,
            }); //列席单位
            vueData.$set(formData.main, "c-meetingtz-023", {
              value: data.chr,
              text: data.chrText,
              schema: data.chrSchema,
            }); //出席人员
            vueData.$set(formData.main, "c-meetingtz-013", {
              value: data.lxUser,
              text: data.lxUserText,
              schema: data.lxUserSchema,
            }); //列席人员
            vueData.$set(formData.main, "c-meetingtz-085", {
              value: data.tyUser,
              text: data.tyUserText,
              schema: data.tyUserSchema,
            }); //特邀人员
            vueData.$set(formData.main, "c-meetingtz-076", {
              value: data.workUser,
              text: data.workUserText,
              schema: data.workUserSchema,
            }); //工作人员
            vueData.$set(formData.main, "c-meetingtz-064", {
              value: data.wdwUser,
              text: data.wdwUserText,
              schema: data.wdwUserSchema,
            }); //外单位人员

            vueData.$set(formData.main, "c-meetingtz-050", {
              value: data.hyyq,
              // text: data.hyyq,
            }); //会议要求

            vueData.$set(formData.main, "c-meetingtz-016", {
              value: data.sfbmValue,
              text:
                data.sfbmValue == 1
                  ? "报名+回执"
                  : data.sfbmValue == 2
                  ? "仅报名"
                  : "无需报名",
            }); //是否报名反馈

            vueData.$set(formData.main, "c-meetingtz-077", {
              value: data.ytclhsfs,
              text: data.ytclhsfsText,
            }); //议题材料回收方式

            vueData.$set(formData.main, "c-meetingtz-052", {
              value: data.isIssue,
              text: data.isIssue == 1 ? "是" : "否",
            }); //是否下发议题
            vueData.$set(formData.main, "c-meetingtz-053", {
              value: data.isIssuematerial,
              text: data.isIssuematerial == 1 ? "是" : "否",
            }); //下发议题材料
            vueData.$set(formData.main, "c-meetingtz-054", {
              value: data.isYtqxxf,
              text: data.isYtqxxf == 1 ? "是" : "否",
            }); //根据议题权限下发
            vueData.$set(formData.main, "c-meetingtz-078", {
              value: data.tztxfs,
            }); //通知提醒
            vueData.$set(formData.main, "c-meetingtz-079", {
              value: data.txContent,
            }); //提醒内容

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

            //通知提醒
            if (data.tztxfs) {
              vueData.$set(vueData.formData.main, "c-meetingtz-078", {
                value: data.tztxfs,
                text: data.tztxfsText,
              });
              vueData.formMeta.controls.forEach((item, index) => {
                if (item.metaId == "c-meetingtz-078") {
                  vueData.$set(
                    vueData.formMeta.controls[index],
                    "defaultValue",
                    {
                      value: data.tztxfs,
                      text: data.tztxfsText,
                    }
                  );
                }
              });
            }

            //提醒范围
            if (data.txfw) {
              vueData.$set(vueData.formData.main, "c-meetingtz-080", {
                value: data.txfw,
                text: data.txfwText,
              });
              vueData.formMeta.controls.forEach((item, index) => {
                if (item.metaId == "c-meetingtz-080") {
                  vueData.$set(
                    vueData.formMeta.controls[index],
                    "defaultValue",
                    {
                      value: data.txfw,
                      text: data.txfwText,
                    }
                  );
                }
              });
            }

            // 默认赋值回执要素
            if (vueData.formData.main["c-meetingtz-016"].value == "1") {
              vueData.$set(vueData.formData.main, "c-meetingtz-057", {
                value:
                  "B0001,c-meetingchry-003,c-meetingchry-004,c-meetingchry-002,c-meetingchry-0010",
                text: "职务,单位,部门,姓名,联系方式",
              });
              vueData.formMeta.controls.forEach((item, index) => {
                if (item.metaId == "c-meetingtz-057") {
                  vueData.$set(
                    vueData.formMeta.controls[index],
                    "defaultValue",
                    {
                      value:
                        "B0001,c-meetingchry-003,c-meetingchry-004,c-meetingchry-002,c-meetingchry-0010",
                      text: "职务,单位,部门,姓名,联系方式",
                    }
                  );
                }
              });
            }
            //更新会议届次
            if (data.hyjcValue) {
              getFileCode(data.hyjcValue);
              vueData.$bus.on("changeFileCode", function () {
                vueData.$set(formData.main, "B0001", {
                  value: formData.main["B0003"].value
                    ? formData.main["B0003"].value +
                      formData.main["c-meetingtz-004"].text
                    : "",
                });
              });
            }
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
        formData.main["c-meetingtz-019"].value &&
        formData.main["c-meetingtz-020"].value &&
        conflictId
      ) {
        dsf.http
          .post("ctrl/meetingUser/verifyArrangeByUserId", {
            userIds: conflictId,
            startTime: formData.main["c-meetingtz-019"].value,
            endTime: formData.main["c-meetingtz-020"].value,
          })
          .then((res) => {
            if (res.status == "200" && res.data.data == "1") {
              if (vueData.$refs.DefaultList) {
                vueData.$refs.DefaultList.onRefresh();
              }
              vueData.commonPopParam = {
                listId: "230614094549u0UuhacEM9R1kAibocs",
                moduleId: "190121161348OthBI4s3sEhvfuDJ5FD",
                params: {
                  userIds: conflictId,
                  startTime: formData.main["c-meetingtz-019"].value,
                  endTime: formData.main["c-meetingtz-020"].value,
                  notLink: true,
                  title: "冲突人员信息",
                },
              };
              console.log(vueData);
              vueData.$set(vueData, "checkable", false);
              vueData.commonPop = true;
            }
          });
      }
    }

    // 获取默认资源
    function defaultMeet(id) {
      dsf.http
        .post("/fn/meetingRoom/getMeetingRoomDefaultResource", {
          roomId: id,
        })
        .then((res) => {
          if (res?.data?.data?.dzValue) {
            vueData.$set(formData.main, "c-meetingtz-030", {
              value: res.data.data.dzValue,
            }); //会议室地址
          }
        });
    }
    //获取文号规则
    function getFileCode(id) {
      dsf.http
        .post("fn/filecode/docType", {
          //获取文号规则
          element: "Co8OQ6DkyykL2ZCN", //会议届次控件ID
          targetRuleId: id,
          moduleId: formStruct.parameters.moduleId,
          moduleName: "会议通知",
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
              (item) => item.controlId == "Co8OQ6DkyykL2ZCN"
            );
            vueData.$set(control.extra.rules, 0, res.data.data.rules[0]);
            vueData.$eventBus.emitRefreshFilecode(vueData, {});
          }
        });
    }
  };
  exportObj.saveAfter = function (vueData, formStruct, formData) {
    if (formData.main["c-meetingtz-091"].value) {
      dsf.http
        .post("ctrl/meetingNotice/generatorFile", {
          //更新打印单
          fileType: "0",
          templateId: formData.main["c-meetingtz-091"].value,
          moduleId: vueData.formMeta.parameters.moduleId,
          pk: vueData.formMeta.parameters.pk,
        })
        .then((res) => {
          console.log(res);
          if (res.status == "200") {
            dsf.layer.toast(res.data.message);
            if (vueData.isFromList) {
              vueData.backSucces();
            } else {
              vueData.$router.replace({
                path: `/commonList/200818195728QeQ7vIeoJ3jWto301pj/190121161348OthBI4s3sEhvfuDJ5FD?title=会议通知`,
              });
            }
          }
        });
    } else {
      dsf.layer.toast("操作成功", () => {
        vueData.backSucces();
      });
    }
  };

  function formatMsToDate(ms) {
    if (ms) {
      var oDate = new Date(ms),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime =
          oYear +
          "-" +
          addZero(oMonth) +
          "-" +
          addZero(oDay) +
          " " +
          addZero(oHour) +
          ":" +
          addZero(oMin) +
          ":" +
          addZero(oSen);
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

  window.spJS = exportObj;
})();
