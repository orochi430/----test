// 一体化办公厅 接待信息查看
;(function () {
  const exportObj = {}

  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    dsf.layer.loading()
    dsf.http
      .post("ctrl/instructions/getPrintFileIds", {
        pk: pk,
        moduleId: moduleId,
        nodeId: -1,
        formId: ""
      })
      .then(res => {
        dsf.layer.clear()
        let fileId = res.data.data.fileId
        let fileName = res.data.data.fileName
        if (fileId) {
          let loginToken = dsf.util.loadSessionStore("loginToken")
          let rootPath = dsf.url.getRootPath()
          let url = rootPath + `fn/office/openMobileOffice?fileId=${fileId}&moduleId=${moduleId}&fileName=${fileName}&x-auth-token=${loginToken}`
          if (dsf.config.commonForm.webViewPreview) {
            if (window.wx) {
              wx.invoke(
                "openUrl",
                {
                  type: 0, //0或不填表示使用内部浏览器新窗口打开，1表示用系统浏览器打开
                  url: url //url地址
                },
                function (res) {
                  if (res.err_msg != "openUrl:ok") {
                    //错误处理
                  }
                }
              )
            } else {
              xsfWindow.openWebView({
                title: "接待信息查看",
                url: url,
                colorString: "#111111"
              })
            }
          } else {
            vueData.$router.push({
              path: "/iframe",
              query: {
                url: url
              }
            })
          }
        } else {
          vueData.$router.push({
            path: `/commonForm/${moduleId}/${pk}?listId=${listid}`
          })
        }
      })
      .catch(err => {
        vueData.$router.push({
          path: `/commonForm/${moduleId}/${pk}?listId=${listid}`
        })
      })
  }
  window.spListJS = exportObj
})()
