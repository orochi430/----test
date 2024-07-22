<template>
  <div class="addRecord">
    <van-field v-model="RecoContent" rows="8" type="textarea" @blur="transferText" maxlength="200" show-word-limit placeholder="请输入会议记录" />
  </div>
</template>
<script>
export default {
  name: "addRecord",
  props: {
    existRec: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      RecoContent: ''
    }
  },
  watch: {
    existRec: {
      handler(newval,oldval) {
        this.RecoContent = this.existRec
      },
      immediate: true
    },
  },
  created() {},
  mounted() {},
  methods: {
    transferText() {
      this.$emit('RecoContent', this.RecoContent)
    }
  },
}
</script>
<style scoped lang="scss">
</style>