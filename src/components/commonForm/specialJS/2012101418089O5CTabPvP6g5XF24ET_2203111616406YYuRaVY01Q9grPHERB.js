import dsf from "../../../common";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {}
exportObj.initHandle = function (formData, formStruct, vueData) {

}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {

  return new Promise(function (resolve, reject) {
    resolve()
  })
}

exportObj.documentFiling = function (formData, formStruct, vueData) {
  if (vueData.nowButton.parameters[0].value == "csgd") {
    function saveAfter() {
      dsf.http.post(`fn/archives/todept`, {
          pk: vueData.pk
        })
        .then(res => {
          if (res.data.type == "success") {
            dsf.layer.toast(res.data.message);
            vueData.$eventBus.refresh(vueData);
            setTimeout(() => {
              vueData.$router.go(-2)
            }, 1000);
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
    }
    vueData.buttonHandle["save"](
      vueData.$route.params,
      vueData.formMeta,
      vueData.formData,
      vueData,
      vueData.$refs,
      saveAfter
    );
  } else if (vueData.nowButton.parameters[0].value == "dasgd") {
    function saveAfter() {
      dsf.http.post(`fn/archives/toarchive`, {
          pk: vueData.pk,
          module_id: vueData.moduleId
        })
        .then(res => {
          if (res.data.type == "success") {
            dsf.layer.toast(res.data.message);
            vueData.$eventBus.refresh(vueData);
            setTimeout(() => {
              vueData.$router.go(-2)
            }, 1000);
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
    }
    vueData.buttonHandle["save"](
      vueData.$route.params,
      vueData.formMeta,
      vueData.formData,
      vueData,
      vueData.$refs,
      saveAfter
    );

  }

}
export default exportObj;
