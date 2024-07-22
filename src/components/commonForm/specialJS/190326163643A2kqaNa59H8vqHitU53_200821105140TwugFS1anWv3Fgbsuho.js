//督办通知
import dsf from "../../../common";

const exportObj = {};
exportObj.handle = function (formData, formStruct) {
    //根据表单数据变化，改变其他控件值
    /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.initHandle = function (formData, formStruct, vueData) {
 console.log("tongzhi",formData,vueData.formMeta)
  let nextDpt=false
  if(formData.main["A0031"].value!=formData.main["B0035"].value){
    nextDpt=true
  }
  vueData.formMeta.controls.forEach((item,index)=>{
    if(item.metaId=="C-DB-TZ-0002"&&nextDpt){
      vueData.formMeta.controls.splice(index,1)
    }
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  return new Promise(function(resolve,reject){
    // console.log(action)
    // if(action=="send"){
    //   dsf.http.post(`fn/supervise/approval/checkSendNotice`,{pk:vueData.$route.params.pk})
    //   .then(res=>{
    //     console.log(res)
    //     if(res.data.data){
    //       resolve()
    //     }else{
    //       reject("请先下发督办通知")
    //     }
    //   }).catch(err=>{
    //     reject("请先下发督办通知")
    //   })
    // }else{
      resolve()
    // }
    
    
  })
}
export default exportObj;