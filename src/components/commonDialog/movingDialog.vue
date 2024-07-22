<template>
  <round-popup :show.sync="show" title="流转情况" style="height: 80vh">
    <template #container>
      <moving-situation :form-data="{ info_id: metaData.parameters.pk }" :parameters="metaData.parameters" />
    </template>
  </round-popup>
</template>

<script>
import roundPopup from "@/components/commonComponents/roundPopup.vue"
import movingSituation from "@/components/todoFile/movingSituation"
export default {
  name: "movingDialog",
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
  components: { roundPopup, movingSituation },
  data() {
    return {
      show: true,
      value: ""
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
  },
  created() {},
  mounted() {},
  destroyed() {}
}
</script>
