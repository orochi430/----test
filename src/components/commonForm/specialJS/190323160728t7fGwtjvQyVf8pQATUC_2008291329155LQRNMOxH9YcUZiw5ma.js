import dsf from "../../../common";

const exportObj = {};
exportObj.handle = function (formData, formStruct) {
    //根据表单数据变化，改变其他控件值
    /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log(777777777777)
  dsf.http.get("fn/supervise/approval/read",{pk:formData.main["A0001"].value})
  .then(({data})=>{
      
  })

    
    
}
export default exportObj;