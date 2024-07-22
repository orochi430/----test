<template>
  <div class="pie-container one">
    <div class="task-container">
      <span>督办事项</span>
    </div>
    <div class="chart-container">
      <div id="echarts1" class="echarts"></div>
    </div>
    <div class="task-container">
      <span>督办情况<i>（点击图片支持下钻）</i></span>
    </div>
    <div class="chart-container">
      <div id="echarts2" class="echarts"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "reportOne",
  props: [
    "currentTabIndex",
    "tabslist",
    "searchList",
    "searchIndex",
    "dateStart",
    "dateEnd",
    "dateStr",
  ],
  data() {
    return {
      myChart1: null,
      myChart2: null,
      color2: ["#DF5858", "#F7B500", "#0A8BD8"],
      echartData: [
        // {
        //   name: "重要文件",
        //   value: "6",
        // },
        // {
        //   name: "市领导批示",
        //   value: "30",
        // },
        // {
        //   name: "领导交办事项",
        //   value: "3",
        // },
        // {
        //   name: "重要会议议定事项议定事项",
        //   value: "6",
        // },
      ],
      echartData2: [],
      chart1color: [
        "#FFB218",
        "#32C5FF",
        "#048AEF",
        "#1664E0",
        "#44D7B6",
        "#4AEAB0",
        "#EC4E4F",
        "#EFDD79",
        "#1C80EF",
      ],
      currentDBLX: null,
    };
  },
  watch: {
    searchIndex(val) {
      if (this.currentTabIndex == 0 && val < 3) {
        this.currentDBLX = null;
        this.changeChart1();
        this.changeChart2();
      }
    },
    dateStr(val) {
      if (this.currentTabIndex == 0 && val.length) {
        this.currentDBLX = null;
        this.changeChart1();
        this.changeChart2();
      }
    },
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    getChartData1(back) {
      let self = this;
      self.echartData = [];
      let param = { type: self.searchIndex + 1 };
      if (self.searchIndex == 3) {
        param.start = self.dateStart;
        param.end = self.dateEnd;
      }
      dsf.http.post("ctrl/customStatic/summary", param).then((data) => {
        console.log(data.data);
        if (data.data.type == "success") {
          data.data.data.forEach((element) => {
            self.echartData.push(element);
            // {
            //   name: element.name,
            //   value: element.value,
            //   fileType: element.key,
            // }
          });
          back();
        } else {
          dsf.layer.toast("当前暂无数据");
        }
      });
    },
    getChartData2(back) {
      let self = this;
      self.echartData2 = [];
      let param = { type: self.searchIndex + 1 };
      if (self.searchIndex == 3) {
        param.start = self.dateStart;
        param.end = self.dateEnd;
      }
      if (self.currentDBLX) {
        param.fileType = self.echartData.find(
          (item) => item.name == self.currentDBLX.name
        )?.key;
      }
      dsf.http.post("ctrl/customStatic/task", param).then((data) => {
        console.log(data.data);
        if (data.data.type == "success") {
          data.data.data.forEach((element) => {
            self.echartData2.push(element);
          });
          back();
        } else {
          dsf.layer.toast("当前暂无数据");
        }
      });
    },
    changeTab(tabindex) {
      this.currentTabIndex = tabindex;

      //时间检索恢复第一个
      this.searchList.forEach((element) => {
        element.selected = false;
      });
      this.searchList[0].selected = true;

      this.getChartsData();
    },
    initCharts() {
      let self = this;
      self.getChartData1(() => {
        self.initCharts1();
      });
      self.getChartData2(() => {
        self.initCharts2();
      });
    },
    initCharts1() {
      let self = this;
      let bgColor = "#fff";
      let scale = 1;

      let total = self.echartData.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);

      let chartData1 = {
        backgroundColor: bgColor,
        color: self.chart1color,

        title: {
          text: "{name|督办任务}\n{val|" + total + "}",
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              name: {
                fontSize: 16 * scale,
                fontWeight: "bold",
                color: "#0E7CE2",
                padding: [10, 0],
              },
              val: {
                fontSize: 16 * scale,
                fontWeight: "bold",
                color: "#F8456B",
              },
            },
          },
        },
        legend: {
          show: false,
          bottom: "0",
          icon: "rect",
          itemWidth: 12 * scale,
          itemHeight: 12 * scale,
          textStyle: {
            rich: {
              name: {
                fontSize: 12 * scale,
                fontWeight: "bold",
              },
            },
          },
          formatter: function (name) {
            return "{name|" + name + "}";
          },
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "50%"],
            data: self.setLabel1(self.echartData),
            itemStyle: {
              normal: {
                borderColor: bgColor,
                borderWidth: 1,
              },
            },
            label: {
              show: true,
              position: "outside",
              formatter: "{b|{b}}\n{a|{d}%}\n{hr|}",
              rich: {
                hr: {
                  backgroundColor: "t",
                  width: 3,
                  height: 3,
                  borderRadius: 3,
                  padding: [3, 3, 0, -12],
                },
                a: {
                  align: "center",
                  padding: [-20, 10, 0, 10],
                  height: 20,
                },
                b: {
                  padding: [-20, 10, -30, 10],
                },
              },
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 15,
              },
            },
          },
        ],
      };

      setTimeout(() => {
        self.myChart1 = echarts.init(document.getElementById("echarts1"));
        // 绘制图表1
        self.myChart1.setOption(chartData1);

        // 为饼图绑定点击事件
        self.myChart1.on("click", function (params) {
          // 控制台输出点击的数据信息
          console.log(params);
          self.currentDBLX = params;
          self.changeChart2();
        });
      }, 0);
    },
    initCharts2() {
      let self = this;
      let bgColor = "#fff";
      let scale = 1;

      let chartData2 = {
        backgroundColor: bgColor,
        color: self.color2,
        title: {
          text: "{name|督办情况}",
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              name: {
                fontSize: 16 * scale,
                fontWeight: "bold",
                color: "#FD4900",
              },
            },
          },
        },

        series: [
          {
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "50%"],
            data: self.setLabel1(self.echartData2, 2),
            labelLine: {
              normal: {
                length: 10,
                length2: 20,
              },
            },
          },
          // 边框的设置
          // {
          //   radius: ["40%", "45%"],
          //   center: ["50%", "50%"],
          //   type: "pie",
          //   label: {
          //     normal: {
          //       show: false,
          //     },
          //     emphasis: {
          //       show: false,
          //     },
          //   },
          //   labelLine: {
          //     normal: {
          //       show: false,
          //     },
          //     emphasis: {
          //       show: false,
          //     },
          //   },
          //   animation: false,
          //   tooltip: {
          //     show: false,
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: "rgba(250,250,250,0.5)",
          //     },
          //   },
          //   data: [
          //     {
          //       value: 1,
          //     },
          //   ],
          // },
        ],
      };
      setTimeout(() => {
        self.myChart2 = echarts.init(document.getElementById("echarts2"));
        // 绘制图表2
        self.myChart2.setOption(chartData2);
        // 为饼图绑定点击事件
        self.myChart2.on("click", function (params) {
          // 控制台输出点击的数据信息
          console.log(params);
          self.$router.push({
            path: `/reportGo`,
            query: {
              dbsx: self.currentDBLX ? self.currentDBLX.data.source.key : "",
              status: params.name,
              searchIndex: self.searchIndex,
              dateStart: self.dateStart,
              dateEnd: self.dateEnd,
            },
          });
        });
      }, 0);
    },
    changeChart1() {
      let self = this;
      self.getChartData1(() => {
        let op = self.myChart1.getOption(); //获取当前的option
        op.series[0].data = self.setLabel1(self.echartData); //改变数据源

        let total = self.echartData.reduce((a, b) => {
          return a + b.value * 1;
        }, 0);
        op.title[0].text = "{name|督办任务}\n{val|" + total + "}"; //改变标题
        self.myChart1.setOption(op, true); //重新渲染
      });
    },
    changeChart2() {
      let self = this;
      let op = self.myChart2.getOption(); //获取当前的option
      self.getChartData2(() => {
        if (self.currentDBLX) {
          op.title[0].text =
            "{name|" + self.getParamsNameArr(6, self.currentDBLX).join("\n") + "}"; //改变标题
        } else {
          op.title[0].text = "{name|督办情况}"; //改变标题
        }
        op.series[0].data = self.setLabel1(self.echartData2, 2); //改变数据源
        self.myChart2.setOption(op, true); //重新渲染
      });
    },
    setLabel1(data, index) {
      let self = this;
      let opts = [];
      let keys = ["a", "b", "c", "d", "e", "f", "g"];
      for (let i = 0; i < data.length; i++) {
        let item = {};
        let rowsCount = 1;
        item.name = data[i].name;
        item.value = data[i].value;
        item.source = data[i];

        let newParamsName = self.getParamsNameArr(5, item);
        newParamsName.push(data[i].value + "条");
        // 返回的格式，根据具体的业务需求确定
        let showtext = ["{hr|}"];
        // showtext.push("{number|" + data[i].value + "条}");
        newParamsName.forEach((element, index) => {
          showtext.push("{" + keys[index] + "|" + element + "}");
        });
        rowsCount = newParamsName.length;

        item.label = {
          normal: {
            //控制引导线上文字颜色和位置,此处a是显示文字区域，b做一个小圆圈在引导线尾部显示
            show: true,
            //a和b来识别不同的文字区域
            formatter: showtext.join("\n"),
            rich: {
              hr: {
                backgroundColor: index ? self.color2[i] : self.chart1color[i],
                width: 3,
                height: 3,
                borderRadius: 3,
                padding: [3, 3, 0, -12],
              },
            },
          },
        };

        if (rowsCount == 2) {
          item.label.normal.rich["a"] = {
            align: "left",
            padding: [-20, 5, -40, 5],
            height: 20,
            fontSize: 14,
          };
          item.label.normal.rich["b"] = {
            align: "left",
            padding: [-20, 5, -10, 5],
            height: 20,
            fontSize: 14,
          };
        }
        if (rowsCount == 3) {
          item.label.normal.rich["a"] = {
            align: "left",
            padding: [-20, 5, -55, 5],
            height: 20,
            fontSize: 14,
          };
          item.label.normal.rich["b"] = {
            align: "left",
            padding: [-20, 5, -25, 5],
            height: 20,
            fontSize: 14,
          };
          item.label.normal.rich["c"] = {
            align: "left",
            padding: [-30, 5, 0, 5],
            height: 20,
            fontSize: 14,
          };
        }
        if (rowsCount == 4) {
          item.label.normal.rich["a"] = {
            align: "left",
            padding: [-20, 5, -70, 5],
            height: 20,
            fontSize: 14,
          };
          item.label.normal.rich["b"] = {
            align: "left",
            padding: [-20, 5, -40, 5],
            height: 20,
            fontSize: 14,
          };
          item.label.normal.rich["c"] = {
            align: "left",
            padding: [-20, 5, -10, 5],
            height: 20,
            fontSize: 14,
          };
          item.label.normal.rich["d"] = {
            align: "left",
            padding: [-40, 5, 0, 5],
            height: 20,
            fontSize: 14,
          };
        }
        opts.push(item);
      }
      return opts;
    },
    setLabel2(data) {
      let opts = [];
      let self = this;
      for (let i = 0; i < data.length; i++) {
        let item = {};
        item.name = data[i].name;
        item.value = data[i].value;
        item.label = {
          normal: {
            //控制引导线上文字颜色和位置,此处a是显示文字区域，b做一个小圆圈在引导线尾部显示
            show: true,
            //a和b来识别不同的文字区域
            formatter: [
              "{a|" + data[i].value + "条}", //引导线上面文字
              "{hr|}", //引导线下面文字
            ].join("\n"), //用\n来换行
            rich: {
              a: {
                padding: [-90, 1, -80, 1],
                fontSize: 14,
              },
              hr: {
                height: 5,
                width: 5,
                lineHeight: 5,
                marginBottom: 10,
                padding: [0, -5],
                borderRadius: 5,
                backgroundColor: self.color2[i], // 圆点颜色和饼图块状颜色一致
              },
            },
          },
        };

        opts.push(item);
      }
      return opts;
    },
    getChartData(index) {
      this.searchList.forEach((element, eindex) => {
        if (index == eindex) element.selected = true;
        else element.selected = false;
      });
      if (index == 3) {
        this.isShowTypePicker = true;
      } else this.getChartsData();
    },
    getParamsNameArr(count, params) {
      let newParamsName = [];
      let paramsNameNumber = params.name.length;
      let provideNumber = paramsNameNumber > count ? 4 : count; // 每行能显示的字的个数
      // 根据每行能显示的字数，计算出标签文字需要换行的次数
      let rowNumber = Math.ceil(paramsNameNumber / provideNumber);
      // 如果换行，则每行显示的文字数需要根据字数进行调整
      if (paramsNameNumber > provideNumber) {
        for (let p = 0; p < rowNumber; p++) {
          let tempStr = "";
          let start = p * provideNumber;
          let end = start + provideNumber;
          // 每行最后一次不换行
          if (p === rowNumber - 1) {
            tempStr = params.name.substring(start, paramsNameNumber);
          } else {
            tempStr = params.name.substring(start, end);
          }
          newParamsName.push(tempStr);
        }
      } else {
        newParamsName.push(params.name);
      }
      return newParamsName;
    },
  },
};
</script>

<style lang="scss" scoped>
.pie-container {
  .chart-container {
    height: 35vh;
    width: 100%;

    .echarts {
      width: 100%;
      height: 100%;
    }
  }
  .task-container {
    padding: 0.15rem 0.3rem;
    box-sizing: border-box;
    position: relative;
    line-height: 1.44em;
    font-size: 0.36rem;
    // margin-bottom: 0.2rem;

    span:first-child {
      padding-left: 0.1rem;
      border-left: 5px solid #fff;
      position: relative;
      font-weight: bold;
      &::before {
        content: " ";
        position: absolute;
        height: 18px;
        width: 5px;
        top: 50%;
        left: -5px;
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
        border-radius: 3px;
        background-color: var(--normal);
      }
      i {
        font-size: 0.3rem;
      }
    }
  }
}
</style>
