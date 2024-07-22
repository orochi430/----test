const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  if (formData.main['C-FW-0022'].text.indexOf('局') > -1) {
    formStruct.controls.find(item => item.metaId == 'C-FW-0037').label = '政府信息公开属性'
  } else {
    formStruct.controls.find(item => item.metaId == 'C-FW-0037').label = '民主公开属性'
  }
}
export default exportObj;
