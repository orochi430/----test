<template>
  <div class="controlOpinionView opinionBox">
    <div class="opinionContent">处长审核：
      <span v-if="chuzhang.opinionContent">{{ chuzhang.opinionContent }}<br/></span>
      <span :class="{name: chuzhang.opinionContent}">{{chuzhang.userName}} {{chuzhang.time}}</span>
    </div>
    <div class="opinionContent">核稿：
      <span v-if="hegao.opinionContent">{{ hegao.opinionContent }}<br/></span>
      <span :class="{name: hegao.opinionContent}">{{ hegao.userName }} {{ hegao.time }}</span>
    </div>
    <div class="opinionContent">拟稿：
      <span v-if="nigao.opinionContent">{{ nigao.opinionContent }}<br/></span>
      <span :class="{name: nigao.opinionContent}">{{nigao.userName}} {{nigao.time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["metaData"],
  data() {
    return {
    }
  },
  computed: {
    nigao() { // 拟稿
      let obj = this.metaData.extra.list?.find(item => item.nodeId == 'lldjwUqlqHlnyDE') || {}
      return obj
    },
    chuzhang() { // 处长审核
      let obj = this.metaData.extra.list?.find(item => item.nodeId == 'E8b9eqOTlq9yiUr') || {}
      return obj
    },
    fuchuzhang() { // 副处长审核
      let obj = this.metaData.extra.list?.find(item => item.nodeId == 'J7S7CjOVWTksFCt') || {}
      return obj
    },
    hegao() { // 核稿：有副处长取副处长，否则去处长
      return this.fuchuzhang.userName ? this.fuchuzhang : this.chuzhang
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.opinionBox {
  position: relative;
  color: #333;
  .opinionContent {
    padding: 3px 0;
    overflow: hidden;
  }
  .name {
    float: right;
  }
}
</style>
