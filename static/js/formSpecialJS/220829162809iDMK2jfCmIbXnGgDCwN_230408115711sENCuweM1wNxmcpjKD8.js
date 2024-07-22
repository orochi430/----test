(function () {
  // 8135项目库不显示相关文件tab
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (vueData.formTabs) {
      let tab = vueData.formTabs.findIndex(tab => tab.name == "relevantFile");
      if (tab >= 0) {
        vueData.formTabs.splice(tab, 1)
      }
    }
  }

  window.spJS = exportObj;
})();
