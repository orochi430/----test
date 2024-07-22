(function() {
  const exportObj = {};
  exportObj.judgeAttachSend = function(formData, formMeta, vueData) {
    let falg = vueData.allFile.some(item => item.file.length > 0);
    if (falg) {
      vueData.buttonHandle["send"](
        vueData.$route.params,
        vueData.formMeta,
        vueData.formData,
        vueData,
        vueData.$refs
      );
    } else {
      dsf.layer.confirm(
        {
          message:"您还没有上传正文，确定不上传吗？点“确定”不上传，提交任务；点“取消”上传文件"
        },() => {
          vueData.buttonHandle["send"](
            vueData.$route.params,
            vueData.formMeta,
            vueData.formData,
            vueData,
            vueData.$refs
          );
        }
      );
    }
  };
  window.spJS = exportObj;
})();