<template>
  <div class="message-container">
    <div class="top">
      <van-cell
        title="消息提醒"
        class="top-back"
        icon="arrow-left"
        center
        @click="$router.back()"
      ></van-cell>
    </div>
    <div class="content">
      <messageList :lists="lists" @updatamessage="updatamessage"></messageList>
    </div>
    <van-popup v-if="currentmessage" v-model="show">
      <div class="message-detail">
        <div class="message-detail-top">消息</div>
        <div class="message-detail-con">
          {{ currentmessage.title }}
        </div>
        <div class="message-detail-btn">
          <van-button type="default" @click="closeClick">关闭</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import messageList from "./components/messageList.vue"
export default {
  components:{
    messageList
  },
  data(){
    return {
      lists:[],
      meeting: dsf.util.loadSessionStore("meeting"),
      currentmessage:null,
      show:false
    }
  },
  created(){
    this.getData();
  },
  methods:{
    updatamessage(item){
      this.currentmessage = item
      this.show = true
    },
    closeClick(){
      this.show = false
    },
    delClick(){
        dsf.http
          .post(`fn/list/deleteRows`, {
            metaKey: "A0001",
            pk: this.currentmessage.id,
            moduleId: "220805142201Z2JRY83u6rPqYsQk1uk",
            formId: "220805144114MAufCqtIpiY9Rt8TkYx",
          })
          .done(result => {
            if (result.code==='200') {
            dsf.layer.toast("删除成功！", true);
            this.getData()
            }
          })
          .error(error => {
            console.log("error", error);
          })
    },
    getData(){
      dsf.http
        .get(`fn/list/220805144114MAufCqtIpiY9Rt8TkYx/mobile/q`, {
          moduleId:'220805142201Z2JRY83u6rPqYsQk1uk',
          fid:this.meeting.id,
          isFirst:1
        })
        .done(result => {
          if (result.datas) {
            this.lists = []
            result.datas.forEach(item => {
              this.lists.push({
                title: item.dataValue['HYXX.B0001'],
                time: item.dataValue['HYXX.C-HWXT-HYXX-0007'],
                sender: item.dataValue['HYXX.B0009'],
                isRead: item.dataValue['HWXT_HYXX_USER.C-HWXT-HYXX-USER-0002.value'] == '1',
                id: item.dataValue['HYXX.A0001']
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
.message-container {
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

  .message-detail {
    padding: 32px;
    height: 45vh;
    width: 50vw;
    display: flex;
    flex-direction: column;

    .message-detail-top {
      font-size: 44px;
      text-align: center;
      font-weight: 700;
      height: 100px;
      line-height: 100px;
    }
    
    .message-detail-con {
      height: calc(100% - 200px);
      overflow: auto;
      border: 1px solid #DCDCDC;
      padding: 32px;
      color: #333;
    }

    .message-detail-btn {
      height: 100px;
      line-height: 100px;
      display: flex;
      align-items: end;
      flex-direction: row-reverse;

      ::v-deep .van-button {
        width: 4rem;
        height: 1.6rem;
        font-size: 32px;

        &:last-child {
          margin-left: .88rem;
        }
      }
    }
  }
}
</style>