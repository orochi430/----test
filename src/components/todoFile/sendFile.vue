<!-- 发送节点同步--jf -->
<template>
  <div v-show="showDialog" class="send-file">
    <van-nav-bar :title="popTitle" left-text="取消" @click-left="cancel">
      <template #right>
        <div
          class="flex ac"
          v-if="
            dsf.config.commonFlow &&
            dsf.config.commonFlow.nodeNeedSignBtn &&
            isShowSignBtnBox
          "
        >
          <van-button
            type="info"
            size="mini"
            v-if="isShowSignBtn"
            @click="handleSign"
            >签名</van-button
          >
          <van-button type="info" size="mini" v-else @click="handleSign"
            >取消签名</van-button
          >
        </div>
      </template>
    </van-nav-bar>
    <div class="_content" v-show="showContent">
      <div v-if="userCurDeptName" class="ds_theme_font" style="margin: 0.2rem">
        所属部门：{{ userCurDeptName }}
      </div>
      <idealEdit
        ref="idealEdit"
        v-show="formData.allowEditOpinion > 0 && !isShowWriteOpintionBtn"
        class="idealEdit"
        :isShowHandWrite="
          dsf.config.commonFlow && dsf.config.commonFlow.needHandWrite
        "
        rows="3"
        @handWrite="openWritePopup"
      >
        <template #opinionImg>
          <div
            class="handleWriteBox"
            v-if="
              dsf.config.commonFlow &&
              dsf.config.commonFlow.needHandWrite &&
              formData.allowEditOpinion > 0 &&
              !isShowWriteOpintionBtn
            "
          >
            <div class="writeContent">
              <img
                v-if="imgUrl"
                :src="imgUrl"
                alt=""
                :style="{ width: dsf.config.commonFlow.opinionImgWidth || '50%' }"
              />
            </div>
          </div>
        </template>
      </idealEdit>
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
      <div class="_send_who">
        <p class="top_title disfr jsb">
          <span>您即将发给</span>
          <van-tag
            v-if="nowNodeType == 'redirect'"
            class="returnBtn"
            type="primary"
            size="small"
            @click="goBackNode()"
          >
            返回</van-tag
          >
        </p>
        <div class="_options simpleOptions" v-if="nodeDisplayType == 'showSimple'">
          <div
            v-for="(item, inx) in deptAndUsers"
            :key="inx"
            :class="{
              _option: true,
              disableStatus:
                item.headInfo.length == 0 &&
                item.nodeType == '1' &&
                item.IsAutoSend != '1',
            }"
            @click="checkNode(inx, 'man', false)"
          >
            <div class="_Node">
              <div class="_title">
                <div class="_fon ds_font4_m elps">
                  <i :class="['iconfont', item.checked ? 'iconarrow-right-drop-circle-outline' : 'iconcheckAll' ]"></i>
                  {{ item.Require == 1 ? "[必选]" : "" }}{{ item.title }}
                  <span v-if="
                    item.nodeType != '2' &&
                    item.nodeType != '3' &&
                    item.IsAutoSend != '1'
                  " style="font-size: 0.28rem">
                    ({{ item.checkedUserList.length + "人" }})
                  </span>
                </div>
              </div>
              <div
                class="_righ"
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
                  :class="getIconClass(itx)"
                  v-if="index < 1"
                >
                  <van-icon name="contact" />
                  <div class="_font ds_font6">
                    {{ itx.name }}
                  </div>
                </div>
                <div>
                  <span v-if="item.checkedUserList.length == 0">请选择</span>
                  <i class="iconfont iconarrow-right1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="_allOptions"
          v-else-if="
            dsf.config.commonFlow &&
            dsf.config.commonFlow.nodeDisplayType == 'showAll'
          "
        >
          <div
            v-for="(item, inx) in deptAndUsers"
            :key="inx"
            :class="{
              '_option _gray': !item.checked,
              _option: true,
              disableStatus:
                item.headInfo.length == 0 &&
                item.nodeType == '1' &&
                item.IsAutoSend != '1',
            }"
            @click="checkNode(inx, 'man', false)"
          >
            <div class="_top">
              <div class="title">
                {{ item.Require == 1 ? "[必选]" : "" }}{{ item.title }}
              </div>
              <div
                class="num"
                v-if="
                  item.nodeType != '2' &&
                  item.nodeType != '3' &&
                  item.IsAutoSend != '1'
                "
              >
                已选人数（{{ getCheckNum(item) }}）
              </div>
              <div class="right" v-if="item.IsAutoSend == '1'">
                <div class="_num">（自动发送节点）</div>
              </div>
              <div class="right addbox" v-else>
                <van-icon
                  @click.stop="showSecPerson(item, inx)"
                  name="plus"
                  class="_head_img"
                  size="16"
                />
              </div>
            </div>
            <div class="_bottom">
              <div
                v-for="(itx, index) in item.secHeadInfo || item.headInfo"
                :key="index"
                class="_select"
                v-if="getClass(itx, item)"
              >
                <!-- <img :class="{ state: getClass(itx, item), header: true }" :src="getFavicon(itx)" :title="itx.FullDeptName" alt onerror=""/> -->
                <span class="userImg">{{
                  itx.name.slice(itx.name.length - 2)
                }}</span>
                <span class="_font elps"
                  >{{ itx.name
                  }}<span v-if="itx.Type == 2">({{ itx.DeptName }})</span></span
                >
                <van-icon
                  name="cross"
                  @click.stop="checkUser(itx, item,  inx, $event)"
                ></van-icon>
              </div>
            </div>
            <!-- <div v-if="getCheckNum(item) > 16" @click="item.isOpen = !item.isOpen">
                        {{item.isOpen ? '收起' : '展开'}}
                                    </div> -->
          </div>
        </div>
        <div class="_options" v-else>
          <div
            v-for="(item, inx) in deptAndUsers"
            :key="inx"
            :class="{
              _gray: !item.checked,
              _option: true,
              disableStatus:
                item.headInfo.length == 0 &&
                item.nodeType == '1' &&
                item.IsAutoSend != '1',
            }"
            @click="checkNode(inx, 'man', false)"
          >
            <div class="_fon ds_font4_m" v-if="item.title.length > 8">
              {{ item.Require == 1 ? "[必选]" : "" }}{{ item.title }}
            </div>
            <div class="_Node">
              <div class="_title">
                <div class="_fon ds_font4_m" v-if="item.title.length <= 8">
                  {{ item.Require == 1 ? "[必选]" : "" }}{{ item.title }}
                </div>
                <div
                  class="_num"
                  v-if="
                    item.nodeType != '2' &&
                    item.nodeType != '3' &&
                    item.IsAutoSend != '1'
                  "
                >
                  {{ item.checkedUserList.length + "人" }}
                </div>
              </div>
              <div class="_righ" v-if="item.IsAutoSend == '1'">
                <div class="_num">（自动发送节点）</div>
              </div>
              <div
                class="_righ"
                v-if="
                  item.IsAutoSend != '1' &&
                  isShowDefaultUser &&
                  item.nodeType != '2' &&
                  item.nodeType != '3'
                "
              >
                <div
                  v-for="(itx, index) in item.secHeadInfo || item.headInfo"
                  :key="index"
                  :class="getIconClass(itx)"
                  @click.stop="checkUser(itx, item, inx ,$event)"
                  v-if="index < 3"
                >
                  <img
                    :class="{ state: itx.checked, header: true }"
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
                <div
                  class="more"
                  @click.stop="showSecPerson(item, inx)"
                  v-if="item.headInfo.length > 3"
                >
                  <i class="iconfont iconjiahao addicon" />
                  <span>更多</span>
                </div>

                <!-- <i class="_head_noimg" v-else>&nbsp;</i> -->
              </div>
              <div
                class="_righ"
                v-if="
                  item.IsAutoSend != '1' &&
                  !isShowDefaultUser &&
                  item.nodeType != '2' &&
                  item.nodeType != '3'
                "
              >
                <div
                  v-for="(itx, index) in item.secHeadInfo"
                  :key="index"
                  :class="getIconClass(itx)"
                  @click.stop="checkUser(itx, item, inx ,$event)"
                  v-if="index < 3"
                >
                  <img
                    :class="{ state: itx.checked, header: true }"
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
                <i
                  @click.stop="showSecPerson(item, inx)"
                  class="iconfont iconjiahao addicon"
                />
              </div>
              <van-icon
                @click="showSelect"
                name="arrow"
                size="20"
                v-if="item.nodeType == '3'"
              />
            </div>
            <div
              v-if="
                item.NodeType != 2 && dsf.config.setting['SYS-FLOW-0047'] == 1
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
        <div class="_check" style="display: none">
          <!-- <span class="_circle"></span> -->
          <van-checkbox v-model="checked"></van-checkbox>
          <span class="ds_font6" @click="checked = !checked">发送时钉</span>
        </div>
      </div>
      <p v-if="isShowSmsBox" class="top_title disfr jsb">
        <span>提醒方式</span>
      </p>
      <div v-if="isShowSmsBox" class="sms-container">
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
      <div class="_footer">
        <debounce-click
          v-if="formData.allowEditOpinion > 0 && !isShowWriteOpintionBtn && !isHideCancelBtn"
        >
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
    </div>
    <van-popup
      :close-on-click-overlay="false"
      v-model="showSelect"
      get-container="#app"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <secPerson
        v-if="showSelect"
        :Multiplayer="Multiplayer"
        :selectPersons="selectPersons"
        :selectIndexUserList="selectIndexUserList"
        @cancePerson="showSelect = false"
        @secOk="secOk"
      ></secPerson>
    </van-popup>
    <van-popup
      v-if="getHW_Type == 'self'"
      v-model="showWrite"
      get-container="#app"
      position="bottom"
      round
    >
      <hw :formData="formData" @closeWritePopup="closeWritePopup" :base64Img="imgUrl"></hw>
    </van-popup>
    <div v-show="getHW_Type == 'jg' && showWrite">
      <hwJG
        ref="HWJG"
        :hwtype="getHW_Type"
        :formData="formData"
        :formMeta="formMeta"
        @closeWritePopup="closeWritePopup"
      ></hwJG>
    </div>
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
  </div>
</template>

<script>
import { Dialog } from "vant";
import enclosureItem from "@/components/enclosure/EnclosureItem";
import EnclosurePre from "./../enclosure/EnclosurePre";
import { slider } from "../../assets/styles/schedule.scss";
import idealEdit from "@/components/todoFile/idealEdit";
import secPerson from "@/components/todoFile/secPerson";
import DebounceClick from "@/components/common/debounceClick.jsx";
import hw from "@/components/common/OpinionHandWrite";
import hwJG from "@/components/common/OpinionHandWriteJG";
export default {
  name: "sendFile",
  components: {
    enclosureItem,
    EnclosurePre,
    secPerson,
    DebounceClick,
    hw,
    hwJG,
    idealEdit,
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
      checked: false,
      showDialog: false,
      deptAndUsers: [],
      defaultIcon: require("../../assets/imgs/workflow/icon_institution_level_two.png"),
      tags: ["已阅。", "同意。", "阅。"],
      value: dsf.config.setting["SYS-MOBILE-FORM-0009"]
        ? dsf.config.setting["SYS-MOBILE-FORM-0009"]
        : "",
      fileUrl: "", // 预览文件的链接
      checkedUserList: [], //选中人员的数组
      checkedNodeIndex: -1, //选中的节点
      Response: {},
      node_list: [],
      filelistArr: [],
      nowNodeType: "normal",
      nodeIsyu: false, //是否是与节点
      lineNum: 0, //全部环节数
      default_img:
        'this.src="' + require("../../assets/imgs/defaultUser.png") + '"',
      showSelect: false,
      selectPersons: [],
      selectIndex: null,
      Multiplayer: null,
      lineData: null,
      imgUrl: "",
      showWrite: false,
      isShowSignBtn: false,
      errorMessage: "",
      isShowSmsBox: false, //是否显示短信提醒盒子
      // isOpenSms: false, //是否开启短信提醒
      smsContent: "", //短信内容
      showMore: false,
      havetoHandWrite: dsf.config.setting["SYS-MOBILE-FORM-0011"] || "-1", //手写签批必签
      showContent: false,
      smsResult: [],
      smsMethodRange: [
        {
          // 发送提醒方式，后台更新前默认只有短信提醒，后台更新后根据接口getFlowNode返回的smsMethodRange
          text: "短信提醒",
          value: 1,
        },
      ],
      AgainClickArr: [], // 每个节点的选中状态，1为选中，2为未选中
      userCurDeptName: "", // 所属部门
      showIdeal: false,
      lineIds: "",
      showCalendar: false,
      showPicker: false,
      currentLine: null,
      currentTime: "",
      currentDate: new Date(),
      mj: 0,
      isSecret: 0,
      selectIndexUserList: "", // 当前点击节点的选中人员
      isShowFuyan: dsf.config.setting["p2512-handleTip-mode"]=="1"?true:false,//流程模式:1,全局模式:2
      fuyan: "",
      fuyanRadio: 0,
      nodeDisplayType: dsf.config.commonFlow?.nodeDisplayType,
      base64Img:"",
      isHideCancelBtn: dsf.util.loadSessionStore("user").privileges?.some(item => item.name == '禁用表单意见暂存')
    };
  },
  computed: {
    tempTags() {
      return this.showMore ? this.tags : this.tags.slice(0, 2);
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
      return !!this.formData.batchSend
    }
  },
  watch: {
    showDialog(nv, ov) {
      if (nv) {
        this.imgUrl = "";
        // this.value = "";
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

        //this.getfileList();//暂时发现该接口没有用到 暂时注释，2021年11月16日14:52:12   @ly
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
  created() {
    //表单发送多为v-show，只会触发一次created，第二次发打开不触发
    if (dsf.config.commonFlow.sendBtnSetting) {
      this.cancalName = dsf.config.commonFlow.sendBtnSetting.cancelName;
      // 弹窗标题 和 提交按钮名称取相同值
      this.popTitle = this.submitName =
        dsf.config.commonFlow.sendBtnSetting.submitName;
    }

    if (!dsf.config.commonFlow.hasOwnProperty("showOpinitonText")) {
      dsf.config.commonFlow.showOpinitonText = false;
    }
  },
  mounted() {
    this.getSineStatus();
  },
  methods: {
    goback() {
      if (this.showSelect) {
        console.log("关闭了选人");
        this.showSelect = false;
        this.showDialog = true;
        return;
      }
      if (this.$parent.$parent.showPopUp) {
        console.log("关闭了节点");
        this.$parent.$parent.showPopUp = false;
      }
    },
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
          if (data.data.handWritePic){
            this.imgUrl = dsf.url.getServerUrl(
                `fn/file/downloadFile?fileName=${data.data.handWritePic}`
              );
              // dsf.util.getImageFileFromUrl(dsf.url.getRootPath()+ `fn/file/downloadFile?fileName=${data.data.handWritePic}`).then(res=>{
              //   const buffer = new ArrayBuffer(); // 这里需要传入自己的ArrayBuffer对象
              //   const base64String = dsf.util.arrayBufferToBase64(res);
              //   this.base64Img = "data:image/png;base64,"+base64String;
              // })
              // .catch((err) => {
              //   console.log(err);
              // });
          }

        });
    },
    getSineStatus() {
      //是否需要自动签名按钮
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
            this.isShowSignBtnBox = true;
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
    initCheckUser() {
      //发送选人初始化时默认选中配置的人员
      let self = this;
      // this.checkedUserList = [];
      if (self.deptAndUsers && self.deptAndUsers.length > 0) {
        try {
          self.deptAndUsers.forEach((nodeUser,index) => {
            if (nodeUser.IsAutoSend == "1") return false;
            if (!nodeUser.checked) return false;
            try {
              nodeUser.secHeadInfo = [];
              nodeUser.headInfo.forEach((item) => {
                if (item.Selected == "1" || item.Selected == "2") {
                  if (this.nodeDisplayType == 'showSimple' || nodeUser.headInfo.length > 3)
                    nodeUser.secHeadInfo.push(item);
                  if (
                    !nodeUser.checkedUserList.find(
                      (u) => u.UserID == item.UserID && u.DeptID == item.DeptID
                    )
                  ) {
                    this.$set(item, "checked", true);
                    nodeUser.checkedUserList.push(item);
                    this.checkedNodeIndex=index;
                  }

                  if (nodeUser.Multiplayer == 0) {
                    throw new Error();
                  }
                }
              });
            } catch (e) {
              console.log("跳出循环", e);
            }
            if (nodeUser.secHeadInfo.length == 0) delete nodeUser.secHeadInfo;
          });
        } catch (error) {
          console.log("跳出循环", error);
        }
      }
    },
    secOk(arr) {
      let self = this;
      let nodeUser = this.deptAndUsers[this.selectIndex];
      // 先把选择人员置空, if 判断里重新赋值
      nodeUser.checkedUserList = [];
      let secHeadInfo = [];
      if (arr.length > 0) {
        //所有人员选中状态初始化false，等待真正选择的人进行重置它的选择状态 checkUser  2022年1月21日01:47:48 @ly
        nodeUser.headInfo.forEach((item, index) => {
          item.checked = false;
        });
        // nodeUser.headInfo.forEach((item, index) => {
        //     if (item.Type == "2") {
        //         if (arr.findIndex((ar) => item.id == ar.id && ar.DeptID == item.DeptID && ar.RoleID == item.RoleID) > -1) {
        //             secHeadInfo.push(item);
        //             this.checkUser(item, nodeUser);
        //         }
        //     } else {
        //         if (arr.findIndex((ar) => item.id == ar.id && ar.DeptID == item.DeptID) > -1) {
        //             secHeadInfo.push(item);
        //             this.checkUser(item, nodeUser);
        //         }
        //     }
        // });

        // 以上代码循环选人树进行比对不会按照选择顺序传入接口，导致流程串行模式失效
        // 当从选人树确定时返回所有选中节点，需将选中数组置空，重新循环选中节点
        arr.forEach((item, index) => {
          item.checked = false;
          secHeadInfo.push(item);
          this.checkUser(item, nodeUser);
        });
        nodeUser.secHeadInfo = secHeadInfo;
      } else {
        // 选人为空
        nodeUser.headInfo.forEach((item, index) => {
          item.checked = false;
        });
        delete nodeUser.secHeadInfo;
      }
    },
    async showSecPerson(data, index) {
      if (index) {
        this.checkedNodeIndex = index;
      }

      // 节点选择之前的逻辑处理
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
      if (!this.nodeIsyu) {
        // 仅在或节点时
        // 直接点击+切换节点时，先执行切换节点操作，解决之前节点选人未清除
        if (index != this.selectIndex) this.checkNode(index, "man", true);
      }
      /*
                              此处应该用node_list
                              因为在加载时  node_list与lineData相同，但是当有跳转节点时lineData与node_list就不一致了，
                              因为node_list被替换成了需要跳转后的节点，所以这里获取数据时要改成node_list
                              @ly  2021年12月22日  bugfree 82060 【横琴管委会协同办公管理平台】新版移动办公跳转节点无法多选bug
                              */
      let secTree = JSON.parse(
        //JSON.stringify(this.lineData[data.originalIndex].SendRangeTree.Node)
        JSON.stringify(this.node_list[data.originalIndex].SendRangeTree.Node)
      );
      let allData = {
        attrs: {
          noselect: true,
        },
        id: "",
        isopen: false,
        checked: false,
        hideCheckAll: this.lineData[data.originalIndex].NodeType == '7', //NodeType == '7' 不显示节点的全选
        showName: this.lineData[data.originalIndex].ShowName,
      };
      this.mapTree(secTree, data.checkedUserList);
      if (Array.isArray(secTree)) {
        allData.children = secTree;
      } else {
        allData.children = [secTree];
      }
      // console.log("allData", allData);
      this.selectPersons = [allData];
      this.Multiplayer = data.Multiplayer > 0 ? true : false;
      data.headInfo.forEach((item, index) => {
        item.showName = item.UserName;
        item.attrs = {};
        item.children = [];
      });
      this.selectIndex = index;

      // 将点击节点的选中人员保存, 供选人组件初始化使用 --fpg
      this.selectIndexUserList = this.deptAndUsers[index].checkedUserList;
      this.showSelect = true;
    },
    getDefaultCheckTreeNode(item, checkedUserList) {
      // let checkedUserList = this.checkedUserList;
      let result = false;
      if (item.Type == "2") {
        if (
          checkedUserList.findIndex(
            (itx) =>
              itx.id == item.id &&
              itx.DeptID == item.DeptID &&
              itx.RoleID == item.RoleID
          ) > -1
        ) {
          result = true;
        }
      } else {
        if (
          checkedUserList.findIndex(
            (itx) => itx.id == item.id && itx.DeptID == item.DeptID
          ) > -1
        ) {
          result = true;
        }
      }
      return result;
      // console.log("item",item);
      // console.log("this.checkedUserList",this.checkedUserList);
      // return false;
    },
    mapTree(data, checkedUserList) {
      if (data instanceof Array) {
        data.forEach((item) => {
          //item.checked = false;
          item.checked = this.getDefaultCheckTreeNode(item, checkedUserList);
          item.showName = item.name;
          item.attrs = {
            noselect: true,
          };
          if (item.Node) {
            if (item.Node instanceof Array) {
              this.mapTree(item.Node, checkedUserList);
              this.$set(item, "isopen", false);
              item.children = item.Node;
            } else {
              this.mapTree(item.Node, checkedUserList);
              this.$set(item, "isopen", false);
              item.children = [item.Node];
            }
          } else {
            item.attrs = {
              noselect: false,
            };
            item.children = [];
          }
          //console.log("item",item);
        });
      } else {
        //data.checked = false;
        data.checked = this.getDefaultCheckTreeNode(data, checkedUserList);
        data.showName = data.name;
        data.attrs = {
          //noselect: false,
          noselect: true, //heshen 此处应该默认为true 第一个部门节点上不显示checkbox,
        };
        if (data.Node) {
          if (data.Node instanceof Array) {
            this.mapTree(data.Node, checkedUserList);
            this.$set(data, "isopen", false);
            data.children = data.Node;
          } else {
            this.mapTree(data.Node, checkedUserList);
            this.$set(data, "isopen", false);
            data.children = [data.Node];
          }
        } else {
          data.attrs = {
            noselect: false,
          };
          data.children = [];
        }
        // console.log("data", data);
      }
    },
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
    deleteUser(index, node) {
      node.headInfo.splice(index, 1);
    },
    getFavicon(user) {
      if (user.Photo) {
        return dsf.url.getWebPath(
          `/fn/mobilePhoto/download?id=${user.id}&time=${new Date().getTime()}`
        );
      } else {
        return require("../../assets/imgs/defaultUser.png");
      }
    },
    //文件列表
    getfileList() {
      //console.error("文件列表");
      let self = this;
      let params = {
        info_id: this.formData.id, // 文件id
        infoId: this.formData.id, // 文件id
        moduleId: this.formData.moduleId, // 模块id
        nodeId: "", // 流程节点id
        start: 1, // 开始页码
        limit: 100, // 每页条数
      };
      let loginToken = dsf.util.loadSessionStore("loginToken");
      this.filelistArr = [];
      dsf.http
        .post("/fn/mobileAttachment/getFormAttachment", params)
        .then(function (result) {
          if (result && result.data && result.data.rows) {
            let timestamp = new Date().getTime();
            result.data.rows.forEach((item) => {
              let arr = [];
              if (item.document) {
                item.document.forEach(
                  ({
                    id,
                    infoId,
                    title,
                    type,
                    moduleId,
                    showFileSize,
                    isHandwrite,
                  }) => {
                    let obj = {
                      id,
                      title,
                      size: showFileSize || "",
                      url: dsf.url.openOffice(
                        encodeURIComponent(
                          dsf.url.getServerUrl(
                            `fn/file/download?infoId=${infoId}&fileId=${id}&fileName=${title}&nrType=${type}&moduleId=${moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${title}`
                          )
                        )
                      ),
                      infoId,
                      moduleId,
                      isHandwrite,
                    };
                    arr.push(obj);
                  }
                );
                item.file = arr;
              } else {
                item.file = [];
              }
              if ((item.file && item.file.length) || item.canEdit > 0) {
                item.show = true;
              } else {
                item.show = false;
              }
            });
            self.filelistArr = result.data.rows;
          }
        });
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
    //获取流程节点
    getFlowNodes() {
      this._loading = dsf.layer.loading();
      let self = this;
      console.log(self);
      let obj = {
        type: this.formData.sendType || this.formData.type || "SR_SEND",
        pid: this.formData.pid,
        pnid: this.formData.pnid,
        wfId: this.formData.flowId,
        infoId: this.formData.info_id || this.formData.infoId,
        bt: this.formData.bt,
        moduleName: this.formData.moduleName,
        moduleId: this.formData.moduleId,
        // disableAutoSend: 1,//禁止后台自动发送
      };
      //平台弹窗特殊抄写意见按钮 添加字段 按钮
      if (this.formData.opinionContent) {
        obj.opinionContent = this.formData.opinionContent;
      }
      //如果要求意见必填，并且没有填写意见，禁止自动发送操作
      if (!this.checkOpinion("notip")) {
        obj.disableAutoSend = 1;
      }

      if (this.formData.opinionRequired > 0) {
        //意见必填时 接口忽略验证意见
        obj.ignoreOpinion = 1;
      }

      if (this.formData.nextLineId) {
        obj.nextLineId = this.formData.nextLineId;
      }
      if (this.formData.direction) {
        obj.direction = this.formData.direction;
      }
      if (this.formData.determineUser) {
        obj.determineUser = this.formData.determineUser;
      }
      if (this.formData.nextNodeId) {
        obj.nextNodeId = this.formData.nextNodeId;
      }
      if (this.formData.endOtherLink != undefined) {
        obj.endOtherLink = this.formData.endOtherLink;
      }
      if (this.formData.isBackTrack != undefined) {
        obj.isBackTrack = this.formData.isBackTrack;
      }
      if (this.formData.intelligenceSend != undefined) {
        obj.intelligenceSend = this.formData.intelligenceSend;
      }
      if (this.formData.disableAutoSend != undefined) {
        obj.disableAutoSend = this.formData.disableAutoSend;
      }
      if (this.formData.disableAutoSend4EndNode != undefined) {
        obj.disableAutoSend4EndNode = this.formData.disableAutoSend4EndNode;
      }
      if (this.formData.agencyType != undefined) {
        obj.agencyType = this.formData.agencyType;
      }
      // 增发
      if (this.formData.sendUserId != undefined) {
        obj.sendUserId = this.formData.sendUserId;
        obj.sendUserName = this.formData.sendUserName;
        obj.sendDeptId = this.formData.sendDeptId;
        obj.sendDeptName = this.formData.sendDeptName;
      }
      let postUrl = "/fn/mobileFlow/getFlowNode";
      //如果是意见驱动表单   去掉该参数likeAndBranch
      if (!this.formData.hasControlOpinionTagView) {
        postUrl += "?likeAndBranch=1";
      }

      this.deptAndUsers = [];
      dsf.http
        .post(postUrl, obj)
        .then(function (result) {
          console.log(result);
          // data返回null,弹出错误提示
          if (!result.data.data) {
            dsf.layer.toast(result.data.message, false, () => {
              self.closePop();
            });
            return;
          }
          //likeAndBranch该参数作用：流程返回节点自动返回人员
          let nextNodeStatus = result.data.data.ResponseObject[0].Status;
          let nextNode = result.data.data.ResponseObject[0].NextNodes;
          self.mj = result.data.data.ResponseObject[0].mj; //当前文件密级
          self.isSecret = result.data.data.ResponseObject[0].isSecret; //是否为涉密系统
          //这个地方的状态获取前三位数，最后一位数可能会变化 2021年6月3日16:49:13  谢总说的。
          //10000有后续节点，返回直接返送到后续节点的结果
          //20000出提示  无法发送
          //30000只有节点没有人（或分支），需要调用获取人员接口
          //40000有节点有人 （与分支）
          //50000已完成发送
          //51000办理完毕
          //60000  办结
          //70000    80000   特殊按钮操作，普通发送按钮不会出现这样的情况
          if (nextNodeStatus.indexOf("2000") > -1) {
            self.dsf.layer.toast("流程发送出错，请检查配置!", undefined, () => {
              self.sendAfterAction();
            });
            return;
          } else if (nextNodeStatus.indexOf("6000") > -1) {
            self.dsf.layer.toast("该文件已办理完毕", true, () => {
              self.sendAfterAction();
            });
            return;
          } else if (
            nextNodeStatus.indexOf("1000") > -1 ||
            nextNodeStatus.indexOf("5000") > -1 ||
            nextNodeStatus.indexOf("5100") > -1
          ) {
            dsf.layer.closeLoading(self._loading);
            //如果只有一个节点并且是办结节点nodeType=2  提示办结成功，否则要根据返回的节点进行循环处理发送后的提示信息 2022年8月16日15:47:34 @luy
            if (nextNode.Line.length == 1 && nextNode.Line[0].nodeType == 2) {
              self.dsf.layer.toast("该文件已办理完毕", true, () => {
                self.sendAfterAction();
              });
            } else if (nextNode.Line.length) {
              //循环处理该nextNode.Line
              let sendMessage = "";
              nextNode.Line.forEach((lineItem) => {
                if (lineItem.RecipientList && lineItem.RecipientList.Node) {
                  sendMessage += self.getAutoSendNodeMessage(
                    lineItem.RecipientList
                  );
                }
                //咨询过谢总，只要RecipientList节点的人员显示，不要SendRangeTree
                // else if (lineItem.SendRangeTree && lineItem.SendRangeTree.Node) {
                //     sendMessage += self.getAutoSendNodeMessage(lineItem.SendRangeTree.Node)
                // }
              });
              if (sendMessage.length && !dsf.config.commonForm.sendWithNoTips) {
                if (dsf.config.setting["SYS-FLOW-0005"] != -1) {
                  Dialog.alert({
                    title: "该文件已成功发送至",
                    message: sendMessage,
                  });
                  setTimeout(function () {
                    Dialog.close();
                    self.sendAfterAction();
                  }, 3000);
                } else {
                  dsf.layer.toast("发送完成", true);
                  self.sendAfterAction();
                }
              } else {
                self.dsf.layer.toast("该文件已办理完毕", true, () => {
                  self.sendAfterAction();
                });
              }
            }
            return;
          } else if (nextNodeStatus == "90000") {
            self.dsf.layer.toast(
              result.data.data.ResponseObject[0].ErrorMessage,
              undefined,
              () => {
                self.sendAfterAction();
              }
            );
            return;
          }

          self.$parent.$parent.$refs["sendPop"].$el.style.display = "block";

          self.showContent = true;
          self.Response = result.data.data.ResponseObject[0];
          self.node_list = self.Response.NextNodes.Line;
          if (self.Response.OutLineType && self.Response.OutLineType == "1") {
            self.nodeIsyu = true;
          } else {
            // 进入跳转节点 直接关闭弹窗后 nodeIsyu会更改为跳转节点的类型 且不执行 goBackNode 方法
            self.nodeIsyu = false;
          }
          self.lineData = self.node_list;
          // 单节点设置自动发送
          if (self.lineData.length == 1 && self.lineData[0].IsAutoSend == "1") {
            // 如果意见必填，则手动将自动发送取消（认为是非自动发送）
            if (!self.checkOpinion("notip")) {
              self.lineData[0].IsAutoSend = "-1";
            } else {
              self.autoSend(self.lineData[0].LineID);
              dsf.layer.closeLoading(self._loading);
              return;
            }
          }
          if (self.lineData.length > 1) {
            self.lineData.forEach((item) => (item.IsAutoSend = "-1"));
          }
          self.lineData.forEach((cell, index) => {
            self.lineNum++;
            if (
              cell.NodeType != "2" &&
              cell.TimeType &&
              cell.TimeSpan &&
              dsf.config.setting["SYS-FLOW-0047"] == 1
            ) {
              dsf.http
                .post("fn/flow/timeLimit", {
                  timeType: cell.TimeType,
                  timeSpan: cell.TimeSpan,
                })
                .then((res) => {
                  if (res.data.code == "200") {
                    cell.TimeLimit = res.data.data;
                  }
                });
            }
            //办结节点不要调接口  会导致文件自动办结
            if (
              (cell.NodeType == "0" ||
                cell.NodeType == "1" ||
                cell.NodeType == "7") &&
              cell.IsAutoSend != "1"
            ) {
              self.getFlowNodeUserByNodeInfo(cell, index);
              //self.getFlowNodeUsers(cell.LineID);
            } else {
              self.lineNum--;
              // 办结节点  单个节点 默认选中
              self.checkedNodeIndex=(self.lineData.length == 1&&cell.NodeType==2)?index:self.checkedNodeIndex;
              //办结节点 或者跳转节点
              self.deptAndUsers.push({
                nodeID: cell.NodeID,
                title: cell.ShowName,
                lineID: cell.LineID,
                IsAutoSend: cell.IsAutoSend,
                nodeType: cell.NodeType,
                num: "0人审批",
                headInfo: [],
                isAdd: false,
                checked: (self.lineData.length == 1 && cell.NodeType==2)? true: false,
                Multiplayer: 0, //0 单选 1多选
                originalIndex: index,
                checkedUserList: [],
                TimeLimit: cell.TimeLimit,
                Require: cell.Require,
              });
              // if (self.lineNum == 0) {
              //   self.checkNode(0, "auto");
              // }
              // this.$nextTick(()=>{
              //   self.lineNum--;
              // })
            }
          });
          self.userCurDeptName = result.data.data.userCurDeptName;
          if (result.data.data.isSms != -1) {
            //-1:不显示提醒
            self.isShowSmsBox = true;
            self.smsContent = result.data.data.sms;
            // self.isOpenSms = dsf.config.commonFlow.defaultSendSms || false;
            if (result.data.data.smsMethodRange) {
              // 发送提醒方式，后台更新前默认只有短信提醒，后台更新后根据接口getFlowNode返回的smsMethodRange
              self.smsMethodRange = result.data.data.smsMethodRange; // 提醒选项
              self.smsMethodRange.forEach((item) => {
                // 选项是否默认选中
                if (item.checked) self.smsResult.push(item.value);
              });
            } else {
              if (dsf.config.commonFlow.defaultSendSms) self.smsResult.push(1); // 后台更新前短信提醒默认选中配置
            }
          }
          // 如果只有一个跳转节点时，直接进入跳转节点
          if (self.deptAndUsers.length == 1 && self.deptAndUsers[0].nodeType == 3) {
            self.checkNode(0, 'man', false)
          }
          self.$nextTick(function () {
            // let arr = [];
            // self.lineData.forEach((item, index) => {
            //     self.deptAndUsers.forEach((itm, inx) => {
            //         if (
            //             item.LineID == itm.lineID &&
            //             arr.filter((it) => it.lineID == itm.lineID).length < 1
            //         ) {
            //             arr.push(itm);
            //         }
            //     });
            // });
            // self.deptAndUsers = arr;
            self.initCheckUser(); //加载默认选中人员
            //最后关闭加载层
            dsf.layer.closeLoading(self._loading);
          });
        })
        .catch((err) => {
          console.log(err);
          dsf.layer.closeLoading(self._loading);
        });
    },
    //同步获取人员
    getFlowNodeUserByNodeInfo(lineInfo, index) {
      let self = this;
      if (lineInfo) {
        let arr = [];
        let formUsers = [];
        let nodeUsers = [];
        if (lineInfo.SendRangeTree) {
          let startData = new Array().concat(lineInfo.SendRangeTree.Node);

          startData.map((i, numi) => {
            //节点下人员
            nodeUsers = nodeUsers.concat(
              Array.from(new Set(self._initUserlist(i, arr)))
            );
            nodeUsers = Array.from(new Set(nodeUsers));
          });
          console.log(
            nodeUsers.filter(
              (chkItem) => chkItem.Selected == "1" || chkItem.Selected == "2"
            ).length
          );
          formUsers.push({
            nodeID: lineInfo.NodeID,
            title: lineInfo.ShowName,
            num: "0人审批",
            lineID: lineInfo.LineID,
            headInfo: nodeUsers,
            nodeType: lineInfo.NodeType,
            isAdd: false,
            checked:
              // 只存在有单个节点默认选中、(或节点有默认选中人的节点的第一个节点需默认选中,与节点设了默认选中人的节点默认选中 不再默认选中节点 @zxh)
              self.lineData.length == 1 ? true: false,
            Multiplayer: lineInfo.Multiplayer.IsEnabled, //0 单选 1多选
            originalIndex: index,
            checkedUserList: [],
            TimeLimit: lineInfo.TimeLimit,
            Require: lineInfo.Require,
          });
          if (
            nodeUsers.filter((chkItem) => {
              return chkItem.Selected == "1" || chkItem.Selected == "2";
            }).length
          )
            self.checkedNodeIndex = index;

          self.deptAndUsers = Array.from(
            new Set(self.deptAndUsers.concat(formUsers))
          );
          console.log(self.deptAndUsers);
        }
        self.lineNum--;
      }
    },
    //获取节点人员
    getFlowNodeUsers(lineID, isAutoSend, index) {
      let self = this;
      let obj = {
        sendRequestID: self.Response.SendRequestID,
        lineIDs: lineID || "",
        pk: this.formData.info_id || this.formData.infoId || this.formMeta.parameters.pk,
        moduleId: this.formData.moduleId,
        flowId: this.formData.flowId,
        nodeId: this.formData.nodeId,
        pId: this.formData.pid,
        pnId: this.formData.pnid,
      };
      dsf.http
        .post("/fn/mobileFlow/getFlowNodeUserByNode", obj)
        .then(function (result) {
          if (result.data.result) {
            let nextNodeStatus = result.data.data[0].status;
            let isGo = false; //如果是自动发送并且没有发送成功，需要继续选人发送判断
            if (isAutoSend) {
              let nextNodeStatus = result.data.data[0].status;
              if (
                nextNodeStatus.indexOf("1000") > -1 ||
                nextNodeStatus.indexOf("5000") > -1 ||
                nextNodeStatus.indexOf("5100") > -1 ||
                nextNodeStatus.indexOf("6000") > -1
              ) {
                let RecipientList = result.data.data[0].RecipientList;
                let sendNode = result.data.data[0].SendRangeTree?.Node;
                if (RecipientList || sendNode) {
                  // 自动发送的节点提示信息
                  // self.sendAfterAction();
                  let sendMessage = "";
                  if (RecipientList) {
                    sendMessage = self.getAutoSendNodeMessage(RecipientList);
                  } else {
                    sendMessage = self.getAutoSendNodeMessage(sendNode);
                  }
                  if (
                    sendMessage.length &&
                    !dsf.config.commonForm.sendWithNoTips
                  ) {
                    if (dsf.config.setting["SYS-FLOW-0005"] != -1) {
                      Dialog.alert({
                        title: "该文件已成功发送至",
                        message: sendMessage,
                      }).then(() => {
                        self.sendAfterAction();
                      });
                      setTimeout(() => {
                        Dialog.close();
                        self.sendAfterAction();
                      }, 3000);
                    } else {
                      dsf.layer.toast("发送完成", true);
                      self.sendAfterAction();
                    }
                  }
                } else {
                  self.dsf.layer.toast("发送成功", true);
                  self.sendAfterAction();
                }
                return;
              } else if (nextNodeStatus.indexOf("4000") > -1) {
                isGo = true;
              } else {
                self.dsf.layer.toast("自动发送失败");
                return;
              }
            }

            result.data.data.forEach((nodeItem, newindex) => {
              if (isGo) {
                nodeItem.IsAutoSend = "-1"; //需要选人发送就改成非自动发送节点
              }
              let arr = [];
              let formUsers = [];
              let nodeUsers = [];
              if (nodeItem.NodeType == "1" && nodeItem.IsAutoSend != "1") {
                if (nodeItem.SendRangeTree == "") {
                  nodeItem.SendRangeTree = { Node: [] };
                }
                let startData = new Array().concat(nodeItem.SendRangeTree.Node);
                startData.map((i, numi) => {
                  //节点下人员
                  nodeUsers = nodeUsers.concat(
                    Array.from(new Set(self._initUserlist(i, arr)))
                  );
                  nodeUsers = Array.from(new Set(nodeUsers));
                });
                formUsers.push({
                  nodeID: nodeItem.NodeID,
                  title: nodeItem.ShowName,
                  num: "0人审批",
                  headInfo: nodeUsers,
                  lineID: nodeItem.LineID,
                  nodeType: nodeItem.NodeType,
                  isAdd: false,
                  checked: nodeUsers.filter((chkItem) => {
                    return chkItem.Selected == "1" || chkItem.Selected == "2";
                  }).length
                    ? true
                    : false,
                  Multiplayer: nodeItem.Multiplayer.IsEnabled, //0 单选 1多选
                  originalIndex: newindex,
                  checkedUserList: [],
                  Require: nodeItem.Require,
                });
                self.deptAndUsers = Array.from(
                  new Set(self.deptAndUsers.concat(formUsers))
                );
              } else {
                //办结节点 或者跳转节点
                self.deptAndUsers.push({
                  nodeID: nodeItem.NodeID,
                  title: nodeItem.ShowName,
                  lineID: nodeItem.LineID,
                  IsAutoSend: nodeItem.IsAutoSend,
                  nodeType: nodeItem.NodeType,
                  num: "0人审批",
                  headInfo: [],
                  isAdd: false,
                  checked: false,
                  Multiplayer: 0, //0 单选 1多选
                  originalIndex: newindex,
                  Require: nodeItem.Require,
                });
              }
            });
            self.initCheckUser(); //加载默认选中人员
            self.lineData = result.data.data;
          } else {
            dsf.layer.toast(result.data.message);
          }
        });
    },
    //获取所有角色
    // _initRoleList(option, arr){
    // 	if (option.RoleID) {
    // 		arr.push(option);
    // 	}
    // 	return Array.from(new Set(arr));
    // },
    // 获取所有联系人
    _initUserlist(option, arr) {
      if (option.UserID) {
        //节点类型为用户
        arr.push(option);
      } else if (option.RoleID && option.Type == "2") {
        //节点类型为角色
        arr.push(option);
      } else {
        if (option.Node instanceof Array) {
          option.Node.map((i) => {
            this._initUserlist(i, arr);
          });
        } else if (option.Node) {
          this._initUserlist(option.Node, arr);
        } else {
          console.log("空部门");
        }
      }
      return Array.from(new Set(arr));
    },
    autoSend(lineId) {
      if (!this.checkOpinion()) {
        return;
      }
      // 手写签批必签
      if (
        dsf.config.commonFlow &&
        dsf.config.commonFlow.needHandWrite &&
        this.formData.allowEditOpinion > 0 &&
        this.havetoHandWrite == 1
      ) {
        if (!this.imgUrl) {
          dsf.layer.toast("请签名", false);
          return;
        }
      }
      this.getFlowNodeUsers(lineId, true);
    },
    //发送流程
    async sendFlow(info) {
      if (this.$parent.$parent.spHandleJS.beforeRealSend) {
        // 发送前根据选择节点人员信息进行拦截
        await this.$parent.$parent.spHandleJS.beforeRealSend(info.nodeInfo, this.$parent.$parent)
      }
      let self = this;
      let arr = [];
      let isBanJie = false;
      self.node_list.map((i) => {
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
        a["SendMode"] = a.Multiplayer.SendMode;
        a["exInfo"] = "";
        //节点不需要以下2个参数，会造成传输文件过大，后台会自行根据节点信息重新获取
        a["RangeRule"] = {};
        a["SendRangeTree"] = {};
        //补全参数
        /* a["NodeID"] = arr[0]["NodeID"];
                                                a["LineName"] = arr[0]["LineName"];
                                                a["NodeName"] = arr[0]["NodeName"];
                                                a["LineID"] = arr[0]["LineID"]; */
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
      // self.dsf.layer.toast("发送成功", true);
      // self.showDialog = false;
      // self.$emit("close");
      // self.$emit("change");
      // self.$emit("golist");
      // return;
      if (self.batchSend) {
        dsf.layer.closeLoading(self._loadingSend);
        self.$emit('firstBatchSend', arr)
        return
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
    //保存意见
    saveOpinion(info, isSend = true) {
      debugger;
      this._loadingSend = dsf.layer.loading();
      // this.$emit("close");
      let self = this;
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
          .then(function (result) {
            if (!result.data.result) {
              self.dsf.layer.toast(result.data.message, false);
            } else if (isSend) {
              if (dsf.config.commonFlow?.canSwitchOpinionMode && self.$refs.idealEdit.opinionMode == 'input') {
                self.delHandWrite()
              }
              self.sendFlow(info);
            } else {
              if(info.contentValue || self.sendFileOpintion || self.imgUrl){
                self.$emit("initData");
              }
              dsf.layer.closeLoading(self._loadingSend);
            }
          })
          .catch(() => {
            dsf.layer.closeLoading(self._loadingSend);
          });
      } else if (isSend) {
        self.sendFlow(info);
      }
    },
    async checkUser(user, item, index, $event) {
      if (index || index==0) {
        this.checkedNodeIndex = index
      }
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
      let self = this;
      // if (this.nodeIsyu && $event) {
      //     $event.stopPropagation();
      // }
      // 节点选择之前的逻辑处理
      if (
        self.$parent.$parent.spHandleJS &&
        self.$parent.$parent.spHandleJS.checkNodeFilter
      ) {
        try {
          if (self.$route.name.includes("commonForm")) {
            await self.$parent.$parent.spHandleJS.checkNodeFilter(
              self.$parent.$parent.formData,
              self.formMeta,
              self.$parent.$parent,
              item
            );
          } else {
            await self.$parent.$parent.spHandleJS.checkNodeFilter(
              self.formData,
              self.$parent.$parent,
              item
            );
          }
        } catch (error) {
          console.log(error);
          return;
        }
      }
      //此处应该不区分与分支还是或分支   只要有事件函数就阻止冒泡事件 2022年1月21日02:07:50 @Ly
      // if ($event) {
      //   $event.stopPropagation();
      // }

      //将节点选中  此处事件冒泡
      //console.log("item.checked",item.checked)
      if (!item.checked) {
        self.deptAndUsers.forEach((base, num) => {
          if (base.lineID == item.lineID) {
            //此处改成线的id，用名字判断会有bug 2022年1月14日11:03:44 @luy
            self.$set(base, "checked", true);
            self.checkedNodeIndex = num;
          } else {
            if (!self.nodeIsyu) {
              //非与节点时候需要清空另外节点人员和选中
              if (item.nodeType != "7") {
                if (base.nodeType != "7") {
                  self.$set(base, "checked", false);
                  base.headInfo.forEach((h) => {
                    self.$set(h, "checked", false);
                  });
                  base.checkedUserList = [];
                }
              }
            }
          }
        });
      }

      if (
        item.Multiplayer == "0" &&
        item.checkedUserList.length > 0 &&
        (!user.checked || typeof user.checked == "undefined")
      ) {
        //单选
        item.headInfo.forEach((u) => {
          self.$set(u, "checked", false);
        });
        item.checkedUserList = [];
      }
      self.$set(user, "checked", !user.checked);

      if (user.checked) {
        if (user.Type == "2") {
          //按部门+角色发送
          if (
            self.checkedUserList.length == 0 ||
            self.checkedUserList.findIndex((u) => {
              return (
                u.UserID == user.UserID &&
                u.RoleID == user.RoleID &&
                u.DeptID == user.DeptID
              );
            }) == -1
          ) {
            item.checkedUserList.push(user);
          }
        } else if (
          !item.checkedUserList.find(
            (u) => u.UserID == user.UserID && u.DeptID == user.DeptID
          )
        ) {
          item.checkedUserList.push(user);
        }
      } else {
        let idx = item.checkedUserList.findIndex(
          (u) => u.UserID == user.UserID && u.DeptID == user.DeptID
        );
        if (idx > -1) item.checkedUserList.splice(idx, 1);
        //没人时取消节点选中 2023年1月4日20:13:59 @xiaochy
        if (item.checkedUserList.length == 0) self.$set(item, "checked", false);
      }

      if (!this.isShowDefaultUser && item.secHeadInfo) {
        let index = item.secHeadInfo.findIndex((u) => !u.checked);
        item.secHeadInfo.splice(index, 1);
      }

      self.deptAndUsers.forEach((ele) => {
        // 多节点切换时，将未选中节点选中人数据清空
        if (!ele.checked && ele.secHeadInfo) self.$delete(ele, "secHeadInfo");
      });
    },
    //计算数量
    getCheckNum(item) {
      let result = 0;
      if (!item.checked) {
        return result;
      }
      item.headInfo.forEach((cell) => {
        if (cell.checked) {
          result++;
        }
      });
      //console.log("calc");
      return result;
    },
    //判断样式
    getClass(item, parent) {
      if (!parent.checked) {
        return false;
      }
      let self = this;
      //console.log("time");
      let result = false;
      for (let i = 0; i < parent.checkedUserList.length; i++) {
        if (item.Type == "2") {
          //按部门+角色发送
          //console.log("item.id == this.checkedUserList[i].id",item.id == parent.checkedUserList[i].id)
          console.log(
            "item.DeptID==this.checkedUserList[i].DeptID",
            item.DeptID + "," + parent.checkedUserList[i].DeptID
          );
          if (
            item.id == parent.checkedUserList[i].id &&
            item.DeptID == parent.checkedUserList[i].DeptID &&
            item.RoleID == parent.checkedUserList[i].RoleID
          ) {
            result = true;
            break;
          }
        } else {
          if (
            item.id == parent.checkedUserList[i].id &&
            item.DeptID == parent.checkedUserList[i].DeptID
          ) {
            result = true;
            break;
          }
        }
      }
      return result;
    },
    goBackNode() {
      this.node_list = [];
      this.selectIndex = 0;
      this.deptAndUsers = [];
      this.checkedUserList = [];
      this.nowNodeType = "normal";
      this.nodeIsyu = false;
      this.getFlowNodes();
    },
    getIconClass(itx) {
      if (itx.isHaveIcon) {
        if (itx.judge) {
          return "_head_img _icon_fault";
        }
        return "_head_img _icon_right";
      }
      return "_head_img";
    },
    async checkNode(index, handleType, params) {
      console.log(index);
      let self = this;
      self.checkedNodeIndex = index;
      let tempNode = self.deptAndUsers.find((item, itemIndex) => {
        return index == itemIndex;
      });
      // 节点选择之前的逻辑处理
      if (
        self.$parent.$parent.spHandleJS &&
        self.$parent.$parent.spHandleJS.checkNodeFilter &&
        !params
      ) {
        try {
          if (self.$route.name.includes("commonForm")) {
            await self.$parent.$parent.spHandleJS.checkNodeFilter(
              self.$parent.$parent.formData,
              self.formMeta,
              self.$parent.$parent,
              tempNode
            );
          } else {
            await self.$parent.$parent.spHandleJS.checkNodeFilter(
              self.formData,
              self.$parent.$parent,
              tempNode
            );
          }
        } catch (error) {
          console.log(error);
          return;
        }
      }
      if (tempNode && tempNode.IsAutoSend == "1") {
        if (handleType == "man") {
          self.autoSend(tempNode.lineID);
        }
        return;
      }

      let nowCheckItem = {};
      if (!self.nodeIsyu) {
        //或节点处理逻辑
        if (tempNode.nodeType != "7") {
          self.deptAndUsers.forEach((item, num) => {
            // delete item.secHeadInfo;
            if (index != num) {
              if (item.nodeType != "7") {
                self.$set(item, "checked", false);
                item.headInfo.forEach((row) => {
                  self.$set(row, "checked", false);
                });
                item.checkedUserList = [];
                delete item.secHeadInfo;
              }
            } else {
              nowCheckItem = item;
              self.$set(item, "checked", true);
              //判断节点下人员数量  只有一个时默认选中
              if (item.headInfo.length == 1) {
                self.$set(item.headInfo[0], "checked", true);
                item.checkedUserList = [item.headInfo[0]];
                item.secHeadInfo = [item.headInfo[0]];
              } else {
                if (item.secHeadInfo?.length > 0) return // 已有选中人员不再做处理
                item.secHeadInfo = [];
                try {
                  item.headInfo.forEach((it, index) => {
                    if (it.Selected == "1" || it.Selected == "2") {
                      if (this.nodeDisplayType == 'showSimple' || item.headInfo.length > 3) item.secHeadInfo.push(it);
                      if (
                        !item.checkedUserList.find(
                          (u) => u.UserID == it.UserID && u.DeptID == it.DeptID
                        )
                      ) {
                        this.$set(it, "checked", true);
                        item.checkedUserList.push(it);
                      }
                      if (item.Multiplayer == 0) throw new Error();
                    }
                  });
                } catch (e) {
                  console.log("跳出循环", e);
                }
                if (item.secHeadInfo.length == 0) delete item.secHeadInfo;
              }
            }
          });
        } else {
          nowCheckItem = tempNode;
          self.$set(tempNode, "checked", true);
          //判断节点下人员数量  只有一个时默认选中
          if (tempNode.headInfo.length == 1) {
            self.$set(tempNode.headInfo[0], "checked", true);
            tempNode.checkedUserList = [tempNode.headInfo[0]];
          }
        }
      } else {
        //与节点处理
        self.deptAndUsers.forEach((item, num) => {
          if (index == num) {
            nowCheckItem = item;
            if (!item.checked) {
              self.$set(item, "checked", true);
              //判断节点下人员数量  只有一个时默认选中
              if (item.headInfo.length == 1) {
                self.$set(item.headInfo[0], "checked", true);
                item.checkedUserList = [item.headInfo[0]];
                item.secHeadInfo = [item.headInfo[0]];
              } else {
                item.secHeadInfo = [];
                try {
                  item.headInfo.forEach((it, index) => {
                    if (it.Selected == "1" || it.Selected == "2") {
                      if (this.nodeDisplayType == 'showSimple' || item.headInfo.length > 3) item.secHeadInfo.push(it);
                      if (
                        !item.checkedUserList.find(
                          (u) => u.UserID == it.UserID && u.DeptID == it.DeptID
                        )
                      ) {
                        this.$set(it, "checked", true);
                        item.checkedUserList.push(it);
                      }
                      if (item.Multiplayer == 0) throw new Error();
                    }
                  });
                } catch (e) {
                  console.log("跳出循环", e);
                }
                if (item.secHeadInfo.length == 0) delete item.secHeadInfo;
              }
            } else {
              self.$set(item, "checked", false);
              item.headInfo.forEach((row) => {
                self.$set(row, "checked", false);
              });
              item.checkedUserList = [];
              delete item.secHeadInfo;
            }
          }
        });
      }
      // this.checkedUserList = [];
      // this.deptAndUsers.forEach((item) => {
      //     item.headInfo.forEach((user) => {
      //         if (user.checked) {
      //             if (user.Type == "2") {
      //                 if (item.checkedUserList.findIndex((u) => u.RoleID == user.RoleID && u.UserID == user.UserID && u.DeptID == user.DeptID) == -1) {
      //                     item.checkedUserList.push(user);
      //                 }
      //             } else {
      //                 if (item.checkedUserList.findIndex((u) => u.UserID == user.UserID && u.DeptID == user.DeptID) == -1) {
      //                     item.checkedUserList.push(user);
      //                 }
      //             }

      //         }
      //     });
      // });
      // // 重新选中节点，之前选中的人员重新选中
      // if (
      //   tempNode.checkedUserList &&
      //   tempNode.checkedUserList.length == 0 &&
      //   tempNode.secHeadInfo &&
      //   tempNode.secHeadInfo.length > 0
      // ) {
      //   self.$set(tempNode, "checkedUserList", tempNode.secHeadInfo);
      // }

      if (tempNode.nodeType == "7") {
        if (self.AgainClickArr.length == 0) {
          self.deptAndUsers.forEach((ele, i) => {
            self.AgainClickArr.push("2");
          });
        }
        //抄送节点可取消选中
        if (
          !params &&
          tempNode.checkedUserList.length > 0 &&
          self.AgainClickArr[index] == 1
        ) {
          self.$set(tempNode, "checked", false);
          self.$set(tempNode, "checkedUserList", []);
          self.$delete(tempNode, "secHeadInfo");
          self.selectIndex = null;
        }
        // 抄送节点可取消选中，但浅拷贝，无法判断第一次点击还是第二次点击，AgainClickArr存储每个节点的点击状态
        if (!params && self.AgainClickArr[index] == 1) {
          self.$set(tempNode, "checked", false);
          tempNode.headInfo.forEach((ele) => {
            self.$set(ele, "checked", false);
          });
          self.AgainClickArr[index] = 2;
        } else {
          self.$set(tempNode, "checked", true);
          self.AgainClickArr[index] = 1;
        }
      }
      if (nowCheckItem.nodeType == "3" && handleType != "auto") {
        //如果是跳转节点，显示后续节点

        let nowCheckItemNextNodeLines = "";
        let nextLine = [];
        self.node_list.forEach((line) => {
          if (line.LineID == nowCheckItem.lineID) {
            //此处改成线的id，用名字判断会有bug 2022年1月14日11:03:44 @luy
            nextLine = line.NextNodes.Line;

            nextLine.forEach((nextNode, index) => {
              nowCheckItemNextNodeLines += nextNode.LineID + ",";
            });
            // 跳转节点强制开启与分支
            self.nodeIsyu = true;
            // if (line.OutLineType && line.OutLineType == "1") {
            //   // 后续是与节点
            // self.nodeIsyu = true;
            // }
          }
        });
        await self.getFlowNodeUsers(nowCheckItemNextNodeLines, false, index);

        self.node_list = [];
        self.deptAndUsers = [];
        self.nowNodeType = "redirect";
        self.node_list = nextLine;
        //此处不需要循环调用，已经在上面第五行代码一次性调用完成。2022年1月20日16:54:59 @ly
        // nextLine.forEach((cell, index) => {
        //     //办结节点不要调接口  会导致文件自动办结
        //     if (cell.NodeType == "1" && cell.IsAutoSend != "1") {
        //         self.lineNum++;
        //        // self.getFlowNodeUsers(cell.LineID, false, index);
        //     } else {
        //         //办结节点 或者跳转节点
        //         self.deptAndUsers.push({
        //             title: cell.ShowName,
        //             lineID: cell.LineID,
        //             IsAutoSend: cell.IsAutoSend,
        //             nodeType: cell.NodeType,
        //             num: "0人审批",
        //             headInfo: [],
        //             isAdd: false,
        //             checked: false,
        //             Multiplayer: 0, //0 单选 1多选
        //             originalIndex: index
        //         });
        //     }
        // });
      }
    },
    trimTip(idealEditValue) {
      return idealEditValue.replace(/(^\s*)|(\s*$)/g, ""); // 去除首尾空格
    },
    checkOpinion(notip) {
      if (this.formParams.isSign == 1 || !this.formParams.sendCheck) {
        //如果是签字意见或者意见验证过意见的  直接返回true  验证通过，发送界面不做校验
        return true;
      }
      if (this.formData.sendType == "SR_EXSEND") {
        // 增发不需要意见必填
        return true;
      }
      if (this.isShowWriteOpintionBtn) {
        if (
          this.currentOpintion.length < 1 &&
          this.formData.opinionRequired > 0
        ) {
          if (notip == undefined) {
            dsf.layer.toast("请填写审批意见", false);
          }
          return false;
        }
      } else if (
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
      return true;
    },
    sendFileFlow() {
      if (this.isShowFuyan && this.fuyan) {
        this.saveHandleTip();
      }
      if (!this.checkOpinion()) {
        return;
      }
      // 手写签批必签
      if (
        dsf.config.commonFlow &&
        dsf.config.commonFlow.needHandWrite &&
        this.formData.allowEditOpinion > 0 &&
        this.havetoHandWrite == 1
      ) {
        if (!this.imgUrl) {
          dsf.layer.toast("请签名", false);
          return;
        }
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
      console.log(this.checkedNodeIndex);
      console.log(this.deptAndUsers);
      this.saveOpinion({
        nodeName: this.deptAndUsers[this.checkedNodeIndex]["title"],
        checkedUser: this.checkedUserList,
        contentValue: this.$refs.idealEdit ? this.$refs.idealEdit.value : "",
        nodeInfo: nodeInfo,
      });
    },
    closePop() {
      this.$emit("close");
      this.showDialog = false;
      this.showContent = false;
    },
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
    clearDate() {
      this.currentLine.TimeLimit = "";
      this.showCalendar = false;
    },
    filter(type, options) {
      if (type === "minute") {
        return options.filter((option) => option % 15 === 0);
      }
      return options;
    },
    saveHandleTip() {
      dsf.http
        .post("fn/flowHandleTip/saveHandleTip", {
          pnId: this.formData.pnid,
          handleTipsRange: this.fuyanRadio,
          handleTip: this.fuyan,
        })
        .then((res) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.van-nav-bar {
  height: 44px;
  @include font-theme("normal");

  .van-nav-bar__title {
    @include font_4;
    color: #000;
  }

  .van-icon-arrow-left {
    color: #000;
    font-weight: 600;
    font-size: 1.5em;
  }
}

::v-deep.van-field {
  .van-cell__value {
    @include font_6;
    color: $fontColor;
  }
}

::v-deep.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: none;
}

.send-file {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #f3f3f3;
  text-align: initial;
  z-index: 999;

  .van-nav-bar {
    border-bottom: 2px solid #f1f2f4;
  }

  * {
    box-sizing: border-box;
  }

  .opinionRequired {
    border: 1px solid #ef8e8e;
  }

  .disfr {
    display: flex;
  }

  .jsb {
    justify-content: space-between;
    align-items: center;
  }

  .returnBtn {
    // margin-right: 15px;
    line-height: 24px;
  }

  ._content {
    height: calc(100% - 44px);
    overflow-y: auto;
    position: relative;
    box-sizing: border-box;
    padding-bottom: 1.66rem;
    .idealEdit {
      overflow: hidden;
      margin: 10px;
      background-color: #fff;
    }
    ._file_preview {
      @include background-theme("button_auxiliary_bgcolor");
      margin-bottom: 15px;
      padding: 8px 15px 8px;
      // height: 273px;
      display: flex;
      flex-direction: column;
      max-height: 270px;
      overflow-y: scroll;

      ._sure_pre {
        position: fixed;
      }
    }
    .top_title {
      margin: 10px;
      @include font-theme("normal");
    }

    ._send_who {
      .disableStatus {
        display: none !important;
      }

      ._options {
        ._option {
          border: 2px solid;
          @include border-color-theme("normal");
          @include background-theme("button_auxiliary_bgcolor");
          padding: 10px;
          margin: 0 10px 10px;
          border-radius: 3px;

          &:last-child {
            margin-bottom: 0;
          }
          ._Node {
            display: flex;
            justify-content: space-between;
            // align-items: center;
          }
          ._title {
            // width: 100px;
            display: flex;
            flex-flow: column;
            ._num {
              margin-top: 5px;
              font-size: var(--font_size_4);
              color: $fontColor_sub;
            }
          }

          ._righ {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            align-items: flex-start;
            padding-left: 15px;
            box-sizing: border-box;
            flex-shrink: 0;
            i {
              @include font-theme("normal");
            }
            .addicon {
              font-size: var(--font_size_0);
              border: 1px dashed;
              border-radius: 3px;
              padding: 6px;
            }
            ._head_img {
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
                // margin-bottom: 5px;
              }

              .van-icon-clear {
                position: absolute;
                top: -6px;
                right: -1px;
                font-size: var(--font_size_3);
              }

              .van-icon-checked {
                position: absolute;
                top: -6px;
                right: -1px;
                font-size: var(--font_size_3);
                color: green;
              }

              .noChecked {
                color: #cecece;
              }
            }

            ._icon_fault {
              position: relative;
              display: inline-block;

              // &:after {
              //   content: "";
              //   position: absolute;
              //   top: 0;
              //   right: 0;
              //   width: 13px;
              //   height: 13px;
              //   background: url("./../../assets/imgs/wait.png");
              //   background-size: 100% 100%;
              // }
            }

            ._icon_right {
              position: relative;
              display: inline-block;

              // &:after {
              //   content: "";
              //   position: absolute;
              //   top: 0;
              //   right: 0;
              //   width: 13px;
              //   height: 13px;
              //   background: url("./../../assets/imgs/finish.png");
              //   background-size: 100% 100%;
              // }
            }
          }
        }
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
        img.header {
          opacity: 0.2;

          &.state {
            opacity: 1;
          }
        }

        ._gray {
          border: none;

          ._fon {
            color: #999;
          }

          ._num {
            color: #999;
          }

          ._righ {
            i {
              color: rgba(43, 139, 241, 0.4);
            }
            .addicon {
              font-size: var(--font_size_0);
              border: 1px dashed;
              border-radius: 3px;
              padding: 6px;
              color: #999;
            }
            ._head_noimg {
              width: 40px;
            }

            ._head_img {
              img {
                opacity: 0.2;

                &.state {
                  opacity: 1;
                }
              }

              ._font {
                color: #999;
                text-align: center;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
      .simpleOptions {
        ._option {
          padding: 10px 5px;
          border: 0;
          margin: 0 10px;
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
          ._title {
            flex: 5;
            min-width: 0;
          }
          .ds_font4_m {
            font-weight: normal;
            i {
              color: var(--normal);
              font-size: 20px;
              vertical-align: bottom;
            }
          }
          ._righ {
            flex: 2;
            align-items: center;
            color: #999;
            ._head_img {
              flex-direction: row;
              max-width: fit-content;
              margin-right: 5px;
              flex: 1;
              width: 0;
              ._font{
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
      ._check {
        display: flex;
        margin: 0.3rem;
        align-items: center;

        ._circle {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          border: 2px solid #cfcfcf;
          margin-right: 5px;
        }

        .van-icon {
          width: 16px;
          height: 16px;
          font-size: var(--font_size_4);
          margin-right: 6px;
        }

        span {
          margin-left: 0.15rem;
        }
      }

      ._allOptions {
        ._option {
          border: 1px solid;
          @include border-color-theme("normal");
          background-color: #fff;
          padding: 10px 16px;

          &:not(:last-child) {
            margin-bottom: 15px;
          }

          ._top {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title {
              padding-right: 10px;
              font-weight: 600;
            }

            .num {
              @include font-theme("normal");
              flex: 1;
            }

            .right {
              @include font-theme("normal");
            }

            .addbox {
              padding: 4px 20px;
              border: 1px solid;
              border-radius: 30px;
              @include border-color-theme("normal");
            }
          }

          ._bottom {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -4px;

            ._select {
              width: calc(25% - 4px);
              background-color: #eee;
              border-radius: 30px;
              padding: 4px 2px;
              margin: 4px 2px;
              font-size: var(--font_size_4);
              display: flex;
              align-items: center;

              img {
                width: 16px;
                height: 16px;
                display: inline-block;
              }

              ._font {
                flex: 1;
                font-size: 13px;
              }

              .userImg {
                display: inline-block;
                width: 24px;
                height: 24px;
                @include background-theme("normal");
                border-radius: 50%;
                font-size: 10px;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }

        ._gray {
          border: none;
        }
      }
    }

    .handleWriteBox {
      padding: 0 15px;
      background: white;
      font-size: var(--font_size_2);
      // margin: -10px 10px 10px;
      .writeContent {
        text-align: center;

        img {
          display: inline-block;
        }
      }

      .writeBtn {
        text-align: right;
        // margin-top: 10px;
      }
    }
  }

  ._footer {
    bottom: 0;
    height: 1.2rem;
    width: 100%;
    position: fixed;
    @include background-theme("button_auxiliary_bgcolor");
    display: flex;
    align-items: center;
    padding: 0 12px;

    ._btn {
      flex: 1;
      border-radius: 3px;

      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}

.esignBtnBox {
  display: flex;

  ::v-deep .van-button {
    flex: 1;
    margin: 10px;
  }
}

.more {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.esignBox {
  // padding: 10px 10px 0;

  .esignTitle {
    text-align: center;
  }

  .esignWrap {
    overflow: hidden;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.09);
  }
}

.sms-container {
  background-color: #fff;
  margin: 10px;
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
.fuyan {
  margin: 10px;
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
</style>
