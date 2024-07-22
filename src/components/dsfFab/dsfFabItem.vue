<template>
<div class="dsf-fab-item" @click="clickItem(fabItem)">
  <i class="iconfont" :class="fabItem.icon"></i>
  <span>{{title}}</span>
</div>
</template>

<script>
export default {
  props: {
    fabItem: {
      type: Object,
      default: () => {}
    },
    titleKey: {
      type: String,
      default: 'title'
    }
  },
  data() {
    return {
     
    }
  },
  computed: {
    title() {
      return this.fabItem.title ? this.fabItem.title : this.fabItem[this.titleKey]
    }
  },
  methods: {
    clickItem(fabItem){
      if(fabItem.type == 'go') {
        fabItem.url ? this.$router.push({path: fabItem.url}) : dsf.layer.toast('未传入跳转地址')
      } else {
        this.$emit('clickItem', fabItem)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';
.dsf-fab-item {
  .iconfont {
    @include font-theme('normal');
    padding-right: 6px;
  }
  padding-bottom: 20px;
  &:last-child{
    padding-bottom: 0;
  }
}
</style>