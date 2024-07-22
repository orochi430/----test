<template>
  <div class="ds-enclosure-pre">
    <iframe id="filePreview" v-if="fileUrl && fileUrl.length > 0" :src="fullUrl" frameborder="0"/>
    <commonempty v-else description="暂无预览"/>
  </div>
</template>

<script>
export default {
  name: 'EnclosurePre',
  props: {
    fileUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  mounted(){
       window.filePreview.onhashchange=function(arg){
         console.log('tag',window.filePreview.location.href);
       }
  },
  computed: {
    fullUrl () {
      return dsf.url.openOffice(encodeURIComponent(this.fileUrl));
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
// @import "../../assets/font/font.css";

@import "../../assets/styles/themes.scss";

@import "../../assets/styles/mixin.scss";

.ds-enclosure-pre{
  width: 100%;
  // height: calc(100vh - 147px);
  background-color: #fff;
  // margin-top: 13px;
  *{
    box-sizing: border-box;
  }
  iframe{
    width: 100%;
    height: 100%;
  }
}
</style>
