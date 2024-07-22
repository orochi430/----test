// 假日带班
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (newValue,oldValue,formData, formStruct,org) {
  
  
}
exportObj.initHandle = function (formData, formStruct, vueData,allformMeta) {
  console.log("假日带班")
  vueData.$bus.on("selectUserBus", function(busObj) {
    console.log(busObj)
    let subFormKey
    for (let [k, v] of Object.entries(formStruct.subform)){
      v.controls.forEach((item,index)=>{
        if(item.controlId==busObj.metaData.controlId){
          subFormKey=k
        }
      })
    }
    dsf.http.post(`fn/report/getUser?userid=${busObj.value}`)
    .then(({data})=>{
      console.log(data)
      console.log(subFormKey)
      
      if(subFormKey=="201125171940SLO7uHSPxNyiAZ3sh1O"){
        vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["B0038"],"value",data.data.fax)
      }else{
        vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["B0036"],"value",data.data.zj)
        vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["B0038"],"value",data.data.mobile)
      }
      vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["B0012"],"value",data.data.tel)
      
    })
    
  });
  function deepCopy(data){
    return JSON.parse(JSON.stringify(data))
  }

  
  dsf.http.post("fn/report/getJrabSubTitle").then(({data})=>{
    if(data.code=="200"){
      vueData.$set(vueData.formData.main,"B0025",{value: data.message})
      let subNames=data.message.split(",")
      vueData.formData.subformKeys.forEach((item,index)=>{
        vueData.$set(vueData.formMeta.subform[item],"name",subNames[index])
      })
    }
  })
  if(!formData.main["G-REPORT-005"]){

    dsf.http.post(`fn/report/getUser?userid=${dsf.util.loadSessionStore("user").user_id}`)
    .then(({data})=>{
      console.log(data)
      vueData.$set(vueData.formData.main,"B0038",{value:data.data.mobile})
      vueData.$set(vueData.formData.main,"B0012",{value:data.data.tel})
    })
    console.log(vueData.formData.main)
    dsf.http.post("fn/report/getZbinit").then(({data})=>{
      var data=data.data
      if (!data.holidayId) {
        dsf.layer.toast("暂无最新节假日需要安排值班，请联系管理员!")
        vueData.$router.go(-1)
        return
      }
      vueData.$set(vueData.formData.main,"G-REPORT-001",{value: data.dlqy, text: data.dlqyText})
      vueData.$set(vueData.formData.main,"B0024",{value: data.fbcc, text: data.fbcc})
      vueData.$set(vueData.formData.main,"G-REPORT-007",{value: data.start})
      // vueData.$set(vueData.formData.main,"G-REPORT-006",{value: data.year})
      vueData.$set(vueData.formData.main,"G-REPORT-008",{value: data.end})
      vueData.$set(vueData.formData.main,"B0001",{value:vueData.formData.main["A0024"].value + data.year + "年" + data.holidayName + "值班带班表"})
      vueData.$set(vueData.formData.main,"G-REPORT-005",{value: data.holidayId, text: data.holidayName})
        for (let [k, v] of Object.entries(vueData.formData.multinfos)){
          let SubFormPrimary=vueData.allformMeta.subform[k].controls.filter(itm=>itm.controlType=="controlSubFormPrimary")[0]
          data.dates.forEach((item,index)=>{
            dsf.http.get("fn/common/generateUUID?size=1").then(({data})=>{
              let newData={}
              newData=deepCopy(SubFormPrimary.defaultValue)
              newData[k]={}
              newData[k].value=data.data.UUID
              newData[k].foreign=vueData.formData.main['A0001'].value
              newData["G-REPORT-SUB-001"]={
                value:item
              }
              newData["G-REPORT-SUB-003"]={
                value:""
              }
              let subformControl=vueData.allformMeta.subform[k].controls.filter(itm=>itm.controlType!="controlSubFormPrimary")
              subformControl.forEach(item=>{
                if(!newData[item.metaId]){
                  newData[item.metaId]={
                    value:""
                  }
                }
              })
              // let c="G-REPORT-SUB-003"
              // Object.defineProperty(newData, c, {
              // 　　set:function(x){
              // 　　　　console.log('c被赋值：',x);
              // 　　　　c=x
              // 　　},
              // 　　get:function(){
              // 　　　　console.log('c被取出：',c)
              // 　　　　return c
              // 　　}
              // })
              newData.action="Added"
              vueData.$set(vueData.multinfos[k].rows,vueData.multinfos[k].rows.length,newData);
            })
          })
        }
    })
  }
  
    
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