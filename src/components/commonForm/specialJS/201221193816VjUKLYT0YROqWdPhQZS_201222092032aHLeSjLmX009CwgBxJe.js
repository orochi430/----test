// 平安反馈
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (newVal, oldVal,formData,formStruct,org,vueData) {
    
    // if(formData&&formData.main["B0054"].value<=0){
    //   if(vueData.$refs.formTab[0].$refs["B0060"]){
    //     formStruct.controls.forEach((item,index)=>{
    //       if(item.metaId=="B0060"){
    //         vueData.$set(vueData.formMeta.controls[index].validator,"required",{})
    //       }
    //     })
    //     let rules=vueData.$refs.formTab[0].$refs["B0060"][0].$refs.control.controlData.rules
    //     console.log(rules.filter((item)=>{item.message=="情况反馈不能为空"}))
    //     if(rules.filter((item)=>{item.message=="情况反馈不能为空"}).length<1){
    //       vueData.$refs.formTab[0].$refs["B0060"][0].$refs.control.controlData.rules.push({
    //         message: "情况反馈不能为空",
    //         pattern: /^.+$/
    //       })
    //     }
        
    //   }
      
    // }
    // if(formData&&formData.main["B0054"].value>0){
    //   formStruct.controls.forEach((item,index)=>{
    //     if(item.metaId=="B0060"){
    //       vueData.$delete(vueData.formMeta.controls[index].validator,"required")
    //     }
    //   })
    //   let rules=JSON.parse(JSON.stringify(vueData.$refs.formTab[0].$refs["B0060"][0].$refs.control.controlData.rules))
    //   for(var i=0;i<rules.length;i++){
    //     if(rules[i].message="情况反馈不能为空"){
    //       vueData.$delete(vueData.$refs.formTab[0].$refs["B0060"][0].$refs.control.controlData.rules,i)
    //       i--
    //     }
    //   }
      
    // }
    console.log(vueData.formMeta)
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log("平安反馈")
  // let formDataCopy=JSON.parse(JSON.stringify(vueData.formData))
  formStruct.controls.forEach((item,index)=>{
    if(item.metaId=="B0033"){
      item.show=true
      item.controlType="controlMap"
    }
  })
  // vueData.formData=formDataCopy
  
}
//保存后事件
exportObj.saveAfter=function(VueData, sendButtonParams, formData){
  console.log(VueData, sendButtonParams, formData)
  var fid=VueData.formData.main["A0031"].value;
  if (fid){
      var pa=VueData.formData.main["B0054"];
      pa.fid=fid;
      console.log(pa)
      dsf.http.post("fn/feedback/update",pa, function (result) {
      })
  }
  alert(1);
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return str
  }
  return new Promise(function(resolve,reject){
    if(action=="save"||action=="send"|action=="custom1"){
      console.log(formData)
      if(formData&&formData.main["B0054"].value<=0&&formData.main["B0060"].value.length<1){
        reject("不平安请填写情况反馈！")
        return
      }
      var start = Date.parse(formData.main["C-ZB-RYAP-0007"].value);
      var end= Date.parse(formData.main["C-ZB-RYAP-0006"].value)
      let now=Date.parse(new Date())
      if (now<start||now>end){
        reject("不在反馈时限无法提交！")
        return
      }
      vueData.$set(vueData.formData.main,"B0029",{value:"2",text:"已反馈"})
      resolve()
    }
    
  })
  
}
export default exportObj;