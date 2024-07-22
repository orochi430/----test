import dsf from "../../../common"
import dd from "dingtalk-jsapi"
import B64 from "@/common/base64"
import qs from "qs"

// 江苏烟草统一待办
const exportObj = {}
exportObj.initHandle = function (vueData) {
  vueData.readStatusKey = "S-UNIFY-TASK-00014"
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
  if (itemValue["S-UNIFY-TASK-00028"]) {
    await dsf.http
      .post("ctrl/unifyOfficeInfo/requestChangeRead", {
        dataId: itemValue["S-BASE-0001"],
        type: "todounify",
        appCode: itemValue["S-UNIFY-TASK-0002.value"]
      })
      .then(res => {
        itemValue["S-UNIFY-TASK-00014"] = 1
      })


    dsf.middleground.openUrl({
      url: itemValue["S-UNIFY-TASK-00028"],
      title: itemValue["S-UNIFY-TASK-0005"],
      getCodeParams: { appCode: itemValue["S-UNIFY-TASK-0002.value"] }
    })
    // dsf.http
    //   .get("ctrl/mobile/authorize/getCode", {
    //     appCode: itemValue["S-UNIFY-TASK-0002.value"]
    //   })
    //   .then(res => {
    //     if (res.data.code == 200 || res.data.code == "200") {
    //       let code = res.data.data.code
    //       let urlList = itemValue["S-UNIFY-TASK-00028"].split("?")
    //       let loc = urlList[0]
    //       let params = qs.parse(urlList[1])
    //       params.userCode = code
    //       let url = loc + "?" + qs.stringify(params)

    //       console.log(url)

    //       setTimeout(() => {
    //         vueData.$router.push({
    //           name: "dsfIframe",
    //           query: {
    //             url: url,
    //             title: itemValue["S-UNIFY-TASK-0005"]
    //           }
    //         })
    //       }, 250)
    //       return
    //       if (window.wx) {
    //         wx.invoke(
    //           "openUrl",
    //           {
    //             type: 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
    //             // "url": itemValue['S-UNIFY-TASK-00028'] //url地址
    //             url: url
    //           },
    //           function (res) {
    //             if (res.err_msg != "openUrl:ok") {
    //               //错误处理
    //             }
    //           }
    //         )
    //       } else if (window.dd) {
    //         dd.openLink({
    //           // url: itemValue['S-UNIFY-TASK-00028']
    //           url: url
    //         })
    //           .then(res => {
    //             console.log(res)
    //           })
    //           .catch(err => {})
    //       } else {
    //         setTimeout(() => {
    //           vueData.$router.push({
    //             name: "dsfIframe",
    //             query: {
    //               url: url,
    //               title: itemValue["S-UNIFY-TASK-0005"]
    //             }
    //           })
    //         }, 250)
    //       }
    //     } else {
    //       dsf.layer.toast("用户CODE获取失败，请联系管理员")
    //     }
    //   })
  } else {
    dsf.layer.toast("该文件建议在电脑端处理")
  }
}
export default exportObj;
// let url = ''
//     if(itemValue['S-UNIFY-TASK-0002.value'] == 'JSYC_OA') {
//       let start = itemValue['S-UNIFY-TASK-00028'].indexOf('redirect_uri=') + 13
//       let end = itemValue['S-UNIFY-TASK-00028'].indexOf('&response_type=code')
//       url = decodeURIComponent(itemValue['S-UNIFY-TASK-00028'].slice(start, end))
//     } else {
//       url = itemValue['S-UNIFY-TASK-00028']
//     }
//     console.log(url)
//     wx.invoke('openUrl', {
//       "type": 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
//       "url": url //url地址
//     }, function(res){
//         if (res.err_msg != "openUrl:ok") {
//             //错误处理
//         }
//     });
