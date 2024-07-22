// 【山东烟草会务系统】防疫申报统计-已申报
import dsf from "../../../common";

const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  let fid = vueData.$route.query.secQuery ? JSON.parse(vueData.$route.query.secQuery).fid : vueData.$route.query.fid;
  vueData.$router.push({
    name: "SDYCConferenceED",
    params: { pk: itemValue.A0001 }
  });
}
exportObj.dataFilter = function (listData, vueData) {
  listData.forEach(element => {
    // 申报状态
    if (element.dataValue["220721144809bY1K8k3KrQd8mEifGz2.value"] == "0") {
      vueData.$set(element.dataValue, "220721144809bY1K8k3KrQd8mEifGz2", "<font color=\"#03b98b\">正常</font>")
      // vueData.$set(element.dataValue, "220721144809bY1K8k3KrQd8mEifGz2.txet", "<font color=\"#03b98b\">正常</font>")
    } else if (element.dataValue["220721144809bY1K8k3KrQd8mEifGz2.value"] == "1") {
      vueData.$set(element.dataValue, "220721144809bY1K8k3KrQd8mEifGz2", "<font color=\"#ff6200\">异常</font>")
      // vueData.$set(element.dataValue, "220721144809bY1K8k3KrQd8mEifGz2.valtxetue", "<font color=\"#ff6200\">异常</font>")
    }
  });
}
export default exportObj;
