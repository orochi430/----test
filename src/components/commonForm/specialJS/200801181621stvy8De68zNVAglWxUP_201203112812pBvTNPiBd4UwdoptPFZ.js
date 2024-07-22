// 公司OA系统项目启动表单
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {}

exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log(vueData.formData)
  vueData.$bus.on("inpBus", function (busObj) {
    if (busObj.metaData.metaId == "C-XMXXDJ-0058" || busObj.metaData.metaId == "C-XMXXDJ-0143") {
      let count = Number(vueData.formData.main["C-XMXXDJ-0143"].value) * Number(vueData.formData.main["C-XMXXDJ-0058"].value)
      vueData.$set(vueData.formData.main["C-XMXXDJ-0172"], "value", count)
    }
    if (busObj.metaData.metaId == "C-XMXXDJ-0060" || busObj.metaData.metaId == "C-XMXXDJ-0144") {
      let count = Number(vueData.formData.main["C-XMXXDJ-0060"].value) * Number(vueData.formData.main["C-XMXXDJ-0144"].value)
      vueData.$set(vueData.formData.main["C-XMXXDJ-0171"], "value", count)
    }
  })
}
exportObj.saveFilter = function (formData, formStruct, vueData) {
  return new Promise(function (resolve, reject) {
    resolve()
  })
}
export default exportObj;
