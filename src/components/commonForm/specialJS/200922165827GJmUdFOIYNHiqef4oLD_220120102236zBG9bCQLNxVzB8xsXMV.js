const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  let checkedSubItems = []
  vueData.$bus.on("subFormSelect", function(busObj) {
    console.log(busObj)
    if (busObj.subFormId == '200922173531WbvnfheRjdipEzgLml1') {
      checkedSubItems.push(...busObj.checkItems)
    }
	})
  vueData.$bus.on("blurBus", function(busObj) {
    console.log(busObj)
    if (busObj.subFormId == '200922173531WbvnfheRjdipEzgLml1') {
      if (busObj.metaData.metaId == "200922173121M2OXLMbtGDz5k9cOeyD") { // 
        let subFormMain = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex]
        if (Number(busObj.value) > Number(checkedSubItems[busObj.subFormIndex].dataValue.KCSL)) {
          dsf.layer.toast('数量不能大于库存数量' + checkedSubItems[busObj.subFormIndex].dataValue.KCSL)
          vueData.$set(subFormMain, '200922173121M2OXLMbtGDz5k9cOeyD', {value: ''})
        }
      } 
    }
	})
  vueData.$bus.on("subFormDelete", function (busObj) {
    if (busObj.subFormId == '200922173531WbvnfheRjdipEzgLml1') {
      checkedSubItems.splice(busObj.subFormIndex, 1)
    }
  })
}

export default exportObj;
