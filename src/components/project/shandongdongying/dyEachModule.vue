<template>
  <div class="eachModule">
    <div>
      <van-row type="flex" justify="center" align="center">
        <van-col :span="12" v-if="titleModel == '经济运行指标'">
          <!-- <van-dropdown-menu>
            <van-dropdown-item
              v-model="chooseArea"
              :options="area"
              @change="changeArea"
            />
          </van-dropdown-menu> -->
          <ul class="ulSheng">
            <li v-for="(item,index) in area" :key="index" >
              <span :class = "current_index == index ? 'actives' :''" @click="change(item)"
              >{{ item.text }}</span>
            </li>
          </ul>
        </van-col>
        <van-col :span="12" v-if="titleModel != '经济运行指标'">
          <van-cell
            is-link
            arrow-direction="down"
            @click="showPopup"
            v-model="choose"
          ></van-cell>
        </van-col>
        <van-col :span="12" v-if="titleModel == '经济运行指标'">
          <van-cell
            is-link
            arrow-direction="down"
            @click="shows=true"
          >{{nianfen}}年</van-cell>
        </van-col>
      </van-row>

      <van-row gutter="20" v-if="whichMod == 0" class="dy-eachMoBt">
        <van-col span="12" v-for="(item, index) in eachModbts" :key="item.id">
          <van-button
            type="info"
            size="normal"
            block
            @click="clikModuBts(item, index)"
            class="bts"
            :class="current_type == index ? 'selectBt' : ''"
          >
            {{ item.text }}</van-button
          >
        </van-col>
      </van-row>
      <van-popup v-model="showData" position="top" v-if="titleModel != '经济运行指标'">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="选择年月"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="selectData"
          @cancel="cancelBt"
        />
      </van-popup>
      <!-- 选择年份 -->
      <van-popup
      v-model="shows"
      round
      position="top"
      v-if="titleModel == '经济运行指标'"
    >
      <van-picker
        title="选择年份"
        show-toolbar
        :columns="columns"
        @cancel="shows = false"
        @confirm="make"
      >
      </van-picker>
      </van-popup>
    </div>
    <div v-if="titleModel != '经济运行指标' && titleModel != '双招双引'">
      <div :class="whichMod != 0 ? 'outOut' : ''" class="dy-imgs">
        <van-row type="flex" justify="center" align="center">
          <van-col>
            <van-image
              fit="contain"
              :src="imgSrc"
              class="imgs"
              ref="imgsRef"
              v-if="totalImgs > 0"
            />
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 切换图表 -->
    <div class="boxB" v-if="titleModel == '经济运行指标'">
      <div ref="div2"  :class="showPrises == true ?'ClassActive': '' "  @click="biaoG">表</div>
      <div ref="div1"  :class="showPrise == true ?'ClassActive': '' " @click="tuB">图</div>
    </div>
    <!-- 柱状图 -->
    <div id="zhuZ" v-show="showPrise"  v-if="titleModel == '经济运行指标'"></div>
    <!-- 表格 -->
    <div  v-show="showPrises" class="tableClass"  v-if="titleModel == '经济运行指标'">
      <div class="tableCla">
        <div>{{ titleName }}</div>
        <div>总量</div>
        <div>增速</div>
        <div v-show="paishow">排名<van-icon name="sort" style="vertical-align: -10%;"  size="15"  @click="sortIcon"/></div>
        <div v-show="paishows">排名<van-icon name="sort" style="vertical-align: -10%;"  size="15"  @click="sortIcons"/></div>
      </div>
        <ul class="ultable">
          <li v-for="(item,index) in regionlist" :key="index" ref="lis" :style="biaoge(item.name)">
            <div>{{ item.name }}</div>
            <div >{{ item.quantityListValue }}</div>
            <div>{{ item.increaseListValue }}</div>
            <div class="border">{{ item.orderListValue }}</div>
          </li>
        </ul>
    </div>
    <!-- 月份 -->
    <div class="divUi"  v-if="titleModel == '经济运行指标'">
      <ul class="Uilist" v-show="yshow">
        <li  class="listClass" :class="isActive == index ?'active':'' "
         v-for="(item,index) in yera" :key="index"  @click="clikMoye(item)">{{ item.ye }}</li>
      </ul>

      <ul class="Uilist" v-show="yshows">
        <li  class="listClass" :class="isActiveValue == index ?'active':'' "
         v-for="(item,index) in yeras" :key="index"  @click="clikMoyes(item)">{{ item.ye }}</li>
      </ul>
    </div>
    <!-- 双招双引模块内容 ********************************************************** -->
    <div class="contract" v-if="titleModel == '双招双引'">
      <span>签约项目</span>
      <div class="tt">
        <div class="tu1" ref="picture1" @click="picture">图</div>
        <div class="tu2" ref="picture2" @click="pictures">表</div>
      </div>
    </div>
    <!--签约 柱状图 -->
    <div v-if="titleModel == '双招双引'" class="shuang">
      <!-- 图 -->
      <div id="qianYue" v-show="picture1" ></div>
      <!-- 表格 -->
      <div v-show="picture2" class="Header">
        <div class="tableHeader">
          <div>地区</div>
          <div>签约个数</div>
          <div>签约金额</div>
          <div>500强目标</div>
          <div>500强签约</div>
        </div>
        <ul class="ulHeader">
          <li v-for="(item,index) in qianYueDong" :style="biaoGe(item.name)" :key="index">
            <div class="fts">{{ item.name }}</div>
            <div>{{ item.qygsListValue }}</div>
            <div>{{ item.qyjeListValue }}</div>
            <div>{{ item.topMbrwListValue }}</div>
            <div class="border">{{ item. topQygsListValue}}</div>
          </li>
        </ul>
      </div>
      <p>{{ qyxmSummary }}</p>
    </div>
    <div class="contract" v-if="titleModel == '双招双引'">
      <span>在建项目</span>
      <div class="tt">
        <div class="tu1" ref="picture3" @click="pictureW">图</div>
        <div class="tu2" ref="picture4" @click="pictureT">表</div>
      </div>
    </div>
    <!--在建 柱状图 -->
    <div v-if="titleModel == '双招双引'" class="shuang">
      <div id="zaiJian" v-show="picture3"></div>
      <div v-show="picture4" class="Headers">
        <div class="tableHeaders">
          <div>地区</div>
          <div>到位资金</div>
          <div>开工个数</div>
          <div>目标任务</div>
        </div>
      <ul class="ulHeaders">
        <li v-for="(item,index) in zaiJianDong" :style="biaos(item.name)" :key="index">
          <div class="fts">{{ item.name }}</div>
          <div>{{ item.dwzjListValue }}</div>
          <div>{{ item.kggsListValue }}</div>
          <div class="border">{{ item.mbrwListValue }}</div>
        </li>
      </ul>
      </div>

      <p>{{ zjxmSummary }}</p>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Pagination } from "vant";
import echarts from "echarts";

Vue.use(Pagination);
export default {
  data() {
    return {
      //下拉选择年份
      color:'red',
      columns:[2022],
      //年份
      nianfen:'',
      //月份
      monthValue:'',
      modelValues:'',
      //区县模块
      moduleId:'',
      //模块名称
      titleName:'省内',
      //小模块id
      formId:'',
      //地区名称
      regionlistName:[],
      //地区对应的总量
      regionlistQuantity:[],
      //半分比
      regionlistIncrease:[],
      //表
      regionlists:[],
      arrval:[],//中转
      //排序后的表
      regionlist:[],
      yearValue:[],
      yshow:true,
      yshows:false,
      yera:[
        {
          ye:'第一季度',
          yevalue:0,
          yetext:'三月',
        },
        {
          ye:'第二季度',
          yevalue:4,
          yetext:'六月',
        },
        {
          ye:'第三季度',
          yevalue:6,
          yetext:'九月',
        },
        {
          ye:'第四季度',
          yevalue:10,
          yetext:'十二月',
        },
      ],
      yeras:[
        {
          ye:'一月',
          yevalue:0,
          yetext:'一月',
        },
        {
          ye:'二月',
          yevalue:1,
          yetext:'二月',
        },
        {
          ye:'三月',
          yevalue:2,
          yetext:'三月',
        },
        {
          ye:'四月',
          yevalue:3,
          yetext:'四月',
        },
        {
          ye:'五月',
          yevalue:4,
          yetext:'五月',
        },
        {
          ye:'六月',
          yevalue:5,
          yetext:'六月',
        },
        {
          ye:'七月',
          yevalue:6,
          yetext:'七月',
        },
        {
          ye:'八月',
          yevalue:7,
          yetext:'八月',
        },
        {
          ye:'九月',
          yevalue:8,
          yetext:'九月',
        },
        {
          ye:'十月',
          yevalue:9,
          yetext:'十月',
        },
        {
          ye:'十一月',
          yevalue:10,
          yetext:'十一月',
        },
        {
          ye:'十二月',
          yevalue:11,
          yetext:'十二月',
        },
      ],
      eachModbts: [],
      eachModbt:[],
      isActive:3,
      isActives:[1,2,3,4,5,6,7,8,9,10,11,12],
      chooseArea: 0,
      isActiveValue:0,
      area: [],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2100, 10, 1),
      currentDate: new Date(),
      showData: false,
      shows:false,
      chooseDate: new Date(),
      choose:'2022年01月',
      chooseDates:'',
      currentPage: 1,
      name: "",
      whichMod: this.$route.query.moduleIdx,
      titleModel: this.$route.query.title,
      imgSrc: "",
      totalImgs: "1",
      allImgUrl: [],
      showImgs: [],
      current_type: 0,
      current_index:0,
      //切换表/图
      showPrise:true,
      showPrises:false,
      //双招双引
      qyxmSummary:'',//签约项目结语
      zjxmSummary:'',//在建项目结语
      qyxmName:[],//名字
      qygsValue:[],//签约个数
      qyjeValue:[],//签约金额
      topMbrwValue:[],//500强任务目标
      topQygsValue:[],//500强签约个数
      zjxmName:[],//城市名字
      dwzjValue:[],//到位资金
      kggsValue:[],//开工个数
      mbrwValue:[],//目标任务
      tbzzValue:[],//同比增长
      //ehats重构更换名字下面的名字颜色
      chongG:[],
      picture1:true,
      picture2:false,
      picture3:true,
      picture4:false,
      paishow:true,//排名 正序
      paishows:false,//排名倒叙
      qianYue:[],//签约整体数据
      qianYueDong:[],//表格东营市的数据
      zaiJian:[],//在建项目
      zaiJianDong:[],//表格东营市的数据
      Dqyuea:'',
      mixBer:0,//轴左侧最大数值
      maxBf:0,// y轴最大
      mixBf:0,//y轴右侧最小数值
      ress:[],
      sree:[],
      ClassActiveNer:0,// 判断图还是表
    };
  },
  created() {
    let month = this.chooseDate.getMonth() + 1 < 10
        ? "0" + (this.chooseDate.getMonth() + 1)
        : this.chooseDate.getMonth() + 1;
    this.chooseDate = this.chooseDate.getFullYear() + "年" + month + "月";
    this.name = this.$route.query.title;
    if(this.whichMod == 0){
      this.initDatas()
    }else if(this.whichMod == 2){
      this.initial()
    }else{
      this.initData()
    }
  },
  mounted() {
  },
  updated() {
    if (this.$refs.imgsRef) {
      let imgDiv = this.$refs.imgsRef.$el.clientHeight;
      if (imgDiv > 300 && document.querySelector(".outOut")) {
        document.querySelector(".outOut").style.marginTop = "40px";
      }
    }
  },
  watch: {},
  computed: {
  },
  methods: {
    //排序  正序
    sortIcon(){
      this.initDatasIcom()
      this.paishow = false
      this.paishows = true
    },
    // 倒叙
    sortIcons(){
      this.regionlist.reverse()
      this.paishow = true
      this.paishows = false
    },
    Sh(){
      //this.yearValue = this.yera
      switch(this.monthValue){
        case '一月':
        case '二月':
        case '三月':
        this.isActive = 0
        this.monthValue = '三月'
        break;
        case '四月':
        case '五月':
        case '六月':
        this.isActive = 1
        this.monthValue = '六月'
        break;
        case '七月':
        case '八月':
        case '九月':
        this.isActive = 2
        this.monthValue = '九月'
        break;
        case '十月':
        case '十一月':
        case '十二月':
        this.isActive = 3
        this.monthValue = '十二月'
        break;
        default: this.isActive = 0
      }
      let yearValue = new Date().getFullYear();
      let Section = yearValue-2022
      for(let key = 0;key < Section;key++){
          this.columns.push(yearValue)
      }
      this.columns.reverse()
    },
    Shs(){
      let this_ = this
      this.yeras.forEach(function (item){
        if(this_.modelValues == item.ye){
          this_.isActiveValue = item.yevalue
        }
      })
    },
    //获取全部数据
    initDatas(){
      this.area = []
      this.columns = [2022]
      this.eachModbts = []
      this.regionlists =[]
      this.regionlistName = []
      this.ress =[]
      this.sree = []
      this.arrval =[]
      this.regionlistQuantity =[]
      this.regionlistIncrease =[]
      let pams ={
        moduleId:this.moduleId,
        formId:this.formId,
        year:this.nianfen,
        month:this.monthValue,
      }
      let this_ = this;
      dsf.http.post("/fn/sjgwcPortalController/EQQPortalData",pams).then(({data})=>{
        this_.monthValue = data.data.currentDate.month  //获取当前月份
        this_.nianfen = data.data.currentDate.year //获取当前年份
        this_.eachModbts = data.data.formdata      //获取6个点击小模块
        this_.regionlist = data.data.listData     //获取表格的全部数据
        data.data.moduledata.forEach(function (item,index){
          this_.$set(item,"value",index)
          this_.area.push(item)
        })
        data.data.echartsData.forEach(function (item){
          this_.regionlistName.push(item.name)
          this_.ress.push(item.quantityValue)
          this_.regionlistQuantity.push(item.quantityValue)
          this_.sree.push(item.increaseValue)
          this_.regionlistIncrease.push(item.increaseValue)
        })
        this.chong()
        this.Sh()
        this.Shs()
        this.biaoge()
        this.ZhuZ()
      })
    },
    //点击排名获取排名之后的数据
    initDatasIcom(){
      this.columns = [2022]
      this.regionlists =[]
      this.regionlistName = []
      this.ress =[]
      this.sree = []
      this.regionlistQuantity =[]
      this.regionlistIncrease =[]
      let pams ={
        moduleId:this.moduleId,
        formId:this.formId,
        year:this.nianfen,
        month:this.monthValue,
      }
      let this_ = this;
      dsf.http.post("/fn/sjgwcPortalController/EQQPortalData",pams).then(({data})=>{
        // this_.regionlists = data.data.listData
        this_.monthValue = data.data.currentDate.month
        this_.modelValues= data.data.currentDate.month
        data.data.listData.forEach(function (item){
          if(isNaN(item.orderListValue) == false){
            this_.regionlists.push(item)
            }
        })
        this_.regionlist = this_.regionlists.sort((a,b)=>{ return a.orderListValue - b.orderListValue})
        data.data.listData.forEach(function (item){
          if(isNaN(item.orderListValue) == true){
            this_.regionlist.push(item)
            }
        })
        data.data.echartsData.forEach(function (item){
          this_.regionlistName.push(item.name)
          this_.ress.push(item.quantityValue)
          this_.regionlistQuantity.push(item.quantityValue)
          this_.sree.push(item.increaseValue)
          this_.regionlistIncrease.push(item.increaseValue)
        })
        this.chong()
        this.Sh()
        this.Shs()
        this.biaoge()
        this.ZhuZ()
      })
    },

    initDatasButton(){
      this.columns = [2022]
      this.regionlists =[]
      this.regionlistName = []
      this.ress =[]
      this.sree = []
      this.regionlistQuantity =[]
      this.regionlistIncrease =[]
      let pams ={
        moduleId:this.moduleId,
        formId:this.formId,
        year:this.nianfen,
        month:this.monthValue,
      }
      let this_ = this;
      dsf.http.post("/fn/sjgwcPortalController/EQQPortalData",pams).then(({data})=>{
        this_.monthValue = data.data.currentDate.month  //获取当前月份
        this_.nianfen = data.data.currentDate.year //获取当前年份
        this_.eachModbts = data.data.formdata      //获取6个点击小模块
        this_.regionlist = data.data.listData     //获取表格的全部数据

        data.data.echartsData.forEach(function (item){
          this_.regionlistName.push(item.name)
          this_.ress.push(item.quantityValue)
          this_.regionlistQuantity.push(item.quantityValue)
          this_.sree.push(item.increaseValue)
          this_.regionlistIncrease.push(item.increaseValue)
        })
        this.chong()
        this.Sh()
        this.Shs()
        this.biaoge()
        this.ZhuZ()
      })
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    showPopup() {
      let year = this.chooseDate.slice(0, 4);
      let mouth = this.chooseDate.slice(5, 7);
      if (this.chooseDate.length == 7) {
        mouth = this.chooseDate.slice(5, 6);
      }
      this.currentDate = new Date(year, mouth - 1, 1);
      this.$nextTick(function () {
        this.showData = true;
      });
    },
    change(item){
      this.chooseArea = item.value
      this.current_index = item.value
      this.moduleId = item.moduleId
      this.titleName = item.text
      this.initDatas()
    },
    selectData(val) {
      let month =
        val.getMonth() + 1 < 10
          ? "0" + (val.getMonth() + 1)
          : val.getMonth() + 1;
      this.chooseDate = val.getFullYear() + "年" + month + "月";
      this.choose = this.chooseDate
      this.chooseDates = this.chooseDate
      this.qyxmName=[],//名字
      this.qygsValue=[],//签约个数
      this.qyjeValue=[],//签约金额
      this.topMbrwValue=[],//500强任务目标
      this.topQygsValue=[],//500强签约个数
      this.zjxmName=[],//城市名字
      this.dwzjValue=[],//到位资金
      this.kggsValue=[],//开工个数
      this.mbrwValue=[],//目标任务
      this.tbzzValue=[],//同比增长
      this.initial()
      this.showData = false;
    },
    cancelBt() {
      this.showData = false;
    },
    //小模块统计表           展示经济运行指标的数据显示  月份和季度隐藏显示内容
    clikModuBts(val, index) {
      this.yearValue =[]
      if(this.titleName == '省内' || this.titleName == '小组内'){
        if(val.text == '地区生产总值' || val.text == '居民人均可支配收入' || val.text == '社会消费品零售总额' ){
          this.yshows =  false   //
          this.yshow = true
        } else {
          this.yshows = true  //
          this.yshow = false
        }
      }else if(this.titleName == '市内'){
        if(val.text == '地区生产总值' || val.text == '居民人均可支配收入' || val.text == '社会消费品零售总额' || val.text == '进出口'){
          this.yshows =  false  //
          this.yshow = true
        }else {
          this.yshows =  true
          this.yshow = false
        }
      }
      // this.monthValue = this.Dqyuea
      this.current_type = index;
      this.currentPage = 1;
      this.formId = val.formId
      this.initDatasButton()
    },
    //第二版功能
    biaoG() {
      this.showPrise = false
      this.showPrises = true
    },
    tuB() {
      this.showPrise =  true
      this.showPrises = false
    },
    biaoge(value){
      if(value == '东营市' || value == '东营'){
        return {fontWeight:800,color:"rgb(50,150,250)"}
      }
    },
    biaoGe(value){
      if(value == '东营市'){
        return {fontWeight:800,color:"rgb(50,150,250)"}
      }
    },
    biaos(value){
      if(value == '东营市'){
        return {fontWeight:800,color:"rgb(50,150,250)"}
      }
    },
    chong(){
      let this_ = this
      if(this.chooseArea == 0){
        this_.chongG = []
        this.regionlistName.forEach(function (item){
          if(item == '东营市'){
              let str = {
                value:item,
                textStyle:{
                fontWeight:900,
                color:'#3296FA',
              }
            }
            this_.chongG.push(str)
          }else{
            this_.chongG.push(item)
          }
        })
      }else if(this.chooseArea == 2){
        this_.chongG = []
        this.regionlistName.forEach(function (item){
          if(item == '东营'){
              let str = {
                value:item,
                textStyle:{
                fontWeight:900,
                color:'#3296FA',
              }
            }
            this_.chongG.push(str)
          }else{
            this_.chongG.push(item)
          }
        })
      }else if(this.chooseArea == 1){
        this_.chongG = []
        this_.chongG = this.regionlistName
      }
    },
    //选中年份请求数据
    make(value){
      this.nianfen = value
      this.initDatas()
      this.shows = false
    },
    //点击月份切换数据
    clikMoye(item){
      this.monthValue = item.yetext
      this.initDatasButton()
    },
    clikMoyes(item){
      this.isActiveValue = item.yevalue
      this.monthValue = item.yetext
      this.initDatasButton()
    },
    //柱状图
    ZhuZ() {
      let chartDom = document.getElementById("zhuZ");
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "axis",
          color:"#60b0f3",
        },
        legend: {
          data: ["亿元", "累计增长率"],
        },
        grid:{
          left:'15%',
          right:'15%',
          bottom:'35%',
        },
        xAxis: [
          {
            type: "category",
            data: this.chongG,
            axisLabel:{
              interval:0,
              formatter:function(value){
                let str = value.split("");
                return str.join("\n")
              },
            },
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "亿元",
            // min:0,
            // max:this.mixBer,
            axisLabel: {
              //formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "累计增长率",
            // min: this.mixBf,
            // max: this.maxBf,
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            name: "亿元",
            type: "bar",
            data: this.ress,
            itemStyle:{
              normal: {
                color:'#60b0f3'
             },
            }
          },
          {
            name: "累计增长率",
            type: "line",
            yAxisIndex: 1,
            data: this.sree,
            itemStyle:{
              normal: {
                color:'#34b75b'
             }
            }
          },
        ],
      };
      option && myChart.setOption(option);
    },
    // 双招双引功能
    initial(){
      let pams = {
        formId:'',
        date:this.chooseDates,
      }
      let this_ = this
      dsf.http.post("/fn/sjgwcPortalController/szsyPortalData",pams).then(({data})=>{
        this_.qyxmSummary = data.data.qyxmSummary
        this_.zjxmSummary = data.data.zjxmSummary
        this_.qianYue = data.data.qyxmData
        this_.qianYueDong = data.data.qyxmListData
        this_.choose = data.data.currentDate
        this_.zaiJian = data.data.zjxmData
        this_.zaiJianDong = data.data.zjxmListData
        this_.Dqyuea = data.data.currentDate.month
        data.data.qyxmData.forEach(function (item){
          this_.qyxmName.push(item.name)
          this_.qygsValue.push(item.qygsValue)
          this_.qyjeValue.push(item.qyjeValue)
          this_.topMbrwValue.push(item.topMbrwValue)
          this_.topQygsValue.push(item.topQygsValue)
        })
        data.data.zjxmData.forEach(function (item){
          this_.zjxmName.push(item.name)
          this_.dwzjValue.push(item.dwzjValue)
          this_.kggsValue.push(item.kggsValue)
          this_.mbrwValue.push(item.mbrwValue)
          this_.tbzzValue.push(item.tbzzValue)
        })
        this.contract()
        this.biaoGe()
        this.biaos()
        this.contracts()
      })
    },
    // 签约项目 柱状图
    contract(){
      let chartDom = document.getElementById("qianYue")
      let myChart = echarts.init(chartDom);
      let option;
      option ={
        tooltip: {
          trigger: "axis",
          color:"#60b0f3",
        },
        legend: {
          x:'cenrer',
          y:'bottom',
          data: ['签约个数', '签约金额', '500强目标任务', '500强签约个数'],
          textStyle:{
            fontSize:8
          },
          top:1,
        },
        grid:{
          left:'15%',
          right:'15%',
          bottom:'25%',
        },
        xAxis:[
          {
            type:'category',
            data:this.qyxmName,
            axisLabel:{
              interval:0,
              formatter:function(value){
                let str = value.split("");
                return str.join("\n")
              }
            },
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis:[
          {
            type: "value",
            name: "单位:亿元",
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "单位:个",
            max:100,
            min:0,
            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series:[
          {
            name: "签约个数",
            type: "bar",
            data: this.qygsValue,
            itemStyle:{
              normal: {
                color:'#5AAEF3'
             }
            }
          },
          {
            name:"签约金额",
            type:"bar",
            data:this.qyjeValue,
            itemStyle:{
              normal:{
                color:'#62D9AD'
              }
            }
          },
          {
            name:"500强目标任务",
            type:"bar",
            data:this.topMbrwValue,
            itemStyle:{
              normal:{
                color:'#5B6E96'
              }
            }
          },
          {
            name:'500强签约个数',
            type:"bar",
            data:this.topQygsValue,
            itemStyle:{
              normal:{
                color:'#A8DFFA'
              }
            }
          }
        ]
      }
      option && myChart.setOption(option);
    },
    // 在建项目 柱状图
    contracts(){
      let chartDom = document.getElementById("zaiJian")
      let myChart = echarts.init(chartDom);
      let option;
      option ={
        tooltip: {
          trigger: "axis",
          color:"#60b0f3",
        },
        legend: {
          x:'cenrer',
          y:'bottom',
          data: ['到位资金', '开工个数', '目标任务'],
          textStyle:{
            fontSize:8
          },
          top:1,
        },
        grid:{
          left:'15%',
          right:'15%',
          bottom:'25%',
        },
        xAxis:[
          {
            type:'category',
            data:this.zjxmName,
            axisLabel:{
              interval:0,
              formatter:function(value){
                let str = value.split("");
                return str.join("\n")
              }
            },
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis:[
          {
            type: "value",
            name: "单位:亿元",
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "单位:个",
            max:100,
            min:0,
            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series:[
          {
            name: "到位资金",
            type: "bar",
            data: this.dwzjValue,
            itemStyle:{
              normal: {
                color:'#5AAEF3'
             }
            }
          },
          {
            name:"开工个数",
            type:"bar",
            data:this.kggsValue,
            itemStyle:{
              normal:{
                color:'#62D9AD'
              }
            }
          },
          {
            name:"目标任务",
            type:"bar",
            data:this.mbrwValue,
            itemStyle:{
              normal:{
                color:'#FFDC4C'
              }
            }
          },
          {
            name: "同比增长",
            type: "line",
            yAxisIndex: 1,
            data: this.tbzzValue,
            itemStyle:{
              normal: {
                color:'#FB011A'
              }
            }
          },
        ]
      }
      option && myChart.setOption(option);
    },
    //切换表格
    pictures(){
      this.$refs.picture1.style.background = "rgb(245,245,245)";
      this.$refs.picture2.style.background = "rgb(50,150,250)";
      this.$refs.picture2.style.color ='#fff'
      this.$refs.picture1.style.color ='rgb(50,150,250)'
      this.picture2 = true
      this.picture1 = false
    },
    picture(){
      this.$refs.picture1.style.background = "rgb(50,150,250)";
      this.$refs.picture2.style.background = "rgb(245,245,245)";
      this.$refs.picture1.style.color ='#fff'
      this.$refs.picture2.style.color ='rgb(50,150,250)'
      this.picture1 = true
      this.picture2 = false
    },
    pictureT(){
      this.$refs.picture3.style.background = "rgb(245,245,245)";
      this.$refs.picture4.style.background = "rgb(50,150,250)";
      this.$refs.picture3.style.color ='rgb(50,150,250)'
      this.$refs.picture4.style.color ='#fff'
      this.picture3 = false
      this.picture4 = true
    },
    pictureW(){
      this.$refs.picture3.style.background = "rgb(50,150,250)";
      this.$refs.picture4.style.background = "rgb(245,245,245)";
      this.$refs.picture3.style.color ='#fff'
      this.$refs.picture4.style.color ='rgb(50,150,250)'
      this.picture3 = true
      this.picture4 = false
    },
  },
};
</script>
<style lang="scss" scoped>
.ClassActive{
  background: rgb(50,150,250);
  color: white;
}
.boxB {
  height: 35px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  div {
    font-size: var(--font_size_2);
    height: 30px;
    width: 50px;
    line-height: 30px;
    text-align: center;
    border: 1px solid rgb(197, 221, 229);
  }

}
#zhuZ{
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
.shuang{
  width: 100%;
  background: #fff;
  #qianYue{
    width: 100%;
    height: 320px;
    margin: 15px auto;
  }
  #zaiJian{
    width: 100%;
    height: 320px;
    margin: 15px auto;
  }
  p{
    font-size: 10px;
    text-indent: 2em;
  }
  .Header{
    width: 100%;
    background: #fff;
    border-radius: 3px;
    .tableHeader{
      padding: 10px 4px 0 5px;
      display: flex;
      justify-content: center;
      div{
        border-right: 1px solid #fff;
        width: 100px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        background: #3296fa;
        color: #fff;
      }
    }
    .ulHeader{
      padding: 0 10px 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      li{
        width: 7.32rem;
        height: 35px;
        text-align: center;
        line-height: 35px;
        display: flex;
        .fts{
          font-size: var(--font_size_4);
        }
        div{
          border-left:1px solid rgb(230, 229, 229);
          border-right:0px solid rgb(230, 229, 229);
          border-bottom:1px solid rgb(230, 229, 229);
          width: 103px;
          height: 35px;
          text-align: center;
          line-height: 35px;
        }
        .border{
            border-right:1px solid rgb(230, 229, 229) ;
        }
      }
    }
  }
  .Headers{
    width: 100%;
    background: #fff;
    border-radius: 3px;
    .tableHeaders{
      padding: 10px 4px 0 5px;
      display: flex;
      justify-content: center;
      div{
        border-right: 1px solid #fff;
        width: 100px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        background: #3296fa;
        color: #fff;
      }
    }
    .ulHeaders{
      padding: 0 10px 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      li{
        width: 7.32rem;
        height: 35px;
        text-align: center;
        line-height: 35px;
        display: flex;
        div{
          border-left:1px solid rgb(230, 229, 229);
          border-right:0px solid rgb(230, 229, 229);
          border-bottom:1px solid rgb(230, 229, 229);
          width: 103px;
          height: 35px;
          text-align: center;
          line-height: 35px;
        }
        .fts{
          font-size: var(--font_size_4);
        }

        .border{
            border-right:1px solid rgb(230, 229, 229) ;
        }
      }
    }
  }
}

.divUi{
  width: 100%;
  height: 200px;
  .Uilist{
    width: 86%;
    height: 200px;
    margin: 10px auto;
    .listClass{
      float: left;
      margin: 8px ;
      width: 60px;
      height: 40px;
      text-align: center;
      line-height: 35px;
      border-radius: 2px;
      background: #fff;
      color:#60b0f3;
    }
  }
}
 .tableClass{
  width: 100%;
  background: #fff;
  border-radius: 3px;
  .tableCla{
    padding: 10px 0.28rem 0 0.28rem;
    display: flex;
    justify-content: center;
    div{
      border-right: 1px solid #fff;
      width: 100px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      background: #3296fa;
      color: #fff;
    }
    .sortIcon{
      margin-top: 5px;
    }
  }
  .ultable{
    padding: 0 10px 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    li{
      width: 345px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      display: flex;
      div{
        border-left:1px solid rgb(230, 229, 229);
        border-right:0px solid rgb(230, 229, 229);
        border-bottom:1px solid rgb(230, 229, 229);
        width: 99.6px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        .border{
          border-right:1px solid rgb(230, 229, 229) ;
        }
      }
      .border{
          border-right:1px solid rgb(230, 229, 229) ;
      }
    }
  }
 }
.active{
  color: #fff !important;
  background: #60b0f3 !important;
}
.actives{
  font-size: 18px;
  color: #3296fa;
  font-weight: 800;
}

.bts {
  margin-bottom: 20px;
  font-family: PingFangSC-Medium;
  font-size: 15px;
  text-align: center;
  line-height: 34px;
  user-select: none;
  background: #fff;
  border: 1px solid #ccd8e5;
  border-radius: 10px;
  color: #2c4b5a;
}
.dy-eachMoBt {
  padding-top: 20px;
  padding-bottom: 10px;
}
.van-button--info {
  background-color: #f9f9fa;
  color: black;
}
.van-pagination__item {
  color: #3296fa;
}

.van-pagination__item--active {
  background-color: #3296fa;
}

.van-dropdown-item__option--active {
  color: #3296fa;
}

.van-dropdown-menu__title--active {
  color: #3296fa;
}

.imgs {
  padding: 0 10px;
}
::v-deep .van-dropdown-item__option--active {
  color: #3296fa;
}

::v-deep .van-dropdown-item__icon {
  color: #3296fa;
}

::v-deep .van-dropdown-menu__title--down {
  color: #3296fa;
}

::v-deep .van-dropdown-menu__bar {
  box-shadow: unset !important;
}
// ::v-deep .van-col--12{
//   width: 100%;
// }
::v-deep .van-cell__value--alone{
  padding-left: 35px;
}
::v-deep .van-cell{
  padding: 17px 17px;
}
.ulSheng{
  width: 100%;
  height: 60px;
  //padding: 0.35rem 15px;
  border-right: 1px solid rgb(233, 228, 228);
  background: #fff;
  justify-content: space-between;
  display: flex;
  line-height: 60px;
  li{
    width: 60px;
    height: 25px;
    text-align: center;

  }
}
.selectBt {
  color: #ffffff;
  background: #3296fa;
}

.pagFix {
  position: fixed;
  bottom: 15px;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.outOut {
  margin-top: 100px;
  height: 500px;
  overflow: auto;
}
// 双招双引样式
.contract{
  width: 100%;
  height: 50px;
  background: #fff;
  line-height: 50px;
  border-radius: 4px;
  margin: 10px 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .tt{
    padding-right: 30px;
    display: flex;
    .tu1{
      border: 1px solid #60b0f3;
      text-align: center;
      line-height: 30px;
      font-size: var(--font_size_1);
      width: 50px;
      height: 30px;
      color: #fff ;
      background: rgb(50,150,250) ;
    }
    .tu2{
      border: 1px solid #60b0f3;
      text-align: center;
      line-height: 30px;
      font-size: var(--font_size_1);
      width: 50px;
      height: 30px;
      color: rgb(50,150,250) ;
      background: #fff ;
    }
  }
  span{
    color: #8D7BD7;
    font-size: var(--font_size_2);
    padding: 0 0 0 15px;
  }

}
</style>
