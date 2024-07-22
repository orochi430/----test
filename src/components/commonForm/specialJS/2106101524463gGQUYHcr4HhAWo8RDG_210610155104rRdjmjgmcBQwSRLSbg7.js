
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("blurBus", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-QJSCCSQ-0013" && !isNaN(Number(busObj.value))) {
      vueData.$set(formData.main, 'C-QJSCCSQ-0014', {value: dsf.util.amountWords(Number(busObj.value))})
    }
  });
}
export default exportObj;