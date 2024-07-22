<template>
  <div class="message-container">
    <div class="top">
      <van-cell
        title="消息发布"
        class="top-back"
        icon="arrow-left"
        center
        @click="$router.back()"
      >
       <template #label>
        <van-button icon="plus" type="info" @click.stop="()=>$router.push({path:'/meetingPad/index/publishEdit'})">发布</van-button>
      </template>
      </van-cell>
    </div>
    <div class="content">
      <messageList :lists="lists" type="publish" @updatamessage="updatamessage" ></messageList>
    </div>
    <van-popup v-if="currentmessage" v-model="show">
      <div class="message-detail">
        <div class="message-detail-top">消息</div>
        <div class="message-detail-con">
          {{ currentmessage.title }}
        </div>
        <div class="message-detail-btn">
          <van-button type="default" @click="closeClick">关闭</van-button>
          <van-button type="default" @click="delClick">删除</van-button>
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
    delClick(){
        dsf.http
          .post(`fn/list/deleteRows`, {
            metaKey: "A0001",
            pk: this.currentmessage.id,
            moduleId: "220805142201Z2JRY83u6rPqYsQk1uk",
            formId: "220826142508yHIzy5CKkruQlb9qsxq",
          })
          .done(result => {
            if (result.code==='200') {
              dsf.layer.toast("删除成功！", true);
              this.getData()
              this.show = false
            }
          })
          .error(error => {
            console.log("error", error);
          })
    },
    updatamessage(item){
      this.currentmessage = item
      this.show = true
    },
    closeClick(){
      this.show = false
    },
    getData(){
      dsf.http
        .get(`fn/list/220826142508yHIzy5CKkruQlb9qsxq/mobile/q`, {
          moduleId:'220805142201Z2JRY83u6rPqYsQk1uk',
          fid:this.meeting.id
        })
        .done(result => {
          if (result.datas) {
            this.lists = []
            result.datas.forEach(item => {
              this.lists.push({
                title: item.dataValue['B0001'],
                time: item.dataValue['C-HWXT-HYXX-0007'],
                sender: item.dataValue['B0009'],
                id: item.dataValue['A0001']
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
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 0.88rem;
        padding-left: 0.4rem;
      }

      .van-button {
        font-weight: 400;
        height: 1.6rem;
        padding: 0 0.5rem;
        background: #3B74DB;
        border-color: #3B74DB;
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
          margin-right: .88rem;
        }
      }
    }
  }
}
</style>