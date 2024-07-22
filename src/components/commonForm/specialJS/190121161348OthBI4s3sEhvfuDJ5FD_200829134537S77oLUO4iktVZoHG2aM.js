// 会议通知
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log("会议通知")
  console.log(formData,formStruct.parameters.formId)
  let params={
    meetingtzId:formData.main["A0001"].value,
    moduleId:formData.main["A0004"].value,
    formId:formStruct.parameters.formId,
  }
  dsf.http.post("fn/MeetingMobile/setMeetingNoticeReadStatus",params)
  .then(res=>{
    console.log(res)
  })
}

export default exportObj;