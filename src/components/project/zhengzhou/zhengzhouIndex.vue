<template>
  <div class="zhengzhouIndex">
    <div class="header" :style="{ height: portrait ? '10vh' : '18vh', lineHeight: portrait ? '10vh' : '18vh' }">市委内网综合办公平台
    </div>
    <div class="content">
      <template v-for="item in allMenu">
        <div class="shell flex ac dc" :style="{ width: portrait ? '33.33%' : '25%' }">
          <div class="contentItem" :style="{ width: '80%', height: portrait ? '20vh' : '30vh' }" @click="goRoute(item)">
            <span class="badge" v-if="item.badge">{{ item.badge | badgeCount }}</span>
            <img :src="item.shortcutIcon" alt="">
            <span>{{ item.shortcutName }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'zhengzhouIndex',

  data() {
    return {
      allMenu: [],
      loginHegight: "",
      itemWidth: "",
      portrait: true
    }
  },
  filters: {
    badgeCount(val) {
      if (val > 100) {
        return "99+"
      }
      if (val < 1) {
        return ""
      }
      return val
    }
  },
  created() {
    window.addEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.isPortrait,
      false
    );
    this.isPortrait();
    this.getMenus()
  },

  methods: {
    isPortrait() {
      if (
        window.screen.orientation.angle === 180 ||
        window.screen.orientation.angle === 0
      ) {
        this.portrait = true
      } else if (
        window.screen.orientation.angle === 90 ||
        window.screen.orientation.angle === -90
      ) {
        this.portrait = false
      }
    },
    getMenus() {
      dsf.http.post("fn/newFile/shortcutDing", {}).then(({ data }) => {
        this.allMenu = data.data[0].children
        this.getBadge()
      })
    },
    getBadge() {
      let self = this
      this.allMenu.forEach(item => {
        self.$set(item, 'badge', 0)
        if (item.tip) {
          dsf.http.post(item.tip).then((res) => {
            item.badge = res.data.badge || res.data.data?.badge || 0
          })
        }
      })
    },
    openDDApp(agentId) {
      dd.biz.microApp.openApp({
        agentId: agentId,
        onSuccess: function (result) { },
        onFail: function (err) { }
      })
    },
    goRoute(item) {
      // if (item.props && item.props.action) {
      //   if (this[item.props.action]) {
      //     this[item.props.action]()
      //   } else {
      //     dsf.layer.toast("请开发对应方法")
      //   }
      //   return
      // }
      setTimeout(() => {
        // if (this.isSubMenu) { // 三级菜单点击跳转时，给父级菜单记录reOpenSubmenu用于返回时再打开三级菜单
        //   this.$parent.$parent.reOpenSubmenu = true
        // }
        if (item.children?.length > 0) {
          //打开三级菜单
          this.showSubmenu = true
          this.submenu = item
        } else if (item.actUrl == "" || item.actUrl == undefined) {
          //无菜单地址出提醒
          dsf.layer.alert({
            message: item.showClickTip || "当前菜单配置错误，请联系管理员！"
          })
        } else if (item.shortcutType && item.shortcutType == 3) {
          //打开钉钉应用
          this.openDDApp(item.actUrl)
        } else if (item.shortcutType == 2) {
          if (item.props && item.props.authorize == "1") {
            dsf.middleground.openUrl({
              url: item.actUrl,
              title: item.shortcutName,
              isOpenWebview: item.props.OpenWebView == "1",
              getCodeParams: { appCode: item.props.appCode }
            })
          }
          //打开第三方链接
          else if (dsf.config.ddSetting.isDing) {
            // 钉钉跳转
            if (dd.biz) {
              //区分普通钉和政务钉
              dd.biz.util.openLink({
                url: item.actUrl,
                onSuccess: function (result) { },
                onFail: function (err) { }
              })
            } else {
              dd.openLink({
                url: item.actUrl
              })
                .then(res => {
                  console.log(res)
                })
                .catch(err => { })
            }
          } else if (window.wx) {
            wx.invoke(
              "openUrl",
              {
                type: 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
                url: item.router //url地址
              },
              function (res) {
                if (res.err_msg != "openUrl:ok") {
                  //错误处理
                }
              }
            )
          } else if (item.props && item.props.OpenWebView == "1") {
            dsf.util.openWebviewToUrl({ url: item.actUrl, title: item.shortcutName })
          } else if (item.props && item.props.OpenLocationHref == "1") {
            location.href = item.actUrl
          } else {
            // 其他方式均嵌入iframe
            this.$router.push({
              name: "dsfIframe",
              query: {
                url: item.actUrl,
                title: item.shortcutName
              }
            })
          }
        } else {
          if (item.props?.props) {
            this.$router.push({
              path: item.actUrl,
              query: JSON.parse(JSON.stringify(item.props))
            })
          } else {
            this.$router.push({
              path: item.actUrl,
              query: {
                title: item.shortcutName
              }
            })
          }
        }
      }, 100)
    },
  },
  beforeDestroy() {
    window.removeEventListener(
      "onorientationchange" in window ? "orientationchange" : "resize",
      this.isPortrait(),
      false
    );
  },
  activated() {
    this.isPortrait()
    this.getBadge()
  }
}

</script>

<style scoped lang='scss'>
.zhengzhouIndex {
  height: 100vh;
  width: 100vw;
  background-color: #fff;

  .header {
    box-sizing: content-box;
    padding-bottom: 50px;
    text-align: center;
    background-image: linear-gradient(180deg, #DA1414 0%, rgba(218, 20, 20, 0.35) 100%);
    font-size: 35px;
    font-weight: 600;
    letter-spacing: 3px;
    color: #fff;
  }

  .content {
    width: 100%;
    margin-top: -50px;
    padding: 0 2% 65px;
    border-radius: 50px 50px 0 0;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;

    .contentItem {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      margin-top: 65px;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.20);
      border-radius: 25px;

      img {
        width: 33%;
      }

      span {
        font-size: 25px
      }

      .badge {
        width: 33px;
        height: 33px;
        border-radius: 50%;
        line-height: 33px;
        font-size: 18px;
        text-align: center;
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #ff3300;
        color: #fff;
      }
    }
  }
}
</style>