// 陕西一体化 资产采购申请（移动）
(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    function setTotal() {
      let subFormRows = formData.multinfos["240105172518iDjNkymHpBaEN624FXx"].rows
      let total = 0
      subFormRows.forEach((item) => total += Number(item["C-FIXED-ASSETS-009"].value))
      console.log(total);
      return total
    }
    vueData.$bus.on("blurBus", function (busObj) {
      if (busObj.subFormId == "240105172518iDjNkymHpBaEN624FXx" && (busObj.metaData.metaId == "B0036" || busObj.metaData.metaId == "C-FIXED-ASSETS-005")) {
        let subFormRows = formData.multinfos["240105172518iDjNkymHpBaEN624FXx"].rows
        let num = subFormRows[busObj.subFormIndex]["B0036"].value
        let price = subFormRows[busObj.subFormIndex]["C-FIXED-ASSETS-005"].value
        if (num && price) {
          vueData.$set(subFormRows[busObj.subFormIndex]["C-FIXED-ASSETS-009"], "value", Number(num) * Number(price))
          vueData.$set(formData.main["B0060"], "value", setTotal())
        }
      } else if (busObj.metaData.metaId == "C-FIXED-ASSETS-009") {
        vueData.$set(formData.main["B0060"], "value", setTotal())
      }
    })
    vueData.$bus.on("subFormDelete", function (busObj) {
      if (busObj.subFormId == "240105172518iDjNkymHpBaEN624FXx") {
        vueData.$set(formData.main["B0060"], "value", setTotal())
      }
    })
  }
  window.spJS = exportObj
})();
