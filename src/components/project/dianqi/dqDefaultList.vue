<template>
  <!--  -->
  <div class="ds-signinlist" :class="{ scrollBox: showCheck }" ref="container">
    <van-sticky
      :container="stickyContainer"
      :offset-top="oppsetTop ? oppsetTop : isShowAppHeader ? '0.92rem' : '0'"
      v-if="isShowSearchBox || showTable"
    >
      <van-search
        v-model="keyword"
        sticky
        placeholder="搜索"
        @input="onSearch"
        :clearable="false"
      >
        <template #left-icon>
          <i class="iconfont iconsousuo1"></i>
        </template>
        <template #right-icon v-if="keyword">
          <span
            @click="
              keyword = '';
              onSearch();
            "
            >取消</span
          >
        </template>
      </van-search>
      <div
        class="resultTip"
        v-if="resultContent.length"
        v-html="resultContent"
      ></div>
      <DsfListTable
        v-if="showTable"
        :columns="showTable.showColumn"
        :data="showTable.datas"
        :showDefault="showDefault"
      >
      </DsfListTable>
      <van-dropdown-menu class="filterMenu">
        <van-dropdown-item
          v-model="filterVal.gw"
          :options="dbOption.gw"
          @change="gwChange"
        />
        <van-dropdown-item
          v-model="filterVal.state"
          :options="dbOption.state"
          @change="stateChange"
        />
        <van-dropdown-item
          v-model="filterVal.time"
          title="排序"
          :options="dbOption.time"
          @change="timeChange"
        >
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>

    <!--   -->
    <!-- <template v-if="justShowCard">
      <van-loading v-if="loading" size="24px" style="text-align: center;">加载中...</van-loading>
      <DsList v-else ref="dslist" :data="data" :spHandleJs="spHandleJS" :listId="listId" :listmoduleId="moduleId"
        :checkType="checkTypePop || checkType" :params="params && params.params ? params.params : {}"
        :tabsPage="tabsPage" :clickTabIndex="clickTabIndex" :routeKey="routeKey" :columns="columns"
        :showCheck="showCheck" :mobileStyle="mobileStyle" :keyColumn="keyColumn" @checkClick="checkClick"
        @mainClick="handleActionClick" @commonClick="handleActionClick" :showSubTitle="showSubTitle"
        :checkIds="checkIds" :link-to="linkTo" :noGreenIcon="params.hideReadStatus" :justShowCard="justShowCard" :showTips="showTips" />
    </template> -->
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        :finished="finished"
        :finished-text="finishedTips"
        v-model="loading"
        @load="onLoad"
        offset="100"
      >
        <DsList
          ref="dslist"
          :data="data"
          :spHandleJs="spHandleJS"
          :listId="listId"
          :listmoduleId="moduleId"
          :checkType="checkTypePop || checkType"
          :params="params && params.params ? params.params : {}"
          :tabsPage="tabsPage"
          :clickTabIndex="clickTabIndex"
          :routeKey="routeKey"
          :columns="columns"
          :showCheck="showCheck"
          :mobileStyle="mobileStyle"
          :keyColumn="keyColumn"
          @checkClick="checkClick"
          @mainClick="handleActionClick"
          @commonClick="handleActionClick"
          :showSubTitle="showSubTitle"
          :checkIds="checkIds"
          :link-to="linkTo"
          :showTips="showTips"
        />
      </van-list>
    </van-pull-refresh>

    <!--分阅弹窗-->
    <separate-read v-if="showFyyj" ref="readPop" />
    <!-- 搜索弹窗 -->
    <van-action-sheet
      v-model="show"
      class="searchSheet"
      position="bottom"
      round
    >
      <van-nav-bar
        title="筛选"
        @click-left="show = !show"
        @click-right="show = !show"
      />
      <div class="sheetBox flex1" v-if="showAllSearch">
        <component
          v-for="(item, index) in controlData"
          :key="index"
          :meta-data="item"
          :is="item.control"
        >
        </component>
      </div>
      <div class="sheetBox flex1" v-else>
        <component
          v-for="(item, index) in controlSelect"
          :key="index"
          :meta-data="item"
          :is="item.control"
        >
        </component>
      </div>
      <div class="arrowBtn" v-if="controlData && controlData.length > 2">
        <span @click="showAllSearch = !showAllSearch">{{
          showAllSearch ? "收起" : "展开"
        }}</span>
      </div>
      <div class="btnBox disfr jsb searchBox">
        <!-- <van-button type="default" @click="show = !show">取消</van-button> -->
        <van-button class="flex1" @click="returnFilter">重置</van-button>
        <van-button class="flex1" type="info" @click="search">确定</van-button>
      </div>
    </van-action-sheet>
    <van-action-sheet
      v-model="showPicker"
      title="选项"
      class="selectSearch"
      style="height: 500px"
    >
      <van-checkbox
        v-model="item.checked"
        v-for="(item, index) in selectColumns"
        :key="index"
        >{{ item.value }}
      </van-checkbox>
    </van-action-sheet>
    <van-popup
      :style="{ height: '100%' }"
      v-model="showPerson"
      :close-on-click-overlay="true"
      lock-scroll
      position="bottom"
    >
      <control-user-list
        :extra="extra"
        :selectType="selectType"
        @close="cancePerson"
        @getSelectUser="getSelectUser"
      ></control-user-list>
    </van-popup>
    <dsf-fab
      v-if="
        !isHideListButton &&
        ((listButtons &&
          listButtons.mainButtons &&
          listButtons.mainButtons.length) ||
          showAddForm) &&
        !showCheck &&
        !dsf.config.commonList.isFooterBtnShow
      "
      :fab-items="listButtons.mainButtons"
      title-key="name"
      @clickItem="btnAction"
    >
    </dsf-fab>
    <div
      v-if="
        !isHideListButton &&
        ((listButtons &&
          listButtons.mainButtons &&
          listButtons.mainButtons.length) ||
          showAddForm) &&
        !showCheck &&
        dsf.config.commonList.isFooterBtnShow
      "
      style="height: 1.2rem"
      class="footer-list"
    >
      <div class="footer">
        <DsfButtonToolbox
          :buttons="listMainButtons || {}"
          :is-form-btn="true"
          :is-list-btn="true"
          :more="true"
          size="small"
          @listBtnClick="btnAction"
        />
      </div>
    </div>
    <van-popup
      v-model="dateShow"
      position="bottom"
      round
      get-container="#app"
      :style="{ height: '500px' }"
    >
      <van-calendar
        :poppable="false"
        type="range"
        @confirm="confirmDate"
        color="rgb(25, 137, 250)"
        first-day-of-week="1"
      />
    </van-popup>
    <van-popup
      v-model="showGuanli"
      position="bottom"
      :style="{ height: '90%' }"
      round
    >
      <DefaultList ref="subListfawen" :params="fawenParam"></DefaultList>
    </van-popup>
    <van-popup
      v-model="showshuwen"
      position="bottom"
      :style="{ height: '90%' }"
      round
    >
      <DefaultList :params="shouwenParam"></DefaultList>
    </van-popup>
    <!-- commonList中通用的弹出选择层 commonPop，该层的参数可以在列表的特殊JS中指定 -->
    <van-popup
      v-model="commonPop"
      position="bottom"
      :style="{ height: '100%' }"
      :get-container="'#app'"
    >
      <DefaultList
        :params="commonPopParam"
        :noLoadJs="true"
        :checkTypePop="checkType"
        :checkable="true"
        oppsetTop="0px"
        @cancelCheck="commonPop = false"
        @confirmCheck="commonPopChoose"
      ></DefaultList>
    </van-popup>
    <van-popup
      :get-container="getContainer"
      ref="sendPop"
      v-model="showFlowSend"
      lock-scroll
      style="height: 90vh"
      position="bottom"
      round
      @close="closeSendFilePopup"
    >
      <sendFile
        v-show="showFlowSend"
        ref="sendFile"
        :form-data="selected"
        @change="handleFlowSendChange"
        @close="closeSendFile"
      />
    </van-popup>
    <van-popup
      :get-container="getContainer"
      v-model="showFlowBack"
      :close-on-click-overlay="false"
      lock-scroll
      position="bottom"
      round
    >
      <work-flow-dialog
        ref="wfDialog"
        :form-data="selected"
        @change="handleFlowBackChange"
        @close="showFlowBack = false"
      />
    </van-popup>
    <van-popup
      :get-container="getContainer"
      v-model="showChatUser"
      :close-on-click-overlay="false"
      lock-scroll
      position="bottom"
      style="height: 100vh"
    >
      <test-chat-user-dialog ref="chatDialog" @close="showChatUser = false" />
    </van-popup>
    <check-box-dialog ref="ckDialog"></check-box-dialog>
    <!--报名弹窗-->
    <sign-file ref="signFile" />
    <!--报名弹窗-->
    <sign-file-person ref="signFilePerson" />
    <!-- 提醒弹窗 -->
    <remind-dialog ref="remindDialog" />
    <van-uploader
      ref="uploader"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .zip"
    >
      <van-icon size="0rem" name="add-o" />
    </van-uploader>
    <!-- 选择收藏目录 -->
    <chooseFolder
      v-if="showChooseFolder"
      :show.sync="showChooseFolder"
      type="focus"
      @confirmChoose="confirmFocus"
    >
    </chooseFolder>

    <!-- 文本框Dialog -->
    <rejectDialog ref="rejectDialog"></rejectDialog>
    <commonDialog
      v-show="componentName != ''"
      ref="commonDialog"
      :is-from-list="true"
      :list-data="chooseItem"
      :componentName="componentName"
      @closeCallback="closeCallback(arguments)"
      @refreshList="onRefresh"
    ></commonDialog>
    <!-- 待办设置选择 -->
    <van-dialog
      v-model="showActionTypeDialog"
      cancelButtonColor="#666"
      confirmButtonText="保存设置"
      cancelButtonText="关闭"
      title="待办设置"
      show-cancel-button
      @confirm="setActionType"
    >
      <div class="radioBox">
        <van-radio-group v-model="actionType">
          <van-cell-group>
            <van-cell
              title="待办处理后直接关闭"
              clickable
              @click="actionType = '0'"
            >
              <template #right-icon>
                <van-radio name="0" />
              </template>
            </van-cell>
            <van-cell
              title="待办处理后返回列表"
              clickable
              @click="actionType = '1'"
            >
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell
              title="待办处理后连续办理"
              clickable
              @click="actionType = '2'"
            >
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell
              title="待办处理后提示操作"
              clickable
              @click="actionType = '3'"
            >
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// 节流
const throttle = (fn, delay) => {
  let timeout = null;
  return function () {
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(this, args);
      }, delay);
    }
  };
};
import { mapState } from "vuex";
import DsfListTable from "@/components/documentCenter/DsfListTable";
import dsfFab from "@/components/dsfFab/dsfFab";
import DsList from "@/components/documentCenter/commonDsList";
import urlJs from "@/common/url";
import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";
import SeparateRead from "@/components/selectPerson/SeparateRead";
import controlUserList from "@/components/commonForm/controls/controlUserList";
import allComps from "@/components/documentCenter/searchControl";
import listUrl from "@/components/documentCenter/listUrl";
import sendFile from "@/components/sendFlow/sendFile";
import signFile from "@/components/todoFile/signFile";
import signFilePerson from "@/components/todoFile/signFilePerson";
import workFlowDialog from "@/components/dialog/WorkFlowDialog.vue";
import testChatUserDialog from "@/components/dialog/testChatUserDialog.vue";
import checkBoxDialog from "@/components/dialog/checkBoxDialog.vue";
import store from "@/common/util";
import RemindDialog from "@/components/dialog/remindDialog.vue";
import MeetingDialog from "@/components/dialog/meetingDialog.vue";
import specialJS from "@/components/documentCenter/listSpecialJS";
import oaScoketJs from "@/common/oaScoket";
import chooseFolder from "@/components/myFavorite/chooseFolder";
import rejectDialog from "@/components/dialog/rejectDialog.vue";
import chatJS from "@/common/chat";
// import DefaultList from "@/components/documentCenter/DefaultList"
// import fab from "vue-fab/src/FAB";
import DsfButtonToolbox from "@/components/documentCenter/DsfButtonToolbox";
import commonDialog from "@/components/commonForm/tabComponents/commonDialog.vue";
export default {
  name: "dqDefaultList",
  props: [
    "params",
    "tabsPage",
    "clickTabIndex",
    "routeKey",
    "filterData",
    "oppsetTop",
    "ifshowSubtitle",
    "mainKeyWord",
    "currentTabs",
    "checkTypePop",
    "checkable", // 是否可选
    "checkIds", // 已选id数组
    "noLoadJs", // 指定不加载特殊js
    "fideFilterIcon",
  ],
  components: {
    chooseFolder,
    DsfListTable,
    RemindDialog,
    dsfFab,
    DsList,
    SeparateRead,
    // fab,
    controlUserList,
    sendFile,
    signFile,
    signFilePerson,
    workFlowDialog,
    testChatUserDialog,
    checkBoxDialog,
    MeetingDialog,
    ...allComps,
    rejectDialog,
    DsfButtonToolbox,
    commonDialog,
  },
  mixins: [ButtonActions],
  data() {
    return {
      showChatUser: false,
      data: [],
      columns: [],
      total: 0,
      keyword: "",
      finished: false,
      loading: false,
      isLoading: false,
      finishedTips: "",
      start: 1,
      listButtons: {},
      listMainButtons: {},
      mobileStyle: "",
      showFyyj: false,
      show: false,
      searchValue: "",
      dateShow: false, //日期显示
      nowDate: new Date(),
      startDate: "",
      endDate: "",
      keyColumn: "",
      listId: "", //列表ID
      moduleId: "", //模块ID
      fabActions: [
        {
          name: "nigao",
          icon: "assignment",
        },
      ],
      searchNum: null,
      startNum: null,
      endNum: null,
      selectSearch: [],
      selectColumns: [],
      showPicker: false,
      showPerson: false,
      personSelectData: [],
      searchControl: null,
      controlData: [],
      paramsData: {},
      paramsurl: "",
      fileType: "",
      showCheck: this.checkable ? true : false,
      checkType: "checkBox", //选择方式
      checkList: [], //选择的数据
      showAddForm: false,
      showGuanli: false,
      showshuwen: false,
      fawenParam: {
        listId: "200825111437UUosjRPYHA9Y3gLB2oY",
        moduleId: "200728141526dyUYy0i2t8NwtcrPa4M",
      },
      shouwenParam: {
        listId: "200825111607SNIrEIcrGIIaWU3NXTp",
        moduleId: "200728141559booPpy5mtXNKXGWy1ya",
      },
      commonPop: false, //通用选择层，配合列表js实现选择功能  2021年11月12日22:34:24   ly
      commonPopParam: {},
      stickyContainer: null,
      isTransfer: false,
      extra: {},
      showSubTitle: false,
      docTitle: "",
      isFirst: 1,
      showFlowSend: false,
      selected: {},
      showFlowBack: false,
      tab: "gw",
      isShowSearchBox: false,
      relaMode: 1, // 关联文件模式
      transferType: "", // 转办按钮类型
      distribIds: "",
      linkTo: null, // 点击列表项特殊跳转
      showTable: null, // 列表头部表格
      showDefault: null,
      specialJS: specialJS,
      spHandleJS: null,
      oaScoket: {},
      currentBtn: null,
      showChooseFolder: false,
      chooseItem: null, // 操作对象
      confirmCheckFuc: null, //多选数据以后确定按钮调用的特殊JS方法
      dsfBtnAction: "",
      isSearch: false,
      resultContent: "", //当前列表检索后显示结果内容
      isAsync: dsf.config.commonForm.isSelectProcessAsync, //发送流程是否异步
      chatJS: chatJS,
      listInterface: "", // 列表接口
      listInferenceParams: {}, // 接口参数
      listJsonData: null, // 当前fileType对应的listJson配置
      selectType: "0", //选人控件传值
      actionType: 1, // 0 直接关闭 1返回列表 2 连续办理 3 待办处理后提示操作
      showActionTypeDialog: false,
      showSetting: false,
      showTips: false,
      showAllSearch: false,
      componentName: "",
      filterVal: {
        gw: "0",
        state:
          "fn/list/210129200739xulGB8Dp4Grx0L7U411/mobile/q?moduleId=200604181624TgyhRFd9z8kt5NCPcLQ",
        time: 0,
      },
      dbOption: {
        gw: [],
        state: [
          {
            text: "进行中",
            value:
              "fn/list/210129200739xulGB8Dp4Grx0L7U411/mobile/q?moduleId=200604181624TgyhRFd9z8kt5NCPcLQ",
            icon: "static/images/project/dianqi/jxz.png",
          },
          {
            text: "已完成",
            value:
              "fn/list/230608171100RmZvF1SlQE0q1cVktDE/mobile/q?moduleId=201130103804O4Z0YaTT1pOpjQEhxPp",
            icon: "static/images/project/dianqi/ywc.png",
          },
        ],
        time: [
          { text: "创建时间近到远", value: "desc" },
          { text: "创建时间远到近", value: "asc" },
        ],
      },
    };
  },
  watch: {
    "params.params.fileType": {
      // fileType类型改变刷新数据
      handler(n, o) {
        if (n != o) {
          this.init();
          this.onRefresh();
        }
      },
    },
    "params.params.showSearch": {
      // 默认直接显示检索弹层
      handler(val) {
        this.show = val;
      },
      immediate: true,
    },
    filterData: {
      //监听通用列表包裹页
      deep: true,
      handler(val) {
        Object.assign(this.listInferenceParams, val);
        this.onRefresh();
      },
    },
    mainKeyWord(newvalue, oldvalue) {
      this.keyword = newvalue;
      this.onRefresh();
    },
    clickTabIndex(val) {
      if (val == this.currentTabs) {
        this.checkList = [];
        this.onRefresh();
      }
    },
    "params.fileRelaId"(newvalue, oldvalue) {
      // 关联类型改变刷新数据
      if (newvalue != 0) {
        this.onRefresh();
      }
    },
  },
  async created() {
    dsf.http.get("fn/unifyTodo/todoTabs").then((res) => {
      if (res.data.code == "200") {
        this.dbOption.gw = res.data.data;
      }
    });
    if (this.$route.query.keyword) {
      this.keyword = this.$route.query.keyword;
    }
    if (this.mainKeyWord) {
      this.keyword = this.mainKeyWord;
    }
    //加载列表的特殊JS
    let Lid =
      this.listId ||
      this.$route.params.listId ||
      this.$route.query.fileType ||
      this.params.listId ||
      this.params?.params?.fileType;
    if (!this.noLoadJs) {
      await this.specialJS.init(Lid, () => {
        this.spHandleJS = dsf.util.deepCopy(this.specialJS.spHandleJS);
        this.spHandleJS?.init?.(this);
      });
    }
    if (this.isAsync == undefined) {
      this.isAsync = false;
      console.log("当前节点为同步");
    }
  },
  deactivated() {
    let arr = [
      "dsfIframe",
      "commonForm",
      "commontabs",
      "jiangsuyancaoNewsDetail",
      "FeedBack",
      "supervise",
      "RejectedSign",
      "InspectorCondition",
      "superviseAccept",
      "superviseIdea",
      "announcementStatus",
      "TabCommonForm",
      "addTask",
      "filePreview",
    ];
    if (!arr.some((item) => item == this.$route.name)) {
      //this.$destroy();
      this.$deleteCache(this);
      this.$eventBus.Off(this, "refresh");
      // this.$eventBus.Off(this, "listSend");
    }
  },
  mounted() {
    let self = this;
    this.$eventBus.onRefresh(this, () => {
      this.onRefresh();
    });
    // this.$eventBus.onListSend(this, (data) => {
    //   console.log(data)
    //   self.showFlowSend = true;
    //   self.$nextTick(() => {
    //     self.$refs.sendFile.show('isList');
    //   })
    //   self.selected = data;
    // });

    this.stickyContainer = this.$refs.container;
    if (
      !this.$route.meta.keepAlive ||
      this.$router.history.current.name == "commontabs" ||
      this.params ||
      this.$route.query.LMTYPE ||
      this.keyword
    ) {
      this.init();
    }
    if (
      this.$route.query.openSocket == 1 ||
      this.params?.params?.openSocket == 1
    ) {
      oaScoketJs.close();
      this.oaScoket = oaScoketJs.getInstance(this);
      this.oaScoket.onReceivedTodo(
        store.loadSessionStore("user").user_id,
        (data) => {
          self.onRefresh(true);
        }
      );
    }
    if (this.justShowCard) {
      // 仅显示固定数量时无van-list组件，需手动调接口加载数据
      this.loading = true;
      this.onLoad();
    }

    if (dsf.util.loadLocalStore("actionType")) {
      this.actionType = dsf.util.loadLocalStore("actionType");
    } else {
      dsf.util.saveToLocalStore("actionType", "1");
      this.actionType = "1";
    }

    if (
      this.$route.query.fileType &&
      this.$route.query.fileType == "gw" &&
      dsf.config.commonForm.showFormSetting
    ) {
      this.showSetting = true;
    }
  },
  activated() {
    let self = this;
    if (this.$route.meta.keepAlive) {
      if (!this.params) this.setTitle();
      this.init();
    }
  },
  methods: {
    gwChange(val) {
      this.paramsData.tabType = val;

      this.onRefresh();
    },
    stateChange(val) {
      this.listInterface = val;
      let listId = val.split("/")[2];
      this.listId = listId;
      this.moduleId = val.split("=")[1];

      if (this.paramsData.sort ) {
        if( this.filterVal.state ==
          "fn/list/230608171100RmZvF1SlQE0q1cVktDE/mobile/q?moduleId=201130103804O4Z0YaTT1pOpjQEhxPp")
        this.paramsData.sort = "S-UNIFY-TASK-DONE-0010";
        else  this.paramsData.sort = "S-UNIFY-TASK-00025";
      }

      this.onRefresh();
      //重新初始化特殊js
      this.$refs.dslist.readStatusKey='',
      this.$refs.dslist.haveReadVal='',
      this.specialJS.init(listId, () => {
        this.spHandleJS = dsf.util.deepCopy(this.specialJS.spHandleJS);
        this.spHandleJS?.init?.(this);
      });
    },
    timeChange(val) {
      this.paramsData.order = val;
      this.paramsData.sort = "S-UNIFY-TASK-00025";
      if (
        this.filterVal.state ==
        "fn/list/230608171100RmZvF1SlQE0q1cVktDE/mobile/q?moduleId=201130103804O4Z0YaTT1pOpjQEhxPp"
      ) {
        this.paramsData.sort = "S-UNIFY-TASK-DONE-0010";
      }
      this.onRefresh();
    },
    goBack() {
      this.$emit("cancelCheck");
    },
    //用户设置待办处理后的连续操作的选择
    showActionSelect() {
      this.showActionTypeDialog = true;
    },
    setActionType() {
      console.log(this.actionType);
      this.showActionTypeDialog = false;
      dsf.util.saveToLocalStore("actionType", this.actionType);
    },
    //通用层选择完数据确定回调函数
    commonPopChoose(checkItems) {
      if (this.spHandleJS["choose"]) {
        this.spHandleJS["choose"](checkItems, this);
      } else {
        dsf.layer.toast("当前列表未定义接收函数！");
      }
    },
    getContainer() {
      return document.body;
    },
    handleFlowSendChange() {
      this.showFlowSend = false;
      this.onRefresh();
    },
    handleFlowBackChange() {
      this.showFlowBack = false;
      this.onRefresh();
    },
    closeSendFile() {
      this.showFlowSend = false;
    },
    setTitle() {
      //修改钉钉的内置浏览器title
      urlJs.setTitle(this.docTitle);
    },
    init() {
      if (this.$route.query && this.$route.query.listType) {
        this.docTitle = document.title = this.$route.query.listType;
      }
      if (this.ifshowSubtitle || this.$route.query.ifshowSubtitle) {
        //展示二级标题的标题名 作为组件使用列表prop传参或直接访问通用列表路径传参
        this.showSubTitle = true;
      }

      this.listId = this.params?.listId || this.$route.params.listId;
      this.listId = this.filterVal.state.split("/")[2];

      this.moduleId = this.params?.moduleId || this.$route.params.moduleId;
      this.moduleId = this.filterVal.state.split("=")[1];
      // 获取listJson特殊列表配置对象
      if (this.$route.query.fileType || this.params?.params?.fileType) {
        //query路由 非通用列表模式
        this.fileType =
          this.$route.query.fileType || this.params?.params?.fileType;
        let listSetting = [...dsf.config.listJson, ...listUrl];
        this.listJsonData = listSetting.filter(
          (item) => item.fileType == this.fileType
        )[0];
        if (this.listJsonData?.linkTo) this.linkTo = this.listJsonData.linkTo;
      }
      this.getListInference();
      this.getListInferenceParams();
    },
    // 获取列表接口参数: listInferenceParams
    getListInferenceParams() {
      // 接口参数来源：1、url传参、2、组件传参filterData，3、tab嵌入通用列表传参params.params，4、listJson特殊列表传参
      // 需要从$route.query中取出传入接口中的参数 (主要用于旧功能兼容，新的参数均传到 $route.query.secQuery字符串对象中，不要再直接扩展到url中)
      let queryToParamsKeys = ["moduleIds", "excludeModuleIds", "sourceId"];
      queryToParamsKeys.forEach((key) => {
        if (this.$route.query[key]) {
          this.listInferenceParams[key] = this.$route.query[key];
        }
      });
      // url中secQuery字符串对象传参
      if (this.$route.query.secQuery) {
        let secQuery = JSON.parse(this.$route.query.secQuery);
        Object.assign(this.listInferenceParams, secQuery);
      }
      // 组件传参filterData
      if (this.filterData) {
        //通用列表包裹页请求过滤参数
        Object.assign(this.listInferenceParams, this.filterData);
      }
      // tab嵌配置列表
      if (this.params && this.params.params) {
        Object.assign(this.listInferenceParams, this.params.params);
      }
      // listJson特殊列表
      if (this.fileType) {
        Object.assign(this.listInferenceParams, this.listJsonData.params);
      }
      //如果是空对象就不格式化了
      if (Object.keys(this.listInferenceParams).length !== 0) {
        // 最后进行【】参数替换
        this.listInferenceParams = JSON.parse(
          store.getReplaceUrl(JSON.stringify(this.listInferenceParams)) || {}
        );
      }
    },
    // 获取列表接口地址：listInference
    getListInference() {
      if (this.fileType) {
        // config.json配置listJson列表
        this.listInterface = store.getReplaceUrl(this.listJsonData.url);
      } else if (this.params?.fileRelaId) {
        // 关联文件列表
        this.listInterface = `fn/filerelation/select/mobileData?moduleId=${this.params.moduleId}&infoId=${this.params.infoId}&fileRelaId=${this.params.fileRelaId}`;
      } else {
        // 通用列表接口
        this.listInterface = `fn/list/${this.listId}/mobile/q?moduleId=${this.moduleId}`;
        if (this.$route.query.LMTYPE) {
          this.listInterface += "&LMTYPE=" + this.$route.query.LMTYPE;
          this.listInterface += "&listId=" + this.listId;
        }
      }
    },
    onSearch: throttle(function () {
      this.onRefresh();
    }, 500),
    goForm(btn) {
      if (
        this.$route.name == "commonList" ||
        this.$route.name == "commonForm" ||
        this.$route.name == "commonListWrap" ||
        (this.$route.name == "commontabs" && this.moduleId)
      ) {
        let moduleId = this.moduleId;
        if (
          btn.parameters &&
          btn.parameters.find((item) => item.key == "mids" && item.value)
        ) {
          // 按钮配置了需要跳转到的模块id
          moduleId = btn.parameters.find((item) => item.key == "mids").value;
        }
        this.$router.push({
          path: "/commonForm/" + moduleId,
        });
      } else {
        this.$router.push({
          path:
            "/TabCommonForm/" +
            this.routeKey +
            "/" +
            this.clickTabIndex +
            "/" +
            (this.tabsPage ? this.params.params.moduleId : this.moduleId),
        });
      }
    },
    createRow(btn) {
      this.goForm(btn);
    },
    async fetchData(isFirst) {
      let url = this.listInterface;
      let params = {
        limit: 15,
        _content: this.keyword,
        key: this.keyword,
        page: this.start,
        ...this.listInferenceParams, // 默认参数
        ...this.paramsData, // 检索条件参数
      };

      // if (this.$route.query.tripQuery) {
      //   //邓新奇 特殊通用列表
      //   if (this.$route.query.tripQuery == "fbcc") {
      //     let tripdata = await dsf.http.get("fn/report/getListinit?type=0");
      //     this.paramsurl += `&fbcc=${tripdata.data.data.fbcc}`;
      //   }
      //   if (this.$route.query.tripQuery == "dlqy") {
      //     let tripdata = await dsf.http.get("fn/report/getListinit?type=10");
      //     this.paramsurl += `&dlqy=${tripdata.data.data.dlqy}`;
      //     this.paramsurl += `&dlqys=${tripdata.data.data.dlqys}`;
      //   }
      // }

      //总监说isFirst=1只有第一次加载时调用，其他情况，就去掉了这个参数；
      if (this.isFirst) {
        params.isFirst = "1";
      }

      //如果是通用列表接口（通用分页参数是page和limit）  则不加start参数，因为这个参数在特殊接口中有使用 2022年1月5日11:42:34 @ly
      if (!(url.indexOf("fn/list") > -1)) {
        params.start = this.start;
      }

      this.$store.commit("setSearchParam", params);

      dsf.http
        .post(url, params)
        .then(({ status, data }) => {
          // if(this.start == 1){
          //    document.documentElement.scrollTop = 0
          // }

          if (isFirst) {
            this.data = [];
          }

          if (data.filter && data.filter.length) {
            this.isShowSearchBox = true;
            let allCompsName = Object.keys(allComps);
            this.controlData = data.filter = data.filter.filter((item) => {
              return allCompsName.filter(
                (itm) => item.control == itm.split("_")[1]
              ).length;
            });
            this.controlData.forEach((item) => {
              item.control = `search_${item.control}`;
              item.value = "";
            });
            if (!this.isSearch && this.isFirst) {
              // 第一次调用接口且未高级检索过，将检索默认值作为参数传入接口
              this.controlData.forEach((item) => {
                if (item.defaultValue)
                  this.paramsData[
                    `${item.metaData.indexOf("query_") > -1 ? "" : "query_"}${
                      item.metaData
                    }`
                  ] = item.defaultValue;
              });
            }
          }
          if (this.params?.params?.showSearchBox != undefined)
            this.isShowSearchBox = this.params.params.showSearchBox;
          const {
            showColumn,
            datas = [],
            keyColumn,
            total,
            listButtons,
            mobileStyle,
            showTable,
            showDefault,
          } = data;

          if (dsf.config.setting["SYS-MOBILE-LIST-0015"]) {
            let temp = JSON.parse(dsf.config.setting["SYS-MOBILE-LIST-0015"]);
            console.log(temp);
            if (temp.showListResult) {
              this.resultContent = temp.showContent;
              let regex = /\[(.+?)\]/g; // [] 中括号
              if (this.resultContent.match(regex)) {
                // 有匹配才替换[]中的参数
                this.resultContent.match(regex).forEach((element) => {
                  let key = element.replace("[", "").replace("]", "");
                  if (data.hasOwnProperty(key)) {
                    this.resultContent = this.resultContent.replace(
                      element,
                      data[key]
                    );
                  }
                });
              }
              if (temp.needHide) {
                setTimeout(() => {
                  this.resultContent = "";
                }, temp.hideTime);
              }
            }
          }

          if (this.fileType == "cuofa") {
            datas.forEach((item) => (item.dataValue = item.data));
          }
          if (data.relaMode) {
            // 关联类型
            this.relaMode = data.relaMode;
          }
          if (status === 200) {
            // 默认勾选
            if (datas.length && this.checkIds) {
              console.log(datas, this.checkIds);
              datas.forEach((item) => {
                for (let i = 0; i < this.checkIds.length; i++) {
                  if (this.checkIds[i] == item.dataValue.id) {
                    item.checked = true;
                    break;
                  }
                  if (i == this.checkIds.length - 1) {
                    item.checked = false;
                  }
                }
              });
            }
            this.docTitle = this.$route.query.title || data.title || "移动办公";
            if (!this.params) {
              // 作为组件时不设头部标题
              this.setTitle();
            }
            dsf.noRefreshTitle = false;

            /**
             * 列表按钮根据按钮配置的参数来控制是否显示
             */
            if (
              listButtons &&
              listButtons.mainButtons &&
              listButtons.mainButtons.length
            ) {
              listButtons.mainButtons = listButtons.mainButtons.filter(
                (item, index) => {
                  let isRet = false;
                  let showParam = item.parameters
                    ? item.parameters.find((item) => item.key == "isShow")
                    : {};
                  if (showParam && showParam.value && showParam.value.length) {
                    showParam = showParam.value;
                    let regex2 = /\[(.+?)\]/g; // [] 中括号
                    if (showParam.match(regex2)) {
                      // 有匹配才替换[]中的参数
                      showParam.match(regex2).forEach((element) => {
                        let key = element.replace("[", "").replace("]", "");
                        if (this.$route.query[key]) {
                          showParam = showParam.replace(
                            element,
                            this.$route.query[key]
                          );
                        }
                        //for循环替换commontabs里面配置的参数
                        for (let i in this.params.params) {
                          if (key.toString() == i.toString()) {
                            showParam = showParam.replace(
                              element,
                              this.params.params[key]
                            );
                          }
                        }
                      });
                    }
                    if (eval(showParam)) {
                      isRet = true;
                    }
                  } else {
                    isRet = true;
                  }
                  return isRet;
                }
              );
            }
            this.listButtons = listButtons || {};
            this.columns = showColumn || [];
            this.total = total || 0;
            if (this.spHandleJS != null && this.spHandleJS["dataFilter"]) {
              this.spHandleJS["dataFilter"](datas, this);
            }
            this.loading = false;
            this.start += 1;
            this.data = [...this.data, ...datas];
            this.mobileStyle = mobileStyle;
            this.showTable = showTable;
            this.showDefault = showDefault;
            this.keyColumn = keyColumn;
            if (
              this.listButtons.mainButtons &&
              this.listButtons.mainButtons.find(
                (item) => item.action == "allYueBi"
              )
            ) {
              datas.forEach((itemdata) => {
                this.distribIds += this.distribIds
                  ? `,${itemdata.dataValue.distribId}`
                  : itemdata.dataValue.distribId;
              });
            }
            this.listMainButtons = {
              mainButtons: this.listButtons.mainButtons,
            };

            if (
              datas == null ||
              this.data.length === total ||
              datas.length === 0 ||
              datas.length < 15
            ) {
              // 加载结束
              this.finished = true;
              if (this.data.length > 0) {
                this.finishedTips = "没有更多了";
              }
            }

            this.$emit("changeData", {
              total: total,
              params: this.params,
            });

            this.showTips = this.data.some((item) => {
              if (!item.buttons) return false;
              let combtn =
                item.buttons.commonButtons || item.buttons.commonButton;
              let mainbtn = item.buttons.mainButtons;
              return (
                (combtn && combtn.length > 0) || (mainbtn && mainbtn.length > 0)
              );
            });
            console.log(this.showTips);
            console.log(this.checkable);
          }
        })
        .catch(({ message }) => {
          this.finished = true;
        })
        .finally(() => {
          this.loading = false;
          this.isLoading = false;
          this.isFirst = 0;
        });
    },
    onLoad() {
      /**
       * 上拉加载
       */
      this.fetchData();
    },
    /**
     * 下拉刷新
     */
    onRefresh(isFist) {
      this.finishedTips = "";
      this.finished = false;
      this.loading = true;
      this.data = [];
      this.distribIds = "";
      this.start = 1;
      this.fetchData(isFist);
      if (this.currentTabs != undefined) {
        // 只要是内嵌defaultList，都刷新角标 2022年5月31日23:49:20 @老肖
        this.$eventBus.refreshBadge(this, this.currentTabs);
      }
    },
    handleActionClick() {
      this.chooseItem = arguments[1];
      const action = arguments[0];
      const fn = this[`action-${action}`];
      if (this.spHandleJS != null && this.spHandleJS[action]) {
        this.spHandleJS[action](arguments[1], this);
      } else if (fn) {
        fn(...Array.prototype.slice.call(arguments, 1));
      } else {
        dsf.layer.toast("当前按钮未定义：" + action, false);
      }
    },
    confirmDate(date) {
      let [start, end] = date;
      this.dateShow = !this.dateShow;
      this.startDate = dsf.date.format(start, "yyyy-mm-dd");
      this.endDate = dsf.date.format(end, "yyyy-mm-dd");
    },
    async search() {
      this.isSearch = true;
      this.selectSearch = this.selectColumns
        .filter((item) => item.checked)
        .map((item) => item.value);
      let paramsData = {};
      this.controlData.forEach((item, index) => {
        if (item.value && item.value != "") {
          paramsData[
            `${item.metaData.indexOf("query_") > -1 ? "" : "query_"}${
              item.metaData
            }`
          ] = item.value;
        }
      });
      this.paramsData = paramsData;
      this.onRefresh();
      this.show = false;
    },
    closePerson(item, index) {
      this.personSelectData.splice(index, 1);
      this.$refs.selectPerson.userClick(item);
    },
    showPersonModel() {
      this.showPerson = true;
    },
    getSelectUser(data) {
      this.personSelectData = data;
      this.extra = {};
      if (data.length > 0) {
        //去掉父节点，保留选中的子节点
        data.forEach((item, index) => {
          if (item.children && item.children.length > 0) {
            data.splice(index, 1);
          }
        });
        const ids = data.map((item) => item.id);
        let toast = {};
        if (this.isTransfer) {
          if (data.length > 1) {
            dsf.layer.toast("请选择一个人", true);
            return;
          }
          const user = dsf.util.loadSessionStore("user");
          const loading = dsf.layer.loading("取消中");
          const { dataValue } = this.selected;
          this.showPerson = false;
          if (this.transferType == "db") {
            // 督办转交
            dsf.changeUser.superviseChangeUser({
              param: {
                pk: dataValue.info_id || dataValue.id || dataValue["A0001"],
                userId: ids.join(","),
              },
              thenFun: () => this.onRefresh && this.onRefresh(),
              // finallyFun: () => dsf.layer.closeLoading(loading),
            });
          } else if (this.transferType == "gw") {
            // 公文转交
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
                this.onRefresh && this.onRefresh();
              },
              //finallyFun: () => dsf.layer.closeLoading(loading),
            });
          }
        }
      }
    },
    cancePerson() {
      this.showPerson = !this.showPerson;
    },
    closeSeclect(data) {
      this.selectColumns.forEach((item) => {
        item.value == data.value ? (item.checked = false) : "";
      });
    },
    controlFilter(name) {
      return this.controlData.filter((item) => item.name == name).length > 0;
    },
    returnFilter() {
      let data = JSON.parse(JSON.stringify(this.controlData));
      data.forEach((item) => {
        item.value = "";
      });
      this.controlData = data;
    },
    deleteRows() {
      this.showCheck = true;
    },
    /*扩展列表的通用操作按钮 支持配置接口，接口返回参数有格式要求，参考confirmCheck方法
        目前主要用于上海地产，后期其他项目也可以使用
        2022年3月26日16:57:55  @ly
        */
    operationRows(val) {
      console.log(val);
      let self = this;
      self.currentBtn = val;
      let isGo = false;
      if (self.currentBtn.parameters) {
        let temp = self.currentBtn.parameters.find(
          (item) => item.key == "needChoice"
        );
        if (temp && temp.value == "1") {
          isGo = true;
        }
      }
      if (isGo) {
        self.currentBtnFunc();
      } else {
        this.showCheck = true;
      }
    },
    sucDelete() {
      let deleteList = this.data.filter((itm) => itm.checked);
      this.data = this.data.filter((itm) => !itm.checked);
      console.log(deleteList);
      let obj = {
        metaKey: this.keyColumn,
        pk: "",
        moduleId: this.moduleId,
        formId: this.listId,
      };
      deleteList.forEach((item) => {
        obj.pk += item.dataValue[this.keyColumn] + ",";
      });
      obj.pk = obj.pk.substr(0, obj.pk.length - 1);
      console.log(obj);
      dsf.http.post(`fn/list/deleteRows`, obj).then(({ data }) => {
        console.log(data);
        if (data.code == "200") {
          this.dsf.layer.toast(data.message);
          this.showCheck = false;
        }
      });
    },
    faWenGuanLi() {
      this.showGuanli = !this.showGuanli;
    },
    shouWenGuanLi() {
      this.showshuwen = !this.showshuwen;
    },
    btnAction(val) {
      this.dsfBtnAction = val.action;
      if (this.spHandleJS != null && this.spHandleJS[val.action]) {
        this.spHandleJS[val.action](val, this);
      } else {
        this[val.action](val);
      }
    },
    showSearchAction() {
      if (!this.controlData.length) return;
      this.show = true;
    },
    cancelCheck() {
      this.checkList.forEach((element) => {
        element.checked = false;
      });
      this.checkList = [];
      this.currentBtn = null;
      console.log(this.checkable);
      if (this.params && this.checkable) {
        this.$emit("cancelCheck", false);
      } else {
        this.showCheck = !this.showCheck;
      }
    },
    exitClick() {
      this.$emit("cancelCheck", false);
    },
    currentBtnFunc(isCallBack = false) {
      let self = this;
      /*
                刷新列表 refreshList
                打开表单 openForm
                弹出提示  openTip
                弹出提示并打开表单 openTipAndOpenForm
                弹出提示并打开表单 openComfirmAndOpenForm
                {action:"refreshList",moduleId:"",pk:"",message:""}
                */
      if (this.currentBtn.parameters && this.currentBtn.parameters.length) {
        let operationUrl = this.currentBtn.parameters.find(
          (item) => item.key == "api"
        ).value;
        let operationData = {
          metaKey: this.keyColumn,
          pks: [],
          moduleId: this.moduleId,
          formId: this.listId,
          fid: this.$route.query.pk || this.$route.query.fid,
          method: this.$route.query.method,
        };
        this.checkList.forEach((element) => {
          operationData.pks.push(element.dataValue[this.keyColumn]);
        });
        dsf.http.post(operationUrl, operationData).then(({ data }) => {
          console.log(data);
          // if (data.code == "200") {
          switch (data.action) {
            case "refreshList":
              dsf.layer.toast(data.message, true, () => {
                self.onRefresh();
              });
              break;
            case "openForm":
              self.$router.push({
                path: `/commonForm/${data.moduleId}/${data.pk}`,
              });
              break;
            case "openTip":
              dsf.layer.toast(data.message, true);
              break;
            case "openTipAndOpenForm":
              dsf.layer.toast(data.message, true, () => {
                self.$router.push({
                  path: `/commonForm/${data.moduleId}/${data.pk}`,
                });
              });
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
          if (isCallBack) {
            self.cancelCheck();
          }
          // } else {
          //     dsf.layer.toast("系统异常，请稍后再试！");
          // }
        });
      } else {
        dsf.layer.toast("当前按钮未配置接口参数", false);
      }
    },
    //通用选择层 确定事件
    confirmCheck() {
      let self = this;
      let checkedListTemp = self.checkList.filter((itm) => itm.checked);
      if (!checkedListTemp.length) {
        dsf.layer.toast("请选择");
        return;
      }
      if (self.currentBtn) {
        self.currentBtnFunc(true);
      }
      // else if (self.confirmCheckFuc && typeof self.confirmCheckFuc=="function") {
      //     self.confirmCheckFuc(checkedListTemp,self)
      // }
      else {
        this.$emit("confirmCheck", checkedListTemp, this.relaMode);
        if (!this.noLoadJs)
          this.$eventBus.emitDefaultListCheck(this, checkedListTemp);
        this.checkList.forEach((element) => {
          element.checked = false;
        });
      }
    },
    //通用选择层验证单选还是多选函数
    checkClick(item) {
      let pkProp = item.dataValue["S-BASE-0001"] ? "S-BASE-0001" : "A0001"; //系统模块主键【S-BASE-0001】，业务模块主键【A0001】
      if (!this.checkList.length) {
        this.checkList.push(item);
      } else if (this.checkTypePop == "radio") {
        this.checkList.forEach((element) => {
          if (item.dataValue[pkProp] != element.dataValue[pkProp]) {
            element.checked = false;
          }
        });
        this.checkList = [];
        if (item.checked) {
          this.checkList.push(item);
        }
      } else {
        if (item.checked) {
          this.checkList.push(item);
        } else {
          this.checkList.splice(
            this.checkList.findIndex(
              (listitem) =>
                item.dataValue[pkProp] === listitem.dataValue[pkProp]
            ),
            1
          );
        }
      }
    },
    afterRead(file) {},
    confirmFocus(fid) {
      // 收藏到指定目录
      this.$toast.loading({
        forbidClick: true,
        message: "提交中",
      });
      dsf.http
        .post("/fn/mobileFocus/setFocus", {
          fid: fid,
          infoId:
            this.chooseItem.dataValue.fid ||
            this.chooseItem.dataValue.info_id ||
            this.chooseItem.dataValue.infoId ||
            this.chooseItem.dataValue["A0001"] ||
            this.chooseItem.dataValue.id ||
            this.chooseItem.dataValue["SW_XZD.A0001"] ||
            this.chooseItem.dataValue["G_INFOS.A0001"] ||
            this.chooseItem.dataValue["XZBYQ_0012.A0001"],
          "x-auth-token": dsf.util.loadSessionStore("loginToken"),
        })
        .then(({ data }) => {
          const { message, result, type } = data;
          if (type === "success" || result) {
            let arr = [
              ...(this.chooseItem.buttons.commonButtons ||
                this.chooseItem.buttons.commonButton),
              ...(this.chooseItem.buttons.mainButtons ||
                this.chooseItem.buttons.mainButton),
            ];
            let button = arr.find((btn) => btn.action == "guanZhu");
            if (button) {
              button.name = "已" + button.name;
              button.icon = "iconai-mark";
              button.action = "quXiaoGuanZhu";
            }
          }
          this.dsf.layer.toast("操作成功");
        })
        .catch(() => {
          this.$toast.clear();
        });
    },
    closeSendFilePopup() {
      this.$refs.sendFile.cancel();
    },
    closeCallback([data, actionName]) {
      this.componentName = "";
    },
  },
  computed: {
    justShowCard() {
      // 只显示固定数量的数据，不用下拉刷新和加载
      return !!this.params?.params?.justShowCard;
    },
    nowSeclect() {
      return this.selectColumns.filter((item) => item.checked);
    },
    ...mapState({
      isShowAppFooter: (state) => state.isShowAppFooter,
      isShowAppHeader: (state) => state.isShowAppHeader,
    }),
    isHideListButton() {
      return !!this.params?.params?.hideListButton;
    },
    controlSelect() {
      return this.controlData.length > 0 ? this.controlData.slice(0, 2) : [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.van-dialog__header {
  padding: 20px 0 !important;
}

.box {
  font-size: var(--font_size_3);
}

.scrollBox {
  padding-bottom: 60px;
}

.ds-signinlist {
  min-height: 100%;
  font-size: var(--font_size_0);

  ::v-deep .resultTip {
    @include font_7(true);
    // @include font-theme("button_auxiliary_bordercolor");
    @include background-theme("button_auxiliary_bgcolor");
    // text-align: center;
    // padding-left: 10px;
    padding-bottom: 10px;
  }

  ::v-deep .fab-cantainer {
    .vue-fab-material-icons {
      font-size: 26px !important;
    }
  }

  ::v-deep .fab-item-container {
    .vue-fab-material-icons {
      font-size: 18px !important;
    }
  }
  .filterMenu {
    ::v-deep .van-cell__left-icon {
      height: 0.48rem;
      font-size: 0.48rem;
      margin-right: 0.28rem;
    }
    ::v-deep .van-cell {
      font-size: var(--font_size_2);
    }
  }

  .disfr {
    display: flex;
  }

  .fc {
    display: flex;
    flex-direction: column;
  }

  .ac {
    align-items: center;
  }

  .jsb {
    justify-content: space-between;
  }

  .jc {
    justify-content: center;
  }

  .flex1 {
    flex: 1;
  }

  .sheetBox {
    padding: 15px;
    font-size: var(--font_size_3);

    .van-cell__value {
      height: 24px;
      background: #e5e5e5;
    }

    .dateRange {
      .line {
        width: 20px;
        height: 1px;
        background: #cecece;
        margin: 0 15px;
      }
    }
  }

  .arrowBtn {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: var(--font_size_2);
      @include font-theme("normal");
    }
  }

  .btnBox {
    padding: 15px;
  }

  .searchBox {
    padding: 10px;

    .van-button {
      margin: 0 5px;
      font-size: var(--font_size_2);
    }
  }

  .peopleSec {
    height: 36px;
    padding-left: 10px;
    background-color: rgb(235, 239, 245);
    border-radius: 5px;
    overflow-x: scroll;
    overflow-y: hidden;

    .secItem {
      padding: 4px 10px;
      margin: 0 4px;
      white-space: nowrap;
      background: white;
      border-radius: 18px;
    }
  }

  .utilBox {
    box-sizing: border-box;
    padding: 0 10px;
    background: #f8f8f8;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
    height: 1.2rem;
    align-items: center;

    button + button {
      margin-left: 10px;
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    height: 1.2rem;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-top: 1px solid #f1f1f1;
    padding: 0 10px;
    box-sizing: border-box;
    .btn {
      text-align: center;
      .van-icon {
        vertical-align: bottom;
      }
      span {
        font-size: var(--font_size_4);
        color: #999;
      }
    }
  }
}

.searchSheet {
  height: auto;

  .van-nav-bar {
    border-bottom: 5px solid #f1f2f4;
  }
}

::v-deep .van-action-sheet__content {
  display: flex;
  flex-direction: column;

  .van-cell::after {
    border: none;
  }
}

::v-deep .van-field__left-icon {
  display: flex;
  align-items: center;

  .van-icon-search {
    font-size: var(--font_size_0);
  }
}

::v-deep .fab {
  @include background-theme("normal", true);
  @include font_5;
  // background: #000!important;
}

.van-search__content {
  border-radius: 6px;
  // background-color: #ECEDEE;
  background-color: #f8f8f8;
}
</style>
