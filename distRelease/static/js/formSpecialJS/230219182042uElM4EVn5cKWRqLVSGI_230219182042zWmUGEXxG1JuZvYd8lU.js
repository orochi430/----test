//电气oa 签章申请表-公司级
(function () {
  const exportObj = {};
  //申请类型 主要负责人属性联动
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
      if (formData.main["C-SEAL-APPLIFORM-006"].text == "单位公章") {
        resolve()
      } else if (formData.main["C-SEAL-APPLIFORM-006"].text.includes("主要负责人签章") && formData.main["C-SEAL-APPLIFORM-008"].value == "") {
        reject("请选择主要负责人")
      } else resolve()
    })
  }
  window.spJS = exportObj;
})();
