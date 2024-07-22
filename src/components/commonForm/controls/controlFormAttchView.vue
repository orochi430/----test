<template>
  <div class="controlFormAttchView">
    <iframe :key="ikey" ref="myIframe" width="100%" :src="url" :height="innerHeight || 500" frameborder="0" @load="resizeIframe" allowfullscreen></iframe>
  </div>
</template>

<script>
export default {
  name: "controlFormAttchView",
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
  },

  components: {},

  data() {
    return {
      url: "",
      innerHeight: "",
      ikey: new Date().getTime(),
    };
  },

  created() {
    let obj = this.allFile.find((item) => item.attachType == "0");
    this.url = obj.file[0].url;
    this.$bus.on("addUrlTimer", (data) => {
      console.log(data, "data");
      this.ikey = new Date().getTime()
      // if (this.url.includes("timer")) {
      //   this.url = this.url.replace(/timer=\d+/i, `timer=${+new Date()}`);
      // } else {
      //   this.url += `&timer=${+new Date()}`;
      // }
    });
  },

  mounted() {
    this.innerHeight = window.innerHeight - 100;
  },

  activated() { },

  computed: {},

  watch: {},

  methods: {
    getUrl() {
      let loading = dsf.layer.loading();
      let self = this;
      dsf.http
        .post("", {})
        .then((res) => {
          dsf.layer.closeLoading(loading);

          if (res.data.type === "success") {
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .error((err) => {
          dsf.layer.closeLoading(loading);
          console.log(err);
        });
    },
    resizeIframe() {
      // var iframe = this.$refs.myIframe;
      // iframe.style.height =
      // iframe.contentWindow.document.body.scrollHeight + "px";
    },
  },
};
</script>

<style scoped lang='scss'>
</style>