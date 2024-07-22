import qs from "qs"

function strToObj(url) {
  let obj = {}
  let arr = url.split("&")
  if (arr.length > 0) {
    arr.forEach(item => {
      let index = item.indexOf("=")
      let key = item.substr(0, index)
      let value = item.substr(index + 1)
      obj[key] = value || ""
    })
  }
  return obj
}
function objToStr(obj) {
  let str = ""
  Object.keys(obj).forEach((item, index) => {
    if (index == 0) {
      str = item + "=" + obj[item]
    } else {
      str += "&" + item + "=" + obj[item]
    }
  })
  return str
}

/**
 *
 * @param {*} url 地址
 * @param {*} code  code
 * @returns  拼接之后的地址
 */
function formatUrl(url, code) {
  if (url.indexOf("#") >= 0) {
    var urlList = url.split("#")
    if (urlList.length > 1) {
      var loc = urlList[0] // #/前面的部分
      var routers = urlList[1] // #/后面的部分
      var formatedUrl = formatUrl(loc, code)
      url = formatedUrl + "#" + routers
    } else {
      var loc = urlList[0] // #/前面的部分
      var formatedUrl = formatUrl(loc, code)
      url = formatedUrl + "#"
    }
  } else if (url.indexOf("?") >= 0) {
    var urlList = url.split("?")
    var loc = urlList[0]
    var params = strToObj(urlList[1])
    params.code = code
    url = loc + "?" + objToStr(params)
  } else {
    url += "?code=" + code
  }
  return url
}

// params
// url 跳转地址
// title 标题
// isOpenWebview 是否使用webview打开
// getCodeParams 使用统一认证接口获取code的参数
let openUrl = ({ url, title, isOpenWebview, getCodeParams, isHideHead, hasCloseBtn}) => {
  let openWebview = isOpenWebview == undefined ? dsf.config.login.midEnableOpenWebview : isOpenWebview
  // 有项目是不通过统一认证跳转的
  if (dsf.config.login.enableAuthorize) {
    dsf.layer.loading()
    dsf.http.get("fn/mobile/authorize/getCode", getCodeParams).then(res => {
      setTimeout(() => {
        dsf.layer.clear()
      }, 300)
      if (res.data.code == 200) {
        let code = res.data.data.code
        // let mobileUrl = res.data.data.mobileUrl
        url = formatUrl(url, code)
        if (!openWebview) {
          vueObj.$router.push({
            name: "dsfIframe",
            query: {
              url: url,
              title: title
            }
          })
        } else {
          dsf.util.openWebviewToUrl({ url: url, title: title, isHideHead, hasCloseBtn});
        }
      } else {
        dsf.layer.toast("用户CODE获取失败，请联系管理员。")
      }
    })
  } else {
    if (!openWebview) {
      vueObj.$router.push({
        name: "dsfIframe",
        query: {
          url: url,
          title: title
        }
      })
    } else {
      dsf.util.openWebviewToUrl({ url: url, title: title })
    }
  }
}

export default {
  openUrl
}
