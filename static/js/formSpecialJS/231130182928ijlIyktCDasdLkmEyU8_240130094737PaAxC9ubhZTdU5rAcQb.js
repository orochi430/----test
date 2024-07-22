// 陕西一体化 厅级领导请假
(function () {
    const exportObj = {}
    exportObj.saveFilter = function (formData, formStruct, vueData) {
      return new Promise(function (resolve, reject) {
        formData.main["B0001"].value = `${formData.main["A0025"].value}赴${formData.main["OA-DY-SURVEY-0008"].value}的调研办理申请`
        resolve()
      })
    }
    window.spJS = exportObj
  })();
  