<template>
  <!--  -->
  <div class="init-div"></div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";
export default {
  data() {
    return {};
  },
  created() {
    store.clearSession();
    let self = this;
    let state = this.$route.params.state;
    const ddScript = document.createElement("script");
    ddScript.type = "text/javascript";
    ddScript.src = "static/js/kinggrid/dingtalk.js";
    document.body.appendChild(ddScript);
    ddScript.onload = () => {
      dd.ready(function () {
        dd.runtime.permission.requestAuthCode({
          corpId: dsf.config.ddSetting.ddCoprId, //企业id
          onSuccess: function (info) {
            console.log(info);
            let varauthCode = info.code; //免登授权码
            dsf.http
              .post(`/fn/mobileProjectAuth/auth?authCode=${varauthCode}`, {})
              .then(function (result) {
                console.log(result);
                if (result.data.rcode == 1) {
                  //console.log(result.data);
                  store.saveToSessionStore("user", result.data.data);
                  store.saveToSessionStore(
                    "loginToken",
                    result.data.data.auth.token
                  );
                  store.saveToSessionStore("Role", result.data.data.role);
                  store.logIn(() => {
                    console.log(state);
                    if (state) {
                      let path = B64.decode(
                        state.replace(new RegExp("@", "gm"), "/")
                      );
                      console.log(path);
                      self.$router.replace(path);
                    } else {
                      self.$router.replace(
                        "/qixiangjuHome?backTo=http%3A%2F%2Fddydbg.nmic.cn%2Fhtml%2Findex.html"
                      );
                    }
                  });
                  //鉴权
                  //钉钉获取token getDingTalkToken
                  // return dsf.http.get(`/fn/DingDing/getToken`, {});
                } else if (result.rcode == 0) {
                  dd.device.notification.alert({
                    message: result.message,
                    title: "温馨提示", //可传空
                    buttonName: "确定",
                    onSuccess: function () {},
                    onFail: function (err) {},
                  });
                } else {
                  dd.device.notification.alert({
                    message: "登录失败!",
                    title: "温馨提示", //可传空
                    buttonName: "确定",
                    onSuccess: function () {},
                    onFail: function (err) {},
                  });
                }
              });
            // .then(function (token) {
            //   if (token.data && token.data.message) {
            //     //钉钉获取ticket  getDingTalkTicket
            //     return dsf.http.get(`/fn/DingDing/getTicket?token=${token.data.message}`, {})
            //   } else {
            //     dsf.layer.toast("获取钉钉token出错");
            //   }
            // }).then(function (ticket) { //换取ticket
            //   if (ticket.data && ticket.data.message) {
            //     //钉钉获取签名参数  getDingTalkSignature
            //     let url_ = window.location.href; //获取签名url不带#后面的东西
            //     let url = url_.split("#")[0];
            //     var $chars =
            //       "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            //     var maxPos = $chars.length;
            //     var pwd = "";
            //     for (var i = 0; i < 16; i++) {
            //       pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            //     }
            //     let nonceStr = pwd;
            //     var agentId = dsf.config.ddSetting.ddAgentId;
            //     var timeStamp = Date.parse(new Date());
            //     var corpId = dsf.config.ddSetting.ddCoprId;

            //     dsf.http.get(
            //       `/fn/DingDing/getSign2?ticket=${ticket.data.message}&nonceStr=${nonceStr}&timeStamp=${timeStamp}&url=${url}`, {}
            //     ).then(
            //       function (autograph) {
            //         if (autograph.data && autograph.data.message) {
            //           dd.config({
            //             agentId: DingConfig.agentId, // 必填，微应用ID
            //             corpId: DingConfig.corpId, //必填，企业ID
            //             timeStamp: timeStamp, // 必填，生成签名的时间戳
            //             nonceStr: nonceStr, // 必填，生成签名的随机串
            //             signature: autograph.data.message, // 必填，签名
            //             type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
            //             jsApiList: [
            //               "device.connection.getNetworkType",
            //               "device.base.getWifiStatus",
            //               "device.base.getPhoneInfo",
            //               "device.base.getUUID",
            //               "biz.cspace.saveFile",
            //               "biz.conference.videoConfCall",
            //               "biz.util.scan",
            //               "biz.ding.create",
            //               "biz.microApp.openApp",
            //               "biz.util.openLink",
            //               "biz.contact.createGroup",
            //               "biz.util.uploadAttachment",
            //               "biz.chat.toConversation"
            //             ]
            //           });
            //           store.logIn(() => {
            //             beforeNext(toDo)
            //           });
            //         } else {
            //           dsf.layer.toast("钉钉JS签名出错");
            //         }
            //       }
            //     );
            //   }
            // })
          },
          onFail: function (err) {
            var str = JSON.stringify(err);
            alert("失败" + str);
          },
        });
      });
    };
  },
  methods: {
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
  },
};
</script>
