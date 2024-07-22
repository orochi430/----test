<template>
  <div class="banjianDetail">
    <div class="bg">
      <header>
        <div class="calendar" @click="show = true">
          {{ value }} <span class="jiantou"></span>
        </div>
      </header>
      <div class="todoMonth" v-if="todoMonthShow">
        <div class="text">本月办件量</div>
        <div class="num">
          <span>{{ todoMonthData.ljbjl }}</span> 件
        </div>
        <div class="content">
          <div class="left">
            <div class="text">超期办理（件）</div>
            <div class="num">
              <span class="red">{{ todoMonthData.cqbjs }}</span
              ><span class="xie">/</span
              ><span class="blue">{{ todoMonthData.ybjzs }}</span>
            </div>
          </div>
          <div class="center"></div>
          <div class="rghit">
            <div class="text">按时办结率</div>
            <div class="num">{{ todoMonthData.asbjl }}</div>
          </div>
        </div>
      </div>
      <commonempty
        v-else
        description="暂无数据"
        style="background: #fff; border-radius: 10px"
      ></commonempty>
    </div>
    <div class="geChuShi">
      <div class="title">
        <div class="">
          <span class="blue"></span>
          <span class="yellow"></span>
          <span class="bold">各处室办件量分析</span>
        </div>
        <div class="text">
          说明：按时办结率（%）=实际按时办结数量/应按时办结件数量；处室按承办人办理件数计算。
        </div>
      </div>
      <div class="box" v-if="geChuShiShow">
        <div class="tabel">
          <div style="flex: 3">处室名称</div>
          <div style="flex: 2; text-align: center">承办量</div>
          <!-- <div>超期办结</div> -->
          <div style="flex: 3; text-align: right">按时办结率</div>
        </div>
        <template v-for="item in geChuShiData.geChuShiList">
          <div class="item" :key="item.id" v-if="item.flag">
            <div
              class="serialNumber"
              :style="{ background: item.id < 4 ? '#0086d9' : '' }"
            >
              {{ item.id }}
            </div>
            <div class="progress">
              <div class="title1">
                <div style="flex: 3">{{ item.name }}</div>
                <div style="text-align: center; flex: 2 ;color: #0091ff">
                  {{ item.accelerationTimer }}
                </div>
                <!-- <div style="width: 56px; text-align: center; color: #0091ff">
                {{ 1 }}<span class="xie">/</span>{{ 3 }}
              </div> -->
                <div style="flex: 3; text-align: right; color: #0091ff">
                  {{ item.rate }}
                </div>
              </div>
              <!-- <van-progress
              :percentage="parseInt(item.rate)"
              color="#0091FF"
              :show-pivot="false"
              stroke-width="6"
            /> -->
            </div>
          </div>
        </template>

        <div class="more" @click="mroe" v-if="geChuShiData.total > 10 && flag">
          全部展示
        </div>
      </div>

      <commonempty v-else description="暂无数据"></commonempty>
    </div>
    <div class="anWenZhong">
      <div class="title">
        <div class="">
          <span class="blue"></span>
          <span class="yellow"></span>
          <span class="bold">按文种分析办件量</span>
        </div>
      </div>
      <div class="box">
        <van-tabs v-model="active" type="card">
          <van-tab
            :title="item.name"
            v-for="(item, index) in anWenZhongData.list"
            :key="index"
          >
            <div class="text">单位：件</div>
            <template v-if="anWenZhongShow">
              <div class="item" :key="it.id" v-for="it in item.list">
                <div class="progress">
                  <div class="title">
                    <div>{{ it.name }}</div>
                    <div style="color: #0091ff; font-weight: bold">
                      {{ it.num }}
                    </div>
                  </div>
                  <van-progress
                    :percentage="it.fraction"
                    color="#0091FF"
                    :show-pivot="false"
                    stroke-width="6"
                  />
                </div>
              </div>
            </template>
            <commonempty v-else description="暂无数据"></commonempty>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="confirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "banjianDetail",

  props: [],

  components: {},

  data() {
    return {
      geChuShiData: {
        total: 0,
        geChuShiList: [
          // {
          //   id: 1,
          //   name: "第一秘书处",
          //   accelerationTimer: 0.7,
          //   rate: "87.5%",
          // },
          // {
          //   id: 2,
          //   name: "第二秘书处",
          //   accelerationTimer: 0.7,
          //   rate: "87.5%",
          // },
          // {
          //   id: 3,
          //   name: "第三秘书处",
          //   accelerationTimer: 0.7,
          //   rate: "87.5%",
          // },
        ],
      },

      anWenZhongData: {
        list: [
          {
            name: "全部",
            list: [
              // {
              //   id: 1,
              //   name: "第一秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 2,
              //   name: "第二秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 3,
              //   name: "第三秘书处",
              //   fraction: "87",
              // },
            ],
          },
          {
            name: "收文",
            list: [
              // {
              //   id: 1,
              //   name: "第一秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 2,
              //   name: "第二秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 3,
              //   name: "第三秘书处",
              //   fraction: "87",
              // },
            ],
          },
          {
            name: "发文",
            list: [
              // {
              //   id: 1,
              //   name: "第一秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 2,
              //   name: "第二秘书处",
              //   fraction: "87",
              // },
              // {
              //   id: 3,
              //   name: "第三秘书处",
              //   fraction: "87",
              // },
            ],
          },
        ],
      },
      todoMonthData: {
        asbjl: "",
        cqbjs: "",
        ljbjl: "",
        ybjzs: "",
      },
      active: 0,
      todoMonthShow: true,
      geChuShiShow: true,
      anWenZhongShow: true,
      show: false,
      minDate: new Date(new Date().getFullYear() - 5, 0, 1),
      maxDate: new Date(new Date().getFullYear(), 11, 1),
      currentDate: new Date(),
      value: moment().format("YYYY年MM月"),
      efficiencySelectParams: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        range: 2,
        fileType: 0,
      },
      flag: false,
    };
  },

  created() {},

  mounted() {
    this.getTodoMonthData();
  },

  activated() {},

  computed: {},

  watch: {
    active(n, o) {
      // console.log(n,o);
      this.efficiencySelectParams.fileType = n;
      this.getTodoMonthData();
    },
  },

  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    confirm(value) {
      this.value = moment(value).format("YYYY年MM月");
      this.show = false;
      this.efficiencySelectParams.year = new Date(value).getFullYear();
      this.efficiencySelectParams.month = new Date(value).getMonth() + 1;
      this.getTodoMonthData();
    },
    getTodoMonthData() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post(
          "fn/efficiencySelect/processingVolumeStatistics",
          self.efficiencySelectParams
        )
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { unitBjxq, deptAnalysis, wzAnalysis } = res.data.data;
            self.todoMonthData = unitBjxq;
            let bi = "";
            self.anWenZhongData.list[self.efficiencySelectParams.fileType]
                .list=[];
            wzAnalysis.bjsList.forEach((item, index) => {
              if (index == 0) bi = 100 / Number(item);
              self.anWenZhongData.list[
                self.efficiencySelectParams.fileType
              ].list.push({
                id: index + 1,
                fraction: (Number(item) * bi).toFixed(),
                num: item,
              });
            });
            
            wzAnalysis.wzList.forEach((item, index) => {
              self.anWenZhongData.list[
                self.efficiencySelectParams.fileType
              ].list[index].name = item;
            });
            if (
              self.anWenZhongData.list[self.efficiencySelectParams.fileType]
                .list.length == 0
            ) {
              self.anWenZhongShow = false;
            }else{
              self.anWenZhongShow = true;
            }
            self.geChuShiData.total = deptAnalysis.deptList.length;
            if( self.geChuShiData.total==0){
              self.geChuShiShow=false;
            }else{
              self.geChuShiShow=true;
            }
            self.flag = deptAnalysis.deptList.length > 10 ? true : false;
            self.geChuShiData.geChuShiList = [];
            deptAnalysis.deptList.forEach((item, index) => {
              self.geChuShiData.geChuShiList.push({
                id: index + 1,
                name: item,
                flag: index <= 9 ? true : false,
              });
            });
            deptAnalysis.bjsList.forEach((item, index) => {
              self.geChuShiData.geChuShiList[index].accelerationTimer = item;
            });
            deptAnalysis.bjlList.forEach((item, index) => {
              self.geChuShiData.geChuShiList[index].rate = item;
            });
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
    //全部展示
    mroe() {
      this.flag = false;
      this.geChuShiData.geChuShiList.forEach((item) => {
        item.flag = true;
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.banjianDetail {
  .bg {
    padding: 10px;
    background-image: linear-gradient(
      180deg,
      #008cff 0%,
      rgba(0, 140, 255, 0.59) 42%,
      rgba(255, 255, 255, 0) 100%
    );
    header {
      text-align: center;
      .calendar {
        background: rgba(255, 255, 255, 0.33);
        border-radius: 37px;
        padding: 10px 15px;
        color: #fff;
        margin: 0.1rem auto 0.3rem;
        /* width: 130px; */
        /* position: relative; */
        display: inline-block;
      }
      .jiantou {
        display: inline-block;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #fff;
      }
    }
    .todoMonth {
      padding: 0 10px;
      background: #fff;
      border-radius: 10px;
      overflow: auto;
      .text {
        text-align: center;
        margin: 10px 0;
        font-weight: bold;
      }
      .num {
        text-align: center;
        span {
          font-size: 20px;
          font-weight: bold;
        }
      }
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        .left {
          text-align: center;
          flex: 1;
          .num {
            margin: 5px 0;
            font-weight: 800;
            font-size: 20px;
            .red {
              color: red;
            }
            .xie {
              font-size: 22px;
              padding: 0 6px;
              color: gray;
            }
            .blue {
              color: #0091ff;
            }
          }
        }
        .center {
          width: 1px;
          background: #eee;
          height: 30px;
        }
        .rghit {
          flex: 1;
          text-align: center;
          .num {
            margin: 5px 0;
            font-weight: 800;
            font-size: 20px;
          }
        }
      }
    }
  }
  .geChuShi {
    margin: 0 10px;
    background: #fff;
    border-radius: 10px;
    overflow: auto;
    .title {
      padding: 10px 15px;

      .blue {
        border-radius: 50%;
        width: 16px;
        height: 16px;
        background: rgba(115, 176, 223, 0.74);
        display: inline-block;
        opacity: 0.6;
      }

      .yellow {
        border-radius: 50%;
        width: 16px;
        height: 16px;
        background: rgba(247, 181, 0, 0.49);
        display: inline-block;
        opacity: 0.6;
        margin-left: -10px;
      }

      .bold {
        font-weight: bold;
      }

      .text {
        color: #cccccc;
      }
    }
    .box {
      padding: 0 10px;
      .tabel {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: gray;
        padding-left: 30px;
        margin-bottom: 10px;
      }
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .serialNumber {
          width: 24px;
          height: 24px;
          line-height: 24px;
          border-radius: 50%;
          text-align: center;
          // background: #0086d9;
          background: #c2ced5;
          color: #fff;
          margin-right: 10px;
        }
        .progress {
          flex: 1;
          .title1 {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            .xie {
              font-size: 16px;
              padding: 0 6px;
              color: gray;
            }
          }
        }
      }
      .more {
        text-align: center;
        margin: 10px 0;
        color: #0091ff;
      }
    }
  }
  .anWenZhong {
    margin: 10px;
    background: #fff;
    border-radius: 10px;
    overflow: auto;
    .title {
      padding: 10px 15px;

      .blue {
        border-radius: 50%;
        width: 16px;
        height: 16px;
        background: rgba(115, 176, 223, 0.74);
        display: inline-block;
        opacity: 0.6;
      }

      .yellow {
        border-radius: 50%;
        width: 16px;
        height: 16px;
        background: rgba(247, 181, 0, 0.49);
        display: inline-block;
        opacity: 0.6;
        margin-left: -10px;
      }

      .bold {
        font-weight: bold;
      }
    }
    .box {
      padding-bottom: 15px;
      .text {
        text-align: right;
        color: gray;
        padding-right: 15px;
      }
      .progress {
        padding: 0 10px;
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
        }
      }
    }
  }
  ::v-deep .van-tabs__wrap {
    height: 40px;
    width: 70%;
    margin: 0 auto;
    .van-tabs__nav {
      box-sizing: border-box;
      height: 40px;
      border-radius: 30px;
      background: #f4f4f4;
      margin: 0;
      border: 0;
    }
    .van-tab--active {
      background: #008cff;
      .van-tab__text {
        color: #fff !important;
      }
    }
    .van-tab {
      line-height: 40px;
      border-radius: 30px;
      border: 0;
      .van-tab__text {
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>