// 督办立项
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
    //根据表单数据变化，改变其他控件值
    /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  // let formDataCopy=JSON.parse(JSON.stringify(vueData.formData))
  // formDataCopy.main["html"]={
  //   value:""
  // }
  // formStruct.controls.unshift({
  //   enumData: [],
  //   controlType: "controlHtml",
  //   metaId: "html",
  //   defaultValue: {},
  //   extra: {},
  //   label: " ",
  //   placeholder: "",
  //   privilege: {visible: true, editable: true},
  //   show:1,
  //   restrict: {},
  //   validator: {lengthRange: {end: 500, begin: 0},}
  // })
  
  // vueData.formData=formDataCopy
  // console.log(vueData.formMeta)
  // console.log(vueData.formData)
  
}
//保存后事件
exportObj.saveAfter=function(formData, formStruct, vueData){
  // alert(1);
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return str
  }
  return new Promise(function(resolve,reject){
    if(action=="send"&&formStruct.parameters.nodeId=="oPXPWpN8TyWNlSE"){
      dsf.http.post(`fn/supervise/approval/checkSendNotice`,{pk:vueData.$route.params.pk})
      .then(res=>{
        console.log(res)
        if(res.data.data){
          resolve()
        }else{
          reject("请先下发督办通知")
        }
      }).catch(err=>{
        reject("请先下发督办通知")
      })
    }else{
      if(formStruct.parameters.nodeId=="0"&&(action=="save"||action=="send")){
        let doendTime=Date.parse(filterTime(formData.main["B0019"].value))
        let creatTime=Date.parse(filterTime(formData.main["B0013"].value))
        let todoTime=Date.parse(filterTime(formData.main["C-DB-0017"].value))
        let nextTodo
        if(formData.main["C-DB-0014"]){
          nextTodo=Date.parse(filterTime(formData.main["C-DB-0014"].value))
        }
        var str1=formData.main["C-DB-0001"].value
        var str2=formData.main["C-DB-0002"].value
        if(str1&&str2){
          var arr1=str1.split(",")
          var arr2=str2.split(",")
          let arr3=arr1.filter((item)=>{
            return arr2.indexOf(item)>-1
          })
          if(arr3.length>0){
            reject("主办单位协办单位不能选择相同单位")
            return
          }
        }
        if(doendTime<creatTime){
          reject("办结日期不能早于拟稿日期")
        }else if(doendTime<todoTime){
          reject("办结日期不能早于交办日期")
        }else if(todoTime<creatTime){
          reject("交办日期不能早于拟稿日期")
        }else if(nextTodo<creatTime){
          reject("下次反馈时间不能早于拟稿日期")
        }else if(nextTodo<todoTime){
          reject("下次反馈时间不能早于交办日期")
        }else if(doendTime<nextTodo){
          reject("办结日期不能早于下次反馈时间")
        }else{
          resolve()
        }
      }else{
        resolve()
      }
    }
  })
  
}
export default exportObj;