<template>
  <div :style="style">
    <iframePage :fileUrl="url" />
  </div>
</template>
<script>
import iframePage from "@/components/common/file.vue";
export default {
  name: "framePageIframe",
  props: ["itemdata"],
  components: {
    iframePage: iframePage,
  },
  data() {
    return {
      url: "",
      style: "height: calc(100vh - 1.2rem)",
    };
  },
  created() {
    this.url = dsf.util.getReplaceUrl(this.itemdata.params.url);
    //console.log(document.documentElement.clientHeight);
    if (this.itemdata.params.iframeType == "局部内置组件") {
      this.style = "height: " + this.itemdata.params.iframeHeight;
    }
  },
};
</script>

<style lang="scss" scoped></style>
