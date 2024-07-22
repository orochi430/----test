//【大事务二期移动端】收文 督办办结按钮开发 -- 20220822
import dsf from "../../../common";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
exportObj.initHandle = function (formData, formStruct, vueData) {
}

//督办办结
exportObj.dbbj=function (formData, formStruct, vueData) {
    let count = 0
    let pk = vueData.formMeta.parameters.pk
    let moduleId = vueData.formMeta.parameters.moduleId
    let Success = function (p,m) {
      dsf.http.post("fn/priority/changeStatus",{pk: p,moduleId: m}).then((res)=>{
        if (res.data.type === "success") {
          dsf.layer.toast("办结成功","",()=>{
            vueData.$router.go(-1)
          })
        }
      })
      
    }
    dsf.http.post("fn/supervise/queryBlqk",{id: pk}).then((res)=>{
          count = res.data.data.count
          if (count>0) {
            vueData.buttonHandle['saveNoTip'](
              vueData.$route.params,
              vueData.formMeta,
              vueData.formData,
              vueData,
              vueData.$refs,
              Success(pk,moduleId)
            )
          } else {
            dsf.layer.toast("请填写督办办理结果")
          }
    })
  }
export default exportObj;