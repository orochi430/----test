<template>
  <div class="ds-meeting-sign-up-status">
    <!--    <van-nav-bar fixed title="报名情况" left-arrow @click-left="$router.back()" />-->
    <van-tabs v-model="tabIndex" type="card" animated sticky>
      <van-tab>
        <div slot="title" class="tab_title">
          单位内
          <span v-if="unitindata.length">({{ unitindata.length }})</span>
        </div>
        <div class="not-sign common">
          <div class="personInfo disfr ac" v-for="(item,index) in unitindata" :key="index" @click="toDetail(item)">
            <img v-if="item.photoSrc" class="userImg" :src="item.photoSrc" />
            <div v-else class="userImg">{{item.userName}}</div>
            <div class="itemContent fc jsb">
              <span class="personName">{{item.userName}}</span>
              <span class="personNum">{{item.mobile}}</span>
            </div>
          </div>
          <commonempty v-if="unitindata.length === 0" />
        </div>
      </van-tab>
      <van-tab>
        <div slot="title" class="tab_title">
          单位外
          <span v-if="unitoutdata.length">({{ unitoutdata.length }})</span>
        </div>
        <div class="not-sign common">
          <div class="personInfo disfr ac" v-for="(item,index) in unitoutdata" :key="index" @click="toDetail(item)">
            <img v-if="item.photoSrc" class="userImg" :src="item.photoSrc" />
            <div v-else class="userImg">{{item.userName}}</div>
            <div class="itemContent fc jsb">
              <span class="personName">{{item.userName}}</span>
              <span class="personNum">{{item.mobile}}</span>
            </div>
          </div>
          <commonempty v-if="unitoutdata.length === 0" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import dingBtn from "@/components/common/DingBtn";
import commonUse from "../mailList/commonUse.vue";

export default {
  name: "MeetingSignUpStatus",
  components: { dingBtn, commonUse },
  data() {
    return {
      id: this.$route.query.id || "",
      dingObjbaoming: {},
      tabIndex: 0,
      unitoutdata: [],
      unitoutcount: '',
      unitindata: [],
      unitincount: ''
    };
  },
  created() {
    console.log(this.id);
    this.getMeetingAddressList(this.id);
  },
  methods: {
    getMeetingAddressList(id) {
      dsf.http.post('fn/newMeeting/meetingAddressList',{id: id}).then(res => {
        if(res.data.code == 200) {
          this.unitoutdata = res.data.unitoutdata
          this.unitoutcount = res.data.unitoutcount
          this.unitindata = res.data.unitindata
          this.unitincount = res.data.unitincount
        } else {

        }
      })
    }
    
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-meeting-sign-up-status {
  /*padding-top: 46px;*/
  height: 100%;
  box-sizing: border-box;
  @include font_4();
  * {
    box-sizing: border-box;
  }
  .van-nav-bar {
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.05);
    z-index: 200;
  }
  .van-icon-arrow-left {
    color: #333;
    font-weight: 600;
    font-size: 1.5em;
  }
  ._footer {
    width: 100%;
    height: 83px;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-button {
      width: 346px;
      height: 48px;
      border-radius: 12px;
      @include background-theme('normal');
    }
  }
  .van-tabs {
    height: 100%;
    &__wrap {
      padding: 13px 0;
      background-color: #fff;
      margin-bottom: 15px;
    }
    &__nav--card {
      @include border-color-theme("normal", true);
      .van-tab {
        @include border-color-theme("normal", true);
        @include font-theme("normal", true);
        &.van-tab--active {
          @include background-theme("normal", true);
          color: #fff !important;
        }
      }
    }
    &__content {
      height: calc(100% - 72px);
      background-color: #fff;
    }
  }
  .van-tab {
    &__pane {
      height: 100%;
      overflow-y: auto;
    }
  }

 
  // 请假
}
</style>
