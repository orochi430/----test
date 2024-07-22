// 会议室预定 县政钉
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
    console.log("会议室预定")
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  let addressData=util.loadSessionStore("checkedMettingRoom")
  let addressArr=vueData.formMeta.controls.filter(control=>control.metaId=="c-meetingtz-010")
  if(addressData&&addressArr.length){
    formData.main["c-meetingtz-010"].value=addressData.value
    formData.main["c-meetingtz-010"].text=addressData.text
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
      let startTime=Date.parse(filterTime(formData.main["c-meetingtz-019"].value))||""
      let endTime=Date.parse(filterTime(formData.main["c-meetingtz-020"].value))||""
      console.log(startTime,endTime)
      if(startTime&&endTime){
        if(endTime<=startTime){
          reject("结束时间必须大于开始时间")
        }else{
          dsf.http.post(`fn/meeting/validMeetingTime`,{
            pk:formData.main["A0001"].value,
            place:formData.main["c-meetingtz-010"].value,
            startTime:filterTime(formData.main["c-meetingtz-019"].value),
            endTime:filterTime(formData.main["c-meetingtz-020"].value),
          }).then(({data})=>{
            console.log(data)
            if (data.type == "success") {
              var msg = data.message;
              if(msg == "early"){
                  reject("不能预定当前时间以前的会议！");
              }else if(msg=="lock"){
                  reject("当前时间段该会议室是锁定状态无法预定！");
              }else if(msg!="true"){
                  reject("禁止同一时间同一会议室多个会议申请！");
              }else{
                resolve()
              }
            }else{
                reject("检查会议时间段是否可用出错!");
            }
          })
        }
      }
    } catch (error) {
      resolve()
    }
    
    
    
  })
}
export default exportObj;