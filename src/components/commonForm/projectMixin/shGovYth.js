export default {
  // data() {
  //   return {
  //     CANNOT_HANDLE_WRITE_PRIVILEGE: "默认表单显示"
  //   }
  // },
  methods: {
    projectBeforechangeTab(name) {
      if (name == "onlyOnefilePreview") {
        let file = this.allFile.find(item => item.attachType == 0)?.file[0]
        let type = file?.title.substr(file.title.lastIndexOf(".") + 1)
        if (file && (type == "pdf" || type == "ofd") && dsf.config.commonForm.locationHrefToFile) {
          dsf.util.filePreview({ fileId: file.id, fileName: file.title, moduleId: this.formMeta.moduleId })
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }
  }
}
