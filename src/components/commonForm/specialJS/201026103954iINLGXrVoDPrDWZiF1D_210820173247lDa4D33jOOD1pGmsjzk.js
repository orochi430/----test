// 民政部 司局发文
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log('司局发文')
  let wenhaoCtr = vueData.formMeta.controls.find(item => item.metaId == 'B0003')
  vueData.$set(wenhaoCtr, 'initruleid', wenhaoCtr.readonlyValue.ruleid || '')
  vueData.$bus.on("checkValToFilecode", function (busObj) {
    if(busObj.metaData.metaId == 'C-GW-FW-0202') {
      if(wenhaoCtr.privilege.editable){
        dsf.http.post('fn/ministry/sjfwgetruleidbyfwlx', {
          fwlx: formData.main['C-GW-FW-0202'].value
        }).then(res => {
          if(res.data.code == 200) {
            vueData.$set(wenhaoCtr, 'relateRuleid', res.data.data.filecodeid)
          }
        })
        return
      }
    }
  })
}
export default exportObj;