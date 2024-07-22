<template>
  <div class="index-page">
    <div class="content">
      <component v-if="tabs" :is="tabs[active].comp" :tabKey="tabs[active].tabKey"></component>
    </div>

    <div class="navi">
      <van-tabbar v-model="active">
        <van-tabbar-item v-if="tabs" v-for="(item, idx) in tabs" :key="idx">
          <span>{{ item.name }}</span>
          <template #icon>
            <i :class="['iconfont', item.icon]"></i>
          </template>
        </van-tabbar-item>
        <!-- <van-tabbar-item icon="setting-o">考勤设置</van-tabbar-item> -->
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import signIn from "./signIn";
import summaries from "./summary";
import summaryTab from "./summaryTab";
import commonTabs from "@/components/common/commonTabs";
export default {
  components: {
    signIn,
    summaries,
    summaryTab,
    commonTabs
  },
  data() {
    return {
      active: 0,
      tabs: dsf.config.attendance?.tabBars
    };
  },
  created() {
    let self = this;
    if (!self.tabs) { dsf.layer.toast("请检查考勤相关配置！", false); return; }
    self.getMyGroup();
  },
  mounted() { },
  methods: {
    getMyGroup() {
      let self = this;
      dsf.http
        .get(`fn/attnd/getMyGroup`)
        .done(res => {
          if (res.type == "success") {
            if (res.data.isAdmin) {
              // 组管理员显示个人+部门统计
              let tab = self.tabs.find(item => item.comp == "summaries");
              if (tab) tab.comp = "summaryTab";
            }
          }
        })
        .error(error => {
          console.log("getMyGroup-error", error);
          // dsf.layer.toast("数据获取失败！", false);
          // self.errored = true;
        })
        .always(() => {
          // dsf.layer.closeLoading(self.loading);
        });
    }
  },
  filters: {
    //时间格式化
    dateFormat: function (val) {
      if (!val) return "";
      return dsf.date.format(new Date(Number(val)), "hh:ii");
    }
  }
};
</script>

<style lang="scss" scoped>
.index-page {
  .content {}

  .navi {
    height: 1rem;

    // .van-tabbar-item .iconfont {
    //   font-size: 0.5rem;
    // }
    .van-tabbar-item {
      .iconfont {
        font-size: 0.5rem !important;
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
