// 陕西一体化 采购申请（办公厅移动）
(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    function setTotal() {
      let subFormRows = formData.multinfos["240109185355msf7sJCCRHYR4yGHenq"].rows
      let total = 0
      subFormRows.forEach((item) => total += Number(item["B0011"].value))
      console.log(total);
      return total
    }
    vueData.$bus.on("blurBus", function (busObj) {
      if (busObj.subFormId == "240109185355msf7sJCCRHYR4yGHenq" && (busObj.metaData.metaId == "B0009" || busObj.metaData.metaId == "B0025")) {
        let subFormRows = formData.multinfos["240109185355msf7sJCCRHYR4yGHenq"].rows
        let num = subFormRows[busObj.subFormIndex]["B0009"].value
        let price = subFormRows[busObj.subFormIndex]["B0025"].value
        if (num && price) {
          vueData.$set(subFormRows[busObj.subFormIndex]["B0011"], "value", Number(num) * Number(price))
          vueData.$set(formData.main["B0014"], "value", setTotal())
        }
      } else if (busObj.metaData.metaId == "B0011") {
        vueData.$set(formData.main["B0014"], "value", setTotal())
      }
    })
    vueData.$bus.on("subFormDelete", function (busObj) {
      if (busObj.subFormId == "240109185355msf7sJCCRHYR4yGHenq") {
        vueData.$set(formData.main["B0014"], "value", setTotal())
      }
    })
  }
  window.spJS = exportObj
})();
