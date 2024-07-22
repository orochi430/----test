// 健康上报
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {

    //根据表单数据变化，改变其他控件值
    /* if (formData.main["c-meetingtz-002"].text == "部级会议") {
        formData.main["c-meetingtz-006"].value = formData.main["c-meetingtz-002"].text;
    } */
}
exportObj.saveAfter=function(vueData,formData, formStruct ){
  vueData.$router.go(-1)
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log(vueData.$router)
  if(!vueData.$route.params.pk){
    dsf.http.get(`fn/epidemic/isClockIn`)
    .then(({data})=>{
      console.log(data)
      if(data.type=="success"){
        vueData.$set(vueData.formData.main,"C-EPIDEMIC-0004",{value:""})//省
        vueData.$set(vueData.formData.main,"C-EPIDEMIC-0005",{value:""})//市
        vueData.$set(vueData.formData.main,"C-EPIDEMIC-0006",{value:""})//县
        if(window.dd){
          let loading=dsf.layer.loading()
          dsf.dd.getGeolocation().then(res=>{
            console.log(res,"119")
            vueData.$set(vueData.formData.main,"C-EPIDEMIC-0002",{value:res.province+''+res.city+res.district})//省
            vueData.$set(vueData.formData.main,"C-EPIDEMIC-0004",{value:res.province})//省
            vueData.$set(vueData.formData.main,"C-EPIDEMIC-0005",{value:res.city})//市
            vueData.$set(vueData.formData.main,"C-EPIDEMIC-0006",{value:res.district})//县
            dsf.layer.closeLoading(loading)
          }).catch(err=>{
            dsf.layer.closeLoading(loading)
            console.log(err,"121")
          })
        }
      }else{
        dsf.layer.toast("今日已打卡")
        vueData.$router.replace(`/commonForm/210202144200a6hFT4QWrGbmmP4dSy1/${data.data}`)
        return
      }
    })
  }
  formStruct.controls.forEach((item,index)=>{
    if(item.metaId=="B0025"){
      item.show=true
      item.controlType="controlHtml"
      item.label=" "
    }
    if(item.metaId=="C-EPIDEMIC-0002"){
      item.show=true
      item.controlType="controlMap"
      item.inpReadonly=true
    }
  })
  console.log(vueData.formData)
  vueData.$bus.on("selectDateTime", function(busObj){
    if(busObj.metaData.metaId=="C-EPIDEMIC-0002"){
      vueData.$set(vueData.formData.main,"C-EPIDEMIC-0004",{value:busObj.province})//省
      vueData.$set(vueData.formData.main,"C-EPIDEMIC-0005",{value:busObj.city})//市
      vueData.$set(vueData.formData.main,"C-EPIDEMIC-0006",{value:busObj.adName})//县
    }
    console.log(busObj)
    console.log(vueData.formData)
  })
  
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
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return str
  }
  return new Promise(function(resolve,reject){
    resolve()
  })
  
}
export default exportObj;