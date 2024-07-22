<template>
  <van-calendar v-model="show" @confirm="onConfirm" get-container="#app" :min-date="minDate" :max-date="maxDate"/>
</template>

<script>
export default {
  name: "calendarDialog",
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    metaData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      show: true,
      value: "",
      minDate: new Date(new Date().getFullYear() - 5, 0, 1), //可选择的最小日期
      maxDate: new Date(new Date().getFullYear() + 5, 11, 31), //可选择的最大日期
    }
  },
  computed: {},
  watch: {
    show(nv, ov) {
      if (!nv) {
        this.$nextTick(() => {
          this.$emit("closeCallback", this.value)
        })
      }
    }
  },
  methods: {
    onConfirm(date) {
      this.show = false
      this.value = moment(date).format("yyyy-MM-DD")
    }
  },
  created() {
    console.log(this)
  },
  mounted() {},
  destroyed() {}
}
</script>
