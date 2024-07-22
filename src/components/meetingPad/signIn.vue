<template>
  <div>
    <div class="container">
      <!--    背景图片-->
      <div class="bg-image">
        <img src="static/images/meetingPad/signIn-bg.png" alt=""/>
      </div>

      <!--    顶部签到-->
      <div class="signIn-header">
        <div class="signIn-header-text">
          签到
        </div>
      </div>

      <!--    中间的按钮和地址-->
      <div class="sign-card">
        <van-button type="primary" ref="signBtn" @click="!isSign && doSign()" :disabled="isSign || !onTime">
          <div class="sign-card-text" v-show="!isSign">{{ signText }}</div>
          <div class="sign-card-text" v-show="isSign">已签到</div>
          <div class="sign-card-time">{{ time }}</div>
        </van-button>
        <div class="signTime">
          <ul>
            <li v-show='signInData.time'>
              <span>可签到时间:</span>
              <b>{{signInData.time}}</b>
            </li>
            <li v-show='isSign'>
              <span>已签到时间:</span>
              <b>{{signInData.signtime}}</b>
            </li>
          </ul>
        </div>
<!--        <div class="location">-->
<!--          <div class="location-text">-->
<!--            &lt;!&ndash;          地址是否正确&ndash;&gt;-->
<!--            <van-icon name="checked" color="rgb(68,202,137)"/>-->
<!--            &lt;!&ndash;          <van-icon name="clear" color="rgb(238,10,36)"/>&ndash;&gt;-->
<!--            {{ address }}-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import exclusiveInvoke from "gdt-jsapi/exclusiveInvoke";
import signDetail from "./signDetail";

export default {
  name: "signIn",
  components: {
    signDetail
  },
  data() {
    return {
      geoLocation: {},//定位信息
      address: "定位中……",//设备当前地址
      time: '00:00:00',//实时时间显示  00:00:00
      user: dsf.util.loadSessionStore("user"),
      meeting: dsf.util.loadSessionStore("meeting"),
      timeInterval: {},//实时显示时间定时器
      nowDateYMD: '',//实时时间，年月日、时分  2022-08-08 00:00
      onTime: false,//是否在签到时间
      isSign: false,//是否已签到
      scheduleId: '',
      startTime:'',//会议开始时间
      endTime:'',//会议结束时间
      signText:'',//签到显示状态
      signInData:{}//签到信息
    }
  },
  computed: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.nowDateYMD = this.getDate()
      this.time = this.getTime()
      // this.getPosition()
      this.showTime()
      dsf.http
        .post("fn/conferenceSignIn/getUserCurrentSignInDetail", {
          meetingId: this.meeting.id
        })
        .then(res => {
          this.signInData = res.data.data
          this.scheduleId = this.signInData.scheduleId
          const timeList = this.signInData.time.split(' - ')
          this.startTime=timeList[0]
          this.endTime=timeList[1]
          this.signText = this.isOnTime()
          this.isSign = this.signInData.signText === '已签到';
        })
        .error(error => {
          console.log(error)
        });
    },


    //获取当前用户签到情况
    getIsSign() {
      this.isSign = false
    },

    //判断是否在签到时间
    isOnTime() {
      let nowDate
      if (this.startTime.length < 6){
        nowDate=this.getDate2()
      }else {
        nowDate=this.getDate()
      }
      this.onTime = nowDate >= this.startTime && nowDate <= this.endTime;
      if (nowDate < this.startTime) {
        return '会议未开始';
      }
      if (nowDate > this.endTime) {
        return '已超时';
      }
      if (this.onTime) {
        return '签到';
      }
    },

    //设置定时器，实时显示时间
    showTime() {
      this.timeInterval = setInterval(() => {
        this.time = this.getTime()
      }, 1000)
    },
    //格式化时间，时分秒
    getTime() {
      let nowDate = new Date();
      let hour = nowDate.getHours() >= 10 ? nowDate.getHours() : '0' + nowDate.getHours();
      let minutes = nowDate.getMinutes() >= 10 ? nowDate.getMinutes() : '0' + nowDate.getMinutes();
      let seconds = nowDate.getSeconds() >= 10 ? nowDate.getSeconds() : '0' + nowDate.getSeconds();
      return hour + ':' + minutes + ':' + seconds;
    },
    //格式化时间，年月日，时分
    getDate() {
      let nowDate = new Date();
      let year = nowDate.getFullYear()
      let month = (nowDate.getMonth() + 1) >= 10 ? (nowDate.getMonth() + 1) : '0' + (nowDate.getMonth() + 1);
      let day = nowDate.getDate() >= 10 ? nowDate.getDate() : '0' + nowDate.getDate();
      let hour = nowDate.getHours() >= 10 ? nowDate.getHours() : '0' + nowDate.getHours();
      let minutes = nowDate.getMinutes() >= 10 ? nowDate.getMinutes() : '0' + nowDate.getMinutes();
      let second = nowDate.getSeconds() >= 10 ? nowDate.getSeconds() : '0' + nowDate.getSeconds();
      return month + '-' + day + ' ' + hour + ':' + minutes + ':' + second;
    },

    getDate2(){
      let nowDate = new Date();
      let hour = nowDate.getHours() >= 10 ? nowDate.getHours() : '0' + nowDate.getHours();
      let minutes = nowDate.getMinutes() >= 10 ? nowDate.getMinutes() : '0' + nowDate.getMinutes();
      return hour + ':' + minutes;
    },
    //获取设备当前地址
    // getPosition() {
    //   let self = this;
    //   if (self.$route.query.demo === "1") {
    //     self.geoLocation = {
    //       status: "定位成功",
    //       LocationType: "5",
    //       Longitude: "121.92772",
    //       Latitude: "30.888838",
    //       Accuracy: "50.0米",
    //       Provider: "lbs",
    //       Speed: "0.0米\/秒",
    //       Bearing: "0.0",
    //       Satellites: "0",
    //       Country: "中国",
    //       Province: "上海市",
    //       City: "上海市",
    //       CityCode: "021",
    //       District: "浦东新区",
    //       Street: "水芸路",
    //       StreetNum: "55号",
    //       AdCode: "310115",
    //       Address: "上海市浦东新区水芸路55号靠近港城广场",
    //       PoiName: "港城广场",
    //       Altitude: "0.0",
    //       Time: "2022-06-06 16:39:51"
    //     };
    //     self.address = self.geoLocation.Address;
    //   } else {
    //     exclusiveInvoke({
    //       api: "location.get"
    //     })
    //       .then(res => {
    //         console.log("getPosition", res);
    //         if (res.platform && res.platform.toLowerCase().includes("ios")) {
    //           console.log(res.platform);
    //           // res = JSON.parse(res.result);
    //           console.log(res.result.split(","));
    //           let pos = {};
    //           res.result.split(",").forEach(item => {
    //             console.log(item.split("="));
    //             pos[item.split("=")[0]] = item.split("=")[1];
    //           });
    //           console.log("getPosition-res", pos);
    //           self.geoLocation = pos;
    //           self.address = self.geoLocation.address;
    //         } else if (res.data) {
    //           console.log("安卓sdk定位");
    //           res = JSON.parse(res.data);
    //           console.log("getPosition-res", res);
    //           if (res.status === "success") {
    //             self.geoLocation = res.data;
    //             self.address = self.geoLocation.Address;
    //           }
    //         }
    //       })
    //       .catch(err => {
    //         console.log("getPosition-err", err);
    //       });
    //   }
    // },
    //签到
    doSign() {
      dsf.http
        .post("fn/conferenceSignIn/doSign", {
          meetingId: this.meeting.id,
          scheduleId: this.scheduleId
        })
        .done(res => {
          if (res.type === "success") {
            this.isSign = true;
            this.signInData.signtime = this.getDate()
          } else {
            dsf.layer.toast(res.message);
          }
        })
        .error(error => {
          console.log("doSign-error", error);
          dsf.layer.toast("签到失败！");
        });
    },
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 28.66rem;
  flex-direction: column;

  .bg-image {
    position: absolute;
    width: 45rem;
    z-index: 1;
    height: 91%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .signIn-header {
    width: 100%;
    height: 0.96rem;
    background-color: #3389e0;
    border-radius: 0.28rem 0.28rem 0 0;
    z-index: 2;
    display: flex;
    justify-content: center;

    &-text {
      background-color: #3389e0;
      width: 6rem;
      height: 1.44rem;
      font-size: 0.8rem;
      color: #FFFFFF;
      text-align: center;
      border-radius: 50%;
      padding-top: 0.2rem;
    }
  }

  .sign-card {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 2;


    .signTime {
      margin-top: 10px;
      font-size: var(--font_size_2);
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 2rem;
      width: 20rem;
      ul {
        text-align: left;
      }
      li {
        margin-top: 1.28rem;
        font-size: 0.8rem;
        color: #000;
        line-height: 1.04rem;
        height: 30px;
        text-align: left;
        b {
          margin-left: 5px;
        }
      }
    }
    &-text {
      color: #FFFFFF;
      margin-bottom: 0.44rem;
      font-size: 1.04rem;
      line-height: 1.08rem;
      text-align: center;
    }

    &-time {
      color: #6FC7FC;
      font-size: 1.04rem;
      line-height: 1.08rem;
      text-align: center;
    }

    .van-button--primary {
      background-image: linear-gradient(180deg, #219FE4 0%, #1667BA 100%);
      box-shadow: 0 0.08rem 0.4rem 0 rgba(22, 103, 186, 0.63), 0 -0.02rem 0 0 #1F97DE, 0 0.02rem 0.06rem 0 #1667BA;
      height: 8.88rem;
      width: 8.88rem;
      border-radius: 50%;
      border: none;
    }

    .location {
      margin-top: 1.28rem;

      &-text {
        display: inline;
        font-size: 0.8rem;
        color: #999999;
        line-height: 1.04rem;
      }
    }
  }
}

</style>
