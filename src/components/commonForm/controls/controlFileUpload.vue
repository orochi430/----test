<template>
  <div id="controlFileUpload">
    <enclosure ref="enclosure" :fileData="fileData" :allFile=fileList :isControl="true" :formMeta="formMeta" :formData="formData" :metaData="metaData"></enclosure>
  </div>
</template>

<script>
import enclosure from "./enclosure"
export default {
  name: "controlFileUpload",
  components: {
    enclosure
  },
  props: {
    pformData: { // 为子表控件时，该值为子表元数据
      type: Object,
      default: () => ({})
    },
    pformMeta: {
      type: Object,
      default: () => ({})
    },
    topformData: { // 为子表控件时，该值为主表元数据
      type: Object,
      default: () => ({})
    },
    topformMeta: {
      type: Object,
      default: () => ({})
    },formData: {
      type: Object,
      default: () => ({})
    },
    formMeta: {
      type: Object,
      default: () => ({})
    },
    metaData: {
      type: Object,
      default: () => ({})
    },
    allFile: {
      type: Array,
      default: () => []
    },
    formId: { // 子表表单id
      type: String
    }
  },
  data() {
    return {
      fileList: [],
      fileData: {}
    };
  },
  watch: {
    allFile: {
      handler(newVal, oldVal) {
        this.fileList = newVal.filter(
          it => it.attachType == this.metaData.extra.attachType
        );
      },
      deep: true,
    }
  },
  created() {
    this.fileList = this.allFile.filter(
      it => it.attachType == this.metaData.extra.attachType
    );
    this.fileData = {
      info_id: this.pformData[this.formId]?.value || this.formMeta.parameters?.pk || this.formData.main['A0001'].value || "",
      moduleId: this.pformData['A0004']?.value || this.formMeta.parameters.moduleId,
      nodeId: this.topformMeta.parameters?.nodeId || this.formMeta.parameters?.nodeId || '',
      nodeName: this.formMeta.parameters?.nodeName || '',
      flowId: this.formMeta.parameters?.flowId || '',
      pId: this.topformMeta.parameters?.pId || this.formMeta.parameters?.pId || '',
      pnId: this.topformMeta.parameters?.pnId || this.formMeta.parameters?.pnId || '',
      uploadAttach: this.formMeta.parameters?.uploadAttach || '',
      mainPk: this.topformMeta.parameters?.pk || '',
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
