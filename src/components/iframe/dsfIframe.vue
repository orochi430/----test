<template>
  <div class="dsf-iframe" style="height: 100%">
    <iframe ref="ifs" class="iframe" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
  export default {
    name: "dsfIframe",
    data() {
      return {
        load: null,
        url: ""
      }
    },
    props: {
      src: {
        type: String,
        default: ''
      }
    },
    computed: {},
    components: {},
    created: function () {

    },
    mounted: function () {
      let iframe = this.$refs['ifs'];
      // 处理兼容行问题
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', this.end)
      } else {
        iframe.addEventListener("load", this.end)
        // iframe.onload = this.end;
      }
      this.url = this.src;
      if (iframe) {
            //菜单点击时   发送一个postmessage   供iframe内部页面监听使用
        let postdata = {
            type: "OA",
            action: "click",
        }
        iframe.onload = function (e) {
          iframe.contentWindow.postMessage(postdata, "*");
        };
      }
      this.load = this.$toast.loading({
        message: '加载中...',
        duration: 0
      });
      setTimeout(() => {
        if (this.load) {
          this.load.message = `加载中...`;
        } else {
          // 手动清除 Toast
          this.load.clear();
        }
      }, 5000);
    },
    methods: {
      end() {
        this.load.clear()
        this.$emit("load");
      }
    },
    watch: {
      src: function () {
        this.url = this.src;
      }
    },
    destroyed() {
      this.load.clear()
    }
  }
</script>

<style scoped lang="scss">
  .iframe {
    width: 100%;
    height: 100%;
  }
</style>