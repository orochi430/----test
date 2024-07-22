<template>
  <div class="index-page">
    <div class="content">
      <van-tabs v-model="active" sticky>
        <van-tab title="个人统计">
            <summaries :calc-type="0"></summaries>
        </van-tab>
        <van-tab title="考勤组统计">
            <summaries :calc-type="1"></summaries>
        </van-tab>
    </van-tabs>
    </div>

  </div>
</template>

<script>
import summaries from "./summary";
export default {
  components: {
    summaries
  },
  data() {
    return {
      active: 0
    };
  },
  created() {
    let self = this;
  },
  mounted() {},
  methods: {},
  filters: {
    //时间格式化
    dateFormat: function(val) {
      if (!val) return "";
      return dsf.date.format(new Date(Number(val)), "hh:ii");
    }
  }
};
</script>

<style lang="scss" scoped>
.index-page {
  .navi {
    // .van-tabbar-item .iconfont {
    //   font-size: 0.5rem;
    // }
    .van-tabbar-item {
      .iconfont {
        font-size: 0.5rem!important;
      }
      ::v-deep .van-tabbar-item__icon {
        font-size: 0.5rem;
      }
      ::v-deep .van-tabbar-item__text {
        font-size: var(--font_size_4);
      }
    }
  }
}
</style>
