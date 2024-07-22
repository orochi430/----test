<template>
  <div></div>
</template>
<script>
import store from "@/common/util";

// import * as dd from "dingtalk-jsapi";
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: [],
  mounted() {
    this.dingLogin();
  },
  methods: {
    dingLogin() {
      let self = this;
      // alert(dd.version)
      //判断是否在钉钉容器内
      if (dd.env.platform != "notInDingTalk") {
        dd.ready(function() {
          store.clearSession();
          // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。  zjpCode
          // alert("dd-jsapi准备就绪   开始获取免密code");
          dd.runtime.permission.requestAuthCode({
            //县政钉
            corpId: dsf.config.ddSetting.ddCoprId,
            onSuccess: function(result) {
              // alert("成功结果:" + JSON.stringify(result));
              // alert(result.code);

              //alert("钉钉授权成功");
              window.GLOBAL = {};
              window.GLOBAL.zjpCode = result.code;
              self.getUserInfo();
            },
            onFail: function(err) {
              var str = JSON.stringify(err);
              alert("失败" + str);
            }
          });
        });
      } else {
        self.$router.push({ name: "testLogin" });
      }
    },
    //免密code登录
    getUserInfo() {
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        onClose: () => {
          //关闭加载框执行
          this.$router.push({ name: "Home" });
        }
      });
      let self = this;
      dsf.http
        .post(`/fn/mobileDingTalkAuth/login?code=${window.GLOBAL.zjpCode}`, {})
        .then(function(result1) {
          let result = result1.data;
          if (result.rcode == 1) {
            store.saveToSessionStore("user", result.data);
            store.saveToSessionStore("loginToken", result.data.auth.token);
            store.saveToSessionStore("Role", result.data.role);

            //鉴权
            self.getDingTalkToken();
          } else if (result.rcode == 0) {
            dd.device.notification.alert({
              message: result.message,
              title: "温馨提示", //可传空
              buttonName: "确定",
              onSuccess: function() {},
              onFail: function(err) {}
            });
          } else {
            dd.device.notification.alert({
              message: "登录失败!",
              title: "温馨提示", //可传空
              buttonName: "确定",
              onSuccess: function() {},
              onFail: function(err) {}
            });
          }
        });
    },
    //生成随机字符串
    randomString(len) {
      len = len || 32;
      var $chars =
        "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length;
      var pwd = "";
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    //钉钉获取token getDingTalkToken
    getDingTalkToken() {
      var self = this;
      dsf.http.get(`/fn/DingDing/getToken`, {}).then(function(result1) {
        let result = result1.data;
        if (result && result.message) {
          // alert(JSON.stringify(result));
          self.getDingTalkTicket(result.message);
        }
      });
      // dd.error(function(error) {
      //   alert("dd error: " + JSON.stringify(error));
      // });
    },
    //钉钉获取ticket  getDingTalkTicket
    getDingTalkTicket(token) {
      var self = this;
      var dingTicket = "";
      dsf.http
        .get(`/fn/DingDing/getTicket?token=${token}`, {})
        .then(function(result1) {
          let result = result1.data;
          // alert("ticket____" + JSON.stringify(result));
          if (result && result.message) {
            dingTicket = result.message;
            self.getDingTalkSignature(dingTicket);
          }
        });
    },
    //钉钉获取签名参数  getDingTalkSignature
    getDingTalkSignature(dingTicket) {
      var url_ = window.location.href; //获取签名url不带#后面的东西
      var url = url_.split("#")[0];
      var nonceStr = this.randomString(16);
      var agentId = dsf.config.ddSetting.ddAgentId;
      var timeStamp = Date.parse(new Date());
      var corpId = dsf.config.ddSetting.ddCoprId;
      var self = this;
      // alert(
      //   `/fn/DingDing/getSign2?ticket=${dingTicket}&nonceStr=${nonceStr}&timeStamp=${timeStamp}&url=${url}`
      // );
      dsf.http
        .get(
          `/fn/DingDing/getSign2?ticket=${dingTicket}&nonceStr=${nonceStr}&timeStamp=${timeStamp}&url=${url}`,
          {}
        )
        .then(function(result1) {
          let result = result1.data;
          if (result && result.message) {
            self.dingTalkConfig(
              dsf.config.ddSetting.ddAgentId,
              dsf.config.ddSetting.ddCoprId,
              timeStamp,
              nonceStr,
              result.message
            );
          }
        });
    },
    //钉钉jsapi鉴权
    dingTalkConfig(agentId, corpId, timeStamp, nonceStr, signature) {
      this.$toast.clear();
      return dd.config({
        agentId: agentId, // 必填，微应用ID
        corpId: corpId, //必填，企业ID
        timeStamp: timeStamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
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
          "biz.cspace.saveFile",
          "biz.microApp.openApp",
          "biz.util.openLink"
        ]
      });

      dd.ready(function() {
        console.log("tag", "ddready");
        dsf.dd.scan(
          function() {},
          function() {}
        );
      });
    }
  }
};
</script>