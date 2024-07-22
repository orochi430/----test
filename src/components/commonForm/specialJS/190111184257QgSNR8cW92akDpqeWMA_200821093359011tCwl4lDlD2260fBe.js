// 会议室预定
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
    //根据表单数据变化，改变其他控件值
    /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  let meetingId = util.loadSessionStore("checkedMettingRoom") ? util.loadSessionStore("checkedMettingRoom").value : null
  let addressData
  let addressArr=vueData.formMeta.controls.filter(control=>control.metaId=="c-meetingsq-009")
  if(meetingId&&addressArr.length&&addressArr[0].enumData){
    addressData=addressArr[0].enumData.filter(data=>data.value==meetingId)[0]
    formData.main["c-meetingsq-009"].value=addressData.value
    formData.main["c-meetingsq-009"].text=addressData.text
  }
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  function filterTime(time){
    console.log(time)
    var str=time.replace(/-/g,"/")
    return str
  }
  return new Promise(function(resolve,reject){
    try {
      let startTime=Date.parse(filterTime(formData.main["c-meetingsq-007"].value))||""
      let endTime=Date.parse(filterTime(formData.main["c-meetingsq-008"].value))||""
      console.log(startTime,endTime)
      if(startTime&&endTime){
        if(endTime<=startTime){
          reject("结束时间必须大于开始时间")
        }else{
          resolve()
        }
      }

      resolve()
    } catch (error) {
      resolve()
    }
    
    
    
  })
}
export default exportObj;