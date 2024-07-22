
<template>
  <div class="box controlRadio">
    <van-field v-model="radio" v-if="!readonly" :rules="controlData.rules">
      <template #input>
        <van-radio-group v-model="radio" :style="style" @change="changeValue">
          <van-radio :name="String(item.value)" v-for="(item, index) in currentColumns" :key="index"
            @click="changeRadio(item, index)"
            :style="{ width: !isNaN(metaData.extra.numPerLine) ? `${100 / Number(metaData.extra.numPerLine)}%` : '' }">{{
              item.text }}</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <div v-else class="van-cell van-field">
      <span class="van-field__control" v-text="value.text"></span>
    </div>
  </div>
</template>
<script>
import propMixin from "./mixin";
export default {
  name: "controlRadio",
  mixins: [propMixin],
  model: {
    prop: "value",
    event: "input",
  },
  data() {
    return {
      bindValue: this.value.text,
      radio: "",
      controlData: {
        inputAlign: "right",
        rules: [],
        leftIcon: "", //左icon
        rightIcon: "", //右icon
        disabled: false,
        closeable: true,
        round: true,
        placeholder: "",
        lockScroll: true,
        overlay: true,
        duration: "0.3",
        columnsValue: {
          //对象数组，配置每一组显示的数据
          title: "请选择",
          columns: [],
        },
      },
      currentColumns: [],
    };
  },
  computed: {
    style() {
      return dsf.config.clientType == "mobile" &&
        dsf.config.commonForm.layout == "row" &&
        dsf.config.commonForm.textlayout == "right"
        ? "justify-content: flex-end"
        : "";
    },
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal?.value) {
          this.radio = newVal.value;
          this.$nextTick(() => {
            if (this.metaData.extra.isDocType == 1) {
              this.$bus.emit("comboxChangeCode", {
                ...this.value,
                metaData: this.metaData,
              });
            }
          })
        }
      },
      deep: true,
      immediate: true,
    },
    "metaData.enumData": {
      handler(newVal, oldVal) {
        if (newVal) {
          this.currentColumns = newVal;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    if (this.metaData.hasOwnProperty("readonlyValue")) {
      this.value.text = this.metaData.readonlyValue;
    }
    if (
      (!this.value.value && !this.value.text) &&
      JSON.stringify(this.metaData.defaultValue) != "{}" &&
      !this.readonly
    ) {
      var obj = this.value;
      obj.value = this.metaData.defaultValue.value;
      obj.text = this.metaData.defaultValue.text;
      this.$emit("input", obj);
    }
    this.radio = this.value.value;
    this.controlData.columnsValue.columns = this.metaData.enumData;
    // this.currentColumns=this.metaData.enumData
  },
  methods: {
    changeRadio(data, index) {
      if (this.readonly) return;
      var obj = this.value;
      obj.value = data.value;
      obj.text = data.text;
      this.$emit("input", obj);
      this.$bus.emit("inputRadio", {
        ...obj,
        metaData: this.metaData,
      });
      // console.log(this.value);
    },
    changeValue(data, index) {
      if (this.readonly) return;
      var obj = this.value;
      // obj.value = data.value;
      // obj.text = data.text;
      this.$emit("input", obj);
      this.$bus.emit("changeRadio", {
        ...obj,
        metaData: this.metaData,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  // padding-left:15px;
}

.controlRadio {
  .van-radio-group {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .van-radio {
    margin: 4px 6px 4px 0;

    >>>.van-radio__icon {
      font-size: var(--font_size_2);
    }

    >>>.van-radio__label {
      font-size: var(--font_size_2);
      // font-size: var(--font_size_3);
      line-height: normal;
      text-align: justify;
    }
  }
}
</style>
