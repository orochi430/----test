<template>
<div>
  <van-sticky>
    <van-nav-bar title="流程记录" left-text="返回" left-arrow @click-left="back">
    </van-nav-bar>
  </van-sticky>
  <div class="flow" v-for="(item,index) in flowList" :key="item.id">
    <div class="time">
      <div>{{item.rDate.substring(0,10)}}</div>
      <div>{{item.rDate.substring(11)}}</div>
      <van-icon name="clock-o" size="0.32rem"/>
    </div>
    <div class="node">
      <div>{{item.userName}}{{item.orgNameLv2 ? `/${item.orgNameLv2}`:''}}/{{item.orgNameLv1}}</div>
      <div>节点名称：{{item.nodeName}}</div>
      <div v-if="index > 0">来自：{{flowList[index-1].userName}}{{flowList[index-1].orgNameLv2 ? `/${flowList[index-1].orgNameLv2}`:''}}/{{flowList[index-1].orgNameLv1}}</div>
      <div style="text-align: right"><van-icon name="edit" />{{item.handleTime}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['show','pk'],
  data() {
    return {
      flowList: []
    }
  },
  created() {
    this.getFlow()
  },
  methods: {
    getFlow() {
      dsf.flow.getWorkFlowNodes({
        param: {
          infoId: this.$route.params.pk || this.$route.query.pk,
          showStage: 0
        },
        thenFun: (res,data) => {
          this.flowList = data.passedNodes || [];
        },
        hasLoader: true
      });
    },
    back() {
      if(this.show!=undefined) {
        this.$emit('update:show', false);
      } else{
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import 'src/assets/styles/themes.scss';
@import 'src/assets/styles/mixin.scss';
.flow {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid;
  @include border-bottom-theme("normal");
  .time{
    width: 25%;
    position: relative;
    text-align: center;
    .van-icon{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(50%,-50%);
      @include font-theme("normal");
    }
  }
  .node{
    flex: 1;
    padding: 16px 6px 6px 16px;
    border-left: 1px solid #ddd;
    >div{
      line-height: 22px;
    }
  }
}
</style>