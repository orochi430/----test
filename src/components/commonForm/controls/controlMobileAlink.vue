<template>
  <div class="controlMobileAlink">
    <van-cell
      class="titlespan"
      :title="metaData.extra.linkName"
      is-link
      @click="cellClick"
      center
    />
  </div>
</template>

<script>
import propMixin from "./mixin";
export default {
  name: "controlMobileAlink",
  mixins: [propMixin],
  data() {
    return {
      controlData: {
        inputAlign: "right",
      }
    };
  },
  props: {
    formMeta: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  created() {

  },
  mounted() {
    
  },
  methods: {
    cellClick() {
      function saveCallback(VueData) { // VueData为commonForm的vue对象
        if (!VueData.$route.params.pk){ // 拟稿情况下先将路由替换成带pk的，否则跳转后再返回又到新的拟稿表单
          VueData.$router.replace({
            path: `/commonForm/${VueData.moduleId}/${VueData.formParams.pk}`,
            query: VueData.$route.query
          })
        }
        VueData.$router.push(VueData.busObj.metaData.extra.linkInfo)
      }
      this.$bus.emit("saveFormBus", {
        metaData: this.metaData,
        callback: saveCallback
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
.controlTemplateCode {
  width: 100%;
  padding-left: 10px;
}

.titlespan {
  //border-left: 3px solid #00c3ff;
  //@include font-theme('normal');
  padding-left: 5px;
  //font-weight: 600;
  font-size: var(--font_size_2);
  line-height: 20px;
  text-decoration: underline;
}
//这里没有对父使用flex 怕对其他的有影响
.controlTemplateCode{
  .photo{
    transform: translate(48%);
  }
}
</style>