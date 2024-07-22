<template>
  <div
    :style="{ height: isShowAppHeader ? `calc(100vh - ${dsf.util.getOffsetTop()})` : '100vh' }"
    class="wrap tabs-Form commonFormDiv"
    v-show="isShowForm"
  >
    <!-- 加载中骨架页 -->
    <template v-if="dsf.config.commonForm.isShowSkeleton">
      <van-skeleton
        v-for="index of 3"
        :key="index"
        title
        :row="3"
        :loading="getInfoLoading"
      />
    </template>
    <!-- 气象局详情页 -->
    <formDetail v-if="formStyle == 1" />
    <van-tabs
      v-else-if="formStyle == 0 && formTabs.length > 1"
      v-model="headTab"
      :offset-top="dsf.util.getOffsetTop()"
      title-inactive-color="#666666"
      @change="changeTab"
      :before-change="beforechangeTab"
    >
      <van-tab
        v-for="item in formTabs"
        :title="item.title"
        :key="item.name"
        :name="item.name"
      >
        <!-- component是一个占位符，:is属性可以用来指定要展示的组件名称 -->
        <template>
          <component
            v-if="item.name != 'relationList'"
            :is="item.name"
            :ref="item.name"
            :form-params="formParams"
            :form-data="formData"
            :form-meta="formMeta"
            :all-file="allFile"
            :hand-written-file="handWrittenFile"
            :relation-list="relationList"
            :is-from-list="isFromList"
            :headTab="headTab"
            :tabName="item.name"
            :params="item.listParams"
          >
          </component>
          <component
            v-else
            :is="'relationList'"
            :ref="relationList"
            :relation-list="relationList"
            :form-params="formParams"
            :parameters="formMeta.parameters"
          ></component>
        </template>
      </van-tab>
    </van-tabs>
    <!-- 表单上只有一个formTab -->
    <div v-else class="formBox">
      <component
        v-for="item in formTabs"
        v-if="item.enable"
        :key="item.name"
        :is="item.name"
        :ref="item.name"
        :all-file="allFile"
        :form-params="formParams"
        :form-data="formData"
        :form-meta="formMeta"
        :relation-list="relationList"
        :is-from-list="isFromList"
        :headTab="headTab"
        :tabName="item.name"
      ></component>
    </div>
    <div v-if="isShowFooter" :style="{height: showOpinionAndBtn ? 'auto' : '1.2rem', minHeight: showOpinionAndBtn ? '2rem' : ''}">
      <div :class="showOpinionAndBtn ? 'footer-other': 'footer'">
        <DsfButtonAndOpinion v-if="showOpinionAndBtn" ref="DsfButtonAndOpinion" size="small" :form-meta="formMeta" :metaData="editorOpinionMetaData" :buttons="formButtons" :is-show-write-opintion-btn.sync="isShowWriteOpintionBtn" :is-show-qi-xiang-ju-edit-opinion.sync="isShowQiXiangJuEditOpinion" @commonClick="handleActionClick" @getNowButton="getNowButton"  />
        <DsfButtonToolbox
          :is-show-write-opintion-btn.sync="isShowWriteOpintionBtn"
          :is-show-qi-xiang-ju-edit-opinion.sync="isShowQiXiangJuEditOpinion"
          :more="true"
          :is-form-btn="true"
          :buttons="formButtons"
          size="small"
          ref="DsfButtonToolbox"
          @mainClick="handleActionClick"
          @commonClick="handleActionClick"
          @getNowButton="getNowButton"
          v-else
        />
      </div>
    </div>

    <van-popup
      v-model="showPopUp"
      get-container="#app"
      ref="sendPop"
      lock-scroll
      :style="{height: dsf.config.commonFlow.nodeDisplayType == 'showSimple' ? '100vh' : '90vh'}"
      position="bottom"
      :round="dsf.config.commonFlow.nodeDisplayType != 'showSimple'"
      @close="closeSendFilePopup"
      v-if="ShowSendFile"
    >
      <send-file
        v-show="showFlowSend"
        ref="sendFileCom"
        :form-meta="formMeta"
        :form-params="formParams"
        :form-data="sendFileData"
        :is-show-write-opintion-btn="isShowWriteOpintionBtn"
        :current-opintion="currentOpintion"
        :sendFileOpintion="sendFileOpintion"
        :send-parameters="nowButtonParameters"
        :currentAction="currentAction"
        @change="handleFlowSendChange"
        @close="closeSendFile"
        @golist="backSucces"
        @showNext="showNext"
        @initData="initData"
      />
    </van-popup>
    <yuebi
      v-if="showyuebi"
      ref="yuebi"
      :form-data="formData"
      @golist="backSucces"
    ></yuebi>
    <!--审批意见弹窗-->
    <btn-write-opintion
      v-if="showBtnWriteOpintion"
      ref="BtnWriteOpintion"
      :form-data="formData"
      :meta-data="formMeta"
      :form-params="formParams"
      :current-opintion="currentOpintion"
      @setOpintion="setOpintion(arguments)"
      @refreshPcForm="refreshPcForm"
      @send="opinionToSend()"
    />
    <!--报名弹窗-->
    <sign-file ref="signFile" />
    <!--请假-->
    <ask-leave ref="askLeave" />
    <!--分阅弹窗-->
    <separate-read
      v-if="showSeparate"
      ref="readPop"
      :separate-tabs="separateTabs"
      :form-params="formMeta.parameters"
      :nowButtonParameters="nowButtonParameters"
    />
    <!-- 公文退回 -->
    <van-popup
      get-container="#app"
      v-model="showFlowBack"
      lock-scroll
      position="bottom"
      round
    >
      <work-flow-dialog
        ref="wfDialog"
        :form-data="dataValue"
        :meta-data="formMeta"
        @change="backSucces"
        @close="showFlowBack = false"
      />
    </van-popup>
    <!-- <work-flow-dialog
      ref="wfDialog"
      :form-data="dataValue"
      :meta-data="formMeta"
      @change="backSucces"
    /> -->
    <!-- 公文报名（原安排人员） -->
    <van-popup
      :style="{ height: '100%' }"
      v-model="showPerson"
      :close-on-click-overlay="false"
      lock-scroll
      position="bottom"
      get-container="#app"
    >
      <control-user-list
        v-if="showPerson"
        :extra="extra"
        :selectType="selectType"
        @close="cancePerson"
        @getSelectUser="getSelectUser"
      ></control-user-list>
    </van-popup>
    <van-popup
      v-model="returnNodePop"
      :close-on-click-overlay="true"
      lock-scroll
      position="bottom"
      round
    >
      <returnNode
        ref="returnNode"
        :meta-data="{
          pk: formMeta.parameters ? formMeta.parameters.pk : '',
          moduleId: moduleId,
          nodeId: formMeta.parameters ? formMeta.parameters.nodeId : '',
          nodeName: formMeta.parameters ? formMeta.parameters.nodeName : '',
          flowId: formMeta.parameters ? formMeta.parameters.flowId : '',
          pId: formMeta.parameters ? formMeta.parameters.pId : '',
          pnId: formMeta.parameters ? formMeta.parameters.pnId : '',
        }"
        :formData="formData.main"
        :nowButtonParameters="nowButtonParameters"
        @backSendSuc="backSendSuc"
        @onClickLeft="returnNodePop = false"
      ></returnNode>
    </van-popup>
    <TransactionActionSheet
      v-model="isShowTransactionActionSheet"
      :form-data="formData"
      :meta-data="formMeta"
      @actionSelect="actionSelect"
    ></TransactionActionSheet>
    <!-- 气象局意见按钮子按钮弹层 -->
    <van-popup
      :style="{ height: '100%' }"
      v-model="isShowQiXiangJuOpinion"
      :close-on-click-overlay="false"
      lock-scroll
      position="bottom"
      get-container="#app"
    >
      <QiXiangJuOpinion :show.sync="isShowQiXiangJuOpinion" />
    </van-popup>
    <van-popup
      :style="{ height: '100%' }"
      v-model="isShowQiXiangJuFlow"
      :close-on-click-overlay="false"
      lock-scroll
      position="bottom"
      get-container="#app"
    >
      <QiXiangJuFlow :show.sync="isShowQiXiangJuFlow" />
    </van-popup>
    <QiXiangJuEditOpinion
      v-if="isShowQiXiangJuEditOpinion"
      ref="QiXiangJuEditOpinion"
      :form-data="formData"
      :form-meta="formMeta"
      @setOpinion="setCurrentOpintion"
      @send="handleActionClick('send')"
    />
    <van-popup
      v-model="commonPop"
      :get-container="'#app'"
      position="bottom"
      style="height: 100%; background-color: #f5f5f5"
    >
      <van-sticky v-if="commonPopParam?.params?.title">
        <header>
          <van-nav-bar
            :title="commonPopParam.params.title"
            @click-left="commonPop = false"
            style="z-index: 9"
          >
            <template #left>
              <van-icon name="arrow-left" /><span>返回</span>
            </template>
          </van-nav-bar>
        </header>
      </van-sticky>
      <DefaultList
        ref="DefaultList"
        :key="refreshListKey"
        :params="commonPopParam"
        :no-load-js="commonPopParam?.params?.noLoadJs != undefined ? commonPopParam.params.noLoadJs : true"
        :check-type-pop="checkType"
        :checkable="checkable"
        oppset-top="0px"
        @cancelCheck="commonPop = false"
        @confirmCheck="commonPopChoose"
      ></DefaultList>
    </van-popup>
    <chooseFolder
      v-if="showChooseFolder"
      :show.sync="showChooseFolder"
      type="focus"
      @confirmChoose="confirmFocus"
    >
    </chooseFolder>
    <!--上海地产通用驳回组件-->
    <rejectDialog ref="rejectDialog"></rejectDialog>
    <!-- 选择弹窗 -->
    <check-box-dialog ref="ckDialog"></check-box-dialog>
    <!-- 无锡评价弹窗 -->
    <wuxiAppraise
      ref="appraise"
      :metaData="{
        pk: formMeta.parameters ? formMeta.parameters.pk : '',
        moduleId: moduleId,
        nodeId: formMeta.parameters ? formMeta.parameters.nodeId : '',
        pnId: formMeta.parameters ? formMeta.parameters.pnId : '',
        flowId: formMeta.parameters ? formMeta.parameters.flowId : '',
        pId: formMeta.parameters ? formMeta.parameters.pId : '',
        fromId: formMeta.parameters ? formMeta.parameters.fromId : '',
      }"
    />
    <!-- 大事务二期列入督办期限选择弹窗 -->
    <calendarSelect ref="calenderSelect"></calendarSelect>
    <commonDialog
      v-show="componentName != ''"
      ref="commonDialog"
      :componentName="componentName"
      :form-data="formData"
      :meta-data="formMeta"
      :form-params="formParams"
      :extra="extra"
      @closeCallback="closeCallback(arguments)"
      @showTree="showTree"
      @backSucces="backSucces"
    ></commonDialog>
    <!-- 操作提示 -->
    <van-dialog
      v-model="showSuccess"
      :showConfirmButton="false"
      :showCancelButton="false"
      title="操作提示"
    >
      <div class="radioBox">
        <van-icon
          name="static/assistant/passed.png"
          size="2rem"
          style="vertical-align: middle"
        />
        <span>发送成功</span>
        <van-button type="info" @click="goNextDb">继续办理</van-button>
        <van-button type="default" @click="goBackList">返回列表</van-button>
      </div>
    </van-dialog>

    <van-popup
      v-model="ShowAddLeaderReview"
      get-container="#app"
      lock-scroll
      style="height: 100vh"
      position="bottom"
    >
      <add-leader-review
        ref="addLeaderReview"
        :form-data="formData"
        :form-meta="formMeta"
        :form-params="formParams"
        :leader-order="leaderOrder"
        :process-settings="processSettings"
        :key="leaderReviewKey"
        :flow-range-url="flowRangeUrl"
        @close="closeLeaderReview"
        @changeLeaderSitu="changeLeaderSitu"
      ></add-leader-review>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import demoData from "./demo";
import projectMixin from "./projectMixin/index.js";
import allComps from "./controls";
import tabComps from "./tabComponents";
import specialJS from "./specialJS";
import formLayout from "./formLayout";
import demoFormData from "./data";
import DsfButtonToolbox from "@/components/documentCenter/DsfButtonToolbox";
// import commonbuttonHandle from "./buttonHandle";
import sendFile from "@/components/sendFlow/sendFile";
import urlJs from "@/common/url";
import movingSituation from "@/components/todoFile/movingSituation";
import EnclosureButton from "./../enclosure/EnclosureButton";
import EnclosurePre from "./../enclosure/EnclosurePre";
import SeparateRead from "@/components/selectPerson/SeparateRead";
import signFile from "@/components/todoFile/signFile";
import AskLeave from "@/components/todoFile/AskLeave";
import workFlowDialog from "@/components/dialog/WorkFlowDialog.vue";
import returnNode from "@/components/dialog/returnNode.vue";
import rejectDialog from "@/components/dialog/rejectDialog.vue";
import controlUserList from "@/components/commonForm/controls/controlUserList";
// import subForm from "./subForm";
// import formTitle from "./formTitle";
import BtnWriteOpintion from "../todoFile/btnWriteOpintion.vue";
import yuebi from "../todoFile/yuebi.vue";
import TransactionActionSheet from "./controls/transactionActionSheet.vue";
// import 'formDetail': () => import('@/components/project/QiXiangJu/formDetail') from "@/components/project/QiXiangJu/'formDetail': () => import('@/components/project/QiXiangJu/formDetail')";
// import QiXiangJuOpinion from "@/components/project/QiXiangJu/opinion";
// import QiXiangJuFlow from "@/components/project/QiXiangJu/flow";
// import QiXiangJuEditOpinion from "@/components/project/QiXiangJu/editOpinion";
// import DefaultList from "@/components/documentCenter/DefaultList";
import chooseFolder from "@/components/myFavorite/chooseFolder";
import checkBoxDialog from "@/components/dialog/checkBoxDialog.vue";
import meettingTopic from "./tabComponents/meettingTopic";
import wuxiAppraise from "@/components/project/wuxi/index.vue";
import calendarSelect from "@/components/dialog/calendarSelect.vue";
// import commonDialog from "@/components/commonForm/tabComponents/commonDialog.vue";
import chatJS from "@/common/chat";
// import addLeaderReview from "@/components/todoFile/leaderReview/addLeaderReview";
import DsfButtonAndOpinion from "@/components/documentCenter/DsfButtonAndOpinion";
// let buttonHandle = commonbuttonHandle
// // 项目特殊按钮动态引入
// let projectButtonHandle = {}
// import(/* webpackChunkName: 'buttonHandle' */ `./buttonHandleMixin/${dsf.config.projectName}.js`).then((module) => {
//   console.log(module);
//   projectButtonHandle = module.default
//   Object.assign(buttonHandle, projectButtonHandle)
// }).catch((err) => {
//   console.log('无项目按钮方法')
// })
export default {
  name: "commonForm",
  mixins: [projectMixin],
  props: {
    _pk: {
      type: String,
      default: () => undefined,
    },
    _moduleId: {
      type: String,
      default: () => undefined,
    },
    _formId: {
      type: String,
      default: () => undefined,
    },
    _params: {
      type: Object,
      default: () => {
        return {};
      },
    },
    currentTabs: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    clickTabIndex: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    isPop: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    chooseFolder,
    EnclosurePre,
    EnclosureButton,
    movingSituation,
    sendFile,
    signFile,
    AskLeave,
    DsfButtonToolbox,
    formLayout,
    BtnWriteOpintion,
    ...allComps,
    ...tabComps,
    specialJS,
    SeparateRead,
    workFlowDialog,
    controlUserList,
    // subForm,
    returnNode,
    TransactionActionSheet,
    'formDetail': () => import('@/components/project/QiXiangJu/formDetail'),
    'QiXiangJuOpinion': () => import('@/components/project/QiXiangJu/opinion'),
    'QiXiangJuFlow': () => import('@/components/project/QiXiangJu/flow'),
    'QiXiangJuEditOpinion': () => import('@/components/project/QiXiangJu/editOpinion'),
    'yuebi': () => import('../todoFile/yuebi.vue'),
    'DefaultList': () => import('@/components/documentCenter/DefaultList'),
    rejectDialog,
    checkBoxDialog,
    meettingTopic,
    wuxiAppraise,
    calendarSelect,
    'commonDialog': () => import('@/components/commonForm/tabComponents/commonDialog.vue'),
    'addLeaderReview': () => import('@/components/todoFile/leaderReview/addLeaderReview'),
    DsfButtonAndOpinion
  },
  data() {
    return {
      pk: this.$route.params.pk,
      moduleId: this.$route.params.moduleId,
      formData: {},
      formMeta: {
        controls: [],
      },
      showFlowSend: false,
      formButtons: {},
      buttonHandle: null,
      value: "",
      showPopUp: false,
      showBtnWriteOpintion: false, //审批意见弹层控制
      isShowWriteOpintionBtn: false, //是否显示审批意见按钮
      isShowYoZoHandWriteBtn: false, //是否显示永中的签批按钮
      currentOpintion: "",
      sendFileOpintion: "", //用于存储发送界面填写的临时意见， 未点保存按钮直接取消关闭发送界面的意见
      headTab: this.$route.query.activeTab || 0,
      sendFileData: {},
      fileUrl: "",
      showFyyj: false,
      dataValue: {},
      showPerson: false,
      isTransfer: false,
      tab: this.$route.query.type,
      formParams: {},
      showSeparate: false,
      multinfos: null,
      extra: {},
      allformMeta: {},
      relationList: [],
      formTabs: [],
      returnNodePop: false,
      allFile: [],
      handWrittenFile: [],
      isShowTransactionActionSheet: false,
      isShowTitle: false,
      titleMetaData: {},
      titleControlData: {},
      titleOpinion: [],
      isFromList: true, // 是否从列表跳转到表单
      nowButton: null,
      nowButtonParameters: {},
      hasControlOpinionTagView: false, // 是否有意见驱动控件
      formStyle: 0,
      isShowQiXiangJuOpinion: false, // 气象局查看意见弹出层
      isShowQiXiangJuFlow: false, // 气象局流程弹出层
      isShowQiXiangJuEditOpinion: false, // 气象局填写意见弹出层
      qixiangjuOpinion: "",
      showyuebi: false,
      notVaildateMetas: [],
      commonPop: false,
      commonPopParam: {},
      checkType: "radio",
      specialJSObj: specialJS,
      spHandleJS: {},
      showChooseFolder: false,
      dividerColor: "",
      dividerStyle: null,
      separateTabs: [],
      getinfoParams: {},
      notMainCtr: [
        "controlMobileAlink",
        "controlMobileFl",
        "controlFileRelation",
        "controlFileUpload",
      ], // 不生成元数据的控件
      getInfoLoading: true,
      componentName: "",
      isAsync: dsf.config.commonForm.isSelectProcessAsync, //发送流程是否异步
      ShowSendFile: true,
      currentref: null,
      shakeFlag: true,
      flagPath: true,
      ShowTreeData: false,
      selectType: 0, //选人控件传值
      showFlowBack: false,
      showSuccess: false,
      curPath: "",
      checkable: true,
      refreshListKey: Math.random(),
      isShowForm: true,
      ShowAddLeaderReview: false,
      leaderOrder: "1", //领导审核排序
      leaderReviewKey: Math.random(),
      processSettings: null, //流程参数设置
      shoEditOpinion: 1,
      currentAction: "", //@zgh 当前点击事件  用于判断是否为抄送或者抄送意见
      alreadSetStorage: false,
      editorOpinionMetaData: {}, // 意见输入控件
      showOpinionAndBtn: false,
      flowRangeUrl: {}, //流程设置接口地址
    };
  },
  computed: {
    isShowFooter() {
      return (
        !this.$route.query.isPreview &&
        ((this.formButtons.commonButtons &&
          this.formButtons.commonButtons.length) ||
          (this.formButtons.mainButtons && this.formButtons.mainButtons.length))
      );
    },
    ...mapState({
      isShowAppFooter: (state) => state.isShowAppFooter,
      isShowAppHeader: (state) => state.isShowAppHeader,
    }),
    mainData() {
      return JSON.parse(JSON.stringify(this.formData.main));
    },
  },
  watch: {
    clickTabIndex(val) {
      if (val == this.currentTabs) {
        this.initData();
      }
    },
    "formData.main": {
      handler(newValue, oldValue) {
        if (newValue) {
          specialJS.WatchHandle(
            newValue,
            oldValue,
            this.formData,
            this.formMeta,
            "main",
            this
          );
        }
      },
      deep: true,
      immediate: true,
    },
    "formData.multinfos": {
      handler(newValue, oldValue) {
        if (newValue) {
          specialJS.WatchHandle(
            newValue,
            oldValue,
            this.formData,
            this.formMeta,
            "multinfos",
            this
          );
        }
      },
      deep: true,
      immediate: true,
    },
    // showPopUp(val) {
    //   if (val && this.$refs.sendFileCom) {
    //     this.$refs.sendFileCom.listenBack();
    //   }
    // },
    formData: {
      handler() {
        if (this.alreadSetStorage && dsf.config.commonForm.saveToStorage) {
          this.saveFormToStorage();
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.DioMounted = false;
    let self = this;
    this.$nextTick(() => {
      //当进入表单时 上一个页面不是我们的commonlist   待阅文件，通知公告文件则需要做修改已读操作
      if (!self.isFromList) {
        let postUrl, postPk;
        if (self.$route.query.distribId) {
          postPk = self.$route.query.distribId;
          postUrl = "fn/mobileToRead/markRead";
        } else if (self.moduleId == "180805175628RK7ixI1IyrjDuG4njD5") {
          postUrl = "fn/mobileNotice/markRead";
          postPk = `-${self.pk}`;
        }
        if (postUrl && postPk) {
          dsf.http
            .post(postUrl, {
              pks: postPk,
            })
            .then((res) => {});
        }
      }

      let handWrite = document.createElement("script");
      handWrite.type = "text/javascript";
      handWrite.src = "static/js/bridge.min.js";
      document.body.appendChild(handWrite);
    });
  },
  destroyed() {
    // window.removeEventListener("popstate", this.commandback, false);
  },
  activated() {},
  created() {
    this.pk = this._pk || this.$route.params.pk;
    this.moduleId = this._moduleId || this.$route.params.moduleId;
    let formParams = {};
    formParams.isSign = 0;
    formParams.pk = this.pk;
    formParams.moduleId = this.moduleId;
    //用于其他地方判断当前文件是否是拟稿文件，isNewFile为0是修改文件，1为拟稿文件
    if (this.pk) formParams.isNewFile = 0;
    else formParams.isNewFile = 1;

    this.formParams = formParams;
    this.init();
    this.$bus.on("commonFormBack", (data) => {
      this.backSucces();
    });
    this.$bus.off("iSignatureSend").on("iSignatureSend", (data) => {
      this.alreadyWriteOpintion = true;
      this.isShowWriteOpintionBtn = true;
      console.log(this.spHandleJS);
      if (this.spHandleJS && this.spHandleJS[`iSignatureSend.${data.act}`]) {
        //扩展签批插件中回调支持表单特殊js中自定义
        this.spHandleJS[`iSignatureSend.${data.act}`](
          this.formData,
          this.formMeta,
          this
        );
      } else {
        this.handleActionClick(data.act);
      }
    });
    // 控件需要触发表单保存的事件，保存后回调方法需传入，例A链接控件 controlMobileAlink
    this.$bus.off("saveFormBus").on("saveFormBus", (busObj) => {
      this.busObj = busObj;
      if (busObj.isTemp) {
        this.buttonHandle["xform.saveFormTemporarily"](
          this.$route.params,
          this.formMeta,
          this.formData,
          this,
          this.$refs,
          busObj.callback
        );
      } else {
        this.saveNoTip(busObj.callback);
      }
    });
    // 控件需要触发表单按钮，按钮上可能配了参数，所以要模拟点击按钮才能获取当前按钮参数
    this.$bus.off("handleFormBtn").on("handleFormBtn", (obj) => {
      if (this.$refs.DsfButtonToolbox) {
        let btn = this.formMeta.buttons.commonButtons
          .concat(this.formMeta.buttons.mainButtons)
          .find((item) => item.action == obj.action);
        if (btn) this.$refs.DsfButtonToolbox.onCommonClick(btn);
      }
    });
    // 控件需要触发表单刷新的事件
    this.$bus.off("refreshFormBus").on("refreshFormBus", () => {
      this.init();
    });
    // 控件显隐控制保存必填校验值
    this.$bus.on("changeControlShow", (obj) => {
      if (obj.show && this.notVaildateMetas.indexOf(obj.metaId) > -1) {
        // 显示且存在notVaildateMetas中删除
        this.notVaildateMetas.splice(this.notVaildateMetas.indexOf(obj.metaId), 1)
      } else if (!obj.show && this.notVaildateMetas.indexOf(obj.metaId) < 0) {
        // 不显示且不存在notVaildateMetas时新增
        this.notVaildateMetas.push(obj.metaId)
      }
    });
    if (this.isAsync == undefined) {
      this.isAsync = false;
      console.log("当前节点为同步");
    }

    //加载全局的表单特殊css 2023年4月20日20:24:59@luy
    dsf.loadCss.loadForm();
  },
  methods: {
    test() {
      alert("123123");
    },
    showNext(path) {
      console.log(path);
      this.showSuccess = true;
      this.curPath = path;
    },
    goBackList() {
      this.showSuccess = false;
      this.backSucces();
    },
    goNextDb() {
      this.showSuccess = false;
      this.$router.replace({
        path: this.curPath,
      });
      this.$eventBus.refresh(this);
    },
    //通用层选择完数据确定回调函数
    commonPopChoose(checkItems) {
      if (this.spHandleJS["choose"]) {
        this.spHandleJS["choose"](checkItems, this);
      } else {
        dsf.layer.toast("当前列表未定义接收函数！");
      }
    },
    setCurrentOpintion(content) {
      this.qixiangjuOpinion = content.content;
      this.formParams.isSign = content.isSign;
    },
    refreshPcForm() {
      // 提交审批意见后刷新pc表单
      console.log(this.$refs.pcForm);
      if (this.$refs.pcForm) {
        this.$refs.pcForm[0].refreshIframe();
      }
    },
    setOpintion(val) {
      console.log(val);
      this.currentOpintion = val[0].content;
      this.formParams.isSign = val[0].isSign;
      if (val[1] == "init") {
        this.saveNoTip(() => {
          this.initData();
          this.$nextTick(() => {
            // 填写意见保存后自动滚动到意见显示控件
            this.$eventBus.btnWriteOpintion(this);
          });
        });
      }
    },
    backSendSuc() {
      this.returnNodePop = false;
      setTimeout(() => {
        this.backSucces();
      }, 100);
    },
    getData(item) {
      return this.formData.main[item.metaId];
    },
    getContainer() {
      return document.body;
    },
    getNowButton(button) {
      this.nowButton = button;
      this.nowButtonParameters = {};
      if (this.nowButton.parameters) {
        this.nowButton.parameters.forEach((obj) => {
          this.nowButtonParameters[obj.key] = obj.value;
        });
      }
    },
    formOperation() {
      let self = this;
      let loadingIndex = dsf.layer.loading();
      /*
               刷新列表 refreshList
               打开表单 openForm
               弹出提示  openTip
               弹出提示并打开表单 openTipAndOpenForm
               弹出提示并打开表单 openComfirmAndOpenForm
               弹出提示并关闭当前表单 openTipAndCloseForm
               {action:"refreshList",moduleId:"",pk:"",message:"",listId:"",url:"/commonTabs/hxsws?title=核心商务书"}
               */
      if (self.nowButton.parameters && self.nowButton.parameters.length) {
        let operationUrl = self.nowButton.parameters[0].value;
        let operationData = {
          moduleId: self.moduleId,
          pk: self.pk,
          queryParams: JSON.stringify(self.$route.query),
        };
        dsf.http.post(operationUrl, operationData).then(({ data }) => {
          console.log(data);
          dsf.layer.closeLoading(loadingIndex);
          switch (data.action) {
            case "refreshList":
              dsf.layer.toast(data.message);
              setTimeout(() => {
                self.$eventBus.refresh(this);
              }, 1000);
              break;
            case "openForm":
              self.$router.push({
                path: `/commonForm/${data.moduleId}/${data.pk}`,
              });
              break;
            case "openTip":
              dsf.layer.toast(data.message);
              break;
            case "openTipAndCloseForm":
              dsf.layer.toast(data.message);
              setTimeout(() => {
                self.backSucces();
              }, 1000);
              break;
            case "openTipAndOpenForm":
              dsf.layer.toast(data.message);
              setTimeout(() => {
                self.$router.push({
                  path: `/commonForm/${data.moduleId}/${data.pk}`,
                });
              }, 1000);
              break;
            case "openTipAndGoList":
              dsf.layer.toast(data.message);
              setTimeout(() => {
                self.$router.push({
                  path: data.url,
                });
              }, 1000);
              break;
            case "openComfirmAndOpenForm":
              dsf.layer.confirm(
                {
                  message: data.message,
                  confirmButtonText: "确认",
                },
                () => {
                  self.$router.push({
                    path: `/commonForm/${data.moduleId}/${data.pk}`,
                  });
                }
              );
              break;
            default:
              dsf.layer.toast(data.message);
              break;
          }
        });
      } else {
        dsf.layer.toast("当前按钮未配置接口参数");
      }
    },
    handleActionClick(action) {
      this.currentAction = action;
      let self = this;
      if (this.spHandleJS && this.spHandleJS[action]) {
        //扩展按钮js支持表单中特殊定义的
        this.spHandleJS[action](this.formData, this.formMeta, this);
      } else if (action == "formOperation") {
        //如果按钮参数中有needSave=0则不执行保存  直接调用按钮操作
        let needSaveBtn =
          self.nowButton.parameters &&
          self.nowButton.parameters.find((item) => item.key == "needSave");
        if (needSaveBtn && needSaveBtn.value == 0) {
          this.formOperation();
        } else {
          this.saveNoTip(() => {
            this.formOperation();
          });
        }
      } else if (self.buttonHandle[action]) {
        this.btnAction(action);
      } else dsf.layer.toast("当前按钮未定义：" + action, false);
    },
    saveNoTip(callBack) {
      if (this.spHandleJS && this.spHandleJS.saveFilter) {
        this.spHandleJS
          .saveFilter(this.formData, this.formMeta, this, "saveNoTip")
          .then((res) => {
            this.buttonHandle["saveNoTip"](
              this.$route.params,
              this.formMeta,
              this.formData,
              this,
              callBack
            );
          })
          .catch((err) => {
            dsf.layer.toast(err);
          });
      } else {
        this.buttonHandle["saveNoTip"](
          this.$route.params,
          this.formMeta,
          this.formData,
          this,
          callBack
        );
      }
    },
    btnAction(action) {
      this.currentAction = action;
      this.buttonHandle[action](
        this.$route.params,
        this.formMeta,
        this.formData,
        this,
        this.$refs,
        this.spHandleJS.saveAfter ? this.spHandleJS.saveAfter : null
      );
    },
    handleFlowSendChange(val) {
      // this.init(); // 红船项目inti()报错且此处执行无意义故注释——xiaocy.2021.10.22
      console.info("tag", "handleFlowSendChange");
      this.sendLineIds = val;
      specialJS.sendAfter(this.formData, this.formMeta, this);
    },
    closeSendFilePopup() {
      this.$refs.sendFileCom.cancel();
    },
    closeSendFile(sendOpintion) {
      if (sendOpintion && sendOpintion.length) {
        this.sendFileOpintion = sendOpintion;
      }
      this.showPopUp = false;
      console.info("console", "handleFlowSendChange");
    },
    openFile() {},
    buttonInit() {},
    initData() {
      // 仅重新加载控件数据
      let self = this;
      let infoUrl =
        dsf.config.clientType == "iPad"
          ? "fn/xform/getInfo?hd=1"
          : "fn/xform/getInfo";
      dsf.http.get(infoUrl, this.getinfoParams).then(function (data) {
        if (data.data?.type == "error") {
          dsf.layer.toast(data.data.message);
          setTimeout(() => {
            self.$router.back();
          }, 2000);
          return;
        }
        let formData = data.data.data;
        data.data.struct.controls.forEach((item, index) => {
          if (!formData.main[item.metaId]) {
            if (JSON.stringify(item.defaultValue) != "{}") {
              if (item.controlType == "controlUser") {
                formData.main[item.metaId] = JSON.parse(
                  item.defaultValue.value
                );
              } else {
                formData.main[item.metaId] = item.defaultValue;
              }
            } else {
              if (!self.notMainCtr.find((it) => item.controlType == it)) {
                formData.main[item.metaId] = {
                  value: "",
                };
              }
            }
          }
          if (item.controlType == "controlHidden" &&item.defaultValue?.value) {
            formData.main[item.metaId] = {value: item.defaultValue.value};
          }
          let ctrlTemp = self.formMeta.controls.find(ctrl => ctrl.controlId == item.controlId)
          if(ctrlTemp)ctrlTemp.extra = item.extra
        });
        self.formData.main = formData.main;
        self.formButtons = data.data.struct.buttons;
        self.formMeta.buttons = data.data.struct.buttons;
        self.$set(
          self.formParams,
          "extraPageNum",
          data.data.struct.parameters.extraPageNum
        ); // 增页tab参数

        self.$nextTick(() => {
          specialJS.initDataAfter(self.formData, self.formMeta, self);
        });
      });
    },
    async init() {
      let self = this;
      // const form = this.$route.query;
      self.$eventBus.OnDoSaveForm(this, (callback) => {
        //console.log("here")
        self.buttonHandle["save"](
          self.$route.params,
          self.formMeta,
          self.formData,
          self,
          self.$refs,
          callback
        );
      });
      let form = {};
      if (this.isPop) {
        form = Object.assign({}, this._params);
        form.pk = this.pk;
        form.moduleId = this.moduleId;
        form.isEnterTodo = -1;
      } else {
        form = Object.assign({}, this.$route.query);
        form.pk = this.pk;
        form.moduleId = this.moduleId;
        form.isEnterTodo = this.$route.params.isEnterTodo ? 1 : -1;

        //console.log(this.$route.query);
        if (this.$route.query) {
          if (this.$route.query.listId || this._params.listId) {
            form.listId = this.$route.query.listId || this._params.listId;
          }
          if (this.$route.query.method || this._params.method) {
            form.method = this.$route.query.method || this._params.method;
          }
          if (this.$route.query.qianshoufankui) {
            form.listId = this.$route.query.qianshoufankui;
            form.method = this.$route.query.method;
            form.validateByList = this.$route.query.validateByList;
          }
          if (this.$route.query.todoId) {
            form.todoId = this.$route.query.todoId;
          }
          if (this.$route.query.initDataSource) {
            // 类别预转换
            form.initDataSource = this.$route.query.initDataSource;
          }
          //表单formId
          if (this.$route.query.formId || this._formId) {
            form.customXForm = this.$route.query.formId || this._formId;
          }

          if (this.$route.query.originModuleId) {
            form.originModuleId = this.$route.query.originModuleId;
          }
          if (this.$route.query.originPk) {
            form.originPk = this.$route.query.originPk;
          }
        }

        if (self.tab == "db") {
          //代办tab
          form.listId = "190328103127HaPchz97HN6WfDHYZlq"; //固定
          form.method = "feedback";
          if (this.$route.query.formMethod) {
            form.method = "info";
          }
          form.validateByList = 1;
        } else if (self.tab == "hy") {
          form.listId = "2005251401083zMqDmCkxfMm1LkQC4w"; //固定
          // form.method = "viewList";
        } else if (self.tab == "gw") {
          form.todoId = this.$route.query.todoId;
          self.formParams.todoId = this.$route.query.todoId;
        } else if (self.tab == "dy") {
          form.distribId = this.$route.query.distribId;
        }
        if (form.customXForm) form.todoId = ""; // 先显示自定义表单
        if (this._formId) form.formId = this._formId;
      }

      this.getinfoParams = form;
      //获取表单描述数据
      let infoUrl =
        dsf.config.clientType == "iPad"
          ? "fn/xform/getInfo?hd=1"
          : "fn/xform/getInfo";
      await dsf.http.get(infoUrl, form).then(async function (data) {
        if (data.data?.type == "error") {
          dsf.layer.toast(data.data.message);
          setTimeout(() => {
            self.$router.back();
          }, 2000);
          return;
        }
        self.importButtonHandle()
        let formData = data.data.data;
        if (self.$route.name == "commonForm") {
          if (self.$route.query.title) {
            urlJs.setTitle(self.$route.query.title);
          } else if (data.data.struct.parameters.title) {
            urlJs.setTitle(data.data.struct.parameters.title);
          } else if (data.data.struct.parameters.titleBar) {
            urlJs.setTitle(data.data.struct.parameters.titleBar);
          } else if (formData.main["A0005"] && formData.main["A0005"].value) {
            urlJs.setTitle(formData.main["A0005"].value);
          }
        }
        if (dsf.config.commonForm.saveToStorage)
          self.setStructJSON(data.data.struct);
        self.formParams.pk = data.data.struct.parameters.pk;
        self.formParams.formId = data.data.struct.parameters.formId;
        data.data.struct.controls.forEach((item, index) => {
          if (!formData.main[item.metaId]) {
            if (JSON.stringify(item.defaultValue) != "{}") {
              if (item.controlType == "controlUser") {
                formData.main[item.metaId] = JSON.parse(
                  item.defaultValue.value
                );
              } else {
                formData.main[item.metaId] = item.defaultValue;
              }
            } else {
              if (!self.notMainCtr.find((it) => item.controlType == it)) {
                formData.main[item.metaId] = {
                  value: "",
                };
              }
            }
          }
          if (
            item.controlType == "controlHidden" &&
            item.defaultValue &&
            item.defaultValue.value
          ) {
            formData.main[item.metaId] = {
              value: item.defaultValue.value,
            };
          }
          // 有意见驱动控件，发送界面不显示意见框
          if (item.controlType == "controlOpinionTagView") {
            self.hasControlOpinionTagView = true;
          }
        });
        self.$set(
          self.formParams,
          "extraPageNum",
          data.data.struct.parameters.extraPageNum
        ); // 增页tab参数
        self.formData = data.data.data;
        //判断控件是否存在
        let struct = data.data.struct;
        // 气象局需要展示详情页的模块判断是不是分阅单,分阅单不显示
        if (
          dsf.config.commonForm.qixiangjuDetailModules &&
          self.pk &&
          dsf.config.commonForm.qixiangjuDetailModules.find(
            (item) => item.split("_")[0] == self.moduleId
          )
        ) {
          self.formStyle = 1;
          if (
            struct.parameters.formId ==
            dsf.config.commonForm.qixiangjuDetailModules
              .find((item) => item.split("_")[0] == self.moduleId)
              .split("_")[1]
          ) {
            self.formStyle = 0;
          }
        }
        let filesParams = {
          pk: self.pk,
          moduleId: self.moduleId,
          nodeId: struct.parameters.nodeId,
          flowId: struct.parameters.flowId,
        };
        if (self.formParams.extraPageNum) {
          // 增页tab参数
          filesParams.extraPageNum = self.formParams.extraPageNum;
        }

        await dsf.http
          .post("fn/mobileRelationFile/getFormRelationFiles", filesParams)
          .then((res) => {
            self.relationList = res.data.rows;
          });
        //获取正文附件
        await self.getSignFile(struct);
        if (struct.subform) {
          let sortArr = Object.values(struct.subform).map(
            (item) => item.showOrder
          );
          let news = "";
          for (var i = 0; i < sortArr.length; i++) {
            for (var j = 0; j < sortArr.length - i; j++) {
              if (sortArr[j] > sortArr[j + 1]) {
                news = sortArr[j];
                sortArr[j] = sortArr[j + 1];
                sortArr[j + 1] = news;
              }
            }
          }
          let subformKeys = sortArr.map((item, index) => {
            return Object.entries(struct.subform).filter((itm) => {
              return itm[1].showOrder == item;
            })[0][0];
          });
          self.formData.subformKeys = subformKeys;
        }
        var multinfos = {};
        if (struct.subform) {
          for (let [k, v] of Object.entries(struct.subform)) {
            if (formData.subform && formData.subform[k]) {
              formData.subform[k].forEach((item) => {
                // item.action = "Updated";
                self.$set(item, "action", "Updated");
              });
              multinfos[k] = {
                rows: formData.subform[k],
                notVaildateMetas: []
              };
            } else {
              multinfos[k] = {
                rows: [],
                notVaildateMetas: []
              };
            }
          }
        }

        self.multinfos = multinfos;
        // self.formData.multinfos = multinfos;
        self.$set(self.formData, "multinfos", multinfos);

        //初始化特殊JS
        await specialJS.init(self.moduleId, struct.parameters.formId, () => {
          self.spHandleJS = dsf.util.deepCopy(specialJS.spHandleJS);
        });
        let allCompsName = Object.keys(allComps);
        struct.controls = struct.controls.filter((item, index) => {
          item.show = 1;
          item.propertyShow = 1; // 分栏组件控制其他组件隐藏显示
          // 提取标题
          if (
            item.metaId == "B0001" &&
            index == 0 &&
            item.extra.eatraClass != "notTitle" &&
            dsf.config.commonForm.bigTitle &&
            (!dsf.config.commonForm.notBigTitleModules ||
              dsf.config.commonForm.notBigTitleModules.indexOf(self.moduleId) ==
                -1)
          ) {
            item.controlType = "formTitle";
            item.showLable = false;
          }
          if (item.extra.nodeList) {
            //过滤意见显示
            let nodeArr = item.extra.nodeList
              .split(",")
              .filter((item) => item && item != "null");
            item.opinion = Object.entries(self.formData.opinion)
              .filter((item) => nodeArr.indexOf(item[0]) > -1)
              .map((itm) => itm[1]);
          }

          // 如果有意见输入控件，则发送时不需要再出意见输入弹窗
          if (
            item.controlType == "controlEditOpinion" &&
            item.privilege.visible == true
          ) {
            self.shoEditOpinion = 0;
            self.editorOpinionMetaData = item;
            self.showOpinionAndBtn = item.extra.displayMode == "4" ? true : false; //显示模式：4 聊天模式输入
            item.show = item.extra.displayMode == "4" ? 0 : 1;
          }
          if (item.controlType == "controlOpinionView") {
            if (item.extra.mobileInput == 1) {
              // 如果意见显示配了可进行意见输入，发送时不需要再出意见输入弹窗
              self.shoEditOpinion = 0;
            } else if (!item.extra.list || item.extra.list.length == 0) {
              // 意见显示无内容则不显示控件
              item.show = 0;
            }
          }
          if (item.controlType == "opinionControlP2433") {
            console.log(item);
            let showNodeArr = item.extra.showNodeId.split(',')
            if (!showNodeArr.includes(struct.parameters.nodeId)) {
              // 意见维护特定节点不显示
              item.show = 0;
            }
          }
          if (item.controlType == "controlHidden") {
            item.show = 0;
          }
          if (item.controlType == "LabelForTextControl") {
            item.showLable = false;
          }
          if (item.controlType == "controlFileCode") {
            //公文只读
            item.readonlyValue = data.data.data.main[item.metaId]
              ? data.data.data.main[item.metaId]
              : "";
          }
          if (item.privilege && !item.privilege.visible) {
            self.notVaildateMetas.push(item.metaId);
            item.show = 0;
          }
          if (
            item.controlType == "controlRadio" &&
            item.extra.mobileSelectType == "1"
          ) {
            item.controlType = "controlComboBox";
          }
          if (
            item.controlType == "controlCheckBox" &&
            item.extra.mobileSelectType == "1"
          ) {
            item.controlType = "controlComboBox";
          }
          // 子表只读 无数据时隐藏
          if (
            item.controlType == "controlSubFormPrimary" &&
            !item.privilege.editable &&
            !formData.subform?.[item.metaId]?.length
          ) {
            item.show = 0;
          }
          if (
            item.controlType == "controlMobileFlowInfo" &&
            struct.parameters.hasFlow == 0
          ) {
            item.show = 0;
          }
          // 时间段显示控件 在开始时间 结束时间都只读且有值时显示
          if (item.controlType == "controlMobileDateShow") {
            item.showLable = false;
            let startCtr = struct.controls.find(
              (ctr) => ctr.metaId == item.extra.startMetaId
            );
            let endCtr = struct.controls.find(
              (ctr) => ctr.metaId == item.extra.endMetaId
            );
            let startVal = formData.main[item.extra.startMetaId]?.value;
            let endVal = formData.main[item.extra.endMetaId]?.value;
            if (
              !startCtr.privilege.editable &&
              !endCtr.privilege.editable &&
              startVal &&
              endVal
            ) {
              startCtr.show = 0;
              endCtr.show = 0;
              item.show = 1;
            } else {
              item.show = 0;
            }
          }
          // 控件属性配置：只读为空是否隐藏readonlyHide == 1为是
          if (
            !item.privilege.editable &&
            formData.main[item.metaId] &&
            Object.values(formData.main[item.metaId]).every(
              (val) => val == ""
            ) &&
            item.extra.readonlyHide == 1
          ) {
            item.show = 0;
          }
          //如果是关联文件控件又没有关联文件记录并且只读节点就不显示该控件 2023年4月21日16:34:19@luy
          if (item.controlType == "controlFileRelation") {
            let fileRela =
              self.relationList.find(
                (itemrel) => itemrel.fileRelaId == item.extra.fileRelaId
              )?.document || [];
            if (!item.privilege.editable && fileRela.length == 0) {
              item.show = 0;
            }
          }
          //如果是相关文件控件又没有相关文件并且只读就不显示该控件
          if (item.controlType == "controlFileUpload") {
            let FileUpload =
              self.allFile.find(
                (itemrel) => itemrel.attachType == item.metaId.substr(7)
              )?.file || [];
            // 后台配置中-修改、维护、仅上传都不选，且没有相关文件时不显示该控件  2023年7月21日 @ningmy
            if (
              item.extra.allowMaintain == "-1" &&
              item.extra.allowUpload == "-1" &&
              FileUpload.length == 0
            ) {
              item.show = 0;
            }
          }
          // 属性联动被操作对象默认都不显示
          for (let i = 0; i < struct.propertyJoin.length; i++) {
            let propertyJoinTemp = struct.propertyJoin[i];
            //如果当前规则有多个属性联动控件需要逗号拆分循环操作 2022年7月5日16:31:58@ly
            let operateTargetArr = propertyJoinTemp.operateTarget.split(",");
            operateTargetArr.forEach((elementTarget) => {
              let elementTargetArr = elementTarget.split(":");
              /*
                            elementTargetArr.length长度大于1说明是子表的属性联动规则，子表的需要拆分特殊处理
                            elementTargetArr[0]为子表id
                            elementTargetArr[1]为子表需要联动的控件metaId
                            2022年7月5日16:25:02@ly
                             */
              if (elementTargetArr.length > 1) {
                //length大于1的在子表控件中处理
              } else if (
                elementTargetArr[0] == item.metaId &&
                propertyJoinTemp.operation == "1" &&
                self.notVaildateMetas.indexOf(item.metaId) < 0
              ) {
                self.notVaildateMetas.push(item.metaId);
                /*
                此处不能修改默认为0不显示，
                因为vant组件的bug，当为0不显示控件时 vant无法计算出组件的高度，
                所以默认组件设置的是什么就是什么，
                后面靠属性联动去修改它的值
                2022年11月29日20:10:37@luy
                */
                // item.show = 0;
                item.propertyOperateTarget = 1; // 给控件加属性标识为属性联动的被操作对象
              }
            });
          }
          if (item.controlType == "extraPageView") {
            // 增页控件 需要控件数据，但是不显示
            if (item.extra.solicitMode != undefined) {
              self.formParams.solicitMode = item.extra.solicitMode;
            }
            if (item.extra.viewMode != undefined) {
              self.formParams.viewMode = item.extra.viewMode;
            }
            if (item.extra.showFileTypes != undefined) {
              self.formParams.showFileTypes = item.extra.showFileTypes;
            }
            return false;
          }
          if (item.controlId == "79" || item.controlId == "78") {
            return false;
          } else {
            return allCompsName.filter((itm) => item.controlType == itm).length;
          }
        });

        self.allformMeta = JSON.parse(JSON.stringify(struct));

        self.$route.query.distribId
          ? (self.formData.distribId = self.$route.query.distribId)
          : "";
        self.$route.query.masterId
          ? (self.formData.masterId = self.$route.query.masterId)
          : "";

        self.formMeta = struct;
        await self.spHandleJS?.beforeInitAsync?.(
          self.formData,
          self.formMeta,
          self
        );
        self.initFormTab();
        self.getDividerColor(); // 获取控件分割线颜色
        if (dsf.config.commonForm.saveToStorage) {
          self.setStorageToForm();
        }
        self.$nextTick(() => {
          specialJS.initHandle(self.formData, self.formMeta, self);
          //属性联动JS方法
          specialJS.propertyJoinHandle(self.formData, self.formMeta, self);
        });
        self.formButtons = struct.buttons;
        //如果是待阅进入表单  则刷新列表数据，防止待阅文件阅毕以后没有刷新 2022年4月2日17:55:54  @ly
        if (self.tab == "dy") {
          self.$eventBus.refresh(self);
        }
        if (self.afterGetinfoFunc) {
          self.afterGetinfoFunc();
        }
        // 加载完毕
        self.getInfoLoading = false;
      });
    },
    getSelectUser(data) {
      console.log(data);
      if (this.ShowTreeData) {
        this.formParams.SelectData = data;
        this.ShowTreeData = false;
        this.showPerson = false;
        console.log(this.$refs.commonDialog);
        return;
      }
      if (data.length > 0) {
        //去掉父节点，保留选中的子节点
        data.forEach((item, index) => {
          if (item.children && item.children.length > 0) {
            data.splice(index, 1);
          }
        });
        const ids = data.map((item) => item.id.replace("person_", ""));
        let toast = {};
        if (this.isTransfer) {
          if (data.length > 1) {
            dsf.layer.toast("请仅选中一人转交", true);
            return;
          }
          const type = this.getType();
          const user = dsf.util.loadSessionStore("user");
          const loading = dsf.layer.loading("取消中");
          let dataValue = this.dataValue;
          this.showPerson = false;
          console.log(type);
          dsf.changeUser.flowChangeUser({
            param: {
              pk: dataValue.info_id,
              pId: dataValue.pid,
              pnId: dataValue.pnid,
              fromUserId: user.user_id,
              userId: ids.join(","),
              userName: data.map((it) => it.name).join(","),
              deptId: data.map((it) => it.pid).join(","),
              deptName: "",
            },
            thenFun: () => {
              this.backSucces();
            },
            finallyFun: () => dsf.layer.closeLoading(loading),
          });
        } else if (this.isDing) {
          dsf.dd.Ding({
            users: ids, // 用户列表，工号
            type: 2, // 附件类型 1：image  2：link
            alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
            alertDate: {
              format: "yyyy-MM-dd HH:mm",
              value: "2020-05-13 20:00",
            },
            attachment: {
              images: [""],
            }, // 附件信息
            text: dataValue.bt || item.dataValue["B0001"], // 正文
            bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；
            onSuccess: function () {
              this.dsf.layer.toast("操作成功");
            },
            onFail: function () {
              this.dsf.layer.toast("操作失败");
            },
          });
        } else {
          dsf.http
            .post("fn/newMobileMeeting/sendMeetingSq", {
              pk: dataValue.info_id,
              userIds: ids,
              bt: dataValue.bt,
            })
            .then((res) => {
              if (res.data.type == "success") {
                dsf.layer.toast("操作成功", true);
              }
            })
            .catch((response) => {
              toast = {
                msg: "操作异常",
                type: false,
              };
            })
            .finally((res) => {
              if (toast.msg) {
                dsf.layer.toast(toast.msg, toast.type);
              }
            });
        }
      }
    },
    cancePerson() {
      this.showPerson = false;
    },
    getType() {
      let type = 6;
      console.log(this.tab);
      switch (this.tab) {
        case "gw":
          type = 1;
          break;
        case "hy":
          type = 2;
          break;
        case "db":
          type = 3;
          break;
        case "dy":
          type = 4;
          break;
        case "dqs":
          type = 5;
          break;
      }
      return type;
    },
    initSubForm() {
      let self = this;
      let struct = this.formMeta;

      for (let [k, v] of Object.entries(struct.subform)) {
        if (self.formData.multinfos[k]) {
          self.formData.multinfos[k].rows.forEach((item) => {
            //增加条件，如果是新增状态的  第二次保存需要修改updated，不能全部改成Updated，因为删除的也会被修改成Updated  2022年3月25日22:51:33 @ly
            if (item.action == "Added") {
              self.$set(item, "action", "Updated");
            }
          });
        }
      }
    },
    backSucces(idx) {
      this.$eventBus.refresh(this);
      // 三方推送关闭逻辑参照知识库-DreamMobile2.2-移动端项目开发-表单推送问题
      // 项目特殊逻辑优先处理
      if (this.$route.query.from == "govding") {
        dsf.dd.closePage();
      } else if (this.$route.query.isShGovWechat == 1) {
        // 上海一体化
        setTimeout(() => {
          window.wx.closeWindow();
        }, 500);
      } else if (this.$route.query.from == "lzt") {
        setTimeout(() => {
          window.lzt.action("closeWebView", { refresh: 1 });
        }, 500);
      } else if (this.$route.query.closeIMPage == 1) {
        setTimeout(() => {
          chatJS.closeIMPage();
        }, 500);
      } else if (window.dd) {
        if (window.dd.biz) {
          if (this.$route.query.closePage == 1) {
            window.dd.biz.navigation.close({
              onSuccess: function (result) {},
              onFail: function (err) {},
            });
          } else {
            window.dd.biz.navigation.goBack();
          }
        } else {
          if (this.$route.query.closePage == 1) {
            window.dd.closePage();
          } else {
            window.dd.goBack();
          }
        }
      } else if (this.$route.query.closePage == 1) {
        if (window.top != window) {
          this.$router.back();
        } else {
          setTimeout(() => {
            dsf.util.closeWebview();
          }, 500);
        }
      } else if (idx) {
        this.$router.go(-1 * Math.abs(idx));
      } else {
        setTimeout(() => {
          this.$router.back();
        }, 50);
      }
    },
    initFormTab() {
      let self = this;
      let tabs = [];
      let privileges = dsf.util.loadSessionStore("user")?.privileges || [];
      if (dsf.config.formTab) {
        //如果有配置显示固定显示TAB，则使用配置
        tabs = dsf.config.formTab.filter((item) => {
          let checkshow = false;
          if (item.showModuleIds != undefined && item.showModuleIds != "") {
            if (
              item.showModuleIds.some((itemdata) => {
                return (
                  itemdata.split("_")[0] == self.moduleId &&
                  (!itemdata.split("_")[1] ||
                    itemdata.split("_")[1] == self.formMeta.parameters.formId)
                );
              })
            ) {
              //模块上显示，再看权限有没有控制
              checkshow =
                !item.showPrivileges ||
                privileges.some((privilege) =>
                  item.showPrivileges.includes(privilege.name)
                );
            }
          } else {
            //模块上显示，再看权限有没有控制
            checkshow =
              !item.showPrivileges ||
              privileges.some((privilege) =>
                item.showPrivileges.includes(privilege.name)
              );
          }

          const {
            defaultSelectModuleIds,
            name,
            padEnable,
            enable,
            noShowModuleIds,
          } = item;
          // noShowModuleIds 迁移标准版 相关附件在某个表单不展示
          if (noShowModuleIds && noShowModuleIds.length) {
            noShowModuleIds.find((itemId) => {
              if (
                itemId.split("_")[0] == self.moduleId &&
                (!itemId.split("_")[1] ||
                  itemId.split("_")[1] == self.formMeta.parameters.formId)
              ) {
                checkshow = false;
              }
            });
          }

          if (defaultSelectModuleIds?.includes(self.moduleId)) {
            self.headTab = name;
          }
          if (padEnable !== undefined && dsf.config.clientType == "iPad") {
            return padEnable && checkshow;
          } else {
            return enable && checkshow;
          }
        });
      }
      function findTabIndex(target) {
        return tabs.findIndex((tab) => tab.name === target);
      }
      function removeTab(target) {
        const index = tabs.findIndex((tab) => tab.name === target);
        if (index > -1) {
          tabs.splice(index, 1);
          return true;
        } else {
          return false;
        }
      }

      let moduleId = this.moduleId;
      // 不显示流转情况
      if (!this.pk) {
        //如果是拟稿文件，则不显示流转情况
        removeTab("moveStatus");
        removeTab("newMoveStatus");
      } else if (this._params.commonTabHaveStatus) {
        removeTab("moveStatus");
        removeTab("newMoveStatus");
      } else if (
        this.formMeta.parameters &&
        JSON.stringify(this.formMeta.parameters.hasFlow) == 0
      ) {
        removeTab("moveStatus");
        removeTab("newMoveStatus");
      } else if (
        moduleId == "210204173326Wha9PmqgePoJ8JSIZWX" ||
        moduleId == "210202144200a6hFT4QWrGbmmP4dSy1"
      ) {
        removeTab("moveStatus");
        removeTab("newMoveStatus");
      } else {
        const hideModuleId = dsf.config.commonForm?.hideMoveStatus || [];
        const tempHideModule = hideModuleId.some((item) => {
          const moduleIdSuffix = item.split("_")[0];
          const formIdSuffix = item.split("_")[1];
          return (
            moduleIdSuffix == moduleId &&
            (!formIdSuffix || formIdSuffix == this.formMeta.parameters.formId)
          );
        });
        if (tempHideModule) {
          removeTab("moveStatus");
          removeTab("newMoveStatus");
        }
      }
      // 不显示聊天
      if (!this.pk) {
        //如果是拟稿文件，则不显示流转情况
        removeTab("chatFrame");
      }
      // 不显示签批单
      if (!privileges.filter((item) => item.name == "手写签批权限").length) {
        removeTab("signForm");
      }
      // 不显示附件
      if (
        this.formMeta.parameters &&
        JSON.stringify(this.formMeta.parameters.showAttachTab) == "false"
      ) {
        removeTab("relevantFile");
      } else if (moduleId == "210204173326Wha9PmqgePoJ8JSIZWX") {
        removeTab("relevantFile");
      }
      // 不显示关联文件
      if (
        !this.relationList.some(
          (item) => item.canShow == 1 && item.document.length > 0
        )
      ) {
        // 所有关联类型都不可则不显示该tab页
        removeTab("relationList");
      }
      // 如果是PC预览表单,则只显示表单Tab
      if (this.$route.query.isPreview) {
        tabs = [tabs.find((item) => item.name == "formTab")];
      }
      // 如果配置了表单手写签批模板，直接进入相关文件tab并打开签批模式(有签批单tab时默认先选中签批单)
      if (findTabIndex("signForm") < 0 && findTabIndex("relevantFile") > -1) {
        if (this.formMeta.parameters?.isopenHandwrite == "1") {
          this.headTab = "relevantFile";
        }
      }
      // 不显示增页控件tab的指定参数
      if (this.$route.query.notShowFeedbackHandle) {
        removeTab("feedbackHandle");
      }
      // formtab增加列表DefaultList
      let listTabIndex = findTabIndex("DefaultList");
      const listTabArr = tabs[listTabIndex]?.set;
      if (listTabArr) {
        // 先删除原有地 DefaultList
        removeTab("DefaultList");
        listTabArr.forEach((item) => {
          if (item.formId == this.formMeta.parameters.formId) {
            const listTab = {
              name: "DefaultList",
              title: item.title,
              listParams: { params: item.params || {} },
            };
            // 至少有一项配置，才会添加到 tabs
            if (item.fileType) {
              listTab.listParams.params.fileType = item.fileType;
              tabs.splice(listTabIndex++, 0, listTab);
            } else if (item.listId) {
              listTab.listParams.listId = item.listId;
              listTab.listParams.moduleId = item.moduleId;
              tabs.splice(listTabIndex++, 0, listTab);
            }
          }
        });
      } else {
        removeTab("DefaultList");
      }
      //如果hideOtherTab参数，只显示需要显示的
      if (this.$route.query.hideOtherTab) {
        tabs = [tabs.find((item) => item.name == this.$route.query.activeTab)];
      }
      this.formTabs = dsf.util.deepCopy(tabs);
    },
    getSignFile(struct) {
      // 获取全部附件
      return new Promise((resolve, reject) => {
        let filesParams = {
          info_id: struct.parameters.pk,
          infoId: struct.parameters.pk,
          nodeId: struct.parameters.nodeId,
          flowId: struct.parameters.flowId,
          moduleId: this.moduleId,
          start: 1,
          limit: 100,
          pnId: struct.parameters.pnId,
        };
        if (this.formParams.extraPageNum) {
          // 增页tab参数
          filesParams.extraPageNum = this.formParams.extraPageNum;
        }
        if (this.$route.query.distribId)
          filesParams.distribId = this.$route.query.distribId;
        if (this.$route.query.realDistribId)
          filesParams.realDistribId = this.$route.query.realDistribId;
        if (this.$route.query.dataFrom)
          filesParams.dataFrom = this.$route.query.dataFrom;
        dsf.http
          .post("fn/mobileAttachment/getFormAttachment", filesParams)
          .then((data) => {
            let rows = data.data.rows;
            let timestamp = new Date().getTime();
            let loginToken = dsf.util.loadSessionStore("loginToken");
            if (rows.length) {
              rows.forEach((item) => {
                let arr = [];
                if (item.document) {
                  item.document.forEach((doc, idx) => {
                    doc.downloadFileName = dsf.util.stripscript(doc.downloadFileName || doc.title);
                    let obj = {
                      pagination: doc.pagination,
                      id: doc.id,
                      title: doc.title,
                      downloadFileName: doc.downloadFileName,
                      type: doc.type,
                      size: doc.showFileSize || "",
                      navtiveUrl: doc.url,
                      url: dsf.url.getServerUrl(
                        `fn/office/openMobileOffice?fileId=${doc.id}&moduleId=${doc.moduleId}&fileName=${doc.downloadFileName}&nodeId=${struct.parameters.nodeId}&flowId=${struct.parameters.flowId}&x-auth-token=${loginToken}`
                      ),
                      //永中H5手写签批地址
                      // handWrittenUrl: dsf.url.getServerUrl(
                      //     `fn/mobileYozo/signature?fileId=${id}&moduleId=${moduleId}&nodeId=${struct.parameters.nodeId}&flowId=${struct.parameters.flowId}&x-auth-token=${loginToken}`
                      // ),
                      editUrl: dsf.url.getServerUrl(
                        `fn/mobileOffice/wordEdit?fileId=${doc.id}&moduleId=${doc.moduleId}&fileName=${doc.downloadFileName}&nodeId=${struct.parameters.nodeId}&nodeName=${struct.parameters.nodeName}&pnId=${struct.parameters.pnId}&flowId=${struct.parameters.flowId}&x-auth-token=${loginToken}`
                      ),
                      initUrl: `fn/file/download?infoId=${doc.infoId}&fileId=${doc.id}&fileName=${doc.downloadFileName}&nrType=${doc.type}&moduleId=${doc.moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${doc.downloadFileName}`,
                      handwritingUrl: dsf.url.getServerUrl(
                        `fn/office/openMobileOffice?fileId=${doc.id}&moduleId=${doc.moduleId}&fileName=${doc.downloadFileName}&nodeId=${struct.parameters.nodeId}&flowId=${struct.parameters.flowId}&x-auth-token=${loginToken}&handwriting=1&screenWidth=${document.body.clientWidth}`
                      ),
                      infoId: doc.infoId,
                      moduleId: doc.moduleId,
                      isHandwrite: this.$route.query.isdjOpen
                        ? -1
                        : doc.isHandwrite,
                      isRevise: doc.isRevise,
                      isNoModify: doc.isNoModify,
                      canEdit: doc.canEdit,
                      canDownLoad: doc.canDownLoad,
                      mj: doc.mj || "", //高密低流的文件密级 2023.10.21 @ZGH
                      mjText: doc.mjText || "", //高密低流的文件密级
                      //name: title
                      name:
                        item.document.length > 1
                          ? `${item.name}${idx + 1}`
                          : item.name,
                    };
                    if (
                      doc.title.toLowerCase().includes(".png") ||
                      doc.title.toLowerCase().includes(".jpg") ||
                      doc.title.toLowerCase().includes(".jpeg") ||
                      doc.title.toLowerCase().includes(".bmp") ||
                      doc.title.toLowerCase().includes(".gif") ||
                      doc.title.toLowerCase().includes(".mp4")
                    ) {
                      obj.url = dsf.url.getServerUrl(
                        `fn/mobileFileDownload/download?fileId=${doc.id}&moduleId=${doc.moduleId}&fileName=${doc.downloadFileName}`
                      );
                    }
                    if (item.canShow == "1") {
                      arr.push(obj);
                    }
                    // this.allFile.push(obj);
                    if (item.name == "手写签批" && obj.isHandwrite == "1") {
                      this.handWrittenFile.push(obj);
                    }
                  });
                  item.file = arr;
                } else {
                  item.file = [];
                }
                // //如果当前附件类型不可编辑并且没有文件则不显示该类别 2022年5月6日23:37:47 @ly
                // if (item.allowMaintain == "-1" && item.file.length == 0) {
                //   item.canShow = "-1";
                // }
                //如果当前附件类型不可维护，且不可上传，并且没有文件则不显示该类别 2023年7月21日 @ningmy
                if (
                  item.allowMaintain == "-1" &&
                  item.allowUpload == "-1" &&
                  item.file.length == 0
                ) {
                  item.canShow = "-1";
                }
              });
              this.allFile = rows.filter((row) => row.canShow == 1);
            }
            resolve(this.allFile);
          })
          .catch((err) => reject(err));
      });
    },
    actionSelect(action) {
      //江西府办特殊函数
      let self = this;
      self.$set(self.formData.main["B0024"], "value", action.value);
      if (this.spHandleJS && this.spHandleJS[action.method]) {
        //扩展按钮js支持表单中特殊定义的
        this.spHandleJS[action.method](this.formData, this.formMeta, this);
      } else
        this.buttonHandle["send"](
          this.$route.params,
          this.formMeta,
          this.formData,
          this,
          this.$refs,
          null,
          action.params
        );
    },
    actionSaveCallback(callback) {
      let self = this;
      self.buttonHandle["save"](
        self.$route.params,
        self.formMeta,
        self.formData,
        self,
        self.$refs,
        callback
      );
    },
    confirmFocus(fid) {
      dsf.http
        .post("/fn/mobileFocus/setFocus", {
          infoId: this.pk,
          fid: fid,
        })
        .then((res) => {
          if (res.data.result) {
            this.init();
            dsf.layer.toast(
              `${dsf.config.setting["SYS-MOBILE-LIST-0005"] || "收藏"}成功`
            );
          } else {
            dsf.layer.toast(res.data.message);
          }
        });
    },
    getDividerColor() {
      if (this.formMeta.parameters.formColor) {
        const cssRule = `
                .van-tab.van-tab--active {
                    color: ${this.formMeta.parameters.formColor} !important;
                }
                .van-tabs__line {
                    background-color: ${this.formMeta.parameters.formColor} !important;
                }
                .showDivider::before{
                    border-bottom:1px solid ${this.formMeta.parameters.formColor} !important;
                }
                .layout_box .control_label, .pad_layout_box .control_label{
                    color: ${this.formMeta.parameters.formColor};
                }
                .formLayout .relation-type .type-name{
                    color: ${this.formMeta.parameters.formColor};
                }
                .formLayout .fileTypeName .name{
                    color: ${this.formMeta.parameters.formColor};
                }
                .formLayout .fileTypeList:not(:last-child){
                    border-bottom:1px solid ${this.formMeta.parameters.formColor} !important;
                }
                .formLayout >.box .divider ::after{
                  border-color: ${this.formMeta.parameters.formColor} !important;
                }
                .control_mobile_fl span{
                    color: ${this.formMeta.parameters.formColor} !important;
                }
                .pad_layout_box .control_mobile_fl {
                    background-color: #fff;
                }
                .formLayout, .formLayout >.box .padLeftRight::before, .formLayout>.box .padLeftRight:last-child::after, .formLayout >.box .padDivider::after, .pad_layout_box .van-col:first-child:after {
                    border-color: ${this.formMeta.parameters.formColor} !important;
                }`;
        this.setCssRule(cssRule);
      } else if (dsf.config.setting["SYS-MOBILE-FORM-0019"]) {
        let colors = JSON.parse(dsf.config.setting["SYS-MOBILE-FORM-0019"]);
        for (let i = 0; i < colors.length; i++) {
          let item = colors[i];
          let forms = item.forms;
          if (
            forms.findIndex(
              (item) =>
                item.split("_")[0] == this.formMeta.parameters.moduleId &&
                (!item.split("_")[1] ||
                  item.split("_")[1] == this.formMeta.parameters.formId)
            ) > -1
          ) {
            const cssRule = `
                        .showDivider::before{
                            border-bottom:1px solid ${this.formMeta.parameters.formColor} !important;
                        }`;
            this.setCssRule(cssRule);
            break;
          }
        }
      }
    },
    setCssRule(cssRule) {
      this.dividerStyle = document.createElement("style");
      this.dividerStyle.type = "text/css";
      this.$el.appendChild(this.dividerStyle);
      this.dividerStyle.innerHTML = cssRule;
    },
    closeCallback([data, actionName]) {
      this.componentName = "";
      if (data?.justClose) {
        return;
      }
      if (this.spHandleJS["closeDialogCallback"]) {
        this.spHandleJS["closeDialogCallback"](
          data,
          actionName,
          this.formData,
          this.formMeta,
          this
        );
      }
    },
    showTree(data) {
      //通用弹框人员选择
      this.extra = data;
      this.ShowTreeData = true;
      this.showPerson = true;
      console.log(this.data);
    },
    beforechangeTab(name) {
      if (this.projectBeforechangeTab) {
        return this.projectBeforechangeTab(name);
      } else {
        return true;
      }
    },
    changeTab(name) {
      if (
        this.$refs.relevantFile &&
        this.$refs.relevantFile[0].$refs.enclosure.$refs.tabEnclosurePreview
      ) {
        if (name != "relevantFile") {
          // 切换tab时  清除文件自动加载定时器
          this.$refs.relevantFile[0].$refs.enclosure.$refs.tabEnclosurePreview.destroyInterval();
        } else {
          // 相关文件 自动重试后重新加载
          if (
            this.$refs.relevantFile[0].$refs.enclosure.$refs.tabEnclosurePreview
              .count >= 0
          ) {
            this.$refs.relevantFile[0].$refs.enclosure.$refs.tabEnclosurePreview.init();
          }
        }
      }
      if (
        this.$refs.signForm &&
        this.$refs.signForm[0].$refs.tabEnclosurePreview
      ) {
        if (name == "signForm") {
          this.$refs.signForm[0].$refs.tabEnclosurePreview.init();
        }
      }
    },
    opinionToSend() {
      this.alreadyWriteOpintion = true;
      if (this.nowButton.action == "BtnWriteOpinion") {
        this.handleActionClick("send");
      } else {
        this.handleActionClick(this.nowButton.action);
      }
    },
    removeLocalOptions() {
      if (this.$route.query.todoId) {
        let localOpnions = dsf.util.loadLocalStore("opnions") || {};
        //delete localOpnions[`${this.$route.params.pk}_${this.$route.query.todoId}`]
        Object.keys(localOpnions)
          .filter((key) =>
            key.includes(`${this.$route.params.pk}_${this.$route.query.todoId}`)
          )
          .forEach((key) => delete localOpnions[key]);
        dsf.util.saveToLocalStore("opnions", localOpnions);
      }
    },
    closeLeaderReview() {
      this.ShowAddLeaderReview = false;
    },
    // 修改流程范围值
    changeLeaderSitu(val) {
      console.log(val);
      if(val && val.initControl) {
        this.formData.main[val.initControl].value = val.data;
      } else {
        this.initData();
      }
    },
    // structJSON用于比对表单是否存在变动，排除子表主键控件和extra属性
    setStructJSON(struct) {
      let copyStruct = JSON.parse(JSON.stringify(struct));
      if (copyStruct.subform) {
        Object.values(copyStruct.subform).forEach((sub) => {
          sub.controls = sub.controls.filter(
            (ctr) => ctr.controlType != "controlSubFormPrimary"
          );
          sub.controls.forEach((ctr) => {
            delete ctr.defaultValue;
            delete ctr.extra;
          });
        });
      }
      copyStruct.controls.forEach((ctr) => {
        delete ctr.defaultValue;
        delete ctr.extra;
      });
      let hash = {
        controls: copyStruct.controls.filter(
          (ctr) => ctr.controlType != "controlSubFormPrimary"
        ),
        rows: copyStruct.rows,
        subform: copyStruct.subform,
      };
      this.structJSON = JSON.stringify(hash);
    },
    // 获取缓存表单数据
    getStorageForm() {
      if (!this.$route.params.pk) {
        return dsf.util.loadLocalStore("draftForm")?.[
          `${this.moduleId}_${this.formParams.formId}`
        ];
      } else {
        let forms = dsf.util.loadLocalStore("editForms") || [];
        this.editFormIndex = forms.findIndex(
          (item) =>
            item.id == `${this.moduleId}_${this.formParams.formId}_${this.pk}`
        );
        return this.editFormIndex > -1 ? forms[this.editFormIndex] : null;
      }
    },
    saveFormToStorage() {
      if (!this.$route.params.pk) {
        let draftForm = dsf.util.loadLocalStore("draftForm") || {};
        draftForm[`${this.moduleId}_${this.formParams.formId}`] = {
          formData: this.formData,
          structJSON: this.structJSON,
        };
        dsf.util.saveToLocalStore("draftForm", draftForm);
      } else {
        let storageForm = this.getStorageForm();
        let editForms = dsf.util.loadLocalStore("editForms") || [];
        if (storageForm) {
          editForms[this.editFormIndex] = {
            id: `${this.moduleId}_${this.formParams.formId}_${this.pk}`,
            formData: this.formData,
            structJSON: this.structJSON,
            time: new Date().getTime(),
          };
        } else {
          if (
            editForms.length >=
            (dsf.config.commonForm.saveToStorageLength || 10)
          ) {
            editForms.pop();
          }
          editForms.unshift({
            id: `${this.moduleId}_${this.formParams.formId}_${this.pk}`,
            formData: this.formData,
            structJSON: this.structJSON,
            time: new Date().getTime(),
          });
        }
        dsf.util.saveToLocalStore("editForms", editForms);
      }
    },
    setStorageToForm() {
      this.alreadSetStorage = true;
      let storageForm = this.getStorageForm();
      if (!storageForm) return;
      if (
        storageForm.structJSON != this.structJSON ||
        (this.$route.params.pk &&
          storageForm.time <
            new Date(this.formData.main["A0009"]?.value).getTime())
      ) {
        this.delFormStorage();
        return;
      }
      this.formData = storageForm.formData;
    },
    delFormStorage() {
      if (!this.$route.params.pk) {
        let draftForm = dsf.util.loadLocalStore("editForms") || {};
        delete draftForm[`${this.moduleId}_${this.formParams.formId}`];
        dsf.util.saveToLocalStore("draftForm", draftForm);
      } else {
        let editForms = dsf.util.loadLocalStore("editForms") || [];
        if (this.editFormIndex != -1) {
          editForms.splice(this.editFormIndex, 1);
        }
        dsf.util.saveToLocalStore("editForms", editForms);
      }
    },
    importButtonHandle() {
      import(/* webpackChunkName: 'buttonHandle' */ "./buttonHandle").then(res => {
        this.buttonHandle = res.default
        // 项目特殊按钮动态引入
        let projectButtonHandle = {}
        import(/* webpackChunkName: 'buttonHandle' */ `./buttonHandleMixin/${dsf.config.projectName}.js`).then((module) => {
          console.log(module);
          projectButtonHandle = module.default
          Object.assign(this.buttonHandle, projectButtonHandle)
        }).catch((err) => {
          console.log('无项目按钮方法')
        })
      })
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(from);
      if (from.name != "commonList") {
        vm.isFromList = false;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.dividerStyle) this.$el.removeChild(this.dividerStyle);
    specialJS.leaveHandle(this.formData, this.formMeta, this, {
      to,
      from,
      next,
    });
    sessionStorage.removeItem("checkedMettingRoom");
    sessionStorage.removeItem("checkedMettingStime");
    this.$bus.off("selectUserBus");
    this.$bus.off("selectDateTime");
    this.$bus.off("checkVal");
    this.$bus.off("showCheckBox");
    this.$bus.off("subFormAdd");
    this.$bus.off("comboxChangeCode");
    next();
  },
};
</script>

<style lang="scss" scoped>
.van-skeleton {
  padding: 20px !important;

  &__avatar,
  &__title,
  &__row {
    background-color: #e0e0e0;
  }
}

.wrap {
  width: 100%;
  height: 100%;
}

.footer {
  position: fixed;
  bottom: 0;
  height: 1.2rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-top: 1px solid #f1f1f1;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);
}

.footer-other {
  position: fixed;
  bottom: 0;
  height: auto;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-top: 1px solid #f1f1f1;
  padding: 0 10px;
  box-sizing: border-box;
  box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.08);
}

.commonForm {
  width: 100%;
  height: 100%;
  // display: flex;
  // overflow-y: auto;
  // flex-direction: column;
}

.formLayout {
  // flex: 1;
  // overflow-y: auto;
}

.formBox {
  flex: 1;
  overflow-y: auto;
}
</style>

<style lang="scss">
.tabs-Form {
  height: 100%;
  display: flex;
  flex-direction: column;

  > .van-tabs {
    height: 1px;
    flex: 1;
    display: flex;
    flex-direction: column;

    .van-tabs__content {
      flex: 1;
      overflow-y: auto;
    }
  }

  .commonFormBox {
    height: 100%;
  }
}
</style>

<style lang="scss">
.commonFormDiv {
  .van-tabs__content {
    .van-tab__pane {
      border: 1px solid transparent;
      height: 100%;
    }
  }

  .van-tabs__wrap {
    width: 100%;
    background: white;
    position: relative;
    z-index: 999;
  }

  .formLayout {
    .van-field {
      font-size: var(--font_size_2);

      &__right-icon {
        .iconfont {
          font-size: 21px;
          color: #666;
        }
      }
    }
  }

  // .van-tabs__content{
  //   padding-top:44px;
  // }
}

.radioBox {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > i {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > span {
    font-size: 18px;
    color: #00bf53;
    text-align: center;
    margin-top: 10px;
    font-weight: bold;
  }

  & > .van-button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
