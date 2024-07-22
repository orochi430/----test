const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  if (formData.main['220419183753ZMGHSEDoLznQbpYpFfN']) {
    vueData.currentOpintion = formData.main['220419183753ZMGHSEDoLznQbpYpFfN'].value
  }
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  vueData.$set(formData.main, '220419183753ZMGHSEDoLznQbpYpFfN', {value: ''})
  return new Promise(function (resolve, reject) {
    resolve()
  })
}
export default exportObj;
