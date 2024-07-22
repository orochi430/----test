<template>
  <div class="notice-list-wrapper">
    <div v-for="(item,i) in lists" :key="i" :class="{read:item.isRead}" class="list" @click="noticeClick(item)">
      <div class="notice-desc">{{ item.title }}</div>
      <div class="notice-time">{{ item.time }} <van-icon name="arrow" /></div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    lists:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      noticeClick(item){
        this.$emit("updataNotice",item)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.notice-list-wrapper {
  height: 100%;
  overflow: auto;
  .list {
    height: 200px;
    line-height: 200px;
    display: flex;
    border-bottom: 1px solid #E5E5E5;
    align-items: center;
    padding: 0 32px;

    &.read {
      .notice-desc {
        color: #999;
      }
      .notice-time {
        color: #999;
      }
    }
    
    .notice-desc {
      flex: 1;
      font-size: 40px;
      color: #333333;
    }

    .notice-time {
      font-size: 40px;
      color: #666666;

      ::v-deep .van-icon-arrow {
        margin-left: 44px;
      }
    }
  }
}
</style>
