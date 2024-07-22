<template>
  <div class="LabelForTextControl van-field" :style="labelStylr" v-html="metaData.label" @click="textClick()">
  </div>
</template>

<script>
import propMixin from "./mixin"
export default {
  name: "LabelForTextControl",
  components: {},
  mixins: [propMixin],
  data() {
    return {
      controlData: {
        inputAlign: "left"
      }
    }
  },
  computed: {
    labelStylr() {
      let style = {
        fontSize: this.metaData.extra.fontSize ? `${this.metaData.extra.fontSize}px` : "",
        fontWeight: this.metaData.extra.fontWeight || "",
        color: this.metaData.extra.color || ""
      }
      return style
    }
  },
  watch: {},
  methods: {
    textClick(){
      this.$bus.emit("textClick", this);
    }
  },
  created() {},
  mounted() {},
  destroyed() {}
}
</script>
<style lang="scss">
.LabelForTextControl {
  width: 100%;
  // height: 100%;
  // line-height: 20px;
}
</style>
