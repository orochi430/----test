
  const exportObj = {};
  let ids = []
  exportObj.initHandle = function(formData, formStruct, vueData) {
    vueData.$bus.on("subFormSelect", function(busObj) {
      busObj.checkItems.forEach(item => ids.push(item.dataValue.id) )
      vueData.$refs.formTab[0].$refs[busObj.subFormId][0].$refs.subform.commonPopParam.params.ids = ids.join(",")
    });
    vueData.$bus.on("subFormDelete", function(busObj) {
      ids.splice(busObj.subFormIndex,1)
      vueData.$refs.formTab[0].$refs[busObj.subFormId][0].$refs.subform.commonPopParam.params.ids = ids.join(",")
    });
    window["C-FRONTIER-MGMT-001_beforeOpenCode"] = function (formData, url,vueDataNew) {   
      let tempurl = `/fn/user/select/new/data?action=self_org&types=person&rootObject=2&metaKey=C-FRONTIER-MGMT-001&t=${Date.parse(new Date())}&moduleId=220119160204Ki0mHV4X7GFcNUMcktb`
      return tempurl 
    }
  };
exportObj.beforeInitAsync = function(formData, formStruct, vueData) {
  formStruct.controls.find(item => item.metaId == "C-FRONTIER-MGMT-001").controlType = "controlUser"
}
export default exportObj;