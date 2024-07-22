<template>
  <div class="ds-enclosure-pre">
    <iframe id="filePreview" v-if="chaturl && chaturl.length > 0" :src="chaturl" frameborder="0"/>
    <commonempty v-else description="暂无预览"/>
  </div>
</template>

<script>
import store from "../../../common/util";
export default {
  name:"chatFrame",
  props:["formData","formMeta"],
  data(){
    return {
      pk: this.$route.params.pk,
      moduleId: this.$route.params.moduleId,
      chatLocation:dsf.config.formChat.chatLocation,
      chaturl:"",
    }
  },
  mounted(){
      this.chaturl=this.chatLocation+"?userid="+store.loadSessionStore("user").user_id+"#/app/groupchat?targetId="+this.pk+"&type=3";
  }
}
</script>

<style lang="scss">
// @import "../../assets/font/font.css";

@import "../../../assets/styles/themes.scss";

@import "../../../assets/styles/mixin.scss";

.ds-enclosure-pre{
  width: 100%;
  // height: calc(100vh - 138px);
  height:100%;
  background-color: #fff;
  // margin-top: 13px;
  // padding-top:13px;
  *{
    box-sizing: border-box;
  }
  iframe{
    width: 100%;
    height: 100% !important;
  }
}
</style>
