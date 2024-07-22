(function () {
  // 议题填报--jf
  const exportObj = {};
  exportObj.handle = function (formData, formStruct, vueDate) {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    console.log(vueData);
    console.log(formData.opinion);
    if (vueData.$route.query.gly == "1") {
      vueData.$set(formData.main["C-MEETING-TOPIC-0072"], "value", 1);
      vueData.$set(formData.main["C-MEETING-TOPIC-0021"], "value", 2);
      vueData.$set(formData.main["C-MEETING-TOPIC-0021"], "text", "已上报");
    } else {
      vueData.$set(formData.main["C-MEETING-TOPIC-0072"], "value", "-1");
      vueData.$set(formData.main["C-MEETING-TOPIC-0021"], "value", 1);
      vueData.$set(formData.main["C-MEETING-TOPIC-0021"], "text", "待通过");
    }
    if (formData.main["C-MEETING-TOPIC-0072"].value == "1") {
      formStruct.controls.forEach((ele) => {
        if (ele.metaId == "C-MEETING-TOPIC-0064") vueData.$set(ele, "show", 1);
        if (ele.metaId == "C-MEETING-TOPIC-0067") vueData.$set(ele, "show", 1);
        if (ele.metaId == "B0038") vueData.$set(ele, "show", 1);
      });
    } else {
      formStruct.controls.forEach((ele) => {
        if (ele.metaId == "C-MEETING-TOPIC-0064") vueData.$set(ele, "show", 0);
        if (ele.metaId == "C-MEETING-TOPIC-0067") vueData.$set(ele, "show", 0);
        if (ele.metaId == "B0038") vueData.$set(ele, "show", 0);
      });
    }

    if (formData.main["C-MEETING-TOPIC-0064"].value == "1") {
      formStruct.controls.forEach((ele) => {
        // 隐藏单位外
        if (ele.metaId == "C-MEETING-TOPIC-0065") vueData.$set(ele, "show", 0);
        if (ele.metaId == "C-MEETING-TOPIC-0066") vueData.$set(ele, "show", 0);
      });
    } else {
      formStruct.controls.forEach((ele) => {
        // 隐藏单位内
        if (ele.metaId == "C-MEETING-TOPIC-0004") vueData.$set(ele, "show", 0);
        if (ele.metaId == "C-MEETING-TOPIC-0003") vueData.$set(ele, "show", 0);
      });
    }

    // 监听议题来源联动
    vueData.$watch(
      function () {
        return vueData.formData.main["C-MEETING-TOPIC-0064"].value;
      },
      function (n, o) {
        console.log(n);
        if (n == "1") {
          formStruct.controls.forEach((ele) => {
            if (ele.metaId == "C-MEETING-TOPIC-0048")
              vueData.$set(ele, "show", 1);
            if (ele.metaId == "C-MEETING-TOPIC-0008")
              vueData.$set(ele, "show", 1);
            if (ele.metaId == "C-MEETING-TOPIC-0051")
              vueData.$set(ele, "show", 1);
            if (ele.metaId == "C-MEETING-TOPIC-0044")
              vueData.$set(ele, "show", 1);
          });
        } else {
          formStruct.controls.forEach((ele) => {
            if (ele.metaId == "C-MEETING-TOPIC-0048")
              vueData.$set(ele, "show", 0);
            if (ele.metaId == "C-MEETING-TOPIC-0008")
              vueData.$set(ele, "show", 0);
            if (ele.metaId == "C-MEETING-TOPIC-0051")
              vueData.$set(ele, "show", 0);
            if (ele.metaId == "C-MEETING-TOPIC-0044")
              vueData.$set(ele, "show", 0);
          });
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    formStruct.controls.forEach((ele) => {
      if (ele.metaId == "B0019") {
        vueData.$set(ele, "show", 0);
      }
    });

    let flag = false;
    for (let key in formData.opinion) {
      if (formData.opinion[key][0].opinionContent.length > 0) {
        flag = true;
      }
    }

    // 拟稿、编辑节点隐藏审批意见
    if (
      formStruct.parameters.nodeId == 0 ||
      formStruct.parameters.nodeId == "-2"
    ) {
      formStruct.controls.forEach((ele) => {
        if (ele.label == "审批意见") {
          vueData.$set(ele, "show", 0);
        }
      });
    }
    // 查看节点无意见隐藏审批意见
    if (
      (formStruct.parameters.nodeId == "-7" ||
        formStruct.parameters.nodeId == "-1"||formStruct.parameters.nodeId == "17") &&
      !flag
    ) {
      formStruct.controls.forEach((ele) => {
        if (ele.label == "审批意见") {
          vueData.$set(ele, "show", 0);
        }
      });
    }

    console.log(new Date());
    //如果是已废弃的单子删除所有的按钮
    if (formData.main["C-MEETING-TOPIC-0021"].value == "-1") {
      formStruct.buttons = {
        commonButtons: [],
        mainButtons: [],
      };
      vueData.$set(vueData.formButtons, "commonButtons", []);
      vueData.$set(vueData.formButtons, "mainButtons", []);
    }

    if (vueData.$route.query.hylx) {
      vueData.$set(
        formData.main["C-MEETING-TOPIC-0042"],
        "value",
        vueData.$route.query.hylx
      );
      vueData.$set(
        formData.main["C-MEETING-TOPIC-0042"],
        "text",
        vueData.$route.query.hylxText
      );
      formStruct.controls.forEach((element) => {
        if (element.metaId == "C-MEETING-TOPIC-0042") {
          vueData.$set(element.privilege, "editable", false);
        }
      });
    }
    if (vueData.$route.query.masterId) {
      vueData.$set(
        formData.main["B0035"],
        "value",
        vueData.$route.query.masterId
      );
    }
    if (vueData.$route.query.sfzx) {
      vueData.$set(formData.main["C-MEETING-TOPIC-0043"], "value", 1);
      vueData.$set(formData.main["C-MEETING-TOPIC-0043"], "text", "是");
    }

    vueData.$bus.on("checkVal", function (data) {
      console.log(data);
      if (data.metaData.metaId == "C-MEETING-TOPIC-0042") {
        dsf.http
          .post("/fn/meetingType/getMeetingType", {
            meetingTypeId: data.value,
          })
          .then((res) => {
            if (res.data.code == 200 && res.data.data) {
              let data = res.data.data;
              vueData.$set(formData.main, "C-MEETING-TOPIC-0008", {
                value: data.chbm,
                text: data.chbmText,
                schema: data.chbmSchema,
              }); //参会部门
            }
          });
      }
      if (data.metaData.metaId == "C-MEETING-TOPIC-0048") {
        dsf.http
          .post("/fn/meetingTopicType/getTopicTypes", {
            pks: data.value,
          })
          .then((res) => {
            if (res.data.code == 200 && res.data.data) {
              let data = res.data.data;
              let val = "";
              let text = "";
              let schema = "";
              data.forEach((ele, i) => {
                i == 0
                  ? (val += ele.defaultDept)
                  : (val += "," + ele.defaultDept);
                i == 0
                  ? (text += ele.defaultDeptText)
                  : (text += "," + ele.defaultDeptText);
                i == 0
                  ? (schema += ele.defaultDeptSchema)
                  : (schema += "," + ele.defaultDeptSchema);
              });
              vueData.$set(formData.main, "C-MEETING-TOPIC-0008", {
                value: val,
                text: text,
                schema: schema,
              }); //参会部门
            }
          });
      }
    });
    // //汇报时长不能超过60
    // vueData.$bus.on("blurBus", function(busObj) {
    //   console.log(busObj);
    //   if (busObj.metaData.metaId == "C-MEETING-TOPIC-0006") {
    //     if (busObj.value > 60) {
    //       dsf.layer.toast(``);
    //         vueData.$set(
    //           formData.main,
    //           "C-MEETING-TOPIC-0006",
    //           { value: "" }
    //         );
    //     }
    //   }
    // });
  };

  exportObj.saveFilter = function (formData, formStruct, vueData, action) {
    return new Promise(function (resolve, reject) {
      if (formData.main["C-MEETING-TOPIC-0006"].value > 60) {
        reject("汇报时长不得超过60分钟,请重新填写");
      } else {
        console.log(formatMsToDate());
        vueData.$set(formData.main["B0019"], "value", formatMsToDate());
        resolve();
      }
    });
  };

  function formatMsToDate() {
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

  window.spJS = exportObj;
})();
