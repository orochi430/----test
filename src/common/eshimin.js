/*
随申办相关
2022年10月17日@xiaocy
*/

import dsf from ".";
import store from "@/common/util";

let token;

//eshimin初始化
let init = function () {
  if (store.getClientName() == "eshimin") {
    token = "";
    dsf.http
      .get("getToken")
      .done(res => {
        if (res.code == 0) {
          token = res.data.accessToken;
          console.log("accessToken=>", token);
        } else {
          throw res.msg;
        }
      })
      .done(() => {
        if (isInclude("eshiminJS-2.0.0.js")) {
          setConfig();
        } else {
          addListener();
          loadJsSdk("https://api.eshimin.com/api/js/eshiminJS-2.0.0.js");
        }
      })
      .error(err => {
        console.log("eshimin-init-error", err);
      })
      .always(() => { });
  } else if (window.vueObj.$route.query.ctype == "esmwx") { // 微信小程序
    console.log("esmwx");
    if (!isInclude("jweixin-1.6.0.js")) loadJsSdk("./static/js/jweixin-1.6.0.js");
  } else if (window.vueObj.$route.query.ctype == "esmappx") { // 支付宝小程序
    console.log("esmappx");
    if (!isInclude("web-view.min.js")) loadJsSdk("https://appx/web-view.min.js");
  }
}

//加载JsSdk
let loadJsSdk = function (src) {
  console.log("loadJsSdk");
  // 市⺠云jsSdk
  dsf
    .loadJs(src)
    .then(() => {
      console.log("eshimin-jssdk-loaded");
    });
}

//监听jsSdk初始化
let addListener = function () {
  console.log("addListener");
  document.addEventListener(
    "eshimin-initialized",
    function () {
      console.log("eshimin initialized");
      //第⼀时间注⼊权限配置
      setConfig();
    },
    false
  );
  //外链返回时重置title
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) setTitle();
  });
}

//jsSdk鉴权
let setConfig = function () {
  eshimin.config({
    debug: dsf.vConsole ? true : false, //开启调试模式，调试模式下会输出部分便于定位问题的log。发布时注意切换为false
    signature: token, //签名
    jsApiList: ["setTitle", "closeWindow", "openService", "saveImage"] //需要使⽤的接⼝列表
  });
  eshimin.ready(function () {
    console.log("eshimin ready");
    //配置注⼊成功，校验通过
    console.log("eshimin=>", eshimin);
    setTitle();
  });
  eshimin.error(function (message) {
    //失败，配置校验不通过
    console.log("eshimin error:", message);
  });
}

//设置窗口标题
let setTitle = function () {
  if (!eshimin) return;
  //注⼊成功后⽴即设置窗⼝标题
  console.log(`eshimin-invoke-setTitle`);
  eshimin.invoke(
    "setTitle",
    {
      title: window.toObj.meta.title //this.$route.meta.title
    },
    function (res) {
      console.log(`eshimin-invoke-setTitle`, "res=>", res);
      if (res.errorCode == 0) {
      } else {
        dsf.layer.toast(res.errorMessage);
      }
    }
  );
}

//检测js
function isInclude(name) {
  let js = /js$/i.test(name);//正则表达式查找页面是否有js
  let es = document.getElementsByTagName(js ? 'script' : 'link');//如果有js，页面查找script
  for (let i = 0; i < es.length; i++)
    if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) {
      return true;
    }
  return false;
}

export default {
  init
};
