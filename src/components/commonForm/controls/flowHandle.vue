<template>
  <div class="flowHandle">
    <div class="control_label">
      <span class="tiptitle">办理提示&nbsp;&nbsp;可见范围：</span>
      <div v-if="!readonly">
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio
            icon-size="16px"
            :name="item.codevalue"
            v-for="(item, index) in handleTipCode"
            :key="index"
            @click="checkRange(item)"
            >{{ item.codename }}</van-radio
          >
        </van-radio-group>
        <transition name="fade">
          <van-checkbox
            v-model="readDel.checked"
            v-if="isShowReadDel"
            icon-size="16px"
            shape="square"
            >阅后即焚</van-checkbox
          >
        </transition>
      </div>
      <transition name="fade">
        <div v-if="isShowControlUser">
          <controlUser
            :meta-data="userMetaData"
            v-model="selectUser"
          ></controlUser>
        </div>
      </transition>
    </div>
    <div class="input-box">
      <van-field
        :class="{ controlTextBox: !readonly }"
        v-model="metaData.extra.handleTips"
        :rows="readonly ? 1 : 3"
        :border="controlData.border"
        :disabled="controlData.disabled"
        :clearable="controlData.clearable"
        :error-message="controlData.errorMessage"
        :placeholder="controlData.placeholder"
        :input-align="controlData.inputAlign"
        :left-icon="controlData.leftIcon"
        :right-icon="controlData.rightIcon"
        :rules="controlData.rules"
        :formatter="controlData.formatter"
        :readonly="readonly"
        @input="inpFn"
        type="textarea"
        @focus="toFocus('focus', $event)"
        @clear="toClear('clear', $event)"
        @click="toClick('click', $event)"
        @blur="toBlur('blur', $event)"
        :name="metaData && metaData.metaId ? metaData.metaId : ''"
      >
        <template #button>
          <slot name="button"></slot>
        </template>
      </van-field>
      <div class="mould" v-if="!readonly">
        <div class="mould-button" @click="idealClick()">常用意见</div>
      </div>
    </div>
    <div class="mould" v-if="!readonly">
      <div class="_file_log">
        <van-tag
          v-for="(item, index) in tempTags"
          :key="index"
          class="_file_tags"
          size="medium"
          type="primary"
          :closeable="true"
          @close="clearTags(item)"
          @click="addContent(item)"
          >{{ item.context }}</van-tag
        >
        <span
          v-if="tags.length > 2"
          class="show-more"
          @click="showMore = !showMore"
          >{{ showMore ? "收起" : "更多" }}</span
        >
      </div>
    </div>
    <van-popup
      v-model:show="showIdeal"
      position="bottom"
      round
      :style="{ height: '80%' }"
      get-container="#app"
    >
      <div class="ideal" style="width: 100%; height: 100%">
        <van-nav-bar title="意见维护" :left-text="`共${this.tags.length}条`">
        </van-nav-bar>
        <draggable
        group="people"
          class="list-group"
          ghost-class="ghost"
          chosenClass="chosen"
          v-model="tags"
          animation="200"
          handle=".sort"
          @sort="onEnd"
        >
          <div
            class="list-group-item"
            v-for="(item, index) in tags"
            :key="index"
            @click.stop="tagClick(item.context)"
          >
            <span>{{ item.context }}</span>
            <van-icon v-if="!dsf.config.commonForm.hideSendOpinionOrder" name="sort" color="#666666" size="15" class="sort" />
            <van-icon name="close" size="20" @click.stop="clearTags(item)" />
          </div>
        </draggable>
        <div class="footer-btn">
          <input type="text" v-model="newTagValue" placeholder="请输入意见" />
          <van-button type="primary" @click="addTemplate">添加</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import propMixin from "./mixin";
import controlUser from "./controlUser";
// import draggable from "vuedraggable";
export default {
  name: "controlTextBox",
  mixins: [propMixin],
  components: {
    controlUser,
    "draggable": () => import("vuedraggable"),
  },
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    formMeta: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    subFormIndex: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      bindValue: this.value.value,
      controlData: {
        begin: 0,
        end: 10,
        defaultValue: "编号",
        inputType: null, //类型
        clearable: true, //删除按钮
        leftIcon: "", //左icon
        rightIcon: "", //右icon
        // formatter:this.formatternum,//验证函数
        inputAlign: "right",
        errorMessage: "", //底部错误提示文案
        rules: [], //,{required: true, message: '超出最大长度',validator:this.validatorFn}
        placeholder: "",
        maxlength: "",
        readonly: false,
      },
      reg: [],
      ifSuccess: false,
      tags: [],
      showWrite: false,
      formParameters: null,
      lineWidth: 6,
      lineColor: "#000000",
      bgColor: "white",
      isCrop: false,
      imgUrl: "",
      flowinfo: {},
      flowKey: "",
      pk: this.$route.params.pk,
      shuiyin_div: null, //动态添加的水印dom
      showMore: false,
      handleTipCode: [], //办理环节
      handleNextNodeReadDel: 0, //阅后即焚
      radio: "0", //选中值
      isShowReadDel: true,
      readDel: {
        name: "阅后即焚",
        checked: false,
      },
      isShowControlUser: false, //是否显示特定人员选人
      selectUser: {
        value: "",
      },
      userMetaData: {
        //特定人员-选人控件
        controlId: "DyOe8jLTFlV6l8gp",
        controlType: "controlUser",
        defaultValue: {
          //value: "{\"schema\":\"5::200903184931XZGKP7soZ0VCywkQ6tT\",\"text\":\"测试部门1\",\"value\":\"200903184931XZGKP7soZ0VCywkQ6tT\"}"
        },
        enumData: [],
        extra: {
          multiple: true,
          showLabel: "true",
          srcControl: "controlUser",
          srcControlClass: "ControlUser",
          srcControlName: "oa.controluser",
          tabs: [],
        },
        label: "特定人员",
        metaId: "",
        placeholder: "请选择",
        privilege: {
          visible: true,
          editable: true,
        },
        restrict: {},
        showLabel: true,
        showLable: true,
        validator: {},
      },
      showIdeal: false,
      newTagValue: "",
    };
  },
  computed: {
    tempTags() {
      return this.showMore ? this.tags : this.tags.slice(0, 2);
    },
  },
  watch: {
    value(val) {
      this.bindValue = this.value.value;
    },
    selectUser: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (oldValue) {
          this.inpFn();
        }
      },
    },
    readDel: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (oldValue) {
          this.inpFn();
        }
      },
    },
  },
  created() {
    this.readonly = !this.metaData.privilege.editable;
    this.handleTipCode = this.metaData.extra.handleTipCode;
    this.handleNextNodeReadDel = this.metaData.extra.handleNextNodeReadDel;
    if (this.handleNextNodeReadDel) {
      this.readDel.checked = true;
    }
    this.userMetaData.extra.tabs = this.metaData.extra.rangeTab;
    this.userMetaData.extra.multiple = this.metaData.extra.rangeMultiple;

    this.getAdvice();
    let user = dsf.util.loadSessionStore("user");
    this.$nextTick(() => {
      this.formParameters = this.findForm(this).formMeta.parameters;
      if (this.pk) {
        this.flowKey = `flow-${this.pk}-${this.formParameters.pId}-${this.formParameters.pnId}`;
        if (this.formData.flowinfo) {
          this.flowinfo = this.formData.flowinfo;
        } else {
          this.flowinfo = {
            [this.flowKey]: {
              id: this.formParameters.pnId,
              fid: this.formParameters.pnId,
              infoId: this.pk,
              pid: this.formParameters.pId,
              pnid: this.formParameters.pnId,
              nodeId: this.formParameters.nodeId,
              wfId: this.formParameters.flowId,
              opinionContent: "",
              handwritePic: "",
              handwriteThumb: "",
              nodeName: this.formParameters.nodeName,
              isSign: "0",
              signName: "",
              signTime: "",
              opinionUsers: "",
              opinionUsersText: "",
              duserId: user.user_id,
              duserName: user.name,
              userId: user.user_id,
              userName: user.name,
              opinionFiles: [],
            },
          };
        }
      } else {
        //获取表单数据
        this.flowKey = `flow-${this.formParameters.pk}-0-${this.formParameters.pk}`;
        if (this.formData.flowinfo) {
          this.flowinfo = this.formData.flowinfo;
        } else {
          this.flowinfo = {
            [this.flowKey]: {
              id: this.formParameters.pk,
              fid: 0,
              infoId: this.formParameters.pk,
              pid: 0,
              pnid: this.formParameters.pk,
              nodeId: this.formParameters.nodeId,
              wfId: this.formParameters.flowId,
              opinionContent: "",
              handwritePic: "",
              handwriteThumb: "",
              nodeName: this.formParameters.nodeName,
              isSign: "0",
              signName: "",
              signTime: "",
              opinionUsers: "",
              opinionUsersText: "",
              duserId: user.user_id,
              duserName: user.name,
              userId: user.user_id,
              userName: user.name,
              opinionFiles: [],
            },
          };
        }
      }
      this.inpFn();
      //console.log(this.flowinfo)
    });
  },
  methods: {
    checkRange(val) {
      //console.log(val, this.selectUser, this.radio);
      this.isShowReadDel = false;
      this.isShowControlUser = false;
      if (val.codevalue == 0) {
        this.isShowReadDel = true;
      } else if (val.codevalue == 4) {
        this.isShowControlUser = true;
        this.readDel.checked = false;
      } else {
        this.readDel.checked = false;
      }
      this.inpFn();
    },
    inpFn(val) {
      this.flowinfo[this.flowKey].handleTips = this.metaData.extra.handleTips
        ? this.metaData.extra.handleTips
        : "";
      this.flowinfo[this.flowKey].handleTipsRange = this.radio;
      this.flowinfo[this.flowKey].handleNextNodeReadDel = this.readDel.checked
        ? 1
        : 0;
      if (this.radio == 4) {
        this.flowinfo[this.flowKey].handleTipsSpec = this.selectUser.value;
        this.flowinfo[this.flowKey].handleTipsSpecText = this.selectUser.text;
        this.flowinfo[this.flowKey].handleTipsSpecSchema =
          this.selectUser.schema;
      } else {
        this.flowinfo[this.flowKey].handleTipsSpec = "";
        this.flowinfo[this.flowKey].handleTipsSpecText = "";
        this.flowinfo[this.flowKey].handleTipsSpecSchema = "";
      }

      this.formData.flowinfo = this.flowinfo;
      this.controlData.errorMessage = "";
      this.newTagValue = this.metaData.extra.handleTips;
    },
    toFocus(val) {
      // this.$emit('focus',this.value)
    },
    toClear() {
      // this.$emit('clear',this.value)
    },
    toClick() {
      // this.$emit('clear',this.value)
    },
    // 获取常见意见模板
    getAdvice() {
      if (!this.readonly) {
        dsf.http.get("fn/mobileUsedOpinion/find").then((res) => {
          this.tags = res.data.rows;
        });
      }
    },
    clearTags(item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除吗？",
        })
        .then(() => {
          dsf.http.get("fn/mobileUsedOpinion/delete?id=" + item.id).then(() => {
            this.getAdvice();
          });
        });
    },
    addContent(item) {
      this.metaData.extra.handleTips = item.context;
      this.inpFn();
    },
    addTemplate() {
      if (this.tags.find((item) => this.newTagValue == item.context)) {
        dsf.layer.toast("模板内容已重复");
        return;
      }
      dsf.http
        .post("fn/mobileUsedOpinion/add", {
          __DATA: JSON.stringify({
            opinion: this.metaData.extra.handleTips,
          }),
        })
        .then((data) => {
          dsf.layer.toast("设为模板成功");
          this.newTagValue = "";
          this.getAdvice();
        });
    },
    toBlur() {
      this.metaData.extra.handleTips = this.metaData.extra.handleTips.replace(
        /(^\s*)|(\s*$)/g,
        ""
      ); // 去除首尾空格

      this.inpFn();
    },
    validatorFn(val) {
      //require验证方法
      // if(val.length<this.controlData.begin||val.length>this.controlData.end){
      // 	this.bindValue=''
      // 	this.controlData.errorMessage=this.controlData.rules[1].message
      // }
    },
    tagClick(val) {
      this.metaData.extra.handleTips = val;
      this.showIdeal = !this.showIdeal;
    },
    idealClick() {
      this.showIdeal = !this.showIdeal;
    },
    onEnd() {
      console.log(this.tags);
      this.tags.forEach((ele) => {
        this.ids += ele.id + ",";
      });
      dsf.http
        .post("/fn/mobileUsedOpinion/moveIndex", {
          templateIds: this.ids,
        })
        .then(() => {
          this.getAdvice();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.controlTextBox {
  padding: 0.1rem !important;
  border-radius: 2px;
}

.flowHandle {
  ::v-deep .van-field__control {
    text-align: left;
  }

  ::v-deep .van-field__error-message {
    text-align: right;
    /* display:none; */
  }

  ::v-deep .van-radio {
    margin: 2.5px 5px;
  }

  ::v-deep .van-checkbox {
    margin: 2.5px 5px;
  }

  ::v-deep .control_label {
    font-size: var(--font_size_2) !important;
    padding-bottom: 10px !important;
  }

  .input-box {
    padding-bottom: 3px;
    width: 100%;
    border: 1px solid #e5e5e5;
  }

  // .van-radio__label {}
  // ::v-deep .van-field__control {
  //     font-size: var(--font_size_3) !important;
  // }

  // ::v-deep .tiptitle {
  //     margin-bottom: 5px;
  //     font-size: var(--font_size_2) !important;
  // }
  ::v-deep .van-radio__label {
    margin-left: 5px !important;
    line-height: 24px !important;
  }
}

.mould {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  align-items: flex-start;
  .mould-button {
    margin-right: 3px;
    font-size: var(--font_size_4);
    @include font-theme("normal");
    border: 1px solid;
    @include border-color-theme("normal", true);
    padding: 5px 6px;
    border-radius: 2px;
  }
  .show-more {
    @include font-theme("normal");
  }
}

::v-deep ._file_log {
  // padding-left: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  width: 100%;
  min-height: 50px;
  max-height: 150px;
  overflow-y: auto;
  padding-bottom: 0;

  .van-tag--medium {
    // font-size: var(--font_size_3);
    // @include font-theme("normal", true);
    @include font_6;
    // @include lighter-background-theme("normal", true);
  }
}

._file_tags {
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 3px;
}

._file_tags {
  margin-right: 8px;
  margin-bottom: 8px;
  word-break: break-all;
}

._file_icon {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .iconfont {
    @include font-theme("normal");
    @include font_4;
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.cutLine {
  margin-left: 16px;
  height: 1px;
  background: #e5e5e5;
}

.handleWriteBox {
  padding: 15px;
  padding-right: 0;
  background: white;
  font-size: var(--font_size_2);

  .writeContent {
    text-align: center;

    > img {
      height: 200px;
    }
  }

  .writeBtn {
    text-align: right;
    margin-top: 10px;
  }
}

.esignBtnBox {
  display: flex;

  ::v-deep .van-button {
    flex: 1;
    margin: 10px;
  }
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

.ideal {
  position: relative;
  overflow: hidden;
  .van-nav-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 50px;
    border-bottom: 2px solid #f1f2f4;
  }
  .chosen{
    @include background-theme("normal", true);
    span{
      color: #fff;
    }
  }
  .list-group {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 50px;
    padding: 0 10px;
    width: 100%;
    overflow: auto;
    .list-group-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 8px;
      min-height: 45px;
      border-bottom: 2px solid #f1f2f4;
      > span {
        margin-right: 5px;
        flex: 1;
        font-size: var(--font_size_2);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i{
        width: 20px;
      }
      .van-icon-close{
        margin-left: 15px;
      }
    }
  }

  .footer-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 50px;
    input {
      padding: 0 5px;
      width: calc(100% - 70px);

      height: 40px !important;
      border: 2px solid #f1f2f4 !important;
      &::-webkit-input-placeholder {
        color: #cfd0d2;
      }
    }
    .van-button {
      width: 60px;
      height: 38px;
    }
  }
  .flip-list-move {
    -webkit-transition: -webkit-transform 0.5s;
    transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
    transition: transform 0.5s, -webkit-transform 0.5s;
  }
  .no-move {
    -webkit-transition: -webkit-transform 0s;
    transition: -webkit-transform 0s;
    transition: transform 0s;
    transition: transform 0s, -webkit-transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style><style>
.overlayClass {
  opacity: 0.8;
}
</style>
