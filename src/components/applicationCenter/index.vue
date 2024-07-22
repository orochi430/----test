<template>
  <div class="text">
    <!-- 有tab的情况下 -->
    <template v-if="isShowTab">
      <my-application-card v-if="isShowMyMenus || justShowMyMenus" :menu="myMenus" :showIcon="showIcon"
        :isHideTitle="isHideTitle" :title="myMenusName" :rowNum="rowNum" :countNum="countNum" :class="{'title-outside': outsideTitle}"></my-application-card>
      <van-tabs :line-width="active.length + 'em'" v-if="!justShowMyMenus" v-model="active" scrollspy sticky :offset-top="dsf.util.getOffsetTop(offsetTop)"
        :class="['menu-tab', {'theme-tab': positionTab.useTheme}]" ref="tabs" @scroll="change">
        <van-tab v-for="(item, index) in mainMenu" :title="item.name" :key="index" :name="item.name" v-if="item.child.filter(subItem => {
          return subItem.isshow
        }).length > 0
          ">
          <application-card :menu="item" :showIcon="showIcon" :isHideTitle="isHideTitle" :maxRows="maxRows"
            :rowNum="rowNum" :padStyle="padStyle" :class="{ 'title-outside': outsideTitle }"></application-card>
        </van-tab>
      </van-tabs>
      <van-empty v-if="isShowEmpty" description="暂无菜单权限" image="static/images/empty.png" />
    </template>

    <div v-else>
      <my-application-card v-if="justShowMyMenus" :menu="myMenus" :showIcon="showIcon" :isHideTitle="isHideTitle"
        :title="myMenusName" :rowNum="rowNum" :countNum="countNum"
        :class="{ 'title-outside': outsideTitle }"></my-application-card>
      <template v-if="!justShowMyMenus" v-for="(item, index) in mainMenu">
        <my-application-card v-if="isShowMyMenus && myMenusIndex == index" :menu="myMenus" :showIcon="showIcon"
          :isHideTitle="isHideTitle" :rowNum="rowNum" :title="myMenusName"
          :class="{ 'title-outside': outsideTitle }"></my-application-card>
        <application-card :menu="item" :showIcon="showIcon" :isHideTitle="isHideTitle" :maxRows="maxRows" :rowNum="rowNum"
          :padStyle="padStyle" :class="{ 'title-outside': outsideTitle }"></application-card>
      </template>
      <van-empty v-if="isShowEmpty" description="暂无菜单权限" image="static/images/empty.png" />
    </div>
  </div>
</template>

<script>
import myApplicationCard from "@/components/applicationCenter/myApplicationCard.vue"
import applicationCard from "@/components/applicationCenter/applicationCard.vue"
import { mapState } from "vuex";
export default {
  components: { applicationCard, myApplicationCard },
  props: ["itemdata"],
  data() {
    return {
      // mainMenu: [],
      myMenus: [],
      maxRows: dsf.config.appSelect.maxRows,
      isShowMyMenus: !!dsf.config.appSelect?.isShowMyMenus,
      myMenusIndex: dsf.config.homePage?.menuSetting?.myMenuIndex || 0,
      isShowTab: !!dsf.config.appSelect?.isShowTab,
      active: 0,
      isRepeatShow: !!dsf.config.appSelect?.isRepeatShow,
      isSetUserShortcutDing: !!dsf.config.appSelect.setUserShortcutDing, // 是否后台存储我的应用
      fontMultiple: dsf.util.loadLocalStore('multiple')
      // positionTab: {
      //   alwaysShow: true,
      //   offsetTop: '0.5rem',
      //   useTheme: true
      // }
    }
  },
  computed: {
    showIcon() {
      return this.itemdata.params.showIcon
    },
    padStyle() {
      if (this.itemdata.params?.usePadRowStyle) {
        return this.itemdata.params?.usePadRowStyle
      } else {
        return false
      }
    },
    rowNum() {
      let num = dsf.config.clientType == "mobile" ? Number(this.itemdata.params.mobileRowNumber) || 4 : Number(this.itemdata.params.padRowNumber) || 4
      let row = this.fontMultiple >= 6 ? num - 1 : num
      this.$store.dispatch('applications/setRowNum', row)
      return row
    },
    countNum() {
      if (this.itemdata.params?.showMenuCount) {
        return Number(this.itemdata.params.showMenuCount)
      } else {
        return null
      }
    },
    showType() {
      // 组件配置显示类别
      return this.itemdata.params?.showType
    },
    myMenusName() {
      return this.itemdata.params?.showName || dsf.config.appSelect?.selectName || "我的应用"
    },
    justShowMyMenus() {
      // 是否仅常用应用
      return this.itemdata.params?.justShowMyMenus
    },
    ...mapState({
      storeMainMenu: (state) => state.applications.menus,
      storeMyMenu: (state) => state.applications.myMenus,
    }),
    mainMenu() {
      if (this.showType) {
        return this.storeMainMenu.filter(item => item.name == this.showType)
      } else {
        return this.storeMainMenu
      }
    },
    isHideTitle() {
      return this.mainMenu.length == 1 && dsf.config.appSelect.isHideTitle
    },
    outsideTitle() {
      return !!this.itemdata.params?.outsideTitle
    },
    positionTab() {
      return this.itemdata.params?.positionTab || {}
    },
    offsetTop() {
      return this.positionTab.offsetTop || 0
    },
    isShowEmpty() {
      if(this.mainMenu.length){
        let mainMenuNum = this.mainMenu.reduce((total, item) => total + item.child.length, 0)
        return !this.isShowMyMenus && !this.justShowMyMenus && !mainMenuNum && this.itemdata.params?.isShowEmpty
      } else {
        // 菜单没加载完之前不显示，防止闪烁
        return false
      }
    },
  },
  created() {
    this.getMenu()
  },
  mounted() {
    if (!this.positionTab.alwaysShow) {
      setTimeout(() => {
        $(".menu-tab .van-tabs__wrap").css("display", "none")
      }, 100)
    }
  },
  activated() {
    if (this.isSetUserShortcutDing) {
      this.myMenus = this.storeMyMenu
    } else {
      this.myMenus = dsf.util.loadLocalStore('mySetting')
    }
    this.fontMultiple = dsf.util.loadLocalStore('multiple')
  },
  methods: {
    async getMenu() {
      //获取应用
      await this.getMyMenus()
      // if (!this.justShowMyMenus) this.getAllMenus()
      this.getAllMenus()
    },
    getMyMenus() {
      return new Promise((resolve, reject) => {
        if (this.isSetUserShortcutDing) {
          dsf.http.post("fn/newFile/shortcutDing", { type: "common" }).then(res => {
            let mySettingMenu = []
            this.forFunc(res.data.data, mySettingMenu)
            this.myMenus = mySettingMenu
            this.$store.dispatch('applications/setMyMenus', mySettingMenu)
            resolve()
          })
        } else {
          if (!dsf.util.loadLocalStore("mySetting")) {
            dsf.http.post("fn/newFile/shortcutDing", { type: "common" }).then(res => {
              let mySettingMenu = []
              this.forFunc(res.data.data, mySettingMenu)
              this.myMenus = mySettingMenu
              dsf.util.saveToLocalStore('mySetting', this.myMenus)
              resolve()
            })
          } else {
            this.myMenus = dsf.util.loadLocalStore('mySetting')
            resolve()
          }
        }
      })
    },
    getAllMenus() {
      if (!this.storeMainMenu.length) {
        dsf.http.post("fn/newFile/shortcutDing", {}).then(res => {
          let result = res.data
          let mainMenuNow = []
          // 递归菜单
          let list = result.data.filter(menu => menu.displayPosition.indexOf("work") > -1)
          this.forFunc(list, mainMenuNow)

          // if (this.showType) {
          //   // 配置仅显示一个具体分类
          //   this.mainMenu = mainMenuNow.filter(item => item.name == this.showType)
          // } else {
          // this.mainMenu = mainMenuNow
          this.$store.dispatch('applications/setMenus', mainMenuNow)
          // }
        })
      }
    },
    // 递归处理多级菜单
    forFunc(list, menu) {
      list.forEach(item => {
        if (item.displayPosition.indexOf("work") == -1) return
        let child = this.setMenuItem(item)
        // 对比我的应用和所有应用
        let inMyMenu = this.myMenus.find(item => item.name == child.name)
        if (inMyMenu) {
          inMyMenu.isExist = true // 所有应用中还存在我设置的常用应用，用于处理后台已经将菜单删除的情况
          child.hasMyMenu = true // 该应用已经被设为常用应用
        }
        // child.hasMyMenu = this.myMenus.some(item => item.name == child.name)
        // 是否重复显示我的应用中菜单，不配置isRepeatShow时，在我的应用中的菜单不再显示在普通菜单中
        child.isshow = this.isRepeatShow || !child.hasMyMenu
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
    },
    change(val) {
      if (val.isFixed) {
        this.$refs.tabs.resize()
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/components/applicationCenter/application.scss";
</style>
