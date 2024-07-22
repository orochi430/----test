<template>
  <div class="notice-container">
    <div class="top">
      <van-cell
        title="通知公告"
        class="top-back"
        icon="arrow-left"
        center
        @click="$router.back()"
      ></van-cell>
    </div>
    <div class="content">
      <noticeList :lists="lists" @updataNotice="updataNotice"></noticeList>
    </div>
  </div>
</template>
<script>
import noticeList from "./components/noticeList.vue"
export default {
  components:{
    noticeList
  },
  data(){
    return {
      lists:[],
      meeting: dsf.util.loadSessionStore("meeting"),
    }
  },
  created(){
    this.getData();
  },
  methods:{
    updataNotice(item){
      this.$router.push({path:"/meetingPad/index/noticeDetail",query:{id:item.id}})
    },
    getData(){
      dsf.http
        .get(`fn/list/220805151958YDvJC1dKNborQu59aYL/mobile/q`, {
          moduleId:'220805144232vEngwl5cKAqX8AQE43x',
          fid:this.meeting.id
        })
        .done(result => {
          if (result.datas) {
            this.lists = []
            result.datas.forEach(item => {
              this.lists.push({
                id: item.dataValue['hwxt_hyxx.A0001'],
                title: item.dataValue['hwxt_hyxx.B0001.value'],
                time: item.dataValue['hwxt_hyxx.C-HWXT-HYXX-0007.value'],
                isRead:item.dataValue['B.C-HWXT-HYXX-USER-0002.value']
              })
            })
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
.notice-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top {
    .van-cell__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600 !important;

      span {
        font-size: 0.88rem;
        padding-left: 0.4rem;
      }
    }

    .van-cell__left-icon {
      font-size: 0.8rem;
    }
  }

  > .content {
    flex: 1;
    overflow: auto;
    padding: 40px;
  }

  .notice-detail {
    padding: 32px;
    height: 45vh;
    width: 50vw;
    display: flex;
    flex-direction: column;

    .notice-detail-top {
      font-size: 44px;
      text-align: center;
      font-weight: 700;
      height: 100px;
      line-height: 100px;
    }
    
    .notice-detail-con {
      height: calc(100% - 200px);
      overflow: auto;
      border: 1px solid #DCDCDC;
      padding: 32px;
      color: #333;
    }

    .notice-detail-btn {
      height: 100px;
      line-height: 100px;
      display: flex;
      align-items: end;
      flex-direction: row-reverse;

      ::v-deep .van-button {
        width: 4rem;
        height: 1.6rem;
        font-size: 32px;
      }
    }
  }
}
</style>