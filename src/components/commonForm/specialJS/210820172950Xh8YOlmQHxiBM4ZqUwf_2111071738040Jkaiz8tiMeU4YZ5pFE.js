const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  // 自动生成标题，规则是*年*月*日+部门+人名的理发预约
  let title = `${dsf.date.format(dsf.date.toDay(),'yyyy年mm月dd日')}${dsf.util.loadSessionStore("user").deptName}${dsf.util.loadSessionStore("user").name}的理发预约`;
  vueData.$set(formData.main, "B0001", {
    value: title
  });
}
export default exportObj;
