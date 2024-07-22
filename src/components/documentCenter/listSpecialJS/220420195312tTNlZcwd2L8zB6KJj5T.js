// 部门管理员 固定资产查询列表
const exportObj = {};
exportObj.dataFilter = function (listData, vueData) {
  // 隐藏使用部门检索条件
  let idx = vueData.controlData.findIndex(item => item.metaData == "B0051");
  if (idx > -1) vueData.controlData.splice(idx, 1)

  // 使用人范围改为本部门
  let uCtl = vueData.controlData.find(item => item.metaData == "C-ERP-OFFICE-REPAIR-0016");
  if(uCtl) uCtl.extra.customAction = "self_dept"
  
}
export default exportObj;