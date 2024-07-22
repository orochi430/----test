// 外出报备
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log("外出报备")
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  return new Promise(function(resolve,reject){
    if(action=="save"||action=="send"){
      let endTime=filterTime(formData.main["C-OUTMANAGE-0002"].value)//返回时间
      let startTime=filterTime(formData.main["C-OUTMANAGE-0001"].value)//外出时间
      if(startTime>endTime){
        reject("返回时间不能早于外出时间")
      }else{
        resolve()
      }
    }else{
      resolve()
    }
  })
}
export default exportObj;