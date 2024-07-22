// 江苏烟草 核查安排
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  // 其他节点新增子表 
  let nodeId = formStruct.parameters.nodeId
  // 节点ID 和 对应默认展开的自表ID
  let nodeIdArr = ["P3E5tN2otUezAcJ", "TIAV361FMvhCt49", "jDSmt0xV9F15rKP", "ZPSAgqs3wVArS5s"]
  let subFormId = ["220524094834xdMpYn3JjRfvQUPeJcz", "2205241328424QMw6p5SuEcqinry1a3", "220524152332v4ueBkEzMQHfkNqKDpY", "220524113744PlXTr9873dMxyCR9eTT"]
  let index = nodeIdArr.findIndex(item => item == nodeId)
  let subFormLength = index > -1 ? vueData.$refs.formTab[0].$refs[subFormId[index]][0].$refs.subform.formData.rows.length : -1
  if (index > -1 && subFormLength === 0) {
    vueData.$nextTick(async () => {
        await vueData.$refs.formTab[0].$refs[subFormId[index]][0].$refs.subform.addCard()
    })
  }
}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  return new Promise(function (resolve, reject) {
    if( ["omRlLNAmf9ENjUl","SaKIUb460FEvrtO","MZVgEUzFy4h84Qm","P3E5tN2otUezAcJ","TIAV361FMvhCt49"].indexOf(formStruct.parameters.nodeId) != -1) {
      let flow = formData.flowinfo ? formData.flowinfo[`flow-${formStruct.parameters.pk}-${formStruct.parameters.pId || '0'}-${formStruct.parameters.pnId || formStruct.parameters.pk}`].opinionContent : ""
      if(!flow) {
        reject("请填写意见")
      }else if(flow.indexOf("建议") == -1) {
        dsf.layer.confirm({
          message:"检测到您尚未填写建议，请确认是否提交",
          confirmButtonText:"是",
          cancelButtonText:"否",
         }, ()=>{ resolve() }, ()=>{ reject() })
      } else {
        resolve()
      }
    } else {
      resolve()
    }
  })
}
export default exportObj;
