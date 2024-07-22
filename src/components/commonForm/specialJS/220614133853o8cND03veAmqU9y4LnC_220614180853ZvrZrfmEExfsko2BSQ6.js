// 中共徐州党校 食材入库
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  function sumNumber (subFormId) {
    let total = 0
    vueData.formData.multinfos[subFormId].rows.forEach(item => {
      total += Number(item["C-QT-CUSTOM-0018"].value)
    })
    vueData.$set(vueData.formData.main["C-MHQBZ-001"], "value", String(total))
  }
  vueData.$bus.on("blurBus", function(busObj) {
    if (busObj.subFormId == '220614160150qqhyFkG6xYKuasVD9bP') {
      let subFormMain = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex]
      if (busObj.metaData.metaId == "C-QT-CUSTOM-0001" || busObj.metaData.metaId == "C-QT-CUSTOM-0010") {
        let num = !isNaN(Number(subFormMain['C-QT-CUSTOM-0001'].value)) ? subFormMain['C-QT-CUSTOM-0001'].value : 0
        let unit = !isNaN(Number(subFormMain['C-QT-CUSTOM-0010'].value)) ? subFormMain['C-QT-CUSTOM-0010'].value : 0
        let subtotal = num * unit
        vueData.$set(subFormMain, 'C-QT-CUSTOM-0018', {value: subtotal})
        sumNumber(busObj.subFormId)
      }
      if(busObj.metaData.metaId == "C-QT-CUSTOM-0001"){
        subFormMain["C-QT-CUSTOM-0003"] = subFormMain["C-QT-CUSTOM-0001"]
      }
    }
	})
  vueData.$bus.on("subFormDelete",function(busObj){
       sumNumber(busObj.subFormId)
  })
}

export default exportObj;
