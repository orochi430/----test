<template>
  <div class="reserve-meeting">
<!--    <van-nav-bar title="预定会议室" left-arrow @click-left="$router.back()" />-->
    <van-popup v-model="showPicker" position="bottom" round get-container="#app" :style="{ height: '500px' }">
      <van-calendar :poppable="false" @confirm="onConfirm" first-day-of-week="1"/>
    </van-popup>
    <div class="_time" @click="showPicker = true">
      <i class="iconfont">&#xe61f;</i>
      <span class="ds_font6">{{ dateStr }}</span>
    </div>
    <div class="_contents">
      <div v-for="item in meetingData" :key="item.id"
           class="_content" @click="book(item)">
        <div class="_item">
          <div class="_left">
            <div class="_title ds_font4">{{ item.name }}</div>
            <div class="_shebei ds_font6">{{ item.configSetUp | emptyFilter('暂无相关设备') }}</div>
            <div class="_num">
              <i class="iconfont">&#xe614;</i>
              <span class="ds_font6">{{ item.number }}</span>
            </div>
          </div>
          <div class="_right">
            <van-image :src="item.images | urlFilter" fit="cover" lazy-load>
              <template v-slot:error>
                <img src="../../assets/imgs/meetingRoom.jpg">
              </template>
            </van-image>
          </div>
        </div>
<!--        <div class="_status">-->
<!--          <div v-for="(v, i) in item.occupydate"-->
<!--               :key="i"-->
<!--               class="_status-item">-->
<!--            <div class="name">{{ statusConfig[v.status] }}</div>-->
<!--            <span>{{ v.starttime }} 到 {{ v.endtime }}</span>-->
<!--          </div>-->
<!--        </div>-->
        <div class="_progress">
          <div class="_progress-box">
            <div v-if="expire"
                 :style="expire"
                 class="_progress-bar __o"/>
            <div v-for="(v, i) in item.occupydate"
                 :key="i"
                 :style="progressBar(v)"
                 :class="['__' + v.status]"
                 class="_progress-bar"/>
          </div>
          <div class="_time_dot">
            <div v-for="n in 17" :key="n">{{ n + 6 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../../common/util";
export default {
  name: "reserveMeeting",
  filters: {
    emptyFilter(str, tips) {
      if (str && str.length > 0) {
        return str;
      }
      return tips;
    },
    urlFilter(str) {
      return (str.indexOf("ctrl/")>-1||str.indexOf("fn/")>-1)?(dsf.config.assetsRoot + str):dsf.url.getServerUrl("/fn/file/downloadImage?fileName=" + str);
    }
  },
  data() {
    let now = new Date();
    return {
      type: this.$route.query.type || 0,
      expire: null,
      date: dsf.date.format(now, 'yyyy-mm-dd'),
      dateStr: dsf.date.format(now, 'mm月dd日 DD'),
      showPicker: false,
      statusConfig: {
        0: '未审核通过/审核中',
        1: '审核通过',
        2: '被占用',
        3: '被锁定',
        4: '本人预定'
      },
      meetingData: [],
      moduleId:dsf.config.meetingConfig.reserveModuleId,
      reserveMeeting:dsf.config.meetingConfig.reserveMeeting
    };
  },
  created() {
    this.init();
  },
  methods: {
    onConfirm(date) {
      this.date = dsf.date.format(date, 'yyyy-mm-dd');
      this.dateStr = dsf.date.format(date, 'mm月dd日 DD');
      this.showPicker = false;
      this.init();
    },
    progressBar({endtime, starttime}) {
      let e = dsf.date.parse(endtime, 'yyyy-mm-dd hh:ii');
      let s = dsf.date.parse(starttime, 'yyyy-mm-dd hh:ii');
      let m = dsf.date.parse(starttime.split(' ')[0] + ' 07:00', 'yyyy-mm-dd hh:ii');
      let width = ((e - s) * 100 / 57600000).toFixed(2) + '%';
      let left = ((s - m) * 100 / 57600000).toFixed(2)  + '%';
      return {left, width};
    },
    setExpire () {
      let now = new Date();
      let starttime = dsf.date.format(now, 'yyyy-mm-dd 07:00');
      if (starttime.indexOf(this.date) === -1) {
        this.expire = null;
      } else {
        this.expire = this.progressBar({
          starttime,
          endtime: dsf.date.format(now, 'yyyy-mm-dd hh:ii')
        });
      }
    },
    book (item) {
      util.saveToSessionStore("checkedMettingRoom",{value:item.id,text:item.name});
      this.$router.push(`/commonForm/${this.moduleId}`);
    },
    /********数据请求*******/
    init() {
      this.postData();
      // dsf.http.get("static/moduleId.json")
      // .then(({data})=>{
      //   this.moduleId=data.meetingConfig.reserveModuleId
      // })
    },
    postData () {
      let _loading = dsf.layer.loading();
      this.setExpire();
      dsf.http.post(this.reserveMeeting, {
        date: this.date
      }).done(res => {
        if (res.code + '' === '200') {
          this.postDataSuccess(res.data);
        }
      }).error(() => {
        dsf.layer.toast('请求异常');
      }).always(() => {
        dsf.layer.closeLoading(_loading);
      });
    },
    postDataSuccess (list) {
      this.meetingData = list;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
.reserve-meeting {
  display: flex;
  flex-flow: column;
  @include font_4();
  ._time {
    height: 50px;
    background: #fff;
    display: flex;
    align-items: center;
    padding-left: 15px;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.2);
    position: relative;
    z-index: 100;
    i {
      margin-right: 5px;
    }
    span {
      color: $fontColor_main;
    }
  }
  ._contents {
    height: calc(100vh - 50px);
    overflow-y: auto;
    ._content {
      box-sizing: border-box;
      min-height: 103px;
      margin-top: 15px;
      padding: 15px 15px 12px;
      display: flex;
      flex-flow: column;
      @include background-theme("button_auxiliary_bgcolor");
      ._item {
        display: flex;
        justify-content: space-between;
        ._left {
          ._title {
          }
          ._shebei {
            margin: 10px 0;
            color: #666666;
          }
          ._num {
            display: flex;
            align-items: center;
            margin-bottom: 19px;
            span {
              color: #666666;
              margin-left: 5px;
            }
          }
        }
        ._right {
          flex: none;
          width: 100px;
          height: 75px;
          margin-left: 10px;
          .van-image {
            border-radius: 5px;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        }
      }
    }
  }
  ._progress{
    box-sizing: border-box;
    height: 20px;
    padding-top: 20px;
    margin-bottom: 27px;
    position: relative;
    &-box{
      height: 100%;
      width: 100%;
      background: #ffffff;
      border: 1px solid #e8e8e8;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
    }
    &-bar{
      height: 100%;
      width: 0;
      position: absolute;
      left: 0;
      top: 0;
      &.__o{ // 过期
        background-color: #e8e8e8;
      }
      &.__0, // 未审核通过/审核中 锁定
      &.__1, // 审核通过/已确认
      &.__2, // 被占用
      &.__3{ // 被锁定
        background-color: #d0d0d0;
      }
      &.__4{ // 本人预定
        background-color: #21a301;
      }
    }
    ._time_dot{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-top: 3px;
      position: relative;
      left: -3.125%;
      div{
        display: block;
        flex: none;
        text-align: center;
        font-size: var(--font_size_4);
        color: $fontColor;
        width: 6.25%;
      }
    }
  }
  /*._status{
    @include font_6();
    color: #666;
    &-item{
      line-height: 1.4em;
      margin-bottom: 0.5em;
    }
  }*/
}
</style>
