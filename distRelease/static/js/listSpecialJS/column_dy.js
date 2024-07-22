// 东营列表 点击是附件
(function() {
  const exportObj = {};
  // let url = dsf.url.getWebPath(`fn/office/openMobileOffice?fileId=${itemValue.fileId}&moduleId=${moduleId}&fileName=${itemValue.filename}&nodeId=-2&flowId=0&x-auth-token=${dsf.util.loadSessionStore("loginToken")}&screenWidth=375`)
  // // let url = dsf.url.getWebPath(`/fn/material/fileFlow?fileId=${itemValue.fileId}`)
  // vueData.$router.push({
  //   path: "/iframe",
  //   query: { url, title: itemValue.filename }
  // });

  exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    if (moduleId == "221121215732cNadSQlJjcjm2TliXBR") {
      if (itemValue.isSmValue == 1) {
        dsf.layer.toast("涉密信息，暂未上传!");
      } else if (itemValue.isSmValue != 1 && itemValue.fileId != "") {
        vueData.$router.push({
          path: `/commonForm/${moduleId}/${pk}?type=column_dy`,
          query: {
            listId: "ledgerAssert",
            method: "openRegisterForm",
            validateByList: 1,
            toNodeId: "-1"
          }
        });
      } else {
        dsf.layer.toast("暂无附件，请查看视频!");
      }
    } else if (moduleId == "210710115537bzPMvPInIUueECGeTWD") {
      if (itemValue.isSmValue == 1) {
        dsf.layer.toast("涉密信息，暂未上传!");
      } else if (itemValue.isSmValue != 1 && itemValue.zjFileIds != "") {
        vueData.$router.push({
          path: `/commonForm/${moduleId}/${pk}?type=column_dy`,
          query: {
            listId: "ledgerAssert",
            method: "openRegisterForm",
            validateByList: 1,
            toNodeId: "-1"
          }
        });
        // if (itemValue.zjFileIds != "") {
        //   vueData.$router.push({
        //     path: `/commonForm/${moduleId}/${pk}?type=column_dy`,
        //     query: {
        //       listId: "ledgerAssert",
        //       method: "openRegisterForm",
        //       validateByList: 1,
        //       toNodeId: "-1"
        //     }
        //   });
        // } else if (itemValue.zjFileIds == "" && itemValue.dctzFileIds != "") {
        //   vueData.$router.push({
        //     path: `/commonForm/${moduleId}/${pk}?type=column_dy`,
        //     query: {
        //       listId: "ledgerAssert",
        //       method: "openRegisterForm",
        //       validateByList: 1,
        //       toNodeId: "-1"
        //     }
        //   });
        // } else {
        //   dsf.layer.toast("附件信息不全!");
        // }
      } else if (
        itemValue.isSmValue != 1 &&
        itemValue.zjFileIds == "" &&
        itemValue.dctzFileIds != ""
      ) {
        vueData.$router.push({
          path: `/commonForm/${moduleId}/${pk}?type=column_dy`,
          query: {
            listId: "ledgerAssert",
            method: "openRegisterForm",
            validateByList: 1,
            toNodeId: "-1"
          }
        });
      } else {
        dsf.layer.toast("附件信息不全!");
      }
    }
  };

  exportObj.playVideo = function(itemValue, vueData) {
    if (itemValue.dataValue.videoId) {
      let src = `/fn/mobileFileDownload/download?fileId=${itemValue.dataValue.videoId}&moduleId=221121215732cNadSQlJjcjm2TliXBR&fileName=${itemValue.dataValue.videoName}`;
      vueData.$refs.dslist.video.showVideo = true;
      vueData.$refs.dslist.video.videoTitle = itemValue.dataValue.videoName;
      vueData.$refs.dslist.video.src = dsf.url.getWebPath(src);
    }
  };

  window.spListJS = exportObj;
})();
