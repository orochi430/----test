// 出差审批
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log("出差审批")
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  console.log(vueData.formData)
  vueData.$bus.on("selectDateTime", function(busObj){
    if(busObj.metaData.metaId=="B0021"||busObj.metaData.metaId=="B0022"){
      if(vueData.formData.main["B0021"].value&&vueData.formData.main["B0022"].value){
        let start=filterTime(formData.main["B0021"].value)
        let end=filterTime(formData.main["B0022"].value)
        console.log(start,end)
        let utc=end-start;
        console.log(utc)
        let dayTimes=Math.floor(utc/(24*60*60*1000))+1
        console.log(dayTimes)
        if(dayTimes>0){
          vueData.$set(vueData.formData.main,"B0010",{value:dayTimes})
        }else {
          vueData.$set(vueData.formData.main,"B0022",{value:""})
          vueData.$set(vueData.formData.main,"B0010",{value:""})
          dsf.layer.toast("结束时间必须晚于开始时间")
        }
        
      }
    }
    console.log(busObj)
    console.log(vueData.formData)
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  return new Promise(function(resolve,reject){
    if(action=="save"||action=="send"){
      let endTime=filterTime(formData.main["B0022"].value)//休假结束时间
      let startTime=filterTime(formData.main["B0021"].value)//休假开始时间
      if(startTime>endTime){
        reject("结束时间不能早于开始时间")
      }else{
        resolve()
      }
    }else{
      resolve()
    }
  })
}
export default exportObj;