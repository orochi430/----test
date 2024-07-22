// 一体化办公厅 收文批示件
; (function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    dsf.http.post('ctrl/instructions/showLeaderComments', { fid: vueData.pk }).then(res => {
      if (res.data.code == 200 && res.data.data) {
        vueData.$set(formData.main, 'B0045', { value: res.data.data })
        let ctr = formStruct.controls.find(ctrl => ctrl.metaId == 'B0045')
        if(ctr) ctr.show = 1
      }
    })
  }

  window.spJS = exportObj
})()
