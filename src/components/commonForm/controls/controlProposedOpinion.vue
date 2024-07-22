<template>
  <!-- <div class="controlTextarea" :style="{paddingLeft:!readonly?'0.32rem':0}"> -->
  <div class="controlTextarea">
    <!-- <textarea name="" v-model='value.value' :readonly="readonly" class="textareaBox" @input='inpfn' id="" :placeholder="controlData.placeholder" rows="3" :maxlength='controlData.maxlength'></textarea> -->
    <van-field
      v-if="!readonly"
      v-model="value.value"
      :rows="readonly ? 1 : metaData.extra.defaultRow || 3"
      autosize
      type="textarea"
      :readonly="readonly"
      @input="inpFn"
      @focus="toFocus"
      @blur="toBlur"
      :placeholder="controlData.placeholder"
      :maxlength="controlData.maxlength"
      :class="{ textareaBox: !readonly }"
      :style="metaData.autosizeStyle"
    />
    <div v-else class="van-cell van-field readonlyBox" ref="controlTextarea">
      <span :class="['van-field__control']" v-html="value.value">
      </span>
    </div>
    <van-field
      class="dreamInput"
      v-model="value.value"
      type="textarea"
      rows="1"
      autosize
      :rules="controlData.rules"
      :maxlength="controlData.maxlength"
      :show-word-limit="controlData.showWordLimit"
      :readonly="readonly"
      :placeholder="controlData.placeholder"
      :name="metaData && metaData.metaId ? metaData.metaId : ''"
    />
  </div>
</template>

<script>
import propMixin from "./mixin"

export default {
  name: "controlTextarea",
  mixins: [propMixin],
  // extends:controlTextBox,
  props: {
    subFormIndex: {
      type: Number,
      default: null
    },
    formId: {
      // 子表id
      type: String,
      default: null
    }
  },
  data() {
    return {
      bindValue: "",
      controlData: {
        rules: [],
        maxlength: null,
        showWordLimit: true,
        placeholder: ""
      },
      readonly: false,
    }
  },
  methods: {
    inpFn(val) {
      this.$bus.emit("textareaInpBus", {
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      })
    },
    toFocus(val) {
      this.$bus.emit("textareaFocusBus", {
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      })
    },
    toBlur() {
      this.$bus.emit("textareaBlurBus", {
        ...this.value,
        metaData: this.metaData,
        subFormIndex: this.subFormIndex,
        subFormId: this.formId
      })
    }
  },
  created() {
    console.log(this.value.value)
    // this.controlData.placeholder=this.metaData.placeholder
    if (JSON.stringify(this.metaData.defaultValue) == "{}") {
    } else {
      if (!this.value.value) {
        this.value.value = this.metaData.defaultValue.value
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.controlTextarea {
  // width: 100%;
  padding-top: 5px;
  .van-cell {
    // padding: 0;
    &::after {
      border: 0;
    }
  }
  .textareaBox {
    // padding: 5px !important;
    // box-shadow: rgba(163, 172, 181, 0.3) 0px 1px 5px;
    // border: 1px solid #CFCFCF;
    // border-radius: 2px;
  }

  ::v-deep .van-field__control {
    text-align: left !important;
  }
  .readonlyBox {
    position: relative;
    line-height: 1.5;
    white-space: pre-wrap;
    .expand {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #fff;
      width: auto !important;
    }
    .isEllipsis {
      @include multi-ellipsis(3)
    }
  }
}
</style>
<style lang="scss">
.dreamInput {
  padding-top: 0;

  .van-field__body {
    display: none;
  }
}
</style>
