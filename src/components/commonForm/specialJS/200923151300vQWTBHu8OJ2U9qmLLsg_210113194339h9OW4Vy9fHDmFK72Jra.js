//浙江来访等级表单特殊JS
const exportObj = {};
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  return new Promise(function(resolve,reject){
    if(action=="save"||action=="send"){
      let endTime=filterTime(formData.main["220516143014ALVtfdJ7wL8F2NqUheF"].value)//结束时间
      let startTime=filterTime(formData.main["C-OUTMANAGE-0001"].value)//开始时间
      var num = (endTime - startTime)/(1000 * 60 * 60 * 24);
      if(num>7){
        reject("结束时间需大于开始时间但不得超过来访开始时间7天")
      }else{
        resolve()
      }
    }else{
      resolve()
    }
  })
}
export default exportObj;
