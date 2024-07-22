
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("blurBus", function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "C-QT-CUSTOM-0018" && !isNaN(Number(busObj.value))) {
      vueData.$set(formData.main, 'C-QT-CUSTOM-0009', {value: dsf.util.amountWords(Number(busObj.value))})
    }
  });
}
export default exportObj;