// 用车申请
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
  console.log("用车申请")
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  function filterTime(time){
    console.log(time)
    var str=time.replace(/-/g,"/")
    return str
  }
  return new Promise(function(resolve,reject){
    try {
      let startTime=Date.parse(filterTime(formData.main["C-CARAPPLY-0002"].value))||""
      let endTime=Date.parse(filterTime(formData.main["C-CARAPPLY-0003"].value))||""
      console.log(startTime,endTime)
      if(startTime&&endTime){
        if(endTime<=startTime){
          reject("返回时间必须大于出发时间")
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