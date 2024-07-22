// 大事务 合同模块
const exportObj = {};

exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function(resolve, reject) {
    if(formStruct.parameters.nodeId == "Kr5HXFcOIM8yFil") {
      // let flowInfo = JSON.parse(formStruct.controls.find(item => item.metaId == "controlOpinionTagView").extra.opinionContentTag)
      let flowInfo = JSON.parse(formData.flowinfo[`flow-${formStruct.parameters.pk}-${formStruct.parameters.pId || '0'}-${formStruct.parameters.pnId || formStruct.parameters.pk}`].opinionContentTag)
      let tagCount = 0
      let tagCountCwc = 0
      flowInfo.forEach( item => {
        if(item.type == "2" || item.type == "4") { tagCount++ }
        if(item.type == "1") { tagCountCwc++ }
      })
      tagCount >= 2 ? formData.main["C-ERP-HTGL-014"].value = tagCount : formData.main["C-ERP-HTGL-014"].value = tagCountCwc
    }
    resolve()
  })
}
export default exportObj;