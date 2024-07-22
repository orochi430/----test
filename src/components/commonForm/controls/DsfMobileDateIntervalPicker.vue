<template>
  <DsfMobileDateIntervalPicker v-model="date" style="width: 100%;"></DsfMobileDateIntervalPicker>
</template>

<script>
import propMixin from "./mixin"
export default {
  components: {},
  model: {
    prop: "value",
    event: "input",
  },
  mixins: [propMixin],
  props: ['topformData'],
  data() {
    return {
      controlData: {
        inputAlign: "left"
      },
    }
  },
  computed: {
    date:{
      get() {
        return { sdate: this.topformData.main['C-DB-0074'].value, edate: this.value.value }
      },
      set(value) {
        this.value.value = value.edate
        this.topformData.main['C-DB-0074'].value = value.sdate
      }
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

</style>
