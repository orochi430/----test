import dsf from "../../../common"
import dd from "dingtalk-jsapi"
import B64 from "@/common/base64"
import qs from "qs"

// 中台统一便签
const exportObj = {}
exportObj.initHandle = function (vueData) {
  vueData.readStatusKey = "un.Unify-Note-User-0003"
  vueData.haveReadVal = 1
}
exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
  if (itemValue["n.Unify-Note-0003"]) {
    await dsf.http
      .post("ctrl/unifyOfficeInfo/requestChangeRead", {
        dataId: itemValue["n.A0001.value"],
        type: "unifynote",
        appCode: itemValue["n.Unify-Note-0012.value"]
      })
      .then(res => {
        itemValue["un.Unify-Note-User-0003"] = 1
      })


    dsf.middleground.openUrl({
      url: itemValue["n.Unify-Note-0003"],
      title: itemValue["n.Unify-Note-0005.value"],
      getCodeParams: { appCode: itemValue["n.Unify-Note-0012.value"] }
    })
  } else {
    dsf.layer.toast("该文件建议在电脑端处理")
  }
}
export default exportObj;
