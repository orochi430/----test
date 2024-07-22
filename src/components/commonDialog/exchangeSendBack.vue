<template>
  <round-popup :show.sync="show" title="退回">
    <template #container>
      <van-field class="message" v-model="value" type="textarea" :rows="10" placeholder="请输入原因" />
    </template>
    <template #btn>
      <van-button type="primary" @click="confirm">确认退回</van-button>
    </template>
  </round-popup>
</template>

<script>
import roundPopup from "@/components/commonComponents/roundPopup.vue"
export default {
  name: "exchangeSendBack",
  components: { roundPopup },
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
    },
    isFromList: {
      type: Boolean,
      default: false,
    },
    listData: {
      type: Object
    }
  },
  data() {
    return {
      value: "",
      show: true
    }
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
    confirm() {
      let data = {}
      if (!this.isFromList) {
        data = {
          moduleId: this.formParams.moduleId,
          pk: this.formParams.pk,
          reason: this.value
        }
      } else {
        data = {
          moduleId: this.listData.dataValue['A0004'],
          pk: this.listData.dataValue['A0001'],
          reason: this.value
        }
      }
      let loadindex = dsf.layer.loading()
      dsf.http.post("ctrl/exRemoteInterfaceController/rejectDoc", data).then(res => {
        dsf.layer.closeLoading(loadindex)
        if ((res.data.type === "success")) {
          this.show = false
          dsf.layer.toast(res.data.message)
          if (this.isFromList) {
            this.$emit('refreshList')
          } else {
            this.$emit("backSucces")
          }
        } else {
          dsf.layer.toast(res.data.message)
        }
      }).catch(() => {
        dsf.layer.closeLoading(loadindex)
        dsf.layer.toast('退回失败')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.message {
  padding: 0 !important;
}
</style>
