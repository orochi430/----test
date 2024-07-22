<template>
<div class="module">
  <div class="top">
    <span v-for="(item, index) in title" :key="index" @click="tabClick(item)" :class="['tab', {active: activeTab == item.title}]">
      <span class="left"></span>
      <span class="title">{{item.title}}</span>
    </span>
    <span class="right" @click="rClick">{{rightText}}</span>
  </div>
  <slot></slot>
</div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default:() => {[]}
    },
    rightText: {
      type: String,
      default: '更多'
    }
  },
  data() {
    return {
      activeTab: '',
      activeType: ''
    }
  },
  watch: {
    title: {
      handler(newVal) {
        this.activeTab = newVal[newVal.length -1].title
        this.activeType = newVal[newVal.length -1].type
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    tabClick(tab) {
      this.activeTab = tab.title
      this.activeType = tab.type
      this.$emit('tabClick', this.activeType)
    },
    rClick() {
      this.$emit('rightClick', this.activeType)
    }
  }
}
</script>
<style lang='scss' scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.module {
  // padding: 0 0.32rem;
  margin-top: 0.2rem;
  background-color: #fff;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.32rem;
    position: relative;
    .left {
      display: inline-block;
      width: 0.1rem;
      height: 0.38rem;
      margin-right: 0.1rem;
      background-color: #999;
      vertical-align: text-bottom;
    }
    .title {
      // flex: 1;
      font-size: var(--font_size_1);
      padding-right: 20px;
    }
    .active {
      .left {
        @include background-theme('normal');
      }
      .title {
        @include font-theme('normal');
        font-weight: bold;
      }
    }
    .right {
      font-size: 0.26rem;
      color: #666;
      flex: 1;
      text-align: right;
    }
  }
}

</style>
