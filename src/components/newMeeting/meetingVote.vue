<template>
  <div class="meetingvote flex dc" :style="{height: `calc(100vh - ${dsf.util.getOffsetTop()})`}">
    <div class="card">
      <div class="flex ja btn1">
        <span>应参人员 {{voteStatisData.total}}</span>
        <span>实参人员 {{voteStatisData.voteNum}}</span>
      </div>
      <div class="chart" id="perChart" v-if='voteStatisData.data&&voteStatisData.data.length>0'></div>
    </div>
    <ol class="btn2">
      <li
        v-for="(item, index) in optionByTopicId" :key="index" @click="optionUserList(item,index)" :class="{ active: tabnum == index }">
        {{ item.bt }}
      </li>
    </ol>
    <van-search v-model="userName" placeholder="搜索"  @search="onSearch" input-align="left"></van-search>
    <ul class="book">
      <template v-if="allOptionUserList.length > 0">
        <li v-for='(item,index) in allOptionUserList' :key='index'>
          <img :src="dsf.url.getWebPath(item.img)" :onerror="default_avatar" />
          <div class="info">
            <div>{{item.userName}}</div>
            <div class="sub">{{item.orgName}}</div>
          </div>
          <span :class="['tag', item.optionText ? 'tag-blue' : 'tag-gray']">{{item.optionText || '未表决'}}</span>
        </li>
      </template>
      <commonempty v-else description="暂无数据" />
    </ul>
    <div class="footer" v-if='showNodeId=="13"'>
      <van-button type="default" @click="clearVote">清除表决信息</van-button>
      <van-button type="primary" @click='openOrCloseVote'>{{btnText}}</van-button>
    </div>
  </div>
</template>

<script>
//import req from "@/api/api";
import echarts from "echarts";
export default {
  name: "meetingvote",
  props: [],
  data: function () {
    return {
      userName: "",
      tabnum: 0,
      tabItem:{},
      optionByTopicId: [],
      topicId:'',
      meetingId:'',
      voteStatisData:{},
      allOptionUserList:[],
      btnText:'',
      isAdmin:false,
      default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
      showNodeId:'',
    };
  },
  created() {
    let query = this.$route.query;
    this.topicId = query.topicId;
    this.meetingId = query.meetingId;
    this.isAdmin = query.isAdmin;
    this.showNodeId = query.showNodeId;
  },
  mounted() {
    let loading = dsf.layer.loading()
    Promise.all([this.getVoteStatistics(), this.getOptionByTopicId()]).then(() => {
      dsf.layer.closeLoading(loading)
    }).catch(err => {
      dsf.layer.toast('数据获取失败，请稍后重试！', false)
    })

  },
  watch: {},
  methods: {
    //饼图接口
    getVoteStatistics(){
      return dsf.http.post("fn/meetingVote/getVoteStatistics", {
        topicId:this.topicId,
        meetingId:this.meetingId
      }).done(res => {
          if(res.code=='200'){
              this.voteStatisData = res.data;
              if(res.data.openFlag=='1'){
                this.btnText = '关闭'
              }else if(res.data.openFlag=='-1'){
                this.btnText = '开启'
              }
              if(res.data.data.length>0){

                this.$nextTick(()=>{
                  this.perChart(res.data.data);
                })
              }

          }else{
             dsf.layer.toast(res.message);
          }
      })
    },
    perChart(data) {
      let color= ["#FACD00", "#9E9E9E", "#00AFFF", "#0073F2"];
      let myChart = echarts.init(document.getElementById("perChart"));
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: "5%",
        },
        grid: {
          top: "5%"
        },
        color: color,
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "40%"],
            radius: ["35%", "55%"],
            label: {
              normal: {
                formatter: function (params) {
                  if (params.value == 0) {
                    return ""
                  }
                  const arr = [
                    `{a|${params.name} ${params.value}票}`,
                    `{b|${params.percent}%}`,
                  ];
                  return arr.join("\n");
                },
                rich: {
                  a: {
                    fontSize: 14,
                    lineHeight: 20,
                  },
                  b: {
                    fontSize: 14,
                    // color: "#333333",
                  },
                },
              },
            },
            data: data.map(item => {
              item.labelLine = {show: item.value != 0}
              return item
            }),
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
      // 使用刚指定的配置项和数据显示图表
      myChart.setOption(option);
    },
    //获取议题选项
    getOptionByTopicId(){
      return dsf.http.post("fn/meetingVote/getOptionByTopicId", {
        pk:this.topicId
      }).done(res => {
          if(res.code=='200'){
              let arr = [
                {bt:'全部',id:''}
              ];
              res.data.forEach((item)=>{
                arr.push({bt:item.bt,id:item.id})
              })
              arr.push({bt:'未表决',id:'-1'});
              this.optionByTopicId = arr;
              this.optionUserList(arr[0],this.tabnum)
          }else{
             dsf.layer.toast(res.message);
          }
      })
    },
    //投票列表
    optionUserList(item,index) {
      this.tabnum = index;
      this.tabItem = item;
      dsf.http.post("fn/meetingVote/getAllOptionUserList", {
        topicId:this.topicId,
        meetingId:this.meetingId,
        optionId:item.id,
        userName:this.userName
      }).done(res => {
          if(res.code=='200'){
              this.allOptionUserList = res.data;
          }else{
             dsf.layer.toast(res.message);
          }
      })
    },
    onSearch(){
      this.optionUserList(this.tabItem,this.tabnum)
    },
    //清空投票数据
    clearVote(){
      dsf.http.post("fn/meetingVote/clearVote", {
        topicId:this.topicId,
      }).done(res => {
          if(res.code=='200'){
              this.getVoteStatistics();
              this.getOptionByTopicId();
              dsf.layer.toast(res.message);
          }else{
             dsf.layer.toast(res.message);
          }
      })
    },
    //开启关闭
    openOrCloseVote(){
       let type = this.voteStatisData.openFlag=='1'?'-1':'1'
       dsf.http.post("fn/meetingVote/openVote", {
        topicId:this.topicId,
        type:type
      }).done(res => {
          if(res.code=='200'){
              this.voteStatisData.openFlag = type;
              this.btnText = type=='1'?'关闭':'开启';
          }else{
             dsf.layer.toast(res.message);
          }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.meetingvote {
  .card {
    margin: 10px;
    border-radius: 10px;
    background-color: #fff;
    .btn1 {
      padding-top: 10px;
      span {
        border: 1px solid rgba(214,214,214,1);
        border-radius: 34px;
        padding: 6px 14px;
      }
    }
    .chart {
      height: 200px;
    }
  }

    .btn2 {
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      li {
        width: 64px;
        height: 100%;
        text-align: center;
        color: #333333;
        font-size: 15px;
        padding: 12px 0;
        &.active {
          font-weight: bold;
          position: relative;
          &:after {
            position: absolute;
            content: " ";
            width: 32px;
            height: 4px;
            @include background-theme(normal);
            border-radius: 4px;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%)
          }
        }
      }
    }
    .book {
      margin: 10px;
      padding: 0 15px;
      overflow: auto;
      background-color: #fff;
      flex: 1;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 0;
        border-bottom: 0.5px solid #e1e1e1;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 15px;
        }
        .info {
          flex: 1;
          .sub {
            font-size: var(--font_size_4);
            color: #666;
            padding-top: 6px;
          }
        }
        .tag {
          width: 68px;
          text-align: center;
          border: 1px solid;
          border-radius: 6px;
          padding: 6px 0;
          &-blue {
            color: #3296fa;
            border-color: #3296fa;
          }
          &-gray {
            color: #9e9e9e;
            border-color: #9e9e9e;
          }
        }
      }
    }

    ::v-deep.van-field__left-icon {
      margin-right: 10px !important;
    }
    .van-search__content {
      background: #f5f5f5 !important;
    }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    background: #fff;
    button {
      height: 44px;
      flex: 1;
      margin: 10px;
    }
  }
}
</style>
