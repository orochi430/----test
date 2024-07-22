const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  if (formData.main['220419174920tCE6NgMGJpcxoi2a0CA']) {
    vueData.currentOpintion = formData.main['220419174920tCE6NgMGJpcxoi2a0CA'].value
  }
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  vueData.$set(formData.main, '220419174920tCE6NgMGJpcxoi2a0CA', {value: ''})
  return new Promise(function (resolve, reject) {
    resolve()
  })
}
export default exportObj;
