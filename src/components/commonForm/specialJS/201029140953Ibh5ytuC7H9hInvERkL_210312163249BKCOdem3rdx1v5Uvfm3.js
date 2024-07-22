const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  if (formData.main['220419174716GpunjJshvTyjfPWD3kp']) {
    vueData.currentOpintion = formData.main['220419174716GpunjJshvTyjfPWD3kp'].value
  }
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  vueData.$set(formData.main, '220419174716GpunjJshvTyjfPWD3kp', {value: ''})
  return new Promise(function (resolve, reject) {
    resolve()
  })
}
export default exportObj;
