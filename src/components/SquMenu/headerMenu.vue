<template>
  <div class="ds-squemenu">
    <div class="dsf-list">
      <application-item :rowNum="rowNum" :key="index" v-for="(item, index) in menuList" :data="item" v-if="item.isshow" :needTip="false"></application-item>
    </div>
  </div>
</template>

<script>
import applicationItem from "@/components/applicationCenter/applicationItem.vue"
//  import menuList from './menu';
export default {
  components: { applicationItem },
  props: ["fontsize", "menudata"],
  data() {
    return {
      menuList: [],
      rowNum: 4
    }
  },
  created() {
    if (this.menudata == undefined) {
      this.getMenu()
    }
  },
  methods: {
    getMenu() {
      dsf.http.post("fn/newFile/shortcutDing", { type: "header" }).then(res => {
        let result = res.data
        let mainMenuNow = []
        // 递归菜单
        let list = result.data
        this.forFunc(list, mainMenuNow)
        this.menuList = mainMenuNow
      })
    },
    // 递归处理多级菜单
    forFunc(list, menu) {
      list.forEach(item => {
        let child = this.setMenuItem(item)
        menu.push(child)
        if (item.children?.length > 0) this.forFunc(item.children, child.child)
      })
    },
    // 处理应用菜单数据结构
    setMenuItem(item) {
      try {
        if (item.agentid) {
          // 配置应用参数必须为JSON对象
          item.agentid = JSON.parse(item.agentid)
        }
      } catch (e) {
        item.agentid = {}
      }
      return {
        name: item.shortcutName,
        badge: item.tip,
        badgeNum: 0,
        router: item.actUrl ? dsf.util.getReplaceUrl(item.actUrl.trim()) : "",
        img: item.shortcutIcon,
        props: item.agentid,
        type: item.shortcutType,
        showClickTip: item.gntsyText,
        child: [],
        imgStyle: dsf.config.homePage.menuSetting && dsf.config.homePage.menuSetting.imgStyle ? dsf.config.homePage.menuSetting.imgStyle : "{}",
        style: dsf.config.homePage.menuSetting && dsf.config.homePage.menuSetting.itemStyle ? dsf.config.homePage.menuSetting.itemStyle : "{}",
        isshow: true,
        id: item.id,
        guid: this.guid()
      }
    },
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/components/applicationCenter/application.scss";
</style>
<style lang="scss">
.ds-squemenu {
  width: 100%;
  height: auto;
  .dsf-list {
    padding: 15px 0 0;
    .menu {
      img {
        width: 44px !important;
        height: 44px !important;
        object-fit: contain;
      }
      p {
        font-size: var(--font_size_3);
        color: #fff;
        letter-spacing: 1px;
      }
    }
  }
}

</style>
