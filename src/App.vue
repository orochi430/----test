<template>
  <div id="app">
    <van-sticky id="appTop">
      <!-- 嵌入钉钉工作台时手机顶部导航栏未适配，添加空白div占位 -->
      <div v-show="$store.state.showTopDiv" :style="{backgroundColor: '#fff', height: `${$store.state.statusBarHeight}px`}" ></div>
      <header v-if="isShowHeader" @click="headerGoTop">
        <van-nav-bar :title="title" @click-left="goBack" v-if="defaultHead" style="z-index:9">
          <template #left>
            <van-icon name="arrow-left" /><span v-if="isShowRturnName"
              >返回</span
            >
          </template>
        </van-nav-bar>
        <van-cell :title="title" icon="static/images/menu1.png" v-else />
      </header>
    </van-sticky>
    <div class="appContent" id="appContent" v-show="isShowRouterView">
      <router-view v-if="!$route.meta.keepAlive || !isLogin" :key="$route.meta.noRefresh ? '0' : $route.fullPath"/>
      <keep-alive v-if="$route.meta.alwaysKeepAlive || isLogin">
        <router-view
          v-if="$route.meta.keepAlive"
          :key="$route.meta.noRefresh ? '0' : $route.fullPath"
          :isiframe="!isShowRouterView"
        >
          <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </keep-alive>
    </div>
    <!-- iframe页 -->
    <div class="hasFoot" v-show="!isShowRouterView" id="divIframe">
      <fileIframe
        v-for="item in componentsArr"
        :key="item.path"
        :item="item"
        :fileUrl="item.path"
        v-show="item.show"
      >
      </fileIframe>
    </div>
    <div class="foot" id="appFoot" v-if="isShowFooter">
      <footer>
        <template v-for="(item, index) in appFooter">
          <!-- notShow：不在所设置的设备中显示该底部导航 -->
          <div
            class="appMenu"
            v-if="
              !item.notShow ||
              item.notShow.indexOf(dsf.util.getClientName()) == -1
            "
            :key="index"
            @click="toRoute(item, index)"
          >
            <span
              :class="['circleIcon', { checkedCircleColor: item.checked }]"
              v-if="item.isBulge == 1"
            >
              <!-- 突出圆形图标 -->
              <i
                :class="[
                  'icon',
                  'iconfont',
                  item.checked && item.selectIcon ? item.selectIcon : item.icon,
                ]"
              ></i>
            </span>
            <span>
              <i
                v-if="item.isBulge != 1"
                :class="[
                  'icon',
                  'iconfont',
                  item.checked && item.selectIcon ? item.selectIcon : item.icon,
                  { checkedColor: item.checked },
                ]"
              ></i>
              <i
                class="badgenumber"
                v-if="item.count && item.displayType == 1"
                >{{ item.count | badgeCount }}</i
              >
              <i
                class="badgenumberSpot"
                v-if="item.count && item.displayType == 2"
              ></i>
            </span>
            <div class="name" :class="{ checkedColor: item.checked }">
              {{ item.showName }}
            </div>
          </div>
        </template>
      </footer>
    </div>
    <scanCodeToLogin @closeDialog="closeDialog" :scanText="scanText" v-if="showScanLoginDialog"></scanCodeToLogin>
  </div>
</template>

<script>
import commonCordova from "@/common/commonCordova";
import { mapState } from "vuex";
import Vue from "vue";
import chatJS from "@/common/chat";
import { setAppTopColor } from "@/common/setTheme";
import scanCodeToLogin from "./components/dialog/scanCodeToLogin.vue";
import store from "@/common/util";
export default {
  name: "App",
  components:{
    scanCodeToLogin
  },
  data() {
    return {
      maxCache: 10,
      defaultHead: true,
      componentsArr: [], // 含有iframe的页面
      iframeArr: [],
      badgeInterval: null,
      isLogin: false,
      showScanLoginDialog:false,
      scanText:""
    };
  },
  computed: {
    isShowRouterView() {
      let show = true;
      if (
        this.$route.name == "index" &&
        this.componentsArr.find((item) => item.id == this.$route.params.key)
      ) {
        show = false;
      }
      return show;
    },
    isShowRturnName() {
      let show = true;
      if (
        dsf.config.appTopMenu &&
        dsf.config.appTopMenu.style &&
        dsf.config.appTopMenu.style.hideReturnName
      ) {
        show = false;
      }
      return show;
    },
    isShowFooter() {
      if (this.$route.path == "/") return false;
      if (this.$route.query.isShowFooter !== undefined) {
        return this.$route.query.isShowFooter > 0;
      }
      // 显示底部导航栏的条件：是配置的index导航页且在该设备类型下显示在底部导航栏中
      let isShowInClient = false;
      let curIndexPage = null;
      if (this.$route.name == "index") {
        curIndexPage = this.appFooter.find((item) => {
          if (this.$route.params.key) {
            return item.id == this.$route.params.key;
          } else {
            return item.checked;
          }
        });
      } else {
        curIndexPage = this.appFooter.find(
          (item) => item.router.indexOf(this.$route.path) > -1
        );
        if (curIndexPage) {
          this.appFooter.forEach((item) => {
            item.checked = false;
          });
          curIndexPage.checked = true;
        }
      }
      if (curIndexPage && curIndexPage.notShow !== undefined) {
        isShowInClient =
          curIndexPage.notShow.indexOf(dsf.util.getClientName()) == -1;
      }
      return (
        (dsf.config.appFooter.isShow == undefined ||
          dsf.config.appFooter.isShow) &&
        isShowInClient
      );
    },
    isShowHeader() {
      if (this.$route.path == "/") return false;
      if (this.$route.query.isShowHeader !== undefined) {
        return this.$route.query.isShowHeader > 0;
      }
      // console.log(dsf.util.getClientName());
      if (
        // dsf.util.getClientName() == "app" ||
        (this.appTopMenu && this.appTopMenu.value)
      ) {
        if (
          !dsf.util.checkUserRole("疫情查询高级") &&
          this.$route.name == "epidemicPrevention"
        ) {
          return false;
        }
        let homePage =
          dsf.util.loadSessionStore("homePage") ||
          dsf.config.login.defaultUrl ||
          dsf.config.login.customLogOutUrl ||
          "login";
        let tempUrl = this.$route.fullPath.split("?")[0];
        if (
          homePage &&
          tempUrl.toLowerCase().indexOf(homePage.toLowerCase()) > -1
        ) {
          return false;
        }
        if (
          this.$route.name == "index" &&
          !this.appTopMenu?.filterRouter?.find(
            (it) => it.toLowerCase() == "index"
          )
        ) {
          // if (dsf.config.appFooter && dsf.config.appFooter.isShow == false){ //
          //     return true
          // }
          if (
            dsf.util
              .loadSessionStore("footerMenu")
              .filter((item) => item.isShow).length == 1
          ) {
            return false;
          }
          return !this.isShowFooter; // index不显示底部时默认有头部
        } else if (this.$route.name) {
          let isHide =
            this.appTopMenu && this.appTopMenu.filterRouter
              ? this.appTopMenu.filterRouter.filter(
                  (it) => it.toLowerCase() == this.$route.name.toLowerCase()
                ).length
              : false;
          return (
            !isHide &&
            this.appFooter.findIndex(
              (item) => item.router == this.$route.path
            ) < 0
          );
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    ...mapState({
      title: (state) => state.pageTitle,
      appFooter: (state) => state.appFooter || [],
      appTopMenu: (state) => state.appHeader,
      iframeHistory: (state) => state.iframeHistory,
    }),
  },
  watch: {
    isShowFooter: {
      handler(nv) {
        this.$store.commit("toggleShowAppFooter", {
          flag: nv,
        });
      },
      immediate: true
    },
    isShowHeader: {
      handler(nv) {
        this.$store.commit("toggleShowAppHeader", {
          flag: nv,
        });
        if (nv) {
          setAppTopColor("#ffffff",true)
        }else{
          setAppTopColor()
        }
        if (this.$route.query.noback == 1) {
          this.defaultHead = false;
        }
      },
      immediate: true
    },
    appFooter() {
      //加载角标
      // this.loadBadge(this.appFooter);
      // setInterval(() => {
      //     this.loadBadge(this.appFooter);
      // }, 60000) //1分钟一次
      if (!this.appFooter.length) {
        this.componentsArr = [];
        this.iframeArr = [];
      }
      if (
        this.appFooter.length &&
        !this.componentsArr.length &&
        dsf.util.loadSessionStore("user")
      ) {
        // 设置iframe页的数组对象
        this.componentsArr = this.getComponentsArr();
      }
    },
    $route() {
      // 判断当前路由是否iframe页
      this.isOpenIframePage();
      this.refreshFooterBadge();
      this.isLogin = !!dsf.util.loadSessionStore("loginToken")
    },
  },
  filters: {
    badgeCount(val) {
      if (val > 100) {
        return "99+";
      }
      if (val < 1) {
        return "";
      }
      return val;
    },
  },
  created() {
    if (dsf.config.login && dsf.config.login.fontSizeMultiple) {
      dsf.util.saveToLocalStore(
        "fontSizeMultiple",
        dsf.config.login.fontSizeMultiple
      );
    }
    this.setFontSize()
    chatJS.registerMessage(); //增加IM的postmessage监听
  },
  mounted() {

    console.log(moment(new Date()).format())

    if (dsf.config.appTopMenu && dsf.config.appTopMenu.style) {
      this.setAppTopStyle();
    }

    //防止手动刷新之后vuex菜单消失
    this.$vuex.commit(
      "changeAppFooter",
      dsf.util.loadSessionStore("footerMenu")
    );
    if (dsf.util.loadSessionStore("user"))
      Vue.prototype.$user = dsf.util.loadSessionStore("user");

    this.loadBadge(this.appFooter);

    let self = this;

    if (dsf.config.commonForm.readonlyColor) {
      this.setReadonlyColor();
    }
    if (dsf.config.commonForm.controlLabelColor) {
      this.setControlLabelColor();
    }

    //这里添加一个监听事件  用于监听扫码登录时候的确认页面
    this.$bus.on("showScanDialog", text=>{
        this.showScanLoginDialog = true
        this.scanText = text
    })
  },
  updated() {},
  methods: {
      headerGoTop() {
      if (dsf.config.homePage.headerGoTop) {
        if (document.querySelector('.van-tabs__content')) {
          this.scrollContainer = document.querySelector('.van-tabs__content')
        } else if (document.querySelector('.formBox')) {
          this.scrollContainer = document.querySelector('.formBox')
        }
        this.clickTime = new Date().getTime();
        setTimeout(() => {
          if (new Date().getTime() - this.clickTime < 500) {
            this.$nextTick(() => {
              this.scrollContainer.scrollTop = 0
            })
          }
        }, 500)
      }
    },
    refreshFooterBadge() {
      //底部栏存在的路由和index都加载角标
      let filterRt = this.appFooter.filter(item => item.router).map(ele=> ele.router.substring(1));
      if ([...filterRt, "index"].includes(this.$route.name)) {
        this.loadBadge(this.appFooter);
        clearInterval(this.badgeInterval);
        this.badgeInterval = setInterval(() => {
          this.loadBadge(this.appFooter);
        }, 5000);
      } else {
        clearInterval(this.badgeInterval);
        this.badgeInterval = null;
      }
    },
    // 根据当前路由设置hasOpen
    isOpenIframePage() {
      this.componentsArr.forEach((element) => {
        element.show = false;
      });
      if (this.$route.name == "index") {
        const target = this.componentsArr.find(
          (item) => this.$route.params.key == item.id
        );
        if (target) {
          target.show = true;
          commonCordova.addEventBackbuttonNoExist("backbuttonNoExist");
        } else {
          commonCordova.addEventBackbutton("backbutton");
        }
      }
    },
    getIframe() {
      this.appFooter.map((item) => {
        if (item.components && item.components.length > 0) {
          let linkComponent = item.components.find(
            ite => ite.name == "ExternalLinksComponents" && ite.params.iframeType != "局部内置组件" && !(ite.params.iframeType == "IM" && dsf.util.getClientName() == "mobileIM")
          );
          if (linkComponent) {
            linkComponent = dsf.util.deepCopy(linkComponent);
            this.$set(linkComponent, "id", item.id);
            this.iframeArr.push(linkComponent);
          }
        }
      });
    },
    // 遍历路由的所有页面，把含有iframeComponent标识的收集起来
    getComponentsArr() {
      this.getIframe();
      return this.iframeArr.map((item) => {
        return {
          id: item.id,
          path: dsf.util.getReplaceUrl(item.params.url),
          show: false, //是否显示当前iframe
        };
      });
    },
    loadBadge(menus) {
      // console.log("加载角标");
      if (
        this.$route.name &&
        this.$route.name.toLowerCase().indexOf("login") < 0 &&
        this.$route.name.toLowerCase() != "autologintourl"
      ) {
        menus.forEach((item) => {
          if (item.badgeUrl) {
            item.badgeUrl = dsf.util.getReplaceUrl(item.badgeUrl);
            dsf.http.get(item.badgeUrl, {}).then((data) => {
              this.$set(
                item,
                "count",
                Number(
                  data.data.total ||
                    data.data.count ||
                    data.data.badge ||
                    data.data.data
                )
              );
              this.$vuex.commit("changeAppFooter", menus);
            });
          }
        });
      }
    },
    toRoute(data, index) {
      let url;
      if (data.router) {
        if (data.params) {
          url =
            data.router +
            "?" +
            Object.entries(data.params)
              .map((it) => it.join("="))
              .join("&");
        } else {
          url = data.router;
        }
      } else {
        url = "/index/" + data.id; //+"?t="+Math.random();
      }
      // 当配置路由为链接时，使用webview打开（不是组件嵌入iframe）
      if (url.indexOf("http") == 0) {
        if (dsf.util.getClientName() == "app") {
          xsfWindow.openWebView({
            title: data.showName,
            url: dsf.util.getReplaceUrl(url),
            colorString: "#111111",
          });
        } else {
          dsf.layer.toast("仅支持在app中打开");
        }
      } else {
        this.$router.push({
          path: url,
        });
      }
    },
    goBack() {
      // webView返回
      if (this.$route.query.webViewBack) {
        xsfWindow.closeWebView();
      }else if(navigator.userAgent == "mobileIM" && window.native && window.native.goBack){
        window.native.back();
        return
      }
      let self = this;
      let oldUrl = this.$route.fullPath;
      if (this.$route.query.backTo) {
        location.href = this.$route.query.backTo;
      } else {
        let count = -1;
        // if (this.$route.query.jumpBack!=="0") {//当有jumpBack该参数时且等于0则跳过该逻辑，按步返回，否则适配IM一次性返回
        //   let currentHistory = this.iframeHistory[this.$route.fullPath];
        //   if (currentHistory) {
        //     count = currentHistory - history.length; //如果是iframe内部跳转的话   两个length肯定不一样，否则是一样的
        //     this.$vuex.commit("clearHistory", { url: this.$route.fullPath });
        //     count = count < 0 ? count - 1 : -1;
        //   }
        // }
        this.$router.go(count);
      }
      //防止IM加载之后导致无法返回的问题
      if (dsf.config.IMSetting?.OATOIM?.length) {
        setTimeout(() => {
          let newUrl = this.$route.fullPath;
          console.log(oldUrl, newUrl);
          if (oldUrl == newUrl) {
            self.$router.go(-1);
          }
        }, 100);
      }
    },
    setAppTopStyle() {
      /*
            如果需要自定义返回栏样式，需要在apptopmenu中增加配置：
            "style": {
                "color":"black",
                "backgroundColor":"white",
                "hideReturnName":false,
                "iconStyle":{
                    "color":"#2271b3",
                    "fontSize": "18px"
                }
            },
            */
      let style = document.createElement("style");
      style.type = "text/css";
      let cssRule = "";
      if (dsf.config.appTopMenu.style.color) {
        cssRule += `.van-nav-bar__title{
                    color: ${dsf.config.appTopMenu.style.color} !important;
                }
                `;
      }
      if (dsf.config.appTopMenu.style.iconStyle) {
        cssRule += `
                .van-nav-bar .van-icon{
                    color: ${dsf.config.appTopMenu.style.iconStyle.color} !important;
                    font-size: ${dsf.config.appTopMenu.style.iconStyle.fontSize} !important;
                }
                `;
      }
      if (dsf.config.appTopMenu.style.backgroundColor) {
        cssRule += `.van-nav-bar__content{
                    background-color: ${dsf.config.appTopMenu.style.backgroundColor} !important;
                }`;
      }
      this.$el.appendChild(style);
      style.innerHTML = cssRule;
    },
    setReadonlyColor() {
      let style;
      const cssRule = `
            .readonly-font .van-field__control:read-only{
                color: ${dsf.config.commonForm.readonlyColor} !important;
            }`;
      style = document.createElement("style");
      style.type = "text/css";
      this.$el.appendChild(style);
      style.innerHTML = cssRule;
    },
    setControlLabelColor() {
      let style;
      const cssRule = `
            .formLayout .control_label{
                color: ${dsf.config.commonForm.controlLabelColor} !important;
            }`;
      style = document.createElement("style");
      style.type = "text/css";
      this.$el.appendChild(style);
      style.innerHTML = cssRule;
    },
    setFontSize() {
      let fontSizeClass = dsf.util.loadLocalStore('fontSizeClass') || 'large-font-size'
      console.log(fontSizeClass)
      $("body").addClass(fontSizeClass)
    },
    closeDialog(){
      this.showScanLoginDialog = false
    }
  },
};
</script>

<style lang="scss" scoped>
@import "assets/styles/themes.scss";
@import "assets/styles/mixin.scss";

.van-nav-bar {
  @include font-theme("normal");

  .van-icon {
    @include font-theme("normal");
    @include font_5;
    margin-right: 3px;
  }
}

.van-cell__left-icon {
  font-size: var(--font_size_0);
}

.name {
  font-size: var(--font_size_4);
}

#app {
  // overflow: auto;
  // display: flex;
  // flex-direction: column;

  // .appContent {
  //     flex: 1;
  //     overflow-y: visible;
  // }

  header {
    width: 100%;
    height: 46px;
    z-index: 999;

    // ::v-deep .van-nav-bar__title {
    //   font-weight: bolder;
    // }
  }

  .hasFoot {
    height: calc(100vh - 1.2rem);
  }

  .noFoot {
    height: calc(100vh);
  }

  .foot {
    height: 1.2rem;
  }

  footer {
    background: white;
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
    height: 1.2rem;
    display: flex;
    z-index: 1;

    > div {
      flex: 1;
      text-align: center;

      // line-height: 1.2rem;
    }

    > .appMenu {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #82797d;

      .circleIcon {
        width: 45px;
        height: 45px;
        position: absolute;
        border-radius: 50%;
        left: 50%;
        transform: translateX(-50%);
        top: -12px;
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);

        .icon {
          font-size: 22px;
          vertical-align: -webkit-baseline-middle;
        }
      }

      .checkedCircleColor {
        @include background-theme("normal");
        color: #fff;
      }

      > span {
        height: 26px;
        margin-bottom: 4px;
        i {
          font-size: 26px;
        }
      }

      > div {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      .badge {
        width: 5px;
        height: 5px;
        background-color: #f65959;
        position: absolute;
        border-radius: 50%;
        top: 7px;
        right: 7px;
      }

      .badgenumber {
        width: fit-content;
        position: absolute;
        top: -5px;
        font-size: var(--font_size_4);
        background-color: #ee0a24;
        color: #fff;
        padding: 0 4px;
        border-radius: 10px;
        line-height: 0.4rem;
        height: 0.4rem;
        min-width: 0.4rem;
      }

      .badgenumberSpot {
        height: 6px;
        width: 6px;
        position: absolute;
        top: 5px;
        font-size: var(--font_size_4);
        background-color: #ee0a24;
        color: #fff;
        border-radius: 5px;
      }

      .checkedColor {
        @include font-theme("normal");
        @include bold;
      }
    }
  }
}
</style>
