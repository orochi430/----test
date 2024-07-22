<template>
  <div class="container">
    <div class="screen">
      <div class="title">时间选择</div>

      <div class="time" v-if="active == 0">
        <span
          class="screen-item"
          :class="{ 'choose-item': item.value == currentTime }"
          v-for="(item, index) in time"
          :key="index"
          @click="chooseTime(item)"
          >{{ item.label }}</span
        >
      </div>
      <div class="dateRange" v-else>
        <van-field
          readonly
          clearable
          @click="chooseDate"
          v-model="startDate"
          placeholder="选择日期"
        />
        <div class="line"></div>
        <van-field
          readonly
          clearable
          @click="chooseDate"
          v-model="endDate"
          placeholder="选择日期"
        />
      </div>
      <!-- <div class="dept" v-if="active == 1">
            <span class="screen-item" :class="{'choose-item': item.id == currentDept}" v-for="(item, index) in depts" :key="index" @click="chooseDept(item)">{{item.name}}</span>
        </div> -->
    </div>

    <div class="charts">
      <template v-if="active == 0">
        <div class="module">
          <div class="title">项目情况</div>
          <div class="blocks">
            <template v-for="(item, index) in xmqk">
              <div
                class="grey-block"
                @click="toDefaultlist(item)"
                v-if="!Array.isArray(item)"
                :key="index"
                style="width: 30%; padding: 10px"
              >
                <div>
                  <img
                    :src="item.img"
                    alt=""
                    style="
                      width: 0.5rem;
                      height: 0.5rem;
                      display: inline-block;
                      margin-bottom: 10px;
                    "
                  />
                  <div>{{ item.label }}</div>
                </div>
                <span class="num" :style="{ color: item.color }">{{
                  item.num
                }}</span>
              </div>
              <div v-else :key="index" style="width: 30%">
                <div
                  class="grey-block"
                  v-for="(it, idx) in item"
                  @click="toDefaultlist(it)"
                  :key="idx"
                  style="padding: 5px 8px"
                >
                  <div>{{ it.label }}</div>
                  <span :style="{ color: it.color, fontSize: '25px' }">{{
                    it.num
                  }}</span>
                </div>
              </div>
            </template>
          </div>
          <div class="feedback-block">
            <div style="color: #3389e0; padding-bottom: 10px">办结率</div>
            <van-row>
              <van-col
                span="6"
                v-for="(item, index) in completion"
                :key="index"
              >
                <van-circle
                  v-model="item.num"
                  size="60px"
                  :rate="item.num"
                  :stroke-width="130"
                  layer-color="#e5e5e5"
                  color="#FF8926"
                  :text="`${item.num}%`"
                  stroke-linecap="butt"
                />
                <div>{{ item.label }}</div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="module">
          <div class="title">在办任务</div>
          <div class="charts-container">
            <div>
              <v-chart
                :options="allPieChart"
                style="width: 2.4rem; height: 2.4rem"
              />
              <div
                v-for="(item, index) in zbrw"
                :key="index"
                :style="{ color: item.color, paddingBottom: '10px' }"
              >
                {{ item.label }}：{{ item.num }}
              </div>
            </div>
            <v-chart
              :options="deptBarChart"
              style="width: 4rem; height: 6rem; flex: 1; text-align: right"
            />
          </div>
          <div class="feedback-block">
            <div style="color: #3389e0">反馈情况</div>
            <div class="flex">
              <div v-for="(item, index) in fkqk" :key="index">
                <div class="num" :style="{ color: item.color }">
                  {{ item.num }}
                </div>
                <div>{{ item.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="taizhang" v-if="pstj">
          <div class="title">批示台账</div>
          <div class="box">
            <div class="left" id="chartsStatisticsLE"></div>
            <div
              class="right"
              id="chartsStatisticsRI"
              style="height: 240px"
            ></div>
          </div>
        </div>
        <div class="module" v-if="dbtj">
          <div class="title">督办任务</div>
          <div class="blocks">
            <div
              class="grey-block"
              v-for="(item, index) in dbrw"
              :key="index"
              :style="{ width: index > 1 ? '30%' : '48%' }"
              @click="toDefaultlist(item)"
            >
              <div>
                <img
                  :src="item.img"
                  alt=""
                  style="
                    width: 0.5rem;
                    height: 0.5rem;
                    display: inline-block;
                    margin-bottom: 10px;
                  "
                />
                <div>{{ item.label }}</div>
              </div>
              <span class="num" :style="{ color: item.color }">{{
                item.num
              }}</span>
            </div>
          </div>
        </div>
        <div class="bmtj" v-if="bmtj">
          <div class="title">按部门统计</div>
          <div class="box">
            <div class="keys">
              <div
                class="item"
                :style="{
                  flex: index < 3 ? 2 : 1,
                  textAlign: index == 0 ? 'left' : 'center',
                }"
                v-for="(item, index) in labels"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
            <div class="values" v-for="(item, index) in blfkqk" :key="index">
              <div class="item clamp" style="flex: 2; textalign: left">
                {{ item.label }}
              </div>
              <div class="item" style="flex: 2">{{ item.totalApp }}</div>
              <div class="item" style="flex: 2">{{ item.curApp }}</div>
              <div class="item" style="flex: 1">{{ item.zb }}</div>
              <div class="item" style="flex: 1">{{ item.yb }}</div>
              <div class="item" style="flex: 1">{{ item.cq }}</div>
            </div>
          </div>
        </div>
      </template>
      <div style="height: 60px" v-if="power"></div>
    </div>
    <van-tabbar v-model="active" v-if="power">
      <van-tabbar-item>
        督办立项
        <template #icon>
          <img
            :src="
              active == 0
                ? './static/images/duban/lixiang.png'
                : './static/images/duban/lixiang2.png'
            "
            alt=""
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        督办统计
        <template #icon>
          <img
            :src="
              active == 0
                ? './static/images/duban/banli.png'
                : './static/images/duban/banli2.png'
            "
            alt=""
          />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <van-popup
      v-model="dateShow"
      position="bottom"
      round
      get-container="#app"
      :style="{ height: '500px' }"
    >
      <van-calendar
        :poppable="false"
        ref="calendar"
        :min-date="minDate"
        type="range"
        @confirm="confirmDate"
        first-day-of-week="1"
        :default-date="[new Date(startDate), new Date(endDate)]"
        allow-same-day
      />
    </van-popup>
  </div>
</template>

<script>
import VChart from "vue-echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
export default {
  components: { VChart },
  data() {
    return {
      active: 0,
      currentTime: "1",
      currentDept: "0",
      time: [
        {
          // 时间选择
          label: "一个月",
          value: "1",
        },
        {
          label: "三个月",
          value: "2",
        },
        {
          label: "一年",
          value: "3",
        },
      ],
      //   depts: [
      //     {
      //       name: "全部",
      //       id: "0",
      //     },
      //   ],
      zbrw: [
        {
          // 在办任务
          label: "总任务数",
          color: "#000",
          num: "0",
        },
        {
          label: "  办理中",
          color: "#000",
          num: "0",
        },
        {
          label: "  待接收",
          color: "#3389E0",
          num: "0",
        },
      ],
      dbrw: [
        {
          // 督办任务
          label: "总计",
          color: "#15D48E",
          icon: "iconjiahao",
          img: "./static/images/duban/heji.png",
          num: "0",
        },
        {
          label: "待接收",
          color: "#1688FA",
          icon: "iconjiahao",
          img: "./static/images/duban/daijieshou.png",
          num: "0",
        },
        {
          label: "办理中",
          color: "#FF8926",
          icon: "iconjiahao",
          img: "./static/images/duban/banlizhong_cd.png",
          num: "0",
        },
        {
          label: "已办结",
          color: "#1ACAD4",
          icon: "iconjiahao",
          img: "./static/images/duban/banjie.png",
          num: "0",
        },
        {
          label: "已超期",
          color: "#DE1010",
          icon: "iconjiahao",
          img: "./static/images/duban/yichaoqi.png",
          num: "0",
        },
      ],
      fkqk: [
        {
          // 立项反馈情况
          label: "正常反馈",
          color: "#1ACAD4",
          num: "0",
        },
        {
          label: "超期反馈",
          color: "#FF8926",
          num: "0",
        },
        {
          label: "超期未反馈",
          color: "#DE1010",
          num: "0",
        },
      ],
      labels: ["部门", "总计项目", "当前项目", "在办", "已办", "超期"],
      blfkqk: [],
      completion: [
        {
          // 办结率
          label: "领导批示",
          num: 50,
        },
        {
          label: "重要文件",
          num: 60,
        },
        {
          label: "重点工作",
          num: 75,
        },
        {
          label: "紧急事项",
          num: 20,
        },
      ],
      xmqk: [
        {
          // 项目情况
          label: "项目",
          color: "#1688FA",
          icon: "iconjiahao",
          img: "./static/images/duban/xiangmu.png",
          num: "0",
        },
        {
          label: "办结",
          color: "#1ACAD4",
          icon: "iconjiahao",
          img: "./static/images/duban/banjie.png",
          num: "0",
        },
        [
          {
            label: "在办",
            color: "#FF8926",
            num: "0",
          },
          {
            label: "超期",
            color: "#DE1010",
            num: "0",
          },
        ],
      ],
      allPieChart: {
        title: {
          show: false,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          position: [10, 10],
        },
        color: ["#3389E0", "#C3E3FF"],
        series: [
          {
            name: "在办任务",
            type: "pie",
            radius: "80%",
            center: ["40%", "50%"],
            data: [
              {
                value: 25,
                name: "待接收",
              },
              {
                value: 75,
                name: "办理中",
              },
            ],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
              },
            },
          },
        ],
      },
      deptBarChart: {
        color: ["#3389E0", "#C3E3FF"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {},
        grid: {
          right: "0",
          bottom: "3%",
          height: "90%",
          width: "100%",
          containLabel: true,
        },
        dataZoom: [
          {
            type: "slider", //给x轴设置滚动条
            show: true, //flase直接隐藏图形
            xAxisIndex: [0],
            bottom: 0,
            height: 20,
            showDetail: false,
            startValue: 0, //滚动条的起始位置
            endValue: 9, //滚动条的截止位置（按比例分割你的柱状图x轴长度）
          },
          {
            type: "inside", //设置鼠标滚轮缩放
            show: true,
            xAxisIndex: [0],
            startValue: 0,
            endValue: 9,
          },
        ],
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            show: true,
            interval: 0,
            formatter: function (value) {
              //x轴的文字改为竖版显示
              var str = value.split("");
              return str.join("\n");
            },
          },
        },
        series: [
          {
            name: "待接收",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            emphasis: {
              focus: "series",
            },
            data: [],
          },
          {
            name: "办理中",
            type: "bar",
            stack: "total",
            label: {
              show: false,
            },
            emphasis: {
              focus: "series",
            },
            data: [],
          },
        ],
      },
      dateShow: false, //日期显示
      minDate: new Date(new Date().getFullYear() - 5, 0, 1), //可选择的最小日期
      // maxDate:new Date(new Date().getFullYear() + 5, 11, 31),//可选择的最大日期
      startDate: "",
      endDate: "",
      pstj: false, //批示统计，
      dbtj: false, // 督办统计，
      bmtj: false, //部门统计,
      power: false,
    };
  },
  created() {
    // this.getDept();
    this.getProjectStatistics();
    // this.getTaskStatistics();
    this.init();
    this.power = dsf.util
      .loadSessionStore("user")
      ?.privileges.some((item) => item.name === "是否显示督办立项");
  },
  methods: {
    // getDept() {
    //   dsf.http.post("/ctrl/superviseV6/m/list/dept").then((res) => {
    //     if (res.data.code == 200) {
    //       this.depts = [...this.depts, ...res.data.data];
    //     }
    //   });
    // },
    chooseTime(item) {
      this.currentTime = item.value;
      // this.getTaskStatistics();
      this.getProjectStatistics();
    },
    // chooseDept(item) {
    //   this.currentDept = item.id;
    //   this.getTaskStatistics();
    // },
    init() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/customStatic/getApprovalType")
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            const { codeList, endDate, showType, startDate } = res.data.data;
            if (!self.power) {
              this.active = 1;
            }
            if (showType.includes("pstj")) {
              self.pstj = true;
            } else if (showType.includes("dbtj")) {
              self.dbtj = true;
            } else if (showType.includes("bmtj")) {
              self.bmtj = true;
            }
            self.endDate = endDate;
            self.startDate = startDate;
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
    getProjectStatistics() {
      // 立项统计
      let loadingIndx = dsf.layer.loading();
      dsf.http
        .post("/ctrl/superviseV6/m/statistics/project", {
          dateType: this.currentTime,
        })
        .then((res) => {
          if (res.data.code == 200) {
            let { feedBack, pInfo, task } = res.data.data;
            this.fkqk[0].num = feedBack.normal;
            this.fkqk[1].num = feedBack.over;
            this.fkqk[2].num = feedBack.overNo;

            this.xmqk[0].num = pInfo.sum;
            this.xmqk[1].num = pInfo.close;
            this.xmqk[2][0].num = pInfo.process;
            this.xmqk[2][1].num = pInfo.over;

            this.completion[0].num = Number(pInfo.ldps.split("%")[0]);
            this.completion[1].num = Number(pInfo.zywj.split("%")[0]);
            this.completion[2].num = Number(pInfo.zysx.split("%")[0]);
            this.completion[3].num = Number(pInfo.jjsx.split("%")[0]);

            this.deptBarChart.xAxis.data = task.dept.map(
              (item) => item.deptName
            );
            this.deptBarChart.series[0].data = task.dept.map(
              (item) => item.wait
            );
            this.deptBarChart.series[1].data = task.dept.map(
              (item) => item.process
            );

            this.allPieChart.series[0].data[0].value = task.wait;
            this.allPieChart.series[0].data[1].value = task.process;

            this.zbrw[0].num = task.sum;
            this.zbrw[1].num = task.process;
            this.zbrw[2].num = task.wait;
          }
        })
        .always(() => {
          dsf.layer.closeLoading(loadingIndx);
        });
    },
    getTaskStatistics() {
      // 办理统计
      let loadingIndx = dsf.layer.loading();
      dsf.http
        .post("/ctrl/superviseV6/m/statistics/task", {
          dateType: this.currentTime,
          deptId: this.currentDept,
        })
        .then((res) => {
          dsf.layer.closeLoading(loadingIndx);
          if (res.data.code == 200) {
            let { feedBack, task } = res.data.data;
            this.blfkqk[0].num = feedBack.normalNo;
            this.blfkqk[1].num = feedBack.normal;
            this.blfkqk[2].num = feedBack.over;
            this.blfkqk[3].num = feedBack.overNo;

            this.dbrw[0].num = task.wait;
            this.dbrw[1].num = task.process;
            this.dbrw[2].num = task.close;
            this.dbrw[3].num = task.over;
          }
        });
    },
    toDefaultlist(item) {
      console.log(item, "item");
      let type = 1;
      let listId = "";
      let title = "";
      if (item.label == "总计") {
        type = 0;
        listId = "240112104602H9GKxWSPL5yk5Y8nlek";
        title = "督办立项跟踪";
      } else if (item.label == "项目") {
        type = 1;
        listId = "240112104602H9GKxWSPL5yk5Y8nlek";
        title = "督办立项跟踪";
      } else if (item.label == "办结") {
        type = 2;
        title = "督办任务管理";
        listId = "240112104602H9GKxWSPL5yk5Y8nlek";
      } else if (item.label == "在办") {
        type = 3;
        title = "督办立项跟踪";
        listId = "240112104602H9GKxWSPL5yk5Y8nlek";
      } else if (item.label == "超期") {
        type = 4;
        title = "督办立项跟踪";
        listId = "240112104602H9GKxWSPL5yk5Y8nlek";
      } else if (item.label == "待接收") {
        type = 1;
        title = "督办任务管理";
        listId = "240112105555B3MI0kM3usDwJA4Pzfy";
      } else if (item.label == "已办结") {
        type = 3;
        title = "督办任务管理";
        listId = "240112105555B3MI0kM3usDwJA4Pzfy";
      } else if (item.label == "办理中") {
        type = 2;
        title = "督办任务管理";
        listId = "240112105555B3MI0kM3usDwJA4Pzfy";
      } else if (item.label == "已超期") {
        type = 4;
        title = "督办任务管理";
        listId = "240112105555B3MI0kM3usDwJA4Pzfy";
      }
      let obj = JSON.stringify({
        type: type,
        dateType: this.startDate,
        deptId: this.endDate,
        mobile: 1,
      });
      this.$router.push({
        path: `/commonList/${listId}/2106021016102xjgjpCc6tqdMZkrX20?title=${title}`,
        query: {
          secQuery: obj,
        },
      });
    },
    confirmDate(date) {
      let [start, end] = date;
      this.dateShow = !this.dateShow;
      this.startDate = dsf.date.format(start, "yyyy-mm-dd");
      this.endDate = dsf.date.format(end, "yyyy-mm-dd");
      this.getDbStatis();
      this.getBmStatis();
      this.getPsStatis();
    },
    chooseDate() {
      this.dateShow = !this.dateShow;
      this.$nextTick(() => {
        this.$refs.calendar.scrollToDate(new Date());
      });
    },
    chartsStatisticsLE(data) {
      var chartDom = document.getElementById("chartsStatisticsLE");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          //   orient: "vertical",
          left: "center",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data,
            bottom: "-20%",
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    chartsStatisticsRI(data) {
      var chartDom = document.getElementById("chartsStatisticsRI");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          //   orient: "vertical",
          left: "center",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            bottom: "-20%",
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    getPsStatis() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/customStatic/getPsStatis", {
          startDate: self.startDate,
          endDate: self.endDate,
          type: -1,
        })
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            self.pstj = true;
            const { psData, dbData } = res.data.data;
            self.chartsStatisticsLE([
              {
                value: psData[0].value,
                name: psData[0].name,
                itemStyle: { color: "#5087EC" },
              },
              {
                value: psData[1].value,
                name: psData[1].name,
                itemStyle: { color: "#68BAC5" },
              },
            ]);
            self.chartsStatisticsRI([
              {
                value: dbData[0].value,
                name: dbData[0].name,
                itemStyle: { color: "#008CFF" },
              },
              {
                value: dbData[1].value,
                name: dbData[1].name,
                itemStyle: { color: "#FEAC00" },
              },
              {
                value: dbData[2].value,
                name: dbData[2].name,
                itemStyle: { color: "#FFE286" },
              },
            ]);
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .catch((err) => {
          dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
    getDbStatis() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/customStatic/getDbStatis", {
          startDate: self.startDate,
          endDate: self.endDate,
          type: -1,
        })
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            self.dbtj = true;
            const { allNum, djsNum, zbNum, ybNum, cqNum } = res.data.data;
            self.dbrw.forEach((item) => {
              if (item.label == "总计") {
                item.num = allNum;
              } else if (item.label == "待接收") {
                item.num = djsNum;
              } else if (item.label == "办理中") {
                item.num = zbNum;
              } else if (item.label == "已办结") {
                item.num = ybNum;
              } else {
                item.num = cqNum;
              }
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
    getBmStatis() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("fn/customStatic/getBmStatis", {
          startDate: self.startDate,
          endDate: self.endDate,
          type: -1,
        })
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            self.bmtj = true;
            const { data } = res.data;
            self.blfkqk = [];
            data.forEach((item) => {
              self.blfkqk.push({
                label: item.orgName,
                totalApp: item.allNum,
                curApp: item.djsNum,
                zb: item.zbNum,
                yb: item.ybNum,

                cq: item.cqNum,
              });
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
  },
  watch: {
    active(n, o) {
      if (n == 1) {
        this.getDbStatis();
        this.getBmStatis();
        setTimeout(() => {
          this.getPsStatis();
        }, 10);
      }
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";
.container {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .charts {
    overflow: auto;
    flex: 1;
    padding: 16px;
  }
  .screen {
    padding: 16px;
    &:not(:first-of-type) {
      margin-top: 16px;
    }
    .title {
      font-size: var(--font_size_2);
      font-weight: 600;
      border-left: 5px solid;
      @include border-color-theme("normal");
      padding-left: 6px;
    }
    .dateRange {
      display: flex;
      align-items: center;
      .line {
        width: 20px;
        height: 1px;
        background: #cecece;
        margin: 0 15px;
      }
      ::v-deep .van-field__control {
        height: 0.72rem;
        border: 1px solid #ebedf0;
        border-radius: 2px;
        padding-left: 0.2rem;
      }
    }
    border-bottom: 10px solid #f5f5f5;
    padding: 5px 10px;
    .screen-item {
      display: inline-block;
      min-width: 60px;
      color: #999;
      border: 1px solid #ddd;
      border-radius: 30px;
      font-size: 13px;
      text-align: center;
      padding: 0 5px;
      line-height: 25px;
      margin: 5px;
    }
    .choose-item {
      @include background-theme("normal");
      color: #fff;
      border: 0;
    }
    .dept {
      display: flex;
      overflow: auto;
      span {
        flex-shrink: 0;
      }
    }
  }
  .taizhang {
    // padding: 16px;
    &:not(:first-of-type) {
      margin-top: 16px;
    }
    .title {
      font-size: var(--font_size_2);
      font-weight: 600;
      border-left: 5px solid;
      @include border-color-theme("normal");
      padding-left: 6px;
    }
    .box {
      //   height: 200px;
      //   display: flex;
      //   align-items: center;
      .left,
      .right {
        // flex: 1;
        height: 180px;
      }
    }
  }
  .module {
    &:not(:first-of-type) {
      margin-top: 16px;
    }
    .title {
      font-size: var(--font_size_2);
      font-weight: 600;
      border-left: 5px solid;
      @include border-color-theme("normal");
      padding-left: 6px;
    }
  }
  .blocks {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .grey-block {
      border-radius: 3px;
      padding: 20px;
      margin-top: 16px;
      background-color: #fafafa;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      i {
        display: inline-block;
        font-size: 25px;
        margin-bottom: 8px;
      }
    }
  }
  .num {
    font-size: 30px;
  }
  .bmtj {
    &:not(:first-of-type) {
      margin-top: 16px;
    }
    .title {
      font-size: var(--font_size_2);
      font-weight: 600;
      border-left: 5px solid;
      @include border-color-theme("normal");
      padding-left: 6px;
    }
    .keys {
      color: gray;
    }
    .values {
      font-weight: bolder;
    }
    .keys,
    .values {
      display: flex;
      justify-content: space-around;
      align-content: center;
      align-items: center;
      padding: 10px 0;
      > div {
        text-align: center;
      }
    }
  }
  .feedback-block {
    background-color: #fafafa;
    text-align: center;
    padding: 12px;
    margin-top: 16px;
    .flex {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}
.charts-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.van-tabbar {
  height: 60px;
  box-shadow: 0 -2px 8px 0 rgba(212, 213, 216, 0.5);
  ::v-deep .van-tabbar-item__text {
    font-size: var(--font_size_4);
  }
}
</style>