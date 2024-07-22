<template>
  <div class=""
    :style="{ backgroundImage: itemdata.params.bgImgUrl && itemdata.params.bgImgUrl.length ? `url(${dsf.url.getWebPath(itemdata.params.bgImgUrl)})` : '' }"
    :class="['WorkerHeaderComponents', itemdata.params.bgImgUrl.length ? '' : 'topBg', {'noHeaderMenu': !isShowHeaderMenu}]">
    <div class="flex ac search-container">
      <van-search v-model="keyword" placeholder="搜索" left-icon="" @search="search" :clearable="false">
        <template #left-icon>
          <i class="iconfont iconsousuo1" style="color: #fff"></i>
        </template>
        <!-- <template #right-icon>
          <img src="static/images/platform/voice.png" alt="" @click="goVoice">
        </template> -->
      </van-search>
      <img src="static/images/platform/scan.png" v-if="showScan" alt="" @click="scan" />
      <!-- <van-popover v-if="actions.length > 0" v-model="showPopover" trigger="click" :actions="actions" @select="onSelect"
        placement="bottom-end">
        <template #reference>
          <van-icon name="add-o" color="#fff" size="0.48rem" style="margin-left: 0.2rem" />
        </template>
      </van-popover> -->
    </div>
    <div class="flex jc" style="margin: 0.2rem 0 0.4rem" v-show="isShowHeaderMenu">
      <HeaderMenu fontsize="var(--font_size_3)" ref="headerMenu" @checkShow="changeShowHeaderMenu" />
      <!-- <div v-for="(item, index) in menus" :key="index" class="menu" @click="handle(item)">
        <img :src="item.img" alt="">
        <p>{{ item.name }}</p>
      </div> -->
    </div>
    <!-- <div v-if="itemdata.params.fontExpression" class="text">
      <span>{{ replaceText(itemdata.params.fontExpression) }}</span>
    </div> -->
    <van-overlay :show="show" @click="show = false" z-index="9999">
      <div class="wrapper" @click.stop>
        <img src="static/images/platform/qrcode.png" alt="" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import HeaderMenu from "@/components/SquMenu/headerMenu";
export default {
  components: { HeaderMenu },
  props: ["itemdata"],
  data() {
    return {
      showScan: this.itemdata.params.showScan != undefined ? this.itemdata.params.showScan : true,
      show: false,
      keyword: "",
      showPopover: false,
      actions: [
        {
          text: "切换工作台",
          action: "goRouter",
          url: "/pdgzt",
        },
      ],
      isShowHeaderMenu: true
    };
  },
  activated() {
    this.showPopover = false;
    this.$refs.headerMenu.getMenu();
  },
  methods: {
    changeShowHeaderMenu(isShow) {
      this.isShowHeaderMenu = isShow
    },
    onSelect(action) {
      // this.showPopover = false
      if (action.action) {
        this[action.action](action);
      }
    },
    goVoice() {
      // dsf.layer.toast("功能暂未开通")
      this.$router.push("/voiceAssistant");
    },
    greeting(hour) {
      if (hour >= 0 && hour <= 10) {
        return "早上好";
      } else if (hour > 10 && hour <= 14) {
        return "中午好";
      } else if (hour > 14 && hour <= 18) {
        return "下午好";
      } else if (hour > 18 && hour <= 24) {
        return "晚上好";
      }
    },
    replaceText(text) {
      return dsf.util
        .getReplaceUrl(text)
        .replace("[timeGreeting]", this.greeting(moment().hour()));
    },
    search() {
      this.$router.push(
        `/commonList?fileType=zhcx&keyword=${this.keyword}&title=文件查询`
      );
      this.keyword = "";
    },
    qrCode() {
      this.show = true;
    },
    goRouter(item) {
      setTimeout(() => {
        this.$router.push(item.url);
      }, 100);
    },
    handle(item) {
      this[item.action](item);
    },
    go(item) {
      setTimeout(() => {
        if (window.wx) {
          wx.invoke(
            "openUrl",
            {
              type: 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
              url: item.url, //url地址
            },
            function (res) {
              if (res.err_msg != "openUrl:ok") {
                //错误处理
              }
            }
          );
        } else {
          this.$router.push({
            name: "dsfIframe",
            params: {
              url: item.url,
              title: item.name,
            },
            query: item.params,
          });
        }
      }, 100);
    },
    scan() {

      let self=this
      if (window.wx) {
        wx.scanQRCode({
          desc: "scanQRCode desc",
          needResult: 0, // 默认为0，扫描结果由山东通处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            // 回调
          },
          error: function (res) {
            if (res.errMsg.indexOf("function_not_exist") > 0) {
              alert("版本过低请升级");
            }
          },
        });
      } else if (dsf.util.getClientName() == "app") {
        xsfBarcode.scan((res) => {
          if(dsf.config.projectName=="mengzhengtong") {
            self.$router.push({
              name: "mztSignIn",
              query: {
                text: res.text
              }
            })
          }
        });
      } else {
        dsf.layer.toast("请在app中使用");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.topBg {
  @include background-theme('normal');
}

.WorkerHeaderComponents {
  background-size: 100%;
  padding: 10px 10px 16px;

  .wrapper {
    width: 50vw;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .text {
    color: #fff;
    font-size: 21px;
    padding-left: 26px;
    margin: 40px 0 100px;
  }

  .search-container {
    // margin-bottom: 10px;

    .van-search {
      padding: 0;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.2);
      flex: 1;

      .van-search__content {
        background-color: transparent;

        ::v-deep input {
          color: #fff;

          &::placeholder {
            color: #fff;
          }
        }
      }
    }

    img {
      width: 22px;
      margin-left: 8px;
    }
  }

  .menu {
    width: 25%;
    text-align: center;
    color: #fff;

    img {
      width: 30px;
      display: inline-block;
      margin-bottom: 5px;
    }
  }
}
</style>
