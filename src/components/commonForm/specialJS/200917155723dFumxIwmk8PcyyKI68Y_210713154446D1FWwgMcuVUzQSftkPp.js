//无锡 统计分析
const exportObj = {};
exportObj.pingjia = function (formData, formStruct, vueData) {
  vueData.$refs.appraise.show = true
  vueData.$refs.appraise.evaluate[0].cyrbm = ""
}
exportObj.saveFilter = function (formData, formStruct){
  return new Promise(function (resolve, reject) {
    dsf.http.post("fn/rcbgpjcontroller/jyEvaluate",{
      pnid: formStruct.parameters.pnId,
      moduleId: formStruct.parameters.moduleId,
      infoid: formStruct.parameters.pk,
      nodeId: formStruct.parameters.nodeIdd
    }).then(({data})=>{
      if(data.code == 200){
        resolve()
      } else {
        reject(data.message)
      }
    })
  })
}
export default exportObj;