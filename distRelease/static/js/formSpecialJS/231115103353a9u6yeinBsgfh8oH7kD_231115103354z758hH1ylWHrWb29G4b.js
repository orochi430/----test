// 市国动办（内部请示）--领导批示顺序设置
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    // 流转设置范围生成和更新接口地址
    vueData.flowRangeUrl = {
      generateFlowRangeUrl: "ctrl/gdbExternalDoc/generateFlowRange",
      updateFlowRangeUrl: "ctrl/gdbExternalDoc/updateFlowRange",
      initControl: "C-PROCESS-COMMON-FIELD-0001"
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
  };

  exportObj.initDataAfter = function (formData, formStruct, vueData) {
    formStruct.buttons.mainButtons = formStruct.buttons.mainButtons.filter(
      (btn) => btn.action != "xform.processNodeSendRange"
    ); // 隐藏流转设置按钮
  };
  window.spJS = exportObj;
})();
