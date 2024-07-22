/**
 * 社区疫情管理   人员信息表单
 */
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
function Getsex(psidno){
  var sexno,sex
  if(psidno.length==18){
      sexno=psidno.substring(16,17)
  }else if(psidno.length==15){
      sexno=psidno.substring(14,15)
  }else{
      return "";
  }
  var tempid=sexno%2;
  if(tempid==0){
      sex='F'
  }else{
      sex='M'
  }
  return sex
}
function GetBirthday(psidno){
  var birthdayno,birthdaytemp
  if(psidno.length==18){
      birthdayno=psidno.substring(6,14)
  }else if(psidno.length==15){
      birthdaytemp=psidno.substring(6,12)
      birthdayno="19"+birthdaytemp
  }else{
      return "";
  }
  var birthday=birthdayno.substring(0,4)+"-"+birthdayno.substring(4,6)+"-"+birthdayno.substring(6,8)
  return birthday
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  let imgCtrl = formStruct.controls.find(item => item.metaId == 'C-EXPO-COMMUNITY-USER-0022')
  imgCtrl.extra.canCropper = true
  if (!vueData.pk) {
    vueData.$set(vueData.formData.main, "C-EXPO-COMMUNITY-USER-0023", {
      value: vueData.$route.query.fid
    })
  }
  let idcardCtrl = formStruct.controls.find(item => item.metaId == 'C-EXPO-COMMUNITY-USER-0002')
  let sexCtrl = formStruct.controls.find(item => item.metaId == 'C-EXPO-COMMUNITY-USER-0020')
  let beathCtrl = formStruct.controls.find(item => item.metaId == 'C-EXPO-COMMUNITY-USER-0034')
  sexCtrl.privilege.editable = false
  beathCtrl.privilege.editable = false
  vueData.$bus.on("inputRadio", function (busObj) {
    if(busObj.metaData.metaId==="C-EXPO-COMMUNITY-USER-0035"){
        if(formData.main["C-EXPO-COMMUNITY-USER-0035"].value=="1"){
          sexCtrl.privilege.editable = false
          beathCtrl.privilege.editable = false
        }else{
          delete idcardCtrl.validator.identity
          sexCtrl.privilege.editable = true
          beathCtrl.privilege.editable = true
        }
        
    }
});
  vueData.$bus.on("blurBus", function (vueObj) {
    console.log(vueObj)
    if (vueObj.metaData.metaId == "C-EXPO-COMMUNITY-USER-0002") {
      if (formData.main["C-EXPO-COMMUNITY-USER-0035"].value == 1) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!reg.test(vueObj.value)) {
          dsf.layer.toast('身份证号码不正确，请重新输入')
          vueData.$set(vueData.formData.main, "C-EXPO-COMMUNITY-USER-0002", {value: ''})
          return
        }
        if (Getsex(vueObj.value)) {
          vueData.$set(vueData.formData.main, "C-EXPO-COMMUNITY-USER-0020", {value: Getsex(vueObj.value)=='M' ? '1' : '2', text: Getsex(vueObj.value)=='M' ? '男' : '女'})
        }
        if (GetBirthday(vueObj.value)) {
          vueData.$set(vueData.formData.main, "C-EXPO-COMMUNITY-USER-0034", {value: GetBirthday(vueObj.value)})
        }
      }
    }
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  return new Promise(function(resolve,reject){
    if(action=="save"||action=="send"){
      if (formData.main["C-EXPO-COMMUNITY-USER-0035"].value == 1) {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!reg.test(formData.main["C-EXPO-COMMUNITY-USER-0002"].value)) {
          reject("身份证号码不正确，请重新输入")
        }else{
          resolve()
        }
      }else {
        resolve()
      }
    }else{
      resolve()
    }
  })
}
export default exportObj;
