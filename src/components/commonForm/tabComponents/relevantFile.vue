<template>
  <enclosure ref="enclosure" :headTab="headTab" :tabName="tabName" :fileData="fileData" :formData="formData" :allFile="allFile" :formMeta="formMeta"></enclosure>
</template>

<script>
import enclosure from "./../controls/enclosure"
export default {
  name: "relevantFile",
  props: ["formData", "formMeta", "allFile", "headTab", "tabName"],
  components: {
    enclosure,
  },
  data() {
    return {
      fileData: null
    }
  },
  created() {
    this.fileData = {
      info_id: this.$route.params.pk || this.formMeta.parameters.pk || this.formData.main['A0001'].value || "",
      moduleId: this.$route.params.moduleId || this.formMeta.parameters.moduleId,
      nodeId: this.formMeta.parameters.nodeId || '',
      nodeName: this.formMeta.parameters.nodeName || '',
      flowId: this.formMeta.parameters.flowId || '',
      pId: this.formMeta.parameters.pId || '',
      pnId: this.formMeta.parameters.pnId || '',
      uploadAttach: this.formMeta.parameters.uploadAttach || ''
    }
  }
}
</script>

<style>
</style>