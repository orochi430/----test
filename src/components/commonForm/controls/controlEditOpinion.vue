<template>
  <div class="controlEditOpinion" v-click-outside="handleBlur">
    <div class="flex" :style="{ flexDirection: opinionTempDirection }">
      <div class="input-box"
        :style="{ margin: `${opinionTempDirection == 'column' ? '0.2rem' : 0} 0 ${opinionTempDirection != 'column' ? '0.2rem' : 0}` }">
        <van-field :class="[ !readonly ? 'controlTextBox': '' , showOpinionAndBtn? 'controlTextPadding' : '']" v-model="metaData.extra.opinionContent"
          :rows="readonly ? 1 : inputRows" :border="controlData.border" :disabled="controlData.disabled"
          :clearable="controlData.clearable" :error-message="controlData.errorMessage"
          :placeholder="`请在此输入意见或选择${opinionTempDirection == 'column' ? '下' : '上'}方常用意见`"
          :input-align="controlData.inputAlign" :left-icon="controlData.leftIcon" :right-icon="controlData.rightIcon"
          :rules="controlData.rules" :formatter="controlData.formatter" :autosize="controlData.autosize" :readonly="readonly" @input="inpFn"
          type="textarea" @focus="intoView($event), toFocus('focus', $event)" @clear="toClear('clear', $event)"
          @click="toClick('click', $event)" @blur="toBlur('blur', $event)"
          :name="metaData && metaData.metaId ? metaData.metaId : ''" :maxlength="metaData.extra.maxlength ? metaData.extra.maxlength : undefined" show-word-limit>
          <template #button>
            <slot name="button"></slot>
          </template>
        </van-field>
      </div>
      <div class="flex jb ae" v-if="!readonly &&
        metaData.extra.showTemplate &&
        dsf.config.commonForm.commonOpinionStyle != 'pop' &&
        !dsf.config.commonForm.hideSendOpinion
        ">
        <div :class="showOpinionAndBtn ? 'inline_file_log' : '_file_log'">
          <!-- <span style="margin-bottom: 0.2rem;">意见模板：</span> -->
          <van-tag v-for="(item, index) in tempTags" :key="index" :class="['_file_tags', 'elps', showOpinionAndBtn ? '_file_tags_large' : '']" size="medium" type="primary"
            @click="addContent(item)">{{ item.context }}</van-tag>
          <!-- <span
            v-if="tags.length > 2"
            class="show-more"
            @click="showMore = !showMore"
            >{{ showMore ? "收起" : "更多" }}</span
          > -->
        </div>
        <div class="setting" @click="idealClick()">
          {{ opinionShowmoreText }}
        </div>
      </div>
    </div>
    <!-- <div class="setting" @click="idealClick()">
      <img src="static/images/platform/setting.png" alt="">
      意见维护
    </div> -->
    <!-- <div class="cutLine"></div> -->
    <div class="handleWriteBox" v-if="dsf.config.commonFlow && dsf.config.commonFlow.needHandWrite">
      <div class="writeContent">
        <img v-if="imgUrl" :src="imgUrl" alt="" :style="{ width: dsf.config.commonFlow.opinionImgWidth || '50%' }" />
        <!-- <span v-else>暂无签名</span> -->
      </div>
      <div class="writeBtn" :style="{ textAlign: dsf.config.projectName == 'jsgzw' ? 'left' : 'right' }">
        <!-- <van-button
          v-if="dsf.config.commonFlow.isShowDelHandWrite"
          type="primary"
          size="small"
          @click="delHandWrite"
          >清除签批</van-button
        >
        <van-button type="primary" size="small" @click="openWritePopup"
          >手写签批</van-button
        > -->
        <span @click="openWritePopup" style="color: var(--normal);font-size: var(--font_size_3);">手写签批</span>
      </div>
    </div>
    <van-field class="havetoHandWrite" v-if="metaData.show && needHandWrite && havetoHandWrite == 1" v-model="imgUrl"
      name="handWrite" :rules="handWriteRules"></van-field>
    <van-popup v-if="getHW_Type == 'self'" v-model="showWrite" get-container="#app" position="bottom" round>
      <hw :formData="formData" @closeWritePopup="closeWritePopup" isForm="1"></hw>
    </van-popup>
    <div v-show="getHW_Type == 'jg' && showWrite">
      <hwJG ref="HWJG" :hwtype="getHW_Type" :formData="formData" :formMeta="formMeta" @closeWritePopup="closeWritePopup">
      </hwJG>
    </div>
    <van-popup v-model="isShow" position="bottom" get-container="#app" round style="height: 50vh">
      <van-nav-bar title="常用意见" left-text="取消" :right-text="deletable ? '保存' : '删除意见'" @click-left="isShow = false"
        @click-right="deletable = !deletable" placeholder></van-nav-bar>
      <div class="opinion-container">
        <div class="module" v-for="(item, index) in tempTags" :key="index" @click="
          addContent(item);
        isShow = false;
        ">
          <div class="content" :style="{ borderRadius: deletable ? '4px 0 0 4px' : '4px' }">
            {{ item.context }}
          </div>
          <div v-if="deletable" class="btn" @click.stop="clearTags(item)">
            <van-icon name="cross" />
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model:show="showIdeal" position="bottom" round :style="{ height: '80%' }" get-container="#app">
      <div class="ideal" style="width: 100%; height: 100%">
        <van-nav-bar title="意见维护" :right-text="disabled ? '排序' : '取消'" @click-right="onClickRight"
          :left-text="`共${this.tags.length}条`">
        </van-nav-bar>
        <span class="prompt" v-if="!disabled">拖拽排序，默认意见无法排序。</span>
        <draggable group="people" class="list-group" :style="{top: disabled ? '1rem'  : 'calc(1rem + 25px)'}" ghost-class="ghost" chosenClass="chosen" v-model="tags"
          animation="300" @sort="onEnd" :disabled="disabled" filter=".forbid" :move="onMove">
          <div class="list-group-item" v-for="(item, index) in tags" :key="index" @click.stop="tagClick(item.context)"
            :class="item.type == -1 ? 'forbid' : ''">
            <span>{{ item.context }}</span>
            <van-icon v-if="!dsf.config.commonForm.hideSendOpinionOrder && item.type != -1 && !disabled" name="sort"
              color="#666666" size="15" class="sort" />
            <van-icon v-if="item.type != -1 && disabled" name="close" size="20" @click.stop="clearTags(item)" />
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
// 自定义指令，用于处理点击外部区域的事件
const clickOutside = {
  bind(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        // 如果点击事件发生在元素的外部，则触发指令绑定的方法,将点击的event数据传过去
        binding.value(event);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

import propMixin from "./mixin";
import validators from "../validators";
import hw from "@/components/common/OpinionHandWrite";
// import hwJG from "@/components/common/OpinionHandWriteJG";
// import draggable from "vuedraggable";
export default {
  directives: {
    "click-outside": clickOutside,
  },
  mixins: [propMixin],
  model: {
    prop: "value",
    event: "input",
  },
  components: {
    hw,
    'hwJG': () => import('@/components/common/OpinionHandWriteJG'),
    "draggable": () => import("vuedraggable"),
  },
  props: {
    formMeta: {
      type: Object,
      default: () => {
        return {};
      },
    },
    subFormIndex: {
      type: Number,
      default: null,
    },
    showOpinionAndBtn: {
      type: Boolean,
      default: false,
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
        clearable: this.showOpinionAndBtn ? false : true, //删除按钮
        leftIcon: "", //左icon
        rightIcon: "", //右icon
        // formatter:this.formatternum,//验证函数
        inputAlign: "right",
        errorMessage: "", //底部错误提示文案
        rules: [], //,{required: true, message: '超出最大长度',validator:this.validatorFn}
        placeholder: "",
        maxlength: "",
        readonly: false,
        autosize: this.showOpinionAndBtn ? { maxHeight: 75 } : false
      },
      reg: [],
      ifSuccess: false,
      tags: [],
      showWrite: false,
      formData: null,
      lineWidth: 6,
      lineColor: "#000000",
      bgColor: "white",
      isCrop: false,
      imgUrl: "",
      flowinfo: {},
      flowKey: "",
      pk: this.$route.params.pk,
      shuiyin_div: null, //动态添加的水印dom
      showMore: true,
      needHandWrite:
        dsf.config.commonFlow && dsf.config.commonFlow.needHandWrite, //是否需要手写签批
      havetoHandWrite: dsf.config.setting["SYS-MOBILE-FORM-0011"] || "-1", //手写签批必签
      handWriteRules: [
        {
          message: "手写签批不能为空",
          required: true,
        },
      ],
      isShow: false,
      deletable: false,
      showIdeal: false,
      newTagValue: "",
      isDefaultRequired: false,
      inputRows: this.showOpinionAndBtn ? 1 : 3,
      opinionTempDirection: dsf.config.commonFlow?.opinionTempDirection || 'column',
      opinionShowmoreText: dsf.config.commonFlow?.opinionShowmoreText || '更多',
      opinionObj: {},
      disabled: true,
    };
  },
  computed: {
    tempTags() {
      return this.showMore ? this.tags : this.tags.slice(0, 2);
    },
    getHW_Type() {
      return dsf.config.setting.hasOwnProperty("SYS-MOBILE-FORM-0003")
        ? dsf.config.setting["SYS-MOBILE-FORM-0003"] || "self"
        : "self";
    },
  },
  watch: {
    value(val) {
      this.bindValue = this.value.value;
    },
    "metaData.extra.opinionContent"(val) {
      this.opinionObj.opinionContent = val;
      this.$emit("controlEditOpinion", { key: this.flowKey, value: this.opinionObj });
      this.controlData.errorMessage = "";
      if (this.$route.query.todoId) {
        let localOpnions = dsf.util.loadLocalStore('opnions') || {}
        localOpnions[`${this.$route.params.pk}_${this.$route.query.todoId}_${this.metaData.extra.customNode || ''}`] = val
        dsf.util.saveToLocalStore('opnions', localOpnions)
      }
    },
    imgUrl(val) {
      if (this.isDefaultRequired) {
        if (val) {
          this.$delete(this.metaData.validator, 'required')
        } else {
          this.$set(this.metaData.validator, 'required', {})
        }
      }
    }
  },
  created() {
    this.isDefaultRequired = !!this.metaData.validator.required
    this.readonly = !this.metaData.privilege.editable;
    this.getAdvice();
    let user = dsf.util.loadSessionStore("user");
    if (this.metaData.extra.handwritePic) {
      this.imgUrl = dsf.url.getServerUrl(this.metaData.extra.handwritePic);
    }
    let localopnion = ''
    this.$nextTick(() => {
      this.formData = this.formMeta.parameters;
      if (this.$route.query.todoId) {
        let localOpnions = dsf.util.loadLocalStore('opnions') || {}
        localopnion = localOpnions[`${this.$route.params.pk}_${this.$route.query.todoId}_${this.metaData.extra.customNode || ''}`]
        if (localopnion) this.metaData.extra.opinionContent = localopnion
      }
      let userId = user.user_id
      let userName = user.name
      let duserId = user.user_id
      let duserName = user.name
      if (this.$route.query.todoId) {
        if (this.$route.query.agencyType == '2') {
          userId = this.$route.query.agencyUserId
          userName = this.$route.query.agencyUserName
          duserId = this.$route.query.agencyUserId
          duserName = this.$route.query.agencyUserName
        } else if (this.$route.query.agencyType == '1') {
          duserId = this.$route.query.agencyUserId
          duserName = this.$route.query.agencyUserName
        }
      }
      // let parentFormData = this.$parent.$parent.$parent.$parent.$parent.$parent.formData;
      //console.log(this.formData,this.$parent.$parent.$parent.$parent.$parent.$parent.formData)
      if (this.pk) {
        this.flowKey = `flow-${this.pk}-${this.formData.pId}-${this.formData.pnId}${this.metaData.extra.customNode ? '-' + this.metaData.extra.name : ''}`;
        this.opinionObj = {
          id: this.formData.pnId,
          fid: this.formData.fPnId,
          infoId: this.pk,
          pid: this.formData.pId,
          pnid: this.formData.pnId,
          nodeId: this.formData.nodeId,
          wfId: this.formData.flowId,
          opinionContent: this.metaData.extra.opinionContent,
          handwritePic: this.metaData.extra.handwritePicDB,
          handwriteThumb: this.metaData.extra.handwriteThumbDB,
          nodeName: this.formData.nodeName,
          isSign: "0",
          signName: "",
          signTime: "",
          opinionUsers: this.metaData.extra.opinionUsers,
          opinionUsersText: this.metaData.extra.opinionUsersText,
          duserId: duserId,
          duserName: duserName,
          userId: userId,
          userName: userName,
          opinionFiles: [],
        }
      } else {
        //获取表单数据
        this.flowKey = `flow-${this.formData.pk}-0-${this.formData.pk}${this.metaData.extra.customNode ? '-' + this.metaData.extra.name : ''}`;
        this.opinionObj = {
          id: this.formData.pk,
          fid: 0,
          infoId: this.formData.pk,
          pid: 0,
          pnid: this.formData.pk,
          nodeId: this.formData.nodeId,
          wfId: this.formData.flowId,
          opinionContent: this.metaData.extra.opinionContent,
          handwritePic: this.metaData.extra.handwritePicDB,
          handwriteThumb: this.metaData.extra.handwriteThumbDB,
          nodeName: this.formData.nodeName,
          isSign: "0",
          signName: "",
          signTime: "",
          opinionUsers: this.metaData.extra.opinionUsers,
          opinionUsersText: this.metaData.extra.opinionUsersText,
          duserId: duserId,
          duserName: duserName,
          userId: userId,
          userName: userName,
          opinionFiles: [],
        }
      }
      // 指定意见保存环节 会保存在G_OPINION中
      if (this.metaData.extra.customNode) {
        this.opinionObj.id = this.metaData.extra.customId
        this.opinionObj.customNode = this.metaData.extra.customNode
        this.opinionObj.customId = this.metaData.extra.customId
        this.opinionObj.editOpinionUser = user.name
        this.opinionObj.editOpinionUserId = user.user_id
      }
      if (this.metaData.extra.opinionContent && !this.readonly)
        this.inpFn(this.metaData.extra.opinionContent);
      //console.log(this.flowinfo)
    });
  },
  methods: {
    scrollFn(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) {
      return
    },
    onClickRight() {
      console.log('click right');
      this.disabled = !this.disabled
    },
    onMove(e) {
      console.log(e.relatedContext.element);
      if (e.relatedContext.element.type == '-1') return false;
      return true;
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
    tagClick(val) {
      if (!this.disabled) return
      this.metaData.extra.opinionContent += val;
      this.showIdeal = !this.showIdeal;
    },
    idealClick() {
      this.showIdeal = !this.showIdeal;
    },
    inpFn(val) {
      //     // this.$bus.emit('inpBus', { ...this.value,metaData:this.metaData,subFormIndex:this.subFormIndex});
      this.$bus.emit("opinionInpFnBus", {
        val,
        metaData: this.metaData,
      })
      this.opinionObj.opinionContent = val;
      this.$emit("controlEditOpinion", { key: this.flowKey, value: this.opinionObj });
      this.newTagValue = val;
      //     // console.log(this.flowinfo[this.flowKey])
      //     this.controlData.errorMessage = ''

    },
    toFocus(val) {
      this.tempOpinion = this.metaData.extra.opinionContent;
      this.inputRows = this.showOpinionAndBtn ? 1 : 5
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
      // if (!this.readonly && this.metaData.extra.showTemplate) {
      dsf.http.get("fn/mobileUsedOpinion/find").then((res) => {
        this.tags = res.data.rows;
      });
      // }
    },
    clearTags(item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确认删除该常用意见",
        })
        .then(() => {
          dsf.http.get("fn/mobileUsedOpinion/delete?id=" + item.id).then(() => {
            this.getAdvice();
          });
        }).catch(() => { });
    },
    addContent(item) {
      this.metaData.extra.opinionContent += item.context;
      // this.flowinfo[this.flowKey].opinionContent = item.context
      // this.$emit("controlEditOpinion", this.flowinfo)
    },
    addTemplate() {
      if (this.showIdeal) {
        if (this.tags.find((item) => this.newTagValue == item.context)) {
          dsf.layer.toast("模板内容已重复");
          return;
        }
      } else {
        if (
          this.tags.find(
            (item) => this.metaData.extra.opinionContent == item.context
          )
        ) {
          dsf.layer.toast("模板内容已重复");
          return;
        }
      }
      if (this.newTagValue != "" && this.newTagValue.trim().length > 0) {
        dsf.http
          .post("fn/mobileUsedOpinion/add", {
            __DATA: JSON.stringify({
              opinion: this.showIdeal
                ? this.newTagValue
                : this.metaData.extra.opinionContent,
            }),
          })
          .then((data) => {
            dsf.layer.toast("设为模板成功");
            this.newTagValue = "";
            this.getAdvice();
          });
      } else {
        dsf.layer.toast("请输入内容");
      }
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
          `fn/mobileHandWritingData/delete?pnid=${this.formData.pnId}&pid=${this.formData.pId}`
        )
        .then((res) => {
          if (res.data.result) {
            this.imgUrl = "";
            dsf.layer.toast("清除成功");
          }
        });
    },
    closeWritePopup(imgdata) {
      //关闭手写弹框
      this.showWrite = false;
      if (imgdata) {
        this.imgUrl = dsf.url.getServerUrl(
          `fn/file/downloadFile?fileName=${imgdata.handwritePic}`
        );
        this.opinionObj.handwritePic = imgdata.handwritePic;
        this.opinionObj.handwriteThumb = imgdata.handwriteThumb;
        this.$emit("controlEditOpinion", { key: this.flowKey, value: this.opinionObj });
      }
    },
    toBlur() {
      // this.inputRows = this.showOpinionAndBtn? 1 : 3
      this.metaData.extra.opinionContent =
        this.metaData.extra.opinionContent.replace(/(^\s*)|(\s*$)/g, ""); // 去除首尾空格
      if (this.metaData.extra.opinionContent) dsf.layer.toast('意见已暂存')

    },
    validatorFn(val) {
      //require验证方法
      // if(val.length<this.controlData.begin||val.length>this.controlData.end){
      // 	this.bindValue=''
      // 	this.controlData.errorMessage=this.controlData.rules[1].message
      // }
    },
    // formatternum(value){
    // 	return value.replace(/[^0-9-]+/, '');//输入是验证是否符合规则
    // }
    handleBlur(event) {
      if (!this.showOpinionAndBtn) {
        this.inputRows = 3;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.havetoHandWrite {
  ::v-deep .van-field__body {
    display: none;
  }
}

.controlTextBox {
  padding: 0.2rem !important;
  // border: 1px solid #e5e5e5;
  border-radius: 2px;
}

.controlTextPadding {
  padding: 5px 10px !important;

  ::v-deep .van-field__control {
    text-align: left;
    font-size: 18px;

    &::placeholder {
      font-size: 14px;
    }
  }
}

.controlEditOpinion {
  ::v-deep .van-field__control {
    text-align: left;
  }

  ::v-deep .van-field__error-message {
    text-align: right;
    /* display:none; */
  }
}

.input-box {
  // padding-bottom: 3px;
  width: 100%;
  border: 1px solid #e5e5e5;
}

.mould {
  display: flex;
  justify-content: flex-end;
  padding-top: 6px;
  padding-right: 3px;
  align-items: flex-start;

  .show-more {
    @include font-theme("normal");
  }

  .ideal-span {
    margin-left: 5px;
    @include font-theme("normal");
  }

  .mould-button {
    font-size: var(--font_size_4);
    @include font-theme("normal");
    border: 1px solid;
    @include border-color-theme("normal", true);
    padding: 5px 6px;
    border-radius: 2px;
    margin-left: 10px;
  }
}

::v-deep ._file_log {
  // padding-left: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  margin-top: 6px;
  width: 100%;
  // min-height: 50px;
  max-height: 65px;
  overflow: hidden;
  padding-bottom: 0;

  .van-tag--medium {
    // font-size: var(--font_size_3);
    // @include font-theme("normal", true);
    // color: #fff;
    // @include font_6;
    // @include background-theme("normal");
  }
}

::v-deep .inline_file_log {
  // margin-top: 6px;
  width: 100%;
  // min-height: 50px;
  height: 28px;
  overflow: hidden;
  padding-bottom: 0;
  margin-bottom: 6px;
  display: inline-block;
}

._file_tags {
  display: inline-block;
  font-size: var(--font_size_3);
  margin-right: 6px;
  margin-bottom: 6px;
  padding: 5px 10px;
  border-radius: 3px;
  word-break: break-all;
  background-color: #f4f4f4;
  color: #333;
  max-width: 100%;
}

._file_tags_large {
  font-size: var(--font_size_2);
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

.setting {
  @include font-theme("normal");
  font-size: var(--font_size_3);
  margin: 10px 0 10px 5px;
  flex-shrink: 0;

  img {
    display: inline-block;
    width: 17px;
    height: 17px;
    vertical-align: sub;
  }
}

.cutLine {
  margin-left: 16px;
  height: 1px;
  background: #e5e5e5;
}

.handleWriteBox {
  // padding: 15px;
  // padding-right: 0;
  // background: white;
  font-size: var(--font_size_2);

  .writeContent {
    text-align: center;

    img {
      display: inline-block;
      padding-top: 15px;
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

.opinion-container {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  max-height: calc(50vh - 46px);
  overflow: auto;

  .module {
    margin: 5px 8px;
    display: flex;

    .content {
      flex: 1;
      padding: 5px 10px;
      background-color: #ececec;
      border: 1px solid #d5d5d5;
    }

    .btn {
      padding: 5px;
      border: 1px solid #d5d5d5;
      background-color: #ececec;
      margin-left: 3px;
      display: flex;
      align-items: center;
      border-radius: 0 4px 4px 0;
    }
  }
}

.ideal {
  position: relative;
  overflow: hidden;

  /deep/ .van-nav-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 50px;
    border-bottom: 2px solid #f1f2f4;

    /* .van-nav-bar__right {
      .van-nav-bar__text {
        color: #999
      }
    } */
  }

  .chosen {
    @include background-theme("normal", true);

    span {
      color: #fff;
    }
  }

  .list-group {
    position: absolute;
    top: 1rem;
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

      >span {
        margin-right: 5px;
        flex: 1;
        font-size: var(--font_size_2);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      i {
        width: 20px;
      }

      .van-icon-close {
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
      // width: calc(100% - 70px);
      flex: 1;
      margin-right: 10px;
      height: 40px !important;
      border: 2px solid #f1f2f4 !important;

      &::-webkit-input-placeholder {
        color: #cfd0d2;
      }
    }

    .van-button {
      // width: 60px;
      height: 38px;
      flex-shrink: 0;
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

.overlayClass {
  opacity: 0.8;
}

.prompt {
  position: absolute;
  top: 1rem;
  height: 25px;
  font-size: 13px;
  text-align: center;
  width: 100%;
  border-bottom: 2px solid #f1f2f4;
  line-height: 25px;
}
</style>
