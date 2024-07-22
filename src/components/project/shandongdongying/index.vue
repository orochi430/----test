<template>
  <div class="sddyIndex">
    <app-swiper-iframe
      :swiper="appSwiper"
      v-if="swiperIframe"
    ></app-swiper-iframe>
    <app-swiper :swiper="appSwiper"></app-swiper>
    <div class="zhdc">

      <div class="dataBusClass content_div">
        <p class="analysisTitle">
          <span>数据公务舱</span>
          <i></i>
        </p>
        <div class="assort">
          <div class="data-show">
            <!-- <div class="left-data">
              <div class="legend">
                <div class="PercentageData">25%</div>
                <div class="legendName">数据指标</div>
                <div
                  class="legendIcon"
                  style="background-color: rgb(51, 214, 149)"
                ></div>
              </div>
              <div class="legend">
                <div class="PercentageData">25%</div>
                <div class="legendName">数据指标</div>
                <div
                  class="legendIcon"
                  style="background-color: rgb(5, 160, 154)"
                ></div>
              </div>
            </div> -->
            <div class="center-data">
              <div id="dataPieChart"></div>
              <img
                src="../../../../static/images/shandongdongying/bing-bg.png"
              />
            </div>
            <!-- <div class="right-data">
              <div class="legend">
                <div class="PercentageData">25%</div>
                <div class="legendName">数据指标</div>
                <div
                  class="legendIcon"
                  style="background-color: rgb(247, 181, 0)"
                ></div>
              </div>
              <div class="legend">
                <div class="PercentageData">25%</div>
                <div class="legendName">数据指标</div>
                <div
                  class="legendIcon"
                  style="background-color: rgb(37, 134, 245)"
                ></div>
              </div>
            </div> -->
          </div>
          <div class="buttons">
            <div
              class="btn"
              :class="current_type == index ? 'selectBt' : ''"
              @click="eachModuleBt(item, index)"
              v-for="(item, index) in bts"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>

      <ul class="summary clearfix">
        <li
          v-for="(item, index) in dataByLedger"
          :key="index"
          @click="enterLedger(item)"
        >
          <div
            :id="'particles-js' + (index + 1)"
            class="particles-js"
            style="display: flex; align-items: center; justify-content: center"
          >
            <canvas class="particles-js-canvas-el"></canvas>
          </div>
          <div class="summary_content">
            <div class="summary_content_num">
              <!-- <span>{{ item.processing }}/{{ item.total }}</span> -->
              <!-- 需要改成办结多少件 共多少件 -->
              <div>
                <span>{{ item.nameValue }}</span>
                <span>{{ item.nameValues }}</span>
              </div>
              <van-circle
                v-model="$data['currentRate' + (index + 1)]"
                :rate="per(item)"
                :speed="100"
                :stroke-width="60"
                layer-color="#6876B2"
                :color="item.color"
                :text="per(item) ? per(item) + '%' : 0 + '%'"
              />
            </div>
            <div class="summary_content_title">
              {{ item.typeName }}
            </div>
          </div>
        </li>
      </ul>
      <!-- 日历选择 -->
      <div
        class="datatime"
        @click="showPopup"
        id="default_drag_comp"
        @touchstart="down($event)"
        @touchmove="move($event)"
        @touchend="end"
      >
        <!-- 图标 -->
        <van-icon name="notes-o" class="icons" size="30"/>
        <p>{{ this.year }}</p>
      </div>
      <ul class="assort clearfix" id="linear">
        <li
          v-for="(item, index) in dataByColumn"
          :index="index"
          :key="index"
          :class="{ noBottom: index > 3 }"
          @click="enterColumn(item)"
        >
          <p class="assort_name">{{ item.typeName }}</p>
          <p class="assort_img">
            <span></span>
          </p>
          <p class="assort_num">{{ item.count }}</p>
        </li>
      </ul>

      <div class="dataAnalysis content_div">
        <p class="analysisTitle">
          <span>数据分析</span>
          <i></i>
        </p>
        <ul class="clearfix">
          <li
            class="dataAnalysis_li"
            v-for="(item, index) in dataByStage"
            :index="index"
            :key="index"
            @click="enterStage(item)"
          >
            <div class="item-icon fl">
              <div class="item-icon-top" />
              <div class="item-icon-h1" />
              <div class="item-icon-h2" />
            </div>
            <div class="fl item_content">
              <p>{{ item.count }}</p>
              <p>{{ item.typeName }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="statisAnalysis content_div">
        <p class="analysisTitle">
          <span>统计分析</span>
          <i></i>
        </p>
        <div class="gengduo">
          <div class="duo" @click="more">更多</div>
          <div id="statisLine"></div>
        </div>

      </div>

      <div class="infoMessage content_div">
        <p class="analysisTitle">
          <span>信息专报</span>
          <i></i>
        </p>
        <DYTabs></DYTabs>
      </div>
    </div>
    <!-- 日历 -->
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        title="选择年份"
        :default-index="1"
        show-toolbar
        :columns="columns"
        @cancel="show = false"
        @confirm="make"
      >
      </van-picker>
    </van-popup>
  </div>
</template>
<script>
import echarts from "echarts";
import { mapState } from "vuex";
import appSwiper from "@/components/documentCenter/appSwiper.vue";
import appSwiperIframe from "@/components/documentCenter/appSwiperIframe";
import DYTabs from "@/components/framePage/controls/DYTabsComponents.vue";
export default {
  name: "sddyindex",
  data() {
    return {
      // 年份选择数据
      show: false,
      columns:[2022],
      //拖拽
      flags: false, //是否开启拖拽
      position: { x: 0, y: 0 },
      nx: "", //鼠标移动X
      ny: "", //鼠标移动Y
      dx: "", //鼠标按下X轴
      dy: "", //鼠标按下Y轴
      maxW: 0, //可视窗口宽
      maxH: 0, //可是窗口高
      currentRate1: 0,
      currentRate2: 0,
      currentRate3: 0,
      currentRate4: 0,
      year: "年度",
      ye:"",
      dataByLedger: [],
      dataByColumn: [],
      dataByStage: [],
      dataByOrg: [],
      appSwiper: dsf.config.appSwiper || {},
      swiperIframe: false,
      lbKey: " ",
      dataA: [
        { value: 0.25, name: "经济运行指标" },
        { value: 0.25, name: "数据指标2" },
        { value: 0.25, name: "数据指标4" },
        { value: 0.25, name: "数据指标3" },
      ],
      isSeleted: false,
      bts: ["经济运行指标", "项目建设", "双招双引", "数据链接"],
      current_type: -1,
    };
  },

  components: {
    DYTabs,
    appSwiper,
    appSwiperIframe,
  },
  computed: {
    per() {
      return (item) => {
        return parseInt((item.processing / item.total) * 100);
      };
    },
    ...mapState({
      appFooter: (state) => state.appFooter,
    }),
  },
  methods: {
    // 日历弹窗
    showPopup() {
      this.show = true;
    },
    make(value) {
      // 获取年份重新赋值
      //let newstr = moment(value).format("YYYY");
      if(value == '年度'){
        this.ye = ''
      }else{
        this.ye = value;
      }
      this.year = value;
      this.dataByLedger = [];
      this.getDataByLedger();
      this.getDataByColumn();
      this.getDataByStage();
      this.getDataByOrg();
      this.chartsInit(this.dataA);
      this.show = false;
    },
    down(event) {
      this.flags = true; //鼠标按下开启拖拽
      var touch;
      if (event.touches) {
        touch = event.touches[0]; //通过event.touches[0]拿到鼠标按下的数据
      }
      this.dx = touch.clientX; //将鼠标按下的X轴数据存储data
      this.dy = touch.clientY; //将鼠标按下的Y轴数据存储data
    },
    move(event) {
      event.preventDefault(); //方法阻止元素发生默认的行为。
      let default_drag_comp = document.querySelector("#default_drag_comp");
      if (this.flags) {
        //判断用户是否在拖拽  如果拖拽
        var touch;
        if (event.touches) {
          touch = event.touches[0]; //将拖拽的数据赋值给touch
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        //左右范围
        //console.log(this.nx,this.ny,'左右范围')
        if (this.nx < 40) {
          //设置拖动范围   不可以拖动到可是窗口外 当拖动X轴小于0时说明已经拖出去了  就将X轴赋值为0
          this.nx = 40;
        } else if (this.nx > this.maxW) {
          //如果大于可视窗口宽时将可视窗口宽赋值给X轴
          this.nx = this.maxW - 20;
        }
        //上下范围
        if (this.ny < 30) {
          //设置拖动范围   不可以拖动到可是窗口外 当拖动X轴小于0时说明已经拖出去了  就将Y轴赋值为0
          this.ny = 30;
        } else if (this.ny >= this.maxH) {
          //如果大于可视窗口高时将可视窗口宽赋值给X轴
          this.ny = this.maxH - 20;
        }
        default_drag_comp.style.left = this.nx - 30 + "px"; //将拖拽的X轴赋值给div
        default_drag_comp.style.top = this.ny - 30 + "px"; //将拖拽的Y轴赋值给div
      }
    },
    end() {
      this.flags = false;
    },
    particles(id) {
      particlesJS(id, {
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#4088f8",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 5,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#4088f8",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
        config_demo: {
          hide_card: false,
          background_color: "#b61924",
          background_image: "",
          background_position: "50% 50%",
          background_repeat: "no-repeat",
          background_size: "cover",
        },
      });
    },
    getDataByLedger() {
      let this_ = this
      let color = [
        { "0%": "#0EBBF9", "100%": "#016DF6" },
        { "0%": "#EBEC00", "100%": "#48C700" },
        { "0%": "#0EEB73", "100%": "#06A35C " },
        { "0%": "#F85252 ", "100%": "#921818" },
      ];
      dsf.http
        .post("/fn/dyswdcPortal/getDataByLedger", { year: this.ye })
        .done((res) => {
          if (res.code == "200" && res.data) {
            res.data.forEach((item, index) => {
              item.color = color[index];
            });
            res.data.forEach(function (item){
              let str ={
                  appConditions:item.appConditions,
                  appUrl:item.appUrl,
                  color:item.color,
                  pcUrl:item.pcUrl,
                  processing:item.processing,
                  total:item.total,
                  typeName:item.typeName,
                  typeValue:item.typeValue,
                  nameValue:"办结"+item.processing+"件",
                  nameValues:'共'+item.total+'件',
              }
              this_.dataByLedger.push(str)
            })
            this.$nextTick(() => {
              res.data.forEach((item, index) => {
                this.particles(`particles-js${index + 1}`);
              });
            });
          }
        });
    },
    getDataByColumn() {
      dsf.http
        .post("/fn/dyswdcPortal/getDataByColumn", { year: this.ye })
        .done((res) => {
          if (res.code == "200" && res.data) {
            this.dataByColumn = res.data;
          }
        });
    },
    getDataByStage() {
      dsf.http
        .post("/fn/dyswdcPortal/getDataByStage", { year: this.ye })
        .done((res) => {
          if (res.code == "200" && res.data) {
            this.dataByStage = res.data;
          }
        });
    },
    getDataByOrg() {
      dsf.http
        .post("/fn/dyswdcPortal/getDataByOrg", { year: this.ye })
        .done((res) => {
          if (res.code == "200" && res.data) {
            this.dataByOrg = res.data.sortList;
            let xName = [];
            let dbjCount = [];
            let csCount = [];
            this.dataByOrg.forEach((item) => {
              xName.push(item.orgName);
              dbjCount.push(item.dbjCount);
              csCount.push(item.csCount);
            });
            this.orgEcharts(xName, dbjCount, csCount);
          }
        });
    },
    orgEcharts(xName, dbjCount, csCount) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("statisLine"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: 16,
          left: "8%",
          right: "4%",
          bottom: "27%",
        },
        xAxis: [
          {
            type: "category",
            data: xName,
            axisLabel: {
              interval: 0, //横轴信息全部显示
              // rotate: -45, //倾斜度 -90 至 90 默认为0
              //margin: 5, //刻度标签与轴线之间的距离
              formatter: function (params) {
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 2; //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = "";
                    var start = p * provideNumber;
                    var end = start + provideNumber;
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      tempStr = params.substring(start, end) + "\n";
                    }
                    newParamsName += tempStr;
                  }
                } else {
                  newParamsName = params;
                }
                return newParamsName;
              },
            },
          },
        ],
        color: ["#3092EF", "#F75353"],
        yAxis: {
          splitLine: {
            show: true,
          },
        },
        series: [
          {
            name: "督办件",
            type: "bar",
            data: dbjCount,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#146FF9" },
                  { offset: 1, color: "#14C7F9" },
                ]),
              },
            },
          },
          {
            name: "超时件",
            type: "bar",
            data: csCount,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FC8B8B" },
                  { offset: 1, color: "#F94040" },
                ]),
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      window.onresize = myChart.resize;
    },
    enterLedger(item) {
      this.$router.push({
        path: "/commonList",
        query: {
          fileType: "ledger_dy",
          year: this.year,
          title: item.typeName,
          secQuery: JSON.stringify(item.appConditions),
        },
      });
    },
    enterColumn(item) {
      let url = "/commonList";
      this.$router.push({
        path: url,
        query: {
          fileType: "column_dy",
          year: this.year,
          title: item.typeName,
          secQuery: JSON.stringify(item.appConditions),
        },
      });
    },
    enterStage(item) {
      this.$router.push({
        path: "/commonList",
        query: {
          fileType: "stage_dy",
          year: this.year,
          title: item.typeName,
          secQuery: JSON.stringify(item.appConditions),
        },
      });
      //   if(item.typeValue=='-1'){

      //   }
      //   else{
      //     let typeValue = '';
      //     let key = '';
      //     let json = {};
      //     if(item.typeValue=='1'||item.typeValue=='2'){
      //       typeValue = item.typeValue;
      //       key = 'query_220908110611rTs8URMKf9LUxBxSEt2';
      //     }else if(item.typeValue=='3'){
      //       typeValue = '2';
      //       key = 'query_220906221458MXXAe2cxolDxbr5idAS'
      //     }
      //     json[key] = typeValue
      //     this.$router.push({
      //       path:'/commonList',
      //       query:{
      //          fileType:'stage_dy',
      //         'year':this.year,
      //         title:item.typeName,
      //         secQuery:JSON.stringify(json)
      //       }
      //     });
      //   }
    },
    chartsInit(data) {
      var chartDom = document.getElementById("dataPieChart");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "item",
           //提示图层关闭
          show: false,
        },
        color: [
          "rgb(247, 181, 0)",
          "rgb(37, 134, 245)",
          " rgb(5, 160, 154)",
          "rgb(51, 214, 149)",
        ],
        series: [
          {
            name: "数据分析",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    more(){
      this.$router.push({
        path:"/tasklist"
      })
    },
    eachModuleBt(value, index) {
      this.current_type = index;
      if (index == 3) {
        // location.href = "http://dyzwfw.sd.gov.cn/dy/public/index ";
        // 跳转的列表
        this.$router.push({
          path:"/commonList",
          query:{
            fileType:"information_dy"
          }
        })
      }else if(index==1){
           this.$router.push({
            name: "dyProjectConstrut",
            query: {
                title: value,
                moduleIdx: index,
            },
            });
      } else {
        this.$router.push({
          name: "dyEachModule",
          query: {
            title: value,
            moduleIdx: index,
          },
        });
      }
    },
    yeOl(){
    this.columns.push('年度')
    this.columns.reverse()
    let arrs = this.columns.slice(0)
    this.year = arrs[0]
    },
  },
  created() {
    dsf.loadJs("static/js/zhdc_dy/particles.min.js").then(() => {});
  },
  mounted() {
    //默认当前年份市2022年  获得年份暂停
    let yearValue = new Date().getFullYear();
    let Section = yearValue-2022
    for(let key = 0;key < Section;key++){
      this.columns.push(yearValue)
    }
    this.yeOl();
    this.getDataByLedger();
    this.getDataByColumn();
    this.getDataByStage();
    this.getDataByOrg();
    this.chartsInit(this.dataA);
    this.appFooter.forEach((item) => {
      item.components.forEach((ele) => {
        if (ele.name == "CarouselComponents") {
          this.lbKey = ele.params.lbKey;
        }
      });
    });
    if (
      this.lbKey &&
      (this.lbKey.indexOf("http") > -1 || this.lbKey.indexOf("https") > -1)
    ) {
      this.swiperIframe = true;
      this.appSwiper.url = this.lbKey;
    } else {
      this.appSwiper.url = "/fn/mobilecarousel/getcarousel?lbkz=" + this.lbKey;
    }

    this.maxW = document.documentElement.clientWidth; //获取可视窗口宽
    this.maxH = document.documentElement.clientHeight; //获取可视窗口高
  },
};
</script>
<style lang="scss" scoped>

.sddyIndex {
  .zhdc {
    padding: 0 10px;
    box-sizing: border-box;
    font-family: Digiface;

    .summary {
      margin-top: 10px;
      li {
        float: left;
        width: calc(50% - 5px);
        height: 100px;
        display: block;
        position: relative;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-of-type(even) {
          margin-right: 0;
        }

        .particles-js {
          background-color: #142b86;
          z-index: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: 50% 50%;
          background-repeat: no-repeat;
          border-radius: 6px;
        }

        .summary_content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          color: #31e8ff;
          padding: 0 10px;

          .summary_content_num {
            height: 50px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            font-size: 0.26rem;
            font-family: PingFangSC-Regular;
          }

          .summary_content_title {
            color: #fff;
            font-size: 0.31rem;
          }
        }

        &:nth-of-type(2) {
          .summary_content {
            color: #ebec00;
          }
        }

        &:nth-of-type(3) {
          .summary_content {
            color: #0eeb73;
          }
        }

        &:nth-of-type(4) {
          .summary_content {
            color: #ff5656;
          }
        }
      }
    }
    #linear{
      background-image: linear-gradient(0deg, #F0F8FE 0%, #FFFFFF 96%);
    }
    .assort {
      margin-top: 5px;
      padding: 20px 10px;
      background: #ffffff;
      box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.12);
      border-radius: 6px;
      border-radius: 6px;
      li {
        float: left;
        width: 25%;
        //height: 100px;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
        &:nth-of-type(4) {
        border-right: none;
        }
        &:nth-of-type(8) {
        border-right: none ;
        }
        &:nth-of-type(9) {
        border-bottom: none ;
        }
        &:nth-of-type(10) {
        border-bottom: none ;
        }

        .assort_num {
          font-size: var(--font_size_0);
          color: #146ff9;
        }

        .assort_name {
          margin: 10px 0;
          white-space: nowrap;
        }

        .assort_img {
          display: inline-block;
          width: 60px;
          height: 30px;
          line-height: 30px;
          margin-bottom: 10px;
          border-radius: 16px;
          box-shadow: inset 0 0 10px 0 #0091ff;

          span {
            display: inline-block;
            width: 22px;
            height: 22px;
            vertical-align: middle;
            background: url("../../../../static/images/shandongdongying/module10.png")
              no-repeat center;
            background-size: contain;
          }
        }

        @for $i from 1 to 10 {
          &:nth-of-type(#{$i}) {
            .assort_img {
              span {
                background-image: url("../../../../static/images/shandongdongying/module#{$i}.png");
              }
            }
          }
        }
      }

    }
    .content_div {
      margin-top: 20px;
    }
    .analysisTitle {
      display: inline-block;
      margin-bottom: 8px;

      span {
        font-size: 24px;
        color: #333;
        font-weight: bold;
        margin-left: 5px;
      }

      i {
        display: inline-block;
        width: 100%;
        height: 6px;
        padding: 0 5px 0 10px;
        background-image: linear-gradient(270deg, #e3edfc 0%, #146ff9 100%);
      }
    }

    .dataAnalysis {
      ul {
        padding: 8px 0;
        background: #fff;
      }
      .dataAnalysis_li {
        float: left;
        width: calc(50% - 5px);
        height: 90px;
        display: block;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 6px;
        background: url("../../../../static/images/shandongdongying/tg-bg1.png")
          no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

        &:nth-of-type(even) {
          margin-right: 0;
        }

        .item-icon {
          margin: 0 18px;
          width: 60px;
          height: 50px;
          position: relative;
          animation: iconIn 1.5s 1;
        }

        @keyframes iconIn {
          0% {
            transform: scale(0);
          }

          80% {
            transform: scale(1.2);
          }

          100% {
            transform: scale(1);
          }
        }

        .item-icon-top {
          width: 24px;
          height: 24px;
          position: absolute;
          left: 18.5px;
          z-index: 3;
          animation: iconUpDown 2s 1.5s infinite;
        }

        @keyframes iconUpDown {
          0% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }

          100% {
            transform: translateY(0);
          }
        }

        .item-icon-h1 {
          width: 60px;
          height: 35px;
          position: absolute;
          top: 10px;
          z-index: 1;
        }

        .item-icon-h2 {
          width: 45px;
          height: 22.5px;
          top: 10px;
          left: 7px;
          position: absolute;
          z-index: 2;
          animation: iconUpDown 2s 1.5s infinite;
        }

        &:nth-of-type(1) {
          .item-icon-top {
            background-image: url("../../../../static/images/shandongdongying/i-duban.png");
            background-repeat: no-repeat;
            background-size: 20px;
          }

          .item-icon-h1 {
            background-image: url("../../../../static/images/shandongdongying/h1-wancheng.png");
            background-repeat: no-repeat;
          }

          .item-icon-h2 {
            background-image: url("../../../../static/images/shandongdongying/h2-wancheng.png");
            background-repeat: no-repeat;
          }

          p {
            &:nth-of-type(1) {
              color:#0bdc8c;
            }
          }
        }

        &:nth-of-type(2) {
          .item-icon-top {
            background-image: url("../../../../static/images/shandongdongying/i-jinxing.png");
            background-repeat: no-repeat;
            left: 20.5px;
          }

          .item-icon-h1 {
            background-image: url("../../../../static/images/shandongdongying/h1-jinxing.png");
            background-repeat: no-repeat;
          }

          .item-icon-h2 {
            background-image: url("../../../../static/images/shandongdongying/h2-jinxing.png");
            background-repeat: no-repeat;
          }

          p {
            &:nth-of-type(1) {
              color: #efcc24;
            }
          }
        }

        &:nth-of-type(3) {
          margin-bottom: 0;
          .item-icon-top {
            background-image: url("../../../../static/images/shandongdongying/i-wancheng.png");
            background-repeat: no-repeat;
            background-size: 20px;
          }

          .item-icon-h1 {
            background-image: url("../../../../static/images/shandongdongying/h1-duban.png");
            background-repeat: no-repeat;
          }

          .item-icon-h2 {
            background-image: url("../../../../static/images/shandongdongying/h2-duban.png");
            background-repeat: no-repeat;
          }

          p {
            &:nth-of-type(1) {
              color: #31e8ff;
            }
          }
        }

        &:nth-of-type(4) {
          margin-bottom: 0;
          .item-icon-top {
            background-image: url("../../../../static/images/shandongdongying/i-chaoshi.png");
            background-repeat: no-repeat;
          }

          .item-icon-h1 {
            background-image: url("../../../../static/images/shandongdongying/h1-chaoshi.png");
            background-repeat: no-repeat;
          }

          .item-icon-h2 {
            background-image: url("../../../../static/images/shandongdongying/h2-chaoshi.png");
            background-repeat: no-repeat;
          }

          p {
            &:nth-of-type(1) {
              color: #fd6969;
            }
          }
        }

        .item_content {
          p {
            &:nth-of-type(1) {
              font-size: var(--font_size_0);
              margin-top: -12px;
              margin-bottom: 7px;
            }
          }
        }
      }
    }

    .statisAnalysis {
      .gengduo{
        width: 100%;
        background: white;
        .duo{
          text-align: right;
          margin-right: 8px;
          font-size: 15px;
        }
      }

    }
    #statisLine {
      width: 100%;
      height: 270px;
      padding: 8px 0;
      background: #fff;
    }
    .infoMessage {
      margin-top: 20px;
      ::v-deep .card {
        background: #ffffff;
        margin: 0.2rem 0 0.2rem 0;

        .top {
          .tags:first-child {
            // font-size: 0.48rem;
            border-left: 5px solid #b50009;
            padding-left: 0;
          }
        }
      }
    }
    .dataBusClass {
      .data-show {
        display: flex;
        align-content: center;
        justify-content: space-around;
        margin-bottom: 20px;
        .legend {
          display: flex;
          flex-direction: column;
          margin-bottom: 30px;
        }
        .left-data {
          .legend {
            align-items: flex-start;
          }
        }
        .right-data {
          .legend {
            align-items: flex-end;
          }
        }
        .PercentageData {
          font-family: Digiface;
          font-size: var(--font_size_0);
          color: #146ff9;
          letter-spacing: 0;
          text-align: center;
          line-height: 20px;
          margin-bottom: 4px;
        }

        .legendName {
          font-family: PingFangSC-Regular;
          font-size: var(--font_size_2);
          color: #333;
          text-align: center;
          margin-bottom: 5px;
        }

        .legendIcon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .center-data {
          position: relative;
        }

        #dataPieChart {
          width: 186px;
          height: 186px;
          z-index: 1;
        }
        .center-data img {
          position: absolute;
          top: 0;
          width: 186px;
          height: 186px;
          animation: imgRote 8s cubic-bezier(0.31, 0.31, 0.56, 0.55) infinite;
        }

        @keyframes imgRote {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
      .buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-around;
        cursor: pointer;
      }

      .btn {
        margin-bottom: 20px;
        font-family: PingFangSC-Medium;
        font-size: 15px;
        text-align: center;
        width: 150px;
        height: 34px;
        line-height: 34px;
        user-select: none;
        background: #fff;
        border: 1px solid #2a89ef;
        box-shadow: inset 0 0 10px 0 #146ff9;
        border-radius: 39.5px;
        color: #2a89ef;
        box-sizing: content-box;
      }
      .selectBt {
        color: #ffffff;
        background: #146ff9;
      }

      .btn:nth-of-type(3),
      .btn:nth-of-type(4) {
        margin-bottom: 0;
      }
    }
  }

  ::v-deep .van-swipe {
    margin: 0.2rem 0.2rem 0.2rem 0.2rem;
  }
}
</style>
<style lang="scss">
.zhdc {
  .summary {
    li {
      .summary_content {
        .van-circle {
          width: 40px;
          height: 40px;
        }

        .van-circle__text {
          color: #31e8ff;
        }
      }

      &:nth-of-type(2) {
        .summary_content {
          .van-circle__text {
            color: #ebec00;
          }
        }
      }

      &:nth-of-type(3) {
        .summary_content {
          .van-circle__text {
            color: #0eeb73;
          }
        }
      }

      &:nth-of-type(4) {
        .summary_content {
          .van-circle__text {
            color: #ff5656;
          }
        }
      }
    }
  }
}
.datatime {
  width: 1.2rem;
  height: 50px;
  position: fixed;
  right: -18.8px;
  top: 64%;
  z-index: 10;
  // .icons{
  //   margin-left: 10px;
  // }
}
</style>
