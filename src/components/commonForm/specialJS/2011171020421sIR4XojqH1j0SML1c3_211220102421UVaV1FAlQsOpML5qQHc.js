// 西藏请假审批
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  vueData.$bus.on("checkVal",function(busObj) {
    console.log(busObj);
    if(busObj.metaData.metaId == "C-LEAVE-0001") {
      vueData.$set(vueData.formData.main,"C-LEAVE-0003",{value:""})
      vueData.$set(vueData.formData.main,"C-LEAVE-0006",{value:""})
    }
 })

 vueData.$bus.on("blurBus",function(busObj) {
  if(busObj.metaData.metaId == "C-LEAVE-0006") {
    if(busObj.value < 0) {
      dsf.layer.toast("请输入正确天数！")
      formData.main["C-LEAVE-0006"].value = ""
    } else {
      if (formData.main["C-LEAVE-0001"].value == 1 && formData.main["C-LEAVE-0002"].value) {
           let start=filterTime(formData.main["C-LEAVE-0002"].value)
           let days = formData.main["C-LEAVE-0006"].value
           let end = start + (days - 1)*86400000
           let endday = new Date(end)
           let endTime =dsf.date.format(endday,'yyyy-mm-dd')
           vueData.$set(formData.main,"C-LEAVE-0003",{value:endTime})
      }
    }
  }
 })
 
  vueData.$bus.on("selectDateTime", function(busObj){
    if(busObj.metaData.metaId=="C-LEAVE-0003"||busObj.metaData.metaId=="C-LEAVE-0002"){
     if(formData.main["C-LEAVE-0003"].value && formData.main["C-LEAVE-0002"].value){
        let start=filterTime(formData.main["C-LEAVE-0002"].value)
        let end=filterTime(formData.main["C-LEAVE-0003"].value)
        let utc=end-start;
        let dayTimes=Math.floor(utc/(24*60*60*1000))+1
       
        if(dayTimes>0){
          dsf.http.post('fn/leave/offHoliday',{"startTime":formData.main["C-LEAVE-0002"].value,"endTime":formData.main["C-LEAVE-0003"].value}).then((res)=>{ 
          vueData.$set(formData.main,"C-LEAVE-0006",{value:res.data.data})
           })
        }else{
          vueData.$set(formData.main,"C-LEAVE-0006",{value:""})
          vueData.$set(formData.main,"C-LEAVE-0003",{value:""})
          dsf.layer.toast("结束时间必须晚于开始时间")
        }
      }
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
        reject("请假结束时间不能早于请假开始时间")
      }else{
        resolve()
      }
    }else{
      resolve()
    }
  })
}
export default exportObj;