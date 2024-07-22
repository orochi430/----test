// 单点已签收会议通知
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {

};

exportObj.viewMeetingSign = function (formData, formStruct, vueData) {
  console.log(vueData.$route.query);
  formStruct.parameters.formId = 
  vueData.$router.push({
    path: `/commonForm/${formStruct.parameters.moduleId}/${formStruct.parameters.pk}`,
    query: Object.assign({formId : '230603000903YhuPIxN0fH1JJHUbrj0'}, vueData.$route.query) 
  });
  
};

export default exportObj;
