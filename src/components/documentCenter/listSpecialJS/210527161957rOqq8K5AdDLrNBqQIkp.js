// 江苏烟草、皖政通（支撑平台）统一通知
const exportObj = {}
exportObj.initHandle = function (vueData) {
  vueData.readStatusKey = "un.Unify-Notice-User-0003"
  vueData.haveReadVal = 1
}
exportObj.link = async function (listid, moduleId, pk, vueData, itemValue) {
  await dsf.http
    .post("ctrl/unifyOfficeInfo/requestChangeRead", {
      dataId: itemValue["n.A0001"],
      type: "unifynotice",
      appCode: itemValue["n.Unify-Notice-0023"]
    })
    .then(res => {
      itemValue["un.Unify-Notice-User-0003"] = 1
    })
  console.log(2, itemValue)
  if (itemValue["n.Unify-Notice-0003"]) {
    if (itemValue["n.Unify-Notice-0003"].indexOf(`${location.host}${location.pathname}`) > -1) {
      vueData.$router.push(itemValue["n.Unify-Notice-0003"].split("#")[1])
    } else {
      dsf.middleground.openUrl({
        url: itemValue["n.Unify-Notice-0003"],
        title: itemValue["n.Unify-Notice-0009"],
        getCodeParams: { appCode: itemValue["n.Unify-Notice-0023"] }
      })
    }
  } else {
    dsf.layer.toast("无跳转地址")
  }
}
exportObj.tyggck = function (itemValue,vueData) {
  vueData.$router.push(`/commontabs/WanNoticeReadDetail?fid=${itemValue.dataValue["n.Unify-Notice-0001"]}&notLink=1`)
}
export default exportObj;
