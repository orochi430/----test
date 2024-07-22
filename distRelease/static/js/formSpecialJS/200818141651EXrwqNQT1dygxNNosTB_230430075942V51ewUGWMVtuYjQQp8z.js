// 会议纪要--jf
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("selectDateTime", function (data) {
      if (data.metaData.metaId == "C-HYJY-0001") {
        dsf.http
          .post("/fn/meetingType/getMeetingType", {
            meetingTypeId: formData.main["C-HYJY-0008"].value,
          })
          .then((res) => {
            if (res.data.code == 200 && res.data.data) {
              let data = res.data.data;
              if (res.data.data.duration && res.data.data.duration != 0) {
                vueData.$set(formData.main, "C-HYJY-0002", {
                  value: formatMsToDate(
                    Number(res.data.data.duration * 3600000) +
                      Number(
                        new Date(formData.main["C-HYJY-0001"].value).getTime()
                      )
                  ),
                }); //结束时间
              } else {
                vueData.$set(formData.main, "C-HYJY-0002", {
                  value: "",
                }); //结束时间
              }
            }
          });
      }
    });
    sortMeet(formData.main["C-HYJY-0008"].value, 1);
    vueData.$bus.on("checkVal", function (data) {
      console.log(data);
      if (data.metaData.metaId == "C-HYJY-0008") {
        sortMeet(data.value, 0, data.text);
      }
      //会议地址赋值39006--下拉框
      if (data.metaData.metaId == "C-HYJY-0003") {
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
          console.log(res);
          if (res?.data?.data?.dzValue) {
            // vueData.$set(formData.main, "C-HYJY-090", {
            //   value: res.data.data.dzValue,
            // }); //会议室地址
          }
        });
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

            if (data.hyjcValue) {
              vueData.formMeta.controls.find((item) => {
                item.metaId == "B0003" ? vueData.$set(item, "show", 1) : "";
              });
            } else {
              vueData.formMeta.controls.find((item) => {
                item.metaId == "B0003" ? vueData.$set(item, "show", 0) : "";
              });
            }
            if (type) return; //初始化时不赋值

            //文号赋值
            if (data.hyjcValue) {
              getFileCode(data.hyjcValue);
            }

            if (
              res.data.data.duration &&
              res.data.data.duration != 0 &&
              formData &&
              !formData.main["C-HYJY-0002"].value
            ) {
              vueData.$set(formData.main, "C-HYJY-0002", {
                value: formatMsToDate(
                  Number(res.data.data.duration * 3600000) +
                    Number(new Date(formData.main["C-HYJY-0001"].value).getTime())
                ),
              }); //结束时间
            }

            vueData.$set(formData.main, "C-HYJY-0023", {
              value: data.nonvotingLeader,
              text: data.nonvotingLeaderText,
              schema: data.nonvotingLeaderSchema,
            }); //出席领导
            vueData.$set(formData.main, "C-HYJY-0022", {
              value: data.lxLeader,
              text: data.lxLeaderText,
              schema: data.lxLeaderSchema,
            }); //列席领导
            vueData.$set(formData.main, "C-HYJY-0006", {
              value: data.chbm,
              text: data.chbmText,
              schema: data.chbmSchema,
            }); //出席部门
            vueData.$set(formData.main, "C-HYJY-0007", {
              value: data.lxbm,
              text: data.lxbmText,
              schema: data.lxbmSchema,
            }); //列席部门
            vueData.$set(formData.main, "C-HYJY-0025", {
              value: data.cxUnit,
              text: data.cxUnitText,
              schema: data.cxUnitSchema,
            }); //出席单位
            vueData.$set(formData.main, "C-HYJY-0026", {
              value: data.lxUnit,
              text: data.lxUnitText,
              schema: data.lxUnitSchema,
            }); //列席单位
            vueData.$set(formData.main, "C-HYJY-0024", {
              value: data.chr,
              text: data.chrText,
              schema: data.chrSchema,
            }); //出席人员
            vueData.$set(formData.main, "C-HYJY-0028", {
              value: data.lxUser,
              text: data.lxUserText,
              schema: data.lxUserSchema,
            }); //列席人员
            vueData.$set(formData.main, "C-HYJY-0027", {
              value: data.tyUser,
              text: data.tyUserText,
              schema: data.tyUserSchema,
            }); //特邀人员
            vueData.$set(formData.main, "C-HYJY-0030", {
              value: data.workUser,
              text: data.workUserText,
              schema: data.workUserSchema,
            }); //工作人员
            vueData.$set(formData.main, "C-HYJY-0029", {
              value: data.wdwUser,
              text: data.wdwUserText,
              schema: data.wdwUserSchema,
            }); //外单位人员
          }
        });
    }
    //获取文号规则
    function getFileCode(id) {
      dsf.http
        .post("fn/filecode/docType", {
          //获取文号规则
          element: "qJWlST6NC5d09Tqk", //会议届次空间ID
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
          console.log(res.data);
          if (res.data.code == 200 && res.data.data.rules) {
            let control = vueData.formMeta.controls.find(
              (item) => item.controlId == "qJWlST6NC5d09Tqk"
            );
            vueData.$set(control.extra.rules, 0, res.data.data.rules[0]);
            vueData.$eventBus.emitRefreshFilecode(vueData, {});
          }
        });
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
  };
  window.spJS = exportObj;
})();
