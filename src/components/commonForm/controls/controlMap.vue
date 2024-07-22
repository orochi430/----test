<template>
  <div class="controlTextBox" v-if="!readonly || (readonly && !!value.value)">
    <van-field class="controlTextBox" v-model="value.value" :border="controlData.border"
      :disabled="controlData.disabled" :error-message="controlData.errorMessage" :placeholder="controlData.placeholder"
      :input-align="controlData.inputAlign" :left-icon="controlData.leftIcon" :right-icon="controlData.rightIcon"
      :rules="controlData.rules" :formatter="controlData.formatter" readonly type="textarea" autosize rows="1" clearable
      @input="inpFn" @clear="toClear('clear', $event)" @click="showPop" @blur="toBlur('blur', $event)"
      :name="metaData && metaData.metaId ? metaData.metaId : ''">
      <template #label> </template>
      <template #right-icon>
        <van-icon name="location-o" @click="showPop" />
      </template>
    </van-field>
    <van-popup get-container="#app" v-model="showMap" position="bottom" style="z-index: 99999" class="mapPop">
      <van-nav-bar title="地图" @click-left="showMap = false">
        <template #left>
          <van-icon name="arrow-left" /><span>返回</span>
        </template>
      </van-nav-bar>
      <baiduMap ref="map" class="map-container"></baiduMap>
      <div class="btn-container">
        <van-button class="btn" type="info" @click="setAddress()">确认</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import baiduMap from "../../documentCenter/baiduMap";
import propMixin from "./mixin";
import validators from "../validators";
export default {
  name: "controlTextBox",
  mixins: [propMixin],
  model: {
    prop: "value",
    event: "input",
  },
  components: {
    'baiduMap': () => import('../../documentCenter/baiduMap'),
  },
  data() {
    return {
      bindValue: this.value.value,
      showMap: false,
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
      inpReadonly: true,
    };
  },
  computed: {},
  watch: {
    value(val) {
      // console.log(val);
      this.bindValue = this.value.value;
    },
  },
  mounted() {
    let that = this;
    this.$bus.on(
      "mapAddress",
      function ({
        addressComponent: { province, city, district, street, streetNumber },
      }) {
        that.showMap = false;
        that.value.value =
          "" + province + city + district + street + streetNumber;
      }
    );
  },
  created() {
    this.readonly = !this.metaData.privilege.editable;
    this.inpReadonly = this.metaData.inpReadonly;
    if (JSON.stringify(this.metaData.defaultValue) == "{}") {
    } else {
      if (!this.value.value) {
        let defaultValue = this.metaData.defaultValue;
        let checkObj = this.value;
        checkObj.value = defaultValue.value;
        this.$emit("input", checkObj);
      }
    }
  },
  methods: {
    showPop() {
      let that = this;
      if (this.readonly) {
        return;
      }

      this.showMap = true;
    },
    getContainer() {
      return document.querySelector("body");
    },
    inpFn(val) {
      this.controlData.errorMessage = "";
    },
    toFocus(val) {
      this.$emit("focus", this.value);
    },
    toClear() {
      this.$emit("clear", this.value);
    },
    toClick() {
      this.$emit("clear", this.value);
    },
    toBlur() { },
    validatorFn(val) {
      //require验证方法
      if (
        val.length < this.controlData.begin ||
        val.length > this.controlData.end
      ) {
        this.bindValue = "";
        this.controlData.errorMessage = this.controlData.rules[1].message;
      }
    },
    setAddress() {
      this.showMap = false;
      let obj = this.$refs.map.getAddress();
      console.log(obj);
      this.$bus.emit("setAddress", {
        ...obj,
        metaData: this.metaData,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.controlTextBox {
  width: 100%;
}

.mapPop {
  height: 100%;
  display: flex;
  flex-direction: column;

  .map-container {
    flex: 1;
  }

  .btn-container {
    background-color: #fff;
    width: 100%;
    padding: 12px;

    .btn {
      width: 100%;
    }
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
