// 陕西一体化 驻外办厅级请假（报备）审批单（移动端）
(function () {
  const exportObj = {}
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
      let nowtime = moment(new Date).format("yyyy-MM-DD")
      let name = formData.main["231226152833yaxgIkKxtCswQQzR8nG"].text
      formData.main["B0001"].value = `${nowtime}${name}的请假申请单`
      resolve()
    })
  }
  window.spJS = exportObj
})();
