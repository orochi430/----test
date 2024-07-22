// 会议申请--个性化表单
(function () {
  const exportObj = {};
  exportObj.beforeInitAsync = async function (formData, formStruct, vueData) {
  
    if (formStruct.parameters.nodeId == 0) {
      setTimeout(() => {
        sortMeet(
          formData.main["c-meetingsq-075"].value,
          0,
          formData.main["c-meetingsq-075"].text
        );
        defaultMeet(formData.main["c-meetingsq-009"].value);
      }, 1000);
    }
    console.log(formStruct);
  
    let meetingData = dsf.util.loadSessionStore("checkedMettingRoom")
      ? dsf.util.loadSessionStore("checkedMettingRoom")
      : null;
    if (meetingData) {
      formData.main["c-meetingsq-009"].value = meetingData.value;
      formData.main["c-meetingsq-009"].text = meetingData.text;
    }
  
    if (meetingData && dsf.util.loadSessionStore("checkedMettingStime")) {
      vueData.$set(vueData.formData.main, "c-meetingsq-007", {
        value: dsf.util.loadSessionStore("checkedMettingStime").value,
      });
      vueData.$set(vueData.formData.main, "c-meetingsq-008", {
        value: moment(
          new Date(dsf.util.loadSessionStore("checkedMettingStime").value)
        )
          .add(2, "hours")
          .format("YYYY-MM-DD HH:mm"),
      });
    }
  
    sortMeet(formData.main["c-meetingsq-075"].value || "", 1); //议题转会议申请初始化
  
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
                        new Date(formData.main["c-meetingsq-007"].value).getTime()
                      )
                  ),
                }); //结束时间
              } else {
                vueData.$set(formData.main, "c-meetingsq-008", {
                  value: "",
                }); //结束时间
              }
            }
          });
      }
    });
  
    vueData.$bus.on("checkVal", function (data) {
      console.log(data);
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
          console.log(res);
          if (res && res.data && res.data.data && res.data.data.dzValue) {
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
    // 会议类型联动
    function sortMeet(id, type, text) {
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
            if (type) return; //初始化时不赋值
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
    };
  
  };
  
  window.spJS = exportObj;
})()