
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log("会议反馈")
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  return new Promise(function(resolve,reject){
    resolve()
  })
}
//保存后事件
exportObj.saveAfter=function(vueData,formData, formStruct ){
  console.log('sssssssssss')
  dsf.http.post('fn/qfhy/updNotifyFeedback', {
    pk: vueData.formData.main.A0001.value,
    type: 1
  }).then(res => {
    vueData.backSucces();
  })
}
export default exportObj;
