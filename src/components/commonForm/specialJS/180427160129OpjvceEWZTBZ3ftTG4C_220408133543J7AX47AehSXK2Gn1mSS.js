const exportObj = {};
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  if(formData.main["S-USER-0007"].value) {
    vueData.$set(vueData.formData.main, "S-USER-0002", {value: formData.main["S-USER-0007"].value})
  }
  return new Promise(function(resolve,reject){
    resolve()
  })
}
exportObj.saveAfter=function(vueData,formData, formStruct){
  vueData.backSucces()
}
export default exportObj;
