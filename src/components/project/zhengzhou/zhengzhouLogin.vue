<template>
  <div class="zhengzhouLogin" :style="{ 'padding': `0 ${loginPadding}` }">
    <div class="header">
      <span class="line"></span>
      <span class="text">市委内网综合办公平台</span>
      <span class="line"></span>
    </div>
    <div class="form">
      <van-field class="logname loginInput" v-model="logname" name="账号" placeholder="请输入账号" center>
        <template #left-icon>
          <!-- <i class="loginIcon icon iconfont iconwodeweixuanzhong1" @click="showAppVersion()"></i> -->
          <img class="loginIcon" src="static\images\project\zhengzhou\zh.png" @click="showAppVersion()" alt="">
        </template>
      </van-field>
      <van-field class="loginInput" v-model="txtpassword" type="password" name="密码" placeholder="请输入密码" center>
        <template #left-icon>
          <!-- <span class="loginIcon icon iconfont iconlock-outline" @click="showBuildTime()"></span> -->
          <img class="loginIcon" src="static\images\project\zhengzhou\mima.png" @click="showBuildTime()" alt="">
        </template>
      </van-field>
    </div>
    <div class="btn">
      <button native-type="submit" @click="login">密码登录</button>
      <button @click="C2login">一键登录</button>
    </div>
  </div>
</template>

<script>
import store from "@/common/util";
import B64 from "@/common/base64";
export default {
  name: 'zhengzhouLogin',

  data() {
    return {
      logname: "",
      txtpassword: "",
      loginPadding: "",
      logoWidth: "",
      loading: null
    }
  },

  created() {
    window.addEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.isPortrait,
      false
    );
    this.isPortrait();
  },

  methods: {
    isPortrait() {
      if (
        window.screen.orientation.angle === 180 ||
        window.screen.orientation.angle === 0
      ) {
        this.loginPadding = "8vw";
      } else if (
        window.screen.orientation.angle === 90 ||
        window.screen.orientation.angle === -90
      ) {
        this.loginPadding = "20vw";
      }
    },
    showAppVersion() {
      this.clickTime = new Date().getTime();
      setTimeout(() => {
        if (new Date().getTime() - this.clickTime < 500) {
          // console.log('双击事件');
          cordova.getAppVersion.getVersionCode(function (args) {
            dsf.layer.toast('当前APP的版本为：一体化' + args);
          }, function (err) {
            dsf.layer.toast(err);
          });
        }
      }, 500)
    },
    showBuildTime() {
      this.clickTime = new Date().getTime();
      setTimeout(() => {
        if (new Date().getTime() - this.clickTime < 500) {
          //console.log(JSON.stringify(moment(new Date()).format('YYYY-MM-DD HH:mm')));
          // console.log(JSON.stringify(buildTime))
          document.getElementById('appVersion').innerHTML = '当前前端APP程序版本为：一体化' + buildTime;
        }
      }, 500)
    },
    C2login() {
      let self = this
      this.loading = dsf.layer.loading("登录中...")
      // 获取code
      window.c2.custom.call({
        action: 'loadCertificate',
        params: {},
        onSuccess: function (result) {
          if (result && result !== "") {
            // c2登录
            window.c2.auth.login({
              type: "userCode",
              userCode: result,
              onSuccess: function (res) {
                console.log("C2login_res", res);
                dsf.layer.closeLoading(self.loading);
                // 获取token
                window.c2.auth.GetUserInfo((info) => {
                  console.log("GetUserInfo", info);
                  store.saveToLocalStore("zzswUserInfo", info);
                  // token 兑换用户信息
                  dsf.http.post("fn/zzswMoblieSSOLogin/getUserinfo", { token: info.token }).then(({ data }) => {
                    console.log("FNgetUserinfo", data.data);
                    // 获取用户信息 存储本地
                    self.loginSuccessDeal(data.data)
                  })
                })
              },
              onFail: function (err) {
                console.log("C2login_error", err);
                dsf.layer.toast("C2login登陆失败！", false)
              }
            })
          } else {
            console.log("c2.custom.call_result", result);
            dsf.layer.toast("未获取到code", false)
          }
        },
        onFail: function (err) {
          console.log("c2.custom.call_error", err);
          dsf.layer.toast("c2.custom.call登陆失败！", false)
        }
      });
    },
    async login() {
      if (!this.logname || !this.txtpassword) {
        dsf.layer.toast("请填写账号密码")
        return
      }
      this.loading = dsf.layer.loading("登陆中...")
      let self = this;
      let url = "";
      let postData = {};
      let lastLoginType = "";
      // OA系统登录逻辑
      if (self.$route.query.loginType == "OA") {
        let autoToken = store.loadLocalStore("user") ? store.loadLocalStore("user").autoToken : ''
        if (autoToken && dsf.config.login.tokenAutologin && this.checked) { // 使用authtoken自动登录
          url = `/fn/mobileAuth/autoByToken?autoToken=${autoToken}&uuid=${self.DeviceId}&brand=${self.DeviceName}`
        } else {
          //记录上次登录类型
          lastLoginType = "user"
          url = dsf.config.login.specialLoginUrl ? dsf.config.login.specialLoginUrl : "/fn/mobileAuth/login";
          let password = this.txtpassword;
          let logname = this.logname;
          postData = {
            __DATA: JSON.stringify({
              logname: logname,
              password: password,
              device_id: "postman",
              device_desc: "postman"
            })
          }
        }
        dsf.http.post(url, postData).then(function (data) {
          store.saveToLocalStore('lastLoginType', lastLoginType)
          if (data.data.rcode == 1) {
            store.saveToLocalStore("uid", B64.encode(self.logname));
            store.saveToLocalStore("pid", B64.encode(self.txtpassword));
            store.saveToLocalStore("autoLogin", self.checked);
            //记住账号密码
            // if (self.checked) {
            store.saveToLocalStore("userName", B64.encode(self.logname));
            store.saveToLocalStore("passWord", B64.encode(self.txtpassword));
            let loginData = data.data;
            self.loginSuccessDeal(loginData)
          } else {
            dsf.layer.toast("登录接口异常，请联系系统管理员！");
            dsf.layer.closeLoading(self.loading);
          }
        }).error((data) => {
          dsf.layer.closeLoading(self.loading);
          if (data.message.includes("404")) {
            dsf.layer.toast("登录接口异常，请联系系统管理员！");
          }
        })
      } else {
        // c2账号密码登录
        window.c2.auth.login({
          type: "pwd",
          account: self.logname,
          pwd: self.txtpassword,
          onSuccess: function (res) {
            console.log("login_res", res);
            dsf.layer.closeLoading(self.loading);
            // 获取token 
            window.c2.auth.GetUserInfo((info) => {
              console.log("GetUserInfo", info);
              store.saveToLocalStore("zzswUserInfo", info);
              // token 兑换用户信息
              dsf.http.post("fn/zzswMoblieSSOLogin/getUserinfo", { token: info.token }).then(({ data }) => {
                console.log("FNgetUserinfo", data.data);
                // 获取用户信息 存储本地
                self.loginSuccessDeal(data.data)
              })
            })
          },
          onFail: function (err) {
            console.log("login_error", err);
            dsf.layer.toast("c2.auth.login登陆失败，请联系系统管理员！");
            dsf.layer.closeLoading(self.loading);
          }
        })
      }
    },
    loginSuccessDeal(loginData) {
      let dateUserTemp = loginData.data;
      store.saveToSessionStore("user", dateUserTemp);
      store.saveToSessionStore("loginToken", dateUserTemp.auth.token);
      store.saveToLocalStore("loginToken", dateUserTemp.auth.token);
      store.saveToLocalStore("user", dateUserTemp);
      store.saveToLocalStore("loginData", loginData);
      if (dsf.config.setting['SYS-MOBILE-0002'] == 1 && !dateUserTemp.mobile) { // 系统设置登录账号强制维护手机号且账号手机为空
        this.changeLoginType("setPhone")
        return
      }
      // OA系统登录逻辑
      if (self.$route.query.loginType == "OA") {
        this.toNext()
      }
    },
    toNext() {
      let self = this;
      let dateUserTemp = store.loadSessionStore("user")
      let loginData = store.loadLocalStore("loginData")
      store.logIn(function () {
        let userid = dateUserTemp.user_id;
        // 判断登录以后是否需要CA认证
        console.log('Client', store.getClientName())
        console.log('shkt', loginData.shkt, loginData.shkt == 1)
        if (store.getClientName() == "app" && loginData.shkt == 1) {
          console.log('xsfCommon')
          xsfCommon.bsCaLogin("", function (result) {
            let res = JSON.parse(result).result
            console.log('bsCaLogin', result, typeof (result))
            if (res == true) self.goUrl();
          },
            function (error) {
              console.log('bsCaLogin', error, typeof (error))
              dsf.layer.toast(err);
            })
          return
        }
        //判断是否登录以后保存UUID和设备名称
        if (dsf.config.login.loginSaveUUID) {
          let deviceUrl = "fn/sso/devicesave?DeviceId=" + self.DeviceId + "&DeviceName=" + self.DeviceName + "&userId=" + userid;
          dsf.http.get(deviceUrl).then((data) => {
            self.goUrl();
          }).catch((err) => {
            dsf.layer.toast(err.message);
          });
        } else {
          self.goUrl();
        }
      });
    },
    goUrl() {
      dsf.layer.closeLoading(self.loading);
      dsf.layer.toast("登录成功!", true);
      setTimeout(() => {
        if (dsf.config.login.defaultUrl) {
          this.$router.replace(dsf.config.login.defaultUrl);
        } else {
          this.$router.replace("/zhengzhouIndex");
        }
      }, 800);
    },
  },
  beforeDestroy() {
    window.removeEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.isPortrait(),
      false
    );
  },
}

</script>

<style scoped lang='scss'>
.zhengzhouLogin {
  width: 100vw;
  text-align: center;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 18vh;

    .line {
      display: inline-block;
      border: 1px solid #F70C17;
      width: 120px;
    }

    .text {
      font-size: 40px;
      font-weight: 600;
      color: #F70C17;
      letter-spacing: 5px;
      margin: 0 18px;
    }
  }

  .form {
    margin: 5vh 0;

    .logname {
      margin-bottom: 3vh;
    }

    .loginInput {
      background: #F2F2F2;
      font-size: 22px;
      padding: 15px;
      border-radius: 10px;
    }

    .loginIcon {
      width: 30px;
      padding-right: 10px;
      color: #F70C17;
    }
  }

  .btn {
    button {
      width: 100%;
      font-size: 30px;
      text-align: center;
      border-radius: 10px;
      padding: 12px 0;
    }

    button:first-child {
      background-color: #F70C17;
      color: #fff;
      margin-bottom: 2vh;
    }

    button:last-child {
      border: 1px solid #F70C17;
      background-color: #fff;
      color: #F70C17;
    }
  }
}
</style>