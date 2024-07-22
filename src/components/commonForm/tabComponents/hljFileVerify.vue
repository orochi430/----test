<template>
  <div class="hljFileVerify">
    <div v-for="(item, index) in files" :key="item.fileId" class="card">
      <div class="header">
        <span class="title">{{ index + 1 }}、{{ item.fileName }}</span>
        <span class="status" v-if="item.statusText == '通过'" style="color: green;">{{ item.statusText }}</span>
        <span class="status" v-if="item.statusText == '审核中'" style="color: orange;">{{ item.statusText }}</span>
        <span class="status" v-if="item.statusText == '未通过'" style="color: red;">{{ item.statusText }}</span>
      </div>
      <div class="footer-btn">
        <button @click="filePreview(item)">预览</button>
        <button v-if="item.statusText != '审核中' && item.isExamine == 1" @click="pass(0, item)">通过</button>
        <button v-if="item.statusText != '审核中' && item.isExamine == 1" @click="pass(1, item)">不通过</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'hljFileVerify',
  props: {
    formData: {
      default: () => ({}),
      type: Object
    },
    formMeta: {
      default: () => ({}),
      type: Object
    },
    allFile: {
      default: () => ([]),
      type: Array
    },
    params: {
      default: () => ({}),
      type: Object
    }
  },
  data() {
    return {
      tcqId: "",
      moduleId: "",
      nodeId: "",
      flowId: "",
      files: []
    }
  },

  created() {
    let tcq = this.params[this.formMeta.parameters.moduleId]
    if (!tcq) {
      dsf.layer.toast("该模块未配置统筹区ID！", false)
    }
    this.tcqId = tcq
      this.moduleId = this.formMeta.parameters.moduleId
    this.nodeId = this.formMeta.parameters.nodeId
    this.flowId = this.formMeta.parameters.flowId
    this.init()
  },

  methods: {
    init() {
      dsf.http.post("ctrl/mobile/getFileReviewInfo", {
        pk: this.formMeta.parameters.pk,
        moduleId: this.moduleId,
        nodeId: this.nodeId,
        tcq: this.formData.main[this.tcqId].value
      }).then(({ data }) => {
        this.files = data.data
      })
    },
    filePreview(item) {
      let loginToken = dsf.util.loadSessionStore("loginToken");
      let title = item.fileName
      let url = dsf.url.getServerUrl(
        `fn/office/openMobileOffice?fileId=${item.fileId}&moduleId=${this.moduleId}&fileName=${title}&nodeId=${this.nodeId}&flowId=${this.flowId}&x-auth-token=${loginToken}`
      )
      this.$router.push({
        path: "/iframe",
        query: {
          url,
          title
        }
      })
    },
    pass(flag, item) {
      // console.log({
      //   value: flag ? "0" : "",
      //   text: flag ? "不通过" : "通过"
      // });
      // this.$set(this.formData.main, item.metaDataId, {
      //   value: flag ? "0" : "",
      //   text: flag ? "不通过" : "通过"
      // })
      this.$eventBus.DoSaveForm(this, "")
      setTimeout(() => {
        this.init()
      }, 1000)
    }
  },

}

</script>

<style scoped lang='scss'>
.hljFileVerify {
  padding-bottom: 1px;

  .card {
    background: #ffffff;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    margin: 10px;
    padding: 15px 10px;
    overflow: hidden;

    .header {
      min-height: 50px;
      font-size: 16px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;

      .title {
        width: 80%;
      }

      .status {
        width: 20%;
        text-align: center;
        font-weight: 600;
      }
    }

    .footer-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 18px 0;

      button {
        width: 25%;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 3px 8px;
      }
    }
  }
}
</style>