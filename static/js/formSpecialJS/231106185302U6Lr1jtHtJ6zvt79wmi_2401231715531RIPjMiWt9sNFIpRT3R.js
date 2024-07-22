// 克拉玛依 公务交通费报销审批单
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("inpBus", function (busObj) {
      if (busObj.metaData.metaId == "C-ERP-PURCHASE-0001") {
        calcAmount(busObj)
      }
    })
    vueData.$bus.on("subFormDelete", function (busObj) {
      calcAmount(busObj)
    })
    function calcAmount(busObj) {
      let totalAmount = 0
      formData.multinfos[busObj.subFormId].rows.forEach(item => {
        totalAmount += Number(item["C-ERP-PURCHASE-0001"].value)
      });
      vueData.$set(formData.main, "OA-BXAPPLY-0007", { value: totalAmount })
    }
  };

  window.spJS = exportObj;
})();
