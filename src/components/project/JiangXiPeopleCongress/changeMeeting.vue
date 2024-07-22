<template>
  <div class="page-changeMeeting">
    <div class="container">
      <div class="title">切换会议</div>
      <van-search v-model="keyword" placeholder="请输入搜索关键词" />
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="level"
          title="会议级别"
          :options="levelOpts"
          @change="levelChange"
        />
        <van-dropdown-item
          v-model="status"
          title="会议状态"
          :options="statusOpts"
          @change="statusChange"
        />
      </van-dropdown-menu>
      <van-divider />
      <van-radio-group v-model="result">
        <van-radio
          :name="item.id"
          v-for="(item, idx) in onSearch(keyword)"
          :key="idx"
        >
          <template #default>
            <van-cell :title="item.title">
              <template #default>
                <span class="status-text" :class="statusColor(item.status)">{{
                  item.statusText
                }}</span>
              </template>
            </van-cell>
          </template>
        </van-radio>
      </van-radio-group>
      <div class="btn-box">
        <van-button type="default" @click="back">取消</van-button>
        <van-button class="btn-sure" type="info" @click="go">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// import store from "@/common/util";
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    levelOpts: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      keyword: "",
      result: undefined,
      level: "-1",
      status: "-1",
      statusOpts: [
        { text: "全部", value: "-1" },
        { text: "未开始", value: "2" },
        { text: "进行中", value: "1" },
        { text: "已结束", value: "0" }
      ],
      showList: []
    };
  },
  computed: {
    statusColor: function() {
      return val => {
        let className = "";
        if (val == "2") className = "status-next";
        if (val == "1") className = "status-now";
        if (val == "0") className = "status-end";
        return className;
      };
    }
  },
  created() {
    let self = this;
    self.showList = self.list;
  },
  mounted() {
    let self = this;
  },
  methods: {
    levelChange(val) {
      let self = this;
      self.showList = self.list;
      self.showList = self.showList.filter(
        item =>
          (self.level == "-1" || item.level == val) &&
          (self.status == "-1" || item.status == self.status)
      );
    },
    statusChange(val) {
      let self = this;
      self.showList = self.list;
      self.showList = self.showList.filter(
        item =>
          (self.status == "-1" || item.status == val) &&
          (self.level == "-1" || item.level == self.level)
      );
    },
    go() {
      this.$emit("go", this.result);
    },
    back() {
      this.$emit("close", false);
    },
    onSearch(keyword) {
      // 检索
      return this.showList.filter(item => item.title.includes(keyword));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.page-changeMeeting {
  .container {
    .van-search {
      padding: 0 0.24rem;
    }
    .title {
      text-align: center;
      font-size: var(--font_size_2);
      padding: 1em 0 1em 0;
    }
    .van-dropdown-menu {
      // margin-bottom: 0.5em;
      ::v-deep .van-dropdown-menu__bar {
        box-shadow: none;
      }
    }
    .van-divider {
      margin: 0;
    }
    .van-radio-group {
      max-height: 60vh;
      min-height: 12vh;
      overflow: auto;
      .van-radio {
        justify-content: space-between;
        ::v-deep .van-radio__icon {
          margin-left: 8px;
        }
        ::v-deep .van-radio__label {
          width: 100%;
          .van-cell {
            padding: 12px 0;
            .van-cell__title {
              flex: 4;
            }
            .van-cell__value {
              text-align: left;
              .status-text {
                border-radius: 4px;
                font-size: 0.2rem;
                padding: 2px;
              }
              .status-next {
                background-color: rgba(0, 111, 255, 0.1);
                color: #006fff;
              }
              .status-now {
                background: rgba(82, 196, 26, 0.1);
                color: #52c41a;
              }
              .status-end {
                background: #f5f5f5;
                color: #666666;
              }
            }
          }
        }
      }
    }
    .btn-box {
      margin: 1em 0;
      display: flex;
      justify-content: space-evenly;
      .btn-sure {
        width: 60vw;
      }
    }
  }
}
</style>
