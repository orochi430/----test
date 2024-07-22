<template>
  <div class="controlSwitcherBox flex ac">
    <div v-if="dsf.config.commonForm.WangStyle" class="wangStyle">
      <div @click="checked = !checked" class="van-field__control">
        <!-- <i :class=" checked ? 'iconfont iconchevron-double-down my-icon' : 'iconfont iconchevron-double-up my-icon' " ></i> -->
				<img v-if="checked" src="static/images/arrow_up.gif" class="icon-arrow" alt="">
				<img v-else src="static/images/arrow_down.gif" class="icon-arrow" alt="">
      </div>
    </div>
    <van-switch
      v-else
      v-model="checked"
      :disabled="controlData.disabled"
      :loading="controlData.loading"
      :size="controlData.size"
      :active-color="controlData.activeColor"
      :inactive-color="controlData.inactiveColor"
      @change="changeFn"
    />
  </div>
</template>

<script>
import propMixin from "./mixin";
export default {
  name: "controlSwitcher",
  mixins: [propMixin],
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      checked: this.value.value > 0 ? true : false,
      count: 1,
      controlData: {
        disabled: false, //是否禁用
        loading: false, //是否开启加载效果
        size: "24",
        activeColor: "", //激活颜色
        inactiveColor: "", //失活颜色
      },
      enumData: [],
    };
  },
  computed: {},
  watch: {
    checked(nv, ov) {
      if (dsf.config.commonForm.WangStyle) {
        this.changeFn(nv);
      }
    },
    "value.value"(nv, ov) {
      this.checked = this.value.value > 0 ? true : false;
    },
  },
  created() {
    this.enumData = this.metaData.enumData;
    if (JSON.stringify(this.metaData.defaultValue) != "{}") {
      if (!this.value.value) {
        var obj = this.value;
        obj.value = this.metaData.defaultValue.value;
        obj.text = this.metaData.defaultValue.text;
        this.$emit("change", obj);
      }
    }
  },
  methods: {
    changeFn(val) {
      let checkFalseValue = -1;
      if (this.enumData.filter((item) => item.value == "0").length) {
        checkFalseValue = 0;
      }
      var obj = this.value;
      obj.value = this.checked ? 1 : checkFalseValue;
      this.$emit("change", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}

.ac {
  align-items: center;
}

.je {
  justify-content: flex-end;
}

.wangStyle{
    margin: 5px auto
}
.controlSwitcherBox {
  width: 100%;
  height: 100%;
  padding-left: 15px;
  box-sizing: border-box;
  text-align: right;
}

.icon-arrow{
	width: 20px;
}

.my-icon {
  font-size: 32px;
}
</style>
