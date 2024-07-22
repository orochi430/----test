// 陕西一体化 资产采购申请（移动）
(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    function setTotal() {
      let subFormRows = formData.multinfos["24010214514083lcre17F8AcEdQRtYH"].rows
      let total = 0
      subFormRows.forEach((item) => total += Number(item["C-ERP-PURCHASE-0001"].value))
      console.log(total);
      return total
    }
    vueData.$bus.on("blurBus", function (busObj) {
      if (busObj.subFormId == "24010214514083lcre17F8AcEdQRtYH" && (busObj.metaData.metaId == "C-ERP-PURCHASE-0004" || busObj.metaData.metaId == "C-ERP-PURCHASE-0003")) {
        let subFormRows = formData.multinfos["24010214514083lcre17F8AcEdQRtYH"].rows
        let num = subFormRows[busObj.subFormIndex]["C-ERP-PURCHASE-0004"].value
        let price = subFormRows[busObj.subFormIndex]["C-ERP-PURCHASE-0003"].value
        if (num && price) {
          vueData.$set(subFormRows[busObj.subFormIndex]["C-ERP-PURCHASE-0001"], "value", Number(num) * Number(price))
          vueData.$set(formData.main["B0060"], "value", setTotal())
        }
      } else if (busObj.metaData.metaId == "C-ERP-PURCHASE-0001") {
        vueData.$set(formData.main["B0060"], "value", setTotal())
      }
    })
    vueData.$bus.on("subFormDelete", function (busObj) {
      if (busObj.subFormId == "24010214514083lcre17F8AcEdQRtYH") {
        vueData.$set(formData.main["B0060"], "value", setTotal())
      }
    })
  }
  window.spJS = exportObj
})();
