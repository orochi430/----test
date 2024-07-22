<template>
<div class="module">
  <div class="top">
    <span class="left"></span>
    <span class="title">{{title}}</span>
    <span class="right" @click="rClick">{{rightText}}</span>
  </div>
  <slot></slot>
</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: '更多'
    }
  },
  data() {
    return {

    }
  },
  methods: {
    rClick() {
      this.$emit('rightClick')
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
      @include background-theme('normal');
    }
    .title {
      flex: 1;
      font-size: var(--font_size_1);
      font-weight: bold;
    }
    .right {
      font-size: 0.26rem;
      color: #666;
    }
  }
}

</style>
