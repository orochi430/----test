<template>
  <div class="applications-page">
    <div class="head">
      <!-- <van-cell title="我的申请" value="申请记录" is-link :to="dsf.config.attendance.applications.listMore" center /> -->
      <van-cell title="我的申请" title-style="font-size: var(--font_size_2)" center />
      <div>
        <van-grid :column-num="dsf.config.attendance.applications.columnNum || 4" :border="false" clickable>
          <van-grid-item v-for="(item, idx) in grids" :key="idx" :text="item.name" :to="item.url">
            <template #icon>
              <img :src="item.icon" alt="" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="list">
      <div class="list-title">
        <van-cell title="异常记录" value="更多" is-link to="attndAbnormalities" center />
      </div>
      <abnormalities />
    </div>
  </div>
</template>

<script>
import abnormalities from "./abnormalities";
export default {
  components: {
    abnormalities
  },
  data() {
    return {
      loading: null,
      grids: dsf.config.attendance.applications.grids
    };
  },
  created() {
    let self = this;
    // self.getRecords();
  },
  mounted() { },
  methods: {
    getRecords() {
      let self = this;
      self.loading = dsf.layer.loading();
      dsf.http
        .get(`fn/attnd/getMyAbnormalRecords`)
        .done(res => {
          if (res.type == "success") {
            self.list = res.data;
          }
        })
        .error(error => {
          console.log("getMyAbnormalRecords-error", error);
          // dsf.layer.toast("数据获取失败！", false);
          // self.errored = true;
        })
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.applications-page {
  .head {
    padding-top: 12px;
    background-color: #fff;
    margin: 16px 16px;
    border-radius: 12px;

    .head-title {
      padding-left: 12px;
      font-weight: bold;
    }

    .van-cell {
      padding: 0px 16px;

      .van-cell__title {
        font-weight: bold;
      }
    }

    .van-grid-item__icon-wrapper {
      img {
        height: 0.8rem;
        width: 0.8rem;
        margin-bottom: 10px;
      }
    }
  }

  .list {
    margin: 16px 16px;
    border-radius: 12px;

    .list-title {
      .van-cell__title {
        font-weight: bold;
      }
    }

    .van-cell {
      padding: 16px 16px;
    }
  }
}
</style>
