// 司局用印
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$watch(function () {
      return formData.main;
    }, function (n, o) {
      //vueData.$forceUpdate();
      if (n["2012221715063KsUs7RKR9dYwh3ypoZ"] && n["2012221715063KsUs7RKR9dYwh3ypoZ"].value) {
        let userinfo = dsf.util.loadSessionStore("user");
        if(n["B0012"]) {
          n["B0012"].value = (userinfo && userinfo.mobile) || "";
        }
      } else {
        if(n["B0012"]) {
          n["B0012"].value = "";
        }
      }
    }, {
      deep: true,
      immediate: true,
    })
}
export default exportObj;