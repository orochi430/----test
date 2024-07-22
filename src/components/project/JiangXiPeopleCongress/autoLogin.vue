<template>
  <div>
    <div v-if="errored" class="init-div">您暂无权限使用该系统！</div>
    <div v-else class="init-div">
      <div v-if="loading">正在登录...</div>
      <div v-else>
        <!-- 登录成功！ -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      errored: false,
      name: this.$route.query.name,
      mobile: this.$route.query.mobile,
      cardId: "",
      renda: null,
      toUrl: this.$route.query.tourl,
      deviceId: "postman",
      deviceName: "postman",
      user: dsf.util.loadSessionStore("user")
    };
  },
  created() {
    let self = this;
    dsf.util.removeSessionStore("meeting");
    self.init();

    // self.loadJsSdk((renda) => {
    //     console.log("JsSdk加载完毕！", renda);
    //     renda.navigateToApp("home");
    // });

    // self.loadJsSdkP().then(function (renda) {
    //     console.log("JsSdk加载完毕！", renda);
    //     renda.navigateToApp("home");
    // });
  },
  methods: {
    init() {
      let self = this;
      // 获取用户信息
      if (dsf.config.staticJson?.enable) {
        // 静态数据演示环境
        self.name = "李敬梭";
        self.mobile = "15335312882";
        self.login();
      } else if (self.name && self.mobile) {
        // url传参登录
        self.login();
      } else if (self.user?.name && self.user?.mobile) {
        // 赣政通
        self.name = self.user.name;
        self.mobile = self.user.mobile;
        self.login();
      } else {
        self.loadJsSdk(renda => {
          console.log("JsSdk =", renda);
          self.renda = renda;
          if (self.renda && self.renda.getUserByToken) {
            // 小程序环境
            self.renda.getUserByToken({
              success: res => {
                console.log("getUserByToken =", res);
                // {"certNo":"42028119********18","certType":"IDENTITY_CARD","deputy":false,"nbf":1644****62,"phone":"153****9312","certName":"肖承尧","exp":1644****62,"userId":10,"iat":1644****62}
                // 成功的回调（返回用户信息）
                self.mobile = res.phone;
                self.name = res.certName;
                self.cardId = res.certNo || "";
                self.login();
              },
              fail: err => {
                console.log("getUserByToken-err =", err);
                // 失败的回调
                self.errored = true;
                // dsf.layer.toast("获取用户信息失败！");
                dsf.layer.toast(`${err.msg}`, false, () =>
                  self.navigateToApp()
                );
              }
            });
          }
        });
      }
    },
    // 登录
    login() {
      let self = this;
      // md5('人大会务'+手机号+姓名+身份证号+'系统')
      let token = dsf.md5(
        `人大会务${self.mobile}${self.name}${self.cardId}系统`
      );
      if (!self.errored && self.name && self.mobile) {
        dsf.http
          .post(`fn/peopleCongress/autoLogin`, {
            mobile: dsf.base64.encode(self.mobile),
            name: dsf.base64.encode(self.name),
            cardId: dsf.base64.encode(self.cardId),
            token,
            device_id: self.deviceId,
            device_desc: self.deviceName
          })
          .done(result => {
            if (result.type == "success") {
            //   debugger;
              self.loading = false;
              result.data.name = self.name; // 水印内容
              dsf.util.saveToSessionStore("user", result.data);
              dsf.util.saveToSessionStore("loginToken", result.data.auth.token);
              if (self.toUrl) {
                // 登录后跳转指定页面
                self.toUrl = decodeURIComponent(self.toUrl);
              } else if (
                result.data.meetingType &&
                result.data.meetingType.length == 1
              ) {
                // 仅1个会议类型时跳过会卡进入首页
                self.toUrl = `/peopleCongress/${result.data.meetingType[0].id}`;
              } else {
                self.toUrl = `/prePeopleCongress`;
              }
              self.$router.replace(self.toUrl);
            } else {
              self.errored = true;
              dsf.layer.toast(`${result.message}`, false, () =>
                self.navigateToApp()
              );
            }
          })
          .error(error => {
            console.log("autoLogin-error =", error);
            self.errored = true;
            dsf.layer.toast("登录失败", false, () => self.navigateToApp());
          })
          .always(() => {
            // self.loading = false;
          });
      } else {
        self.errored = true;
        self.navigateToApp();
      }
    },
    // 加载小程序JsSdk
    loadJsSdk(callback) {
      let self = this;
      let userAgent = navigator.userAgent,
        // isAndroid =  userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1,
        // isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isMyWx =
          /miniProgram/i.test(userAgent) && /micromessenger/i.test(userAgent),
        isMyZfb = userAgent.includes("AlipayClient");

      let appScript = document.createElement("script");
      appScript.type = "text/javascript";
      if (isMyWx) {
        // 微信小程序 JS-SDK
        // document.write('<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"><\/script>');
        appScript.src = "./static/js/jweixin-1.6.0.js";
      } else if (isMyZfb) {
        // 支付宝小程序 JS-SDK
        // document.writeln('<script src="https://appx/web-view.min.js"' + '>' + '<' + '/' + 'script>');
        appScript.src = "https://appx/web-view.min.js";
      }
      document.head.appendChild(appScript);
      // 江西数字人大前端js sdk
      let sdkScript = document.createElement("script");
      sdkScript.type = "text/javascript";
      sdkScript.src = "https://szrd.jxrd.gov.cn/jsApi/sdk.mini.js"; // https://szrd.digitaljx.com/jsApi/sdk.mini.js
      document.head.appendChild(sdkScript);
      sdkScript.onload = () => {
        if (callback) {
          callback(renda);
        }
      };
    },
    loadJsSdkP() {
      return new Promise((resolve, reject) => {
        if (typeof renda != "undefined") {
          return resolve(renda);
        }
        // 江西数字人大前端js sdk
        let sdkScript = document.createElement("script");
        sdkScript.type = "text/javascript";
        sdkScript.src = "https://szrd.jxrd.gov.cn/jsApi/sdk.mini.js"; // https://szrd.digitaljx.com/jsApi/sdk.mini.js
        document.head.appendChild(sdkScript);
        sdkScript.onload = () => {
          // let self = this;
          resolve(renda);
        };
      });
    },
    // 返回小程序
    navigateToApp(key, seconds) {
      key = key || "home";
      seconds = seconds || 3;
      let self = this;
      if (
        self.renda &&
        (self.renda.isWx || self.renda.isZfb) &&
        self.renda.navigateToApp
      ) {
        setTimeout(function() {
          // self.$router.go(-1);
          self.renda.navigateToApp(key);
        }, seconds * 1000);
      }
    }
  }
};
</script>

<style scoped>
.init-div {
  position: absolute;
  width: 100%;
  height: 20px;
  line-height: 20px;
  margin-top: -20px;
  top: 50%;
  left: 0;
  font-size: var(--font_size_2);
  color: #7f7a7a;
  text-align: center;
}
</style>
