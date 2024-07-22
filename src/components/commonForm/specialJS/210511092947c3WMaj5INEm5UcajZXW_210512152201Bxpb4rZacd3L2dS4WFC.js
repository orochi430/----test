
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("blurBus", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-ERP-CW-ZJSQ-0002" && !isNaN(Number(busObj.value))) {
      vueData.$set(formData.main, 'C-ERP-CW-ZJSQ-0001', {value: dsf.util.amountWords(Number(busObj.value))})
    }
  });
}
export default exportObj;