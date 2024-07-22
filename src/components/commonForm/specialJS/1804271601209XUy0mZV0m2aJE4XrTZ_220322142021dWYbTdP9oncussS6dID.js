// 请假审批
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  console.log(vueData.formData)
  vueData.$bus.on("selectDateTime", function(busObj){
    if(busObj.metaData.metaId=="S-USER-0088"){
      console.log(busObj)
      let start = filterTime(busObj.value)
      let end = filterTime(formData.main["S-ORGANIZE-0096"].value)
      if (start > end) {
          vueData.$set(formData.multinfos['220322142106XTP0SeBGcdP1AuaNnkt'].rows[busObj.subFormIndex],'S-USER-0088',{value:""})
          
        dsf.layer.toast("有效期必须早于本单位授权到期时间")

      }
    }
    console.log(busObj)
    console.log(vueData.formData)
  })
}

export default exportObj;