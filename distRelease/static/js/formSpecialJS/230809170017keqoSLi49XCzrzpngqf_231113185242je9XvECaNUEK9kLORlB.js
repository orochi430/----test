/**
 * 一体化办公厅 请假申请
 */
;(function () {
  const exportObj = {}

  exportObj.initHandle = function (formData, formStruct, vueData) {
    dsf.http.post('ctrl/p2433leave/getAuditInfo', { pk: vueData.pk }).then(res => {
      if (res.data.code == '200') {
        formStruct.controls.find(ctr => ctr.controlType=='LabelForTextControl').label += '<br/><br/>' + res.data.data
      }
    })
    formStruct.buttons.mainButtons = formStruct.buttons.mainButtons.filter(btn => btn.action == 'custom1')
  }
  exportObj.custom1 = function (formData, formStruct, vueData) {
    vueData.handleActionClick("send")
  }
  //导出
  window.spJS = exportObj
})()

