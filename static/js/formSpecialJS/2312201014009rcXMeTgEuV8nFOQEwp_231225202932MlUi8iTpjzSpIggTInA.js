// 陕西一体化 厅级领导请假
(function () {
  const exportObj = {}
  exportObj.saveFilter = function (formData, formStruct, vueData) {
    return new Promise(function (resolve, reject) {
      let nowtime = moment(new Date).format("yyyy-MM-DD")
      let name = formData.main["231226162202fqJ0uPj0iRdkVZGvgdn"].text
      formData.main["B0001"].value = `${nowtime}${name}的请假申请单`
      resolve()
    })
  }
  window.spJS = exportObj
})();
