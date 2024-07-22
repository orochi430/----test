<template>
  <div class="people-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="data-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell center title value-class="name-class" title-class="name-class">
          <template #icon>
            <van-image round width="48px" height="48px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </template>
          <template #default>张三</template>
          <template #title>左侧标题</template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  name: "PeopleList",
  props: {
    tabParams: {
      type: String,
      default: "参会人员"
    }
  },
  data: function() {
    return {
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  created() {
    console.log(this.tabParams);
  },
  mounted() {},
  methods: {
    onLoad() {},
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>

<style>
</style>