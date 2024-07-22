const exportObj = {};

exportObj.initHandle=function (formData, formStruct, vueData){
  vueData.$set(formData.main, "B0001", {"value": `${formData.main['A0011'].value}的公务用印(${dsf.date.format(new Date(), 'yyyy年mm月dd日')})`});
}

export default exportObj;