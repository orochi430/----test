// 办公厅会议申请  --- 领导节点
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log("办公厅会议申请");
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
        // "联系电话",w
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
        return formData.main["c-meetingsq-075"].text;
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
      (formStruct.parameters.nodeId == 80 ||
        formStruct.parameters.nodeId == 81 ||
        formStruct.parameters.nodeId == "JZX5jNeubonTNik" ||
        formStruct.parameters.nodeId == "yePMzHy8dsGl94W")
    ) {
      //办公厅特殊样式
      let obj = ["领导批示"];
      formStruct.controls.forEach((item) => {
        obj.includes(item.label) ? (item.show = 0) : "";
      });

      let obj1 = ["意见输入"];
      formStruct.controls.forEach((item) => {
        obj1.includes(item.label) ? (item.show = 1) : "";
      });

      vueData.$watch(
        //会议地点无值就隐藏
        function () {
          return formData.main["c-meetingsq-090"].value;
        },
        function (n, o) {
          if (!n) {
            formStruct.controls.forEach((item) => {
              if (item.metaId == "c-meetingsq-090") {
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
    if (formStruct.parameters.nodeId == "-1") {
    }
  };

  window.spJS = exportObj;
})();
