/*
 * 项目特殊JsSdk加载
 */

import dsf from ".";
import store from "@/common/util";

let token;

//初始化
let init = function () {
  // [赣政通]APM（第三方流量监控）用户ID设置
  if (dsf.config.projectName == "ganzhengtong") {
    if (store.loadSessionStore("user")?.user_id) {
      if (!store.loadLocalStore("TY_USER_ID") || store.loadLocalStore("TY_USER_ID") != store.loadSessionStore("user")?.user_id) {
        store.saveToLocalStore("TY_USER_ID", store.loadSessionStore("user")?.user_id);
        console.log("TY_USER_ID", store.loadLocalStore("TY_USER_ID"), store.loadSessionStore("user")?.name);
        if (!isInclude("tingyun_rum.js")) loadJsSdk("./static/js/tingyun_rum.js");
      }
    }
  }
}

//加载JsSdk
let loadJsSdk = function (src) {
  console.log("loadJsSdk");
  dsf
    .loadJs(src)
    .then(() => {
      console.log("jssdk-loaded", src);
    });
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
