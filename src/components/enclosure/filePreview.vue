<template>
  <div class="filePreview" :style="{ height: `calc(100vh - ${dsf.util.getOffsetTop()} - ${$store.state.isShowAppFooter ? '1.2rem' : '0px'})` }">
    <enclosure-preview
      v-if="dsf.config.commonForm.LocalDocPreview"
      ref="enclosurePreview"
      :file="popFile"
      :is-preview="isPreview"
      :is-signature="isSignature"
      :isShowCurPerson="isShowCurPerson"
      :isShowAddPage="isShowAddPage"
      :leaderUser="leaderUser"
      @goPreview="goPreview"
      @goHandWrite="goHandWrite"
      :officeModuleId="popFile.officeModuleId || ''"
    ></enclosure-preview>
    <!-- <div v-else class="content">
        <iframe :src="fileUrl" frameborder="0"></iframe>
    </div> -->
  </div>
</template>

<script>
// import EnclosurePreview from "@/components/enclosure/EnclosurePreview"
export default {
  name: "filePreview",
  components: {
    'EnclosurePreview': () => import('@/components/enclosure/EnclosurePreview'),
  },
  props: {},
  data() {
    return {
      popFile: {},
      isPreview: true,
      isSignature: this.$route.query.isHandwrite == undefined ? true : this.$route.query.isHandwrite > 0,
      isShowCurPerson: true,
      isShowAddPage: this.$route.query.isShowAddPage == undefined ? true : this.$route.query.isShowAddPage > 0,
      leaderUser: this.$route.query.leaderUser || ''
    }
  },
  computed: {},
  watch: {},
  created() {
    if (this.$route.query.isShowCurPerson != undefined) this.isShowCurPerson = this.$route.query.isShowCurPerson > 0
    this.popFile = {
      id: this.$route.params.fileId,
      officeModuleId: this.$route.params.officeModuleId,
      moduleId: this.$route.query.moduleId,
      isHandwrite: this.$route.query.isHandwrite || 0
    }
    this.$store.state.pageTitle = this.$route.query.title || ""
  },
  mounted() {
    console.log(this.popFile, "文件信息====")
  },
  methods: {
    goPreview() {
      this.isPreview = true
    },
    goHandWrite() {
      this.isPreview = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/themes.scss";
@import "src/assets/styles/mixin.scss";

.filePreview {
  // display: flex;
  // flex-direction: column;
  width: 100%;
  overflow: auto;

  .content {
    flex: 1;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
