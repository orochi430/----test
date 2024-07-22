<template>
  <div class="card" v-if="isShowCard">
    <div :class="['title', showIcon ? 'showIcon' : '', 'flex', 'jb', 'ac']" v-if="!isHideTitle">
      <span>{{ menu.name }}</span>
      <span v-if="isMaxRowsMenu&&!isShowComponent" @click="collapse()" class="maxRowsMenu">
        {{ showMoreMenu ? "展开" : "收缩" }}
        <van-icon style="margin-left: 5px" :name="showMoreMenu ? 'arrow-down' : 'arrow-up'" />
      </span>
    </div>
    <component :is="menu.props.components" :menu="menu" v-if="isShowCard&&isShowComponent"></component>
    <div v-else>
      <div class="dsf-list" :style="{ marginTop: isHideTitle ? '0.3rem' : 0 }">
        <application-item :rowNum="rowNum" :key="subIndex" v-for="(subItem, subIndex) in alwaysShowChildren" :data="subItem"
          v-if="subItem.isshow" :padStyle="padStyle"></application-item>
      </div>
      <collapseTransition v-if="isMaxRowsMenu">
        <div class="dsf-list" style="display: flex" v-show="!showMoreMenu"
          :style="{ marginTop: isHideTitle ? '0.3rem' : 0, paddingTop: '0.1rem' }">
          <application-item :rowNum="rowNum" :key="subIndex" v-for="(subItem, subIndex) in collapseChildren" :data="subItem"
            v-if="subItem.isshow" :padStyle="padStyle"></application-item>
        </div>
      </collapseTransition>
    </div>
  </div>
</template>

<script>
import collapseTransition from "@/components/project/platform/conference/components/collapseTransition.jsx"
import applicationItem from "./applicationItem"
import Vue from "vue";
export default {
  components: {
    applicationItem,
    collapseTransition
  },
  props: {
    menu: {
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
    showIcon: {
      type: Boolean,
      default: true
    },
    isHideTitle: {
      type: Boolean,
      default: false
    },
    maxRows: {
      type: Number
    },
    rowNum: {
      type: Number,
      default: 4
    },
    padStyle:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showMoreMenu: false,
      isMaxRowsMenu: false
    }
  },
  computed: {
    isShowCard() {
      return this.menu.child.some(item => item.isshow)
    },
    isShowComponent() {
      return this.menu.props != ""&&this.menu.props["components"]!=""
    },
    alwaysShowChildren() {
      let length = this.maxRows ? this.maxRows * this.rowNum : this.menu.child.length
      return this.menu.child.filter(item => item.isshow).slice(0, length)
    },
    collapseChildren() {
      let length = this.maxRows ? this.maxRows * this.rowNum : this.menu.child.length
      return this.menu.child.filter(item => item.isshow).slice(length)
    }
  },
  beforeCreate() {
    // 处理首字母大写 abc => Abc
    function changeStr(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const requireComponent = require.context('./controls', false, /\.vue$/)
    requireComponent.keys().forEach(fileName => {
      const config = requireComponent(fileName)
      const componentName = changeStr(
        fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')   // ./child1.vue => child1
      )
      Vue.component(componentName, config.default || config) // 动态注册该目录下的所有.vue文件
    })

  },
  created() {
    if (this.maxRows) {
      let showMaxRowsMenu = this.menu.child.filter(subItem => {
        return subItem.isshow
      })
      if (showMaxRowsMenu.length > this.rowNum * this.maxRows) {
        this.showMoreMenu = true
        this.isMaxRowsMenu = true
      }
    }
  },
  mounted() {
  },
  methods: {
    // 折叠
    collapse() {
      this.showMoreMenu = !this.showMoreMenu
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./application.scss";
</style>
