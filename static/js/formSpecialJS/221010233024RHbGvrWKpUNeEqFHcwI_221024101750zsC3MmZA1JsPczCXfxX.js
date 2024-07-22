// 济南市委党校】信息化耗材维护、申领
(function() {
  const exportObj = {};
  exportObj.saveAfter = function (vueData, formStruct, formData) {
    dsf.http.post("/ctrl/consumables/recalculate", { pk: vueData.formParams.pk })
  }
  exportObj.afterLogicDeleteXForm = function(formData, formMeta, VueData) {
    dsf.http.post("/ctrl/consumables/recalculate", { pk: vueData.formParams.pk })
  };
  window.spJS = exportObj;
})();
