// 外出报备
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
    
}

exportObj.formHandle={
    get (target, key, receiver) {
      console.log('get', key)
      // 递归创建并返回
      if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
      }
      return Reflect.get(target, key, receiver)
    },
    set (target, key, value, receiver) {
      console.log('set', key, value)
      return Reflect.set(target, key, value, receiver)
    }
  }

  exportObj.subFormHandle={
    get (target, key, receiver) {
      console.log('get', key)
      // 递归创建并返回
      if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
      }
      return Reflect.get(target, key, receiver)
    },
    set (target, key, value, receiver) {
      console.log('set', key, value)
      return Reflect.set(target, key, value, receiver)
    }
  }

exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log("外出报备80")
  function filterTime(time){
    console.log(time)
    var str=time.replace(/-/g,"/")
    return str
  }
  vueData.$bus.on("checkVal", function(busObj){
    console.log(busObj)
    if(busObj.subFormIndex==null){
      return
    }else{
      let subFormKey
      for (let [k, v] of Object.entries(formStruct.subform)){
        v.controls.forEach((item,index)=>{
          if(item.controlId==busObj.metaData.controlId){
            subFormKey=k
          }
        })
      }
      let temp=Date.parse(filterTime(formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-001"].value))
      let tempRange=formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-005"].value
      let temp2=Date.parse(filterTime(formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-002"].value))
      let tempRange2=formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-006"].value
      if(temp==temp2&&tempRange&&tempRange2){
        console.log(tempRange,tempRange2)
        if(tempRange>tempRange2){
          dsf.layer.toast("开始时间段不能大于结束时间段")
          vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-005"],"value","")
          vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-006"],"value","")
        }
      }
    }
  })

  vueData.$bus.on("selectDateTime", function(busObj){
    if(busObj.subFormIndex==null){
      return
    }else{
      let subFormKey
      for (let [k, v] of Object.entries(formStruct.subform)){
        v.controls.forEach((item,index)=>{
          if(item.controlId==busObj.metaData.controlId){
            subFormKey=k
          }
        })
      }
      console.log(subFormKey,busObj.subFormIndex)
      let temp=Date.parse(filterTime(busObj.value))
      let tempRange=formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-005"].value
      let temp2=Date.parse(filterTime(formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-002"].value))
      let tempRange2=formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-006"].value
      if(temp>temp2){
        dsf.layer.toast("开始时间不能大于结束时间")
        if(busObj.metaData.metaId=="G-REPORT-SUB-001"){
          vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-001"],"value","")
          return
        }
        if(busObj.metaData.metaId=="G-REPORT-SUB-002"){
          vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-002"],"value","")
          return
        }
      }
      if(temp==temp2){
        console.log("5555")
        if(tempRange>tempRange2){
          dsf.layer.toast("开始时间段不能大于结束时间段")
          vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-005"],"value","")
          vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["G-REPORT-SUB-006"],"value","")
        }
      }
      
    }
  })
  vueData.$bus.on("selectUserBus", function(busObj) {
    console.log(busObj)
    console.log()
    dsf.http.post(`fn/report/getUser?userid=${busObj.value}`)
    .then(({data})=>{
      if(busObj.subFormIndex==null){
        vueData.$set(vueData.formData.main["B0036"],"value",data.data.zj)
        vueData.$set(vueData.formData.main["201204111545Im1HxYsoy6DPCKJlcwt"],"value",data.data.mobile)
      }else{
        let subFormKey
        for (let [k, v] of Object.entries(formStruct.subform)){
          v.controls.forEach((item,index)=>{
            if(item.controlId==busObj.metaData.controlId){
              subFormKey=k
            }
          })
        }
        vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["B0036"],"value",data.data.zj)
        vueData.$set(vueData.formData.multinfos[subFormKey].rows[busObj.subFormIndex]["B0012"],"value",data.data.mobile)
      }
      
    })
  });

  if(!formData.main["G-REPORT-001"]){
    dsf.http.post("fn/report/getUser").then(({data})=>{
      var data=data.data
      vueData.$set(vueData.formData.main,"G-REPORT-001",{value:data.dlqy,text:data.dlqyText})
      vueData.$set(vueData.formData.main,"B0024",{value:data.fbcc,text:data.fbcc})
      vueData.$set(vueData.formData.main,"B0036",{value:data.zj})
      vueData.$set(vueData.formData.main,"B0012",{value:data.mobile})
      if(formData.main["G-REPORT-003"]){
      //   let zt=formData.main["G-REPORT-003"].value
      //   var zt_text="";
      //   if (zt==3){
      //     zt="4";
      //     zt_text="已调整";
      //   }else{
      //     zt='3';
      //     zt_text="已上报";
      //   }
      //   vueData.$set(vueData.formData.main,"G-REPORT-003",{value:zt,text:zt_text})
        vueData.$set(vueData.formData.main,"G-REPORT-002",{value:dsf.date.format(new Date(),"yyyy-mm-dd")})
      }
      if(!formData.main["G-REPORT-003"]){
        vueData.$set(vueData.formData.main,"G-REPORT-003",{value:"1",text:"未上报"})
        vueData.$set(vueData.formData.main,"G-REPORT-002",{value:dsf.date.format(new Date(),"yyyy-mm-dd")})
      }
    })
  }
  console.log(vueData.formData)
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return str
  }
  return new Promise(function(resolve,reject){

    function diffDays(date1, date2) {
      var dateSpan = date2 - date1;
      dateSpan = Math.abs(dateSpan);
      var iDays = dateSpan / (24 * 3600 * 1000); // Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays;
    }
    try {
      
      
      var rows=formData.multinfos['201125162630QutnSBMPdaduhwBGfpp'].rows;//行程
      var xc=0;
      var temp;
      for (var i=0;i<rows.length;i++){
        if (rows[i].action=="Deleted"){//代表是删除的子表数据
          continue;
        }
        var dd=rows[i]['G-REPORT-SUB-001'].value;
        if (!temp){
          temp=new Date(dd);
        }
        var ks=new Date(dd);
        if (ks<temp){
          temp=ks;
        }
        xc++;
      }
      var zcrows=formData.multinfos['201125163543B0OGv18khGZrN0mWosa'].rows;//主持工作
      var zc=0;
      for (var i=0;i<zcrows.length;i++){
        if (zcrows[i].action=="Deleted"){//代表是删除的子表数据
          continue;
        }
        zc++;
      }
      if (zc==0&&xc==0){
        reject("行程和主持工作必须添加一条!");
        return false
      }else if(xc==0){
        reject("行程必须添加一条!");
        return false
      }else if(zc==0){
        reject("主持工作必须添加一条!");
        return false
      }
      if (diffDays(new Date().getTime(),temp.getTime())<3){
        var bz= formData.main["B0060"].value;//备注
        if (!bz){
          reject("3天内行程需要写备注！");
          return false
        }
      }
      if(action=="custom1"){
        vueData.$set(formData.main, "G-REPORT-003", { value: "3", text: "已上报" })
      }
      resolve()
    } catch (error) {
      console.log(error)
      reject(error)
    }
    
    
    
  })
}
export default exportObj;