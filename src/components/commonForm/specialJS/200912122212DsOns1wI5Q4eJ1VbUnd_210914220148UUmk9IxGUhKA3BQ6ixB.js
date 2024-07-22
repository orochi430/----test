const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  let checkedSubItems = []
  vueData.$bus.on("subFormSelect", function(busObj) {
    console.log(busObj)
    if (busObj.subFormId == '200912131453ppqrs2DIAXiwfYkisGv') {
      checkedSubItems.push(...busObj.checkItems)
    }
	})
  vueData.$bus.on("blurBus", function(busObj) {
    console.log(busObj)
    if (busObj.subFormId == '200912131453ppqrs2DIAXiwfYkisGv') {
      if (busObj.metaData.metaId == "C-OFFICE-SUPPLIE-SUB-0010") { // 
        let subFormMain = formData.multinfos[busObj.subFormId].rows[busObj.subFormIndex]
        if (Number(busObj.value) > Number(checkedSubItems[busObj.subFormIndex].dataValue.YSSY)) {
          dsf.layer.toast('领用数量不能大于剩余数量' + checkedSubItems[busObj.subFormIndex].dataValue.YSSY)
          vueData.$set(subFormMain, 'C-OFFICE-SUPPLIE-SUB-0010', {value: ''})
        }
      } 
    }
	})
  vueData.$bus.on("subFormDelete", function (busObj) {
    if (busObj.subFormId == '200912131453ppqrs2DIAXiwfYkisGv') {
      checkedSubItems.splice(busObj.subFormIndex, 1)
    }
  })
}

export default exportObj;
