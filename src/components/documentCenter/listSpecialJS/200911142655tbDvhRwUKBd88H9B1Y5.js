import dsf from "../../../common";
// 会议室通知
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
    //根据表单数据变化，改变其他控件值
    /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.initHandle = function (formData, formStruct, vueData) {
    
}
exportObj.link = function (listid,moduleId,pk,vueData) {
  vueData.$router.push({path:"/previewPage",query:{pk:pk,moduleId:moduleId}})
}
export default exportObj;