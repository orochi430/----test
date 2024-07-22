<template>
  <div class="controlTemplateCode">
    <!-- 报销人签字图片 -->
    <van-image v-if="metaData.extra.templateCode == 'showSignPhoto'" :src="photo" width="150px" height="50px"
      class="photo" />
    <!-- [电气oa]按钮，相关文件，弹出tabs -->
    <div v-else-if="metaData.extra.templateCode == 'showRelevantDocuments'">
      <div class="fileHead">
        <span>相关文件</span>
        <van-icon v-if="metaData.privilege.editable" class="fileIcon" size="0.48rem" name="add-o"
          @click="showPop = true" />
      </div>
      <div class="fileList" v-if="checkItems.length > 0" v-for="(item, idx) in checkItems" :key="idx"
        @click="toDtail(item)">
        <div class="fileBody flex1">
          <div class="fileModule">
            <div class="fileTitle">{{ item.dataValue["B0001"] }}</div>
            <div class="fileBtn">
              <div class="fileButton" @click.stop="toDtail(item)" v-if="canView">查看</div>
              <div class="fileButton" @click.stop="delRelation(item, idx)" v-if="metaData.privilege.editable">取消关联
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="metaData.extra.templateCode == 'sqsMessageBar'" class="sqsMessageBar">
      <!-- 标题是否有值显示为空  需要添加配置才是起作用 否则messages为空照样显示标题 -->
      <span v-show="TemplabelShow">{{ metaData.label }}</span>
      <div v-for="(item, index) in messages" class="messages" :key="index">
        <div class="messageBt">{{ item.BT }}</div>
        <div class="messageUser">
          <span>{{ item.CREATE_UNAME }}</span>
          <span>{{ item.CREATE_TIME }}</span>
        </div>
      </div>
    </div>
    <van-cell class="titlespan" :title="getTitle" v-else is-link @click="cellClick" />


    <van-popup v-model="showPop" :get-container="'#app'" position="bottom" style="height: 100%; background: #f5f5f5;">
      <van-nav-bar title="公告/新闻" @click-left="showPop = false" sticky v-if="false">
        <template #left>
          <van-icon name="arrow-left" /><span>返回</span>
        </template>
      </van-nav-bar>
      <common-tabs :tabKey="'XTBG'" :params="{}" :check-type="'checkBox'" :checkable="true" @cancelCheck="showPop = false"
        @confirmCheck="confirmCheck" oppset-top="0.88rem" tab-oppset-top="0px"></common-tabs>
    </van-popup>
  </div>
</template>

<script>
import propMixin from "./mixin";
export default {
  name: "controlTemplateCode",
  components: {
    commonTabs: () => import("@/components/common/commonTabs")
  },
  mixins: [propMixin],
  data() {
    return {
      showPop: false,
      controlData: {
        defaultValue: "查看/新建任务计划",
      },
      photo: "",
      checkItems: [],
      canView: this.$route.params.pk ? true : false,
      messages: [],
      TemplabelShow:true
    };
  },
  props: {
    formMeta: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    getTitle() {
      if (this.value.value && this.value.value != "") {
        return this.value.value;
      } else {
        return this.controlData.defaultValue;
      }
    }
  },
  created() {
    let self = this;
    let value = self.metaData.controlId
    if (self.formData.main[value]) self.formData.main[value].value = self.checkItems;
  },
  mounted() {
    //判断是否要发送请求
    if (this.metaData.extra.templateCode === "showSignPhoto") {
      //发生请求获取个人图片
      dsf.http.post("fn/mobile/user/singleton", { userId: this.formData.main["A0010"].value }).then((res) => {
        if (res.data.code == 200) {
          //得到后端传入的图片
          let loginToken = dsf.util.loadSessionStore("loginToken");
          this.photo =
            dsf.url.getServerUrl(res.data.data.signPhoto) +
            `&x-auth-token=${loginToken}`;
        }
      });
    } else if (this.metaData.extra.templateCode == 'sqsMessageBar') this.getMessage()
  },
  methods: {
    getMessage() {
      let self = this
      dsf.http.post(`fn/yellowstriper/getYellow?pk=${this.formMeta.parameters.pk}`).then(({ data }) => {
        if (data.data) {
          this.messages = data.data
          this.messages.forEach(item => {
            item.CREATE_TIME = item.CREATE_TIME.slice(0, 16)
          })
        }else{
          if(dsf.config.commonForm.TemplabelShow){// 未有数据时 标题展示false
            self.TemplabelShow = false
          }
        }
      })

    },
    cellClick() {
      return;

      // this.$eventBus.DoSaveForm(this,()=>{
      //     if(this.formMeta.parameters.taskId&&this.formMeta.parameters.taskId!=""){
      //         this.$router.push({
      //             path: "/commonForm/210604144527JntE2LI7dWrpBLsluZz/"+this.formMeta.parameters.taskId+"?moduleId="+this.formMeta.parameters.moduleId+"&relationId="+this.formMeta.parameters.pk
      //         });
      //     }else{
      //         this.$router.push({
      //             path: "/commonForm/210604144527JntE2LI7dWrpBLsluZz?moduleId="+this.formMeta.parameters.moduleId+"&relationId="+this.formMeta.parameters.pk
      //         });
      //     }
      // });
    },
    confirmCheck(checkItems) {
      console.log("checkItems", checkItems);
      let self = this;
      self.showPop = false;
      self.checkItems.push(...checkItems);
    },
    toDtail(item) {
      let self = this;
      if (!self.canView) return;
      if (item.dataValue["A0004"] == "220803111621B521Wfaj0JHZLp0lbpU") {
        self.$router.push({
          name: 'elecDetail',
          query: {
            id: item.dataValue["A0001"]
          }
        })
      }
      else {
        self.$router.push({
          name: 'commonForm',
          params: {
            moduleId: item.dataValue["A0004"],
            pk: item.dataValue["A0001"]
          },
          query: {
            listId: "ViewList",
            method: "open"
          }
        })
      }
      // else {
      //   dsf.layer.toast("操作失败", false);
      // }
    },
    delRelation(item, idx) {
      dsf.layer.confirm({
        message: '是否确认不再关联该文件？',
        confirmButtonText: '确认'
      }, () => this.checkItems.splice(idx, 1))
    },
  },
  watch: {
    "formData.main": {
      handler(newValue, oldValue) {
        let val = this.metaData.controlId
        if (newValue[val]) this.checkItems = newValue[val].value;
      },
      deep: true,
      // immediate: true,
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.controlTemplateCode {
  width: 100%;

  // padding-left: 10px;
  .sqsMessageBar {
    width: 100%;
    font-size: var(--font_size_2);

    .messages {
      margin-bottom: 5px;
      padding: 5px;
      border-bottom: 1px solid #ebedf0;

      .messageBt {
        margin-bottom: 5px;
      }

      .messageUser {
        text-align: right;
      }
    }
  }

  .fileHead {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: var(--font_size_2);
    }

    .fileIcon {
      @include font-theme('normal');
    }

  }

  ::v-deep .van-nav-bar__left {
    span {
      @include font-theme('normal');
    }
  }

  .fileList {
    +.fileList {
      padding-top: 10px;
    }

    .fileTitle {
      // font-size: 0.32rem;
      flex: 1;
    }

    .fileModule {
      display: flex;
      // color: #999;
      padding-top: 10px;

      .fileBtn {
        // flex: 1;
        color: #999;
        width: 2.6rem;
        text-align: right;

        .fileButton {
          display: inline-block;
          // width:48px;
          margin: 0 0.04rem;
          text-align: center;
          border-radius: 0.48rem;
          border: 1px solid #e5e5e5;
          white-space: nowrap;
          padding: 0 0.2rem;
          font-size: var(--font_size_4);
          line-height: 0.42rem;
        }
      }
    }
  }
}

.titlespan {
  //border-left: 3px solid #00c3ff;
  //@include font-theme('normal');
  padding-left: 5px;
  //font-weight: 600;
  font-size: var(--font_size_2);
  line-height: 20px;
  text-decoration: underline;
}

//这里没有对父使用flex 怕对其他的有影响
.controlTemplateCode {
  .photo {
    transform: translate(48%);
  }
}
</style>
