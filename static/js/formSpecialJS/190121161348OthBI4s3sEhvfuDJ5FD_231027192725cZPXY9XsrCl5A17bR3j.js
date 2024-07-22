// 会议通知拟稿、编辑
(function () {
  const exportObj = {};
  exportObj.beforeInitAsync = function (formData, formStruct, vueData) {
    // 数股有消息推送，若当前人已被撤销报名，则当前人不让再进会议通知，
    if (formStruct.parameters?.isauthopen == "-1") {
      dsf.layer.toast("该会议通知已经撤销", () => vueData.backSucces());
    }

    if (formStruct.parameters?.issteadreport == "1") {
      formStruct.buttons.mainButtons.forEach((button) => {
        if (button.name == "报名") vueData.$set(button, "name", "代报");
      });
    } else if (formStruct.parameters?.issteadreport == "-1") {
      formStruct.buttons.mainButtons.forEach((button) => {
        if (button.name == "代报") vueData.$set(button, "name", "报名");
      });
    }
  };
  exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log("办公厅会议通知");
    console.log("当前节点", formStruct.parameters.nodeId);
    let Obj,
      Obj1 = [
        "会议名称",
        "controlMobileDateShow", //时间段控件(移动端)
        "开始时间",
        "结束时间",
        // "会议类型",
        "会议地点",
        "会议地点其他",
        "会议室",
        "会议室其他",
        // "出席领导",
        // "出席单位",
        // "出席人员",
        // "联系人",
        // "联系电话",
        "会议材料",
        "通知正文",
        "二维码",
      ], //普通会议
      Obj2 = [
        "会议名称",
        "controlMobileDateShow", //时间段控件(移动端)
        "开始时间",
        "结束时间",
        // "会议类型",
        "会议地点",
        "会议地点其他",
        "会议室",
        "会议室其他",
        // "工作人员",
        "会议材料",
        "通知正文",
        "二维码",
      ], //专题会议
      Obj3 = [
        "会议名称",
        "controlMobileDateShow", //时间段控件(移动端)
        "开始时间",
        "结束时间",
        // "会议类型",
        "会议地点",
        "会议地点其他",
        "会议室",
        "会议室其他",
        // "会议议程",
        // "会议要求",
        "会议材料",
        "通知正文",
        "二维码",
      ]; //全市性会议
    vueData.$watch(
      function () {
        return formData.main["c-meetingtz-004"].text;
      },
      function (n, o) {
        if (n == "普通会议") {
          Obj = Obj1;
        } else if (n == "专题会议") {
          Obj = Obj2;
        } else if (n == "全市性大会") {
          Obj = Obj3;
        }
        formStruct.controls.forEach((item) => {
          if (Obj.includes(item.label) || Obj.includes(item.metaId))
            item.show = 1;
          else item.show = 0;
        });
      },
      {
        deep: true,
        immediate: true,
      }
    );

    //办公厅特殊样式
    let obj = ["开始时间", "结束时间", "会议类型"];
    formStruct.controls.forEach((item) => {
      obj.includes(item.label) ? (item.show = 0) : "";
    });

    if (
      dsf.config.meetProjectconfig?.BGTsingUpInfo &&
      (formStruct.parameters.nodeId == 19 ||
        formStruct.parameters.nodeId == 20 ||
        formStruct.parameters.nodeId == 15 ||
        formStruct.parameters.nodeId == 16 ||
        formStruct.parameters.nodeId == "-1")
    ) {
      //办公厅特殊样式
      let obj = ["开始时间", "结束时间", "会议类型"];
      formStruct.controls.forEach((item) => {
        obj.includes(item.label) ? (item.show = 0) : "";
      });

      vueData.$watch(
        //会议地点无值就隐藏
        function () {
          return formData.main["c-meetingtz-030"].value;
        },
        function (n, o) {
          if (!n) {
            formStruct.controls.forEach((item) => {
              if (item.metaId == "c-meetingtz-030") {
                item.show = 0;
              }
            });
          }
        },
        {
          deep: true,
          immediate: true,
        }
      );
    }
  };

  exportObj.AttendanceStatus = function (formData, formStruct, vueData) {
    vueData.$router.push({
      path: `/commonList/231130144050Bo5v4zfx6wbX7YLscc7/231130143826e7v2ZldWXD9px82o0VG?title=签到情况`,
      query: {
        secQuery: `{"fid": "${formData.main["A0001"].value}"}`,
        notLink: 1,
      },
    });
  };

  exportObj.viewMeetingSign = function (formData, formStruct, vueData) {
    vueData.$router.push({
      path: `/commonForm/${vueData.$route.query.signUpModuleId}/${vueData.$route.query.signUpPk}?listId=MeetingBmList&method=viewBmb&validateByList=1&tzlx=${vueData.$route.query.hyTzlx}`,
    });
  };

  window.spJS = exportObj;
})();
