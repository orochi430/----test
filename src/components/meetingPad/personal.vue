<template>
  <div class="personal-container">
    <div class="personal-top">
      <van-icon name="arrow-left" @click="$router.back()"/>
      <h2>个人中心</h2>
    </div>
    <div class="personal-con">
      <div v-if="userInfo" class="personal-main">
        <div class="personal-main-left">
          <img :onerror="default_avatar" :src="dsf.url.getWebPath(userInfo.photo)" alt="">
          <div class="personal-main-left-username">{{ userInfo.userName }}</div>
        </div>
        <div class="personal-main-right">
          <div class="info-item">
            <span class="name">性别</span>
            <span class="val">{{ userInfo.sex }}</span>
          </div>
          <div class="info-item">
            <span class="name">手机号码</span>
            <span class="val">{{ userInfo.tel }}</span>
          </div>
          <div class="info-item">
            <span class="name">部门</span>
            <span class="val">{{ userInfo.dept }}</span>
          </div>
        </div>
      </div>
      <div class="personal-operation">
        <div class="personal-operation-item" @click="changeClick">
          <span class="icon-xgmm"></span>
          <span>修改密码</span>
        </div>
        <div class="personal-operation-item" @click="setFontSize">
          <span class="icon-ztdxsz"></span>
          <span>字体大小设置</span>
        </div>
      </div>
    </div>
    <div class="personal-logout">
      <van-button type="info" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      userInfo:null,
      default_avatar: 'this.src="' + require('static/images/meetingPad/avatar.png') + '"',
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      dsf.http
        .get(`fn/conferenceMobile/singleton`, {
          userId: dsf.util.loadSessionStore('user').user_id
        })
        .done(result => {
          if (result.data) {
            this.userInfo = result.data
          }
        })
        .error(error => {
          console.log("error", error);
        })
    },
    changeClick(){
      this.$router.push({
        path:"/meetingPad/index/changePwd"
      })
    },
    setFontSize(){
      this.$router.push({
        path:"/meetingPad/index/setFontSize"
      })
    },
    logout(){
      this.$router.push({name:'meetingPadLogin'})
    }
  }
}
</script>
<style lang="scss" scoped>
.personal-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .personal-top {
    display: flex;
    padding-bottom: 50px;
    border-bottom: 1px solid #3389E0;

    ::v-deep .van-icon {
      line-height: 70px;
    }
    
    h2{
      flex: 1;
      text-align: center;
      color: #3389E0;
      font-size: 52px;
    }
  }

  .personal-con {
    flex: 1;
    .personal-main {
      display: flex;
      border: 1px solid #DCDCDC;
      padding: 38px 52px;
      margin-top: 50px;
      
      .personal-main-left {
        min-width: 282px;

        img {
          border-radius: 50%;
        }

        .personal-main-left-username {
          margin-top: 42px;
          font-size: 44px;
          color: #333333;
          font-weight: 700;
          text-align: center;
        }
      }
      .personal-main-right {
        flex: 1;
        margin-left: 95px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 40px 0;

        .info-item {
          display: flex;

          .name {
            width: 180px;
            padding-right: 50px;
            font-size: 40px;
            color: #666666;
          }

          .val {
            flex: 1;
            font-size: 40px;
          color: #333333;
            text-align: right;
          }
        }
      }
    }

    .personal-operation {
      .personal-operation-item {
        height: 200px;
        line-height: 200px;
        font-size: 40px;
        color: #333333;
        display: flex;
        align-items: center;
        padding: 0 18px;
        border-bottom: 1px solid #DCDCDC;

        .icon-xgmm {
          background: url(/static/images/meetingPad/xgmm.png) no-repeat;
        }

        .icon-ztdxsz {
          background: url(/static/images/meetingPad/ztdxsz.png) no-repeat;
        }

        .icon-xgmm,.icon-ztdxsz {
          display: inline-block;
          width: 98px;
          height: 98px;
          border-radius: 50%;
          background-size: 100% 100%;
          margin-right: 44px;
        }
      }
      
    }
  }

  .personal-logout {
    display: flex;
    justify-content: center;

    ::v-deep .van-button {
      width: 17rem;
      height: 2rem;
      background-color: #3B74DB;
      border-color: #3B74DB;
      font-size: 40px;
      color: #FFFFFF;
    }
  }
}
</style>