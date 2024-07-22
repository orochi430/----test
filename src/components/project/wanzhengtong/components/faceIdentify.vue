<template>
  <div class="identify">
    <transition name="fade">
      <div v-show="show" class="success">
        <div class="text">
          使用考勤系统前请您通过人脸识别认证
          <div class="SC">请确保正对手机，光线充足</div>
        </div>
        <img src="static/images/wanzhengtong/face_identify.png" alt="">
        <button class="btn" @click="identify">采集本人人脸</button>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="!show" class="failed">
        <div class="img"><img src="static/images/wanzhengtong/face_error.png" alt=""></div>
        <div class="text1">认证失败</div>
        <div class="text2">{{ errMsg }}</div>
        <div class="button">
          <button class="button1" @click="back()">返回</button>
          <button class="button2" @click="show = true">立即重试</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      errMsg: "抱歉，请确保是本人进行操作",
      user: dsf.util.loadSessionStore("user")
    }
  },
  methods: {
    identify() {
      let self = this;
      self.getToken()
        .done(res => {
          return dsf.http.get(`fn/wztFace/getFaceToken`, { wztToken: res });
        })
        .done(res => {
          console.log("getFaceToken-res", res);
          if (res.type == "success") {
            return self.startFace(res.data.fvtoken, res.data.key);
          } else {
            throw res.message;
          }
        })
        .done(res => {
          // 参数说明：
          // sid 认证流水号
          // accessToken 认证accessToken，通过该参数查询认证结果
          // facePhoto 活体检测过程中人脸图像 base64，如需要该内容需要服务申请备案
          // faceState: unavailable 人脸认证不可用时返回
          if (res.flag == "false") {
            // console.log("暂不认证");
            // self.back();
            throw "暂不认证";
          }
          else if (res.faceState == "请求成功") {
            return dsf.http.get(`fn/wztFace/accessCheck`, { accessToken: res.accessToken });
          } else {
            throw res.faceState;
          }
        })
        .done(res => {
          console.log("accessCheck-res", res);
          if (res?.type == "success") {
            if (res.data.flag) {
              console.log("人脸识别认证成功")
              if (self.user.attnd) {
                self.user.attnd.faceAuth = 1;
              } else {
                self.user.attnd = { faceAuth: 1 };
              }
              dsf.util.saveToSessionStore("user", self.user);
              self.$emit("signIn");
            } else {
              throw res.subject;
            }
          } else {
            throw res.message;
          }
        })
        .error(err => {
          self.show = false;
          if (err?.message) self.errMsg = err.message;
          console.log("identify-err", err);
          // dsf.layer.toast("数据获取失败！", false);
        });
    },
    startFace(fvtoken, key) {
      return new Promise((resolve, reject) => {
        if (typeof (croods) == "undefined") {
          reject("请在皖政通中操作");
        } else {
          croods.load(function () {
            let params = {
              fvtoken: fvtoken, //统一认证返回的令牌
              key: key, //密钥key
              appid: dsf.config.attendance.appId //应用唯一id
            }
            console.log("FacePlugin.startFace-params", params);
            croods.customPlugin({
              action: "FacePlugin.startFace",
              params: params,
              success: function (res) {
                console.log("FacePlugin.startFace-res", res);
                resolve(res);
              },
              fail: function (msg) {
                console.log("FacePlugin.startFace-fail", msg);
                reject(msg);
              }
            });
          })
        }
      });
    },
    back() {
      let self = this;
      self.show = true;
      self.$emit("closePop");
    },
    getToken() {
      return new Promise((resolve, reject) => {
        if (typeof (croods) == "undefined") {
          reject("请在皖政通中操作");
        } else {
          croods.load(function () {
            croods.customPlugin({
              action: "UserPlugin.login",
              params: {},
              success: function (res) {
                console.log("UserPlugin.login-res", res);
                resolve(res.token);
                // console.log(res.token);
                // console.log(res.moapIp);
              },
              fail: function (msg) {
                console.log("UserPlugin.login-err", msg);
                reject(msg);
              }
            });
          })
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.identify {
  background-color: #fff;
  height: calc(100vh - 0.92rem);
  text-align: center;

  .success {

    .text {
      position: relative;
      font-size: 0.38rem;
      color: #333333;
      text-align: center;
      padding-top: 0.4rem;
      padding-bottom: 0.2rem;
      letter-spacing: 0.02rem;

      .SC {
        position: absolute;
        font-size: var(--font_size_1);
        color: #666666;
        text-align: center;
        bottom: -30px;
        width: 100%;
      }
    }

    img {
      width: 100%;
    }

    .btn {
      background-image: linear-gradient(90deg, #4CBBFF 2%, #3483FF 100%);
      box-shadow: 0px 5px 27px 0px rgba(55, 138, 255, 0.59);
      border-radius: 30px;
      font-size: 19px;
      color: #FFFFFF;
      letter-spacing: 1;
      text-align: center;
      width: 300px;
      height: 50px;
    }
  }

  .failed {
    .text1 {
      font-size: var(--font_size_0);
      color: #333333;
      letter-spacing: 1;
    }

    .text2 {
      font-size: var(--font_size_2);
      color: #999999;
      letter-spacing: 1;
      padding-top: 15px;
      padding-bottom: 20px;
    }

    .img {
      display: flex;
      justify-content: center;
      padding-top: 50px;
      padding-bottom: 15px;

      img {
        width: 25%;
      }
    }

    .button {
      width: 100%;
      display: flex;
      justify-content: space-evenly;

      button {
        width: 150px;
        height: 50px;
        border-radius: 30px;
        text-align: center;
        font-size: 18px;
        letter-spacing: 1;
      }

      .button1 {
        border: 1px solid rgba(177, 177, 177, 1);
        background: #FFFFFF;
        color: #666666;
      }

      .button2 {
        background-image: linear-gradient(90deg, #4CBBFF 2%, #3483FF 100%);
        color: #FFFFFF;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .25s
  }

  .fade-enter,
  .fade-leave-to

  /* .fade-leave-active in <2.1.8 */
    {
    opacity: 0
  }
}
</style>
