<template>
  <div class="filepreview">
    <iframe frameborder="0" :src="previewurl"></iframe>
  </div>
</template>
<script>
export default {
  name: "zydxfilepreview",
  data() {
    return {
        url: this.$route.query.url || "",
        previewurl:""
    }
  },
  mounted() {
    this.loadfile();
  },
  methods: {
    loadfile(){
        let self = this
        if(self.url){
          self.previewurl = self.url;
        }
        
        // let obj = {
        //     httpFile: decodeURIComponent(self.url)
        // }
        // if(self.url){
        //   dsf.http.get("/ctrl/dcs/httpView", obj)
        //     .then(res => {
        //         if (res.data.success == "true") {
        //             self.previewurl = res.data.data.viewUrl;
        //         } else {
        //             self.dsf.layer.toast(res.data.message);
        //         }
        //     })
        //     .catch(res => {
        //         self.dsf.layer.toast(res.message || "失败");
        //     })
        //     .finally(() => { });
        // }
    }
  }
}
</script>
<style lang='scss' scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
.filepreview {
  height: calc(100vh - 50px);
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>