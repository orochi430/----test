<template>
<!-- 督办管理 -->
  <div class="inspector-list">
    <!-- <div class="_search"> -->
      <!-- <van-search v-model="keyword" sticky :show-action="true" placeholder="搜索" @search="onSearch"> -->
        <!-- <template #action>
          <van-icon name="wap-nav" @click="show = true" />
        </template> -->
      <!-- </van-search> -->
    <!-- </div> -->
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <van-list :finished="finished" :finished-text="data.length ? finishedTips : ''" v-model="loading" :offset="10" @load="onLoad">
        <DsList :type="tab" :data="data" :columns="columns" @mainClick="handleActionClick" @commonClick="handleActionClick">
          <template v-slot:item-extend="slotProps">
            <div class="progress-wrap">
              <!-- <van-progress :percentage="getPercent(slotProps)" style="overflow-x:hidden;" :color="getColor(slotProps)" :show-pivot="false" stroke-width="10" class="_progress" />
              <span v-if="getPercent" class="process-text">{{ getPercent(slotProps) }} %</span> -->
            </div>
          </template>
        </DsList>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import DsList from "@/components/documentCenter/DsList";
import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";
export default {
  name: "InspectorList",
  components: {
    DsList
  },
  mixins: [ButtonActions],
  data() {
    return {
      finished: false,
      loading: false,
      isLoading: false,
      finishedTips: "",
      searchValue: "",
      formMethod:"info",
      listData: [
        {
          dataValue: {
            bt: "已按要求做好相关工作,请毅松、志强、联姘同志阅示",
            wj: "文件种类",
            zt: "进行中",
            bjrq: "5天",
            progress: "progressprogress",
            status: "going"
          },
          buttons: {
            commonButton: [
              {
                icon: "iconguanzhu",
                action: "gz",
                name: "关注"
              },
              {
                icon: "iconzhiding",
                action: "zd",
                name: "置顶"
              },
              {
                icon: "iconshijian",
                action: "yqcl",
                name: "延期处理"
              }
            ],
            mainButtons: [
              {
                action: "bj",
                name: "办结"
              },
              {
                action: "fk",
                name: "反馈"
              }
            ]
          }
        },
        {
          dataValue: {
            bt: "已按要求做好相关工作,请毅松、志强、联姘同志阅示",
            wj: "文件种类",
            zt: "进行中",
            bjrq: "5天",
            progress: "progressprogress",
            status: "finish"
          },
          buttons: {
            commonButton: [
              {
                icon: "iconguanzhu",
                action: "gz",
                name: "关注"
              },
              {
                icon: "iconzhiding",
                action: "zd",
                name: "置顶"
              },
              {
                icon: "iconshijian",
                action: "yqcl",
                name: "延期处理"
              }
            ],
            mainButtons: [
              {
                action: "bj",
                name: "办结"
              },
              {
                action: "fk",
                name: "反馈"
              }
            ]
          }
        }
      ],
      columns: [
        {
          showCategory: "mainTitle",
          showMetaColumn: "bt"
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "wj",
          icon: "iconwenjianleixing"
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "zt",
          icon: "iconzhuangtai",
          color: ""
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "bjrq",
          icon: "iconriqi",
          color: ""
        }
      ],
      colorStyle: ["#F66C6C", "#67C23B"],
      data: [],
      tab: "db",
      start: 1,
      searchPararms: {
        page: 1,
        limit: 15,
        content: ""
      },
      keyword:""
    };
  },
  mounted() {
    // this.fetchData();
  },
  methods: {
    onSearch(){
      this.onRefresh();
    },
    getPercent({ item }) {
      const target = item.dataValue || {};
      const str = target.process || "";
      return parseInt(str.replace("%", ""), 10) || 0;
    },
    getColor({ item }) {
      const target = item.dataValue || {};
      const bjrq = new Date(target.bjrq).getTime();
      const cd = new Date().getTime();
      return bjrq > cd ? "#F66C6C" : "#67C23B";
    },
    fetchData() {
      this.loading = true;
      dsf.http
        .post("fn/supervise/approval/getSuperviceList", {
          start: this.start,
          page: this.start,
          key: this.keyword,
          limit: 15,
          fileType: "db"
        })
        .then(({ status, data }) => {
          const { showColumn, datas = [], listButtons, total } = data;
          if (status === 200) {
            this.start += 1;
            this.data = [...this.data, ...datas];
            this.columns = showColumn || [];
            this.listButtons = listButtons || {};
            if (
              datas == null ||
              this.data.length === total ||
              datas.length === 0 ||
              datas.length < 15
            ) {
              // 加载结束
              this.finished = true;
            }
            if (datas.length < this.start) {
              if (datas == null || datas.length === 0) {
                if (this.start === 0) {
                  this.finishedTips = "暂无数据";
                } else {
                  this.finishedTips = "没有更多了";
                }
              } else {
                this.finishedTips = "没有更多了";
              }
            }
          } else {
            this.dsf.layer.toast(message);
            this.finished = true;
            this.finishedTips = message;
          }
        })
        .catch(({ message }) => {
          this.finished = true;
          this.dsf.layer.toast(message);
          this.finishedTips = message;
        })
        .finally(() => {
          this.loading = false;
          this.isLoading = false;
        });
    },
    // 按钮
    handleActionClick(action, item, index) {
      if (action == "doBanQingKuang") {
        this.$router.push({
          name: "InspectorCondition",
          params: {
            data: item
          }
        });
      } else {
        const action = arguments[0];
        const fn = this[`action-${action}`] || function () { };
        fn(...Array.prototype.slice.call(arguments, 1));
      }
    },
    onLoad() {
      /**
       * 上拉加载
       */
      this.fetchData();
    },
    /**
     * 下拉刷新
     */
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.data = [];
      this.start = 1;
      this.fetchData();
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';
::v-deep.inspector-list {
  display: flex;
  flex-direction: column;
  ._search {
    height: 54px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    ._input {
      width: 345px;
      height: 28px;
      background: #ecedee;
      border-radius: 13px;
      @include font_6(true);
      padding: 6px;
    }
    .iconsousuo {
      color: #999;
    }
  }
  ._progress {
    width: 227px;
  }
  ._search {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;

    .search {
      height: 28px;
      width: 100%;
      display: block;
      background: #ecedee;
      border-radius: 7px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 5px;
      box-sizing: border-box;
      color: $fontColor_sub;
      @include font_6;

      .i1,
      .i2 {
        flex-basis: 20px;
      }

      span {
        display: block;
        flex-basis: calc(100% - 60px);
      }
    }
  }
  .progress-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @include font_5;
    ._progress {
      margin-right: 15px;
    }
  }
}
</style>
