import dsf from "../../../common";

const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
  let obj = {
    moduleId: vueData.moduleId,
  }
  if (vueData.$route.query.replyId) {
    obj.replyId = vueData.$route.query.replyId
  } else if (vueData.$route.query.forwardIds) {
    obj.forwardIds = vueData.$route.query.forwardIds
  } else {
    obj.pk = vueData.$route.params.pk
  }
  dsf.http.post("fn/mobileNote/getNotepaperById", obj).then((data) => {
    vueData.noteId = data.data.id
    vueData.$set(formData.main, 'B0001', {value: data.data.noteTitle || ''})
    vueData.$set(formData.main, 'B0006', {value: data.data.jjcd , text: data.data.jjcdText || ''})
    vueData.$set(formData.main, 'C-BJ-0001', {value: data.data.content || '', text: data.data.contentText || ''})
    vueData.$set(formData.main, 'C-BJ-0002', {value: data.data.range, text:data.data.rangeName, schema:data.data.rangeSchema})
    if(vueData.allFile.length) {
      vueData.allFile[0].file = data.data.file ? data.data.file.attach.map(item => {
        return {
          "id":item.fileId,
          "title":item.fileName,
          "type":item.nrType,
          "size":item.showFileSize,
          "navtiveUrl":item.filePath,
          "url":['jpeg', 'bmp', 'webp', 'svgz', 'svg', 'gif', 'jpg', 'ico', 'png', 'tif'].indexOf(item.extension) > -1 ? dsf.url.getServerUrl(
            `fn/mobileFileDownload/download?fileId=${item.fileId}&moduleId=${vueData.moduleId}&fileName=${item.fileName}&isTemp=true`
          ) : dsf.url.getServerUrl(
            `fn/office/openMobileOffice?fileId=${item.fileId}&moduleId=${vueData.moduleId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`
          ),
          // "infoId":"220324174728uVnzn8JwigsgotL9MLz",
          "moduleId":vueData.moduleId,
          "isHandwrite":"-1",
          "isRevise":"-1",
          "canEdit":"-1",
          "canDownLoad":"1",
          "name":"附件"
        }
      }) : []
      vueData.allFile[0].uploadObj = data.data.file ? data.data.file.attach : []
    }
  })
}

export default exportObj;
