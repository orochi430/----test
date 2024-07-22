<!--
 * @Author: RONGWEI PENG
 * @Date: 2020-05-14 23:24:29
 * @LastEditTime: 2020-05-15 04:00:05
 * @LastEditors: Do not edit
 * @FilePath: \xzDing\src\components\moduleIndex.vue
 * @Description:
 -->
<template>
  <div class="ds-moduleIndex">
     <!-- 新闻中心 -->
     <div class="title">
        <span>新闻中心</span>
      </div>
    <div class="dsf-list">
      <div v-for="item in studyMenu" :key="item.menuID" class="menu" @click="gostudyMenu(item.menuID)">
        <img :src="item.imgUrl" alt />
        <p>{{ item.menuText }}</p>
      </div>
    </div>

      <!-- 会议管理 -->
    <div>
        <div class="title">
        <span>会议管理</span>
      </div>
    <div class="dsf-list">
      <div v-for="item in meetingMenu" :key="item.menuID" class="menu" @click="goMeetingMenu(item.menuID)">
        <img :src="item.imgUrl" alt />
        <p>{{ item.menuText }}</p>
      </div>
    </div>
    </div>
    <!-- 公文管理 -->
     <div class="title">
        <span>公文管理</span>
      </div>
    <div class="dsf-list">
      <div v-for="item in docManagenMenu" :key="item.menuID" class="menu" @click="goDocManagenMenu(item.menuID)">
        <img :src="item.imgUrl" alt />
        <p>{{ item.menuText }}</p>
      </div>
    </div>
      <!-- 党建学习 -->
     <div class="title">
        <span>党建学习</span>
      </div>
    <div class="dsf-list">
      <div v-for="item in partyBuildMenu" :key="item.menuID" class="menu" @click="goPartyBuildMenu(item.menuID)">
        <img :src="item.imgUrl" alt />
        <p>{{ item.menuText }}</p>
      </div>
    </div>
    <!-- 督查督办 -->
     <div class="title">
        <span>督查督办</span>
      </div>
    <div class="dsf-list">
      <div v-for="item in SupervisionMenu" :key="item.menuID" class="menu" @click="goSupervisionMenu(item.menuID)">
        <img :src="item.imgUrl" alt />
        <p>{{ item.menuText }}</p>
      </div>
    </div>
    <!-- 信访管理 -->
     <!-- <div class="title">
        <span>信访管理</span>
      </div> -->
    <!-- <div class="dsf-list">
      <div v-for="item in letMaMenu" :key="item.menuID" class="menu" v-show="item.isShow"  @click="goLetMaMenu(item.menuID)">
        <img :src="item.imgUrl" alt />
        <p>{{ item.menuText }}</p>
      </div>
    </div> -->
    <!-- 街镇直通车 -->
    <div class="title">
        <span>街镇直通车</span>
      </div>
    <div class="dsf-list">
      <div v-for="item in streeTownMenu" :key="item.menuID" class="menu" @click="goStreeTownMenuu(item.menuID)">
        <img :src="item.imgUrl" alt />
        <p>{{ item.menuText }}</p>
      </div>
    </div>
    <!-- <div>
      <a class="ds_font3" href="#/reserveMeeting">会议室预定</a>
      <a class="ds_font3" href="#/apply">会议申请</a>
      <a class="ds_font3" href="#/meetingManage">会议管理</a>
      <a class="ds_font3" href="#/inConstruction">会议签到</a>
    </div>

    <div>
      <a class="ds_font3" href="#/signinlist">收文登记</a>
      <a class="ds_font3" href="#/postlist">发文起草</a>
    </div>
    <div>
      <a class="ds_font3" href="#/search">公文检索</a>
      <a class="ds_font3" href="#/inConstruction">公文统计</a>
    </div>

    <div>
      <a
        href="http://ipb.dreamdt.cn:81/iPB/dist/index.html#/authLogin/15000583554"
        class="ds_font3"
      >i党建</a>
      <a class="ds_font3" href="#/openSchedule">党建直播</a>
    </div>
    <div>
      <a
        class="ds_font3"
        href="http://ipb2.dreamdt.cn:81/dsfa/nc/mobile/dist/webmobile/index.html?v=1.10#/"
      >学习帮</a>
    </div>
    <div>
      <a class="ds_font3" href="#/supervise">督办立项</a>
      <a class="ds_font3" href="#/inspectorList">督办情况</a>
      <a class="ds_font3" href="#/inspectorList">督办管理</a>
      <a class="ds_font3" href="#/inspectorFeedback">督办反馈</a>
      <a class="ds_font3" href="#/inConstruction">督办统计</a>
    </div>
    <div>
      <a
        class="ds_font3"
        href="http://ipb3.dreamdt.cn:81/dsfa/ztc/pc/consult/dist/index.html?id=2019112501&dd_func_wk=false#/index"
      >应用首页</a>
      <a
        class="ds_font3"
        href="http://ipb3.dreamdt.cn:81/dsfa/ztc/pc/consult/dist/index.html?id=191032&dd_func_wk=false#/zxWt?flType=1"
      >问题沟通</a>
      <a
        class="ds_font3"
        href="http://ipb3.dreamdt.cn:81/dsfa/ztc/pc/consult/dist/index.html?id=191032&dd_func_wk=false#/zxWt?flType=0"
      >政策咨询</a>
      <a
        class="ds_font3"
        href="http://ipb3.dreamdt.cn:81/dsfa/ztc/pc/consult/dist/index.html?id=191032&dd_func_wk=false#/jxal"
      >精选案例</a>
    </div>

    <div>
      <a class="ds_font3" href="#/openSchedule">开启视频会议</a>
    </div>
    <div>
      <a class="ds_font3" href="#/openSchedule">村村通</a>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "moduleIndex",
  data() {
    return {
      user: dsf.util.loadSessionStore("user") || {},
      meetingMenu: [
          {
          menuID: "3",
          menuText: "会议室预定",
          routeUrl: "/reserveMeeting",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/hy-hysyd.png")
        },
            {
          menuID: "4",
          menuText: "会议申请",
          routeUrl: "/meeting/apply",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/hy-hysq.png")
        },
          {
          menuID: "5",
          menuText: "会议管理",
          routeUrl: "/meetingManage",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/hy-hygl.png")
        },
        // {
        //   menuID: "1",
        //   menuText: "视频会议",
        //   routeUrl: "/openSchedule",
        //   type: "route",
        //   params: null,
        //   imgUrl: require("@/assets/imgs/appCenter/hy-sphy.png")
        // },
        // {
        //   menuID: "2",
        //   menuText: "电话会议",
        //   routeUrl: "",
        //   type: "route",
        //   params: null,
        //   imgUrl: require("@/assets/imgs/appCenter/hy-dhhy.png")
        // },



        {
          menuID: "6",
          menuText: "会议签到",
          routeUrl: "/inConstruction",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/hy-hyqd.png")
        }
      ],
      studyMenu: [
        {
          menuID: "8",
          menuText: "信息公开",
          routeUrl: "/msgdisclosure",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/xx-xxgk.png")
        },
        {
          menuID: "9",
          menuText: "电子刊物",
          routeUrl: "/electronic",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/xx-dzkw.png")
        }
      ],
      partyBuildMenu: [
        // {
        //   menuID: "10",
        //   menuText: "云上党建",
        //   routeUrl: "",
        //   type: "url",
        //   params: null,
        //   imgUrl: require("@/assets/imgs/appCenter/dj-ysdj.png")
        // },
        {
          menuID: "11",
          menuText: "i党建",
          routeUrl:
            "http://ipb.dreamdt.cn:81/iPB/dist/index.html#/authLogin/15000583554",
          type: "url",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/dj-idj.png")
        },
          {
          menuID: "7",
          menuText: "学习邦",
          routeUrl: "http://ipb2.dreamdt.cn:81/dsfa/nc/mobile/dist/webmobile/index.html?v=1.10#/",
          type: "url",
          imgUrl: require("@/assets/imgs/appCenter/xx-xxb.png")
        },
        {
          menuID: "12",
          menuText: "党建直播",
          routeUrl: "/openSchedule",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/dj-djzb.png")
        }
      ],
      docManagenMenu: [
        {
          menuID: "13",
          menuText: "收文登记",
          routeUrl: "/signinlist",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/gwgl-swdj.png")
        },
        {
          menuID: "14",
          menuText: "发文起草",
          routeUrl: "/postlist",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/gwgl-fwqc.png")
        },
        {
          menuID: "15",
          menuText: "公文检索",
          routeUrl: "/search",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/gwgl-gwjs.png")
        },
        {
          menuID: "16",
          menuText: "公文统计",
          routeUrl: "/inConstruction",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/gwgl-gwtj.png")
        }
      ],
      SupervisionMenu: [
        {
          menuID: "17",
          menuText: "督办立项",
          routeUrl: "/supervise",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/dcdb-dblx.png")
        },
        {
          menuID: "18",
          menuText: "督办管理",
          routeUrl: "/inspectorList",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/dcdb-dbgl.png")
        },
        {
          menuID: "19",
          menuText: "督办反馈",
          routeUrl: "/inspectorFeedback",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/dcdb-dbfk.png")
        },
        {
          menuID: "20",
          menuText: "督办统计",
          routeUrl: "/inConstruction",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/dcdb-dbtj.png")
        }
      ],
      letMaMenu: [
        {
          menuID: "21",
          menuText: "来电受理",
          isShow:false,
          routeUrl: "/",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/xfgl-ldsl.png")
        },
        {
          menuID: "22",
          menuText: "来信受理",
           isShow:false,
          routeUrl: "/",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/xfgl-lxsl.png")
        },
        {
          menuID: "23",
          menuText: "来访受理",
          isShow:false,
          routeUrl: "/",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/xfgl-lfsl.png")
        }
      ],
      streeTownMenu: [
        {
          menuID: "24",
          menuText: "政策咨询",
          routeUrl: "http://ipb3.dreamdt.cn:81/dsfa/ztc/pc/consult/dist/index.html?id=191032&dd_func_wk=false#/zxWt?flType=0",
          type: "url",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/jzztc-zczx.png")
        },
        {
          menuID: "25",
          menuText: "问题沟通",
          routeUrl: "http://ipb3.dreamdt.cn:81/dsfa/ztc/pc/consult/dist/index.html?id=191032&dd_func_wk=false#/zxWt?flType=1",
          type: "url",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/jzztc-wtgt.png")
        },
        {
          menuID: "26",
          menuText: "村村通",
          routeUrl: "/openSchedule",
          type: "route",
          params: null,
          imgUrl: require("@/assets/imgs/appCenter/jzztc-cct.png")
        }
      ]
    };
  },
  methods: {
    goMeetingMenu(id){
       this.meetingMenu.forEach(item => {
          if (item.menuID == id) {
            if (item.type == "url") {
              window.location.href = item.routeUrl
            } else if (item.type == 'route') {
              this.$router.push(item.routeUrl);
            } else {
              let params = {
                ...item.params,
                onSuccess: function(result) {},
                onFail: function(err) {}
              };
              console.log(params)
              dd.biz.microApp.openApp(params)
            }
          }
        });
    },
    gostudyMenu(id){
       this.studyMenu.forEach(item => {
          if (item.menuID == id) {
            if (item.type == "url") {
              window.location.href = item.routeUrl
            } else if (item.type == 'route') {
              this.$router.push(item.routeUrl);
            } else {
              let params = {
                ...item.params,
                onSuccess: function(result) {},
                onFail: function(err) {}
              };
              dd.biz.microApp.openApp(params)
            }
          }
        });
    },
    goPartyBuildMenu(id){
       this.partyBuildMenu.forEach(item => {
          if (item.menuID == id) {
            if (item.type == "url") {
              window.location.href = item.routeUrl
            } else if (item.type == 'route') {
              this.$router.push(item.routeUrl);
            } else {
              let params = {
                ...item.params,
                onSuccess: function(result) {},
                onFail: function(err) {}
              };
              dd.biz.microApp.openApp(params)
            }
          }
        });
    },
    goDocManagenMenu(id){
       this.docManagenMenu.forEach(item => {
          if (item.menuID == id) {
            if (item.type == "url") {
              window.location.href = item.routeUrl
            } else if (item.type == 'route') {
              this.$router.push(item.routeUrl);
            } else {
              let params = {
                ...item.params,
                onSuccess: function(result) {},
                onFail: function(err) {}
              };
              dd.biz.microApp.openApp(params)
            }
          }
        });
    },
    goSupervisionMenu(id){
       this.SupervisionMenu.forEach(item => {
          if (item.menuID == id) {
            if (item.type == "url") {
              window.location.href = item.routeUrl
            } else if (item.type == 'route') {
              this.$router.push(item.routeUrl);
            } else {
              let params = {
                ...item.params,
                onSuccess: function(result) {},
                onFail: function(err) {}
              };
              dd.biz.microApp.openApp(params)
            }
          }
        });
    },
    goLetMaMenu(id){
      this.letMaMenu.forEach(item => {
          if (item.menuID == id) {
            if (item.type == "url") {
              window.location.href = item.routeUrl
            } else if (item.type == 'route') {
              this.$router.push(item.routeUrl);
            } else {
              let params = {
                ...item.params,
                onSuccess: function(result) {},
                onFail: function(err) {}
              };
              dd.biz.microApp.openApp(params)
            }
          }
        });
    },
    goStreeTownMenuu(id){
       this.streeTownMenu.forEach(item => {
          if (item.menuID == id) {
            if (item.type == "url") {
              window.location.href = item.routeUrl
            } else if (item.type == 'route') {
              this.$router.push(item.routeUrl);
            } else {
              let params = {
                ...item.params,
                onSuccess: function(result) {},
                onFail: function(err) {}
              };
              dd.biz.microApp.openApp(params)
            }
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-moduleIndex {
  margin-top: 10px;
  background-color: #fff;
  width: 100%;
  height: auto;

  .dsf-list {
    box-sizing: border-box;
    padding: 0 0px 0.64rem;
    width: 100%;
    height: 100%;

    .menu {
     display: inline-block;
      width: 25%;
      text-align: center;
      margin-bottom: 15px;

      img {
        display: inline-block;
        width: 48px;
        vertical-align: middle;
        margin-bottom: 6px;
      }

      p {
        font-size: var(--font_size_2);
        color: #333333;
        letter-spacing: 1px;
      }
    }

    .menu:nth-child(n + 4) {
      margin-bottom: 0;
    }
  }
}
 .title{
    padding: 8px 15px;
    box-sizing: border-box;
    position: relative;
    @include font_2;
    font-weight: bold;
    span{
      margin-left: 5px;
      font-size:19px;
      color:#333;
    }
    &::before{
      content: '';
      display: block;
      width: 5px;
      height: 20px;
      position: absolute;
      top: 50%;
      transform: translate(-5px, -50%);
      @include background-theme('normal');
    }
 }
 .dsf-list::before{
       content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;

 }
</style>
