<template>
  <div :class="['menu', `menu_${rowNum}`, { padStyle: padStyle }]" :style="{ width: padStyle ? `${100 / rowNumber}%` : `${100 / rowNum}%` }">
    <div @click="goRoute(data)" v-if="padStyle" class="padStyle_box">
      <img :style="data.imgStyle" :src="data.img" alt class="padStyle_img" />
      <span :style="data.style" v-html="data.name" class="padStyle_text"></span>
      <div class="badge" v-if="data.badgeNum">
        {{ data.badgeNum | badgeCount }}
      </div>
    </div>
    <div @click="goRoute(data)" v-else>
      <img :style="data.imgStyle" :src="data.img" alt />
      <p :style="data.style" v-html="data.name"></p>
      <div class="badge" v-if="data.badgeNum">
        {{ data.badgeNum | badgeCount }}
      </div>
    </div>
    <van-popup v-model="showSubmenu" @click="showSubmenu = false;reOpenSubmenu = false" overlay-class="submenuOverlay" class="submenuContainer" get-container="#app">
      <div class="submenuTitle">{{ submenu.name }}</div>
      <div class="submenuBox">
        <div :class="[singleRowPopMenu ? 'singleRow' : 'dsf-list']" v-if="submenu.child.length > 0">
          <application-item :key="subIndex" v-for="(item, subIndex) in submenu.child" :data="item" :rowNum="singleRowPopMenu ? 1 : 3" :isSubMenu="true"></application-item>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import methodsMixin from "./methodsMixin"
export default {
  name: "applicationItem",
  mixins: [methodsMixin],
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          badge: "",
          child: [],
          img: "",
          name: "",
          props: "",
          router: "",
          showClickTip: "",
          imgStyle: "{}",
          style: "{}",
          type: ""
        }
      }
    },
    rowNum: {
      type: Number,
      default: 4
    },
    padStyle: {
      type: Boolean,
      default: false
    },
    needTip: {
      type: Boolean,
      default: true
    },
    isSubMenu: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showSubmenu: false,
      submenu: {
        name: "",
        child: []
      },
      maxPopMenuLength: dsf.config.appSelect.maxPopMenuLength, // 弹层三级菜单中最大显示数量，超出则使用一行一个样式
      rowNumber: 0, // pad样式的列数
      screenWidth: null,
      reOpenSubmenu: false
    }
  },

  watch: {
    screenWidth: {
      handler: function (val) {
        this.rowNumber = Math.round(val / 220)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    singleRowPopMenu() {
      return this.maxPopMenuLength ? this.submenu.child.length > this.maxPopMenuLength : false
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
    this.getBadge()
  },
  mounted() {
    this.screenWidth = document.body.clientWidth
    window.addEventListener("resize", this.renderResize, false)
    // window.onresize = () => {
    //   return (() => {
    //     this.screenWidth = document.body.clientWidth
    //   })()
    // }
  },
  activated() {
    this.getBadge()
    if (this.reOpenSubmenu) {
      this.goRoute(this.data)
      this.reOpenSubmenu = false
    }
  },
  methods: {
    renderResize() {
      this.screenWidth = document.body.clientWidth
    },
    getBadge() {
      this.data.badgeNum = 0
      if (this.data.badge) {
        dsf.http.postUrls(this.data.badge, {}).then(result => {
          for (let index = 0; index < result.length; index++) {
            const response = result[index].data
            const badgeNum = response.total || response.badge || response.data?.badge || response.data
            this.data.badgeNum += !isNaN(badgeNum) ? parseInt(badgeNum) : 0
          }
        })
      }
    },
    goRoute(item) {
      if (item.props && item.props.action) {
        if (this[item.props.action]) {
          this[item.props.action]()
        } else {
          dsf.layer.toast("请开发对应方法")
        }
        return
      }
      setTimeout(() => {
        if (this.isSubMenu) { // 三级菜单点击跳转时，给父级菜单记录reOpenSubmenu用于返回时再打开三级菜单
          this.$parent.$parent.reOpenSubmenu = true
        }
        if (item.child.length > 0) {
          //打开三级菜单
          this.showSubmenu = true
          this.submenu = item
        } else if (item.router == "" || item.router == undefined) {
          //无菜单地址出提醒
          if (this.needTip) {
            dsf.layer.alert({
              message: item.showClickTip || "当前菜单配置错误，请联系管理员！"
            })
          }
        } else if (item.type && item.type == 3) {
          //打开钉钉应用
          this.openDDApp(item.router)
        } else if (item.type == 2) {
          if (item.props && item.props.authorize == "1") {
            dsf.middleground.openUrl({
                url: item.router,
                title: item.name,
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
                url: item.router,
                onSuccess: function (result) {},
                onFail: function (err) {}
              })
            } else {
              dd.openLink({
                url: item.router
              })
                .then(res => {
                  console.log(res)
                })
                .catch(err => {})
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
            dsf.util.openWebviewToUrl({ url: item.router, title: item.name })
          } else if (item.props && item.props.OpenLocationHref == "1") {
            location.href = item.router
          } else {
            // 其他方式均嵌入iframe
            this.$router.push({
              name: "dsfIframe",
              query: {
                url: item.router,
                title: item.name
              }
            })
          }
        } else {
          if (item.props) {
            if (item.props.props) {
              this.$router.push({
                path: item.router,
                query: JSON.parse(JSON.stringify(item.props))
              })
            }
          } else {
            this.$router.push({
              path: item.router,
              query: {
                title: item.name
              }
            })
          }
        }
      }, 100)
    },
    openDDApp(agentId) {
      dd.biz.microApp.openApp({
        agentId: agentId,
        onSuccess: function (result) {},
        onFail: function (err) {}
      })
    },
  }
}
</script>
<style lang="scss" scoped>
@import "./application.scss";
</style>
<style lang="scss">
.submenuOverlay {
  backdrop-filter: blur(10px);
  background-color: rgba(175, 175, 175, 0.6);
  z-index: 99;
}

.padStyle {
  .padStyle_box {
    display: flex;
    align-items: center;

    .padStyle_img {
      margin-bottom: 0px;
      width: 40px;
      height: 40px;
    }

    .padStyle_text {
      flex: 1;
      text-align: left;
      padding-left: 10px;
    }
  }
}
</style>
