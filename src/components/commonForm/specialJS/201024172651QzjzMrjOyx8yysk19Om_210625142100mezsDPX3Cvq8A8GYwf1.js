// 请假审批
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
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
        if(vueData.formData.main["C-LEAVE-0004"].value&&vueData.formData.main["C-LEAVE-0005"].value) {
          dsf.http.post('fn/leaveApplication/existsLeaveTime', {
            pk: vueData.formParams.pk,
            startTime: formData.main["C-LEAVE-0002"].value,
            endTime: formData.main["C-LEAVE-0003"].value,
            startPeriod:vueData.formData.main["C-LEAVE-0004"].value,
            endPeriod:vueData.formData.main["C-LEAVE-0005"].value
          }).then(res => {
            if(res.data.data == 1) {
              vueData.$set(vueData.formData.main,"C-LEAVE-0003",{value:""})
              vueData.$set(vueData.formData.main,"C-LEAVE-0002",{value:""})
              dsf.layer.toast(res.data.message)
            }
          })
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
        reject("请假结束时间不能早于请假开始时间")
      }else{
        // 拼接标题 名字+类型+请假时间
        let title = `${vueData.formData.main['A0011'].value}的${vueData.formData.main['A0005'].value}(${vueData.formData.main['C-LEAVE-0001'].text}${vueData.formData.main['C-LEAVE-0006'].value}天)`
        vueData.$set(vueData.formData.main,"B0001",{value: title})
        resolve()
      }
    }else{
      resolve()
    }
  })
}
export default exportObj;