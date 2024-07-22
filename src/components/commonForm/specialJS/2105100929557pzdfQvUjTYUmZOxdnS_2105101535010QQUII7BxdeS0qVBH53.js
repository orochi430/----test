
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("blurBus", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-ERP-PAYCOST-SUB-0046" && !isNaN(Number(busObj.value))) {
      vueData.$set(formData.main, 'C-ERP-PAYCOST-SUB-0045', {value: dsf.util.amountWords(Number(busObj.value))})
    }
    if (busObj.metaData.metaId == "C-ERP-PAYCOST-SUB-0044" && !isNaN(Number(busObj.value))) {
      vueData.$set(formData.main, 'C-ERP-PAYCOST-SUB-0023', {value: dsf.util.amountWords(Number(busObj.value))})
    }
  });
}
export default exportObj;