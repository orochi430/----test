const exportObj = {};

exportObj.saveAfter = function (vueData, params,formData) {
  if (vueData.$route.params.pk || vueData._pk) {
    dsf.layer.toast("表单保存成功")
    vueData.$router.replace({
      path: `/commonTabs/JGGL`,
      query: {
        moduleId: vueData.$route.params.moduleId || vueData._moduleId,
        pk: vueData.$route.params.pk || vueData._pk,
        method: 'edit',
        listId: '220325190647yQ6mQJYbbIcmNQr0dv5',
        expiry: formData.main['S-ORGANIZE-0096'].value
      }
    });
    vueData.$eventBus.refresh(this);
    //vueData.backSucces()
  } else {
    let pk = vueData.formParams.pk
    let moduleId = vueData.formParams.moduleId
    dsf.layer.toast("表单保存成功", undefined, () => {
      vueData.$router.replace({
        path: `/commonTabs/JGGL`,
        query: {
          moduleId: moduleId,
          pk: pk,
          method: 'edit',
          listId: '220325190647yQ6mQJYbbIcmNQr0dv5',
          expiry: formData.main['S-ORGANIZE-0096'].value
        }
      });
    });
  }
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    try {
      resolve()
    } catch (error) {
      resolve()
    }
  })
}
export default exportObj;
