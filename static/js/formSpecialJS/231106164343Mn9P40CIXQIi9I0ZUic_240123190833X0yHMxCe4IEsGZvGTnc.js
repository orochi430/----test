// 克拉玛依 探亲费用报销单
(function () {
  const exportObj = {};
  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$bus.on("inpBus", function (busObj) {
      console.log(busObj);
      if (["C-ERP-CLFBX-SUB-0021", "C-ERP-CLFBX-0022"].includes(busObj.metaData.metaId)) {
        calcAmount(busObj)
      }
    })
    vueData.$bus.on("subFormDelete", function (busObj) {
      calcAmount(busObj)
    })
    function calcAmount(busObj) {
      let totalAmount = 0
      if (formData.multinfos["231108190827kwTDnVDNBDxQPwaZEcM"].rows) {
        formData.multinfos["231108190827kwTDnVDNBDxQPwaZEcM"].rows.forEach(item => {
          totalAmount += Number(item["C-ERP-CLFBX-SUB-0021"].value)
        });
      }

      totalAmount += Number(formData.main["C-ERP-CLFBX-0022"].value)
      vueData.$set(formData.main, "C-ERP-CLFBX-0032", { value: totalAmount })
    }
  };

  window.spJS = exportObj;
})();
