const exportObj = {};
let expiry = ''
exportObj.initHandle = function (formData, formStruct, vueData) {
  expiry = vueData.$route.query.expiry
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  vueData.$bus.on("selectDateTime", function(busObj){
    if(busObj.metaData.metaId=="S-USER-0088"){
      console.log(busObj)
      let start = filterTime(busObj.value)
      let end = expiry ? filterTime(expiry) : ''
      console.log(expiry)
      if (end && start > end) {
          vueData.$set(formData.main,'S-USER-0088',{value:""})
          
        dsf.layer.toast(`有效期必须早于本单位到期时间\n${expiry}`)
      }
    }
    console.log(busObj)
    console.log(vueData.formData)
  })
  if (!vueData.pk) {
    vueData.$set(vueData.formData.main, "S-USER-0106", {
      value: JSON.parse(vueData.$route.query.specialSaveObj).unit_id
    })
  }
}
exportObj.saveFilter = function (formData, formStruct, vueData,action) {
  function filterTime(time){
    var str=time.replace(/-/g,"/")
    return Date.parse(str)
  }
  return new Promise(function(resolve,reject){
    if (expiry !== undefined) {
      if(action=="save"||action=="send"){
        let endTime = expiry ? filterTime(expiry) : ''//休假结束时间
        let startTime = filterTime(formData.main["S-USER-0088"].value)//休假开始时间
        if(endTime && startTime>endTime){
            reject(`有效期必须早于本单位到期时间\n${expiry}`)
        }else{
          resolve()
        }
      } else {
        resolve()
      }
    }else{
      if(formData.main["S-USER-0007"].value) {
        vueData.$set(vueData.formData.main, "S-USER-0002", {value: formData.main["S-USER-0007"].value})
      }
      resolve()
    }
  })
}
exportObj.saveAfter=function(vueData,formData, formStruct){
  vueData.backSucces()
}
export default exportObj;
