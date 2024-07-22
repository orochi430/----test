/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import Vue from "vue";
import App from "./App";
import router from "./router";
import VuexStore from "./store";
import "./assets/index.scss";
import dsf from "./common/index.js";
import urlJs from "./common/url";
import VueBus from "vue-bus";
import appCollection from "./common/applicationCollection";
import eshimin from "./common/eshimin";
import customJsLoader from "./common/customJsLoader";
import commonCordova from "./common/commonCordova";
import directives from "./common/directives";
//import * as dd from "dingtalk-jsapi";
//import * as dd from 'https://g.alicdn.com/gdt/jsapi/1.3.5/index.js';


// import "./common/flexble";
import routerLoading from "./common/routerLoading";
routerLoading()
import { initTheme, setAppTopColor } from "./common/setTheme";
// import 'vue-awesome/icons/sitemap';
// import 'vue-awesome/icons/camera';
// import 'vue-awesome/icons/ban';
// import 'vue-awesome/icons/hand-holding-usd';
// import awesomeIcon from 'vue-awesome/components/Icon'

// import appConfig from './common/appConfig';
import axios from "axios";
import NProgress from "nprogress";
// import VConsole from "vconsole";
import "nprogress/nprogress.css";
import store from "./common/util";
import VueResource from "vue-resource";
import VueScroller from "vue-scroller";
// import VueFab from "vue-float-action-button";

// import VueMaterial from 'vue-material';
// import VueSocketIO from 'vue-socket.io'
// import 'vue-material/dist/vue-material.css'

// import vueFinger from 'vue-finger-directive'
// import vueEsign from "vue-esign";
import watermark from "@/components/common/watermark.js";
// import VueSignaturePad from "vue-signature-pad";
// import JSEncrypt from "jsencrypt";
// 项目特殊字体，https://101.43.45.115/web/#/89?page_id=4205
// document.write('<link rel="stylesheet" href="static/fonts/appFont.css">');

let fontStyle = document.createElement('link');
fontStyle.href = 'static/fonts/appFont.css';
fontStyle.rel = 'stylesheet';
fontStyle.type = 'text/css';
document.head.appendChild(fontStyle);
// Vue.use(vueEsign);
// Vue.use(VueSignaturePad);
// Vue.use(vueFinger)
// Vue.use(VueMaterial)

// ECharts
// import ECharts from 'vue-echarts'
// Vue.component('v-chart', ECharts)

//添加全局自定义指令
Object.keys(directives).forEach(key => { //Object.keys(directives) gives ["alert","log"]
  Vue.directive(key, directives[key])
})

import {
  NoticeBar,
  NavBar,
  List,
  Cell,
  CellGroup,
  PullRefresh,
  Button,
  Tab,
  Tabs,
  Search,
  Field,
  Circle,
  Icon,
  ActionSheet,
  NumberKeyboard,
  Calendar,
  Row,
  Col,
  DatetimePicker,
  Picker,
  Popup,
  Uploader,
  Swipe,
  SwipeItem,
  Image,
  Lazyload,
  Tabbar,
  TabbarItem,
  Loading,
  Rate,
  Dialog,
  Collapse,
  CollapseItem,
  TreeSelect,
  Progress,
  Skeleton,
  SwipeCell,
  Form,
  Grid,
  GridItem,
  Stepper,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Empty,
  Tag,
  Steps,
  Step,
  Switch,
  Toast,
  sticky,
  Overlay,
  IndexBar,
  IndexAnchor,
  divider,
  DropdownMenu,
  DropdownItem,
  Popover,
  ImagePreview,
  GoodsAction,
  GoodsActionButton,
  Badge
} from "vant";
window.popTarget = [];
Popup.mixins.push({
  watch: {
    value: {
      handler(newValue, oldValue) {
        // console.log(newValue, oldValue)
        if (newValue == true) {
          popCount++;
          popIndex++;
          // console.log(popCount, popIndex)
          history.pushState(
            {
              popIndex: popIndex
            },
            null,
            document.URL
          );
          if (window.popTarget.length == 0) {
            window.addEventListener("popstate", closePop);
          }
          window.popTarget.push(this);
        } else if (newValue == false && oldValue !== undefined) {
          popCount--;
          // console.log(popCount, popIndex)
          if (popCount != popIndex) {
            history.go(-1);
            // console.log(popCount, popIndex)
          }
        }
        // console.log('tag', newValue, window.popTarget)
      },
      immediate: true
    }
  },
  created() {
    const onOpened = this.onOpened;
    let self = this
    this.onOpened = function opened() {
      self.$nextTick(() => {
        // 沉浸式状态栏时，100vh的弹窗高度要减去状态栏高度
        if (VuexStore.state.showTopDiv && self.$el.offsetHeight == document.documentElement.clientHeight) {
          self.$el.style.height = document.documentElement.clientHeight - VuexStore.state.statusBarHeight + 'px'
        }
      })
        return onOpened.call()
    };
  },
});
let popIndex = 0;
let popCount = 0;

function closePop(event) {
  if (VuexStore.state.isCallRouterGo && popCount > 0) {
    history.go(0 - popCount)
    popCount = 0;
    popIndex = 0;
    window.popTarget = [];
    VuexStore.commit("setCallRouterGo", false);
  } else {
    let currentPopTarget = window.popTarget.pop();
    if (popIndex == popCount) {
      currentPopTarget.close();
      // console.log('popTarget', window.popTarget)
    }
    popIndex =
      event.state?.popIndex && !event.state?.key ? event.state.popIndex : 0;
  }
  // console.log(popCount, popIndex)
  if (window.popTarget.length == 0) {
    window.removeEventListener("popstate", closePop);
  }
}

Vue.use(NoticeBar)
  .use(NavBar)
  .use(List)
  .use(Cell)
  .use(CellGroup)
  .use(PullRefresh)
  .use(Button)
  .use(Tab)
  .use(Tabs)
  .use(Search)
  .use(Field)
  .use(Circle)
  .use(Icon)
  .use(ActionSheet)
  .use(NumberKeyboard)
  .use(Calendar)
  .use(Row)
  .use(Popup)
  .use(DatetimePicker)
  .use(Col)
  .use(Picker)
  .use(Uploader)
  .use(Swipe)
  .use(SwipeItem)
  .use(Image)
  .use(Lazyload)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Loading)
  .use(Rate)
  .use(Dialog)
  .use(Collapse)
  .use(CollapseItem)
  .use(TreeSelect)
  .use(Progress)
  .use(Skeleton)
  .use(SwipeCell)
  .use(Form)
  .use(Grid)
  .use(GridItem)
  .use(Stepper)
  .use(Radio)
  .use(RadioGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Empty)
  .use(Tag)
  .use(Step)
  .use(Switch)
  .use(Steps)
  .use(Toast)
  .use(sticky)
  .use(Overlay)
  .use(VueBus)
  .use(IndexAnchor)
  .use(IndexBar)
  .use(VueResource)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Popover)
  .use(ImagePreview)
  .use(divider)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(Badge);

Vue.config.productionTip = false;
Vue.prototype.$vuex = VuexStore;
Vue.prototype.dsf = dsf;
Vue.prototype.$axios = axios;
Vue.prototype.$jsEncrypt = JSEncrypt;
Vue.use(VueScroller);
// Vue.use(VueFab, {
//   // iconType: 'iconfont'
//   iconType: "MaterialDesign"
// });

moment.locale('zh-cn');

// 组件缓存控制
// 全局注册（在 `main .js` 文件中）
// Vue.component('v-icon', awesomeIcon);
//通用空数据展示组件
import commonempty from "@/components/empty/empty.vue";
Vue.component("commonempty", commonempty);

import fileIframe from "@/components/common/file.vue";
Vue.component("fileIframe", fileIframe);

//通用事件总线组件
import eventBus from "./common/eventBus";
Vue.use(eventBus);

var vConsole;
console.log(window.location.href);
if (window.location.href.indexOf("isdebug=1") > -1) {
  import("vconsole").then(res => {
    let VConsole = res.default
    vConsole = new VConsole();
  })
}
// dsf.vConsole = vConsole;

Vue.prototype.$deleteCache = function (Content) {
  if (Content.$vnode && Content.$vnode.data.keepAlive) {
    if (
      Content.$vnode.parent &&
      Content.$vnode.parent.componentInstance &&
      Content.$vnode.parent.componentInstance.cache
    ) {
      if (Content.$vnode.componentOptions) {
        var key =
          Content.$vnode.key == null
            ? Content.$vnode.componentOptions.Ctor.cid +
            (Content.$vnode.componentOptions.tag
              ? `::${Content.$vnode.componentOptions.tag}`
              : "")
            : Content.$vnode.key;
        var cache = Content.$vnode.parent.componentInstance.cache;
        var keys = Content.$vnode.parent.componentInstance.keys;
        if (cache[key]) {
          if (keys.length) {
            var index = keys.indexOf(key);
            if (index > -1) {
              keys.splice(index, 1);
            }
          }
          delete cache[key];
        }
      }
    }
  }
};
// Vue.mixin({
//   beforeRouteLeave(to, from, next) {
//     /* const { cacheRouterPaths, cacheComponentInstance } = this.$store.state;
//     const fromPath = from.path.toLowerCase();
//     const isCache = cacheRouterPaths.find(it => {
//       return !!(it.toLowerCase() === fromPath);
//     })
//     if (!isCache) {
//       this.$destroy();
//     } else if(!cacheComponentInstance.some(it => it.route === fromPath)) {
//       this.$store.commit('updateCacheComponent', [
//         ...cacheComponentInstance,
//         {
//           route: fromPath,
//           context: this,
//         }
//       ])
//     } */
//     next()
//   }
// });
import Router from "vue-router";
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

//百度地图
// var baiduscript = document.createElement("script");
// baiduscript.type = "text/javascript";
// baiduscript.src = "http://api.map.baidu.com/api?v=2.0&ak=3gqRCzNgHHe1uMHGkrYzfv0o&callback=init";
// document.head.appendChild(baiduscript);
dsf.config.UBA={enable:0}
dsf.init.initPlatform(Vue);


let govDingLogin = function (DingConfig, toDo) {
  //动态加载政务钉钉JS
  const ddScript = document.createElement("script");
  ddScript.type = "text/javascript";
  ddScript.src = "https://g.alicdn.com/gdt/jsapi/1.9.35/index.js";
  document.body.appendChild(ddScript);
  ddScript.onload = () => {
    dd.ready(function () {
      dd.hideOptionMenu()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      //JS鉴权
      //alert("JSTicket"+DingConfig.ticket);
      dd.authConfig({
        ticket: DingConfig.ticket,
        jsApiList: [
          "postDing",
          "scan",
          "createVideoMeeting",
          "createChatGroup",
          "getGeolocation",
          "createDing",
          "closePage",
          "chooseSpaceDir",
          "uploadRemoteFileToDisk",
          "locateOnMap"
        ]
      }).then(resticket => {
        // alert(JSON.stringify(resticket))
      });
      if (!dsf.util.loadSessionStore("loginToken")) {
        store.clearSession();
        //用钉钉code兑换身份
        dd.getAuthCode()
          .then(result => {
            if (result) {
              //     //后台钉钉登录
              dsf.http
                .post("fn/govDing/login", {
                  code: result.code
                })
                .then(function (loginData) {
                  if (loginData.data.rcode == 1) {
                    store.saveToSessionStore("user", loginData.data.data);
                    store.saveToLocalStore("user", loginData.data.data);
                    store.saveToSessionStore(
                      "loginToken",
                      loginData.data.data.auth.token
                    );
                    store.saveToSessionStore("Role", loginData.data.data.role);
                    store.logIn(() => {
                      beforeNext(toDo);
                    });
                  } else {
                    if (dsf.config.setting["SYS-MOBILE-DINGDING-0027"]) {
                      // 单点登录失败跳转地址
                      if (
                        dsf.config.setting["SYS-MOBILE-DINGDING-0027"].indexOf(
                          "http"
                        ) == 0
                      ) {
                        location.href =
                          dsf.config.setting["SYS-MOBILE-DINGDING-0027"];
                      } else {
                        toDo({
                          path: dsf.config.setting["SYS-MOBILE-DINGDING-0027"]
                        });
                      }
                    }
                    console.log(loginData.data.message);
                  }
                });
            }
          })
          .catch(err => {
            alert(err);
          });
      }
    });
    // store.clearSession();
    // dsf.http.post('fn/govDing/login', { code: "111" })
    // .then(function (loginData) {
    //   //alert("444"+JSON.stringify(loginData))
    //   if (loginData.data.rcode == 1) {
    //     store.saveToSessionStore("user", loginData.data.data);
    //     store.saveToSessionStore("loginToken", loginData.data.data.auth.token);
    //     store.saveToSessionStore("Role", loginData.data.data.role);
    //   }
    //   toDo();
    // }).catch(err => {
    //   alert("error"+JSON.stringify(err));
    // });
  };
};

let DingLogin = function (DingConfig, toDo) {
  import("dingtalk-jsapi")
    .then(dd => {
      window.dd = dd;
      dd.ready(function () {
        store.clearSession();
        // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。  zjpCode
        // alert("dd-jsapi准备就绪   开始获取免密code");
        dd.runtime.permission.requestAuthCode({
          //县政钉
          corpId: dsf.config.ddSetting.ddCoprId,
          onSuccess: function (result) {
            dsf.http
              .post(`/fn/mobileDingTalkAuth/login?code=${result.code}`, {})
              .then(function (result) {
                if (result.data.rcode == 1) {
                  //console.log(result.data);
                  store.saveToSessionStore("user", result.data.data);
                  store.saveToLocalStore("user", result.data.data);
                  store.saveToSessionStore(
                    "loginToken",
                    result.data.data.auth.token
                  );
                  store.saveToSessionStore("Role", result.data.data.role);
                  //鉴权
                  //钉钉获取token getDingTalkToken
                  return dsf.http.get(`/fn/DingDing/getToken`, {});
                } else if (result.rcode == 0) {
                  dd.device.notification.alert({
                    message: result.message,
                    title: "温馨提示", //可传空
                    buttonName: "确定",
                    onSuccess: function () { },
                    onFail: function (err) { }
                  });
                } else {
                  dd.device.notification.alert({
                    message: "登录失败!",
                    title: "温馨提示", //可传空
                    buttonName: "确定",
                    onSuccess: function () { },
                    onFail: function (err) { }
                  });
                }
              })
              .then(function (token) {
                if (token.data && token.data.message) {
                  //钉钉获取ticket  getDingTalkTicket
                  return dsf.http.get(
                    `/fn/DingDing/getTicket?token=${token.data.message}`,
                    {}
                  );
                } else {
                  dsf.layer.toast("获取钉钉token出错");
                }
              })
              .then(function (ticket) {
                //换取ticket
                if (ticket.data && ticket.data.message) {
                  //钉钉获取签名参数  getDingTalkSignature
                  let url_ = window.location.href; //获取签名url不带#后面的东西
                  let url = url_.split("#")[0];
                  var $chars =
                    "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                  var maxPos = $chars.length;
                  var pwd = "";
                  for (var i = 0; i < 16; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                  }
                  let nonceStr = pwd;
                  var agentId = dsf.config.ddSetting.ddAgentId;
                  var timeStamp = Date.parse(new Date());
                  var corpId = dsf.config.ddSetting.ddCoprId;

                  dsf.http
                    .get(
                      `/fn/DingDing/getSign2?ticket=${ticket.data.message}&nonceStr=${nonceStr}&timeStamp=${timeStamp}&url=${url}`,
                      {}
                    )
                    .then(function (autograph) {
                      if (autograph.data && autograph.data.message) {
                        dd.config({
                          agentId: DingConfig.agentId, // 必填，微应用ID
                          corpId: DingConfig.corpId, //必填，企业ID
                          timeStamp: timeStamp, // 必填，生成签名的时间戳
                          nonceStr: nonceStr, // 必填，生成签名的随机串
                          signature: autograph.data.message, // 必填，签名
                          type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                          jsApiList: [
                            "device.connection.getNetworkType",
                            "device.base.getWifiStatus",
                            "device.base.getPhoneInfo",
                            "device.base.getUUID",
                            "biz.cspace.saveFile",
                            "biz.conference.videoConfCall",
                            "biz.util.scan",
                            "biz.ding.create",
                            "biz.microApp.openApp",
                            "biz.util.openLink",
                            "biz.contact.createGroup",
                            "biz.util.uploadAttachment",
                            "biz.chat.toConversation"
                          ]
                        });
                        store.logIn(() => {
                          beforeNext(toDo);
                        });
                      } else {
                        dsf.layer.toast("钉钉JS签名出错");
                      }
                    });
                }
              });
          },
          onFail: function (err) {
            var str = JSON.stringify(err);
            alert("失败" + str);
          }
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

let devicelogin = function (toDo) {
  document.addEventListener("deviceready", function () {
    console.log("deviceready2");

    xsfCommon.SystemTools(
      ["DeviceId"],
      function (result) {
        let myUUID = JSON.parse(result).DeviceId;
        //1.绑定状态，直接的登录，2.锁定状态，禁止使用，3.解绑状态，等于无 4.不绑定设备
        dsf.http
          .get("fn/sso/devicecheck?DeviceId=" + myUUID)
          .then(data => {
            switch (data.data.facilityState) {
              case 1:
                store.saveToSessionStore("user", data.data.data);
                store.saveToLocalStore("user", loginData.data.data);
                store.saveToSessionStore(
                  "loginToken",
                  data.data.data.auth.token
                );
                store.saveToLocalStore("loginToken", data.data.data.auth.token);
                store.saveToLocalStore("user", data.data.data);

                store.logIn(() => {
                  if (dsf.util.loadLocalStore("gesture_pas")) {
                    toDo({
                      path: "/testLogin"
                    });
                  } else {
                    beforeNext(toDo);
                  }
                });
                break;
              case 2:
                store.logIn(() => {
                  toDo({
                    path: "/LockPage"
                  });
                });
                break;
              case 3:
              case 4:
              default:
                toDo({
                  path: "/testLogin"
                });
                break;
            }
          })
          .catch(err => {
            console.log(err);
            dsf.layer.toast(err.message);
          });
      },
      function (error) {
        alert("open failed: " + error);
      }
    );
  });
};

let ssoLogin = function (toDo) {
  dsf.http
    .get("fn/sso/login")
    .then(data => {
      store.saveToSessionStore("user", data.data.data);
      store.saveToSessionStore("loginToken", data.data.data.auth.token);
      store.logIn(() => {
        beforeNext(toDo);
      });
    })
    .catch(err => {
      console.log(err);
      dsf.layer.toast(err.message);
    });
};

let weixinLogin = function (res, toDo, wxParams) {
  const wxScript = document.createElement("script");
  wxScript.type = "text/javascript";
  wxScript.src = "./static/js/jweixin-1.6.0.js";
  document.body.appendChild(wxScript);
  wxScript.onload = () => {
    let wxdata = {
      code: params.get("code"),
      accessUrl: encodeURIComponent(location.href)
    };
    if (toObj.query.agentId) wxdata.agentId = toObj.query.agentId;

    dsf.http
      .get("fn/wechat/auth", wxdata)
      .then(data => {
        console.log(
          wxParams.cropID,
          wxParams.timestamp,
          wxParams.nonceStr,
          wxParams.signature
        );
        store.saveToSessionStore("user", data.data.data);
        store.saveToLocalStore("user", data.data.data);
        store.saveToSessionStore("loginToken", data.data.data.auth.token);
        // js鉴权
        window.wx = wx;
        wx.ready(function () {
          console.log("wx", "ready");
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          wx.checkJsApi({
            jsApiList: ["previewFile", "openUrl", "getLocation", "onMenuShareWechat", "onMenuShareAppMessage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
          });
        });
        wx.error(function (res) {
          console.log(res);
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
        wx.config({
          beta: true,
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: wxParams.corpId, // 必填，粤政易的cropID
          timestamp: wxParams.timestamp, // 必填，生成签名的时间戳
          nonceStr: wxParams.noncestr, // 必填，生成签名的随机串
          signature: wxParams.signature, // 必填，签名，见附录1
          jsApiList: ["previewFile", "openUrl", "getLocation", "onMenuShareWechat", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        store.logIn(() => {
          beforeNext(toDo);
        });
      })
      .catch(err => {
        console.log(err);
        dsf.layer.toast(err.message);
      });
  };
};

//注册Cordova插件
let registerCordova = function () {
  window.addressIndex = 0;
  const ddScript = document.createElement("script");
  window.exitAppTicker = 0;

  let phone_system = store.checkSystem();
  ddScript.type = "text/javascript";
  switch (phone_system) {
    case "android":
      if (dsf.config.login.openMergeJS) {
        ddScript.src = "static/cordova/android/native2.js";
      } else {
        ddScript.src = "static/cordova/android/native.js";
      }
      break;
    case "ios":
      if (navigator.userAgent.indexOf("newDoc") > -1) {
        ddScript.src = "static/cordova/iosStore/cordova.js";
        console.log("iosStore");
      } else {
        ddScript.src = "static/cordova/iOS/merge.js";
        console.log("iOS");
      }
      break;
    default:
      break;
  }
  document.body.appendChild(ddScript);
  ddScript.onload = () => {
    console.log("cordova:成功");
    document.addEventListener(
      "deviceready",
      function () {
        console.log("deviceready");
        setAppTopColor()//设置app顶部颜色
        // 自动登录时不关闭引导页，待登录完成后再处理
        if (!dsf.util.loadLocalStore("autoLogin")) {
          navigator.splashscreen.hide();
        }
        if (dsf.config.appTopMenu.allowHideStatusTop) {
          dsf.dsfMobile.getStatusBarHeight((height) => VuexStore.commit('setStatusBarHeight', height))
          dsf.dsfMobile.setStatusTextColorDark(true)
        }
        commonCordova.addEventBackbutton("backbutton");
      },
      false
    );
  };
};
let wxAuthShGov = function () {
  if (window.wx) {
    return
  }
  const wxScript = document.createElement("script");
  wxScript.type = "text/javascript";
  wxScript.src = "./static/js/jweixin-1.6.0.js";
  document.body.appendChild(wxScript);
  wxScript.onload = () => {
    window.wx = wx
    //上海市政府一体化鉴权
    wx.config({
      beta: true, // 调用wx.invoke形式的接口值时，该值必须为true。
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: dsf.util.loadSessionStore('wxParams').corpId, // 必填，粤政易的cropID
      timestamp: dsf.util.loadSessionStore('wxParams').timestamp, // 必填，生成签名的时间戳
      nonceStr: dsf.util.loadSessionStore('wxParams').noncestr, // 必填，生成签名的随机串
      signature: dsf.util.loadSessionStore('wxParams').signature, // 必填，签名，见附录1
      jsApiList: ["previewFile", "request3rdApp", "openUrl", "onMenuShareWechat", "onMenuShareAppMessage", "openChatWithMsg", "request3rdApp", "scanQRCode"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      wx.checkJsApi({
        jsApiList: ["previewFile", "request3rdApp", "openUrl", "onMenuShareWechat", "onMenuShareAppMessage", "openChatWithMsg", "request3rdApp", "scanQRCode"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
      })
    })
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，
      //具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    })
  }
}
let beforeNext = function (toDo) {
  if (toObj.name == "testLogin") {
    // 去登录页之前 判断版本号是否为新，且有引导图片 则跳转引导页
    let localVersion = store.loadLocalStore("version") || "";
    if (
      (!localVersion || localVersion != newVersion) &&
      dsf.config.guidePage.data &&
      dsf.config.guidePage.data.length > 0
    ) {
      store.saveToLocalStore("version", newVersion);
      toDo("/guide");
    }
  }
  if (
    goUrls.indexOf(toObj.name.toLowerCase()) < 0
    && !dsf.util.loadSessionStore("defaultcount")
    && dsf.util.loadSessionStore("footerMenu")
    && toObj.name == "index"
  ) {
    dsf.util.saveToSessionStore("defaultcount", true);
    let urlTemp = "";
    if (dsf.util.loadSessionStore("footerMenu").length > 0) {
      urlTemp = dsf.util.loadSessionStore("footerMenu").filter(item => item.isShow && item.checked)[0].router
    }
    //有默认路由的菜单地址，并且非单点模式的才走强行跳转 2023年3月2日19:47:05@ly
    if (urlTemp)
      // toDo(urlTemp)
      toDo({ path: urlTemp, replace: true });
    else toDo()

  } else {
    toDo();
  }
};

//dsf.util.removeSessionStore("defaultcount");

let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
window.toObj = null;
window.fromObj = null;

let tocken;
//无需判断的路由数组
let goUrls = [
  "wanerror",
  "agentlogin",
  "qixiangjudinglogin",
  "qixiangjulogin",
  "lockpage",
  "guide",
  "testlogin",
  "checklogin",
  "chatlogin",
  "meetinglogin",
  "autologin",
  "ssologin",
  "autologintourl",
  "canvasgesture",
  "meetingpcreply",
  "assistant",
  "emergencylogin",
  "loginpeopledaily",
  "lognameautologin",
];
let newVersion;
router.beforeEach((to, from, next) => {
  // 当系统允许沉浸式状态栏时，根据配置的dsf.config.appTopMenu.statusTopPath路径，不在配置中的页面显示用于填充状态栏的空白div
  if (!dsf.config.appTopMenu.allowHideStatusTop || dsf.config.appTopMenu.statusTopPath.includes(to.path)) {
    VuexStore.commit("changeShowTopDiv", false);
  } else {
    VuexStore.commit("changeShowTopDiv", true);
  }
  VuexStore.commit("setCallRouterGo", false);
  // ios 头部吸顶位置错乱 问题临时解决(暂无法定位具体原因)
  if (history.scrollRestoration) {
    history.scrollRestoration = 'manual'
  }
  // to.query有属性为undefined时，不显示在url中，当使用history.go(-1)关闭pop层时
  // vue - router比对route(有值为undefined的属性)与url解析的route(无值为undefined的属性)不一致，认为是路由跳转，再次执行路由守卫导致title变化产生bug
  // 解决：跳转时删除undefined属性
  Object.keys(to.query).forEach((key) => {
    if (to.query[key] === undefined) delete to.query[key]
  })
  let meta = to.meta || {};
  let docTitle =
    to.query.title ||
    meta.title ||
    dsf.config.login.applicationName
  if (docTitle) urlJs.setTitle(docTitle);

  if (dsf.config.otherNoAuthRoutes) {
    goUrls = [...goUrls, ...dsf.config.otherNoAuthRoutes];
  }
  toObj = to;
  fromObj = from;

  if (!dsf.config.login.isHiddenLoading) {
    NProgress.start();
    dsf.loadingImage.show(); //统一的loading  后续可扩展
  }

  if (params.get("agentId")) {
    dsf.config.ddSetting.ddAgentId = params.get("agentId");
  }
  tocken = dsf.util.loadSessionStore("loginToken");
  if (tocken) {
    VuexStore.commit(
      "changeAppFooter",
      dsf.util.loadSessionStore("footerMenu")
    );
    VuexStore.commit("changeAppHeader", dsf.config.appTopMenu);
  }

  let consoleType = dsf.util.getClientName();
  let getConfigParams = {
    type: consoleType
  };
  if (to.query.agentId) getConfigParams.agentId = to.query.agentId;
  //开发环境中直接跳转登录页
  if (process.env.NODE_ENV === "development") {
    // dsf.http.post('fn/common/getConfig', {
    //   type: "app"
    // }).
    // then(returnRes => {
    //   let res = returnRes.data;
    //   //alert("corpid:"+ res.corpId);
    //   dsf.config.ddSetting.ddCoprId = res.corpId;
    //   dsf.config.ddSetting.ddAgentId = res.agentId;
    //   dsf.config.previewSetting.previewLocation = res.previewLocation;
    //   dsf.config.previewSetting.previewType = res.previewType;
    //   dsf.config.ddSetting.dingdingType = res.type;
    //   dsf.config.ddSetting.isDing = res.type == 'govding' || res.type == 'dingding' ? true : false
    //   dsf.util.saveToSessionStore("previewLocation", res.previewLocation)
    //   if (res.setting && res.setting["SYS-MOBILE-0001"] == 1) {
    //     var vConsole = new VConsole();
    //   }
    //   registerCordova(function(){
    // 	devicelogin(next)
    //   });
    // }).catch(err => {});
    // return
    // next();
    //  window.location.href="http://192.168.1.29:9090/DreamMobile/dist/index.html?isdebug=1#/";
    //  return;
  }
  // 纯前端测试静态资源速度页，不请求任何接口
  if (to.name == 'testLoading') {
    beforeNext(next);
    return
  };
  if (
    !tocken &&
    process.env.NODE_ENV != "development" &&
    goUrls.indexOf(to.name.toLowerCase()) < 0 &&
    to.name.toLowerCase().indexOf("login") < 0
  ) {
    dsf.http
      .post("fn/common/getConfig", getConfigParams)
      .then(returnRes => {
        let res = returnRes.data;
        //alert("corpid:"+ res.corpId);
        dsf.config.ddSetting.ddCoprId = res.corpId;
        dsf.config.ddSetting.ddAgentId = res.agentId;
        dsf.config.previewSetting.previewLocation = res.previewLocation;
        dsf.config.previewSetting.previewType = res.previewType;
        dsf.config.ddSetting.dingdingType = res.type;
        dsf.config.ddSetting.isDing =
          res.type == "govding" || res.type == "dingding" ? true : false;
        dsf.config.setting = res.setting;
        dsf.config.guidePage = res.guidePage;
        dsf.util.saveToSessionStore("previewLocation", res.previewLocation);
        newVersion = res.guidePage.version;
        if (res.setting && res.setting["SYS-MOBILE-0001"] == 1) {
          import("vconsole").then(res => {
            let VConsole = res.default
            vConsole = new VConsole();
          })
        }
        //主题初始化
        initTheme();
        setAppTopColor()//设置app顶部颜色

        if (params.get("noAutoLogin") == 1) {
          beforeNext(next);
        }
        else if (dsf.config.login.xindunLogin) {
          let urlTemp = `${dsf.config.login.xindunLogin}?service=` + encodeURIComponent(`${dsf.url.getRootPath()}ctrl/login/casso?state=` + dsf.base64.encode(`${window.location.href.split('#')[1]}`).replace(/\//gm, "@"));
          console.log("您进行了未授权的访问，本地token ->" + dsf.util.loadSessionStore("loginToken"));
          console.log("location.href ->", location.href);
          console.log("urlTemp ->", urlTemp);
          dsf.layer.toast("您进行了未授权的访问", () => location.replace(urlTemp));
        }
        else if (res.type == "govding") {
          //政务钉钉免登
          govDingLogin(res, next);
        } //普通钉钉免登
        else if (res.type == "dingding") {
          DingLogin(res, next);
        } else if (res.type == "xunmeng") {
          ssoLogin(next); //讯盟单点
        } else if (res.type == "devicelogin") {
          //设备id单点
          devicelogin(next);
        } else if (res.type == "wechat") {
          if (!params.get("code") && to.query.code) {
            params.append("code", to.query.code);
          }
          let wxParams = {
            corpId: res.corpId,
            noncestr: res.noncestr,
            timestamp: res.timestamp,
            ticket: res.ticket,
            signature: res.signature
          };
          dsf.util.saveToSessionStore("wxParams", wxParams);
          weixinLogin(res, next, wxParams); //微信登录
        } else {
          beforeNext(next);
        }
      })
      .catch(err => {
        // next();
        beforeNext(next);
        // alert("getConfigError"+JSON.stringify(err));
      });
  } else {
    if (!dsf.config.setting) {
      dsf.http
        .post("fn/common/getConfig", getConfigParams)
        .then(returnRes => {
          let res = returnRes.data;
          dsf.config.ddSetting.ddCoprId = res.corpId;
          dsf.config.ddSetting.ddAgentId = res.agentId;
          dsf.config.previewSetting.previewLocation = res.previewLocation;
          dsf.config.previewSetting.previewType = res.previewType;
          dsf.config.ddSetting.dingdingType = res.type;
          dsf.config.ddSetting.isDing =
            res.type == "govding" || res.type == "dingding" ? true : false;
          dsf.config.setting = res.setting;
          dsf.config.guidePage = res.guidePage;
          dsf.util.saveToSessionStore("previewLocation", res.previewLocation);
          newVersion = res.guidePage.version;
          if (res.setting && res.setting["SYS-MOBILE-0001"] == 1) {
            import("vconsole").then(res => {
              let VConsole = res.default
              vConsole = new VConsole();
            })
          }
          if (res.type == "govding") {
            govDingLogin(res, next);
          }
          //主题初始化
          initTheme();
          setAppTopColor()//设置app顶部颜色

          let wxParams = {
            corpId: res.corpId,
            noncestr: res.noncestr,
            timestamp: res.timestamp,
            ticket: res.ticket,
            signature: res.signature
          };
          dsf.util.saveToSessionStore("wxParams", wxParams);
          if (res.type == 'wechat' && dsf.config.projectName == 'shGovYth') {
            wxAuthShGov()
          }
          beforeNext(next);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      beforeNext(next);
    }
    // next();
  }
  // //用户是否授权，你们获取
  // if (!user) {
  //   user.getAuthCode(() => {
  //     //加载最后一次学习的课程
  //     store.commit("Media_LoadLastStudy");
  //     next();
  //   }, NProgress);
  // } else {
  //   next();
  // }
});

router.afterEach((to, from) => {
  if (!dsf.config.login.isHiddenLoading) {
    NProgress.done();
  }
  dsf.loadingImage.hide();

  // [浙政钉]埋点
  appCollection.RegisterAppCollectionJS();

  // [随申办]鉴权、设置页面标题
  eshimin.init();

  // 初始化页面水印
  watermark.init(to);

  // 加载项目特殊JsSdk
  customJsLoader.init();

  //自动登录后关闭引导页
  if (dsf.util.loadLocalStore("autoLogin") && from.name == "testLogin" && dsf.util.getClientName() == "app") {
    window.vueObj.$nextTick(() => {
      navigator.splashscreen?.hide();
    })
  }
});
window.addEventListener('resize', () => {
  setTimeout(() => {
    dsf.config.clientType = dsf.util.getClientType();
    VuexStore.commit("setClientType", dsf.config.clientType);
  }, 0)
}, false)

let configUrl = 'static/config.json'
if (window.navigator.userAgent.toLowerCase().includes('micromessenger')) configUrl = 'static/configWx.json'
dsf.http
  .getNoRootUrl(configUrl + "?t=" + Math.random())
  .then(async config => {
    if (config.data == null) {
      alert("请检查config.json是否存在，或修改过的配置是否符合json数据格式");
    }
    dsf.config = Object.assign(dsf.config, config.data);
    // 因为flexble中的dsf.util.loadLocalStore方法需要获取配置项，读取完config配置之后再引入flexble
    import('./common/flexble')
    await getConfigProject() // 获取项目特殊配置config
    dsf.util.mixUnitConfig()
    VuexStore.commit("changeAppHeader", dsf.config.appTopMenu);
    if (navigator.userAgent.indexOf("DreamSoft") > -1 && location.href.indexOf("isdjOpen") < 0) {
      registerCordova();
    }
    VuexStore.commit("changePageTitle", dsf.config.login.applicationName)
    dsf.config.clientType = dsf.util.getClientType();
    VuexStore.commit("setClientType", dsf.config.clientType);
    //console.log(dsf.config.clientType)
    var vue = new Vue({
      el: "#app",
      router,
      store: VuexStore,
      render: h => h(App)
    });
    window.vueObj = vue;
  })
  .catch(err => {
    dsf.layer.toast(err.message);
  });
function getConfigProject() {
  return new Promise(resolve => {
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
      }).finally(() => {
        resolve()
      })
  })
}
