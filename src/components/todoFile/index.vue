<template>
  <div class="ds-todo-file">
    <van-tabs v-model="headTab" title-active-color="#333333!important" title-inactive-color="#666666">
      <van-tab title="表单">
        <form-file />
      </van-tab>
      <van-tab title="流转情况">
        <moving-situation :form-data="dataValue" />
      </van-tab>
      <van-tab title="相关文件">
        <enclosure-button @open-file="openFile" />
        <enclosure-pre :file-url="fileUrl" />
      </van-tab>
    </van-tabs>

    <div class="footer">
      <DsButtonToolbox :buttons="buttons" more @commonClick="handleActionClick" @mainClick="handleActionClick" />
    </div>

    <van-popup :get-container="getContainer" v-model="showPopup" :close-on-click-overlay="false" :style="{ height: '90%' }" lock-scroll position="bottom" round>
      <!-- 公文退回 -->
      <work-flow-dialog ref="wfDialog" :form-data="dataValue" @change="onRefresh" @close="showFlowBack = false" />
      <!-- 公文发送 -->
      <send-workflow v-if="showFlowSend" ref="sendFile" :form-data="dataValue" @close="showFlowSend = false" @golist="onRefresh" />
      <!-- 申请延期 -->
      <delay-form v-if="showDelayform" :form-data="dataValue" :type="1" @close="showDelayform=false" @change="onRefresh" />
      <!-- 公文报名（原安排人员） -->
      <selectPerson v-if="showPerson" :type="0" @getSelectUser="getSelectUser" @cancePerson="cancePerson"></selectPerson>
    </van-popup>

    <!--分阅弹窗-->
    <separate-read v-if="showFyyj" ref="readPop" />
     <!--报名弹窗-->
    <sign-file ref="signFile"/>
    <sign-file-person ref="signFilePerson"/>
    <!--请假-->
    <ask-leave ref="askLeave"/>
  </div>
</template>

<script>
import formFile from "./formFile";
import EnclosureButton from "./../enclosure/EnclosureButton";
import EnclosurePre from "./../enclosure/EnclosurePre";
import DsButtonToolbox from "@/components/documentCenter/DsfButtonToolbox";
import movingSituation from "./movingSituation";
import sendWorkflow from "@/components/todoFile/sendFile.vue";
import workFlowDialog from "@/components/dialog/WorkFlowDialog.vue";
import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
import DelayForm from "@/components/feedback/DelayForm";
import SeparateRead from "@/components/selectPerson/SeparateRead";
import signFile from "@/components/todoFile/signFile";
import signFilePerson from "@/components/todoFile/signFilePerson";

import AskLeave from "@/components/todoFile/AskLeave";

export default {
  name: "TodoFile",
  components: {
    formFile,
    EnclosureButton,
    EnclosurePre,
    movingSituation,
    DsButtonToolbox,
    sendWorkflow,
    workFlowDialog,
    selectPerson,
    DelayForm,
    SeparateRead,
    signFile,
    signFilePerson,
    AskLeave
  },
  mixins: [ButtonActions],
  props: {},
  data() {
    return {
      headTab: 0,
      showFlowSend: false,
      showFlowBack: false,
      Response: {},
      node_list: [],
      deptAndUsers: [], //部门及部门下人员
      filelistArr: [],
      /************/
      fileUrl: "", // 预览文件的链接
      showPerson: false,
      popupStates: false,
      showDelayform: false,
      showFyyj: false,
      isTransfer: false
    };
  },
  computed: {
    showPopup: {
      get: function () {
        let that = this;
        if (this.showFlowBack || this.showFlowSend || this.showDelayform || this.showPerson) {
          that.popupStates = true;
        } else {
          that.popupStates = false;
        }
        return that.popupStates
      },
      set: function (value) {
        this.popupStates = value
      }
    },
    buttons() {
      const {
        formData
      } = this.$route.params;
      return formData ? formData.buttons : {};
    },
    formData() {
      const {
        formData
      } = this.$route.params;
      return formData ? formData : {};
    },
    dataValue() {
      const {
        formData
      } = this.$route.params;
      return formData ? formData.dataValue : {};
    },
    tab() {
      const {
        type
      } = this.$route.params;
      return type;
    }
  },
  created() {
    if (!this.$route.params.formData) {
      this.sendBack();
    }
  },
  mounted() {
    console.log('tag', this.$refs);
  },
  methods: {
    getContainer() {
      return document.body;
    },
    onRefresh() {
      this.$store.commit('refreshRouteByReg', ['/meetingCenter', '/todocenter', '/','/signinlist']);
      this.$router.go(-1);
    },
    //退回
    sendBack(msg) {
      this.$router.go(-1);
    },
    handleActionClick(action) {
      let fnName = `action-${action}`
      let fn = this[fnName];
      if (!fn) {
        fn = dsf.noop;
      }
      console.log(this.formData)
      fn(this.formData, null, true);

    },
    // 预览文件
    openFile(url) {
     // debugger
      this.fileUrl = url;
    },
    cancePerson() {
      this.showPerson = false;
    },
    getSelectUser(data) {
      if (data.length > 0) {
        //去掉父节点，保留选中的子节点
        data.forEach((item,index) => {
          if(item.children && item.children.length>0){
            data.splice(index,1)
          }
        })
        const ids = data.map(item => item.id.replace("person_",""));
        let toast = {};
        if (this.isTransfer) {
          if (data.length > 1) {
            dsf.layer.toast("请选择一个人", true);
            return;
          }
          const type = this.getType();
          const user = dsf.util.loadSessionStore('user');
          const loading = dsf.layer.loading('取消中');
          let dataValue = this.dataValue;
          if (type === 1) {
            dsf.changeUser.flowChangeUser({
              param: {
                pk: dataValue.info_id,
                pId: dataValue.pid,
                pnId: dataValue.pnid,
                fromUserId: user.user_id,
                userId: ids.join(','),
                userName: data.map(it => it.name).join(','),
                deptId: data.map(it => it.pid).join(','),
                deptName: '',
              },
              thenFun: () => this.onRefresh && this.onRefresh(),
              finallyFun: () => dsf.layer.closeLoading(loading),
            });
          } else if (type === 3) {
            dsf.changeUser.superviseChangeUser({
              param: {
                pk: dataValue.info_id || dataValue.id,
                userId: ids.join(','),
              },
              thenFun: () => this.onRefresh && this.onRefresh(),
              finallyFun: () => dsf.layer.closeLoading(loading),
            });
          }
        } else if (this.isDing) {
          dsf.dd.Ding({
            users: ids, // 用户列表，工号
            type: 2, // 附件类型 1：image  2：link
            alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
            alertDate: { format: "yyyy-MM-dd HH:mm", value: "2020-05-13 20:00" },
            attachment: {
              images: [""]
            }, // 附件信息
            text: dataValue.bt || item.dataValue['B0001'], // 正文
            bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；
            onSuccess: function () {
              this.dsf.layer.toast('操作成功');
            },
            onFail: function () {
              this.dsf.layer.toast('操作失败');
            }
          });
        } else {
          dsf.http
            .post("fn/newMobileMeeting/sendMeetingSq", {
              pk: dataValue.info_id,
              userIds: ids,
              bt: dataValue.bt
            })
            .then(res => {
              if (res.data.type == 'success') {
                dsf.layer.toast("操作成功", true);
              }
            })
            .catch(response => {
              toast = {
                msg: "操作异常",
                type: false
              };
            })
            .finally(res => {
              if (toast.msg) {
                dsf.layer.toast(toast.msg, toast.type);
              }
            });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

.ds-todo-file {
  //height: 100%;
  overflow: hidden;
}

.footer {
  position: absolute;
  bottom: 0;
  height: 75px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;

  padding: 0 0.32rem;
  box-sizing: border-box;
}

::v-deep .van-nav-bar {
  height: 44px;

  .van-nav-bar__title {
    @include font_4;
    color: #000;
  }

  .van-icon-arrow-left {
    color: #000;
    font-weight: 600;
    font-size: 1.5em;
  }

  // .van-icon {
  //   color: #000;
  //   font-weight: 600;
  // }
}

::v-deep.van-tabs {
  .van-tab {
    @include font_3(true, false);
    color: $fontColor_main;
  }
}

::v-deep.van-tabbar {
  height: 75px;
}

::v-deep.dsf-btn {
  width: 135px;
  height: 48px;
  border-radius: 7px;
  margin-right: 20px;
  color: #fff;
}

.iconfont {
  font-size: 24px !important;
}

._goutong,
._more {
  font-size: 26px !important;
}

::v-deep .van-tabs__content {
  height: calc(100vh - 149px);

  & > div {
    height: 100%;

    .ds-form-group {
      margin: 15px 0;
    }
  }
}
</style>
