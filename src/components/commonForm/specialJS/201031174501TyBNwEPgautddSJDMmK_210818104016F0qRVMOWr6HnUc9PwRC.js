// 司局用印
import dsf from "../../../common";
import util from "@/common/util";
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
    vueData.$watch(function () {
      return formData.main;
    }, function (n, o) {
      //vueData.$forceUpdate();
      if (n["201222152706VzplZcTjkQ4Kd0WEAvZ"] && n["201222152706VzplZcTjkQ4Kd0WEAvZ"].value) {
        let userinfo = dsf.util.loadSessionStore("user");
        if(n["B0038"]) {
          n["B0038"].value = (userinfo && userinfo.mobile) || "";
        }
      } else {
        if(n["B0038"]) {
          n["B0038"].value = "";
        }
      }
    }, {
      deep: true,
      immediate: true,
    })
}
export default exportObj;