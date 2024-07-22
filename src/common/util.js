import Vue from "vue"
import VuexStore from "@/store"
import dsf from "."
import chatJS from "@/common/chat"
import tencentCloudVoice from "@/common/tencentCloudVoice"
import { ImagePreview } from 'vant';
//重写log
// console.log = (function (oriLogFunc) {
//   return function () {
//     //判断配置文件是否开启日志调试
//     if (dsf.config.isLog || dsf.config.isLog == undefined) {
//       try {
//         oriLogFunc.call(console, ...arguments);
//       } catch (e) {
//         console.error('console.log error', e);
//       }
//     }
//   }
// })(console.log);
let getServerName = name => {
  if (dsf.config.login?.enableStoreServerName) {
    if (process.env.NODE_ENV == "development") {
      return `${dsf.config.serverUrl}_${name}`
    } else {
      return `${location.pathname.split("/")[1]}_${name}`
    }
  } else {
    return name
  }
}
let base64ToFile = function (dataurl, type, name) {
  let baseUrl = dataurl
  if (!dataurl.includes("base64") && type) {
    baseUrl = `data:${type};base64,${baseUrl}`
  }
  let arr = baseUrl.split(",")
  let mime = arr[0].match(/:(.*?);/)[1]
  let bytes = atob(arr[1]) // 解码base64
  let n = bytes.length
  let ia = new Uint8Array(n)
  while (n--) {
    ia[n] = bytes.charCodeAt(n)
  }
  return new File([ia], name, {
    type: mime
  })
}

/* 根据图片url转为文件ArrayBuffer对象
 * @param url
 * @param imageName
 * @returns {Promise<unknown>}
 */
function getImageFileFromUrl(url) {
  return fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()

          reader.onloadend = () => resolve(reader.result)
          reader.onerror = e => reject(new Error("Failed to read image"))

          reader.readAsArrayBuffer(blob)
        })
    )
}
/* 根据图片ArrayBuffer转为文件Base64对象
 * @param url
 * @param imageName
 * @returns {}
 */
function arrayBufferToBase64(arrayBuffer) {
  var binary = ""
  var bytes = new Uint8Array(arrayBuffer)

  for (var i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return window.btoa(binary)
}
let loadLocalStore = name => {
  try {
    const serializedState = localStorage.getItem(getServerName(name))
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}
let loadSessionStore = name => {
  try {
    const serializedState = sessionStorage.getItem(getServerName(name))
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

let saveToLocalStore = (name, state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(getServerName(name), serializedState)
  } catch (e) {
    //ignore errors
  }
}

let saveToSessionStore = (name, state) => {
  try {
    const serializedState = JSON.stringify(state)
    if (name === "user") {
      Vue.prototype.$user = state
    }
    sessionStorage.setItem(getServerName(name), serializedState)
  } catch (e) {
    //ignore errors
  }
}

let removeToLocalStore = name => {
  try {
    localStorage.removeItem(getServerName(name))
  } catch (e) {
    //ignore errors
  }
}
let removeSessionStore = name => {
  try {
    sessionStorage.removeItem(getServerName(name))
  } catch (e) {
    //ignore errors
  }
}
let clearSession = () => {
  sessionStorage.clear()
}
let clearLocalStore = () => {
  localStorage.clear()
}

let getStoreValue = (mouleName, key) => {
  let moule = loadSessionStore(mouleName)
  if (moule) {
    return moule[key]
  }
  return null
}

//获取设备名称
let getClientName = () => {
  let consoleName = "browser" //默认是浏览器模式，不在任何设备下，根据当前加载的壳userAgent判断使用设备
  if (window.navigator.userAgent.includes("mobileIM")) {
    consoleName = "mobileIM"
  } else if (window.navigator.userAgent.toLowerCase().includes("micromessenger")) {
    consoleName = "wechat"
    if (window.location.href.includes("digitalgd") || window.location.href.includes("gdzwfw")) consoleName = "digitalgd"
  } else if (window.navigator.userAgent.toLowerCase().includes("taurusapp")) {
    consoleName = "govding"
  } else if (window.navigator.userAgent.toLowerCase().includes("com.alibaba.android.rimet") || window.navigator.userAgent.toLowerCase().includes("dingtalk")) {
    consoleName = "dingding"
  } else if (window.navigator.userAgent.includes("DreamSoft")) {
    consoleName = "app"
    if (dsf.config?.login?.devicelogin) {
      consoleName = "devicelogin"
    }
  } else if (window.navigator.userAgent.toLowerCase().includes("caiyun")) {
    consoleName = "xunmeng"
  } else if (window.navigator.userAgent.toLowerCase().includes("eshimin")) {
    consoleName = "eshimin"
  } else if (window.navigator.userAgent.toLowerCase().includes("mpaasclient")) {
    consoleName = "mpaas"
  }
  //console.log("consoleName",consoleName)
  return consoleName
}
//获取设备类型
let getClientType = () => {
  let consoleType = "mobile"
  // var browser = {
  //   versions: function () {
  //     var u = navigator.userAgent,
  //       app = navigator.appVersion;
  //     return { //移动终端浏览器版本信息
  //       trident: u.indexOf("Trident") > -1, //IE内核
  //       presto: u.indexOf("Presto") > -1, //opera内核
  //       webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
  //       gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
  //       mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
  //       ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
  //       android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
  //       iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
  //       iPad: u.indexOf("iPad") > -1, //是否iPad
  //       webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
  //     };
  //   }(),
  //   language: (navigator.browserLanguage || navigator.language).toLowerCase()
  // }
  // document.writeln(" 是否为移动终端: "+browser.versions.mobile);
  // document.writeln(" 是否iPad: "+browser.versions.iPad);
  let ua = navigator.userAgent,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua)
  let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)) || /(?:BRT-AN09)/.test(ua)

  if (isTablet) {
    consoleType = "iPad"
  }
  if (!isTablet && document.documentElement.clientWidth >= 640 && document.documentElement.clientHeight >= 640) {
    // 如果没判断出是pad，再进行屏幕宽高判断
    consoleType = "iPad"
  }

  return consoleType
}

let checkSystem = () => {
  let u = window.navigator.userAgent,
    app = window.navigator.appVersion
  let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1 //g
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf("iOS") //ios终端
  if (isAndroid) {
    return "android"
  }
  if (isIOS) {
    return "ios"
  }
}

//替换url里面的[]动态参数，支持session、get参数、路由参数、dataObj属性
let getReplaceUrl = (url, dataObj) => {
  let userData = loadSessionStore("user")
  if (typeof url === "string") {
    let regex2 = /\[(.+?)\]/g // [] 中括号
    if (url.match(regex2)) {
      // 有匹配才替换[]中的参数
      url.match(regex2).forEach(element => {
        let key = element.replace("[", "").replace("]", "")
        if (window.vueObj.$route.params[key]) {
          url = url.replace(element, window.vueObj.$route.params[key])
        }
        if (window.vueObj.$route.query[key]) {
          url = url.replace(element, window.vueObj.$route.query[key])
        }
        if (dataObj && dataObj[key]) {
          url = url.replace(element, dataObj[key])
        }
      })
    }
    if (userData) {
      let dxToken = "" //中央党校党校获取IM中的token值进行替换
      if (navigator.userAgent == "mobileIM" && url.includes("dxToken")) {
        window.native?.getDxToken().then(data => {
          dxToken = data.token
        })
      }
      url = url
        .replace("[user_id]", userData.user_id)
        .replace("[userid]", userData.user_id)
        .replace("[name]", userData.name)
        .replace("[deptId]", userData.deptId)
        .replace("[deptName]", userData.deptName)
        .replace("[logName]", userData.logName)
        .replace("[mobile]", userData.mobile)
        .replace("[root_dept_id]", userData.root_dept_id)
        .replace("[unitId]", userData.unitId)
        .replace("[communityId]", userData.communityId)
        .replace("[timestamp]", new Date().getTime())
        .replace("[today]", moment().format("yyyy-MM-DD"))
        .replace("[dxToken]", dxToken)
        .replace("[access_token]", dsf.util.loadSessionStore("imAccessToken")?.access_token) //特殊处理IM的accesstoken
    }
    return url
  } else return url
}

//验证用户角色，roleName角色名称，返回true拥有，false没有
let checkUserRole = roleName => {
  let userData = loadSessionStore("user")
  let hasRole = false
  if (roleName && userData) {
    let privileges = userData.privileges || []
    if (privileges.filter(item => item.name == roleName).length) {
      hasRole = true
    }
  }
  return hasRole
}

let getDeviceInfo = () =>
  new Promise((resolve, reject) => {
    if ("undefined" != typeof $iaction) {
      $iaction.execute(
        { method: "getPushDeviceInfo", param: {} },
        function (res) {
          console.log("getPushDeviceInfo-res", res)
          resolve(res)
        },
        function (err) {
          console.log("getPushDeviceInfo-err", err)
          reject(err)
        }
      )
    } else {
      document.addEventListener("deviceready", function () {
        if ("undefined" != typeof $iaction) {
          $iaction.execute(
            { method: "getPushDeviceInfo", param: {} },
            function (res) {
              console.log("getPushDeviceInfo-res", res)
              resolve(res)
            },
            function (err) {
              console.log("getPushDeviceInfo-err", err)
              reject(err)
            }
          )
        } else {
          reject("$iaction未定义")
        }
      })
    }
  })

// 用户登录开启服务（websocket）
let startPushService = (userId, token) =>
  new Promise((resolve, reject) => {
    let phone_system = checkSystem()
    if ("undefined" != typeof $iaction) {
      if (phone_system == "android") {
        $iaction.execute(
          { method: "startPushService", param: { userId: userId, token: token } },
          function (res) {
            console.log("startPushService-res", res)
            resolve(res)
          },
          function (err) {
            console.log("startPushService-err", err)
            reject(err)
          }
        )
      } else if (phone_system == "ios") {
        $iaction.encrypt(
          { action: "startWSpush", userId: userId, token: token },
          function (res) {
            console.log("startWSpush-res", res)
            resolve(res)
          },
          function (err) {
            console.log("startWSpush-err", err)
            reject(err)
          }
        )
      }
    } else {
      document.addEventListener("deviceready", function () {
        if ("undefined" != typeof $iaction) {
          if (phone_system == "android") {
            $iaction.execute(
              { method: "startPushService", param: { userId: userId, token: token } },
              function (res) {
                console.log("startPushService-res", res)
                resolve(res)
              },
              function (err) {
                console.log("startPushService-err", err)
                reject(err)
              }
            )
          } else if (phone_system == "ios") {
            $iaction.encrypt(
              { action: "startWSpush", userId: userId, token: token },
              function (res) {
                console.log("startWSpush-res", res)
                resolve(res)
              },
              function (err) {
                console.log("startWSpush-err", err)
                reject(err)
              }
            )
          }
        } else {
          reject("$iaction未定义")
        }
      })
    }
  })

// 退出登录接收服务（websocket）
let stopPushService = () =>
  new Promise((resolve, reject) => {
    let phone_system = checkSystem()
    if ("undefined" != typeof $iaction) {
      if (phone_system == "android") {
        $iaction.execute(
          { method: "stopPushService", param: {} },
          function (res) {
            console.log("stopPushService-res", res)
            resolve(res)
          },
          function (err) {
            console.log("stopPushService-err", err)
            reject(err)
          }
        )
      } else if (phone_system == "ios") {
        $iaction.encrypt(
          { action: "stopWSpush" },
          function (res) {
            console.log("stopWSpush-res", res)
            resolve(res)
          },
          function (err) {
            console.log("stopWSpush-err", err)
            reject(err)
          }
        )
      }
    } else {
      document.addEventListener("deviceready", function () {
        if ("undefined" != typeof $iaction) {
          if (phone_system == "android") {
            $iaction.execute(
              { method: "stopPushService", param: {} },
              function (res) {
                console.log("stopPushService-res", res)
                resolve(res)
              },
              function (err) {
                console.log("stopPushService-err", err)
                reject(err)
              }
            )
          } else if (phone_system == "ios") {
            $iaction.encrypt(
              { action: "stopWSpush" },
              function (res) {
                console.log("stopWSpush-res", res)
                resolve(res)
              },
              function (err) {
                console.log("stopWSpush-err", err)
                reject(err)
              }
            )
          }
        } else {
          reject("$iaction未定义")
        }
      })
    }
  })

// 户信息传递（消息推送）
let setUserInfo = action =>
  new Promise((resolve, reject) => {
    let userData = loadSessionStore("user")
    if ("undefined" != typeof $iaction) {
      $iaction.execute(
        { method: "setUserInfo", param: { action: action, userId: userData.user_id } },
        function (res) {
          console.log("setUserInfo-res", res)
          resolve(res)
        },
        function (err) {
          console.log("setUserInfo-err", err)
          reject(err)
        }
      )
    }
  })

// 初始化推送服务
let initPushService = () => {
  let userData = loadSessionStore("user")
  let pushType = dsf.config.login.pushType || "JPush" // 推送方式
  let phone_system = checkSystem()
  try {
    if (pushType == "JPush") {
      // 极光推送
      if ("undefined" != typeof JPush) {
        console.log("setJPushUserInfo开始")
        //绑定
        xsfJPush.setJPushUserInfo(
          { userId: userData.user_id },
          function (success) {
            console.log(success)
          },
          function (error) {
            console.log(error)
          }
        )
        console.log("setJPushUserInfo结束")
      } else {
        document.addEventListener("deviceready", function () {
          if ("undefined" != typeof JPush) {
            console.log("deviceready_setJPushUserInfo开始")
            xsfJPush.setJPushUserInfo(
              { userId: userData.user_id },
              function (success) {
                console.log(success)
              },
              function (error) {
                console.log(error)
              }
            )
            console.log("deviceready_setJPushUserInfo结束")
          }
        })
      }
    } else if (pushType == "factory") {
      // 厂商推送
      if (phone_system == "ios") {
        // websocket
        dsf.http
          .get("fn/message/push/getToken", { userId: userData.user_id })
          .done(res => {
            console.log("getToken-res", res)
            if (res.type == "success") {
              return startPushService(userData.user_id, res.data)
            } else {
              throw `getToken-fail：${res.message}`
            }
          })
          .done(res => {
            console.log("用户登录开启服务成功：", res)
          })
          .error(err => {
            console.log("initPushService-err1", err)
          })
      } else if (phone_system == "android") {
        // 设备厂商
        getDeviceInfo()
          .done(res => {
            if (res.regId) {
              return dsf.http.get("fn/message/push/setUserDevice", { userId: userData.user_id, device: res.device, userKey: res.regId })
            } else {
              throw `getDeviceInfo-fail：未获取到设备token`
            }
          })
          .done(res => {
            console.log("setUserDevice-res", res)
            if (res.type == "success") {
              if (res.data == "true") {
                console.log("用户上线成功：", res)
                return setUserInfo("add")
              } else {
                throw `setUserDevice-fail：${res.message}`
              }
            } else {
              throw `setUserDevice-err${res.message}`
            }
          })
          .done(res => {
            console.log("setUserInfo-add", res)
          })
          .error(err => {
            console.log("initPushService-err2", err)
          })
      }
    }
  } catch (error) {
    console.log("initPushService-err", error)
  }
}

// 退出推送服务
let endPushService = async () => {
  let userData = loadSessionStore("user")
  let pushType = dsf.config.login.pushType || "JPush" // 推送方式
  let phone_system = checkSystem()
  try {
    if (pushType == "JPush") {
      // 极光推送
      if ("undefined" != typeof JPush) {
        console.log("setOutJPushUserInfo")
        //解绑
        xsfJPush.loginOut(
          { userId: userData.user_id },
          function (success) {
            console.log(success)
          },
          function (error) {
            console.log(error)
          }
        )
      }
    } else if (pushType == "factory") {
      // 厂商推送
      if (phone_system == "ios") {
        // websocket
        await stopPushService()
          .done(res => {
            console.log("退出登录接收服务成功：", res)
          })
          .error(err => {
            console.log("stopPushService-err1", err)
          })
      } else if (phone_system == "android") {
        // 设备厂商
        await setUserInfo("clear")
          .done(res => {
            console.log("setUserInfo-clear", res)
            return dsf.http.get("fn/message/push/userOutLogin", { userId: userData.user_id })
          })
          .done(res => {
            console.log("userOutLogin-res", res)
            if (res.type == "success") {
              if (res.data == "true") {
                console.log("用户下线成功：", res)
              } else {
                throw `userOutLogin-fail：${res.message}`
              }
            } else {
              throw `userOutLogin-err${res.message}`
            }
          })
      }
      console.log("endPushService结束")
    }
  } catch (error) {
    console.log("endPushService-err2", error)
  }
}

//退出登录
let logOut = function (is401 = false) {
  recoverConfig() // 恢复全局配置
  if (getClientName() == "app") {
    //退出推送服务
    endPushService()
    //注册小鱼会议插件
    if (dsf.config.login.registerXY) {
      $XYLink.execute(
        ["logout", {}],
        function (success) {
          console.log(success)
        },
        function (error) {
          console.log(error)
        }
      )
    }
    clearInterval(setAppBadgeTimer)
  }
  if (!is401) {
    //  退出登录以后后台也需要做退出操作，因此调用接口
    dsf.http.post("fn/mobileUserLogout/logout").then(res => {
      console.log("退出登录----", res.data.message)
    })
  }
  VuexStore.commit("changeAppFooter", []) //退出时清空底部菜单
  VuexStore.dispatch("applications/setMyMenus", [])
  VuexStore.dispatch("applications/setMenus", []) //退出时清空应用菜单
  window.vueObj.$bus.emit("footerMenu")
  window.vueObj.$bus.emit("clearCache")
  removeSessionStore("user")
  removeSessionStore("homePage")
  removeSessionStore("loginToken")
  removeSessionStore("imAccessToken")
  removeToLocalStore("user")
  removeToLocalStore("loginToken")
  removeToLocalStore("userName")
  removeToLocalStore("passWord")
  removeToLocalStore("gesture_pas")
  removeToLocalStore("autoLogin")
  removeToLocalStore("mySetting")
  removeToLocalStore("lastLoginType")
  removeToLocalStore("TY_USER_ID") // [赣政通]APM（第三方流量监控）用户ID
  removeSessionStore("defaultcount")

  //im壳退出
  if (getClientName() == "mobileIM") {
    window.native?.logOut()
    return
  }
  let logOutUrl = dsf.config.login.customLogOutUrl || "/testLogin"
  window.vueObj.$router.replace({
    path: logOutUrl
  })
}

//登录成功
let logIn = function (callback, path) {
  let userData = loadSessionStore("user")
  mixUnitConfig() // 将子机构配置覆盖全局config配置
  if (getClientName() == "app") {
    //初始化推送服务
    initPushService()
    //注册小鱼会议插件
    if (dsf.config.login.registerXY) {
      let param = {
        userName: userData.name,
        userId: userData.user_id,
        userData: [{ user: userData }, { loginToken: loadSessionStore("loginToken") }]
      }
      console.log("注册小鱼会议插件参数:", JSON.stringify(param))
      //延时注册小鱼插件,防止注册时  壳的插件没有初始化完成
      setTimeout(() => {
        $XYLink.execute(
          ["loginById", param],
          function (success) {
            console.log(success)
          },
          function (error) {
            console.log(error)
          }
        )
      }, 5000)
    }
    //腾讯云语音插件
    if (dsf.config.login.tencentCloudVoice) {
      tencentCloudVoice.tallLogin()
    }

    // 设置app角标
    if ("undefined" != typeof xsfCommon) {
      setAppBadge()
    } else {
      document.addEventListener("deviceready", function () {
        setAppBadge()
      })
    }
  }
  //im壳登录
  if (getClientName() == "mobileIM" && false) {
    //初始化IM
    chatJS.initIM(true, res => {
      console.log("login-res =", res)
      window.native?.logIn(res)
    })
    return
  }
  if (!path || path.indexOf("/index") == 0) {
    //获取底部菜单
    dsf.http.post("fn/mobileIndex/index").then(async ({ data }) => {
      let resultData = data.data
      if (resultData) {
        //json对象转换
        let menus = []
        resultData.forEach((element, index) => {
          let tempComponents = []
          element.components.forEach(tc => {
            tempComponents.push({
              name: tc.className,
              params: tc.props && tc.props.compositeAttr ? tc.props.compositeAttr : {}
            })
          })

          let itemTemp = {
            id: element.id,
            router: element.router,
            components: tempComponents,
            showName: element.name,
            icon: element.icon,
            selectIcon: element.selectIcon || "",
            isShow: true,
            checked: element.IsDefault == 1,
            badgeUrl: element.showBadge ? element.badgeApi : "",
            notShow: element.notShow || "",
            isBulge: element.isBulge || "",
            displayType: element.displayType || "1" //默认值给1  数字式显示
          }
          menus.push(itemTemp)
        })
        dsf.util.saveToSessionStore("footerMenu", JSON.parse(JSON.stringify(menus)))

        //初始化IM
        await chatJS.initIM()

        VuexStore.commit("changeAppFooter", menus)
        if (callback) callback()
      }
    })
  } else {
    if (callback) callback()
  }
}

let deepCopy = function (obj) {
  let newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== "object") {
    return obj
  } else {
    for (let i in obj) {
      if (typeof obj[i] === "object") {
        //判断对象的这条属性是否为对象
        newobj[i] = deepCopy(obj[i]) //若是对象进行嵌套调用
      } else {
        newobj[i] = obj[i]
      }
    }
  }
  return newobj //返回深度克隆后的对象
}
// 将子机构config配置覆盖全局config配置
let mixUnitConfig = function () {
  let unitId = loadSessionStore("user")?.unitId
  if (unitId && dsf.config.unitConfig && dsf.config.unitConfig[unitId]) {
    dsf.hasUnitConfig = true
    Object.keys(dsf.config.unitConfig[unitId]).forEach(key => {
      if (dsf.config[key]) {
        if (typeof dsf.config[key] == 'object') {
          if (Array.isArray(dsf.config[key])) {
            dsf.config[key] = [...dsf.config[key], ...dsf.config.unitConfig[unitId][key]]
          } else {
            Object.assign(dsf.config[key], dsf.config.unitConfig[unitId][key])
          }
        } else {
          dsf.config[key] = dsf.config.unitConfig[unitId][key]
        }
      } else {
        dsf.config[key] = dsf.config.unitConfig[unitId][key]
      }
    })
  }
}
// 退出登录还原全局config配置
let recoverConfig = function () {
  if (dsf.hasUnitConfig) {
    dsf.hasUnitConfig = false
    let configUrl = 'static/config.json'
    if (window.navigator.userAgent.toLowerCase().includes('micromessenger')) configUrl = 'static/configWx.json'
    dsf.http
      .getNoRootUrl(configUrl + "?t=" + Math.random())
      .then(config => {
        if (config.data == null) {
          alert("请检查config.json是否存在，或修改过的配置是否符合json数据格式");
        }
        dsf.config = Object.assign(dsf.config, config.data);
        getConfigProject() // 获取项目特殊配置config
      })
      .catch(err => {
        dsf.layer.toast(err.message);
      });
    function getConfigProject() {
      dsf.http
        .getNoRootUrl('static/configProject.json' + "?t=" + Math.random())
        .then(config => {
          if (config.data != null) {
            Object.keys(config.data).forEach(key => {
              if (dsf.config[key]) {
                if (typeof dsf.config[key] == 'object') {
                  if (Array.isArray(dsf.config[key])) {
                    dsf.config[key] = [...dsf.config[key], ...config.data[key]]
                  } else {
                    Object.assign(dsf.config[key], config.data[key])
                  }
                } else {
                  dsf.config[key] = config.data[key]
                }
              } else {
                dsf.config[key] = config.data[key]
              }
            })
          }
        })
    }
  }
}
let numToHan = function (num) {
  let arr1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
  let arr2 = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"]
  if (!num || isNaN(num)) return "零"
  let english = num.toString().split("")
  let result = ""
  for (let i = 0; i < english.length; i++) {
    let des_i = english.length - 1 - i // 倒序排列设值
    result = arr2[i] + result
    let arr1_index = english[des_i]
    result = arr1[arr1_index] + result
  }
  result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十") // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零+/g, "零") // 合并中间多个零为一个零
  result = result.replace(/零亿/g, "亿").replace(/零万/g, "万") // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/亿万/g, "亿") // 将【亿万】换成【亿】
  result = result.replace(/零+$/, "") // 移除末尾的零
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, "十")
  return result
}

//移除文本中的html标签
let removeHTMLTags = function (text) {
  return text.replace(/<[^>]+>/g, "")
}

let stripscript = function (s) {
  var pattern = new RegExp("[`~!%@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*——|{}‘；：”“'？↵\r\n ]")
  var rs = ""
  for (var i = 0; i < s?.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "")
  }
  return rs
}
/** 数字金额大写转换(可以处理整数,小数,负数) */
let amountWords = function (n) {
  let fraction = ["角", "分"]
  let digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]
  let unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"]
  ]
  let head = n < 0 ? "欠" : ""
  n = Math.abs(n)

  let s = ""

  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, "")
  }
  s = s || "整"
  n = Math.floor(n)

  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ""
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, "元")
      .replace(/(零.)+/g, "零")
      .replace(/^整$/, "零元整")
  )
}

let isImage = title => {
  let toLowerCase = title.toLowerCase()
  return (
    toLowerCase.includes(".png") ||
    toLowerCase.includes(".jpg") ||
    toLowerCase.includes(".mp4") ||
    toLowerCase.includes(".jpeg") ||
    toLowerCase.includes(".bmp") ||
    toLowerCase.includes(".gif")
  )
}

let getFileTypeIcon = title => {
  let fileType = {
    pdf: ["pdf"],
    img: ["jpeg", "bmp", "webp", "svgz", "svg", "gif", "jpg", "ico", "png", "tif"],
    txt: ["txt", "sql", "xml", "html", "css", "js", "java", "php", "bat", "log"],
    word: ["docx", "docm", "doc", "dotx", "dotm", "dot"],
    xls: ["xlsx", "xlsm", "xlsb", "xls", "xltx", "xltm", "xlt", "xlam", "xla", "ods"],
    ppt: ["pptx", "pptm", "ppt", "potx", "potm", "pot", "ppsx", "ppsm", "pps", "ppam", "ppa"]
  },
    hasFilePng = ["ai", "cloud", "html", "img", "jpg", "mp3", "mp4", "pdf", "png", "ppt", "psd", "rar", "txt", "word", "wps", "xls", "zip", "ofd"]
  let startIndex = title.lastIndexOf(".")
  let str = startIndex > -1 ? title.substring(startIndex + 1, title.length).toLowerCase() : ""
  if (hasFilePng.indexOf(str) > -1) return require(`static/images/newFileType/${str}.png`)
  for (let key in fileType) {
    let value = fileType[key]
    if (value.indexOf(str) > -1) {
      return require(`static/images/newFileType/${key}.png`)
    }
  }
  return require(`static/images/newFileType/word.png`)
}

let filesizeTostr = function (size) {
  let data = ""
  if (size < 0.1 * 1024) {
    //如果小于0.1KB转化成B
    data = size.toFixed(2) + "B"
  } else if (size < 0.1 * 1024 * 1024) {
    //如果小于0.1MB转化成KB
    data = (size / 1024).toFixed(2) + "KB"
  } else if (size < 0.1 * 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    data = (size / (1024 * 1024)).toFixed(2) + "MB"
  } else {
    //其他转化成GB
    data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB"
  }
  let sizestr = data + ""
  let len = sizestr.indexOf(".")
  let dec = sizestr.substr(len + 1, 2)
  if (dec == "00") {
    //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
  }
  return sizestr
}

let isMyDept = async function (deptToCheck) {
  if (!deptToCheck) return false
  let user = loadSessionStore("user")
  if (!user) return false
  let myDept = user.orgNameLv1Text
  if (!myDept) {
    await dsf.http
      .get("/ctrl/p2011commoncon/getUserInfo", {})
      .done(res => {
        myDept = user.orgNameLv1Text = res.data.orgNameLV1
        saveToSessionStore("user", user)
      })
      .error(err => console.log("getUserInfo-err", err))
  }
  return myDept == deptToCheck
}
let setAppBadgeTimer = null
let setAppBadge = function () {
  if (dsf.config.login?.appBadgeUrl && xsfCommon?.setAppBadge) {
    function fn() {
      dsf.http.post(dsf.config.login.appBadgeUrl).then(res => {
        xsfCommon.setAppBadge(
          {
            count: res.data.badge
          },
          msg => {
            console.log("setAppBadge")
            // alert(msg);
          },
          err => {
            console.log("failed: " + err)
          }
        )
      })
      return fn
    }
    setAppBadgeTimer = setInterval(fn(), 60000)
  }
}

let scanQRCode = function (callback) {
  if (dsf.util.getClientName() == "app") {
    if (dsf.util.checkSystem() == "ios") {
      $Scanner.open(
        {},
        function (res) {
          callback(res)
        },
        function (error) {
          alert("扫码失败: " + error)
        }
      )
    } else {
      xsfBarcode.scan(
        res => {
          console.log("scan", res)
          callback(res)
        },
        error => {
          alert("扫码失败: " + error)
        }
      )
    }
  } else if (window.dd) {
    window.dd.scan(
      function (res) {
        //--调用成功;
        console.log("scan", res)
        callback(res)
      },
      function (err) {
        console.log("scan-err", err)
      }
    )
  } else if (window.wx) {
    wx.scanQRCode({
      desc: "scanQRCode desc",
      needResult: 0, // 默认为0，扫描结果由山东通处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {
        // 回调
        console.log("scan", res)
        callback(res)
      },
      error: function (res) {
        if (res.errMsg.indexOf("function_not_exist") > 0) {
          alert("版本过低请升级")
        }
      }
    })
  } else if (dsf.util.getClientName() == "mobileIM") {
    window.native.qrScan(res => {
      console.log("scan", res)
      callback(res)
    })
  } else {
    // dsf.layer.alert('需在app中进行扫码')
    dsf.layer.alert({
      // title: '温馨提示',
      message: `需在app中进行扫码`
    })
  }
}

let haddlerSacnCodeType = callback => {
  scanQRCode(qrcode => {
    console.log("qrcode: ", qrcode)
    //这里是需要自己去处理的逻辑 scan:// 表示是需要去登录了， 日后如果有其他的类型自己这里添加判断
    if ((qrcode.text && qrcode.text.indexOf("scan://") == 0) || qrcode.indexOf("scan://") == 0) {
      dsf.http
        .post("fn/mobile/authorize/scan/check", {
          data: qrcode.text || qrcode
        })
        .done(res => {
          if (res.code == 200) {
            callback(res)
            window.vueObj.$bus.emit("showScanDialog", qrcode.text || qrcode)
          } else {
            dsf.layer.alert({
              message: res.message
            })
          }
        })
        .error(err => {
          dsf.layer.alert({
            message: `二维码错误`
          })
        })
    } else {
      callback(qrcode.text || qrcode)
    }
  })
}
// 不同系统webview跳转
let openWebviewToUrl = function ({ url, title, colorString, isHideHead, hasCloseBtn }) {
  if (window.lx) {
    lx.ui.openView({
      mode: "webview",
      navigationBarBackgroundColor: "#4E74BB",
      navigationBarFrontStyle: "white",
      url: url,
      useSplitScreen: false
    })
  } else if (window.wx) {
    wx.invoke(
      "openUrl",
      {
        type: 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
        url: url
      },
      function (res) {
        if (res.err_msg != "openUrl:ok") {
          //错误处理
        }
      }
    )
  } else if (window.dd) {
    dd.openLink({
      url: url
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => { })
  } else if (dsf.util.getClientName() == "mobileIM") {
    window.native.openWebView({
      url: url,
      title: title,
      hasCloseBtn: hasCloseBtn ?? true,
      hideHead: isHideHead ?? false
    })
  } else if (window.xsfWindow) {
    xsfWindow.openWebView({
      title: title,
      url: url,
      colorString: colorString || dsf.config.appTopMenu?.xsfWindowColor || "#111111",
      light_bar: dsf.config.appTopMenu?.xsfWindowLightBar || false
    })
  } else if (window.$NavVC) {
    $NavVC.pushNewHtmlVC(
      {
        title: title,
        url: encodeURI(url),
        webType: "2", // 1是普通的webview；2是带Cordova
        show_title_bar: "false",
        orientation: "0",
        colorString: colorString || "#ffffff",
        show_loading: "ture",
        light_bar: "ture",
        backType: "finish"
      },
      function (arg) { },
      function (arg) { }
    )
  } else {
    vueObj.$router.push({
      name: "dsfIframe",
      query: {
        url: url,
        title: title
      }
    })
  }
}
// 不同系统关闭webview
let closeWebview = function () {
  if (window.wx) {
    wx.closeWindow()
  } else if (window.dd) {
    if (dd.biz) {
      dd.biz.navigation.close()
    } else {
      dd.closePage()
    }
  } else if (dsf.util.getClientName() == "mobileIM") {
    window.native.close()
  } else if (window.xsfWindow) {
    xsfWindow.closeWebView()
  } else if (window.$NavVC) {
    $NavVC.closeHtmlVC()
  } else if (window.lx) {
    window.lx.ui.closeWindow()
  } else {
    vueObj.$router.back()
  }
}
/**
 * 文件预览
 * @param initDataSource  是否临时文件
 */
let filePreview = function ({ fileId, fileName, moduleId, initDataSource }) {
  let loginToken = dsf.util.loadSessionStore("loginToken")
  let rootPath = dsf.url.getRootPath()
  let type = fileName.substr(fileName.lastIndexOf(".") + 1)
  console.log("预览")
  if (isImage(fileName)) {
    // 图片预览
    ImagePreview({
      images: [rootPath + `fn/mobileFileDownload/download?fileId=${fileId}&moduleId=${moduleId}&fileName=${fileName}`],
      startPosition: 0
    })
    return
  }
  // 文件
  if (dsf.config.commonForm.locationHrefToFile) {
    dsf.layer.loading()
    dsf.http.get("/fn/fileToken/get").then(res => {
      dsf.layer.clear()
      console.log(res.data)
      if (res.data.data) {
        let url =
          rootPath +
          `fn/fileToPdf/download?fileId=${fileId}&token=${res.data.data}&userId=${dsf.util.loadSessionStore("user").user_id}` +
          (initDataSource ? `&initDataSource=1&originalAttachName=${fileName}` : "")
        wx.invoke(
          "openUrl",
          {
            type: 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
            url: url
          },
          function (res) {
            if (res.err_msg != "openUrl:ok") {
              //错误处理
            }
          }
        )
      }
    })
  } else if (dsf.config.commonForm.LocalDocPreview && (fileName == "ofd" || fileName == "pdf")) {
    console.log("预览")
    vueObj.$router.push({
      path: `/filePreview/${fileId}/${moduleId}`,
      query: {
        title: fileName,
        isHandwrite: 0
      }
    })
  } else {
    let url = rootPath + `fn/office/openMobileOffice?fileId=${fileId}&moduleId=${moduleId}&x-auth-token=${loginToken}`
    if (dsf.config.commonForm.webViewPreview) {
      openWebviewToUrl({ url: url, title: fileName })
    } else {
      vueObj.$router.push({
        path: "/iframe",
        query: {
          title: fileName,
          url: url
        }
      })
    }
  }
}
//获取定位
let getLocPostion = function (successBack, errBack) {
  try {
    if (getClientName() == "mobileIM") {
      window.native?.getLocation({ isNeedAddress: true }, res => {
        console.log("im定位返回值", res)
        successBack(JSON.stringify(res))
      })
    } else if (getClientName() == "app") {
      let phone_system = checkSystem()
      if (phone_system == "android") {
        if ("undefined" != typeof $BaiduLocation) {
          $BaiduLocation.getLocation(
            {},
            function (res) {
              console.log("$BaiduLocation", res)
              successBack(res)
            },
            function (err) {
              errBack(err)
            }
          )
        } else errBack("$BaiduLocation未定义")
      } else if (phone_system == "ios") {
        if ("undefined" != typeof $iaction) {
          $iaction.dosth(
            {
              action: "getBaiduLocation"
            },
            function (res) {
              let backContent = '{"' + res.replaceAll("=", '":"').replaceAll(",", '","') + '"}'
              console.log("$iaction", res, backContent)
              successBack(backContent)
            },
            function (err) {
              errBack(err)
            }
          )
        } else errBack("$iaction未定义")
      }
    } else {
      errBack("获取定位失败")
    }
  } catch (err) {
    errBack(err)
  }
}

let getOffsetTop = function (fixHeight, isImmerse) {
  // 获取高度，沉浸式状态栏时，需要加上状态栏高度
  // fixHeight 固定高度，在此基础上加上状态栏的高度。如果不传，会默认判断是否有顶部返回栏
  // isImmerse 是否需要加上状态栏高度，如果不传，会默认判断当显示空白div时才加，如果传了，会判断该页面是配置了沉浸入状态栏的情况下则会加
  const docFontsize = document.documentElement.style.fontSize.split("px")[0]
  let ds = isImmerse ? dsf.config.appTopMenu.allowHideStatusTop && dsf.config.appTopMenu.statusTopPath.includes(window.vueObj.$route.path) : false
  let showTopDivHeight = ds || VuexStore.state.showTopDiv ? VuexStore.state.statusBarHeight : 0
  let offsetTopHeight = 0
  if (fixHeight !== undefined) {
    if (isNaN(Number(fixHeight))) {
      if (fixHeight.toLowerCase().includes("px")) {
        offsetTopHeight = fixHeight.split("px")[0]
      } else {
        offsetTopHeight = fixHeight.split("rem")[0] * 50
      }
    } else {
      offsetTopHeight = fixHeight
    }
  } else {
    offsetTopHeight = VuexStore.state.isShowAppHeader ? 46 : 0
  }
  return (offsetTopHeight / 50) * docFontsize + showTopDivHeight + "px"
}
export default {
  loadLocalStore,
  loadSessionStore,
  saveToLocalStore,
  saveToSessionStore,
  removeToLocalStore,
  clearSession,
  clearLocalStore,
  getStoreValue,
  removeSessionStore,
  getClientName,
  getClientType,
  getReplaceUrl,
  logOut,
  logIn,
  checkUserRole,
  deepCopy,
  checkSystem,
  numToHan,
  amountWords,
  isImage,
  getFileTypeIcon,
  filesizeTostr,
  isMyDept,
  setAppBadge,
  scanQRCode,
  haddlerSacnCodeType,
  openWebviewToUrl,
  closeWebview,
  stripscript,
  removeHTMLTags,
  filePreview,
  base64ToFile,
  getLocPostion,
  getOffsetTop,
  getImageFileFromUrl,
  arrayBufferToBase64,
  mixUnitConfig
}
