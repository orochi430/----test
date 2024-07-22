<template>
  <div>
    <van-tabs v-model="headTab" title-active-color="#333333!important" title-inactive-color="#666666">
      <van-tab title="全文搜索">全文搜索</van-tab>
      <van-tab title="筛选">
        <search-filter />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import searchFilter from "./searchFilter";
export default {
  name: "TodoFile",
  components: {
    searchFilter
  },
  data() {
    return {
      headTab: 0
    };
  },
  mounted() { },
  methods: {}
};
</script>

<style scoped lang="scss">
</style>
