<template>
<div v-if="title">
  <div class="top">
    <div class="title">{{title}}</div>
    <div class="docNum">{{docNum}}</div>
    <div class="createTime">{{createTime.split(' ')[0]}}</div>
  </div>
  <div class="content">
    <p v-for="(item, index) in content" :key="index"><span v-html="item"></span></p>
    <commonempty v-if="content.length == 0" description="暂无内容" />
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      docNum: '',
      createTime: '',
      content: [],
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      let moduleId = this.$route.params.moduleId
      let pk = this.$route.params.pk
      dsf.http.get('fn/mobileTodo/loadBusinessInfo',{
        pk: pk,
        moduleId: moduleId
      }).then(res => {
        this.title = res.data.data.title
        this.docNum = res.data.data.docNum
        this.createTime = res.data.data.createTime
        this.content = res.data.data.content || []
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.top{
  background-color: #236061;
  color: #fff;
  padding: 16px;
  .title{
    font-size: 26px;
  }
  .docNum,.createTime {
    font-size: var(--font_size_3);
    padding-top: 6px;
  }
}
.content {
  padding: 16px;
  font-size: 21px;
  margin-bottom: 1.2rem;
  // p {
  //   text-indent: 2em;
  // }
}
</style>