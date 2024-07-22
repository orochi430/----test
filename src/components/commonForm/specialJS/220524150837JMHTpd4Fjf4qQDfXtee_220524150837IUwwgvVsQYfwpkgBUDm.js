// 出差审批
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
function filterTime(time){
  var str=time.replace(/-/g,"/")
  return Date.parse(str)
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("selectDateTime", function(busObj){
    if(busObj.metaData.metaId=="B0021"||busObj.metaData.metaId=="B0022"){
      if(vueData.formData.main["B0021"].value&&vueData.formData.main["B0022"].value){
        let start=filterTime(formData.main["B0021"].value)
        let end=filterTime(formData.main["B0022"].value)
        console.log(start,end)
        let utc=end-start;
        let dayTimes=Math.floor(utc/(24*60*60*1000))+1
        if(dayTimes>0){
          vueData.$set(vueData.formData.main,"B0010",{value:dayTimes})
        }else{
          vueData.$set(vueData.formData.main,"B0021",{value:""})
          vueData.$set(vueData.formData.main,"B0022",{value:""})
          vueData.$set(vueData.formData.main,"B0010",{value:"0"})
          dsf.layer.toast("结束时间必须大于开始时间")
        }
        
      }
    }
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  return new Promise(function(resolve,reject){
    if(action=="save"||action=="send"){
      let endTime=filterTime(formData.main["B0021"].value)
      let startTime=filterTime(formData.main["B0022"].value)
      if(startTime>endTime){
        reject("结束时间必须大于开始时间")
      }else{
        resolve()
      }
    }else{
      resolve()
    }
  })
}
export default exportObj;