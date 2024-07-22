// 请假审批
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log("请假审批")
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  console.log(vueData.formData)
  vueData.$bus.on("selectDateTime", function(busObj){
    if(busObj.metaData.metaId=="C-LEAVE-0003"||busObj.metaData.metaId=="C-LEAVE-0002"){
      if(vueData.formData.main["C-LEAVE-0003"].value&&vueData.formData.main["C-LEAVE-0002"].value){
        let start=filterTime(formData.main["C-LEAVE-0002"].value)
        let end=filterTime(formData.main["C-LEAVE-0003"].value)
        console.log(start,end)
        let utc=end-start;
        console.log(utc)
        let dayTimes=Math.floor(utc/(24*60*60*1000))+1
        console.log(dayTimes)
        if(dayTimes>0){
          vueData.$set(vueData.formData.main,"C-LEAVE-0006",{value:dayTimes})
        }else{
          vueData.$set(vueData.formData.main,"C-LEAVE-0006",{value:""})
          vueData.$set(vueData.formData.main,"C-LEAVE-0003",{value:""})
          vueData.$set(vueData.formData.main,"C-LEAVE-0002",{value:""})
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
      let endTime=filterTime(formData.main["C-LEAVE-0003"].value)//休假结束时间
      let startTime=filterTime(formData.main["C-LEAVE-0002"].value)//休假开始时间
      if(startTime>endTime){
        reject("休假结束时间不能早于休假开始时间")
      }else{
        resolve()
      }
    }else{
      resolve()
    }
  })
}
export default exportObj;