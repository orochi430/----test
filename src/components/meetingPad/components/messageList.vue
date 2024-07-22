<template>
  <div class="message-list-wrapper">
    <div v-for="(item,i) in lists" :key="i" :class="{read:item.isRead}" class="list" @click="messageClick(item)">
      <div class="message-desc">{{ item.title }}</div>
      <div class="message-sender">{{ item.sender }}</div>
      <div class="message-time">
        <span v-if="item.time">{{ item.time }} </span>
        <van-icon name="arrow" /></div>
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
    },
    type:{
      type: String,
      default:''
    }
  },
  data(){
    return {
      messageClick(item){
        this.$emit("updatamessage",item)
        if(this.type !== 'publish'){
           dsf.http
            .post(`fn/conferenceMessage/read`, {
              pk: item.id,
            })
            .done(result => {
              if (result.code==='200') {
                item.isRead = true
                console.log("已读")
              }
            })
            .error(error => {
              console.log("error", error);
            })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.message-list-wrapper {
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
      .message-desc {
        color: #999;
      }
      .message-sender {
        color: #999;
      }
      .message-time {
        color: #999;
      }
    }
    
    .message-desc {
      flex: 1;
      font-size: 40px;
      color: #333333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-right: 40px;
    }
    .message-sender {
      font-size: 40px;
      color: #666666;
    }

    .message-time {
      font-size: 40px;
      color: #666666;
      margin-left: 60px;

      ::v-deep .van-icon-arrow {
        margin-left: 44px;
      }
    }
  }
}
</style>
