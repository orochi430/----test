<template>
  <div class="myLeaveDialog">
    <van-popup v-model="show" class="flex dc" style="height: 100vh" position="bottom" @close="close">
      <van-nav-bar left-text="返回" @click-left="close" title="请假情况"></van-nav-bar>
      <my-leave></my-leave>
    </van-popup>
  </div>
</template>

<script>
import myLeave from "@/components/project/yanshi/myLeave"
export default {
  name: "myLeaveDialog",
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
  components: { myLeave },
  data() {
    return {
      show: true,
      value: ""
    }
  },
  computed: {},
  watch: {},
  methods: {
    close() {
      this.show = false
      this.$nextTick(() => {
        this.$emit("closeCallback", this.value)
      })
    }
  },
  created() {},
  mounted() {},
  destroyed() {}
}
</script>
