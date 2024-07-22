// 克拉玛依 付款审批单
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("inpBus", function (busObj) {
      if (busObj.metaData.metaId == "C-ERP-PAYCOST-0002") {
        vueData.$set(formData.main, "C-ERP-PAYCOST-0001", { value: dsf.util.amountWords(busObj.value) })
      }
    })
  };
  window.spJS = exportObj;
})();
