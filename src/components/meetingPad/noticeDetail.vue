<template>
  <div class="notice-detail-container">
    <div class="notice-detail-top">
      <van-icon name="arrow-left" @click="$router.back()"/>
      <h2>通知公告详情</h2>
    </div>
    <div v-if="noticeInfo" class="notice-detail-con">
      <h2>{{ noticeInfo.bt }}</h2>
      <p>
        <span>{{ noticeInfo.createUName }}</span>
        <span>{{ noticeInfo.createTime }}</span>
      </p>
      <div v-html="noticeInfo.xxnr"></div>
    </div>
  </div>
</template>
<script>
export default {
  name:"NoticeDetail",
  data(){
    return {
      noticeInfo:null,
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      dsf.http
        .get(`fn/conferenceMessage/getHyMessageInfo`, {
          pk: this.$route.query.id
        })
        .done(result => {
          if (result.data) {
            this.noticeInfo = result.data
          }
        })
        .error(error => {
          console.log("error", error);
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.notice-detail-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .notice-detail-top {
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

  .notice-detail-con {
    flex: 1;
    overflow: auto;
    h2{
      flex: 1;
      text-align: center;
      font-size: 52px;
      padding: 50px 0;
    }

    p {
      display: flex;
      justify-content: space-between;
      color: #999;
    }

    div {
      font-size: 44px;
      margin-top: 20px;
    }
  }
}
</style>