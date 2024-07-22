<template>
  <commponent
    ref="ChildLog"
    :is="componentName"
    :componentName="componentName"
    :form-data="formData"
    :meta-data="metaData"
    :form-params="formParams"
    :is-from-list="isFromList"
    :list-data="listData"
    :extra="extra"
    @closeCallback="closeCallback"
    @showTree="showTree"
    @backSucces="backSucces"
    @refreshList="refreshList"
  ></commponent>
</template>

<script>
import Vue from "vue";
import install from "@/components/commonDialog/index.js";
Vue.use(install);
export default {
  name: "commonDialog",
  components: {},
  props: {
    nowButtonParameters: {
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
    metaData: {
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
    componentName: {
      type: String,
    },
    isFromList: {
      type: Boolean,
      default: false,
    },
    listData: {
      type: Object
    },
    extra: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {
    formParams(val) {
      console.log(val);
    },
  },
  methods: {
    closeCallback(data) {
      this.$emit("closeCallback", data, this.componentName);
    },
    showTree(data) {
      this.$emit("showTree", data);
    },
    backSucces() {
      this.$emit("backSucces");
    },
    refreshList() {
      this.$emit("refreshList");
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>
