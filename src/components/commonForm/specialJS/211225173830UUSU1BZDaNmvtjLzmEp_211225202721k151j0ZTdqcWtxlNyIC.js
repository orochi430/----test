// 杭州用印申请
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
    
}
function sumcount(vueData){
  let temp1 = 0;
  let temp2 = 0;
  let temp3 = 0;
  let temp4 = 0;
  vueData.formData.multinfos["211225175040eTuhtngG6CBrzWHIjTV"].rows.forEach(item => {
    temp1 += Number(item["211225174708xWiJKLrd3fXXYV2Qvxh"].value)
    temp2 += Number(item["211225174749PMAoePu0djlGsCvr1kT"].value)
    temp3 += Number(item["211225174855kRTXyJ94DJghMeCy1Po"].value)
    temp4 += Number(item["B0014"].value)
  })
  vueData.$set(vueData.formData.main["211225173847u9g6UZv5rFItgHTRvku"], "value", temp1)
  vueData.$set(vueData.formData.main["211225175345Qw7zlqSBa3M6udgkf0N"], "value", temp2)
  vueData.$set(vueData.formData.main["220104150038turQlAaCJfzmA6tLdPg"], "value", temp3)
  vueData.$set(vueData.formData.main["22010415020966eXxKX1XPONnZOE3UP"], "value", temp4)
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  sumcount(vueData)
  vueData.$bus.on("inpBus", function (busObj) {
    if (busObj.metaData.metaId == "211225174708xWiJKLrd3fXXYV2Qvxh"
    ||busObj.metaData.metaId =="211225174749PMAoePu0djlGsCvr1kT"
    ||busObj.metaData.metaId =="211225174855kRTXyJ94DJghMeCy1Po"
    ||busObj.metaData.metaId =="B0014") {
      sumcount(vueData)
    }
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function(resolve,reject){
    try {
      resolve()
    } catch (error) {
      resolve()
    }
  })
}
export default exportObj;