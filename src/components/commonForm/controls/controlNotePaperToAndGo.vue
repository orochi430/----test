<template>
<div>
  <div v-for="(hiy, index) in historyMsg" :key="index" class="historyItem">
    <div class="line">
      <span>发件人：{{ hiy.sendUserName }}</span>
    </div>
    <div class="line">
      <span>发送时间：{{ hiy.sendTime }}</span>
    </div>
    <div class="line">
      <span>主题：{{ hiy.bt }}</span>
    </div>
    <div class="line">
      <span>内容：<span v-html="hiy.content"></span></span>
    </div>
    <div v-if="hiy.attachInfos && hiy.attachInfos.length > 0" class="line">
      <span>附件：<span v-for="(fj, index) in hiy.attachInfos" :key="index" @click="openFile(fj)">{{
              fj.showName
      }}</span></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      historyMsg: []
    }
  },
  created() {
    this.getHistoryMsg()
  },
  methods: {
    //获取往来便签
    getHistoryMsg() {
      const params = {
          moduleId: this.$route.params.moduleId,
          pk: this.$route.params.pk || this.$route.query.forwardIds || this.$route.query.replyId
      }
      dsf.http.post("fn/mobileNote/getToAndGo", params).then((data) => {
          this.historyMsg = data.data.data
      })
    },
  }
}
</script>
<style lang='scss' scoped>
.historyItem {
    padding: 10px 0.3rem;
    box-shadow: 0 0 5px gainsboro;
    border-radius: 5px;
    margin-bottom: 0.3rem;
}

.line {
    font-size: var(--font_size_0);

    span {
        font-size: var(--font_size_3);
        color: #666;
    }
}
</style>
