<template>
<div>
  <van-nav-bar title="新闻列表" v-if="$route.query.showHeader == 1" left-text="返回" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finishedTips"
      @load="onLoad"
    >
      <template v-if="list.length > 0">
        <news-Item v-for="item in list" :key="item.id" :news="item"></news-Item>
      </template>
      <commonempty v-if="!list.length && !loading" />
    </van-list>
  </van-pull-refresh>
</div>
</template>

<script>
import newsItem from './components/newsItem'
export default {
  components: {newsItem},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      finishedTips: '',
      page: 1
    };
  },
  methods: {
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      dsf.http.post('fn/news/list', {
        type: this.$route.query.type,
        page: this.page,
        limit: 15
      }).then(res => {
        if(res.data.code == 200) {
          this.page += 1
          this.list.push(...res.data.data)
          if(this.list.length == res.data.total) {
            this.finished = true;
            this.finishedTips = "没有更多了";
          }
        } else {
          this.finished = true;
          this.finishedTips = "没有更多了";
        }
      }).catch(({
        message
      }) => {
        this.finished = true;
      })
      .finally(() => {
        this.loading = false;
      });
      
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.list = [];
      this.page = 1
      this.onLoad();
    },
  },
}
</script>
<style lang='scss' scoped>
</style>