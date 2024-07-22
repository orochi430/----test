//电气 新闻搜索
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    //无正文内容 则直接打开第一个附件
    dsf.http
      .post('/fn/newscontent/detail', {
        id: itemValue["A0001"],
      })
      .then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.content == "") {
            filePre(res.data.data.attachFile[0])
          } else {
            vueData.$router.push({
              name: 'elecDetail',
              query: {
                id: itemValue["A0001"]
              },
              params: {
                data: res.data.data,
              }
            })
          }
        }

      }).error((error) => {
        dsf.layer.toast("无相关附件！");
      });

  };

  function filePre(file) {
    let paramVal = {
      fileId: file.fileId,
      moduleId: '220803111621B521Wfaj0JHZLp0lbpU',
      fileName: file.fileName,
      flowId: 0,
      nodeId: -1,
      screenWidth: 375,
      "x-auth-token": dsf.util.loadSessionStore("loginToken"),
      addLoading: 1
    }

    const index = file.fileName.lastIndexOf(".");
    const suffix = file.fileName.substr(index + 1);
    const toLowerSuffix = suffix.toLowerCase();
    let imgArr = ["png", "jpg", "jpeg", "bmp", "gif"];
    if (imgArr.indexOf(toLowerSuffix) > -1) {
      this.imgPreview = true;
      let imgUrl = dsf.url.getWebPath(`ctrl/file/download?infoId=${file.infoId}&fileId=${file.fileId}&fileName=${file.fileName}`)
      this.previewImg = [imgUrl];
      console.log(imgUrl);
    } else {
      dsf.http.post('/fn/office/openMobileOffice', paramVal).then(res => {
          if (res.data.code == 200) {
            this.$router.push({
              name: "dsfIframe",
              query: {
                url: res.data.message,
                title: file.fileName
              },
            });

          }
        })
        .error((error) => {
          dsf.layer.toast("文件预览失败！");
        });
    }

  }
  window.spListJS = exportObj;
})();
