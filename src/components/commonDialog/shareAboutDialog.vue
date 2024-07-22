<template>
  <van-popup v-model="show" :style="{ height: '100%', background: '#f8f8f8' }" position="bottom" get-container="#app" class="flex dc">
    <van-nav-bar title="分阅情况" @click-left="show = false">
      <template #left>
        <van-icon name="arrow-left" />
        <span>返回</span>
      </template>
    </van-nav-bar>
    <div style="flex: 1;overflow: auto;">
      <default-list :params="item" :oppset-top="0"></default-list>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "shareAboutDialog",
  components: {},
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
    },
    formParams: {
      type: Object,
      default: {}
    }
  },
  components: {},
  data() {
    return {
      show: true,
      value: "",
      item: {
        listId: "2309091836134MQNCRnjcPYe3PMVoUE",
        moduleId: "191101140145m2ErRGDaBngF0SAGgFZ",
        params: {
          pk: this.metaData.parameters.pk,
          notLink: true,
          order: this.$parent.$parent.nowButtonParameters.orderType
        }
      }
    }
  },
  mounted() {
  },
  beforeCreate() {
    this.$options.components.DefaultList = require("../documentCenter/DefaultList.vue").default
  },
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

  },
  created() {},

  destroyed() {}
}
</script>

<style scoped lang="scss">

</style>
