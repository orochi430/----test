<template>
  <div class="handleRrecordsControl" v-html="content"></div>
</template>

<script>
export default {
  name: "handleRrecordsControl",
  props: {
    subFormIndex: {
      type: Number,
      default: null,
    },
    formId: {
      // 子表id
      type: String,
      default: null,
    },
    formMeta: {
      type: Object,
      default: () => ({}),
    },
    allFile: {
      type: Array,
      default: () => [],
    },
    metaData: {
      type: Object,
      default: () => ({}),
    }
  },

  components: {},

  data() {
    return {
      content: "",
    };
  },

  created() {},

  mounted() {
    this.getContent();
  },

  activated() {},

  computed: {},

  watch: {},

  methods: {
    getContent() {
      let loading = dsf.layer.loading();
      let self = this;
      let url=`ctrl/toScreen/handleRrecords?pk=${this.formMeta.parameters.pk}&dbName=${this.metaData.extra.dbName}&subDbName=${this.metaData.extra.subDbName}&tempName=${this.metaData.extra.tempName}`
      dsf.http
        .post(url)
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
            this.content=res.data.message;
          } else {
            // dsf.layer.toast(res.data.message);
            console.log(res.data.message);
            this.metaData.show=0;
          }
        })
        .error((err) => {
          dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang='scss'>
</style>