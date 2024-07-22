
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("blurBus", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "OA-BXAPPLY-0029" && !isNaN(Number(busObj.value))) {
      vueData.$set(formData.main, 'OA-BXAPPLY-0025', {value: dsf.util.amountWords(Number(busObj.value))})
    }
    if (busObj.metaData.metaId == "OA-BXAPPLY-0030" && !isNaN(Number(busObj.value))) {
      vueData.$set(formData.main, 'OA-BXAPPLY-0022', {value: dsf.util.amountWords(Number(busObj.value))})
    }
  });
}
export default exportObj;