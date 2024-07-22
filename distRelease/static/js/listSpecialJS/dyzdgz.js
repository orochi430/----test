//东营
(function() {
  const exportObj = {};
  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    console.log(itemValue);
    if(itemValue.fileId) {
      let url = dsf.url.getWebPath(`fn/office/openMobileOffice?fileId=${itemValue.fileId}&moduleId=${moduleId}&fileName=${itemValue.filename}&nodeId=-2&flowId=0&x-auth-token=${dsf.util.loadSessionStore("loginToken")}&screenWidth=375`)
      // let url = dsf.url.getWebPath(`/fn/material/fileFlow?fileId=${itemValue.fileId}`)
      vueData.$router.push({
        path: "/iframe",
        query: { url, title: itemValue.filename }
      });
    }else {
      dsf.layer.toast("暂无附件，请查看视频！")
    }
  };
  exportObj.playVideo = function(itemValue, vueData) {
    if(itemValue.dataValue.videoId) {
      let src = `/fn/mobileFileDownload/download?fileId=${itemValue.dataValue.videoId}&moduleId=221121215732cNadSQlJjcjm2TliXBR&fileName=${itemValue.dataValue.videoName}`
      vueData.$refs.dslist.video.showVideo = true
      vueData.$refs.dslist.video.videoTitle = itemValue.dataValue.videoName
      vueData.$refs.dslist.video.src = dsf.url.getWebPath(src)
    }
  };
  window.spListJS = exportObj;
})();
