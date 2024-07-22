// 农村农业办 政务信息模块点击文件列表中的标题直接打开正文功能
(function () {
  const exportObj = {};
  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    function stripscript(s) {
      let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*——|{}‘；：”“'？↵\r\n ]");
      let rs = "";
      for (let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
      }
      return rs;
    }
    function wpsOpen(part, fileUrl, suffix) {
      let rootPath = dsf.url.getRootPath()
      let downUrl = rootPath + fileUrl;
      let fileName = stripscript(part.title);
      let param = {
        keepCallback: true,
        downUrl: encodeURI(downUrl),
        saveUrl: rootPath + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${part.moduleId}&pnId=${part.pnId}&nodeName=${part.nodeName}&fileType=1&infoId=${part.infoId}&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`,
        fileName: fileName,
        openWithWPS: true,
        uploadFile: true,
        openMode: part.canEdit > 0 ? "EditMode" : "readOnly", //不是已办结文件、已办事项 并且后台参数可编辑，允许编辑，否则只读
        enterReviseMode: part.isRevise == "1" ? true : false,
        showReviewingPaneRightDefault: part.isNoModify == "1" ? true : false,
        userName: dsf.util.loadSessionStore("user").name
      };
      $WPS.downAndOpen(param, function (data) {
        console.log("成功回调", data);
      }, function (data) {
        console.log("错误回调", data);
      });
    }
    let infoUrl = dsf.config.clientType == "iPad" ? "fn/xform/getInfo?hd=1" : "fn/xform/getInfo";
    let params = {moduleId, pk, listid}
    dsf.http.get(infoUrl, params).then( ({data}) => {
      let parameters = data.struct.parameters
      let filesParams = {
        info_id: pk,
        infoId: pk,
        nodeId: parameters.nodeId,
        flowId: parameters.flowId,
        moduleId: moduleId,
        start: 1,
        limit: 100
      }
      dsf.http.post("fn/mobileAttachment/getFormAttachment", filesParams).then((data) => {
        let loginToken = dsf.util.loadSessionStore("loginToken");
        let timestamp = new Date().getTime();
        let mainDocument = data.data.rows.find(item => item.name == "正文")
        if (mainDocument && mainDocument.document) {
          let attachment = mainDocument.document[0]
          let part = {
            id: attachment.id,
            title: attachment.title,
            type: attachment.type,
            size: attachment.showFileSize || "",
            navtiveUrl: attachment.url,
            url: dsf.url.getServerUrl(
              `fn/office/openMobileOffice?fileId=${attachment.id}&moduleId=${attachment.moduleId}&fileName=${attachment.title}&nodeId=${ parameters.nodeId}&flowId=${ parameters.flowId}&x-auth-token=${loginToken}`
            ),
            initUrl: `fn/file/download?infoId=${attachment.infoId}&fileId=${attachment.id}&fileName=${attachment.title}&nrType=${attachment.type}&moduleId=${attachment.moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${attachment.title}`,
            infoId: attachment.infoId,
            moduleId: attachment.moduleId,
            isNoModify: attachment.isNoModify,
            canEdit: attachment.canEdit,
            pnId: parameters.pnId,
            nodeName: parameters.nodeName
          };
          const index = part.navtiveUrl.lastIndexOf(".");
          const suffix = part.navtiveUrl.substr(index + 1);
          wpsOpen(part, part.initUrl, suffix)
        } else {
          dsf.layer.toast("暂无正文！")
        }
      }).catch((err) => console.log(err));
    })
  };
  window.spListJS = exportObj;
})();
