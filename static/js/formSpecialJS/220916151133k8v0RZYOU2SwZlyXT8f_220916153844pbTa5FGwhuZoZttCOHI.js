// 皖政通个人待办
(function () {
  const exportObj = {};

  exportObj.doneMyRemind = function (formData, formStruct, vueData) {
    dsf.http.get('/ctrl/myRemind/done', { myRemindId: vueData.pk }).then(res => {
      if (res.data.code == 200) {
        dsf.layer.toast('操作成功')
        vueData.backSucces()
      } else {
        dsf.layer.toast('操作失败')
      }
    })
  }
  exportObj.saveAfter = function (vueData, formStruct, formData) {
    dsf.layer.toast('提交成功', undefined, () => {
      vueData.backSucces()
    })
  }
  window.spJS = exportObj;
})();
