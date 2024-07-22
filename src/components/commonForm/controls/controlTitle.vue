<template>
  <div class="controlTextBox">
    <div class="title" v-html="getTitle"></div>
  </div>
</template>

<script>
import propMixin from "./mixin";
export default {
  name: "controlTitle",
  mixins: [propMixin],
  data() {
    return {
      htmlTxt: "",
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
    };
  },
  computed: {
    getTitle() {
      return this.metaData.defaultValue.value.replace("$title$", "");
    }
  },
  created() {
    //console.log(this.controlData);
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import '../../../assets/styles/themes.scss';
@import '../../../assets/styles/mixin.scss';
.controlTextBox {
  width: 100%;
  padding-left: 10px;
}
.title{
	//border-left: 3px solid #00c3ff;
	@include font-theme('normal');
	padding-left: 5px;
	font-weight: 600;
	font-size: var(--font_size_2);
	line-height: 20px;
}
</style>