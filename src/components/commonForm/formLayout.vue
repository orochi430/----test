<template>
  <!-- wrap -->
  <div style="width: 100%; height: 100%">
    <!-- 手机端样式 -->
    <template v-if="isMobileForm">
      <!-- <van-divider v-if="isShowDivider"/> -->
      <van-row
        type="flex"
        class="layout_box"
        align="center"
        :style="{
          backgroundColor: (metaData.controlType == 'controlMobileFl' || metaData.controlType == 'controlSubFormPrimary') ? '' : '#fff',
          padding: tabControls.indexOf(metaData.controlType) == -1 ? `${dsf.config.commonForm.controlPadding || '0.3rem'} 0` : '0'
        }"
      >
        <!-- col布局分为24 24，row布局分为8 16 -->
        <van-col
          v-if="isShowLable && tabControls.indexOf(metaData.controlType) == -1"
          :span="isColLayout ? 24 : metaData.extra.width || 8"
          :style="{ width: metaData.icon ? '1rem' : '' }"
        >
          <control-label :meta-data="metaData"></control-label>
        </van-col>
        <van-col
          :span="isColLayout || !isShowLable ? 24 : metaData.extra.width ? 24 - metaData.extra.width : 16"
          class="noPadding"
          :class="isTextRight"
          :style="{ padding: tabControls.indexOf(metaData.controlType) == -1 ? '' : '0', width: tabControls.indexOf(metaData.controlType) == -1 && metaData.icon ? 'calc(100% - 1rem)' : ''  }"
        >
          <component
            v-if="metaData.controlType == 'controlSubFormPrimary' || metaData.controlType == 'controlSubFormPrimaryCPYD'"
            ref="subform"
            :is="metaData.controlType"
            :formMeta="formMeta.subform[metaData.metaId]"
            :meta-data="metaData"
            :formData="formData.multinfos[metaData.metaId]"
            :formId="metaData.metaId"
            :form-params="formParams"
            :foreign="formMeta.parameters.pk"
            :topformData="topformData"
            :topformMeta="topformMeta"
          ></component>
          <component
            v-else-if="formType == 'nestedForm' && metaData.controlType == 'controlCheckBox'"
            :allFile="allFile"
            :meta-data="metaData"
            v-model="controlData"
            :is="'controlCheckBoxPC'"
            ref="control"
            @controlEditOpinion="controlEditOpinion"
            :formId="formId"
            @controlShareOpinion="controlShareOpinion"
            @input="inpFn"
            @confirm="confirmFn"
            @selectuser="selectuser"
            @getOptions="getOptions"
            :subFormIndex="subFormIndex"
            :parameters="parameters"
            :topformData="topformData"
            :topformMeta="topformMeta"
            :relationList="relationList"
            :class="{ 'readonly-font': !metaData.privilege.editable }"
          ></component>
          <component
            v-else
            :allFile="allFile"
            :meta-data="metaData"
            v-model="controlData"
            :is="metaData.controlType"
            :ref="metaData.controlType"
            @controlEditOpinion="controlEditOpinion"
            @controlShareOpinion="controlShareOpinion"
            @input="inpFn"
            @confirm="confirmFn"
            @selectuser="selectuser"
            @getOptions="getOptions"
            :subFormIndex="subFormIndex"
            :parameters="parameters"
            :formId="formId"
            :formData="formData"
            :formMeta="formMeta"
            :pformData="pformData"
            :pformMeta="pformMeta"
            :topformData="topformData"
            :topformMeta="topformMeta"
            :relationList="relationList"
            :class="{ 'readonly-font': !metaData.privilege.editable }"
          ></component>
        </van-col>
      </van-row>
    </template>
    <!-- pad端样式 -->
    <template v-else>
      <van-row type="flex" class="pad_layout_box" align="center">
        <van-col v-if="isShowLable && padTabControls.indexOf(metaData.controlType) == -1" :span="(labelSpan || 4) * rowCteNum">
          <control-label :meta-data="metaData"></control-label>
        </van-col>
        <van-col
          :span="padTabControls.indexOf(metaData.controlType) > -1 || !isShowLable ? 24 : 24 - (labelSpan || 4) * rowCteNum"
          class="noPadding"
          :style="{ padding: padTabControls.indexOf(metaData.controlType) == -1 ? '' : '0' }"
        >
          <component
            v-if="metaData.controlType == 'controlSubFormPrimary' || metaData.controlType == 'controlSubFormPrimaryCPYD'"
            ref="subform"
            :is="metaData.controlType"
            :formMeta="formMeta.subform[metaData.metaId]"
            :meta-data="metaData"
            :formData="formData.multinfos[metaData.metaId]"
            :formId="metaData.metaId"
            :form-params="formParams"
            :foreign="formMeta.parameters.pk"
            :topformData="topformData"
            :topformMeta="topformMeta"
          ></component>
          <component
            v-else-if="formType == 'nestedForm' && metaData.controlType == 'controlCheckBox'"
            :allFile="allFile"
            :meta-data="metaData"
            v-model="controlData"
            :is="'controlCheckBoxPC'"
            ref="control"
            @controlEditOpinion="controlEditOpinion"
            :formId="formId"
            @controlShareOpinion="controlShareOpinion"
            @input="inpFn"
            @confirm="confirmFn"
            @selectuser="selectuser"
            @getOptions="getOptions"
            :subFormIndex="subFormIndex"
            :parameters="parameters"
            :topformData="topformData"
            :topformMeta="topformMeta"
            :relationList="relationList"
            :class="{ 'readonly-font': !metaData.privilege.editable }"
          ></component>
          <component
            v-else
            :allFile="allFile"
            :meta-data="metaData"
            v-model="controlData"
            :is="metaData.controlType"
            ref="control"
            @controlEditOpinion="controlEditOpinion"
            @controlShareOpinion="controlShareOpinion"
            @input="inpFn"
            @confirm="confirmFn"
            @selectuser="selectuser"
            @getOptions="getOptions"
            :subFormIndex="subFormIndex"
            :parameters="parameters"
            :formData="formData"
            :formMeta="formMeta"
            :formId="formId"
            :pformData="pformData"
            :pformMeta="pformMeta"
            :topformData="topformData"
            :topformMeta="topformMeta"
            :relationList="relationList"
            :class="{ 'readonly-font': !metaData.privilege.editable }"
          ></component>
        </van-col>
      </van-row>
    </template>
  </div>
</template>

<script>
import allComps from "./controls"
import demo from "./demo"
export default {
  name: "formLayout",
  props: [
    "isMobileForm",
    "metaData",
    "controlData",
    "isSubForm",
    "subFormIndex",
    "parameters",
    "allFile",
    "rowCteNum",
    "formData",
    "formMeta",
    "pformData",
    "pformMeta",
    "relationList",
    "lastControl",
    "formType",
    "topformData",
    "topformMeta",
    "formId",
    "subFormLayout",
    "formParams",
    "labelSpan"
  ],
  components: {
    ...allComps
  },
  data() {
    return {
      testValue: demo.controls[0],
      ifRowLayout: true,
      textLayout: "right",
      defaultVal: "",
      fileCode: true,
      configlayout: "col",
      device: "pad",
      tabControls: [
        "controlSubFormPrimaryCPYD",
        "controlSubFormPrimary",
        "controlMobileFlowInfo",
        "controlRightFileList",
        "controlFileRelation",
        "controlMobileFl",
        "controlFileUpload",
        "DsfMobileDateIntervalPicker"
      ], // 不显示label的控件
      padTabControls: ["controlSubFormPrimaryCPYD", "controlMobileFlowInfo", "controlMobileFl"] // 不显示label的pad控件
    }
  },
  created() {
    let arr = ["controlEditor", "controlTextarea"]
    this.ifRowLayout = arr.filter(item => item == this.metaData.controlType).length
    this.configlayout = dsf.config.commonForm.layout
    this.textLayout = dsf.config.commonForm.textlayout || "right"
  },
  computed: {
    isColLayout() {
      //折行控件
      let arr = [
        "controlNotePaperToAndGo",
        "flowHandle",
        "handleTips",
        "controlOpinionTagView",
        "controlMobileShareInfo",
        "controlShareRead",
        "controlShareView",
        "controlNestedForm",
        "controlSubFormPrimaryCPYD",
        "controlSubFormPrimary",
        "controlFileUpload",
        "formTitle",
        "controlEditor",
        "controlTextarea",
        "controlMobileFlowInfo",
        "controlRightFileList",
        "controlFileRelation",
        "controlMobileFl",
        "controlEditOpinion",
        "controlOpinionView",
        "controlShareOpinion",
        "controlProposedOpinion",
        "controlMultiDeptOpinion",
        "controlconvertopinionview",
        "superviseV6StatusBottom"
      ]
      return (
        arr.indexOf(this.metaData.controlType) > -1 ||
        dsf.config.commonForm.layout == "col" ||
        (this.metaData.controlType == "controlFileCode" && this.metaData.privilege.editable) ||
        (this.metaData.controlType == "controlUser" && !this.metaData.privilege.editable && this.metaData.extra.eatraClass == "showTelicon")
      )
    },
    isTextRight() {
      if (this.subFormLayout) {
        return this.subFormLayout
      } else if (dsf.config.commonForm.layout == "row" && this.textLayout == "right") {
        return "textRight"
      }
    },
    isTitleField() {
      let istemp = false
      if (this.metaData.defaultValue.value && (this.metaData.defaultValue.value.indexOf("$title$") > -1 || this.metaData.defaultValue.value.indexOf("$tend$") > -1)) {
        istemp = true
      }
      return istemp
    },
    getClass() {
      //文本文字的左对齐和右对齐
      return this.textLayout == "right" ? "pad_ rowLayout" : "pad__left rowLayout_left"
    },
    rowSpanLable() {
      if (dsf.config.commonForm.WangStyle) {
        return 4
      }
      return 8
    },
    rowSpanText() {
      if (dsf.config.commonForm.WangStyle) {
        return 20
      }
      return 16
    },
    isShowLable() {
      return this.metaData.showLable == null || this.metaData.showLable == undefined || this.metaData.showLable == true
    }
  },
  methods: {
    confirmFn(data) {
      console.log(this.controlData)
    },
    inpFn(val) {
      this.controlData = val
    },
    //选人---赋值
    selectuser(obj) {
      // console.log('选人赋值',this.controlData)
    },
    //意见---赋值
    getOptions(val) {
      //console.log("意见赋值", this.controlData);
    },
    controlAction() {
      this.$refs.control.showPicker()
    },
    changeFileCode(val) {
      this.fileCode = val
    },
    controlEditOpinion(val) {
      //console.log(val);
      this.$emit("controlEditOpinion", val)
    },
    controlShareOpinion(val) {
      //console.log(val);
      this.$emit("controlShareOpinion", val)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.ac {
  align-items: center;
}

.layout_box {
  width: auto;
  // margin: 0 5px;
  // min-height: 30px;
  padding: 10px 0;
  // background: white;
  box-sizing: border-box;
  position: relative;
  // border-bottom: 1px solid #f5f5f5;

  // padding-top:4px;
  .left {
    height: 100%;
  }
}

.issubForm {
  border-bottom: 1px solid #e5e5e5;
}

.je {
  justify-content: flex-end;
}

.right {
  padding-right: 16px;
}

.colLayout {
  padding: 0 16px;
}
</style>
<style lang="scss">
.layout_box .right .van-cell {
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.layout_box input {
  // font-size: var(--font_size_3);
}

.layout_box {
  font-family: PingFangSC-Regular;

  .van-field--error {
    input::-webkit-input-placeholder {
      color: #ccc !important;
    }

    textarea::-webkit-input-placeholder {
      color: #ccc !important;
    }
  }

  textarea::-webkit-input-placeholder {
    color: #ccc !important;
  }

  .van-field__error-message {
    text-align: right;
  }
}

.rowLayout {
  display: flex;
  align-items: center;

  .van-field__error-message {
    text-align: right;
  }

  .van-field__control {
    text-align: right;
  }

  a {
    text-align: right;
  }
}

.rowLayout_left {
  display: flex;
  align-items: center;

  .van-field__error-message {
    text-align: left;
  }

  .van-field__control {
    text-align: left;
  }

  a {
    text-align: left;
  }
}

.card {
  .issubForm {
    .controlTextarea > .textareaBox {
      padding: 6px;
      font-size: var(--font_size_3);
      // border:1px solid #e4e4e4;
      border-radius: 5px;
      outline: none;
      -webkit-appearance: none;
    }

    .controlTextarea {
      .van-field__body {
        border: none;
      }
    }

    .van-field__body {
      padding: 6px !important;
      padding-left: 0 !important;
      // border:1px solid #e4e4e4;
      font-size: var(--font_size_3);
      // background:#ebeff5;
      border-radius: 5px;
    }
  }
}

// .wenhao .van-field__control{
//   text-align:right;
// }
.noPadding {
  padding: 0 10px;

  .van-cell {
    padding: 0;
  }
}

.textRight {
  .van-field__error-message,
  .van-field__control,
  .van-cell__title,
  a {
    text-align: right;
    word-break: break-all;
  }
}

.textCenter {
  .van-field__error-message {
    text-align: center;
  }

  .van-field__control {
    text-align: center;
  }

  a {
    text-align: center;
  }
}

.textLeft {
  .van-field__error-message {
    text-align: left;
  }

  .van-field__control {
    text-align: left;
  }

  a {
    text-align: left;
  }
}

.van-divider {
  margin: 0;
  padding: 0 16px;
  border-color: #cfcfcf;
  background-color: #fff;
}

.pad_layout_box {
  // border: 1px solid #f5f5f5;
  // border-top: 0;
  background-color: #fff;
  position: relative;
  height: 100%;
  // min-height: 50px;
  >.van-col {
    &:first-child {
      &:after {
        content: " ";
        position: absolute;
        height: 100%;
        border-right: 1px solid #f5f5f5;
        // right: -1px;
        top: 0;
      }
    }
    &:only-child {
      &:after {
        border: 0;
      }
    }

    &:last-child {
      padding: 10px;
    }
  }
  .fileTypeList {
    margin: 0 !important;
  }
  .relation-list {
    padding: 0 !important;
  }
  .control_label {
    // padding-right: 16px;
    min-height: 0.8rem !important;
    // line-height: 0.8rem !important;
    display: flex;
    align-items: center;
  }
  .controlRadio .van-radio {
    margin: 0 0.12rem 0 0 !important;
  }
  .controlOpinionView .opinionImg {
    justify-content: flex-start !important;
  }
}
</style>
