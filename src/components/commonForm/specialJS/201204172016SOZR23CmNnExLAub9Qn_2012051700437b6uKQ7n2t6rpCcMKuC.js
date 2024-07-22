// 公司OA项目立项表单特殊JS
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.handle = function (formData, formStruct) {
 
}
exportObj.saveAfter = function (vueData, formData, formStruct) {
  //vueData.$router.go(-1)
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  console.log(formData)

  function createXmbh() {
    debugger
    dsf.http.post("fn/ProjectInfo/getSettings", "").then(
      ({data}) => {
        debugger
        if (data && data.type === "success") {
          vueData.$set(vueData.formData.main["B0014"], "value", data.data.newXmbhSeqNum)
          let xmlx = vueData.formData.main["B0056"].value;
          let province = vueData.formData.main["C-XMLX-021"].value;
          let cplx = vueData.formData.main["C_XMLX_004"].value;
          let zzyhlx = vueData.formData.main["C-XMLX-020"].value;
          let number = vueData.formData.main["B0014"].value;
          if (xmlx == "5" || xmlx == "10" || xmlx == "15") {
            xmlx = "K";
          } else if (xmlx == "20" || xmlx == "25" || xmlx == "35") {
            xmlx = "Y";
          } else if (xmlx == "30") {
            xmlx = "C";
          } else if (xmlx == "40") {
            xmlx = "J";
          } else if (xmlx == "45") {
            xmlx = "Q";
          }
          let xmbh = xmlx + province + cplx + zzyhlx + data.data.currentYear + (number < 1000 ? "0" + number : number);
          vueData.$set(vueData.formData.main["B0045"], "value", xmbh)
        }
      }
    );
  }
  if (formStruct.parameters.nodeId == "S6rLNyhYtPFGYbi") {
    createXmbh();
  }

}
exportObj.saveFilter = function (formData, formStruct, vueData, action) {

  return new Promise(function (resolve, reject) {
    resolve()
  })

}

export default exportObj;
