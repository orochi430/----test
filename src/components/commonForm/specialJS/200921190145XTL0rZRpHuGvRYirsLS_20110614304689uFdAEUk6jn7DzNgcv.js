// 督办通知
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (newVal, oldVal,formData,formStruct,org,vueData) {
  const subformKeys=["201228104941nrUtfKtQEcseVBib84e"]
  let zhuban=formStruct.controls.findIndex(item=>item.metaId=="C-DB-TZ-0039")
  let fasong=formStruct.controls.findIndex(item=>item.metaId=="C-DB-TZ-0038")
  if(formData.main["C-DB-TZ-0038"].value=="0"){
    vueData.initSubForm()
    vueData.formMeta.controls[zhuban].show=0
    vueData.formMeta.controls[fasong].show=1
    vueData.formData.main["C-DB-TZ-0039"].value=""
    vueData.formData.main["C-DB-TZ-0039"].text=""
    vueData.$set(vueData.formData,"subformKeys",[])
  }
  if(formData.main["C-DB-TZ-0038"].value=="1"){
    vueData.initSubForm()
    vueData.formMeta.controls[zhuban].show=1
    vueData.formMeta.controls[fasong].show=2
    vueData.$set(vueData.formData,"subformKeys",[])
  }
  if(formData.main["C-DB-TZ-0038"].value=="2"){
    vueData.formMeta.controls[zhuban].show=0
    vueData.formMeta.controls[fasong].show=2
    vueData.formData.main["C-DB-TZ-0039"].value=""
    vueData.formData.main["C-DB-TZ-0039"].text=""
    vueData.$set(vueData.formData,"subformKeys",subformKeys)
  }
  
}
exportObj.initHandle = function (formData, formStruct, vueData,allformMeta) {
  console.log("督办通知")
  
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  
  return new Promise(function(resolve,reject){
    try {
      resolve()
    } catch (error) {
      console.log(error)
      reject(error)
    }
    
    
    
  })
}
export default exportObj;