// 出差审批
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  return new Promise(function(resolve,reject){
    let endTime=filterTime(formData.main["C-OUTMANAGE-0001"].value)
    let startTime=filterTime(formData.main["C-OUTMANAGE-0002"].value)
    if(endTime>startTime){
      reject("结束时间不能早于开始时间")
    }
    resolve()
  })
}
export default exportObj;