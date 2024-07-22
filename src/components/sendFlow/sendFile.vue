<template>
  <div v-show="showDialog" class="send-file">
    <van-nav-bar :title="popTitle" left-text="取消" @click-left="cancel">
      <template #right>
        <div class="flex ac" v-if="nodeNeedSignBtn">
          <van-button type="info" size="mini" @click="handleSign">{{
            isShowSignBtn ? "签名" : "取消签名"
          }}</van-button>
        </div>
      </template>
    </van-nav-bar>
    <div class="_content">
      <div v-if="userCurDeptName" class="ds_theme_font">
        所属部门：{{ userCurDeptName }}
      </div>
      <!-- 意见 -->
      <idealEdit
        ref="idealEdit"
        v-show="isShowOpinion"
        class="idealEdit"
        :isShowHandWrite="isShowHandWrite"
        rows="3"
        @handWrite="openWritePopup"
      >
        <template #opinionImg>
          <div class="handleWriteBox" v-if="isShowHandWrite">
            <div class="writeContent">
              <img
                v-if="imgUrl"
                :src="imgUrl"
                alt=""
                :style="{
                  width: dsf.config.commonFlow.opinionImgWidth || '50%',
                }"
              />
            </div>
          </div>
        </template>
      </idealEdit>
      <!-- 附言 -->
      <template v-if="isShowFuyan">
        <div class="fuyan">
          <van-field
            v-model="fuyan"
            label="附言填写："
            placeholder="请输入附言"
            type="textarea"
            autosize
            rows="1"
          >
            <template #right-icon>
              <img
                :src="
                  fuyanRadio == 0
                    ? 'static/images/platform/nextNode.png'
                    : 'static/images/platform/allNode.png'
                "
                alt=""
                style="width: 0.4rem"
                @click="fuyanRadio = fuyanRadio == 0 ? 1 : 0"
              />
            </template>
          </van-field>
          <van-radio-group
            v-model="fuyanRadio"
            direction="horizontal"
            icon-size="0.3rem"
          >
            <van-radio :name="0">仅下一环节可见</van-radio>
            <van-radio :name="1">所有环节可见</van-radio>
          </van-radio-group>
        </div>
      </template>
      <!-- 节点 -->
      <div class="_nodes">
        <div class="_nodes-top">
          <span class="ds_theme_font">您即将发给</span>
          <van-tag
            v-if="nowNodeType == 'redirect'"
            class="returnBtn"
            type="primary"
            size="small"
            @click="goBackNode()"
          >
            返回</van-tag
          >
        </div>
        <template v-if="nodeDisplayType == 'showSimple'">
          <div class="_nodes-list simpleOptions">
            <div
              v-for="(item, inx) in deptAndUsers"
              :key="inx"
              :class="['_node', { _nodeChecked: item.checked }]"
              @click="clickNode(inx)"
            >
              <div class="_node-info">
                <div class="_node-title">
                  <span class="ds_font4_m"
                    ><i
                      :class="[
                        'iconfont',
                        item.checked
                          ? 'iconarrow-right-drop-circle-outline'
                          : 'iconcheckAll',
                      ]"
                    ></i>
                    {{ item.Require == 1 ? "[必选]" : "" }}{{ item.title
                    }}<span
                      class="ds_font7"
                      v-if="item.nodeType != '2' && item.nodeType != '3'"
                      style="font-size: 0.28rem"
                    >
                      ({{ item.checkedUserList.length + "人" }})</span
                    ></span
                  >
                </div>
                <div
                  class="_node-more"
                  @click.stop="showSecPerson(item, inx)"
                  v-if="
                    item.IsAutoSend != '1' &&
                    item.nodeType != '2' &&
                    item.nodeType != '3'
                  "
                >
                  <div
                    v-for="(itx, index) in item.secHeadInfo"
                    :key="index"
                    v-if="index < 1"
                    class="_head_img"
                  >
                    <van-icon name="contact" />
                    <span class="_font ds_font6">
                      {{ itx.name }}
                    </span>
                  </div>
                  <div>
                    <span v-if="item.checkedUserList.length == 0">请选择</span>
                    <i class="iconfont iconarrow-right1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="_nodes-list">
            <div
              v-for="(item, inx) in deptAndUsers"
              :key="inx"
              :class="['_node', { _nodeChecked: item.checked }]"
              @click="clickNode(inx)"
            >
              <div class="_node-top" v-if="item.title.length > 8">
                <span class="ds_font4_m"
                  >{{ item.Require == 1 ? "[必选]" : "" }}{{ item.title }}</span
                >
              </div>
              <div class="_node-info">
                <div class="_node-title">
                  <span class="ds_font4_m" v-if="item.title.length <= 8"
                    >{{ item.Require == 1 ? "[必选]" : ""
                    }}{{ item.title }}</span
                  >
                  <span
                    class="ds_font7"
                    v-if="item.nodeType != '2' && item.nodeType != '3'"
                    >{{ item.checkedUserList.length + "人" }}</span
                  >
                </div>
                <div
                  class="_node-users"
                  v-show="isShowDefaultUser || item.secHeadInfo"
                >
                  <div
                    v-for="(itx, index) in item.secHeadInfo || item.headInfo"
                    :key="index"
                    @click.stop="clickUser(itx, item, $event)"
                    v-if="index < 3"
                    class="_node-user"
                  >
                    <img
                      :class="{ gray: !itx.checked, header: true }"
                      :src="getFavicon(itx)"
                      :title="itx.FullDeptName"
                      alt
                      :onerror="default_img"
                    />
                    <van-icon
                      v-if="!itx.checked"
                      name="checked"
                      class="noChecked"
                    />
                    <van-icon
                      v-if="itx.checked"
                      name="checked"
                      style="background-color: #fff; border-radius: 50%"
                    />
                    <div class="_font ds_font6">
                      {{ itx.name
                      }}<span v-if="itx.Type == 2">({{ itx.DeptName }})</span>
                    </div>
                  </div>
                </div>
                <div v-if="item.nodeType == '3'">
                  <van-icon name="arrow" size="22"></van-icon>
                </div>
                <div
                  v-else-if="item.showMore"
                  class="_node-more"
                  @click.stop="showSecPerson(item, inx)"
                >
                  <i class="iconfont iconjiahao addicon" />
                  <span>更多</span>
                </div>
              </div>
              <div
                class="_node-timeLimit"
                v-if="
                  item.nodeType != 2 && dsf.config.setting['SYS-FLOW-0047'] == 1
                "
              >
                <van-field
                  :readonly="true"
                  v-model="item.TimeLimit"
                  @click.stop="timeClick(item)"
                  input-align="right"
                  label="办理期限"
                  class="timeLimit"
                >
                  <template #right-icon>
                    <i class="iconfont iconriqi" style="font-size: 0.42rem"></i>
                  </template>
                </van-field>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- 短信 -->
      <template v-if="isShowSmsBox">
        <div class="ds_theme_font">提醒方式</div>
        <div class="sms-container">
          <van-checkbox-group
            v-model="smsResult"
            ref="checkboxGroup"
            direction="horizontal"
          >
            <!-- <div class="diaItem" v-for="(item, index) in smsMethodRange" :key="index"> -->
            <van-checkbox
              v-for="(item, index) in smsMethodRange"
              :key="index"
              :name="item.value"
              icon-size="0.28rem"
              >{{ item.text }}
            </van-checkbox>
            <!-- </div> -->
          </van-checkbox-group>
          <!-- <van-checkbox v-model="isOpenSms">短信提醒</van-checkbox> -->
          <van-field
            v-model="smsContent"
            v-if="!dsf.config.commonFlow.noShowSmsContent"
            rows="2"
            autosize
            type="textarea"
            placeholder="请输入短信提醒内容"
          />
        </div>
      </template>
    </div>
    <!-- 按钮 -->
    <div class="_footer">
      <debounce-click v-if="isShowOpinion && !isHideCancelBtn">
        <van-button
          type="default"
          class="_btn _no_send"
          @click="
            saveOpinion({}, false);
            $emit('close');
          "
          >{{ cancalName }}
        </van-button>
      </debounce-click>
      <debounce-click>
        <van-button type="theme" class="_btn _send" @click="sendFileFlow()">{{
          submitName
        }}</van-button>
      </debounce-click>
    </div>
    <!-- 选人树 -->
    <van-popup
      :close-on-click-overlay="false"
      v-model="showSelect"
      get-container="#app"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <secPerson
        v-if="showSelect"
        :currentLine="currentLine"
        :Response="Response"
        @cancePerson="showSelect = false"
        @confirmPerson="confirmPerson"
      ></secPerson>
    </van-popup>
    <!-- 办理期限 -->
    <van-calendar
      v-model="showCalendar"
      ref="calendarRef"
      @confirm="onConfirm"
      first-day-of-week="1"
      get-container="#app"
      :default-date="currentDate"
    >
      <template #title>
        <div style="padding: 0 15px; text-align: left; height: 80px">
          <div class="btnright">
            <van-button round size="mini" type="primary" @click="clearDate"
              >清空日期</van-button
            >
          </div>
        </div>
      </template>
    </van-calendar>
    <van-popup
      v-model="showPicker"
      position="bottom"
      round
      get-container="#app"
    >
      <van-datetime-picker
        v-model="currentTime"
        @confirm="confirmDate"
        @cancel="showPicker = !showPicker"
        type="time"
        title="选择时间"
        :min-hour="0"
        :max-hour="23"
        :filter="filter"
      />
    </van-popup>
    <!-- 手写意见 -->
    <van-popup
      v-if="getHW_Type == 'self'"
      v-model="showWrite"
      get-container="#app"
      position="bottom"
      round
    >
      <hw :formData="formData" @closeWritePopup="closeWritePopup" :base64Img="imgUrl"></hw>
    </van-popup>
    <div v-if="getHW_Type == 'jg' && showWrite">
      <hwJG
        ref="HWJG"
        :hwtype="getHW_Type"
        :formData="formData"
        :formMeta="formMeta"
        @closeWritePopup="closeWritePopup"
      ></hwJG>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import idealEdit from "@/components/todoFile/idealEdit";
import secPerson from "./secPerson";
import DebounceClick from "@/components/common/debounceClick.jsx";
import hw from "@/components/common/OpinionHandWrite";
export default {
  components: {
    idealEdit,
    DebounceClick,
    secPerson,
    hw,
    'hwJG': () => import('@/components/common/OpinionHandWriteJG')
  },
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formMeta: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formParams: {
      type: Object,
      default: () => {
        return {};
      },
    },
    currentOpintion: {
      type: String,
      default: null,
    },
    sendFileOpintion: {
      type: String,
      default: null,
    },
    isShowWriteOpintionBtn: {
      type: Boolean,
      default: false,
    },
    sendParameters: {
      type: Object,
      default: () => {
        return {};
      },
    },
    currentAction: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      popTitle: "发送",
      cancalName: "保存",
      submitName: "发送",
      showDialog: false,
      default_img:
        'this.src="' + require("../../assets/imgs/defaultUser.png") + '"',
      nodeNeedSignBtn: false,
      isShowSignBtn: false,
      userCurDeptName: "",
      isShowHandWrite:
        dsf.config.commonFlow && dsf.config.commonFlow.needHandWrite,
      showWrite: false,
      imgUrl: "",
      isShowFuyan:
        dsf.config.setting["p2512-handleTip-mode"] == "1" ? true : false, //流程模式:1,全局模式:2
      fuyan: "",
      fuyanRadio: 0,
      isShowSmsBox: false, //是否显示短信提醒盒子
      smsContent: "", //短信内容
      smsResult: [],
      smsMethodRange: [
        {
          // 发送提醒方式，后台更新前默认只有短信提醒，后台更新后根据接口getFlowNode返回的smsMethodRange
          text: "短信提醒",
          value: 1,
        },
      ],
      showCalendar: false,
      showPicker: false,
      currentLine: null,
      currentTime: "",
      currentDate: new Date(),
      deptAndUsers: [],
      checkedUserList: [], //选中人员的数组
      Response: {},
      nodeIsyu: false, //是否是与节点
      nowNodeType: "normal",
      showSelect: false,
      currentLine: null,
      nodeDisplayType: dsf.config.commonFlow?.nodeDisplayType,
      isHideCancelBtn: dsf.util.loadSessionStore("user").privileges?.some(item => item.name == '禁用表单意见暂存'),
    };
  },
  computed: {
    isShowOpinion() {
      return this.formData.allowEditOpinion > 0 && !this.isShowWriteOpintionBtn;
    },
    isShowDefaultUser() {
      return !(dsf.config.commonFlow.sendNeedDefaultUser == false);
    },
    getHW_Type() {
      return dsf.config.setting.hasOwnProperty("SYS-MOBILE-FORM-0003")
        ? dsf.config.setting["SYS-MOBILE-FORM-0003"] || "self"
        : "self";
    },
    batchSend() {
      return !!this.formData.batchSend;
    },
  },
  watch: {
    showDialog(nv, ov) {
      if (nv) {
        this.imgUrl = "";
        //页面加载流程节点数据
        this.getFlowNodes();
        if (dsf.config.commonFlow.isDefaultShowOpinition) {
          this.getDefaultOpinition();
        }
        //如果填写了意见，但是没有保存点击取消，意见会临时存在commonform里面，再次打开的时候会再重新渲染到页面
        this.$nextTick(() => {
          if (
            this.sendFileOpintion &&
            this.sendFileOpintion.length &&
            this.$refs.idealEdit
          ) {
            this.$refs.idealEdit.value = this.sendFileOpintion;
          }
        });
      }
    },
    currentOpintion: {
      handler(nv, ov) {
        this.$nextTick(() => {
          if (nv && this.$refs.idealEdit) {
            this.$refs.idealEdit.value = nv;
          }
        });
      },
      immediate: true,
    },
  },
  methods: {
    //获取流程节点
    getFlowNodes() {
      this._loading = dsf.layer.loading();
      let obj = {
        lazyExpand: !!dsf.config.commonForm.isSelectProcessAsync,
        type: this.formData.sendType || this.formData.type || "SR_SEND",
        wfId: this.formData.flowId,
        infoId: this.formData.info_id || this.formData.infoId || this.formData.infoId,
      };
      // 合并非undefined的参数传递给接口
      Object.keys(this.formData).forEach((key) => {
        if (this.formData[key] != undefined) {
          obj[key] = this.formData[key];
        }
      });
      // 特殊参数
      //如果要求意见必填，并且没有填写意见，禁止自动发送操作
      if (!this.checkOpinion("notip")) {
        obj.disableAutoSend = 1;
      }
      //意见必填时 接口忽略验证意见
      if (this.formData.opinionRequired > 0) {
        obj.ignoreOpinion = 1;
      }
      let postUrl = "/fn/mobileFlow/getFlowNode";
      //如果是意见驱动表单   去掉该参数likeAndBranch
      if (!this.formData.hasControlOpinionTagView) {
        postUrl += "?likeAndBranch=1";
      }

      dsf.http.post(postUrl, obj).then((result) => {
        // data返回null,弹出错误提示
        if (!result.data.data) {
          dsf.layer.toast(result.data.message, false, () => {
            this.closePop();
          });
          return;
        }
        //likeAndBranch该参数作用：流程返回节点自动返回人员
        this.Response = result.data.data.ResponseObject[0];
        let nextNodeStatus = this.Response.Status;
        let nextNode = this.Response.NextNodes;
        this.mj = this.Response.mj; //当前文件密级
        this.isSecret = this.Response.isSecret; //是否为涉密系统
        //这个地方的状态获取前三位数，最后一位数可能会变化 2021年6月3日16:49:13  谢总说的。
        //10000有后续节点，返回直接返送到后续节点的结果
        //20000出提示  无法发送
        //30000只有节点没有人（或分支），需要调用获取人员接口
        //40000有节点有人 （与分支）
        //50000已完成发送
        //51000办理完毕
        //60000  办结
        //70000    80000   特殊按钮操作，普通发送按钮不会出现这样的情况
        switch (nextNodeStatus.substr(0, 4)) {
          case "2000":
            this.dsf.layer.toast("流程发送出错，请检查配置!", undefined, () => {
              this.sendAfterAction();
            });
            break;
          case "6000":
            this.dsf.layer.toast("该文件已办理完毕", true, () => {
              this.sendAfterAction();
            });
            break;
          case "9000":
            this.dsf.layer.toast(this.Response.ErrorMessage, undefined, () => {
              this.sendAfterAction();
            });
            break;
          case "1000":
          case "5000":
          case "5100":
            dsf.layer.closeLoading(this._loading);
            //如果只有一个节点并且是办结节点nodeType=2  提示办结成功，否则要根据返回的节点进行循环处理发送后的提示信息 2022年8月16日15:47:34 @luy
            this.handleAutoSendMes(nextNode.Line);
            break;
          default:
            dsf.layer.closeLoading(this._loading);
            this.$parent.$parent.$refs["sendPop"].$el.style.display = "block";
            this.userCurDeptName = result.data.data.userCurDeptName;
            this.nodeIsyu = this.Response?.OutLineType == "1" || false;
            this.lineData = this.Response.NextNodes.Line;
            this.initLineDatas();
            this.initSms(result.data.data);
        }
      });
    },
    // 自动发送提示
    handleAutoSendMes(lines) {
      if (lines.length == 1 && lines[0].nodeType == 2) {
        dsf.layer.toast("该文件已办理完毕", true, () => {
          this.sendAfterAction();
        });
      } else if (lines.length) {
        //循环处理该lines
        let sendMessage = "";
        lines.forEach((lineItem) => {
          //咨询过谢总，只要RecipientList节点的人员显示，不要SendRangeTree
          if (lineItem.RecipientList && lineItem.RecipientList.Node) {
            sendMessage += this.getAutoSendNodeMessage(lineItem.RecipientList);
          }
        });
        if (sendMessage.length && !dsf.config.commonForm.sendWithNoTips) {
          if (dsf.config.setting["SYS-FLOW-0005"] != -1) {
            Dialog.alert({
              title: "该文件已成功发送至",
              message: sendMessage,
            });
            setTimeout(() => {
              Dialog.close();
              this.sendAfterAction();
            }, 3000);
          } else {
            dsf.layer.toast("发送完成", true);
            this.sendAfterAction();
          }
        } else {
          this.dsf.layer.toast("该文件已办理完毕", true, () => {
            this.sendAfterAction();
          });
        }
      }
    },
    // 初始化线分支
    initLineDatas() {
      this.deptAndUsers = [];
      // 单节点设置自动发送
      if (this.lineData.length == 1 && this.lineData[0].IsAutoSend == "1") {
        // 如果意见必填，则手动将自动发送取消（认为是非自动发送）
        if (!this.checkOpinion("notip")) {
          this.lineData[0].IsAutoSend = "-1";
        } else {
          this.autoSend(this.lineData[0].LineID);
          dsf.layer.closeLoading(this._loading);
          return;
        }
      }
      // 如果多节点存在自动发送节点，取消自动发送节点功能
      if (this.lineData.length > 1) {
        this.lineData.forEach((item) => (item.IsAutoSend = "-1"));
      }
      this.lineData.forEach((cell, index) => {
        this.setTimeLimit(cell);
        this.initLineItem(cell, index);
      });
    },
    // 初始化单条线数据
    initLineItem(line, index) {
      let data = {
        flowID: line.FlowId,
        nodeID: line.NodeID,
        title: line.ShowName,
        lineID: line.LineID,
        IsAutoSend: line.IsAutoSend,
        nodeType: line.NodeType,
        num: "0人审批",
        headInfo: [],
        isAdd: false,
        checked: false,
        Multiplayer: Number(line.Multiplayer?.IsEnabled) || 0, //0 单选 1多选
        SendMode: line.Multiplayer?.SendMode, // 0 并行 1 串行
        originalIndex: index,
        checkedUserList: [],
        TimeLimit: line.TimeLimit,
        Require: line.Require,
        SendRangeTree: line.SendRangeTree,
        NextNodes: line.NextNodes,
        RangeRule: line.RangeRule,
        RangeOtherUser: line.RangeOtherUser,
        moduleId: this.formData.moduleId,
        showMore: false,
      };
      this.initHeadInfo(data);
      this.initShowMore(data);
      this.initChecked(data);
      this.checkDefaultUser(data);
      this.deptAndUsers.push(data);
    },
    // 初始化节点是否默认选中
    initChecked(line) {
      if (this.lineData.length == 1) {
        if (line.nodeType == "3") {
          // 如果只有一个跳转节点时，直接进入跳转节点
          this.$nextTick(() => {
            this.clickNode(0);
          });
        } else {
          // 只存在有单个节点默认选中
          line.checked = true;
        }
      } else if (line.Require == 1) {
        // 必选节点
        line.checked = true;
      }
    },
    initShowMore(line) {
      if (
        dsf.config.commonForm.isSelectProcessAsync ||
        !this.isShowDefaultUser ||
        line.headInfo.length > 3
      ) {
        line.showMore = true;
      }
    },
    // 选中默认人员
    checkDefaultUser(line) {
      if (line.IsAutoSend == "1") return;
      // if (line.checkedUserList.length) return;
      if (!line.checked) {
        line.headInfo.forEach((row) => {
          this.$set(row, "checked", false);
        });
        line.checkedUserList = [];
        delete line.secHeadInfo;
      } else {
        if (line.headInfo.length == 1) {
          this.$set(line.headInfo[0], "checked", true);
          line.checkedUserList = [line.headInfo[0]];
          line.secHeadInfo = [line.headInfo[0]];
        } else {
          try {
            if (line.secHeadInfo?.length > 0) return; // 已有选中人员不再做处理
            line.secHeadInfo = [];
            line.headInfo.forEach((item) => {
              if (item.Selected == "1" || item.Selected == "2") {
                if (
                  this.nodeDisplayType == "showSimple" ||
                  line.headInfo.length > 3
                )
                  line.secHeadInfo.push(item);
                if (
                  !line.checkedUserList.find(
                    (u) => u.UserID == item.UserID && u.DeptID == item.DeptID
                  )
                ) {
                  this.$set(item, "checked", true);
                  line.checkedUserList.push(item);
                  // this.checkedNodeIndex=index;
                }

                if (line.Multiplayer == 0) {
                  throw new Error();
                }
              }
            });
          } catch (e) {
            console.log("跳出循环", e);
          }
          if (line.secHeadInfo.length == 0) delete line.secHeadInfo;
        }
      }
    },
    // 初始化节点人员headInfo，用于显示默认的3人
    initHeadInfo(line) {
      let arr = [];
      let headInfo = [];
      if (line.SendRangeTree) {
        headInfo = headInfo.concat(this.retainUser(line.SendRangeTree, arr));
      }
      line.headInfo = headInfo;
    },
    // 只保留人员和角色，过滤掉部门
    retainUser(option, arr) {
      if (option.UserID || (option.RoleID && option.Type == "2")) {
        //节点类型为用户或角色
        arr.push(option);
      } else {
        if (option.Node instanceof Array) {
          option.Node.map((i) => {
            this.retainUser(i, arr);
          });
        } else if (option.Node) {
          this.retainUser(option.Node, arr);
        } else {
          console.log("空部门");
        }
      }
      return Array.from(new Set(arr));
    },
    // 获取节点人员
    getFlowNodeUsers(lineID, callback) {
      let obj = {
        sendRequestID: this.Response.SendRequestID,
        lineIDs: lineID || "",
        pk: this.formData.info_id || this.formData.infoId || this.formMeta.parameters.pk,
        moduleId: this.formData.moduleId,
        flowId: this.formData.flowId,
        nodeId: this.formData.nodeId,
        pId: this.formData.pid,
        pnId: this.formData.pnid,
      };
      dsf.http.post("/fn/mobileFlow/getFlowNodeUserByNode", obj).then((res) => {
        if (res.data.result) {
          callback(res.data);
        } else {
          dsf.layer.toast(res.data.message);
        }
      });
    },
    // 设置跳转线的节点
    setJumpLine(res) {
      if (res.data) {
        this.lineData = res.data;
        this.initLineDatas();
      }
    },
    // 从跳转节点返回
    goBackNode() {
      this.nowNodeType = "normal";
      this.getFlowNodes();
    },
    // 初始化提醒方式
    initSms(response) {
      if (response.isSms != -1) {
        //-1:不显示提醒
        this.isShowSmsBox = true;
        this.smsContent = response.sms;
        if (response.smsMethodRange) {
          // 发送提醒方式，后台更新前默认只有短信提醒，后台更新后根据接口getFlowNode返回的smsMethodRange
          this.smsMethodRange = response.smsMethodRange; // 提醒选项
          this.smsMethodRange.forEach((item) => {
            // 选项是否默认选中
            if (item.checked) this.smsResult.push(item.value);
          });
        } else {
          if (dsf.config.commonFlow.defaultSendSms) this.smsResult.push(1); // 后台更新前短信提醒默认选中配置
        }
      }
    },

    /** 附言开始 */
    saveHandleTip() {
      dsf.http
        .post("fn/flowHandleTip/saveHandleTip", {
          pnId: this.formData.pnid,
          handleTipsRange: this.fuyanRadio,
          handleTip: this.fuyan,
        })
        .then((res) => {});
    },
    /** 附言结束 */

    /** 办理期限相关开始 **/
    // 设置线的办理期限
    setTimeLimit(line) {
      if (
        line.NodeType != "2" &&
        line.TimeType &&
        line.TimeSpan &&
        dsf.config.setting["SYS-FLOW-0047"] == 1
      ) {
        dsf.http
          .post("fn/flow/timeLimit", {
            timeType: line.TimeType,
            timeSpan: line.TimeSpan,
          })
          .then((res) => {
            if (res.data.code == "200") {
              line.TimeLimit = res.data.data;
            }
          });
      }
    },
    // 选择节点办理期限
    timeClick(line) {
      this.currentLine = line;
      this.showCalendar = true;
      if (this.currentLine.TimeLimit) {
        this.currentDate = new Date(
          this.currentLine.TimeLimit.split(" ")[0].replace(/-/g, "/")
        );
        this.currentTime = this.currentLine.TimeLimit.split(" ")[1];
      }
    },
    onConfirm(date) {
      date = dsf.date.format(date, "yyyy-mm-dd");
      this.currentLine.TimeLimit = date;
      this.showPicker = true;
    },
    confirmDate(time) {
      this.currentLine.TimeLimit += " " + time;
      this.showPicker = false;
      this.showCalendar = false;
    },
    filter(type, options) {
      if (type === "minute") {
        return options.filter((option) => option % 15 === 0);
      }
      return options;
    },
    /** 办理期限相关结束 **/

    /** 意见相关开始 **/
    getDefaultOpinition() {
      dsf.http
        .post("fn/mobileFormComment/getH5CurrentComment", {
          pk: this.formData.info_id || this.formData.infoId || this.formMeta.parameters.pk,
          pid: this.formData.pid || this.formMeta.parameters.pId,
          pnid: this.formData.pnid || this.formMeta.parameters.pnId,
          moduleId: this.formData.moduleId || this.formMeta.parameters.moduleId,
        })
        .then(({ data }) => {
          if (data.data?.opinion?.length) {
            this.$refs.idealEdit.value = data.data.opinion;
          }
          if (data.data.handWritePic) {
            this.imgUrl = dsf.url.getServerUrl(
              `fn/file/downloadFile?fileName=${data.data.handWritePic}`
            );
            dsf.util
              .getImageFileFromUrl(
                dsf.url.getRootPath() +
                  `fn/file/downloadFile?fileName=${data.data.handWritePic}`
              )
              .then((res) => {
                const buffer = new ArrayBuffer(); // 这里需要传入自己的ArrayBuffer对象
                const base64String = dsf.util.arrayBufferToBase64(res);
                this.base64Img = "data:image/png;base64," + base64String;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    },
    // 校验意见
    checkOpinion(notip) {
      //如果是签字意见或者意见验证过意见的  直接返回true  验证通过，发送界面不做校验
      if (this.formParams.isSign == 1 || !this.formParams.sendCheck) {
        return true;
      }
      // 增发不需要意见必填
      if (this.formData.sendType == "SR_EXSEND") {
        return true;
      }
      if (
        this.$refs.idealEdit &&
        !this.trimTip(this.$refs.idealEdit.value).length &&
        this.formData.allowEditOpinion &&
        this.formData.opinionRequired > 0
      ) {
        if (notip == undefined) {
          dsf.layer.toast("请填写审批意见", false);
        }
        this.errorMessage = "请填写审批意见";
        return false;
      }
      // 手写签批必签
      if (
        dsf.config.commonFlow?.needHandWrite &&
        this.formData.allowEditOpinion > 0 &&
        this.havetoHandWrite == 1
      ) {
        if (!this.imgUrl) {
          dsf.layer.toast("请签名", false);
          return false;
        }
      }
      return true;
    },
    // 保存意见
    saveOpinion(info, isSend = true) {
      this._loadingSend = dsf.layer.loading();
      if (this.formData.allowEditOpinion > 0 && !this.isShowWriteOpintionBtn) {
        let obj = {
          __DATA: JSON.stringify({
            info_id: this.formData.info_id || this.formData.infoId,
            pid: new String(this.formData.pid),
            pnid: new String(this.formData.pnid),
            opinion: info.contentValue || this.$refs.idealEdit.value,
            type: "g_inbox",
          }),
        };
        dsf.http
          .post(
            `/fn/mobileSaveOpinion/saveOpinion?flowId=${this.formData.flowId}&nodeId=${this.formData.nodeId}&moduleId=${this.formData.moduleId}`,
            obj
          )
          .then((result) => {
            if (!result.data.result) {
              dsf.layer.toast(result.data.message, false);
            } else if (isSend) {
              if (
                dsf.config.commonFlow?.canSwitchOpinionMode &&
                this.$refs.idealEdit.opinionMode == "input"
              ) {
                this.delHandWrite();
              }
              this.sendFlow(info);
            } else {
              dsf.layer.closeLoading(this._loadingSend);
            }
          })
          .catch(() => {
            dsf.layer.closeLoading(this._loadingSend);
          });
      } else if (isSend) {
        this.sendFlow(info);
      }
    },
    trimTip(idealEditValue) {
      return idealEditValue.replace(/(^\s*)|(\s*$)/g, ""); // 去除首尾空格
    },
    // 手写意见
    openWritePopup() {
      //打开手写弹框
      this.showWrite = true;
      if (this.getHW_Type == "jg") {
        this.$refs.HWJG.buttonHWClick();
      }
    },
    delHandWrite() {
      // 清除手写签批
      dsf.http
        .post(
          `fn/mobileHandWritingData/delete?pnid=${this.formData.pnid}&pid=${this.formData.pid}`
        )
        .then((res) => {
          if (res.data.result) {
            this.imgUrl = "";
            // dsf.layer.toast("清除成功");
          }
        });
    },
    closeWritePopup(imgdata) {
      if (!imgdata) {
        this.imgUrl = "";
        this.delHandWrite();
        this.showWrite = false;
        return;
      }
      //关闭手写弹框
      this.showWrite = false;
      if (imgdata) {
        this.imgUrl = imgdata;
      }
    },
    // 是否需要自动签名按钮
    getSineStatus() {
      if (!dsf.config.commonFlow || !dsf.config.commonFlow.nodeNeedSignBtn)
        return;
      dsf.http
        .post("fn/opinionSignCheck/mobileControlCheck", {
          todoId: this.formData.todoId || this.formParams.todoId,
          nodeName: this.formData.nodeName || this.formMeta.parameters.nodeName,
          pk: this.formData.info_id || this.formData.infoId || this.formParams.pk,
        })
        .then(({ data }) => {
          if (data.data.checkVal) {
            this.nodeNeedSignBtn = true;
            this.isShowSignBtn = data.data.checkVal == 1 ? true : false;
          }
        })
        .catch((err) => {
          console.log(err);
          dsf.layer.toast("获取签名状态失败");
        });
    },
    handleSign() {
      dsf.http
        .post("fn/opinionSignCheck/todoUpdSign", {
          pid: this.formData.pid,
          pnid: this.formData.pnid,
          isSign: this.isShowSignBtn ? 1 : 0,
          pk: this.formData.info_id || this.formData.infoId,
        })
        .then(({ data }) => {
          dsf.layer.toast(data.message);
          this.isShowSignBtn = !this.isShowSignBtn;
        })
        .catch((err) => {
          console.log(err);
          dsf.layer.toast("操作失败");
        });
    },
    /** 意见相关结束 **/

    /** 发送后处理开始 **/
    getAutoSendNodeMessage(Node) {
      // 获取自动发送节点提示信息，递归
      let message = "";
      let check = function (node) {
        if (!node.Node) {
          message += `${node.DeptName} ${node.UserName || ""}\n`;
        } else {
          if (!Array.isArray(node.Node)) {
            check(node.Node);
          } else {
            node.Node.forEach((item) => check(item));
          }
        }
      };
      check(Node);
      return message;
    },
    closePop() {
      this.$emit("close");
      this.showDialog = false;
      this.showContent = false;
    },
    sendAfterAction(lineIds) {
      this.lineIds = lineIds || "";
      let self = this;
      if (this.$refs.idealEdit) {
        this.$refs.idealEdit.value = "";
      }
      self.closePop();

      if (
        this.currentAction == "copyOpinion" ||
        this.currentAction == "xform.copySend"
      ) {
        // this.$router.go(0)
        this.$emit("initData");
        return;
      }

      let actionType = dsf.util.loadLocalStore("actionType") || "1";
      if (
        dsf.config.commonForm.showFormSetting &&
        this.$route.name == "commonForm" &&
        this.$route.query.type &&
        this.$route.query.type == "gw"
      ) {
        if (actionType == "0" || actionType == "1") {
          //待办处理完毕之后直接关闭或者返回列表 都是默认返回列表处理
          self.goBackList();
        } else if (actionType == "2") {
          //待办处理之后连续处理 直接跳到下一条
          self.checkNextDb((res) => {
            if (res.hasData) {
              self.$router.replace({
                path: res.path,
              });
              self.$eventBus.refresh(self);
            } else {
              self.goBackList();
            }
          });
        } else {
          //如果有下一条就弹出窗口提供选择 是否下一条 或者是关闭返回列表
          self.checkNextDb((res) => {
            if (res.hasData) {
              self.curPath = res.path;
              self.$emit("showNext", res.path);
            } else {
              self.dsf.layer.toast("文件已办理完毕", true, () => {
                self.goBackList();
              });
            }
          });
        }
        return;
      }

      // 代办表单点击发送后跳转到下一个代办
      if (self.sendParameters.sendToNext == "1") {
        dsf.http
          .post("/fn/mobileToDoAndRead/getToDoAndReadList2", {
            limit: 10,
            _content: "",
            key: "",
            page: 1,
            showTotal: true,
            fileType: "gw",
            isFirst: 1,
            start: 1,
          })
          .then(function (result) {
            console.log(result);
            if (result && result.data && result.data.datas) {
              let data = result.data.datas.filter((ele) => {
                return ele.dataValue.allowMobile != "-1";
              });
              if (data.length > 0) {
                self.$router.replace({
                  path: `/commonForm/${data[0].dataValue.moduleId}/${data[0].dataValue.info_id}/1?type=gw&todoId=${data[0].dataValue.todoId}`,
                });
                self.$eventBus.refresh(self);
              } else {
                // 没有下一条待办调回列表
                self.goBackList();
              }
            }
          });
      } else {
        // 直接返回列表
        self.goBackList();
      }
    },
    checkNextDb(callback) {
      let param = this.$store.state.searchParam;
      param.dataIndex = this.$route.query.dataIndex || 0;
      console.log(param);

      dsf.http
        .post("/fn/mobileToDo/getToDoByIndex", param)
        .then(function (result) {
          console.log(result.data.data);
          if (result && result.data && result.data.data) {
            let item = result.data.data;
            callback({
              path: `/commonForm/${item.moduleId}/${item.info_id}/1?type=gw&todoId=${item.todoId}`,
              hasData: true,
            });
          } else {
            callback({
              hasData: false,
            });
          }
        });
    },
    goBackList() {
      this.$emit("change", this.lineIds);
      setTimeout(() => {
        this.$emit("close");
        this.$emit("golist");
      }, 500);
    },
    /** 发送后处理结束 **/

    /** 确定发送开始 **/
    autoSend(lineId) {
      let self = this;
      function func(res) {
        let nextNodeStatus = res.data[0].status;
        if (
          nextNodeStatus.indexOf("1000") > -1 ||
          nextNodeStatus.indexOf("5000") > -1 ||
          nextNodeStatus.indexOf("5100") > -1 ||
          nextNodeStatus.indexOf("6000") > -1
        ) {
          self.handleAutoSendMes(res.data);
        } else if (nextNodeStatus.indexOf("4000") > -1) {
          self.lineData = res.data;
          self.initLineDatas();
        } else {
          dsf.layer.toast("自动发送失败");
          return;
        }
      }
      self.getFlowNodeUsers(lineId, func);
    },
    async sendFlow(info) {
      if (this.$parent.$parent.spHandleJS.beforeRealSend) {
        // 发送前根据选择节点人员信息进行拦截
        await this.$parent.$parent.spHandleJS.beforeRealSend(info.nodeInfo, this.$parent.$parent)
      }
      let self = this;
      let arr = [];
      let isBanJie = false;
      self.lineData.map((i) => {
        //解决bug 办结
        if (i.NodeType == "2") {
          isBanJie = true;
        } else {
          isBanJie = false;
        }
        info.nodeInfo.forEach((node) => {
          if (i.ShowName == node.title) {
            let checkedUser = [];
            checkedUser = node.checkedUserList;
            i["RecipientList"] = {};
            i["RecipientList"]["Node"] = isBanJie ? [] : checkedUser;
            i.TimeLimit = node.TimeLimit;
            arr.push(i);
          }
        });
      });
      arr.forEach((a) => {
        // SendMode=1串行，SendMode=0并行，Multiplayer.SendMode=1串行，Multiplayer.SendMode=0并行
        a["SendMode"] = a.SendMode;
        a["exInfo"] = "";
        //节点不需要以下2个参数，会造成传输文件过大，后台会自行根据节点信息重新获取
        a["RangeRule"] = {};
        a["SendRangeTree"] = {};
      });
      // 发送
      let obj = {
        ResponseObject: {
          SendRequestID: self.Response.SendRequestID,
          SendParams: {
            isSms: self.smsResult.length ? self.smsResult.join(",") : -1,
            sms: self.smsResult.length ? self.smsContent : "",
            Line: arr,
          },
        },
      };
      if (self.batchSend) {
        dsf.layer.closeLoading(self._loadingSend);
        self.$emit("firstBatchSend", arr);
        return;
      }
      let sendData = {
        __DATA: JSON.stringify(obj),
        pk: this.formData.info_id || this.formData.infoId || this.formMeta.parameters.pk,
        moduleId: this.formData.moduleId,
        flowId: this.formData.flowId,
        nodeId: this.formData.nodeId,
        pId: this.formData.pid,
        pnId: this.formData.pnid,
      };
      dsf.http
        .post("/fn/mobileFlow/sendFlow", sendData)
        .then(function (result) {
          dsf.layer.closeLoading(self._loadingSend);
          if (result.data && result.data.result) {
            dsf.layer.toast("发送成功", true);
            let lineIds = arr.map((line) => line.LineID);
            self.sendAfterAction(lineIds);
          } else {
            dsf.layer.toast(result.data.message, false);
          }
        })
        .catch(() => {
          dsf.layer.closeLoading(self._loadingSend);
        });
    },
    sendFileFlow() {
      if (this.isShowFuyan && this.fuyan) {
        this.saveHandleTip();
      }
      if (!this.checkOpinion()) {
        return;
      }
      let isEnd = false;
      let nodeInfo = [];
      this.deptAndUsers.forEach((boom, index) => {
        if ((boom.nodeType == "2" || boom.IsAutoSend == "1") && boom.checked) {
          isEnd = true;
        }
        if (boom.checked) {
          nodeInfo.push(boom);
        }
      });
      // 必选节点且非办结节点必须选人
      let requireNode = this.deptAndUsers.find(
        (node) =>
          node.Require == 1 &&
          node.checkedUserList.length == 0 &&
          node.nodeType != "2"
      );
      if (requireNode) {
        dsf.layer.toast(`${requireNode.title}未选中人员`, false);
        return;
      }
      if (nodeInfo.length == 0 && !isEnd) {
        dsf.layer.toast("未选中发送环节", false);
        return;
      }
      if (nodeInfo.some((item) => item.checkedUserList.length == 0) && !isEnd) {
        dsf.layer.toast("未选中人员", false);
        return;
      }
      this.saveOpinion({
        // nodeName: this.deptAndUsers[this.checkedNodeIndex]["title"],
        // checkedUser: this.checkedUserList,
        contentValue: this.$refs.idealEdit ? this.$refs.idealEdit.value : "",
        nodeInfo: nodeInfo,
      });
    },
    /** 确定发送结束 **/

    /** 节点选择相关开始 */
    clickNode(index, checkedUsers) {
      let tempNode = this.deptAndUsers[index];
      let checked = !checkedUsers ? !tempNode.checked : true
      this.checkNodeFilter();
      // 抄送节点
      if (tempNode.nodeType == "7") {
          this.$set(tempNode, "checked", checked);
        if (!checkedUsers || !checkedUsers.length) {
          this.checkDefaultUser(tempNode);
        } else {
          this.checkNodeUser(tempNode, checkedUsers);
        }
        return;
      }
      // 跳转节点
      if (tempNode.nodeType == "3") {
        let nextNodeLines = tempNode.NextNodes.Line.map((n) => n.LineID).join(
          ","
        );
        this.nowNodeType = "redirect";
        this.nodeIsyu = tempNode.OutLineType == "1" || false;
        this.getFlowNodeUsers(nextNodeLines, this.setJumpLine);
        return;
      }
      // if (!checkedUsers && tempNode.checkedUserList.length) return;
      if (!this.nodeIsyu) {
        // 或节点
        this.deptAndUsers.forEach((item, num) => {
          if (item.nodeType != "7") {
            // 将非抄送节点的其余节点取消选中
            if (index == num) {
              this.$set(item, "checked", true);
              if (!checkedUsers || !checkedUsers.length) {
                this.checkDefaultUser(item);
              } else {
                this.checkNodeUser(item, checkedUsers);
              }
            } else {
              this.$set(item, "checked", false);
              this.checkDefaultUser(item);
            }
          }
        });
      } else {
        // 与节点
        this.$set(tempNode, "checked", checked);
        if (!checkedUsers || !checkedUsers.length) {
          this.checkDefaultUser(tempNode);
        } else {
          this.checkNodeUser(tempNode, checkedUsers);
        }
      }
    },
    async clickUser(user, item, $event) {
      //用于判断涉密系统中是否是大于或者等于当前文件密级
      if (this.isSecret == 1 && user.MJ < this.mj) {
        dsf.layer.toast("高密级文件不能发送给低密级等级人员");
        return;
      }
      // Selected为2表示必选节点，默认选中且不能取消
      if (user.Selected == "2") {
        dsf.layer.toast("必选用户不能删除");
        return;
      }
      // 节点选择之前的逻辑处理
      this.checkNodeFilter();
      // 选中节点，并选中点击人员
      let index = this.deptAndUsers.findIndex((it) => it.lineID == item.lineID);
      this.clickNode(index, [user]);
    },
    checkNodeUser(line, checkedUsers) {
      checkedUsers.forEach((user) => {
        this.$set(user, "checked", !user.checked);
        if (user.checked) {
          if (line.Multiplayer != 1) {
            line.headInfo.forEach((row) => {
              if (
                !(
                  row.UserID == user.UserID &&
                  row.RoleID == user.RoleID &&
                  row.DeptID == user.DeptID
                )
              )
                this.$set(row, "checked", false);
            });
            line.checkedUserList = [];
          }
          if (user.Type == "2") {
            //按部门+角色发送
            if (
              line.checkedUserList.length == 0 ||
              line.checkedUserList.findIndex((u) => {
                return (
                  u.UserID == user.UserID &&
                  u.RoleID == user.RoleID &&
                  u.DeptID == user.DeptID
                );
              }) == -1
            ) {
              line.checkedUserList.push(user);
            }
          } else if (
            !line.checkedUserList.find(
              (u) => u.UserID == user.UserID && u.DeptID == user.DeptID
            )
          ) {
            line.checkedUserList.push(user);
          }
        } else {
          let idx = line.checkedUserList.findIndex(
            (u) => u.UserID == user.UserID && u.DeptID == user.DeptID
          );
          if (idx > -1) line.checkedUserList.splice(idx, 1);
        }
      });
      if (line.checkedUserList.length == 0) this.$set(line, "checked", false);
    },
    // 项目特殊js选择处理
    async checkNodeFilter() {
      if (
        this.$parent.$parent.spHandleJS &&
        this.$parent.$parent.spHandleJS.checkNodeFilter
      ) {
        try {
          if (this.$route.name.includes("commonForm")) {
            await this.$parent.$parent.spHandleJS.checkNodeFilter(
              this.$parent.$parent.formData,
              this.formMeta,
              this.$parent.$parent,
              data
            );
          } else {
            await this.$parent.$parent.spHandleJS.checkNodeFilter(
              this.formData,
              this.$parent.$parent,
              data
            );
          }
        } catch (error) {
          console.log(error);
          return;
        }
      }
    },
    /** 节点选择相关结束 */

    /** 节点树相关开始 **/
    async showSecPerson(data, index) {
      this.checkNodeFilter();
      this.clickNode(index, []);
      this.currentLine = data;
      this.showSelect = true;
    },
    confirmPerson(arr) {
      this.currentLine.checkedUserList = arr;
      if (dsf.config.commonForm.isSelectProcessAsync) {
        this.currentLine.secHeadInfo = arr;
      } else {
        this.currentLine.secHeadInfo = [];
        if (arr.length) {
          this.currentLine.checked = true;
          arr.forEach((item) => {
            let user = this.currentLine.headInfo.find(
              (h) => h.UserID == item.UserID && h.DeptID == item.DeptID
            );
            user.checked = true;
            this.currentLine.secHeadInfo.push(user);
          });
        } else {
          this.currentLine.headInfo.forEach(h => h.checked = false)
        }
        if (this.currentLine.secHeadInfo.length == 0)
          delete this.currentLine.secHeadInfo;
      }
      this.showSelect = false;
    },
    /** 节点树相关结束 **/

    /** 取消 **/
    cancel() {
      this.showDialog = false;
      this.showContent = false;
      this.selectIndex = null;
      let temp = this.$refs.idealEdit
        ? this.trimTip(this.$refs.idealEdit.value)
        : "";
      this.$emit("close", temp);
      if (this.$refs.idealEdit) {
        this.$refs.idealEdit.value = "";
      }
    },
    show(from) {
      if (from == "isList" && this.$refs.idealEdit) {
        this.$refs.idealEdit.value = "";
      }
      this.showDialog = true;
    },
    /** 取消 **/
    getFavicon(user) {
      if (user.Photo) {
        return dsf.url.getWebPath(
          `/fn/mobilePhoto/download?id=${user.id}&time=${new Date().getTime()}`
        );
      } else {
        return require("../../assets/imgs/defaultUser.png");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.send-file {
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  > ._content {
    padding: 10px;
    flex: 1;
    overflow: auto;
    .idealEdit {
      overflow: hidden;
      margin: 10px 0;
      background-color: #fff;
    }
    .fuyan {
      margin: 10px 0;
      background-color: #fff;
      .van-cell {
        line-height: normal;
        ::v-deep .van-cell__title {
          flex-basis: content;
          line-height: 2;
        }
        ::v-deep .van-field__body {
          align-items: flex-start;
        }
        ::v-deep .van-field__control {
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 4px;
          padding: 4px;
        }
      }
      .van-radio-group {
        padding: 10px 16px;
        justify-content: center;
      }
    }
    .sms-container {
      background-color: #fff;
      margin: 10px 0;
      padding: 10px;
      box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.08);
      border-radius: 3px;

      ::v-deep .van-cell {
        padding: 0;
        margin-top: 10px;
        border: 1px solid #f5f5f5;

        .van-field__body {
          padding: 5px;
        }
      }
    }
  }
  ._nodes {
    margin: 10px 0;
    ._nodes-top {
      .returnBtn {
        float: right;
      }
    }
    ._nodes-list {
      ._node {
        @include background-theme("button_auxiliary_bgcolor");
        padding: 10px;
        margin-top: 10px;
        border-radius: 3px;
        opacity: 0.5;
        ._node-info {
          display: flex;
          justify-content: space-between;
          ._node-title {
            flex: 1;
            display: flex;
            flex-flow: column;
          }
          ._node-users {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            align-items: flex-start;
            padding-left: 10px;
            box-sizing: border-box;
            flex-shrink: 0;
            i {
              @include font-theme("normal");
            }
            ._node-user {
              display: flex;
              flex-flow: column;
              // justify-content: center;
              align-items: center;
              max-width: 43px;
              // margin: 0.24rem 0;
              margin-right: 10px;
              position: relative;

              &:last-child {
                margin-right: 0;
              }

              img {
                height: 34px;
                width: 34px;
                border-radius: 3px;
                &.gray {
                  opacity: 0.3;
                }
                // margin-bottom: 5px;
              }
              .van-icon-checked {
                position: absolute;
                top: -6px;
                right: -1px;
                font-size: var(--font_size_3);
                color: green;
              }
              ._font {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .noChecked {
                color: #cecece;
              }
            }
          }
          ._node-more {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 10px;
            .addicon {
              font-size: var(--font_size_0);
              border: 1px dashed;
              border-radius: 3px;
              padding: 6px;
            }
          }
        }
        ._node-timeLimit {
          .timeLimit {
            padding: 0;
            font-size: var(--font_size_2);
            padding-top: 10px;
            border-top: 1px solid #ddd;
            margin-top: 10px;
            ::v-deep .van-cell__title,
            ::v-deep .van-cell__value {
              @include font-4;
              color: #333;
            }
          }
        }
      }
      ._nodeChecked {
        border: 2px solid;
        @include border-color-theme("normal");
        opacity: 1 !important;
        ._node-user ._font {
          white-space: inherit !important;
        }
      }
    }
    ._nodes-list.simpleOptions {
      margin-top: 10px;
      ._node {
        padding: 10px 5px;
        margin: 0;
        border: 0;
        opacity: 1;
        &:not(:last-child) {
          position: relative;
          &::after {
            content: " ";
            border-bottom: 1px solid #eee;
            position: absolute;
            right: 10px;
            left: 10px;
            bottom: 0;
          }
        }
        .ds_font4_m {
          font-weight: normal;
          i {
            color: var(--normal);
            font-size: 20px;
            vertical-align: bottom;
          }
        }
        ._node-more {
          width: 25%;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          color: #999;
          overflow: hidden;
          ._head_img {
            display: flex;
            align-items: center;
            overflow: hidden;
            ._font {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          i {
            color: #999;
          }
        }
      }
    }
  }
  ._footer {
    background-color: #fff;
    flex-shrink: 0;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    ._btn {
      flex: 1;
      border-radius: 3px;
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}
</style>
