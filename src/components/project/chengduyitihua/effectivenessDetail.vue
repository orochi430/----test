<template>
  <div class="effectivenessDetail" :style="{ height: isShowAppHeader ? 'calc(100vh - 0.92rem)' : '100vh' }">
    <div class="top">
      <div class="main">
        <div class="item">
          <div class="num">{{ topData.number }}</div>
          <div class="gray">累计流转（次）</div>
        </div>
        <div class="item">
          <div class="num">{{ topData.cycle }}</div>
          <div class="gray">流转周期（小时）</div>
        </div>
        <div class="item">
          <div class="num">{{ topData.avg }}</div>
          <div class="gray">平均耗时（小时）</div>
        </div>
        <div class="item">
          <div class="num">{{ topData.max }}</div>
          <div class="gray">最长耗时（小时）</div>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <div class="tab">
      <div class="title">
        <div class="">
          <span class="blue"></span>
          <span class="yellow"></span>
          <span class="bold">耗时明细</span>
        </div>
      </div>
      <van-tabs v-model="active" @change="change">
        <van-tab :title="item.title" v-for="item in formTabs" :key="item.id">
          <div class="list" v-if="item.data.length != 0">
            <div class="table">
              <div class="gray">序号</div>
              <div class="gray">姓名</div>
              <div class="gray">耗时</div>
              <div class="gray fll">处理环节</div>
            </div>
            <div class="box">
              <div class="list_item" v-for="data in item.data" :key="data.id">
                <div class="gray">{{ data.id }}</div>
                <div class="gray">{{ data.name }}</div>
                <div class="gray">{{ data.timer }}分钟</div>
                <div class="fll elps">{{ data.content }}</div>
              </div>
            </div>
          </div>
          <commonempty v-else description="暂无数据"></commonempty>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dsf from "../../../common";
export default {
  name: "effectivenessDetail",

  props: [],

  components: {},

  data() {
    return {
      topData: {
        number: "",
        avg: "",
        max: "",
        cycle: "",
      },
      active: 0,
      pk: "",
      formTabs: [
        {
          id: 0,
          title: "我的耗时",
          data: [
            // {
            //   id: 1,
            //   name: "张山",
            //   timer: 4,
            //   content: "dwdwaff",
            // },
            // {
            //   id: 2,
            //   name: "李四",
            //   timer: 7,
            //   content: "dwdwaff",
            // },
            // {
            //   id: 3,
            //   name: "王五",
            //   timer: 5,
            //   content: "dwdwaff",
            // },
            // {
            //   id: 4,
            //   name: "王五",
            //   timer: 5,
            //   content: "dwdwaff",
            // },
            // {
            //   id: 5,
            //   name: "王五",
            //   timer: 5,
            //   content: "dwdwaff",
            // },
            // {
            //   id: 6,
            //   name: "王五",
            //   timer: 5,
            //   content: "dwdwaff",
            // },
            // {
            //   id: 7,
            //   name: "王五",
            //   timer: 5,
            //   content: "dwdwaff",
            // },
          ],
        },
        {
          id: 1,
          title: "处室耗时",
          data: [],
        },
        {
          id: 2,
          title: "全部",
          data: [],
        },
      ],
    };
  },

  created() {
    this.pk = this.$route.query.pk;
    this.getTimer();
    this.getTbas();
  },

  mounted() { },

  activated() { },

  computed: {
    ...mapState({
      isShowAppHeader: (state) => state.isShowAppHeader,
    }),
  },

  watch: {},

  methods: {
    change(val) {
      console.log(val);
      let type;
      if (val == 0) {
        type = "user";
      } else if (val == 1) {
        type = "dept";
      } else {
        type = "all";
      }
      this.getTbas(type);
    },
    getTimer() {
      let loading = dsf.layer.loading();
      dsf.http
        .post("/fn/toScreen/formTimeSpentStatistics", { pk: this.pk })
        .then((res) => {
          const type = res.data.type;
          if (type === "success") {
            const { number, cycle, avg, max } = res.data.data;
            this.topData = {
              number,
              cycle,
              avg,
              max,
            };
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .error((err) => {
          dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
    getTbas(type = "user") {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("/fn/toScreen/formTimeSpentDetail", {
          pk: this.pk,
          type,
        })
        .then((res) => {
          const code = res.data.type;
          if (code === "success") {
            dsf.layer.closeLoading(loading);
            if (type == "all") {
              self.formTabs[2].data = [];
              res.data.data.forEach((item, index) => {
                let obj = {
                  id: index + 1,
                  name: item.uname,
                  timer: item.timepasses,
                  content: item.actname,
                };
                self.formTabs[2].data.push(obj);
              });
            } else if (type == "user") {
              self.formTabs[0].data = [];
              res.data.data.forEach((item, index) => {
                let obj = {
                  id: index + 1,
                  name: item.uname,
                  timer: item.timepasses,
                  content: item.actname,
                };
                self.formTabs[0].data.push(obj);
              });
            } else {
              self.formTabs[1].data = [];
              res.data.data.forEach((item, index) => {
                let obj = {
                  id: index + 1,
                  name: item.uname,
                  timer: item.timepasses,
                  content: item.actname,
                };
                self.formTabs[1].data.push(obj);
              });
            }
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .error((err) => {
          dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang='scss'>
.effectivenessDetail {
  display: flex;
  flex-direction: column;

  .top {
    padding: 15px;
    background: linear-gradient(to bottom, #1c7aef 50%, #fbfbfb 70%);

    .main {
      background: #fff;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: center;
      padding: 10px;

      .item {
        width: 50%;
        text-align: center;
        padding: 10px 0;
        box-sizing: border-box;

        .num {
          height: 36px;
          line-height: 36px;
          font-size: 16px;
          font-weight: bold;
        }

        .gray {
          color: gray;
          font-size: 14px;
        }
      }

      .item:nth-child(2n + 1) {
        border-right: 2px solid #eee;
      }

      .item:nth-child(n + 3) {
        border-top: 2px solid #eee;
      }
    }

    .line {
      height: 4px;
      background: #1c7aef;
      margin: 0 6px;
    }
  }

  .tab {
    background: #fff;
    min-height: 0;
    height: 100%;
    display: flex;
    flex-direction: column;

    .title {
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .blue {
        border-radius: 50%;
        width: 12px;
        height: 12px;
        background: blue;
        display: inline-block;
        opacity: 0.6;
      }

      .yellow {
        border-radius: 50%;
        width: 12px;
        height: 12px;
        background: #afcf35;
        display: inline-block;
        opacity: 0.6;
        margin-left: -10px;
      }

      .bold {
        font-weight: bold;
      }

      .select {
        select {
          background: #eee;
          padding: 6px 4px;
          border-radius: 10px;
        }
      }
    }

    ::v-deep .van-tabs.van-tabs--line {
      flex: 1;
      /* overflow: auto; */
      display: flex;
      height: 100%;
      min-height: 0;
      flex-direction: column;
    }

    ::v-deep .van-tabs__content {
      // overflow: auto;
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    ::v-deep .van-tab__pane {
      height: 100%;
    }

    .list {
      padding-top: 10px;
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;

      .box {
        overflow: auto;
      }

      .table {
        display: flex;
        // justify-content: space-evenly;
        align-items: center;
        height: 36px;
        background: #f9f9f9;

        .gray {
          color: gray;
          flex: 1;
          text-align: center;
        }

        .fll {
          flex: 2;
          text-align: center;
        }
      }

      .list_item {
        display: flex;
        align-items: center;
        height: 36px;

        .gray {
          flex: 1;
          text-align: center;
        }

        .fll {
          flex: 2;
          text-align: center;
        }
      }
    }
  }
}</style>