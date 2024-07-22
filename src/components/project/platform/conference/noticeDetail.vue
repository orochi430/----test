<template>
<div class="contanier" :style="{minHeight: `calc(100vh - 0.32rem - ${$store.state.isShowAppHeader ? '0.92rem' : '0px'})`}">
  <div class="title">{{title}}</div>
  <div class="sub flex jb">
    <span>发布者：{{publisher}}</span>
    <span>发表时间：{{time}}</span>
  </div>
  <div v-html="content"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      publisher: '',
      time: '',
      loading: null
    }
  },
  created() {
    this.loading = dsf.layer.loading()
    this.getInfo()
  },
  methods: {
    getInfo() {
      dsf.http.get('fn/xform/getInfo', {
        moduleId: this.$route.query.moduleId,
        pk: this.$route.query.pk,
        fid: this.$route.query.fid,
        method: 'check',
        listId: `220805151958YDvJC1dKNborQu59aYL`
      }).then(res => {
        console.log(res)
        this.title = res.data.data.main['B0001'].value
        this.content = res.data.data.main['C-HWXT-HYXX-0001'].value
        this.publisher = res.data.data.main['A0011'].value
        this.time = res.data.data.main['C-HWXT-HYXX-0007'].value
      }).always(() => {
        dsf.layer.closeLoading(this.loading)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.contanier {
  background-color: #fff;
  padding: 20px;
  margin-top: 16px;
  .title {
    font-size: var(--font_size_2);
    padding-bottom: 16px;
  }
  .sub {
    font-size: 13px;
    color: #666;
    padding-bottom: 16px;
  }
}
</style>