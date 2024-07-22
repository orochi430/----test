<template>
  <div :class="['menu', `menu_${rowNum}`, { padStyle: padStyle }]"
    :style="{ width: padStyle ? `${100 / rowNumber}%` : `${100 / rowNum}%` }">
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
    <van-popup v-model="showSubmenu" @click="showSubmenu = false" overlay-class="submenuOverlay" z-index="99"
      class="submenuContainer">
      <div class="submenuTitle">{{ submenu.name }}</div>
      <div class="submenuBox">
        <div :class="[singleRowPopMenu ? 'singleRow' : 'dsf-list']" v-if="submenu.child.length > 0">
          <application-item :key="subIndex" v-for="(item, subIndex) in submenu.child" :data="item"
            :rowNum="singleRowPopMenu ? 1 : 3"></application-item>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import methodsMixin from "@/components/applicationCenter/methodsMixin"
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
      screenWidth: null
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
      let self = this;
      if (!item.url) {
        dsf.layer.toast('请配置应用地址');
        return;
      }
      setTimeout(() => {
        dsf.middleground.openUrl({
          url: item.url,
          title: item.name,
          getCodeParams: { "appId": item.id }
        })
      }, 100);
    },
    openDDApp(agentId) {
      dd.biz.microApp.openApp({
        agentId: agentId,
        onSuccess: function (result) { },
        onFail: function (err) { }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/components/applicationCenter/application.scss";
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
