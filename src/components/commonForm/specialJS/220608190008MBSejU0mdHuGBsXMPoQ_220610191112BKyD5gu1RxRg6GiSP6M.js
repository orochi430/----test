const exportObj = {};

exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  return new Promise(function(resolve,reject){
    resolve()
  })
}
exportObj.InputOpinion = function (formData, formStruct, vueData) {
  if (vueData.nowButtonParameters.param1 == 1) {
    formStruct.controls.find(item => item.controlType == 'controlEditOpinion').extra.opinionContent = '同意'
    vueData.btnAction('Flow.pass')
  } else if (vueData.nowButtonParameters.param1 == -1) {
    formStruct.controls.find(item => item.controlType == 'controlEditOpinion').extra.opinionContent = '不同意'
    vueData.btnAction('Flow.refuse')
  }
}
export default exportObj;
