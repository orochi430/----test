<template>
  <div class="controlTextBox" v-if="!readonly || (readonly && value.value !== '')">
    <template v-if="!readonly">
      <van-stepper v-model="value.value" :min="0" :default-value="0" v-if="metaData.extra.eatraClass == 'stepper'" @change="inpFn" />
      <van-field
        v-else
        :type="metaData.extra.eatraClass && metaData.extra.eatraClass.indexOf('textarea') > -1 ? 'textarea' : 'text'"
        :autosize="metaData.extra.eatraClass && metaData.extra.eatraClass.indexOf('textarea') > -1"
        center
        rows="1"
        :name="metaData && metaData.metaId ? metaData.metaId : ''"
        class="controlTextBox"
        v-model="value.value"
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
        :readonly="controlData.readonly"
        @input="inpFn"
        @focus="intoView($event), toFocus('focus', $event)"
        @clear="toClear('clear', $event)"
        @click="toClick('click', $event)"
        @blur="toBlur('blur', $event)"
      >
        <template #label></template>
        <template #button>
          <slot name="button"></slot>
        </template>
      </van-field>
    </template>

    <div class="van-cell van-field" v-else @click="showEnclosure">
      <span
        class="van-field__control"
        :style="readonlyStyle()"
        @click.stop="if(metaData.extra.makeACall > 0) phoneTo(value.value)"
      >
        <img
          v-if="enclosureAble && allFile.length > 0 && allFile[0].file.length > 0"
          :src="dsf.util.getFileTypeIcon(allFile[0].file[0].title)"
          alt=""
          style="width: 0.3rem; display: inline-block; vertical-align: sub; height: auto; margin: 0"
        />
        {{ value.value }}
      </span>
      <!-- <img @click="phoneTo(value.value)" v-if="checkIsPhone(value.value)"
        src="../../../assets/imgs/mailDetail_phone.png" alt="" />
      <i @click="smsTo(value.value)" v-if="checkIsPhone(value.value)"
        class="iconfont iconletter infoName infoColor"></i> -->
    </div>

    <van-popup
      v-if="enclosureAble"
      v-model="isShowEnclosure"
      :close-on-click-overlay="false"
      lock-scroll
      position="bottom"
      get-container="#app"
      class="flex dc"
      style="height: 100vh"
    >
      <van-nav-bar @click-left="isShowEnclosure = false" left-text="返回" left-arrow :title="fileTitle"></van-nav-bar>
      <div style="flex: 1; overflow: hidden">
        <enclosure
          ref="enclosure"
          :fileData="{
            info_id: formMeta.parameters ? formMeta.parameters.pk : '',
            moduleId: formMeta.parameters ? formMeta.parameters.moduleId : '',
            nodeId: formMeta.parameters ? formMeta.parameters.nodeId : '',
            nodeName: formMeta.parameters ? formMeta.parameters.nodeName : '',
            flowId: formMeta.parameters ? formMeta.parameters.flowId : '',
            pId: formMeta.parameters ? formMeta.parameters.pId : '',
            pnId: formMeta.parameters ? formMeta.parameters.pnId : '',
            uploadAttach: formMeta.parameters ? formMeta.parameters.uploadAttach : ''
          }"
          :allFile="allFile"
          :formMeta="formMeta"
        ></enclosure>
      </div>
    </van-popup>
  </div>
</template>

<script>
import propMixin from "./mixin"
import validators from "../validators"
import enclosure from "./enclosure"
export default {
  name: "controlTextBox",
  components: { enclosure },
  mixins: [propMixin],
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    subFormIndex: {
      type: Number,
      default: null
    },
    formId: {
      // 子表id
      type: String,
      default: null
    },
    formMeta: {
      type: Object,
      default: () => ({})
    },
    allFile: {
      type: Array,
      default: () => []
    }
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
      isShowEnclosure: false
    }
  },
  computed: {
    enclosureAble() {
      return dsf.config.commonForm.canClickBigTitle && this.metaData.metaId == "B0001"
    },
    fileTitle() {
      return this.allFile[0]?.file[0]?.title || ""
    }
  },
  watch: {
    value(val) {
      this.bindValue = this.value.value
    }
  },
  created() {
    if (JSON.stringify(this.metaData.defaultValue) == "{}") {
    } else {
      if (!this.value.value) {
        let defaultValue = this.metaData.defaultValue
        let checkObj = this.value
        checkObj.value = defaultValue.value
        this.$emit("input", checkObj)
      }
    }
    // console.log(!!this.value.value)
    //this.controlData.placeholder = this.metaData.placeholder;
    // if(this.metaData.validator.length){
    // 	this.controlData.maxlength=this.metaData.validator.length.maxLength
    // 	this.rules.push({required: true, message: this.metaData.validator.length.tips,validator:this.validatorFn})
    // }
    // if(this.metaData.validator.lengthRange){
    // 	this.controlData.begin=this.metaData.validator.lengthRange.begin
    // 	this.controlData.end=this.metaData.validator.lengthRange.end
    // 	this.rules.push({required: true, message: this.metaData.validator.lengthRange.tips,validator:this.validatorFn})
    // }

    // this.controlData.formatterType=this.metaData?.restrict?.inputType
    // this.controlData.readonly=!this.metaData?.privilege?.editable
    // this.controlData.begin=this.metaData?.validator?.lengthRange?.begin
    // this.controlData.end=5
  },
  methods: {
    readonlyStyle() {
      let style = {}
      let textlayout = dsf.config.commonForm.textlayout || "right"
      // 文字颜色
      style.color = this.metaData.extra.makeACall > 0 ?
        "#0086D9 !important" : (this.metaData.extra.color ? `${this.metaData.extra.color} !important` : "unset");
      // 样式类名
      style.textAlign = this.metaData.extra.eatraClass ?
        (this.metaData.extra.eatraClass.includes("textCenter") ? "center" : this.metaData.extra.eatraClass) : textlayout;
      // 文字大小
      style.fontSize = this.metaData.extra.fontSize ? `${this.metaData.extra.fontSize} !important` : "unset"
      // 文字加粗
      style.fontWeight = this.metaData.extra.fontWeight ? `${this.metaData.extra.fontWeight} !important` : "unset"
      return style
    },
    checkIsPhone(phone) {
      //是否隐藏拨打电话发短信的按钮
      if (dsf.config.commonForm.isHiddenPhoneButton) {
        return false
      }
      //console.log(validators.mobile.regex);
      if (phone.length == 11 || phone.length == 12 || phone.length == 13 || phone.length == 14) {
        var reg = new RegExp(validators.mobile.regex)
        return reg.test(phone)
      }
      return false
    },
    smsTo(tel) {
      window.location.href = `sms:${tel}`
    },
    phoneTo(tel) {
      window.location.href = `tel:${tel}`
    },
    inpFn(val) {
      this.$bus.emit("inpBus", {
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      })
      this.controlData.errorMessage = ""
    },
    toFocus(val) {
      this.$emit("focus", this.value)
      this.$bus.emit("focusBus", {
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      })
    },
    toClear() {
      this.$emit("clear", this.value)
    },
    toClick() {
      this.$emit("clear", this.value);
      this.$bus.emit("clickBus", {
        ...this,
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      })
    },
    toBlur() {
      this.$bus.emit("blurBus", {
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      })
      this.controlData.errorMessage = ""
      // this.ifSuccess=this.reg[this.controlData.formatterType].test(this.bindValue)//失去焦点验证是否符合
      // if(!this.ifSuccess){
      // 	this.bindValue=''
      // }
      // var obj=this.value
      // obj.value=this.bindValue
      // this.$emit('input',obj)
    },

    validatorFn(val) {
      //require验证方法
      if (val.length < this.controlData.begin || val.length > this.controlData.end) {
        this.bindValue = ""
        this.controlData.errorMessage = this.controlData.rules[1].message
      }
    },
    showEnclosure() {
      // 标题b0001可点击打开附件
      if (this.enclosureAble) {
        this.isShowEnclosure = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.controlTextBox {
  width: 100%;
}

.infoColor {
  color: #3296fa !important;
  flex: 1;
}

.van-field {
  img {
    width: 16px;
    height: 16px;
    margin: 3px 8px;
  }
}
</style>
<style>
.overlayClass {
  opacity: 0.8;
}

.controlTextBox .van-field__error-message {
  text-align: right;
  /* display:none; */
}
</style>
