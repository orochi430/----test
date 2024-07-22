import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
// 四川用餐审批
exportObj.handle = function (formData, formStruct) {
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  vueData.$bus.on("inpBus", function(busObj) {
    if(busObj.metaData.metaId=="B0020" || busObj.metaData.metaId=="210629203321TnaKdDc51gx7VgKPC2Y"){
      let count = (Number(vueData.formData.main["B0020"].value || 0)) + (Number(vueData.formData.main["210629203321TnaKdDc51gx7VgKPC2Y"].value || 0))
      vueData.$set(vueData.formData.main["B0038"],"value",count)
    }
  })
}
export default exportObj;
