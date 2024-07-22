// 驻京办 我的用车
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.commonPopParam = {
      listId: '230525234633MIxqqAZDMn3iN5fbS8q',
      moduleId: '230523102055cOoY9pVw010urvDwG9x',
      params: {
      }
    }
    window["C-OA-TRANSPORT-SINGLE-0006_beforeOpenCode"] = function (fileRelaId, parameters, metaData, vueDataComp) {
      console.log(fileRelaId, parameters, metaData, vueDataComp)
      vueData.commonPop = true
      return ''
    }
  }
exportObj.choose = function (checkItems, vueData) {
    console.log("choose", checkItems);
    vueData.commonPop = false;
    vueData.$set(vueData.formData.main, "C-OA-TRANSPORT-SINGLE-0006", { value: checkItems[0].dataValue['A0001'], text: checkItems[0].dataValue['C-OA-VEHICLE-INFORMATION-0001'] })
  }
  window.spJS = exportObj
})()
