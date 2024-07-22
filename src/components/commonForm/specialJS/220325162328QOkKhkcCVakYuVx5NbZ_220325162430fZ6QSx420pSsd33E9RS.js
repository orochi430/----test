
//上海地产  房源管理
const exportObj = {};
exportObj.saveAfter = function (vueData, formStruct, formData) {
  dsf.layer.toast("表单保存成功", null, () => {
    vueData.$eventBus.refresh(vueData);
    if (!vueData.pk) {
      vueData.$router.replace({
        path: "/commonForm/" + vueData.moduleId + "/" + vueData.pk
      });
    }
  })
}

function changeType() {
  window["220513201635mvLQr5jrPrTngcmMXhU_beforeOpenCode"] = function (formData, url) {
    let tempurl = url.split('?')[0] + "?projectId=" + formData.main["C-IM-SPACE-037"].value
    return tempurl;
  };
  window["220513201809v9TGFYMGOirhYbOfNJP_beforeOpenCode"] = function (formData, url, vueData) {
    let buildId = formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[vueData.subFormIndex]["220513201635mvLQr5jrPrTngcmMXhU"].value
    let tempurl = url.split('?')[0] + "?projectId=" + formData.main["C-IM-SPACE-037"].value + "&buildingId=" + buildId
    return tempurl;
  };
  window["220513201908F1JxdmM6Vc1gAhxOvAa_beforeOpenCode"] = function (formData, url, vueData) {
    let buildId = formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[vueData.subFormIndex]["220513201635mvLQr5jrPrTngcmMXhU"].value
    let floorId = formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[vueData.subFormIndex]["220513201809v9TGFYMGOirhYbOfNJP"].value
    let tempurl = url.split('?')[0] + "?projectId=" + formData.main["C-IM-SPACE-037"].value + "&buildingId=" + buildId + "&floorId=" + floorId
    return tempurl;
  };
}

/*由于需求变更，此方法暂时不用 */
function clearData(index, formData, formStruct, vueData) {
  if (index > 0) {
    vueData.$set(formData.main, "C-IM-SPACE-041", {
      value: "",
      text: ""
    })
  }
  if (index > 1) {
    vueData.$set(formData.main, "C-IM-SPACE-040", {
      value: "",
      text: ""
    })
  }
  if (index > 2) {
    vueData.$set(formData.main, "C-IM-SPACE-039", {
      value: "",
      text: ""
    })
  }
}
function calcAreaAndInitSpaceType(formData, formStruct, vueData) {
  console.log("formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows", formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows);
  let spaceType = "";
  let spaceValue = "";
  let area = 0;
  formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows.forEach(element => {
    spaceType = element["c-res-space-008"].value
    area += parseFloat(element["c-res-space-009"].value);
  });
  if (formStruct.controls.find(n => n.metaId == "C-IM-SPACE-009").enumData.find(m => m.text == spaceType)) {
    spaceValue = formStruct.controls.find(n => n.metaId == "C-IM-SPACE-009").enumData.find(m => m.text == spaceType).value;
  }
 // vueData.$set(formData.main, "C-IM-SPACE-009", { value: spaceValue, text: spaceType })
  vueData.$set(formData.main, "C-IM-SPACE-010", { value: area.toFixed(2) })

}
function change(formData, formStruct, vueData) {
  if (formData.main["C-IM-SPACE-046"].value.length) {
    vueData.$set(vueData.formData.main, "C-IM-SPACE-036", { value: "1", text: "是" })
  } else {
    vueData.$set(vueData.formData.main, "C-IM-SPACE-036", { value: "2", text: "否" })
  }
}

exportObj.initHandle = function (formData, formStruct, vueData) {
    //地产提出无理需求  非得添加默认值 导致下拉框默认值不匹配 拟稿清零
    if(formData.main['A0040'].value == '拟稿中'){
      formData.main['C-IM-SPACE-038'].value = ''
    }
    
    if(formData.main['C-IM-SPACE-009'].text != '' && formData.main['C-IM-SPACE-009'].text != '商业'){
      let strVa = ''
      vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows.forEach(item =>{
        strVa +=item['220513201908F1JxdmM6Vc1gAhxOvAa'].value+','
      })
      const pams ={
        spaceIds: strVa,
        purpose1: formData.main['C-IM-SPACE-009'].value,
        purpose2: '',
        type:2
      }
      // 判断请求的接口                     
      if(formData.main['C-IM-SPACE-009'].text != '商业'){
        dsf.http.post("fn/enclosure/getFyPrice",pams).then(({data})=>{
          if(data.code == '500'){
            dsf.layer.toast(data.message)
          }else if(data.code == '200'){
            let jt = data.data.jtpgzdj
            dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
              if(data.code == '200'){
                if(data.data.zdj == false){
                  formData.main['C-IM-SPACE-053'].value = jt
                }else{                
                  formData.main['C-IM-SPACE-052'].value = jt
                }
                if(data.data.zjj == false){
                  formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = '*'
                }
              }
            })
            if(vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows.length > 0){
              let formValueid = vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['220519113003oVyOtN0vIc6ilH4oTZE'].value
                if(data.data.ysqyzjj[0][formValueid] != -1){
                 formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = ''
                 formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = data.data.ysqyzjj[0][formValueid]
                }
            }
          }
        })
      }
    }else if(formData.main['C-IM-SPACE-051'].text != '' && formData.main['C-IM-SPACE-009'].text == '商业'){
      let strVa = ''
      vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows.forEach(item =>{
        strVa +=item['220513201908F1JxdmM6Vc1gAhxOvAa'].value+','
      })
      const pam ={
        spaceIds: strVa,
        purpose1: formData.main['C-IM-SPACE-009'].value,
        purpose2: formData.main['C-IM-SPACE-051'].value,
        type:2
      }
       if(formData.main['C-IM-SPACE-009'].text == '商业' && formData.main['C-IM-SPACE-051'].text != ''){      
        dsf.http.post("fn/enclosure/getFyPrice",pam).then(({data})=>{
          if(data.code == '500'){
            dsf.layer.toast(data.message)
          }else if(data.code == '200'){
            let jt = data.data.jtpgzdj
            dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
              if(data.code == '200'){
                if(data.data.zdj == false){
                  formData.main['C-IM-SPACE-053'].value = ''
                  formData.main['C-IM-SPACE-053'].value = jt
                }else{
                  formData.main['C-IM-SPACE-052'].value = ''
                  formData.main['C-IM-SPACE-052'].value = jt
                }
                if(data.data.zjj == false){
                  formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = '*'
                }
              }
            })
            if(vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows.length > 0){
             let formValueid = vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['220519113003oVyOtN0vIc6ilH4oTZE'].value
               if(data.data.ysqyzjj[0][formValueid] != -1){
                formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = ''
                formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = data.data.ysqyzjj[0][formValueid]
            }
            }
            
          }
        })
      }
    }

    dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
          console.log(data);
          if(data.code == '200'){
            if(data.data.zdj == false){
              formData.main['C-IM-SPACE-052'].value = '*'
            } 
            if(data.data.zjj == false){
              formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = '*'
              // vueData.$set(formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['ace-099'], "value", "*")
            }
          
          }
    })
  change(formData, formStruct, vueData)

  vueData.$bus.on("blurBus", function (busObj) {
    if (busObj.metaData.metaId == "C-IM-SPACE-046") {
      change(formData, formStruct, vueData)
    }
  });

  vueData.$bus.on("selectUserBus", function (busObj) {
    //选择项目名称
    if (busObj.metaData.metaId == "C-IM-SPACE-037") {
      changeType()
      //clearData(3, formData, formStruct, vueData)
    }
    // if (busObj.metaData.metaId == "C-IM-SPACE-039") {
    //   //clearData(2, formData, formStruct, vueData)
    // }
    // if (busObj.metaData.metaId == "C-IM-SPACE-040") {
    //   //clearData(1, formData, formStruct, vueData)
    // }
    //选择房号
    if (busObj.metaData.metaId == "220513201908F1JxdmM6Vc1gAhxOvAa") {
      let spaceId = formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[busObj.subFormIndex]["220513201908F1JxdmM6Vc1gAhxOvAa"].value
      //检查子表是否已存在房号
      // if(formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows.findIndex(n=>n["220513201908F1JxdmM6Vc1gAhxOvAa"].value==spaceId)>-1){
      //   alert("您已重复选择房号："+formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[busObj.subFormIndex]["220513201908F1JxdmM6Vc1gAhxOvAa"].text);
      //   return;
      // }
      dsf.http.post("fn/fygl/getSpaceDetails", { spaceId: spaceId }).then(({ data }) => {
        vueData.$set(formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[busObj.subFormIndex]["c-res-space-080"], 'value', data.data.cqf)
        vueData.$set(formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[busObj.subFormIndex]["c-res-space-071"], 'value', data.data.jyf) //经营方
        vueData.$set(formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[busObj.subFormIndex]["c-res-space-008"], 'value', data.data.spaceType) //业态
        vueData.$set(formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[busObj.subFormIndex]["c-res-space-009"], 'value', data.data.maxArea) //可租赁面积
        vueData.$set(formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[busObj.subFormIndex]["c-res-space-013"], 'value', data.data.lowPrice)
        vueData.$set(formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[busObj.subFormIndex]["c-res-space-081"], 'value', data.data.contractValue)
        vueData.$set(formData.multinfos["220511171325ethChZNde5NphADcHPU"].rows[busObj.subFormIndex]["c-res-space-077"], 'value', data.data.merchant)

        //加载完新增的楼号数据后，需要完成对子表的重新计算，计算出可租赁面积和初始化业态；
        calcAreaAndInitSpaceType(formData, formStruct, vueData)
      })
    }

  })

  //计算两个日期之差
  function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime); //开始时间
    var eTime = new Date(endTime); //结束时间

    // if (sTime > eTime) {
    //   return false;
    // }
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
      case "second":
        divNum = 1000;
        break;
      case "minute":
        divNum = 1000 * 60;
        break;
      case "hour":
        divNum = 1000 * 3600;
        break;
      case "day":
        divNum = 1000 * 3600 * 24;
        break;
      default:
        break;
    }
    var ts = parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
    return ts;
  }
  function changeDate() {
    if (formData.main['C-IM-SPACE-020'].value.length) {
      let rentDay = formData.main['C-IM-SPACE-020'].value.replace(/-/g, "/");
      let newDate = new Date();
      var year = newDate.getFullYear();
      var month = newDate.getMonth() + 1;
      var dates = newDate.getDate();
      var diffDays = GetDateDiff(year + "/" + month + "/" + dates, rentDay, 'day');
      if (diffDays > 0) {
        vueData.$set(formData.main, "C-IM-SPACE-017", { value: "1", text: "在租" })
      } else {
        vueData.$set(formData.main, "C-IM-SPACE-017", { value: "2", text: "待租" })
      }
    }
  }
  changeDate();
  vueData.$bus.on("selectDateTime", function (busObj) {
    //C-IM-SPACE-017 租赁状态
    if (busObj.metaData.metaId == "C-IM-SPACE-020") {
      changeDate()
    }
  });

  //监控表单控件值变化，改变其他控件值
  vueData.$watch(function () {
    return formData.multinfos['220511171325ethChZNde5NphADcHPU'];
  }, function (newValue, oldValue) {
    calcAreaAndInitSpaceType(formData, formStruct, vueData)
  }, {
    deep: true
  });

  vueData.$bus.off("checkVal").on("checkVal",function (busObj){
    if(busObj.metaData.metaId == 'C-IM-SPACE-009'){
      let strVa = ''
      vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows.forEach(item =>{
        strVa +=item['220513201908F1JxdmM6Vc1gAhxOvAa'].value+','
      })
      const pams ={
        spaceIds: strVa,
        purpose1: formData.main['C-IM-SPACE-009'].value,
        purpose2: '',
        type:2
      }
      // 判断请求的接口                     
      if(formData.main['C-IM-SPACE-009'].text != '商业'){
        dsf.http.post("fn/enclosure/getFyPrice",pams).then(({data})=>{
          if(data.code == '500'){
            dsf.layer.toast(data.message)
          }else if(data.code == '200'){
            let jt = data.data.jtpgzdj
            dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
              if(data.code == '200'){
                if(data.data.zdj == false){
    
                  formData.main['C-IM-SPACE-053'].value = jt
                }else{
                
                  formData.main['C-IM-SPACE-052'].value = jt
                }
              }
            })
            if(vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows.length > 0){
              let formValueid = vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['220519113003oVyOtN0vIc6ilH4oTZE'].value
                if(data.data.ysqyzjj[0][formValueid] != -1){
                 formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = ''
                 formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = data.data.ysqyzjj[0][formValueid]
                }
            }
          }
        })
      }
    }else if(busObj.metaData.metaId == 'C-IM-SPACE-051'){
      let strVa = ''
      vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows.forEach(item =>{
        strVa +=item['220513201908F1JxdmM6Vc1gAhxOvAa'].value+','
      })
      const pam ={
        spaceIds: strVa,
        purpose1: formData.main['C-IM-SPACE-009'].value,
        purpose2: formData.main['C-IM-SPACE-051'].value,
        type:2
      }
       if(formData.main['C-IM-SPACE-009'].text == '商业' && formData.main['C-IM-SPACE-051'].text != ''){      
        dsf.http.post("fn/enclosure/getFyPrice",pam).then(({data})=>{
          if(data.code == '500'){
            dsf.layer.toast(data.message)
          }else if(data.code == '200'){
            let jt = data.data.jtpgzdj
            dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
              if(data.code == '200'){
                if(data.data.zdj == false){
                  formData.main['C-IM-SPACE-053'].value = ''
                  formData.main['C-IM-SPACE-053'].value = jt
                }else{
                  formData.main['C-IM-SPACE-052'].value = ''
                  formData.main['C-IM-SPACE-052'].value = jt
                }
              }
            })
            if(vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows.length > 0){
             let formValueid = vueData.formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['220519113003oVyOtN0vIc6ilH4oTZE'].value
               if(data.data.ysqyzjj[0][formValueid] != -1){
                formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = ''
                formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value = data.data.ysqyzjj[0][formValueid]
            }
            }
            
          }
        })
      }
    }
  })

}


exportObj.saveFilter = function (formData, formStruct, vueData, action) {
  let strs = formData.main['C-IM-SPACE-006'].value
  return new Promise(function (resolve, reject) {
    
    let str = '系统分析到'+strs
    +'集团指导价或企业指导价暂无 是否继续?'

    if (formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows.length <= 0) {
      dsf.layer.toast("须含有至少一条原始房源的子表信息");
      reject();
    } else {
      let build = formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]["220513201635mvLQr5jrPrTngcmMXhU"].value
      let floor = formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]["220513201809v9TGFYMGOirhYbOfNJP"].value
      let room = formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]["220513201908F1JxdmM6Vc1gAhxOvAa"].value
      if (build == "" || floor == "" || room == "") {
        dsf.layer.toast("请填写完整的原始房源信息");
        reject();
       }
    }

    if(formData.main['C-IM-SPACE-052'].value =='' ||formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value == ''){
      dsf.layer.confirm({
      message:str,
      title:'提示',
      confirmButtonText:'确定'
      },()=>{
        let fangY = formData.main['C-IM-SPACE-038'].value
        formData.main['C-IM-SPACE-038'].value = '26,'+fangY
        resolve()
      },()=>{
        reject()
      })
    }

        if (!vueData.pk) {
          dsf.http.post("fn/fygl/getId").then(({ data }) => {
            //fn/UpdateGNRInfoController/updateInfo
            console.log(data);
            dsf.http.post("fn/UpdateGNRInfoController/updateInfo", { moduleId: vueData.moduleId, oldId: vueData.formParams.pk, newId: data.data.id }).then(({ data }) => {
              console.log("fn/UpdateGNRInfoController/updateInfo", data)
            });
            let temp_pk = data.data.id
            vueData.pk = temp_pk
            vueData.formParams.pk = temp_pk
            vueData.$set(formStruct.parameters, 'pk', temp_pk)
            vueData.$set(formData.main, 'A0001', { value: temp_pk })
            if(formData.main['C-IM-SPACE-052'].value !='' &&
            formData.multinfos['220511171325ethChZNde5NphADcHPU'].rows[0]['c-res-space-099'].value != ''){
              let fangY = formData.main['C-IM-SPACE-038'].value
              formData.main['C-IM-SPACE-038'].value = '26,'+fangY
              resolve()
            }
          })
        }
    
  })
}
export default exportObj;
