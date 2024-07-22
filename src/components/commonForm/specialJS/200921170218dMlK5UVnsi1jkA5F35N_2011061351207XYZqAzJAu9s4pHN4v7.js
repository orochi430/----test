// 督办立项
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
  console.log("督办立项")
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return str
  }
  return new Promise(function(resolve,reject){
    if(formStruct.parameters.nodeId=="0"&&(action=="save"||action=="send")){
      let doendTime=Date.parse(filterTime(formData.main["C-DB-0052"].value))
      let nextTodo
      if(formData.main["C-DB-0014"]){
        nextTodo=Date.parse(filterTime(formData.main["C-DB-0014"].value))
      }
      if(doendTime<=nextTodo){
        reject("办理期限必须大于反馈期限")
      }else{
        resolve()
      }
    }else{
      resolve()
    }
    
  })
  
}
export default exportObj;