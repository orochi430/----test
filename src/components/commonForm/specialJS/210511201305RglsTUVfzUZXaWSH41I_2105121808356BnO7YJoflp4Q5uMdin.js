// 贵州党校 请假审批
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
// 四川请假
exportObj.initHandle = function (formData, formStruct, vueData) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  let dayTimes = 1
  let leaveStart = formData.main["C-LEAVE-0035"].value == 1 ? 1 : 0.5
  let leaveEnd = formData.main["C-LEAVE-0028"].value == 1 ? 0.5 : 1
  let total = 0
  vueData.$bus.on("selectDateTime", function(busObj){
    if(busObj.metaData.metaId=="C-LEAVE-0003"||busObj.metaData.metaId=="C-LEAVE-0002"){
      if(vueData.formData.main["C-LEAVE-0003"].value&&vueData.formData.main["C-LEAVE-0002"].value){
        let start=filterTime(formData.main["C-LEAVE-0002"].value)
        let end=filterTime(formData.main["C-LEAVE-0003"].value)
        let utc=end-start;
        dayTimes=Math.floor(utc/(24*60*60*1000))+1
        if(dayTimes>0){
          total = leaveStart + leaveEnd + dayTimes-2
          vueData.$set(vueData.formData.main,"C-LEAVE-0006",{value:total})
        }else{
          vueData.$set(vueData.formData.main,"C-LEAVE-0006",{value:""})
          vueData.$set(vueData.formData.main,"C-LEAVE-0003",{value:""})
          vueData.$set(vueData.formData.main,"C-LEAVE-0002",{value:""})
          dsf.layer.toast("结束时间必须晚于开始时间")
        }
      }
    }
  })
  vueData.$bus.on("checkVal", function(busObj){
    let flag = vueData.formData.main["C-LEAVE-0003"].value&&vueData.formData.main["C-LEAVE-0002"].value ? 1 : 0
    if(busObj.metaData.metaId=="C-LEAVE-0035") {
      leaveStart = busObj.value == 1 ? 1 : 0.5
      total = leaveStart + leaveEnd + dayTimes-2
      flag ? vueData.$set(vueData.formData.main,"C-LEAVE-0006",{value:total}) : ""
    } else if(busObj.metaData.metaId=="C-LEAVE-0028") {
      leaveEnd = busObj.value == 1 ? 0.5 : 1
      total = leaveStart + leaveEnd + dayTimes-2
      flag ? vueData.$set(vueData.formData.main,"C-LEAVE-0006",{value:total}) : ""
    }
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