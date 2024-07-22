// 市国动办（发文）--审签人顺序设置
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    // 流转设置范围生成和更新接口地址-------bug1076
    vueData.flowRangeUrl = {
      generateFlowRangeUrl: "ctrl/gdbExternalDoc/generateFlowRangeOnlyName",
      updateFlowRangeUrl: "ctrl/gdbExternalDoc/updateFwFlowRange",
      initControl: "C-PROCESS-COMMON-FIELD-0001",
    };

    let lzsz = formStruct.buttons.mainButtons.find(
      (btn) => btn.action == "xform.processNodeSendRange"
    );
    if (lzsz && lzsz.parameters) {
      lzsz.parameters.forEach((obj) => {
        vueData.nowButtonParameters[obj.key] = obj.value;
      });
    }
    formStruct.buttons.mainButtons = formStruct.buttons.mainButtons.filter(
      (btn) => btn.action != "xform.processNodeSendRange"
    ); // 隐藏流转设置按钮

    vueData.$bus.on("clickBus", function (busObj) {
      if (busObj.metaData.metaId == "C-PROCESS-COMMON-FIELD-0001") {
        // vueData.ShowAddLeaderReview = true;
        busObj.controlData.readonly = true;
        vueData.handleActionClick("xform.processNodeSendRange");
      }
    });

    // 根据对应的稿纸类型隐藏对应的字段--------bug1093
    let pageType = formData.main["231116200841QmzPDsN4wEYZocDzmuz"].value;
    pageTypeHideControl(formData, formStruct, vueData, pageType);
    vueData.$bus.on("checkVal", function (busObj) {
      if (busObj.metaData.metaId == "231116200841QmzPDsN4wEYZocDzmuz") {
        pageTypeHideControl(formData, formStruct, vueData, busObj.value);
      }
    });

    // 公开选项范围值需要根据所有的信息公开联动显示--------bug1094
    let zbInfoOpen = ""; //主办-信息公开
    let fgInfoOpen = ""; //法规-信息公开
    let gkCodeKeys = "231116172152iu7Vk8akLkPwDJN6YVm";
    let bgkCodeKeys = "231116172227k2R32DQaseg2YWL5cI4";

    vueData.$bus.on("inputRadio", function (data) {
      if (data.metaData.metaId == "B0015") zbInfoOpen = data.value;
      if (data.metaData.metaId == "C-FW-0042") fgInfoOpen = data.value;
    });
    vueData.$bus.on("getUser", function (data) {
      console.log(data);
      let url = data.metaData.extra.tabs[0].action;
      let newCodeUrl = url;
      if (data.metaData.metaId == "231116123736LfZxGVcL1TlCwHriR4W") {
        newCodeUrl =
          zbInfoOpen == 3
            ? replaceQueryString(url, "codeKeys", bgkCodeKeys)
            : replaceQueryString(url, "codeKeys", gkCodeKeys);
      } else if (data.metaData.metaId == "231116123849xDGKBWCAEDl5l7IJsu2") {
        newCodeUrl =
          fgInfoOpen == 3
            ? replaceQueryString(url, "codeKeys", bgkCodeKeys)
            : replaceQueryString(url, "codeKeys", gkCodeKeys);
      }
      vueData.$bus.emit("codeChange", {
        url: newCodeUrl,
        data: data,
      });
    });

    // 信息公开的切换，对应的公开选项应置空重新选择--------bug1096
    vueData.$bus.on("changeRadio", function (data) {
      if (data.metaData.metaId == "B0015") {
        formData.main["231116123736LfZxGVcL1TlCwHriR4W"] = {
          text: "",
          value: "",
        };
      }
      if (data.metaData.metaId == "C-FW-0042") {
        formData.main["231116123849xDGKBWCAEDl5l7IJsu2"] = {
          text: "",
          value: "",
        };
      }
    });

    // 整理节点：发文字号是（沪国动、沪国动规）时，属性联动印发日期、失效日期、施行日期显示，其余隐藏--------bug1097
    function ruleHideControl(ruleid) {
      if (formStruct.parameters.nodeId == "Nr7NmqpN9QQbNnc") {
        formStruct.controls.forEach((item) => {
          if (["B0022", "B0021", "B0019"].includes(item.metaId)) {
            if (
              [
                "231116195740dkkQCBz0pzSjcISvDMq",
                "231116195756fsKW9SCfFfAtA6xIlh1",
              ].includes(ruleid)
            ) {
              vueData.$set(item, "show", 1);
            } else {
              vueData.$set(item, "show", 0);
            }
          }
        });
      }
    }
    ruleHideControl(formData.main["B0003"].ruleid);
    vueData.$bus.on("changeRuleCode", function (data) {
      console.log(data);
      ruleHideControl(data.value.id);
    });
  };
  function pageTypeHideControl(formData, formStruct, vueData, pageType) {
    let controlId = [
      "9DAiSWp2TybMzDos",
      "YLm2j6ETr1E164lL",
      "YdKDZFJxSFwSBBlb",
      "JiHQHFScMu2HnIyq",
      "j0QM6o1phJ3WfGXQ",
      "oo8ua8DtFN6RqOuf",
      "oU2X8wpfJgNlfWXd",
      "ZJ69k7ALOsviqUJ0",
      "gJvBlSLSkIy33Qig",
      "dbdN29K72llFAt7M",
      "d6ocJrZoyJHxrc8i",
      "oG24Oo8cLEvPfgfe",
      "uzz3Ee15rx2yJr1f",
      "gZXFIeC4wPwci4ne",
      "Zm242tp6tuKjtXE6",
      "2W8BdAPVGhn4YRe6",
      "6R2SQ1ivuEKjNjux",
    ];
    if (["5", "6", "7", "8", "9", "11", "12"].includes(pageType)) {
      // 隐藏主办处室意见、法规处意见、信息公开、主题、体裁、行政规范性文件、指导性文件、政策文件
      formStruct.controls.forEach((item) => {
        if (controlId.includes(item.controlId)) {
          vueData.$set(item, "show", 0);
        }
      });
    } else {
      formStruct.controls.forEach((item) => {
        if (controlId.includes(item.controlId)) {
          if (
            (formData.main["231116124809uh6S0kNSVFAM6dUTjZr"].value == "" &&
              item.controlId == "dbdN29K72llFAt7M") ||
            (formData.main["231116125845oULomFUW68mYj4Fo0jQ"].value == "" &&
              item.controlId == "gZXFIeC4wPwci4ne") ||
            (formData.main["231116130717b0zZ5rsqvbMF88EYcqw"].value == "" &&
              item.controlId == "6R2SQ1ivuEKjNjux")
          ) {
            // 行政规范性文件-有效期、政策文件-有效期、指导性技术文件编号————联动处理
            vueData.$set(item, "show", 0);
          } else {
            vueData.$set(item, "show", 1);
          }
        }
      });
    }
  }
  /**
   * 替换url的指定参数
   * @param {*} url 需要替换的url
   * @param {*} name 参数名称
   * @param {*} value 替换的值
   */
  function replaceQueryString(url, name, value) {
    const re = new RegExp(name + "=[^&]*", "gi");
    return url.replace(re, name + "=" + value);
  }

  exportObj.initDataAfter = function (formData, formStruct, vueData) {
    formStruct.buttons.mainButtons = formStruct.buttons.mainButtons.filter(
      (btn) => btn.action != "xform.processNodeSendRange"
    ); // 隐藏流转设置按钮
    let pageType = formData.main["231116200841QmzPDsN4wEYZocDzmuz"].value;
    pageTypeHideControl(formData, formStruct, vueData, pageType);
  };
  window.spJS = exportObj;
})();
