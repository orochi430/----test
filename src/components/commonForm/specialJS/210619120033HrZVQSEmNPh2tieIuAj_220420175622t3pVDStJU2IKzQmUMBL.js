const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  if (formData.main['220419174347xqmTU0PUIWQINUqVkRu']) {
    vueData.currentOpintion = formData.main['220419174347xqmTU0PUIWQINUqVkRu'].value
  }
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  vueData.$set(formData.main, '220419174347xqmTU0PUIWQINUqVkRu', {value: ''})
  return new Promise(function (resolve, reject) {
    resolve()
  })
}
export default exportObj;
