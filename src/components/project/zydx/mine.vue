<template>
  <div class="mine">
    <div class="bg"></div>
    <div class="user-msg flex">
      <img
        :src="avatar"
        :onerror="default_avatar"
        class="photo"
        alt=""
      />
      <div class="msg">
        <div class="name-zw flex">
          <span>{{ userInfo.userName }}</span>
            <span v-if="userInfo.cardId" class="zgcode">职工代码:{{ userInfo.cardId }}</span>
        </div>
        <div class="dept" >{{ userInfo.orgNameLV1 }}</div>
      </div>
      <span class="deviceUnbind" @click="deviceUnbind">退出登录</span>
      <!-- <img class="seticon" src="static/images/zydx/set.png" alt="" @click="funsetting"/> -->
    </div>
    <div class="main-cont">
      <div class="table flex">
        <div class="item gr" @click="funsetting">
          <img src="static/images/zydx/table1.png" alt="" />
          <p>个人信息填报</p>
        </div>
        <div class="item jxkh" @click="funsetting">
          <img src="static/images/zydx/table2.png" alt="" />
          <p>绩效考核登记表</p>
        </div>
        <div class="item ndkh" @click="funsetting">
          <img src="static/images/zydx/table3.png" alt="" />
          <p>年度考核登记表</p>
        </div>
      </div>
      <div class="myannual-summary">
        <div class="tit"><span>我的年度总结</span></div>
        <div class="summary-card flex">
          <div class="item" @click="funsetting">
            <p>2022年度总结</p>
            <span>点击查看</span>
          </div>
          <div class="item" @click="funsetting">
            <p>2021年度总结</p>
            <span>点击查看</span>
          </div>
          <div class="item" @click="funsetting">
            <p>2020年度总结</p>
            <span>点击查看</span>
          </div>
        </div>
      </div>
      <!-- <div class="myfooter">
        <div class="tit flex">
          <span>我的足迹</span>
          <van-icon name="arrow" @click="funsetting"/>
        </div>
        <div class="cont">
          <van-search
            v-model="keyword"
            show-action
            left-icon=""
            placeholder="搜索"
            @search="onSearch"
          >
            <template #left-icon>
              <i class="iconfont iconsousuo1"></i>
            </template>
            <template #action>
              <img src="static/images/zydx/location.png" @click="funsetting" />
            </template>
          </van-search>
          <ul>
            <li class="tip" @click="funsetting">常用</li>
            <li class="label" @click="funsetting">综合楼八教室</li>
            <li class="label" @click="funsetting">东区研讨楼3004室</li>
            <li class="label" @click="funsetting">综合楼五教室</li>
          </ul>
        </div>
      </div> -->
      <div class="myproject">
        <div class="tit flex">
          <span>我的创新工程</span>
          <van-icon name="arrow" @click="funsetting"/>
        </div>
        <div class="list">
          <commonempty v-if="!myproject.length"></commonempty>
          <div v-for="(item,index) in myproject" :key="index" class="item">
            <div class="msg">
              <p>{{ item['project_name'] }}</p>
              <ul>
                <li>
                  <img src="static/images/zydx/lb.png" alt="" />
                  {{ item["type_text"] }}
                </li>
                <li>
                  <img src="static/images/zydx/jx.png" alt="" />
                  {{ item['zt'] }}
                </li>
              </ul>
            </div>
            <label :class="item['bmjydc_text']=='合格'?'hg':(item['bmjydc_text']=='不合格'?'bhg':'yx')">{{ item['bmjydc_text'] }}</label>
          </div>
        </div>
      </div>
      <div class="myky">
        <div class="tit flex"><span>我的科研情况</span></div>
        <div class="ky-card flex">
          <ul class="flex">
            <li v-for="(item,index) in myky.kysituaion" :key="index" :class="item.cssname">
              <p>{{ item.count }}</p>
              <div>{{ item.publishgrade }}</div>
            </li>
          </ul>
        </div>
        <div class="tabs flex">
          <van-tabs
            ref="vTabs"
            v-model="kyactive"
            :ellipsis="false"
            :line-width="tabList[kyactive].name.length + 0.5 + 'em'"
            @change="getTabList(tabList[kyactive].value)"
          >
            <van-tab
              :title-style="{ textAlign: 'left' }"
              title="项目明细"
            ></van-tab>
            <van-tab
              :title-style="{ textAlign: 'left' }"
              title="著作"
            ></van-tab>
            <van-tab
              :title-style="{ textAlign: 'left' }"
              title="论文"
            ></van-tab>
          </van-tabs>
          <van-icon name="arrow" @click="funsetting" />
        </div>
        <div class="ky-list">
          <commonempty v-if="!myky.datalist.length"></commonempty>
          <div v-for="(item,index) in myky.datalist" :key="index" class="item flex">
            <div class="year">{{ item.year }}</div>
            <div class="ky-msg">
              <p>{{ item.itemname }}</p>
              <ul class="flex">
                <li>
                  <img src="static/images/zydx/lb.png" alt="" />
                  {{ item.type }}
                </li>
                <li v-if="item.number">
                  <img src="static/images/zydx/ys.png" alt="" />
                  {{ item.number }}万
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="myteach">
        <div class="tit flex"><span>我的教学情况</span></div>
        <van-row gutter="10">
          <van-col span="12">
            <div class="box bg1">
              <p>{{ myteach.classCourseNumber }}</p>
              <div>主体班课程总课次</div>
            </div>
          </van-col>
          <van-col span="12">
            <div class="box bg2">
              <p>{{ myteach.classCourseAvgScore }}</p>
              <div>主体班课程平均分</div>
            </div>
          </van-col>
          <van-col span="12">
            <div class="box bg3">
              <p>{{ myteach.scoreFirst }}</p>
              <div>教学评估第一的课程数</div>
            </div>
          </van-col>
          <van-col span="12">
            <div class="box bg4">
              <p>{{ myteach.teachingGroupDay }}</p>
              <div>承担教学组（下班组）工作天数</div>
            </div>
          </van-col>
          <van-col span="24">
            <div class="box bg5">
              <p>{{ myteach.exchangeNumber }}</p>
              <div>承担双向交流、小组交流、论文指导课次数</div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="mycourseeval">
        <div class="tit flex">
          <span>我的学期课程总评</span>
          <van-icon name="arrow" @click="funsetting" />
        </div>
        <div class="eval-list">
          <commonempty v-if="!mycourseeval.length"></commonempty>
          <div v-for="(item,index) in mycourseeval" :key="index" class="item flex">
            <div class="lf">
              <p>{{ item.kcname }}</p>
              <div class="unit">
                <img src="static/images/zydx/bjicon.png" />
                <span
                  >{{ item.bcmc }}</span
                >
              </div>
              <div class="date">
                <img src="static/images/zydx/date.png" />
                <span>{{ item['sksj_sdate'] }}</span>
              </div>
            </div>
            <div v-if="item['target_total_score']" class="score" >{{ item['target_total_score'] }}分</div>
          </div>
        </div>
      </div>
      <div class="mykq">
        <div class="tit flex">
          <span>我的考勤</span>
          <div class="dp-menu">
            <van-popover
              v-model="showPopover"
              :actions="MonthActions"
              trigger="click"
              @select="onSelect"
            >
              <template #reference>
                <div class="date">
                  <span>{{ now }}</span
                  ><i class="iconfont icontriangle-left"></i>
                </div>
              </template>
            </van-popover>
          </div>
        </div>
        <van-row gutter="10">
          <van-col v-for="(item,index) in mykq" :key="index" span="8" >
            <div :class="['box',item.bgname]">
              <p>{{ item.days }}</p>
              <div>{{ item.name }}</div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="myexpense">
        <div class="tit flex">
          <span>我的报销</span>
        </div>
        <ul>
          <li class="flex">
            <div>
              <img src="static/images/zydx/ybx.png" />已报销<span>0</span>笔
            </div>
            <span>¥ 0.00</span>
          </li>
          <li class="flex">
            <div>
              <img src="static/images/zydx/wbx.png" />未报销 <span>0</span>笔
            </div>
            <span>¥ 0.00</span>
          </li>
        </ul>
      </div>
      <div class="mysalary">
        <div class="tit flex">
          <span>我的薪资</span>
        </div>
        <van-row gutter="10">
          <van-col span="12">
            <div class="box salary" @click="funsetting" >
              <p>工资明细</p>
              <div>查看</div>
            </div>
          </van-col>
          <van-col span="12">
            <div class="box partyfee" @click="funsetting" >
              <p>应缴党费</p>
              <div>查看</div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
var loadIndex;
import dsf from '../../../common';
export default {
  name: "mine",
  data() {
    return {
      userInfo:{
        userName:"",
        cardId:"",
        orgNameLV1:""
      },
      default_avatar: 'this.src="' + require('static/images/zydx/default-avatar-boy.png') + '"',
      avatar:"",
      keyword: "",
      kyactive: 0,
      MonthActions: [],
      showPopover: false,
      tabList: [
        {
          name: "项目明细",
          value:"xm"
        },
        {
          name: "著作",
          value:"zz"
        },
        {
          name: "论文",
          value:"lw"
        },
      ],
      myteach:{//我的教学情况
          exchangeNumber:0,//承担双向交流，小组交流，毕业论文课次数
          classCourseAvgScore:0,//主体班课程平均分
          classCourseNumber:0,//主题班课程总课数
          scoreFirst:0,//	教学评估第一课程数
          teachingGroupDay:0,//担任教学组天数
      },
      mycourseeval:[],
      mykq:[
        {
          name:"加班",
          days:0,
          bgname:"totaljbcount"
        },
         {
          name:"应出勤",
          days:0,
          bgname:"ycqcount"
        },
         {
          name:"出勤",
          days:0,
          bgname:"cqcount"
        },
         {
          name:"请假",
          days:0,
          bgname:"totalqjcount"
        },
         {
          name:"公假",
          days:0,
          bgname:"gjcount"
        },
         {
          name:"事假",
          days:0,
          bgname:"sjcount"
        },
         {
          name:"病假",
          days:0,
          bgname:"bjcount"
        },
         {
          name:"婚假",
          days:0,
          bgname:"hjcount"
        },
        {
          name:"产假",
          days:0,
          bgname:"chjcount"
        },
        {
          name:"陪产假",
          days:0,
          bgname:"pcjcount"
        },
        {
          name:"丧假",
          days:0,
          bgname:"sangjcount"
        },
        {
          name:"工伤假",
          days:0,
          bgname:"gsjcount"
        },
        {
          name:"挂职",
          days:0,
          bgname:"gzcount"
        },
        {
          name:"借调",
          days:0,
          bgname:"jdcount"
        },
         {
          name:"旷工",
          days:0,
          bgname:"kgcount"
        },
         {
          name:"工作日加班",
          days:0,
          bgname:"jjbcount"
        },
         {
          name:"节假日加班",
          days:0,
          bgname:"gjbcount"
        },
      ],
      myproject:[],
      myky:{
        kysituaion:[],
        datalist:[]
      },
      year:"",
      month:"",
      now:""
    };
  },
  activated() {
    this.getUserinfo();
  },
  created() {
    // loadIndex=dsf.layer.loading();
    this.getUserinfo();
  },
  methods: {
    init(){
      this.getDate();
      this.getMyTeach();
      this.getMyCourseEval();
      this.getMyProject();
      this.getKy();
      dsf.layer.closeLoading(loadIndex);
    },
    //设备解绑
    deviceUnbind: function(){
      dsf.layer.confirm({
          message: '是否退出登录？',
          confirmButtonText: '确认'
      }, () => {
        if(navigator.userAgent == "mobileIM"){
          window.native && window.native.unbindTrusfort();
        }else{
          dsf.layer.toast("请在IM中进行操作");
        }
      })
    },
    //获取当前时间
    getDate(){
      let self=this;
      dsf.http.get("/ctrl/p2011commoncon/getCurrentTime")
      .then((res) => {
        if(res&&res.status&&res.data.type=="success"){
            let year=self.dsf.date.format(res.data.data,'yyyy');
            let month=self.dsf.date.format(res.data.data,'mm');

            if(month-1 == 0){
              self.now=`${year-1}年12月`;
              self.year = year-1;
              self.month = 12;
            }else{
              self.now=`${year}年${month-1}月`;
              self.year = year;
              self.month = (month-1)>9 ? (month-1) : '0'+(month-1);
            }
            self.MonthActions=[
                {
                  text:self.month-2==0?`${self.year-1}年${self.month-1==0?12:11}月`:`${self.year}年${self.month-2>9?self.month-1:('0'+(self.month-2))}月`
                },
                {
                  text:self.month-1==0?`${self.year-1}年12月`:`${self.year}年${self.month-1>9?self.month-1:('0'+(self.month-1))}月`
                },
                {
                  text:`${self.year}年${self.month}月`
                }
            ]
            self.getMyKq();
        }
      })
      .catch(err => {
      })
    },
    //个人信息
    getUserinfo(){
      let self = this;
          dsf.http.post("/ctrl/p2011commoncon/getUserInfo", {})
          .then(res => {
              if (res.data.type == "success"&&res.data.data) {
                    self.userInfo.userName=res.data.data.userName;
                    self.userInfo.cardId=res.data.data.cardId;
                    self.userInfo.orgNameLV1=res.data.data.orgNameLV1;
                    if(res.data&&res.data.data&&res.data.data.sexText&&res.data.data.sexText=="女"){
                      self.avatar=require('static/images/zydx/default-avatar-girl.png');
                    }else{
                      self.avatar=require('static/images/zydx/default-avatar-boy.png');
                    }
              } else {
                  self.avatar=require('static/images/zydx/default-avatar-boy.png');
              }
              self.init();
              if(res.data.cardId){
                self.init();
              }
          })
          .catch(res => {
              self.avatar=require('static/images/zydx/default-avatar-boy.png');
          })
          .finally(() => { });
    },
    //我的教学情况
    getMyTeach(){
      let self=this;
      let param={
          userkey:self.userInfo.cardId,
      }
      self.getApiMsg(dsf.config.login.jwapiOrgin+"web/tcapp/datacenter/getTeacherStatistic",param,'post').then(res=>{
          if(res&&res.success){
              self.myteach.exchangeNumber=res.data.exchangeNumber;//承担双向交流，小组交流，毕业论文课次数
              self.myteach.classCourseAvgScore=res.data.classCourseAvgScore;//主体班课程平均分
              self.myteach.classCourseNumber=res.data.classCourseNumber;//主题班课程总课数
              self.myteach.scoreFirst=res.data.scoreFirst;//	教学评估第一课程数
              self.myteach.teachingGroupDay=res.data.teachingGroupDay;//担任教学组天数
          }else{
            //self.dsf.layer.toast(res&&res.message);
          }
      }).catch(err=>{
        //self.dsf.layer.toast(err&&err.message);
      })
    },
    //我的学期课程总评
    getMyCourseEval(){
      let self=this;
      let param={
          userkey:self.userInfo.cardId,
          pageindex:1,
          pagesize:3
      }
      self.getApiMsg(dsf.config.login.jwapiOrgin+"web/tcapp/datacenter/getMySemesterEvaluatedData",param,'post').then(res=>{
          if(res&&res.success){
            self.mycourseeval = res.data
          }else{
            //self.dsf.layer.toast(res&&res.message);
          }
      }).catch(err=>{
        //self.dsf.layer.toast(err&&err.message);
      })
    },
    //我的考勤
    getMyKq(){
      let self=this;
      let param={
          cardid:self.userInfo.cardId,
          year:Number(self.year),
          month:Number(self.month)
      }
      self.getApiMsg(dsf.config.login.kqapiOrgin+"api/attendance/getuserattendanceinfo",param,'post').then(res=>{
          if(res&&res.success){
            self.mykq.forEach((item)=>{
                item.days=res.data[item.bgname];
            })
          }else{
            //self.dsf.layer.toast(res&&res.message);
          }
      }).catch(err=>{
        //self.dsf.layer.toast(err&&err.message);
      })
    },
    //我的创新工程
    getMyProject(){
      let self=this;
      let param={
          usernumber:self.userInfo.cardId,
          pageSize:3,
          pageNum:1
      }
      self.getApiMsg(dsf.config.login.cxapiOrgin+"api/tree/closing",param,'get').then(res=>{
          if(res&&res.success){
            self.myproject=res.data;
          }else{
            //self.dsf.layer.toast(res&&res.message);
          }
      }).catch(err=>{
        //self.dsf.layer.toast(err&&err.message);
      })
    },
    //我的科研
    getKy(){
      let self=this;
      let param={
          userkey:self.userInfo.cardId
      }
      //发表等次成果数
      self.getApiMsg(dsf.config.login.kyapiOrgin+"dock/getResultCount",param,'post').then(res=>{
          if(res&&res.success){
            self.myky.kysituaion=res.data.data.map((it,index)=>{
               return {
                  ...it,
                  ...{cssname:'bg_'+(index>4?'default':index)}
               }
            });
          }else{
            //self.dsf.layer.toast(res&&res.message);
          }
      }).catch(err=>{
        //self.dsf.layer.toast(err&&err.message);
      })

      self.getTabList('xm');
    },
    getTabList(type){
      let self=this;
      let param={
          userkey:self.userInfo.cardId,
          type:type,
          pageindex:1,
          pagesize:3,
      }
      self.getApiMsg(dsf.config.login.kyapiOrgin+"dock/getDataList",param,'post').then(res=>{
          if(res&&res.success){
            self.myky.datalist= (res.data.data && res.data.data.list) ? res.data.data.list : [];
          }else{
            //self.dsf.layer.toast(res&&res.message);
          }
      }).catch(err=>{
        //self.dsf.layer.toast(err&&err.message);
      })
    },
    //获取信息接口
    getApiMsg(api,param,postType){
      let obj = {
        apiUrl: api,
        ...param,
        postType:postType
      }
      return new Promise((resolve,reject)=>{
          dsf.http.get("/ctrl/forward", obj)
          .then(res => {
            if(res && res.data.type=="success"){
              try {
                let data = JSON.parse(res.data.data);
                resolve(data);
              } catch (error) {
                resolve(res.data.data);
              }
            }else{
              reject(res.data.data);
            }
          })
          .catch(err => {
            reject(err.data);
          })
      })
    },
    onSearch() {
      dsf.layer.toast("功能正在建设中...")
    },
    onSelect(val) {
      this.now=val.text;
      this.year=val.text.split("年")[0];
      this.month=val.text.split("年")[1].split("月")[0];
      this.getMyKq();
    },
    funsetting(){
      dsf.layer.toast("功能正在建设中...")
    }
  },
};
</script>
<style lang='scss' scoped>
@import "../../../assets/styles/mixin";
@import "../../../assets/styles/themes";

.mine {
  // background: url("../../../../static/images/zydx/minebg.png") no-repeat;
  // background-size: 100% 6.3%;
  * {
    box-sizing: border-box;
  }
  // span,
  // div,
  // p,
  // li {
  //   font-family: 'pf-regular';
  // }
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 180px;
    overflow: hidden;
    z-index: 1;
    &:after {
      width: 150%;
      height: 180px;
      position: absolute;
      left: -25%;
      top: 0;
      z-index: 1;
      content: '';
      border-radius: 0 0 50% 50%;
      @include background-theme("normal");
      // @include randomLinear-background-theme2("lightdark",-27deg,33%);
    }
  }
  .user-msg {
    padding: 0.68rem 0.2rem 0 0.2rem;
    padding-top: 0.5rem;
    justify-content: flex-start;
    margin-bottom: 0.4rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    .photo {
      width: 1.16rem;
      height: 1.16rem;
      margin-right: 0.2rem;
      border: 2px solid #fff;
      border-radius: 50%;
    }
    .msg {
      align-items: center;
      * {
        color: #fff;
      }
      .name-zw {
        align-items: center;
        margin-bottom: 0.12rem;
        span {
          &:first-child {
            font-size: var(--font_size_0);
            font-weight: bold;
          }
        }
        .zgcode {
          height: 0.42rem;
          padding: 0 0.15rem;
          background: #f7b500;
          border-radius: 21px;
          white-space: nowrap;
          @include font_7();
          line-height: 0.41rem;
          margin-left: 0.1rem;
        }
      }
      .dept {
        @include font_5();
      }
    }
    .seticon {
      position: absolute;
      right: 0.2rem;
      top: 0.68rem;
      width: 0.4rem;
      height: 0.4rem;
    }
    .deviceUnbind {
      position: absolute;
      right: 0.3rem;
      top: 0.68rem;
      color: #fff;
    }
  }
  .main-cont {
    padding: 0 0.2rem;
    padding-top: 4.1rem;
    .table {
      padding: 0.3rem 0.2rem;
      box-shadow: 0px 0px 2px 0px rgba(211, 168, 168, 0.47);
      border-radius: 10px;
      background: #fff;
      justify-content: space-between;
      text-align: center;
      margin-bottom: 0.3rem;
      position: fixed;
      top: 2rem;
      left: 0.2rem;
      width: calc(100% - 0.4rem);
      z-index: 2;
      img {
        width: 0.7rem;
        margin: 0 auto;
        margin-bottom: 0.08rem;
      }
      .item {
        text-align: center;
        p {
          @include font_5();
          line-height: 0.48rem;
        }
      }
    }
    div[class^="my"] {
      background: #fff;
      box-shadow: 0px 0px 2px 0px rgba(211, 168, 168, 0.47);
      border-radius: 0.1rem;
      margin-bottom: 0.3rem;
    }
    .tit {
      padding-left: 0.35rem;
      position: relative;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.2rem;
      span {
        @include font_4();
        font-weight: bold;
      }
      &::before {
        content: " ";
        position: absolute;
        top: 5px;
        left: 3px;
        width: 0.08rem;
        height: 0.28rem;
        @include background-theme("normal");
        border-radius: 2px;
      }
      .van-icon-arrow {
        color: #999;
        font-weight: bold;
        @include font_2();
      }
    }
    .myannual-summary {
      background: transparent !important;
      box-shadow: none !important;
      padding: 0 !important;
      .summary-card {
        justify-content: space-between;
        .item {
          //width: 2.3rem;
          flex: 1;
          height: 1.61rem;
          background: url("../../../../static/images/zydx/summary2.png")
            no-repeat;
          background-size: 100% 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 0.12rem;
          border-radius: 5px;
          &:first-child {
            background: url("../../../../static/images/zydx/summary.png")
              no-repeat;
            background-size: 100% 100%;
          }
          &:last-child {
            background: url("../../../../static/images/zydx/summary3.png")
              no-repeat;
            background-size: 100% 100%;
          }
          p,
          span {
            text-align: left;
          }
          p {
            @include font_5();
            margin-bottom: 0.15rem;
          }
          span {
            @include font_7();
            color: #999;
          }
        }
        .item:nth-child(2) {
          margin: 0 0.1rem;
        }
      }
    }
    .myfooter {
      padding: 0.3rem 0.2rem;
      ::v-deep .van-search {
        padding: 0;
        margin-bottom: 0.2rem;
        img {
          width: 0.48rem;
          height: 0.48rem;
        }
        input {
          @include font_6();
          line-height: 0.48rem;
        }
        input::-webkit-input-placeholder {
          color: #AAA;
        }
        .van-search__content {
          padding-left: 0.12rem;
          background: #e8e8e8;
          border: 1px solid rgba(230, 230, 230, 1);
          border-radius: 0.13rem;
        }
        .van-field__left-icon {
          color: #999;
          margin-right: 0.1rem;
          display: flex;
          align-items: center;
          .iconfont {
            font-size: 0.36rem;
          }
        }
      }
      ul {
        display: flex;
        justify-content: flex-start;
        li {
          font-size: var(--font_size_4);
          color: #999;
          line-height: 0.42rem;
        }
        .tip {
          padding: 0.05rem 0;
          width: 3em;
        }
        .label {
          background: #F8F8F8;
          border-radius: 21px;
          padding: 0.05rem 0.15rem;
          margin-left: 0.12rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
    .myproject {
      padding: 0.3rem 0.2rem 0 0.2rem;
      .tit {
        margin-bottom: 0;
      }
      .list {
        .item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 0.3rem 0;
          border-top: 1px dashed #f6f6f6;
          &:first-child {
            border-top: 0;
          }
          .msg {
            width: calc(100% - 0.88rem - 0.2rem);
            p {
              @include font_5();
              margin-bottom: 0.2rem;
              color: #333;
            }
            ul {
              display: flex;
              justify-content: space-between;
              li {
                display: flex;
                align-items: center;
                width: 60%;
                @include font_7();
                color: #666;
                line-height: inherit;
                &:last-child {
                  width: 35%;
                }
                img {
                  width: 0.26rem;
                  height: 0.26rem;
                  margin-right: 0.1rem;
                }
              }
            }
          }
          label {
            width: 0.88rem;
            line-height: 0.4rem;
            text-align: center;
            border-radius: 4px;
            @include font_7();
          }
          .yx {
            border: 1px solid #0086d9;
            background: rgba(65, 155, 249, 0.1);
            color: #0086d9;
          }
          .hg {
            background: rgba(109, 212, 0, 0.1);
            border: 1px solid #6dd400;
            color: #6dd400;
          }
          .bhg {
            background: rgba(250, 100, 0, 0.1);
            border: 1px solid #fa6400;
            color: #fa6400;
          }
        }
      }
    }
    .myky {
      padding: 0.3rem 0.2rem 0 0.2rem;
      .ky-card {
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        &::-webkit-scrollbar {
          width: 0;
        }
        ul {
          flex: 1;
          display: flex;
          li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 2.96rem;
            height: 2.06rem;
            border-radius: 6px;
            margin-right: 0.1rem;
            padding: 0 0.2rem;
          }
          .bg_0 {
            //background-image: linear-gradient(-43deg, #f35b49 0%, #f4998c 100%);
            @include linear-background-theme("normal");
          }
          .bg_1 {
            background-image: linear-gradient(-43deg, #f38849 0%, #edaa5c 100%);
          }
          .bg_2 {
            background-image: linear-gradient(-71deg, #7963f9 0%, #bba3fe 95%);
          }
          .bg_3 {
            background-image: linear-gradient(-71deg, #426cf8 0%, #40528d 95%);
          }
          .bg_4 {
            background-image: linear-gradient(-71deg, #7963f9 0%, #bba3fe 95%);
          }
          .bg_default{
             //background-image: linear-gradient(-43deg, #f35b49 0%, #f4998c 100%);
             @include linear-background-theme("normal");
          }
          p {
            text-align: center;
            font-size: 0.42rem;
            font-weight: bold;
            margin-bottom: 0.08rem;
            color: #fff;
          }
          div {
            text-align: center;
            @include font_4();
            line-height: 0.48rem;
            color: #fff;
          }
        }
      }
      .tabs {
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        ::v-deep .van-tabs {
          max-width: calc(100% - 14px - 10px);
          .van-tabs__nav {
            margin-left: -0.4rem;
          }
          .van-tab.van-tab--active {
            .van-tab__text {
              @include font-theme("normal");
            }
          }
          .van-tabs__line {
            @include background-theme("normal", "true");
          }
        }
        .van-icon {
          color: #999;
          font-weight: bold;
          @include font_2();
          margin-left: 0.2rem;
          line-height: 0.8rem;
        }
      }
      .ky-list {
        .item {
          padding: 0.29rem 0;
          border-bottom: 1px dashed #f5f5f5;
          &:first-child {
            border-top: 0;
          }
          .year {
            width: 0.78rem;
            height: 0.78rem;
            border-radius: 6px;
            //background-image: linear-gradient(-43deg, #f35b49 0%, #f4998c 100%);
            @include linear-background-theme("normal");
            text-align: center;
            color: #fff;
            margin-right: 0.2rem;
            @include font_7();
            line-height: 0.78rem;
          }
          .ky-msg {
            flex: 1;
            p {
              @include font_5();
              color: #333;
              margin-bottom: 0.2rem;
            }
            ul {
              display: flex;
              li {
                display: flex;
                align-items: center;
                width: 50%;
                color: #666;
                img {
                  width: 0.26rem;
                  height: 0.26rem;
                  margin-right: 0.14rem;
                }
              }
            }
          }
        }
      }
    }
    .myteach {
      padding: 0.3rem 0.2rem;
      .van-col {
        border-radius: 6px;
        margin-bottom: 0.21rem;
        .box {
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding: 0.3rem;
          border-radius: 6px;
          p,
          div {
            text-align: center;
          }
          p {
            @include font-theme("normal");
            font-size: 0.42rem;
            font-weight: bold;
            margin-bottom: 0.08rem;
          }
          div {
            @include font_4();
          }
        }
        .bg1 {
          background-image: linear-gradient(180deg, #f8f3ed 0%, #f9f4f0 100%);
        }
        .bg2 {
          background-image: linear-gradient(180deg, #d3f0ff 0%, #ebf7fc 100%);
        }
        .bg3 {
          background-image: linear-gradient(180deg, #ddf6f6 0%, #e9f7f7 100%);
        }
        .bg4 {
          background-image: linear-gradient(180deg, #edf4fe 0%, #eef4fd 100%);
        }
        .bg5 {
          background-image: linear-gradient(180deg, #ffe8dd 0%, #fffbfb 100%);
        }
      }
    }
    .mycourseeval {
      padding: 0.3rem 0.2rem 0 0.2rem;
      .eval-list {
        .item {
          padding: 0.3rem 0.06rem 0.3rem 0;
          justify-content: space-between;
          border-bottom: 1px dashed #f6f6f6;
          .lf {
            width: 75%;
            p {
              @include font_5();
              margin-bottom: 0.2rem;
            }
            .unit {
              display: flex;
              align-items: flex-start;
              margin-bottom: 0.1rem;
              span {
                @include font_7();
                color: #666;
              }
              img {
                margin-top: 2px;
              }
            }
            .date {
              display: flex;
              align-items: flex-start;
              @include font_7();
              color: #666;
              img {
                margin-top: 2px;
              }
            }
          }
          img {
            width: 0.26rem;
            height: 0.26rem;
            margin-right: 0.1rem;
          }
          .score {
            position: relative;
            @include font_2();
            @include font-theme("normal");
            line-height: 0.42rem;
            font-weight: bold;
            &::after {
              content: " ";
              position: absolute;
              top: 22px;
              left: 0;
              width: 100%;
              height: 0.4rem;
              background: url("../../../../static/images/zydx/icongrade.png")
                no-repeat;
              background-size: 100%;
            }
          }
        }
      }
    }
    .mykq {
      padding: 0.3rem 0.2rem 0.1rem 0.2rem;
      .date {
        span {
          @include font_6();
          color: #333;
          margin-right: 0.1rem;
        }
        .icontriangle-left {
          color: #d0d0d0;
          @include font_6();
          transform: rotate(-90deg);
          display: inline-block;
        }
      }
      .ycqcount {
        background: url("../../../../static/images/zydx/ycq.png") no-repeat;
      }
      .cqcount {
        background: url("../../../../static/images/zydx/cq.png") no-repeat;
      }
      .totalqjcount {
        background: url("../../../../static/images/zydx/totalqj.png") no-repeat;
      }
      .gjcount{
        background: url("../../../../static/images/zydx/gj.png") no-repeat;
      }
      .sjcount{
        background: url("../../../../static/images/zydx/sj.png") no-repeat;
      }
      .bjcount{
         background: url("../../../../static/images/zydx/bj.png") no-repeat;
      }
      .hjcount {
        background: url("../../../../static/images/zydx/hj.png") no-repeat;
      }
      .chjcount {
        background: url("../../../../static/images/zydx/chj.png") no-repeat;
      }
      .pcjcount {
        background: url("../../../../static/images/zydx/pcj.png") no-repeat;
      }
      .sangjcount {
        background: url("../../../../static/images/zydx/sangj.png") no-repeat;
      }
      .gsjcount {
        background: url("../../../../static/images/zydx/gsj.png") no-repeat;
      }
      .gzcount{
        background: url("../../../../static/images/zydx/gz.png") no-repeat;
      }
      .jdcount{
        background: url("../../../../static/images/zydx/jd.png") no-repeat;
      }
      .kgcount{
        background: url("../../../../static/images/zydx/kg.png") no-repeat;
      }
      .jjbcount {
        background: url("../../../../static/images/zydx/jjb.png") no-repeat;
      }
      .totaljbcount {
        background: url("../../../../static/images/zydx/totaljb.png") no-repeat;
      }
      .gjbcount{
        background: url("../../../../static/images/zydx/gjb.png") no-repeat;
      }
      .van-row {
        display: flex;
        flex-flow: wrap;
        .van-col {
          border-radius: 6px;
          margin-bottom: 0.21rem;
          .box {
            height: 100%;
            padding: 0.26rem;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            border-radius: 6px;
            background-size: 100% 100%;
            p,
            div {
              text-align: center;
            }
            p {
              @include font-theme("normal");
              font-size: 0.42rem;
              font-weight: bold;
              margin-bottom: 0.08rem;
            }
            div {
              @include font_4();
            }
          }
        }
      }
    }
    .myexpense {
      padding: 0.3rem 0.2rem 0.1rem 0.2rem;
      ul {
        li {
          border: 1px solid rgba(230, 230, 230, 1);
          box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
          border-radius: 6px;
          padding: 0.25rem 0.27rem;
          margin-bottom: 0.2rem;
          justify-content: space-between;
          align-items: center;
          & > div {
            display: flex;
            @include font_4();
            align-items: center;
            span {
              margin: 0 0.1rem;
              font-size: 0.42rem;
              @include font-theme("normal");
              font-weight: bold;
            }
            img {
              width: 0.36rem;
              height: 0.36rem;
              margin-right: 0.36rem;
            }
          }
          & > span {
            @include font_4();
            @include font-theme("normal");
          }
        }
      }
    }
    .mysalary {
      padding: 0.3rem 0.2rem 0.2rem 0.2rem;
      .van-row {
        .van-col {
          .salary {
            background: url("../../../../static/images/zydx/gzmx.png") no-repeat;
          }
          .partyfee {
            background: url("../../../../static/images/zydx/df.png") no-repeat;
          }
          .box {
            height: 1.18rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.31rem;
            background-size: 100% 100%;
            p {
              @include font_4();
            }
            div {
              @include font_7();
              color: #999;
            }
          }
        }
      }
    }
  }
  ::v-deep .van-empty {
    padding: 0 0 0.3rem 0;
  }
  ::v-deep .van-empty__image {
    height: auto;
    img {
      height: auto;
    }
  }
  ::v-deep .van-empty__description {
    margin-top: 0;
  }
}
</style>
