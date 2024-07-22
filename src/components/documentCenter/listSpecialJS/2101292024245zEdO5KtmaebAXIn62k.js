import dsf from "../../../common"
import dd from "dingtalk-jsapi"
import B64 from "@/common/base64"
import qs from "qs"

// 中台统一消息
const exportObj = {}
exportObj.initHandle = function (vueData) {
  vueData.readStatusKey = "S-REMIND-0017"
  vueData.haveReadVal = 1
}
function getQueryVariable(url, variable) {
  var query = url.split("?")[1]
  var vars = query.split("&")
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=")
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}
exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
  await dsf.http
    .post("ctrl/unifyOfficeInfo/requestChangeRead", {
      dataId: itemValue["S-BASE-0001.value"],
      type: "toremindunify",
      appCode: itemValue["S-REMIND-0031.value"]
    })
    .then(res => {
      itemValue["S-REMIND-0017.value"] = 1
      itemValue["S-REMIND-0017"] = "已读"
      itemValue["S-REMIND-0017.text"] = "已读"
    })
  if (itemValue["S-REMIND-0020.value"]) {
    dsf.middleground.openUrl({
      url: itemValue["S-REMIND-0020.value"],
      title: itemValue["S-REMIND-0008.value"],
      getCodeParams: { appCode: itemValue["S-REMIND-0031.value"] }
    })
  } else {
    dsf.layer.toast(itemValue["S-REMIND-0008"])
  }
}
export default exportObj;
