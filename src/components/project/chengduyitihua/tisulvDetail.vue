<template>
  <div class="tisulvDetail">
    <div class="bg">
      <div class="todoMonth" v-if="todoMonthShow">
        <div class="text">平均耗时</div>
        <div class="num">
          <span>{{ pjhs.avgPjhs.toFixed(1) }}</span
          >小时
        </div>
        <div class="content">
          <div class="left">
            <div class="text">
              同比上期：<span>{{ pjhs.avgHbsd.toFixed(1) }}小时</span>
            </div>
          </div>
          <div class="center"></div>
          <div class="rghit">
            <div class="text">
              提速率：<span class="red"
                >{{ pjhs.avgHbtsl.toFixed(2) }}% <span></span
              ></span>
            </div>
          </div>
        </div>
      </div>
      <commonempty
        v-else
        style="background: #fff; border-radius: 10px"
        description="数据获取失败"
      ></commonempty>
      <div class="select" @click="showPop = true">
        <div class="left">{{ chuShiSec }} <span class="jiao"></span></div>
        <div class="center"></div>
        <div class="rghit">{{ currentYearSec }}</div>
      </div>
    </div>
    <div class="quJian">
      <div class="title">
        <div class="">
          <span class="blue"></span>
          <span class="yellow"></span>
          <span class="bold">区间平均耗时趋势图</span>
        </div>
      </div>
      <div id="qujianEcharts" v-if="quJianShow" class="qujianEcharts"></div>
      <commonempty
        v-else
        style="background: #fff; border-radius: 10px"
        description="数据获取失败"
      ></commonempty>
    </div>
    <div class="anWenZhong">
      <div class="title">
        <div class="">
          <span class="blue"></span>
          <span class="yellow"></span>
          <span class="bold">办件平均耗时分析-按文种</span>
        </div>
      </div>
      <div class="box">
        <van-tabs v-model="anWenZhongActive" type="card">
          <van-tab
            :title="item.name"
            v-for="(item, index) in anWenZhongData.list"
            :key="index"
          >
            <div class="text">单位：小时</div>
            <div
              class="anWenZhongEcharts"
              :id="`anWenZhongEcharts${index}`"
            ></div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="anZhuanTi">
      <div class="title">
        <div class="">
          <span class="blue"></span>
          <span class="yellow"></span>
          <span class="bold">按专题分析平均耗时</span>
        </div>
      </div>
      <div class="box">
        <van-tabs v-model="anZhuanTiActive" type="card">
          <van-tab
            :title="item.name"
            v-for="(item, index) in anZhuanTiData.list"
            :key="index"
          >
            <div class="text">单位：小时</div>
            <div class="item" v-for="it in item.list" :key="it.id">
              <div
                class="serialNumber"
                :style="{ background: it.id < 4 ? '#0086d9' : '' }"
              >
                {{ it.id }}
              </div>
              <div class="progress">
                <div class="title">
                  <div>{{ it.name }}</div>
                  <div style="color: #0091ff; font-weight: bold">
                    {{ it.fraction }}
                  </div>
                </div>
                <van-progress
                  :percentage="it.fraction"
                  color="#0091FF"
                  :show-pivot="false"
                  stroke-width="20"
                />
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <van-popup v-model="showPop" position="bottom" class="showPop">
      <div class="roundTitle">
        <van-icon name="arrow-down" @click="showPop = false" />
        <div class="title">选择</div>
      </div>
      <div class="list1">
        <div class="title">处室选择</div>
        <div class="box">
          <div
            class="item1"
            :class="item.checked ? 'active' : ''"
            @click="checked(item)"
            v-for="(item, index) in cSSelectList"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="list2">
        <div class="title">时间选择</div>
        <div class="box">
          <div
            class="item2"
            :class="item.checked ? 'active' : ''"
            v-for="(item, index) in curSelectList"
            :key="index"
            @click="curSelect(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="list3" v-show="selectParams.curSelect == '选择年度'">
        <div class="title">选择年度</div>
        <div class="">
          <van-field
            readonly
            placeholder="请选择"
            v-model="showValue"
            @click="showTime = true"
          >
            <template #right-icon>
              <i class="iconfont iconriqi"></i>
            </template>
          </van-field>
        </div>
      </div>
      <div class="btn">
        <div class="canle" @click="showPop = false">取消</div>
        <div class="yes" @click="submit">确定</div>
      </div>
    </van-popup>
    <van-popup v-model="showTime" position="bottom" round get-container="#app">
      <van-picker
        title="选择年份"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "tisulvDetail",

  props: [],

  components: {},

  data() {
    return {
      anWenZhongActive: 0,
      anZhuanTiActive: 0,
      anWenZhongData: {
        // fraction: "86.7",
        list: [
          {
            name: "全部",
            // list: [
            //   {
            //     id: 1,
            //     name: "第一秘书处",

            //     fraction: "87",
            //   },
            //   {
            //     id: 2,
            //     name: "第二秘书处",
            //     fraction: "87",
            //   },
            //   {
            //     id: 3,
            //     name: "第三秘书处",
            //     fraction: "87",
            //   },
            // ],
          },
          {
            name: "收文",
            // list: [
            //   {
            //     id: 1,
            //     name: "第一秘书处",

            //     fraction: "87",
            //   },
            //   {
            //     id: 2,
            //     name: "第二秘书处",
            //     fraction: "87",
            //   },
            //   {
            //     id: 3,
            //     name: "第三秘书处",
            //     fraction: "87",
            //   },
            // ],
          },
          {
            name: "发文",
            // list: [
            //   {
            //     id: 1,
            //     name: "第一秘书处",

            //     fraction: "87",
            //   },
            //   {
            //     id: 2,
            //     name: "第二秘书处",
            //     fraction: "87",
            //   },
            //   {
            //     id: 3,
            //     name: "第三秘书处",
            //     fraction: "87",
            //   },
            // ],
          },
        ],
      },
      anZhuanTiData: {
        // fraction: "86.7",
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
              // {
              //   id: 4,
              //   name: "第三秘书处",
              //   fraction: "87",
              // },
            ],
          },
          {
            name: "下级",
            list: [
              {
                id: 1,
                name: "第一秘书处",

                fraction: "87",
              },
              {
                id: 2,
                name: "第二秘书处",
                fraction: "87",
              },
              {
                id: 3,
                name: "第三秘书处",
                fraction: "87",
              },
            ],
          },
          {
            name: "上级/平级",
            list: [
              {
                id: 1,
                name: "第一秘书处",

                fraction: "87",
              },
              {
                id: 2,
                name: "第二秘书处",
                fraction: "87",
              },
              {
                id: 3,
                name: "第三秘书处",
                fraction: "87",
              },
            ],
          },
        ],
      },
      showPop: false,
      showValue: "",
      showTime: false,
      chuShiSec: "全单位",
      currentYearSec: "今年",
      params: {
        year: new Date().getFullYear(),
        month:1,
        month_end: 12,
        deptId: "",
      },

      cSSelectList: [
        // { name: "全单位", checked: false, id: "1" },
        // { name: "xxx秘书处", checked: false, id: "2" },
        // { name: "xxx秘书处", checked: false, id: "9" },
        // { name: "xxx秘书处", checked: false, id: "3" },
        // { name: "xxx秘书处", checked: false, id: "4" },
        // { name: "xxx秘书处", checked: false, id: "5" },
        // { name: "xxx秘书处", checked: false, id: "6" },
        // { name: "xxx秘书处", checked: false, id: "7" },
        // { name: "xxx秘书处", checked: false, id: "8" },
      ],
      selectParams: {
        result: "",
        curSelect: "今年",
      },
      curSelectList: [
        { name: "本月", checked: false, id: "1" },
        { name: "今年", checked: false, id: "2" },
        { name: "去年", checked: false, id: "3" },
        { name: "选择年度", checked: false, id: "4" },
      ],
      todoMonthShow: true,
      quJianShow: true,
      pjhs: {
        avgHbtsl: 0,
        avgHbsd: 0,
        avgPjhs: 1.825,
      },
      datas: [],
      nums: [],
    };
  },

  created() {},

  mounted() {
    // this.qujianEcharts();
    // this.anWenZhongEcharts(this.anWenZhongActive);
    this.$nextTick(() => {
      this.getData();
      this.getDept();
    });
  },

  activated() {},

  computed: {
    columns() {
      let currentYear = new Date().getFullYear();
      let yearsArray = [];
      // 当前年份
      yearsArray.push(currentYear);
      // 往前5年
      for (let i = 1; i <= 10; i++) {
        let previousYear = currentYear - i;
        yearsArray.push(previousYear);
      }

      // 往后5年
      // for (let i = 1; i <= 10; i++) {
      //   let nextYear = currentYear + i;
      //   yearsArray.unshift(nextYear);
      // }
      return yearsArray;
    },
  },

  watch: {
    anWenZhongActive(newVlue, oldVlue) {
      console.log("newVlue,oldVlue", newVlue, oldVlue);
      this.anWenZhongEcharts(newVlue, this.datas, this.nums);
    },
  },

  methods: {
    qujianEcharts(data, max, nums) {
      let chartDom = document.getElementById("qujianEcharts");
      let myChart = echarts.init(chartDom);
      let option;
      let length = max.toFixed().length;
      let bu = 1;
      if (length == 1) {
        bu = 1;
      } else {
        if (length == 2) {
          bu = 10;
        } else if (length == 3) {
          bu = 100;
        } else if (length == 4) {
          bu = 1000;
        }
      }
      // chartDom.style.width = "100%";
      // chartDom.style.height = "100%";
      option = {
        color: ["rgba(0,145,255,1)", "rgba(247,181,0,0.23)"],
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          boundaryGap: false,
          splitNumber: 1,
          //   max:12,
          //   min:1,
          //   interval:1,
          splitArea: {
            interval: 1,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            // 网格线
            show: true,
            lineStyle: {
              //分割线
              width: 1,
              type: "dashed", //dotted：虚线 solid:实线
            },
          },
          data,
        },

        grid: {
          left: "10%", //原来是10%，修改为20%
          right: "5%",
        },
        legend: {
          data: ["单位耗时", "处室耗时"],
          top: "10%",
        },
        yAxis: {
          type: "value",
          axisPointer: {
            type: "line",
          },
          max,
          min: 0,
          interval: bu,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            // 网格线
            show: true,
            lineStyle: {
              //分割线
              width: 1,
              type: "dashed", //dotted：虚线 solid:实线
            },
          },
        },
        tooltip: {
          trigger: "axis",
        },
        // toolbox: {
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: "none",
        //     },
        //     restore: {},
        //     saveAsImage: {},
        //   },
        // },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            start: 0,
            end: 40,
          },
          {
            start: 0,
            end: 40,
          },
        ],
        series: [
          {
            name: "单位耗时",
            type: "line",
            data: nums,
            symbol: "none", //将小圆点改成实心 不写symbol默认空心
            symbolSize: 5,
            smooth: true,
            lineStyle: {
              normal: {
                color: "rgba(0,145,255,1)", //折线的颜色
                width: "1", //折线粗细
              },
            },
            // itemStyle: {
            //   normal: {
            //     color: '#0896FF',//拐点颜色
            //   },
            // },
          },
          // {
          //   name: "处室耗时",
          //   type: "line",
          //   data: [10, 15, 5, 8, 10, 15, 5, 8, 10, 15, 5, 8],
          //   symbol: "none", //将小圆点改成实心 不写symbol默认空心
          //   symbolSize: 5,
          //   smooth: true,
          //   lineStyle: {
          //     normal: {
          //       color: "rgba(247,181,0,0.23)", //折线的颜色
          //       width: "2", //折线粗细
          //     },
          //   },
          //   // itemStyle: {
          //   //   normal: {
          //   //     color: '#01C5D0',//拐点颜色
          //   //   },
          //   // },
          // },
        ],
      };

      option && myChart.setOption(option);
    },
    anWenZhongEcharts(active, datas, nums) {
      this.$nextTick(() => {
        let chartDom = document.getElementById(`anWenZhongEcharts${active}`);
        let myChart = echarts.init(chartDom);
        let option;

        option = {
          xAxis: {
            type: "category",
            data: datas,
            splitArea: {
              interval: 1,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              // 网格线
              show: true,
              lineStyle: {
                //分割线
                width: 1,
                type: "dashed", //dotted：虚线 solid:实线
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              // 网格线
              show: true,
              lineStyle: {
                //分割线
                width: 1,
                type: "dashed", //dotted：虚线 solid:实线
              },
            },
          },
          grid: {
            left: "10%", //原来是10%，修改为20%
            right: "5%",
            top: "15%",
            bottom: "30%",
          },
          dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            start: 0,
            end: 60,
          },
          {
            start: 0,
            end: 60,
          },
        ],
          series: [
            {
              data: nums,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "top", //顶部显示
                    textStyle: {
                      //数值样式
                      color: "black",
                      fontSize: 12,
                    },
                  },
                  color: "#0091FF",
                },
              },
            },
          ],
        };

        option && myChart.setOption(option);
      });
    },
    inClickFn() {},
    onConfirm(value) {
      // console.log("value",value);
      this.showValue = value;
      this.showTime = false;
    },
    onCancel() {
      this.showTime = false;
    },
    checked(item) {
      let obj = {};
      this.cSSelectList.forEach((it) => {
        if (it.id == item.id) {
          obj = it;
          this.selectParams.result = it.name;
          this.chuShiSec = it.name;
        } else {
          it.checked = false;
        }
      });
      obj.checked = !obj.checked;
    },
    curSelect(item) {
      let obj = {};
      this.curSelectList.forEach((it) => {
        if (it.id == item.id) {
          obj = it;
          this.selectParams.curSelect = it.name;
          // if (it.name == "选择年度") {
          //   this.selectParams.curSelect = it.name;
          // } else {
          //   this.selectParams.curSelect = "";
          // }
        } else {
          it.checked = false;
        }
      });
      obj.checked = !obj.checked;
    },
    submit() {
      this.params.deptId = this.selectParams.result;
      this.chuShiSec = this.selectParams.result
        ? this.selectParams.result
        : "全单位";
      this.currentYearSec = this.selectParams.curSelect;
      if (this.selectParams.curSelect == "今年") {
        this.params.year = new Date().getFullYear();
        this.params.month = 1;
        this.params.month_end = 12;
      } else if (this.selectParams.curSelect == "本月") {
        this.params.year = new Date().getFullYear();
        this.params.month = new Date().getMonth() + 1;
        this.params.month_end = "";
      } else if (this.selectParams.curSelect == "去年") {
        this.params.year = new Date().getFullYear() - 1;
        this.params.month = 1;
        this.params.month_end = 12;
      } else {
        this.params.year = this.showValue;
        this.params.month = 1;
        this.params.month_end = 12;
      }
      this.showPop = false;
      this.getData();
    },
    getData() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/efficiencySelect/flowSpeedAnalysisDetails", self.params)
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { pjhs, qjpjhs, awzfx, zths } = res.data.data;
            self.pjhs = pjhs;
            self.datas = Object.keys(awzfx.wjzl);
            self.nums = Object.values(awzfx.wjzl);
            self.anWenZhongEcharts(
              self.anWenZhongActive,
              self.datas,
              self.nums
            );
            let max = 0;
            let arr = [];
            let nums = [];
            qjpjhs.forEach((item) => {
              max = item.hs > max ? item.hs : max;
              nums.push(item.hs);
              if (self.params.month_end) {
                arr.push(moment(item.edate).format("MM月"));
              } else {
                arr.push(moment(item.edate).format("DD日"));
              }
            });
            self.qujianEcharts(arr, max, nums);
            self.anZhuanTiData.list[0].list = [];
            self.anZhuanTiData.list[1].list = [];
            self.anZhuanTiData.list[2].list = [];
            zths.qb.forEach((item, index) => {
              self.anZhuanTiData.list[0].list.push({
                id: index + 1,
                name: item.ztmc,
                fraction: item.zths,
              });
            });
            zths.xj.forEach((item, index) => {
              self.anZhuanTiData.list[1].list.push({
                id: index + 1,
                name: item.ztmc,
                fraction: item.zths,
              });
            });
            zths["sj/pj"].forEach((item, index) => {
              self.anZhuanTiData.list[2].list.push({
                id: index + 1,
                name: item.ztmc,
                fraction: item.zths,
              });
            });
            // self.anZhuanTiData.list=zths
          } else {
            dsf.layer.toast(res.data.message);
            self.todoMonthShow = false;
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          self.todoMonthShow = false;
          console.log(err);
        });
    },
    getDept() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/efficiencySelect/getAllDept")
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { data } = res.data;
            self.cSSelectList = [];
            data.forEach((item) => {
              self.cSSelectList.push({
                name: item.text,
                id: item.value,
                checked: false,
              });
            });
          } else {
            dsf.layer.toast(res.data.message);
            // self.geChuShiData.list=[];
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          // self.dwShow=false;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang='scss'>
.tisulvDetail {
  .bg {
    padding: 0.2rem 0.2rem 0;
    background-image: linear-gradient(
      180deg,
      #008cff 0%,
      rgba(0, 140, 255, 0.59) 42%,
      rgba(255, 255, 255, 0) 100%
    );
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
          .text {
            color: gray;
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
          .text {
            .red {
              color: red;
              font-size: 18px;
              span {
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid red;
                position: relative;
                top: -12px;
                left: 4px;
              }
            }
          }
        }
      }
    }
    .select {
      padding: 0 10px;
      background: #fff;
      border-radius: 10px;
      overflow: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.2rem;
      padding: 10px 0;
      font-weight: bold;
      .left {
        text-align: center;
        flex: 1;
        position: relative;
      }
      .jiao {
        display: inline-block;
        content: "";
        position: relative;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #000;
        left: 4px;
        top: 50%;
        /* -webkit-transform: translateY(-50%); */
        transform: translateY(-50%);
      }
      .center {
        width: 1px;
        background: #eee;
        height: 30px;
      }
      .rghit {
        flex: 1;
        text-align: center;
        position: relative;
      }
      .rghit::before {
        display: block;
        content: "";
        position: absolute;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #000;
        right: calc(50% + -30px);
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .quJian {
    margin: 2px 10px;
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
    .qujianEcharts {
      height: 200px;
      width: 100%;
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
      .text {
        text-align: right;
        color: gray;
        padding-right: 15px;
        margin-top: 4px;
      }
      .anWenZhongEcharts {
        height: 240px;
        width: 100%;
      }
    }
  }
  .anZhuanTi {
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
      .text {
        text-align: right;
        color: gray;
        padding-right: 15px;
        margin-top: 4px;
      }
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .serialNumber {
          width: 30px;
          height: 30px;
          line-height: 30px;
          border-radius: 50%;
          text-align: center;
          // background: #0086d9;
          background: #c2ced5;
          color: #fff;
          margin-left: 10px;
          font-size: 18px;
          font-weight: bold;
        }
        .progress {
          padding: 0 10px;
          flex: 1;
          .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
          }
        }
      }
    }
    .van-progress {
      border-radius: 0;
      span {
        border-radius: 0;
      }
    }
  }
}
.showPop {
  // padding: 0 15px;
  .roundTitle {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 5px solid #eee;
    .title {
      flex: 1;
      text-align: center;
    }
  }
  .list1,
  .list2 {
    padding: 15px;
    .title {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .box {
      display: grid;
      grid-gap: 10px 20px;
      grid-template-columns: auto auto auto;
      // justify-content: space-between;
      // align-items: center;
      // flex-wrap: wrap;
      .item1,
      .item2 {
        // width: 30%;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        padding: 6px 0;
        background: #eee;
        border-radius: 15px;
        border: 1px solid transparent;
        // margin-bottom: 10px;
      }
    }
  }
  .active {
    background: rgba(0, 134, 217, 0.1) !important;
    border: 1px solid rgba(0, 134, 217, 1) !important;
    border-radius: 34px;
    color: #0086d9;
  }
  .btn {
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
    .canle,
    .yes {
      width: 40vw;
      padding: 12px 0;
      text-align: center;
      border-radius: 6px;
    }
    .canle {
      border: 1px solid rgba(0, 134, 217, 1);
      color: #0086d9;
    }
    .yes {
      background: #0086d9;
      color: #fff;
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
</style>