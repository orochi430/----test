// 大事务 报销模块
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
  if(formStruct.parameters.nodeId == "c6wh0KV3Pl0saCd") {
    dsf.layer.alert("您提交的申请已经通过审批，请尽快携带纸质材料前往财务处找出纳拨款，如若长时间未办理，则申请可能失效，请注意办理时间。")
  }
}
export default exportObj;