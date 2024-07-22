/*
浙政钉信息采集通用JS
2021年3月18日@ly
*/

import dsf from ".";
import store from "@/common/util";
//注册稳定性监控
let RegisterWpkReporter = function () {
  try {
    let appRouter = window.toObj.name; //默认路由名
    if (window.toObj.name == "commonList") {
      if (window.toObj.query.fileType) {
        //commonList中fileType参数模式
        appRouter = window.toObj.query.fileType;
      } else if (window.toObj.params.listId) {
        //commonList通用模式
        appRouter = window.toObj.params.listId;
      }
    }
    let itemSetting = dsf.config.EnableBuriedPoint.itemSetting.find(item => item.appRouter == appRouter);
    if (!itemSetting) return

    //稳定性监控   如果已经成功注册稳定性监控则不再注册
    console.log("window._wpk", window._wpk)
    const config = {
      bid: itemSetting.config.bid,
      signkey: itemSetting.config.signkey,
      gateway: itemSetting.config.gateway
    };
    const wpk = new wpkReporter(config);
    wpk.installAll();
    window._wpk = wpk;
    console.log('稳定性监控注册成功', window._wpk);
  } catch (err) {
    console.error('WpkReporter init fail', err);
  }
}

//检测js
function isInclude(name) {
  var js = /js$/i.test(name);//正则表达式查找页面是否有js
  var es = document.getElementsByTagName(js ? 'script' : 'link');//如果有js，页面查找script
  for (var i = 0; i < es.length; i++)
    if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) {
      return true;
    }
  return false;
}

//注入App应用信息采集JS
let RegisterAppCollectionJS = function () {
  if (store.getClientName() == "govding" && dsf.config.EnableBuriedPoint && dsf.config.EnableBuriedPoint.value) {
    console.log("判断是否存在jquery.min.js", isInclude("jquery.min.js"))
    if (isInclude("jquery.min.js")) {
      ApplicationCollection()//流量分析
    } else {
      const jqueryScript = document.createElement('script');
      jqueryScript.type = 'text/javascript';
      jqueryScript.src = 'https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js';
      document.head.appendChild(jqueryScript);
      jqueryScript.onload = () => {
        const zjzwfwScript = document.createElement('script');
        zjzwfwScript.type = 'text/javascript';
        zjzwfwScript.src = 'https://wpk-gate.zjzwfw.gov.cn/static/wpk-jssdk.1.0.2/wpkReporter.js';
        zjzwfwScript.crossorigin = 'true';
        document.head.appendChild(zjzwfwScript);
        zjzwfwScript.onload = () => {
          //通用采集 SDK
          (function (w, d, s, q, i) {
            w[q] = w[q] || [];
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s);
            j.async = true;
            j.id = 'beacon-aplus';
            j.src = 'https://alidt.alicdn.com/alilog/mlog/aplus_cloud.js';
            f.parentNode.insertBefore(j, f);
            j.onload = () => {
              RegisterWpkReporter()//稳定性监控
              ApplicationCollection()//流量分析
            }
          })(window, document, 'script', 'aplus_queue');

        };
      };
    }
  }
}
//App应用信息采集JS
let ApplicationCollection = function () {
  console.log("当前路由：", toObj);
  try {
    if (store.getClientName() == "govding" && dsf.config.EnableBuriedPoint && dsf.config.EnableBuriedPoint.value) {
      let appRouter = window.toObj.name; //默认路由名
      if (window.toObj.name == "commonList") {
        if (window.toObj.query.fileType) {
          //commonList中fileType参数模式
          appRouter = window.toObj.query.fileType;
        } else if (window.toObj.params.listId) {
          //commonList通用模式
          appRouter = window.toObj.params.listId;
        }
      }
      let itemSetting = dsf.config.EnableBuriedPoint.itemSetting.find(item => item.appRouter == appRouter);
      if (!itemSetting) return

      //通用采集开始
      try {
        aplus_queue.push({
          action: 'aplus.setMetaInfo',
          arguments: ['aplus-rhost-v', 'alog.zjzwfw.gov.cn']
        });
        aplus_queue.push({
          action: 'aplus.setMetaInfo',
          arguments: ['aplus-rhost-g', 'alog.zjzwfw.gov.cn']
        });

        var u = navigator.userAgent
        var isAndroid = u.indexOf('Android') > -1
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

        aplus_queue.push({
          action: 'aplus.setMetaInfo',
          arguments: ['appId', isAndroid ? '28302650' : isIOS ? '28328447' : '47130293']
        });

        console.log('通用采集成功');
      } catch (error) {
        console.error('通用采集失败', error);
      }
      //通用采集结束

      //基础埋点
      try {
        // 单页应用 或 “单个页面”需异步补充PV日志参数还需进行如下埋点：
        // aplus_queue.push({
        //   action: 'aplus.setMetaInfo',
        //   arguments: ['aplus-waiting', 'MAN']
        // });
        // 单页应用路由切换后 或 在异步获取到pv日志所需的参数后再执行sendPV：
        aplus_queue.push({
          'action': 'aplus.sendPV',
          'arguments': [{
            is_auto: false
          }, {
            // 当前你的应用信息，此两行请勿修改
            sapp_id: itemSetting.sappId,
            sapp_name: itemSetting.sappName,
            // 自定义PV参数key-value键值对（只能是这种平铺的json，不能做多层嵌套），如：
            page_id: appRouter,
            page_name: window.toObj.meta && window.toObj.meta.title || "移动办公",
            page_url: window.location.href
          }]
        })
        console.log('基础埋点成功');
      } catch (error) {
        console.error('基础埋点失败', error);
      }

      if (dsf.util.loadSessionStore("user")) {
        const user = dsf.util.loadSessionStore("user");

        //用户信息埋点
        // 如采集用户信息是异步行为需要先执行这个BLOCK埋点
        aplus_queue.push({
          action: 'aplus.setMetaInfo',
          arguments: ['_hold', 'BLOCK']
        });

        // 设置会员ID
        aplus_queue.push({
          action: "aplus.setMetaInfo",
          arguments: ["_user_id", user.foreignId]
        });
        // aplus_queue.push({
        //   action: "aplus.setMetaInfo",
        //   arguments: ["_dev_id", "设备ID是业务定义的，用于定义唯一的设备标识。这个目前没有要求，可不设置。"]
        // });
        // 如采集用户信息是异步行为，需要先设置完用户信息后再执行这个START埋点
        // 此时被block住的日志会携带上用户信息逐条发出
        aplus_queue.push({
          action: 'aplus.setMetaInfo',
          arguments: ['_hold', 'START']
        });

        console.log('用户信息埋点执行成功user.foreignId：' + user.foreignId);
      }
    }
  } catch (error) {
    console.error("埋点错误：", error)
  }
}


export default {
  RegisterAppCollectionJS,
  ApplicationCollection
};
