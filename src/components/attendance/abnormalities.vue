<template>
  <div class="abnormalities-page">
    <div v-if="list">
      <!-- <div v-if="list.length > 0"> -->
      <div class="content">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!-- <van-cell
              v-for="(item, idx) in showList"
              :key="idx"
              :title="item.title"
              value="申请"
              @click="applyClick(item)"/> -->
            <div class="flex" :class="{ done: item.kqState == 1 }" v-for="(item, idx) in showList" :key="idx">
              <span>{{ item.title }}</span>
              <span @click="applyClick(item)">{{ item.kqState == 1 ? "已申请" : "申请" }}</span>
            </div>
          </van-list></van-pull-refresh>
      </div>
      <!-- </div> -->
      <!-- <commonempty v-else description="暂无数据" /> -->
    </div>
    <commonempty v-else image="error" description="发生错误" />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker :columns="options" :swipe-duration="300" title="请选择你的异常处理单" show-toolbar value-key="name"
        @cancel="showPicker = false" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
export default {
  filters: {
    //时间格式化
    dateFormat: function (val) {
      if (!val) return "";
      return dsf.date.format(new Date(Number(val)), "hh:ii");
    }
  },
  data() {
    return {
      list: [],
      refreshing: false,
      loading: false,
      finished: false,
      showPicker: false,
      page: 1,
      options: dsf.config.attendance.applications.forms
    };
  },
  computed: {
    showList: function () {
      return this.list.map(item => {
        item.title = `${item.state}：${dsf.date.format(
          item.signTime,
          "yyyy-mm-dd hh:ii"
        )}`;
        return item;
      });
    }
  },
  created() {
    let self = this;
    // self.init();
  },
  mounted() { },
  methods: {
    onConfirm(val, idx) {
      let self = this;
      self.showPicker = false;
      // console.log(`当前值: ${val}, 当前索引: ${idx}`);
      // self.$router.push(`/commonForm/${val.id}`);
      self.$router.push(dsf.util.getReplaceUrl(val.url));
    },
    init() {
      let self = this;
      if (self.list.length == 0) {
        self.onLoad();
      }
    },
    onLoad() {
      let self = this;
      if (self.refreshing) {
        self.list = [];
        self.page = 1;
        self.refreshing = false;
      }
      dsf.http
        .post(`fn/attnd/getMyAbnormalRecords`, {
          page: self.page,
          count: 10
        })
        .done(res => {
          if (res.type == "success") {
            self.list.push(...res.data.list);
            self.page++;
            // 数据全部加载完成
            if (self.list.length == res.data.total) {
              self.finished = true;
            }
          } else {
            self.list = null;
          }
        })
        .error(error => {
          self.list = null;
          console.log("getMyAbnormalRecords-error", error);
        })
        .always(() => {
          // dsf.layer.closeLoading(self.loading);
          // 加载状态结束
          self.loading = false;
        });
    },
    onRefresh() {
      let self = this;
      // 清空列表数据
      self.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      self.loading = true;
      self.onLoad();
    },
    applyClick(item) {
      if (item.kqState == 1) {
        return;
      }
      let self = this;
      let formInfo = dsf.config.attendance.applications?.forms?.find(item => item.name == "考勤异常申请");
      if (formInfo) {
        let url = formInfo.url;
        dsf.http
          .get(`fn/itas/leave/findUserExceCount`, { exdate: item.signTime.split(" ")[0] })
          .done(res => {
            if (res.type == "success") {
              if (res.data) {
                self.$router.push(dsf.util.getReplaceUrl(url, item));
              } else {
                dsf.layer.toast("已超过该月申请次数", false);
              }
            } else {
              dsf.layer.toast(res.message, false);
            }
          })
          .error(err => {
            dsf.layer.toast(`发生错误，请稍后重试`, false);
            console.log("findUserExceCount-err", err);
          })
      } else {
        self.showPicker = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.abnormalities-page {
  .content {
    .van-cell {
      padding: 16px 16px;
      /* .van-cell__title {
        flex: auto;
      } */
    }

    /* .van-cell__value {
      color: #3b8ee1;
    } */
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      padding: 15px;
    }

    .flex span:last-child {
      color: #3b8ee1;
    }

    .done span:last-child {
      color: #ccc;
    }
  }
}
</style>
