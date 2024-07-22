<template>
  <div class="card">
    <div :class="['title', showIcon ? 'showIcon' : '', 'flex', 'jb', 'ac']">
      <span>{{ title }}</span>
      <span class="right flex ac" @click="toSet()">
        <van-icon name="setting-o" />
      </span>
    </div>
    <div class="dsf-list" v-if="menu.length > 0">
      <application-item :rowNum="rowNum" :key="subIndex" v-for="(subItem, subIndex) in menu" :data="subItem" v-if="subItem.isshow"></application-item>
    </div>
    <div class="noApp" @click="toSet()" v-else>
      请增加应用
      <span>+</span>
    </div>
  </div>
</template>

<script>
import applicationItem from "./applicationItem"
export default {
  components: {
    applicationItem
  },
  props: {
    title: {
      type: String,
      default: "我的应用"
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    menu: {
      type: Array,
      default: () => {
        return []
      }
    },
    countNum:{
      type: Number||null,
      default: null
    },
    rowNum: {
      type: Number,
      default:4
    },
  },
  data() {
    return {}
  },
  created(){
   console.log('this.countNum: ', this.countNum);
  },
  methods: {
    toSet() {
      this.$router.push({
        path: `/myMenuSetting${this.countNum?'?num='+this.countNum:''}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./application.scss";
</style>
