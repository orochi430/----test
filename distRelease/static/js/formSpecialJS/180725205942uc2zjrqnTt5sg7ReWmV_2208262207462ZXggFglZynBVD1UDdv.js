(function() {
  const exportObj = {};
  exportObj.closeDialogCallback = function(formData, formStruct, vueData) {
    vueData.backSucces();
  };
  exportObj.reply = function(formData, formStruct, vueData) {
    vueData.buttonHandle['noteReply'](formStruct.parameters, "", "", vueData, "")
  };
  exportObj.forward = function(formData, formStruct, vueData) {
    vueData.buttonHandle['noteForward'](formStruct.parameters, "", "", vueData, "")
  };

  window.spJS = exportObj;
})();
