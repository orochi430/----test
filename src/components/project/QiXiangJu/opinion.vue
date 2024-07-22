<template>
<div>
  <van-sticky>
    <van-nav-bar title="意见" left-text="返回" left-arrow @click-left="back">
      <template #right>
        <van-popover
          v-model="showPopover"
          trigger="click"
          placement="bottom-end"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference>
            <span>排序</span>
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
  </van-sticky>
  <div class="opinion" v-for="(value,key) in opinionList.formalOpinion" :key="key">
    <div v-if="key != 'timeOrder'">《{{key}}》</div>
    <div class="node" v-for="(item,index) in value" :key="index">
      <div>办理人：{{item.userName}}</div>
      <div>办理时间：{{item.createTime}}</div>
      <div>办理意见：{{item.content}}</div>
      <p style="text-indent: 7em;color:blue">{{item.userName.split('/')[0]}} {{item.createTime.split(' ')[0]}}</p>
    </div>
  </div>
  <div class="opinion" v-if="JSON.stringify(opinionList.buildOpinion) != '{}'">
    <div>《建设性意见》</div>
    <template v-for="(value,key) in opinionList.buildOpinion">
      <div class="node" v-for="(item,index) in value" :key="index">
        <div>办理人：{{item.userName}}</div>
        <div>办理时间：{{item.createTime}}</div>
        <div>办理意见：{{item.content}}</div>
        <p style="text-indent: 7em;color:blue">{{item.userName.split('/')[0]}} {{item.createTime.split(' ')[0]}}</p>
      </div>
    </template>
    
  </div>
</div>
</template>

<script>
export default {
  props: ['show','pk','moduleId'],
  data() {
    return {
      showPopover: false,
      actions: [{ text: '节点排序',value: 'node' },{ text: '时间排序',value:'time' }],
      sortType: 'node',
      order: 'desc',
      opinionList: {}
    }
  },
  created() {
    this.getOpinion()
  },
  methods: {
    onSelect(action) {
      if(action.value == this.sortType) {
        this.order = this.order == 'desc' ? 'asc' : 'desc'
      } else {
        this.sortType = action.value
      }
      this.getOpinion()
    },
    getOpinion() {
      let loading = dsf.layer.loading()
      let moduleId = this.$route.params.moduleId || this.$route.query.moduleId
      let pk = this.$route.params.pk || this.$route.query.pk
      dsf.http.get('fn/mobileTodo/loadBusinessInfo',{
        pk: pk,
        moduleId: moduleId,
        sortType: this.sortType,
        order: this.order
      }).then(res => {
        this.opinionList = res.data.data.opinionList
      }).finally(() => {
        dsf.layer.closeLoading(loading)
      })
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
.opinion {
  background-color: #fff;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  .node {
    padding: 10px 10px 0;
    &:not(:last-child) {
      border-bottom: 1px dashed #ddd;
      padding-bottom: 10px;
    }
  }
}
</style>