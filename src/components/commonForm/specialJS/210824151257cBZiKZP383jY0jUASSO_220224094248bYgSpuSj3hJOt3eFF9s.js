import dsf from "../../../common";
//杭州校历征集表单
const exportObj = {};
exportObj.handle = function (formData, formStruct) {

}

exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("blurBus", function (busObj) {
    if (busObj.metaData.metaId == "B0001") {
      console.log(busObj)
      if (busObj.value.length) {
        vueData.$set(formData.main["220406153510ScBXoaxNTimV3ngPO7x"],"value","你有一条待填写的校历征集单【"+ busObj.value+"】，请及时填写！")
      }
      
    }
  })
}
export default exportObj;
