<template>
  <div class="meetingvote flex dc" :style="{ height: `calc(100vh - ${dsf.util.getOffsetTop()})` }">
    <div class="main">
      <div class="com-tit">
        <img src="@/assets/imgs/conference/title1.png" alt="">
        <span>表决详情</span>
      </div>
      <div class="box">
        <div class="chart" ref="chart"></div>
        <p>{{ allDate.voteModeMsg }}</p>
      </div>
    </div>
    <div class="main">
      <div class="com-tit">
        <img src="@/assets/imgs/conference/title2.png" alt="">
        <span>结果分析</span>
      </div>
      <div class="box box1">
        <ul class="box-ul">
          <li>
            <img src="@/assets/imgs/conference/icon1.png" alt="">
            <div>
              <span>应参人员</span>
              <div>{{ allDate.voteUserNum }}</div>
            </div>
          </li>
          <li>
            <img src="@/assets/imgs/conference/icon2.png" alt="">
            <div>
              <span>实参人员</span>
              <div>{{ allDate.goVoteUserNum }}</div>
            </div>
          </li>
          <li>
            <img src="@/assets/imgs/conference/icon3.png" alt="">
            <div>
              <span>有效票数</span>
              <div>{{ allDate.voteNum }}</div>
            </div>
          </li>
          <li>
            <img src="@/assets/imgs/conference/icon4.png" alt="">
            <div>
              <span>未投票人数</span>
              <div>{{ allDate.giveUpNum }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="com-tit">
        <img src="@/assets/imgs/conference/title3.png" alt="">
        <span>投票详情</span>
      </div>
      <div class="box2">
        <ol>
          <li v-for="(item, i) in tabData" :key="i" :class="{'active':tabId==item.id}" @click="tabClick(item.id)">{{ item.optionValue }}</li>
        </ol>
        <van-search v-model="userName" placeholder="搜索"  @search="getDate" input-align="left"></van-search>
      </div>
      <div class="box3">
        <ul class="list" v-if="List.length>0">
          <li v-for="(item, i) in List" :key="i">
            <img :src="dsf.url.getWebPath(item.img)" :onerror="default_avatar" />
            <span>{{ item.userName }}（{{ item.deptName }}）</span>
            <div v-if="item.optionText">
              <i v-for="(it, index) in item.optionText.split(',')" :key="index" :class="{'state1': it=='支持','state2': it=='反对','state3': it=='弃权','state4': it=='未表决'}">{{it? it: '未表决'}}</i>
            </div>
          </li>
        </ul>
        <commonempty v-else :image="require('static/images/peopleCongress/img_zwfk.png')" class="opinion-empty" description="暂无数据" />
      </div>
    </div>
  </div>
</template>

<script>
//import req from "@/api/api";
import * as echarts from "echarts";
export default {
  name: "meetingcast",
  props: [],
  data: function () {
    return {
      userName: "",
      tabId: "",
      topicId: this.$route.query.topicId,
      meetingId: this.$route.query.meetingId,
      default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
      chart: [],
      allDate: [],
      tabData:[],
      List:[]
    };
  },
  created() {

  },
  mounted() {
    let loading = dsf.layer.loading()
    Promise.all([this.getTab(), this.getDate(), this.getAllDate()]).then(() => {
      dsf.layer.closeLoading(loading)
    }).catch(err => {
      dsf.layer.toast('数据获取失败，请稍后重试！', false)
    })
  },
  watch: {},
  methods: {
    tabClick(id){
      this.tabId = id;
      this.getDate()
    },
    //获取议题选项
    getTab(){
      return dsf.http.post("ctrl/meetingVote/getYtAndOption", {
        topicId: this.topicId,
      }).done(res => {
          if(res.code=='200'){
              let arr = [
                {optionValue: '全部', bt:'全部',id:''}
              ];
              res.data.optionList.forEach((item)=>{
                arr.push({optionValue:item.optionValue, bt:item.bt,id:item.id})
              })
              let Eng = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
              arr.push({optionValue: Eng[res.data.optionList.length], bt:'未表决',id:'-1'});
              this.tabData = arr;
          }else{
             dsf.layer.toast(res.message);
          }
      })
    },
    //获取统计数据
    getAllDate(){
      return dsf.http.post("ctrl/meetingVote/getVoteStatisticsV2", {
        topicId: this.topicId,
      }).done(res => {
          if(res.code=='200'){
            this.allDate = res.data;
              let arr = [];
              res.data.voteList.forEach((item)=>{
                arr.push({optionValue: item.optionValue, optionText: item.optionText, num: item.num})
              })
              let Eng = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
              arr.push({optionValue: Eng[res.data.voteList.length], optionText:'未表决',num: res.data.notVoteUserNum});
              this.chart = arr;
              this.initChart(this.chart, "chart");
          }else{
             dsf.layer.toast(res.message);
          }
      })
    },
    getDate(){
      let loading = dsf.layer.loading()
      dsf.http.post("ctrl/meetingVote/getAllOptionUserList", {
        topicId: this.topicId,
        meetingId: this.meetingId,
        optionId: this.tabId,
        userName: this.userName
      }).done(res => {
        dsf.layer.closeLoading(loading)
        this.List = []
          if(res.code=='200'){
              this.List = res.data;
              this.List.forEach(ele=>{
                ele.optionText = ele.optionText ? ele.optionText : '未表决'
                ele.voteResults = ele.voteResults ? ele.voteResults : '未表决'
              })
          }else{
             dsf.layer.toast(res.message);
          }
      })
    },
    initChart(dataSource, ele) {
      let Ydata = []
      let arr = []
      let data = []
      let total = 0
      dataSource.forEach(item=>{
        Ydata.push(item.optionValue)
        arr.push(item.optionText)
        data.push(item.num)
      })
      data.forEach(item=>{
        total += item
      })
      //arr.push( '未表决')
      let myChart = echarts.init(this.$refs[ele]);
      var option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "-5%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#333",
                fontSize: "14",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: Ydata,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#333",
                fontSize: "14",
              },
              formatter: function (value) {
                let data = total>0 ? (value*100/ total).toFixed(2): 0
                return data + "%";
              },
            },
            data: data,
          },
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 40,
                color: function (params) {
                  var colorList = ['#0091FF', '#FFB27F', '#44D7B6', '#E790FF'];
                  return colorList[params.dataIndex]
                }
              }
            },
            label: {
              show: true,
              position: 'insideLeft',
              formatter(params) {
                // 根据params来做判断显示
                return arr[params.dataIndex] + ': ' + params.data + '票'
              }
            },
            barWidth: 20,
            data: data,
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            data: [total, total, total, total],
            itemStyle: {
              normal: {
                color: "#EEEEEE",
                barBorderRadius: 40,
              },
            },
          },
        ],
      };


      myChart.clear();
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },

  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.meetingvote {

}

.main {
  .com-tit {
    display: flex;
    align-items: center;
    padding-left: 10px;
    height: 47px;

    img {
      margin-right: 5px;
      width: 19px !important;
      height: 19px !important;

    }

    span {
      font-weight: bold;
      color: #333333;
    }
  }

  .box {
    margin: 0 10px;
    width: calc(100% - 20px);
    height: 200px;
    background: #FFFFFF;
    box-shadow: 0 1px 20px 4px rgba(191, 191, 191, 0.26);
    border-radius: 7px;

    .chart {
      width: 100%;
      height: calc(100% - 30px);
    }

    p {
      padding-left: 15px;
      font-size: 14px;
      color: #666666;
    }
    .box-ul{
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      li{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 50%;
        box-sizing: border-box;
        img{
          margin-right: 8px;
          width: 42px;
          height: 42px;
        }
        >div{
          display: flex;
          flex-direction: column;
          span{
            font-size: 14px;
            color: #333333;
          }
          div{
            font-size: 24px;
            font-weight: bold;
            color: #333333;
          }
        }
        &:nth-child(1){
          border-right: 1px solid rgba(238,238,238,1);
          border-bottom: 1px solid rgba(238,238,238,1);
        }
        &:nth-child(2){
          border-bottom: 1px solid rgba(238,238,238,1);
        }
        &:nth-child(3){
          border-right: 1px solid rgba(238,238,238,1);
        }
      }
    }

  }
  .box1{
    padding: 15px;
    height: 182px;
  }
  .box2{
    margin-bottom: 10px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0 1px 20px 4px rgba(191, 191, 191, 0.26);
    ol{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1px;
      padding: 0 10px;
      height: 46px;
      box-shadow: 0px 3px 3px 0px rgba(229,229,229,0.5);
      li{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 100%;
        font-size: 15px;
        color: #333333;
        &.active{
          font-size: 16px;
          font-weight: bold;
          &::after{
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate(-50%,0);
            width: 32px;
            height: 4px;
            background: #0075CD;
            border-radius: 4px;
          }
        }
      }
    }
    .van-search{
      background: #FFFFFF;
      box-shadow: 0px 3px 3px 0px rgba(229,229,229,0.5);
    }
    .van-search__content{
      border-radius: 10px;
    }
  }
  .opinion-empty {
    padding: 2rem 0;

    ::v-deep .van-empty__image {
        height: 2.6rem;
    }
  }
  .box3{

    margin: 0 10px;
    margin-bottom: 10px;
    width: calc(100% - 20px);
    background: #FFFFFF;
    box-shadow: 0 1px 20px 4px rgba(191, 191, 191, 0.26);
    border-radius: 7px;
    .list{
      padding: 0 10px;
      li{
        display: flex;
        align-items: center;
        padding: 0 10px;
        width: 100%;
        height: 70px;
        border-bottom: 1px solid rgba(225,225,225,1);
        box-sizing: border-box;
        img{
          margin-right: 12px;
          width: 40px;
          height: 40px;
        }
        span{
          width: 150px;
          font-size: 15px;
          color: #333333;
        }
        div{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex: 1;
        }
        i{
          margin-left: 10px;
          width: 45px;
          height: 24px;
          font-size: 12px;
          text-align: center;
          line-height: 24px;
          color: #FFFFFF;
          border-radius: 4px;
          &.state1{
            background: #0091FF;
          }
          &.state2{
            background: #FFB27F;
          }
          &.state3{
            background: #44D7B6;
          }
          &.state4{
            background: #E790FF;
          }
        }
      }
    }
  }
}</style>
