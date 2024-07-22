<!-- 首页  2022年9月19日  -->
<template>
  <div
    :class="['container', { EN: language == 'EN' }]"
    :style="{
      height: `calc(100vh - ${
        $store.state.isShowAppHeader ? '0.92rem' : '0px'
      })`
    }"
  >
    <div class="logo flex jb">
      <img src="../../../../static/images/jinbo/logo.png" alt="" />
      <img src="../../../../static/images/jinbo/5years.png" alt="" />
    </div>
    <img
      class="top-model-bg"
      src="../../../../static/images/jinbo/bg_01.png"
      alt=""
    />
    <div class="top-model">
      <img src="../../../../static/images/jinbo/model1.png" alt="" />
      <div class="box top-left">
        <transition name="fade" mode="out-in">
          <div :key="language" class="tag" @click="go(`news`)">
            {{ language == "CN" ? "追新闻" : "Follow the news" }}
          </div>
        </transition>
        <img
          class="panda"
          src="../../../../static/images/jinbo/panda1.png"
          alt=""
        />
      </div>
      <div class="box top-right">
        <transition name="fade" mode="out-in">
          <div :key="language" class="tag" @click="go(`exhibition`)">
            {{ language == "CN" ? "赏云展" : "Appreciation Exhibition" }}
          </div>
        </transition>
        <img
          class="panda"
          src="../../../../static/images/jinbo/panda2.png"
          alt=""
        />
      </div>
      <div class="box bottom-left">
        <img
          class="panda"
          src="../../../../static/images/jinbo/panda3.png"
          alt=""
        />
        <transition name="fade" mode="out-in">
          <div :key="language" class="tag" @click="go(`exhibitors`)">
            {{ language == "CN" ? "找展商" : "Seek exhibitors" }}
          </div>
        </transition>
      </div>
      <div class="box bottom-right">
        <img
          class="panda"
          src="../../../../static/images/jinbo/panda4.png"
          alt=""
        />
        <transition name="fade" mode="out-in">
          <div :key="language" class="tag" @click="go(`activity`)">
            {{ language == "CN" ? "查活动" : "Query activity" }}
          </div>
        </transition>
      </div>
      <div class="box middle-top">
        <transition name="fade" mode="out-in">
          <div :key="language" class="tag" @click="go(`benefits`)">
            {{ language == "CN" ? "专属福利" : "Exclusive benefits" }}
          </div>
        </transition>
      </div>
      <div class="box middle-center">
        <transition name="fade" mode="out-in">
          <div :key="language" class="tag" @click="go(`food`)">
            {{ language == "CN" ? "品美食" : "Taste delicious food" }}
          </div>
        </transition>
      </div>
      <div class="box middle-bottom">
        <transition name="fade" mode="out-in">
          <div :key="language" class="tag" @click="go(`services`)">
            {{ language == "CN" ? "享服务" : "Enjoy services" }}
          </div>
        </transition>
      </div>
    </div>
    <div class="bottom-model">
      <img class="bg" src="../../../../static/images/jinbo/bg_02.png" alt="" />
      <div class="visit">
        <img src="../../../../static/images/jinbo/visit.png" alt="" />
        <transition name="fade" mode="out-in">
          <div :key="language" class="tag" @click="go(`visit`)">
            {{ language == "CN" ? "兜上海" : "Visit Shanghai" }}
          </div>
        </transition>
      </div>
      <div class="twin">
        <img src="../../../../static/images/jinbo/twin.png" alt="" />
        <transition name="fade" mode="out-in">
          <div :key="language" class="tag" @click="go(`twin`)">
            {{ language == "CN" ? "进博孪生" : "Import Expo twin" }}
          </div>
        </transition>
      </div>
      <div class="qrcode">
        <!-- <img src="../../../../static/images/jinbo/twin.png" alt="" /> -->
        <transition name="fade" mode="out-in">
          <div :key="language" class="tag" @click="go(`qrcode`)">
            {{
              language == "CN" ? "进博会官微" : "CIIE Wechat Official Account"
            }}
          </div>
        </transition>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <div class="change-btn" :key="language" @click="changeLang">
        <span>{{ language == "CN" ? "EN" : "CN" }}</span>
      </div>
    </transition>
    <!-- 播放弹框 -->
    <van-popup
      :style="{ height: '100%' }"
      v-model="video.showVideo"
      :close-on-click-overlay="false"
      lock-scroll
      position="bottom"
      get-container="#app"
    >
      <div v-if="video.showVideo">
        <VPlayer :video="video" @playerReadied="playerReadied"></VPlayer>
      </div>
    </van-popup>
    <!-- 图片预览 -->
    <van-image-preview
      v-model="isShowImg"
      :images="previewImgs"
      closeable
      @change="onShowImgChange"
    >
      <div slot="cover" class="color-high">
        <!-- <van-icon name="down" class="down-img" @click="saveImage" /> -->
        <van-button v-if="clientName == 'eshimin'" @click="saveImage"
          >点击下载</van-button
        >
      </div>
    </van-image-preview>
  </div>
</template>

<script>
// import VPlayer from "@/components/common/VideoPlayer";
export default {
  components: {
    'VPlayer': () => import('@/components/common/VideoPlayer'),
  },
  data() {
    return {
      clientName: dsf.util.getClientName(),
      isShowImg: false,
      previewImgs: [],
      language: dsf.util.loadSessionStore("language") || "CN",
      token: undefined,
      video: {
        showVideo: false,
        videoTitle: "",
        type: "video/mp4"
      },
      showImgIdx: 0,
      ctype: this.$route.query.ctype
    };
  },
  methods: {
    onShowImgChange(idx) {
      this.showImgIdx = idx;
    },
    saveImage() {
      let self = this;
      try {
        console.log(`eshimin-invoke-saveImage`);
        eshimin.invoke(
          "saveImage",
          {
            type: "url",
            data: self.previewImgs[self.showImgIdx],
            name: "qrcode.png"
          },
          function(res) {
            console.log(`eshimin-invoke-saveImage`, "res=>", res);
            if (res.errorCode == 0) {
              dsf.layer.toast(`已保存至相册`, true);
            } else {
              dsf.layer.toast(res.errorMessage, false);
            }
          }
        );
      } catch (e) {
        console.log("eshimin-invoke-saveImage-err", e);
        dsf.layer.toast("请在随申办APP中操作", false);
      }
    },
    changeLang() {
      let self = this;
      self.language == "CN" ? (self.language = "EN") : (self.language = "CN");
      // dsf.util.saveToSessionStore("language", self.language);
    },
    go(key) {
      let self = this;
      let menu = dsf.config.ciie?.homePage?.menus?.find(menu => menu.id == key);
      console.log("menu=>", menu);
      if (menu) {
        // if (!menu.isSdk)
        self.buriePoint(menu.pType);
        if (menu.isImg) {
          self.isShowImg = true;
          self.previewImgs = [];
          self.previewImgs.push(...menu.src);
        } else if (menu.isVideo) {
          self.video.showVideo = true;
          self.video.videoTitle = menu.title;
          self.video.src = menu.path;
          self.video.type = `video/mp4`;
        } else if (menu.isSdk) {
          try {
            if (self.ctype == "esmwx") {
              // 微信小程序
              console.log("wx=>", wx, menu.path.wx);
              wx.miniProgram.navigateTo({ url: menu.path.wx });
            } else if (self.ctype == "esmappx") {
              // 支付宝小程序
              console.log("appx=>", my, menu.path.appx);
              my.navigateTo({ url: menu.path.appx });
            } else {
              // 随申办app
              console.log(`eshimin-invoke-${menu.name}`);
              eshimin.invoke(menu.name, menu.params, function(res) {
                console.log(`eshimin-invoke-${menu.name}`, "res=>", res);
                // 错误码含义
                // 0 成功
                // -1 此接⼝不存在（可能是传⼊的⽅法名有误）
                // -2 ⽆权限使⽤此接⼝
                // -3 其它错误（接⼝逻辑出现异常）
                // -4 参数不符合要求（例如参数⻓度或类型错误）
                // -5 ⽤户取消
                // 其他⼩于0 的错误码保留，⽤于未来拓展通⽤错误码
                // 其他⼤于0 的错误码允许各接⼝⾃定义使⽤的错误代码
                if (res.errorCode == 0) {
                  // self.buriePoint(menu.pType);
                } else {
                  dsf.layer.toast(res.errorMessage, false);
                }
              });
            }
          } catch (e) {
            console.log(`eshimin-invoke-${menu.name}-err`, e);
            dsf.layer.toast("请在随申办APP中操作", false);
          }
        } else if (menu.path) {
          if (menu.path.toLowerCase().startsWith("http")) {
            // self.$router.push({
            //   name: "dsfIframe",
            //   params: {
            //     url: menu.path,
            //     title: menu.title
            //   }
            // });
            location.href = menu.path;
          } else {
            self.$router.push(menu.path);
          }
        } else {
          dsf.layer.toast("敬请期待！");
        }
      } else {
        dsf.layer.toast("请检查菜单配置！");
      }
    },
    playerReadied(player) {
      // 直接全屏 如果当前设备支持的话
      player.requestFullscreen();
      // 当环境不支持全屏时 则扩展铺满容器
      // player.enterFullWindow();
    },
    buriePoint(pType) {
      let self = this;
      if (typeof pType != "number") return;
      dsf.http
        .get("/api/enterJbFollow", {
          type: pType
        })
        .done(res => {
          if (res.code == 0) {
            console.log("enterJbFollow=>", res);
          } else {
            throw res.msg;
          }
        })
        .error(err => {
          console.log("enterJbFollow-error", err);
        })
        .always(() => {});
    }
  },
  mounted() {
    let self = this;
    self.buriePoint(0);
    console.log("userAgent=>", window.navigator.userAgent);
  }
};
</script>

<style lang="scss" scoped>
//想要让下载图标显示，要改变van-image-preview__cover的属性（自己写，还要修改vant的官网css样式，不然图标没有显示）
::v-deep .van-image-preview__cover {
  bottom: 8% !important;
  left: 38% !important;
  top: initial;
}
.EN {
  font-size: 0.22rem;

  .tag {
    padding-right: 0.2rem !important;
  }

  .top-left {
    .tag {
      width: 2.48rem !important;
      background-image: url("../../../../static/images/jinbo/EN-tag1.png") !important;
    }
  }

  .top-right {
    .tag {
      width: 3.22rem !important;
      margin-left: -0.4rem;
      background-image: url("../../../../static/images/jinbo/EN-tag2.png") !important;
    }
  }

  .bottom-left {
    .tag {
      width: 2.4rem !important;
      background-image: url("../../../../static/images/jinbo/EN-tag3.png") !important;
    }
  }

  .bottom-right {
    .tag {
      width: 2.23rem !important;
      background-image: url("../../../../static/images/jinbo/EN-tag4.png") !important;
    }
  }

  .middle-top {
    width: auto !important;

    .tag {
      width: 2.66rem !important;
      background-image: url("../../../../static/images/jinbo/EN-tag10.png") !important;
    }
  }
  .middle-center {
    width: auto !important;

    .tag {
      width: 2.86rem !important;
      background-image: url("../../../../static/images/jinbo/EN-tag5.png") !important;
    }
  }

  .middle-bottom {
    width: auto !important;

    .tag {
      width: 2.21rem !important;
      background-image: url("../../../../static/images/jinbo/EN-tag6.png") !important;
    }
  }

  .bottom-model {
    .visit {
      .tag {
        width: 2.42rem !important;
        background-image: url("../../../../static/images/jinbo/EN-tag8.png") !important;
      }
    }
    .twin {
      .tag {
        right: 17.5% !important;
        width: 2.75rem !important;
        background-image: url("../../../../static/images/jinbo/EN-tag7.png") !important;
      }
    }
    .qrcode {
      .tag {
        // right: 17.5% !important;
        letter-spacing: 0.12em;
        width: 4.8rem !important;
        background-image: url("../../../../static/images/jinbo/EN-tag9.png") !important;
      }
    }
  }

  .bottom-tag {
    letter-spacing: 0.12em;
    width: 4.8rem !important;
    background-image: url("../../../../static/images/jinbo/EN-tag9.png") !important;
  }
}

.container {
  width: 100vw;
  background: url("../../../../static/images/jinbo/bg.png") bottom;
  background-size: cover;
  overflow: hidden;

  .logo {
    margin: 0.4rem 45px;

    img {
      height: 65px;
      width: auto;
    }
  }

  .top-model-bg {
    position: absolute;
    top: calc(100vw - 3.2rem);
  }
  .top-model {
    top: 0;
    margin: 0 0.9rem;
    position: relative;
    min-height: calc(100vw - 2.2rem);

    .box {
      width: 1.86rem;
      position: absolute;

      .tag {
        width: 1.86rem;
        height: 0.72rem;
        color: #fff;
        line-height: 0.6rem;
        text-align: right;
        padding-right: 0.32rem;
        background-size: cover;
      }

      .panda {
        width: 0.88rem;
        height: auto;
      }
    }

    .top-left {
      top: 0.54rem;
      left: 0.24rem;

      .tag {
        background-image: url("../../../../static/images/jinbo/tag1.png");
      }

      .panda {
        margin-left: 0.4rem;
      }
    }

    .top-right {
      top: 0.54rem;
      right: 0.24rem;

      .tag {
        background-image: url("../../../../static/images/jinbo/tag2.png");
      }

      .panda {
        margin-left: 0.6rem;
      }
    }

    .bottom-left {
      bottom: 0.54rem;
      left: 0.24rem;

      .tag {
        background-image: url("../../../../static/images/jinbo/tag3.png");
        padding-top: 6px;
      }

      .panda {
        margin-left: 0.4rem;
      }
    }

    .bottom-right {
      bottom: 0.54rem;
      right: 0.24rem;

      .tag {
        padding-top: 6px;
        background-image: url("../../../../static/images/jinbo/tag4.png");
      }

      .panda {
        margin-left: 0.6rem;
      }
    }
    .middle-top {
      top: -0.4rem;
      right: 52%;
      transform: translateX(50%);

      .tag {
        background-image: url("../../../../static/images/jinbo/tag10.png");
        width: 2.06rem;
      }
    }
    .middle-center {
      top: 1.84rem;
      right: 50%;
      transform: translateX(50%);

      .tag {
        background-image: url("../../../../static/images/jinbo/tag5.png");
      }
    }

    .middle-bottom {
      bottom: 1.84rem;
      right: 50%;
      transform: translateX(50%);

      .tag {
        padding-top: 6px;
        background-image: url("../../../../static/images/jinbo/tag6.png");
      }
    }
  }

  .bottom-tag {
    width: 2.6rem;
    height: 0.8rem;
    position: absolute;
    bottom: 2.9rem;
    right: 52%;
    transform: translateX(50%);
    background-image: url("../../../../static/images/jinbo/tag9.png");
    background-size: cover;
    line-height: 0.7rem;
    text-align: right;
    padding-right: 0.32rem;
    color: #fff;
  }

  .bottom-model {
    margin: 0.2rem 1.3rem;
    position: relative;
    .bg {
      top: -0.3rem;
      position: relative;
    }
    .visit {
      img {
        position: absolute;
        right: 75%;
        width: 0.5rem;
        height: 0.5rem;
        top: 0.8rem;
      }
      .tag {
        width: 1.86rem;
        height: 0.72rem;
        position: absolute;
        top: 0;
        right: 80%;
        transform: translateX(50%);
        background-image: url("../../../../static/images/jinbo/tag8.png");
        background-size: cover;
        line-height: 0.6rem;
        text-align: right;
        padding-right: 0.24rem;
        color: #fff;
      }
    }
    .twin {
      img {
        position: absolute;
        right: 19.5%;
        width: 0.5rem;
        height: 0.5rem;
        top: 0.8rem;
      }
      .tag {
        position: absolute;
        width: 2.04rem;
        height: 0.72rem;
        top: 0;
        right: 25%;
        transform: translateX(50%);
        background-image: url("../../../../static/images/jinbo/tag7.png");
        background-size: cover;
        line-height: 0.6rem;
        text-align: right;
        padding-right: 0.24rem;
        color: #fff;
      }
    }
    .qrcode {
      .tag {
        position: absolute;
        width: 2.6rem;
        height: 0.8rem;
        top: 2rem;
        right: 51%;
        transform: translateX(50%);
        background-image: url("../../../../static/images/jinbo/tag9.png");
        background-size: cover;
        line-height: 0.7rem;
        text-align: right;
        padding-right: 0.24rem;
        color: #fff;
        // bottom: 2.9rem;
        // line-height: 0.7rem;
        // padding-right: 0.32rem;
      }
    }
  }

  .change-btn {
    position: absolute;
    right: 10px;
    bottom: 150px;
    width: 60px;
    height: 60px;
    color: #fff;
    font-size: var(--font_size_4);
    line-height: 50px;
    text-align: center;
    background-image: url("../../../../static/images/jinbo/change.png");
    background-size: cover;
    // animation: flip-2-ver-right-1 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
  }
}

.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter {
  transform: translateX(-10px);
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
