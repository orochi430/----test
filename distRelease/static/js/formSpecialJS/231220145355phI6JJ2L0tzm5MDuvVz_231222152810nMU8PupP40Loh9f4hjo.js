// 陕西一体化 设备报修任务单（移动）
(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    function setTotal() {
      let subFormRows = formData.multinfos["231220163229dVo4tSKVvA2wRogRvIb"].rows
      let total = 0
      subFormRows.forEach((item) => total += Number(item["C-ASSET-REPAIR-RECORD-0004"].value))
      console.log(total);
      return total
    }
    vueData.$bus.on("blurBus", function (busObj) {
      if (busObj.subFormId == "231220163229dVo4tSKVvA2wRogRvIb" && (busObj.metaData.metaId == "B0014" || busObj.metaData.metaId == "C-ASSET-REPAIR-RECORD-0003")) {
        let subFormRows = formData.multinfos["231220163229dVo4tSKVvA2wRogRvIb"].rows
        let num = subFormRows[busObj.subFormIndex]["B0014"].value
        let price = subFormRows[busObj.subFormIndex]["C-ASSET-REPAIR-RECORD-0003"].value
        if (num && price) {
          vueData.$set(subFormRows[busObj.subFormIndex]["C-ASSET-REPAIR-RECORD-0004"], "value", Number(num) * Number(price))
          vueData.$set(formData.main["B0060"], "value", setTotal())
        }
      } else if (busObj.metaData.metaId == "C-ASSET-REPAIR-RECORD-0004") {
        vueData.$set(formData.main["B0060"], "value", setTotal())
      }
    })
    vueData.$bus.on("subFormDelete", function (busObj) {
      if (busObj.subFormId == "231220163229dVo4tSKVvA2wRogRvIb") {
        vueData.$set(formData.main["B0060"], "value", setTotal())
      }
    })
  }
  window.spJS = exportObj
})();
