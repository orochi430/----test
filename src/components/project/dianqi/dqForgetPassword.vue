<template>
  <div class="box">
    <div :style="logImgStyle" class="banner" @click="showDeviceId">
      <img :class="{fullscreenBg: isFullscreenBg > 0}" :src="loginBackground" alt="" @load="loadImage" />
      <p class="title" v-html="title"></p>
    </div>
    <!-- <div class="login_title">忘记密码</div></div> -->
    <div class="formbox loginForm">
      <van-form ref="setPwd" @submit="confirm">
        <van-field v-model="phone" :rules="phoneValidator" :readonly="setPassword" name="phone" type="tel" placeholder="请输入手机号码" center>
          <template #left-icon>
            <i class="iconfont iconshouji"></i>
            <!-- <img class="mobile" src="../assets/imgs/mobile.png" /> -->
          </template>
        </van-field>
        <div class="sendCode" v-if="setCode">
          <van-field v-model="phonecode" :rules="smsValidator" center clearable name="短信验证码" placeholder="请输入验证码">
            <template #left-icon>
              <i class="iconfont iconyuechi"></i>
              <!-- <img class="mobile" src="../assets/imgs/yzm.png" /> -->
            </template>
            <!-- <template #button>
                        <van-button :text="smsBtnText" :disabled="smsBtnEnable" size="small" type="primary" native-type="button" @click="sendSmsCode()"></van-button>
                    </template> -->
          </van-field>
          <van-button :text="smsBtnText" :disabled="smsBtnEnable" size="small" type="primary" native-type="button" @click="sendSmsCode()"></van-button>
        </div>

        <van-field v-if="setPassword" v-model="newpassword" :rules="pwdRules" type="password" name="密码" placeholder="请输入新密码" center>
          <template #left-icon>
            <i class="iconfont iconmima1"></i>
            <!-- <img class="mobile" src="../assets/imgs/pas.png" /> -->
          </template>
        </van-field>
        <van-field v-if="setPassword" v-model="surepassword" :rules="[{ required: true },{ validator: sureValidator, message: '两次输入密码不一致'}]" type="password" name="密码" placeholder="请再次输入新密码" center>
          <template #left-icon>
            <i class="iconfont iconmima1"></i>
            <!-- <img class="mobile" src="../assets/imgs/pas.png" /> -->
          </template>
        </van-field>
        <div class="btnbox" style="margin-top: 30px">
          <van-button style="width: 100%; font-size: 19px" round type="info" native-type="submit">
            {{ setPassword?'确认':'重置' }}
          </van-button>
        </div>
        <div class="changeType" v-if="!isIm">
          <span @click="$emit('toLogin')">返回登录</span>
        </div>
      </van-form>
    </div>
    <div class="FPbottom">
      <span class="hotLine" @click="openHotLine">技术服务热线</span>
    </div>
    <!-- <van-icon v-if="dsf.config.login.isShowIcon" name="static/images/icon-img.png" size="50" class="login_icon" /> -->
  </div>
</template>

<script>
export default {
  name: 'forgetPassword',
  data() {
    return {
      setCode: true,
      setPassword: false,
      phone: '',
      phonecode: '',
      newpassword: '',
      surepassword: '',
      smsBtnText: "发送验证码",
      smsBtnEnable: false,
      randomStr: '',
      errPwdMsg: '请输入新密码',
      phoneValidator: [{
        required: true
      },
      {
        pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
        message: '请输入正确手机号'
      }
      ],
      smsValidator: [{
        required: true
      }],
      isIm: false,
      findPassword: 0,
      // sureRules: [{ validator: sureValidator, message: '两次输入密码不一致'}],
      title: "",
      logImgStyle: {
        height: "5rem"
      },
      isFullscreenBg: dsf.config.setting.hasOwnProperty('SYS-MOBILE-STYLE-0007') ? (dsf.config.setting['SYS-MOBILE-STYLE-0007'] || -1) : -1,
    }
  },
  computed: {
    minPwd() { // 最小密码长度
      return dsf.config.setting.hasOwnProperty('SYS-SEC-0001') ?
        (dsf.config.setting['SYS-SEC-0001'] || 6) : 6
    },
    strengthPwd() { // 密码强度
      return dsf.config.setting.hasOwnProperty('SYS-SEC-0002') ?
        (dsf.config.setting['SYS-SEC-0002'] || 1) : 1
    },
    pwdRules() {
      let rules = [{
        validator: (value) => value !== ''
      },
      {
        pattern: /^[A-Za-z0-9\~\@\^\!\#\$\(\)\*]+$/,
        message: `密码只能包含合法字符：数字、字母、~！@$^()*`
      },
      {
        pattern: new RegExp("^.{" + this.minPwd + ",}$", ""),
        message: `密码长度至少为${this.minPwd}位`
      }
      ]
      if (this.strengthPwd == 2) {
        rules.push({
          pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9\~\@\^\!\#\$\(\)\*]+$/,
          message: '密码必须包含数字+字母'
        })
      }
      if (this.strengthPwd == 3) {
        rules.push({
          pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\~\@\^\!\#\$\(\)\*])[A-Za-z0-9\~\@\^\!\#\$\(\)\*]+$/,
          message: '密码必须包含数字+字母+符号~、！、@、$、^、(、)、*'
        })
      }
      console.log(rules)
      return rules
    },
    loginBackground() {
      let defaultImg = require('static/images/loginLogo.png')
      if (dsf.util.getClientType() == 'iPad' && dsf.config.setting['SYS-MOBILE-STYLE-0008']) {
        return dsf.url.getServerUrl(`fn/file/downloadImage?fileName=${dsf.config.setting['SYS-MOBILE-STYLE-0008']}`)
      } else {
        return dsf.config.setting['SYS-MOBILE-STYLE-0003'] ? dsf.url.getWebPath(dsf.config.setting['SYS-MOBILE-STYLE-0003']) : defaultImg
      }
    }
  },
  beforeMount() {
    this.title = dsf.config.login.title;
    //不能全部清空
    // store.clearSession();
    // store.clearLocalStore();
  },
  methods: {
    sureValidator(val) {
      return val == this.newpassword
    },
    confirm() {
      if (this.setCode) { // 确认短信验证码
        dsf.http.post(`/fn/mobileSmsAuth/verifyForgetCode`, {
          mobile: this.phone,
          code: this.phonecode
        }).then(res => {
          dsf.layer.toast(res.data.message);
          if (res.data.rcode == 1) { // 验证成功才可重设密码
            this.randomStr = res.data.data
            this.setCode = false
            this.setPassword = true
          }
        }).error(res => {
          dsf.layer.toast("接口异常，请联系系统管理员！");
        })
      } else { // 设置新密码
        dsf.http.post(`/fn/mobileSmsAuth/forgetPsd`, {
          randomStr: this.randomStr,
          pwd: this.newpassword
        }).then(res => {
          dsf.layer.toast(res.data.message);
          if (res.data.rcode == 1) { // 设置成功跳账号登录
            if (this.findPassword == 1) { //这里是IM过来的找回密码  直接关闭即可
              if (window.native && window.native.isNative) {
                window.native.back()
              } else {
                this.$emit('toLogin')
              }
            } else {
              this.$emit('toLogin')
            }
          }
        }).error(res => {
          dsf.layer.toast("接口异常，请联系系统管理员！");
        })
      }
    },
    sendSmsCode() {
      let self = this;
      let loadingIndx = 0;
      self.$refs.setPwd.validate("phone").then(() => {
        self.smsBtnEnable = true;
        loadingIndx = dsf.layer.loading("发送中...");
        return dsf.http.post(`/fn/mobileSmsAuth/sendForgetSms`, {
          mobile: self.phone
        })
      }).then((res) => {
        console.log(res);
        dsf.layer.closeLoading(loadingIndx);
        dsf.layer.toast(res.data.message);
        if (res.data.rcode == 1) {
          let timeCount = res.data.data.time;
          let timeInterval = setInterval(() => {
            timeCount--;
            self.smsBtnText = "发送验证码(" + timeCount + ")";
            if (timeCount == 0) {
              clearInterval(timeInterval);
              self.smsBtnEnable = false;
              self.smsBtnText = "发送验证码";
            }
          }, 1000);
        } else {
          self.smsBtnEnable = false;
        }

      }).error((res) => {
        dsf.layer.closeLoading(loadingIndx);
        self.smsBtnEnable = false;
        console.log(res);
        if (res.message.indexOf("404") > -1) {
          dsf.layer.toast("短信发送接口异常，请联系系统管理员！");
        }
      });
    },
    showDeviceId() {
      let self = this
      self.clickIndex++;
      setTimeout(function () {
        self.clickIndex = 0;
      }, 300);
      console.log(self.clickIndex)
      if (self.clickIndex > 1) {
        if (self.DeviceId != 'postman') {
          dsf.layer.alert({
            title: '温馨提示',
            message: `您的设备码为：${self.DeviceId}`
          })
        }
        self.clickIndex = 0;
      }
    },
    loadImage() {
      this.logImgStyle = {};
    },
    openHotLine() {
      dsf.util.openWebviewToUrl({ url: dsf.config.login.HotlineAddress, title: "" })
    }
  },
  created() {
    // $('#appTop').remove();
    if (this.$route.query.isIm) {
      this.isIm = this.$route.query.isIm == 1
    }

    if (navigator.userAgent.indexOf("mobileIM") >= 0) {
      this.isIm = true
    }

    if (this.$route.query.findPassword && this.$route.query.findPassword == 1) {
      this.findPassword = 1
    }

  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.box {
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  .banner {
    width: 100%;
    min-height: 35vh;
    position: relative;

    > img {
      width: 100%;
    }

    .fullscreenBg {
      position: absolute;
      // height: 100vh;
      // object-fit: cover;
    }

    > p {
      width: 264px;
      text-align: center;
      font-size: 22px;
      line-height: 32px;
      color: white;
      position: absolute;
      top: 50px;
      transform: translateX(-50%);
      left: 50%;
    }
  }
  .FPbottom {
    width: 100%;
    position: absolute;
    bottom: 3%;
    text-align: center;
    .hotLine {
      color: blue;
    }
  }
}
.iconfont {
  font-size: var(--font_size_0);
  @include font-theme("normal");
  padding-right: 6px;
}

.formbox {
  margin: 0 15px;
  transform: translateY(-50px);
  border-radius: 8px;
  background: white;
  padding: 24px;

  .mobile {
    width: 26px;
    height: 26px;
  }

  .van-cell {
    border: 1px solid rgba(228, 228, 228, 1);
    border-radius: 8px;
  }

  .van-cell + .van-cell {
    margin-top: 20px;
  }

  .sendCode {
    display: flex;
    margin-top: 20px;

    button {
      height: inherit;
      width: 150px;
      border-radius: 8px;
      margin-left: 10px;

      .van-button__text {
        font-size: var(--font_size_3);
      }
    }
  }

  .iptLabelImg {
    width: 21px;
    height: 21px;
    margin-right: 15px;
  }

  .auto {
    color: #666;
    margin-top: 16px;
  }

  .btnbox {
    margin-top: 40px;

    > button {
      border: 0 !important;
      border-radius: 8px !important;
    }
  }

  .changeType {
    margin-top: 16px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    @include font-theme("button_auxiliary_fontcolor");
  }
}
</style>
