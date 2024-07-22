/**
 * 上海地产 客户库表单
 */
const exportObj = {};
let flag = false
let shxydm // 客户库的信用代码
exportObj.initHandle = function (formData, formStruct, vueData) {
  function requiredRQ_004 (busObj) {
    let RQ_004 = formStruct.controls.find(item => item.metaId == "RQ-SPACE-CUSTOMER-004").validator
    if(busObj.text !== "其他") {
      vueData.$set(RQ_004, 'required', {})
    } else {
      vueData.$delete(RQ_004, 'required')
    }
  }
  // 必填检验初始化 
  requiredRQ_004(formData.main["RQ-SPACE-CUSTOMER-002"])
  
  vueData.$bus.on("blurBus", function (busObj) {
    if (busObj.metaData.metaId === "RQ-SPACE-CUSTOMER-001" && formData.main["RQ-SPACE-CUSTOMER-002"].value == "1") {
      // 请求信用代码
      dsf.http.post("fn/customerDb/getQiXinBaoData", { content: busObj.value }).then((res) => {
          let result = res.data.data;
          if(result == "") {
            formData.main["RQ-SPACE-CUSTOMER-004"].value = ""
            formData.main["RQ-SPACE-CUSTOMER-001"].value = ""
          } else {
            formData.main["RQ-SPACE-CUSTOMER-004"].value = result
          }
        });
    }
  });
  vueData.$bus.on("selectUserBus", function(busObj){
    if(busObj.metaData.metaId === "RQ-SPACCE-CUSTOMER-005") {
        shxydm = busObj.selectArr[0].attrs.shxydm
    }
  })
  vueData.$bus.on("checkVal", function(busObj){
    if(busObj.metaData.metaId === "RQ-SPACE-CUSTOMER-002") {
      requiredRQ_004(busObj)
    }
  })
};
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    // 类型为企业，客户库已 选择
    if(formData.main["RQ-SPACE-CUSTOMER-002"].value == "1" && shxydm){
      flag = shxydm == formData.main["RQ-SPACE-CUSTOMER-004"].value ? true : false 
      flag ? "" : reject("社会信用代码和主数据平台不相同")
    }
    // 任何时候，保存前需要调用接口
   dsf.http.post("fn/customerDb/checkExists", {socialNo: formData.main["RQ-SPACE-CUSTOMER-004"].value}).then((res) => {
      res.data.data == "true" ? reject("社会信用代码重复") : ""
    }
   )
    //主表
    if (!vueData.pk) {
      dsf.http.post("fn/commonTool/getIdByTableName", {
          tableName: "rq_space_customer",
          dbName: "ImBzServiceConnection",
        }).then(({ data }) => {
          let temp_pk = data.data.id;
          dsf.http.post("fn/UpdateGNRInfoController/updateInfo", {
              oldId: vueData.formParams.pk,
              newId: temp_pk,
              moduleId: formStruct.parameters.moduleId,
            }).then(({ data }) => {
              vueData.pk = temp_pk;
              vueData.formParams.pk = temp_pk;
              vueData.$set(formStruct.parameters, "pk", temp_pk);
              vueData.$set(formData.main, "A0001", { value: temp_pk });
              resolve();
            });
        });
    } else {
      dsf.http.post("fn/UpdateGNRInfoController/updateInfo", {
          oldId: vueData.pk,
          newId: vueData.pk,
          moduleId: formStruct.parameters.moduleId,
        }).then(({ data }) => {
          resolve();
        });
    }
  });
};
export default exportObj;
