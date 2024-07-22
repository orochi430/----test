//鄂尔多斯市伊金霍洛旗政府智慧政务协同办公云平台，需要打开手写签批插件
(function () {
  const exportObj = {};
  let fileData = {};
  let self = {};
  let formUrl = "";
  let attachmentUrl = "";
  let moveStatusUrl = "";
  let fileTimer = null;
  async function dianJuFileOpen(part, fileUrl, suffix) {
    let can_edit = String(part.canEdit) === "1" ? true : false;
    let rootPath = dsf.url.getRootPath();
    const save_url =
      rootPath +
      `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${
        part.moduleId
      }&pnId=${fileData.pnid}&nodeName=${fileData.nodeName}&fileType=1&infoId=${
        part.infoId
      }&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore(
        "loginToken"
      )}`;
    const down_url = rootPath + fileUrl;
    let obj = {
      fileUrl: down_url,
      title: part.title,
      canEdit: can_edit,
      uploadUrl: save_url,
      keyId: part.id,
      userName: dsf.util.loadSessionStore("user").name,
      webData: {
        webDianjutTab: true,
        formUrl:
          location.href.split("#/")[0] +
          `#/autoLoginToUrl/${dsf.util.loadSessionStore(
            "loginToken"
          )}/${formUrl}/` +
          Math.random() +
          "?isdjOpen=1",
        attachmentUrl:
          location.href.split("#/")[0] +
          `#/autoLoginToUrl/${dsf.util.loadSessionStore(
            "loginToken"
          )}/${attachmentUrl}/` +
          Math.random() +
          "?isdjOpen=1",
      },
      useFingerWrite: "false", //是否能手指手写签批 String类型，true开启 false不开启，不使用此属性则传空字符串或者不传，因为本地配置文件也有开关控制此功能，不传参以本地开关为准，传了true或false，则以此参数为准
      tab: [
        { title: "签批单", type: "sign" },
        {
          title: "附件",
          type: "attachment",
          url:
            location.href.split("#/")[0] +
            `#/autoLoginToUrl/${dsf.util.loadSessionStore(
              "loginToken"
            )}/${attachmentUrl}/` +
            Math.random() +
            "?isdjOpen=1",
        },
        {
          title: "流转情况",
          type: "moveStatus",
          url:
            location.href.split("#/")[0] +
            `#/autoLoginToUrl/${dsf.util.loadSessionStore(
              "loginToken"
            )}/${moveStatusUrl}/` +
            Math.random() +
            "?isdjOpen=1",
        },
      ],
      "btnList": [{ "type": "text", "show": true, "name": "" }, { "type": "dialogWrite", "show": true, "name": "" }]
    };
    console.log("点聚参数", obj);
    let isOpenSign = await isSignFileLock(part.id);
    if (!isOpenSign) {
      xsfCommon.dianJuSdk(
        JSON.stringify(obj),
        function success(result) {
          result = JSON.parse(result);
          console.log("打开点聚的回调参数", result);
          if (result.message == "dianjuUploadSuccess") {
            self.$parent.$parent.$parent["action-faSong"]({
              dataValue: fileData,
            });
            destroyFileInterval(part.id);
            destroyFileIntervalAll(fileData.info_id || fileData.pk || fileData.infoId);
          } else if (result.message == "dianjuBackSuccess") {
            self.$parent.$parent.$parent["action-tuiHui"]({
              dataValue: fileData,
            });
            destroyFileInterval(part.id);
            destroyFileIntervalAll(fileData.info_id || fileData.pk || fileData.infoId);
          } else if (result.message == "dianjuOpenSuccess") {
            // 轮询文件加锁接口
            continueLockFile(part.id);
          } else if (result.message == "dianjuOpenError") {
            dsf.layer.alert({
              message: "文件打开失败:" + down_url,
            });
          } else if (result.message == "dianjuFileClose") {
            if (!(result.type == "open" && result.result)) {
              //根据type判断，只要是open,且result为true，那就是加锁，其余情况回调，就是解锁
              destroyFileInterval(part.id);
              destroyFileIntervalAll(fileData.info_id || fileData.pk || fileData.infoId);
            } else if (result.type == "send") {
              //签批界面的发送按钮回调
              self.$parent.$parent.$parent["action-faSong"]({
                dataValue: fileData,
              });
            }
          }
        },
        function error(error) {
          console.log("open failed: ", error);
        }
      );
    }
  }
  exportObj.link = Throttle(function (
    listid,
    moduleId,
    pk,
    vueData,
    itemValue
  ) {
    self = vueData;
    fileData = itemValue;
    let filesParams = {
      info_id: itemValue.info_id,
      infoId: itemValue.info_id,
      nodeId: itemValue.nodeId,
      flowId: itemValue.flowId,
      moduleId: moduleId,
      start: 1,
      limit: 100,
    };
    let handWrittenFile = [];
    dsf.http
      .post("fn/mobileAttachment/getFormAttachment", filesParams)
      .then((data) => {
        let rows = data.data.rows;
        let loginToken = dsf.util.loadSessionStore("loginToken");
        rows.forEach((item) => {
          if (item.document) {
            item.document.forEach((doc, idx) => {
              let obj = {
                id: doc.id,
                title: doc.title,
                type: doc.type,
                size: doc.showFileSize || "",
                navtiveUrl: doc.url,
                initUrl: `fn/file/download?infoId=${doc.infoId}&fileId=${doc.id}&fileName=${doc.title}&nrType=${doc.type}&moduleId=${doc.moduleId}&x-auth-token=${loginToken}&fullfilename=${doc.title}`,
                infoId: doc.infoId,
                moduleId: doc.moduleId,
                isHandwrite: doc.isHandwrite,
                isRevise: doc.isRevise,
                isNoModify: doc.isNoModify,
                canEdit: doc.canEdit,
                canDownLoad: doc.canDownLoad,
                name:
                  item.document.length > 1
                    ? `${item.name}${idx + 1}`
                    : item.name,
              };
              if (obj.isHandwrite == "1" ) {
                //item.name == "手写签批" &&
                handWrittenFile.push(obj);
              }
            });
          }
        });

        let query = {
          LocalPdfPreview:1
        };
        if (itemValue.todoId && itemValue.todoId.indexOf("_") > -1) {
          //todoId是待办使用的，目前有列表返回todoId但是格式不正确，增加判断
          query.todoId = itemValue.todoId;
        }
        let moduleId = itemValue.moduleId;
        let params = moduleId + "/" + pk;
        let formUrlTem =
          "/commonForm/" +
          params +
          "?isShowHeader=0&isdjOpen=1&activeTab=formTab&hideOtherTab=1&needBtn=0";
        let attachmentUrlTem =
          "/commonForm/" +
          params +
          "?isShowHeader=0&isdjOpen=1&activeTab=relevantFile&hideOtherTab=1&needBtn=0";
        let moveStatusUrlTem =
          "/commonForm/" +
          params +
          "?isShowHeader=0&isdjOpen=1&activeTab=moveStatus&hideOtherTab=1&needBtn=0";
        if (query.todoId) {
          formUrlTem += `&todoId=${query.todoId}`;
          attachmentUrlTem += `&todoId=${query.todoId}`;
        }
        formUrl = dsf.base64.encode(formUrlTem);
        attachmentUrl = dsf.base64.encode(attachmentUrlTem);
        moveStatusUrl = dsf.base64.encode(moveStatusUrlTem);
        let power = dsf.util.loadSessionStore("user")?.privileges.some(item => item.name === "手写签批权限");
        if (handWrittenFile.length && power) {
          // dsf.config.commonForm.dianJu.isEnable = true;
          let file = handWrittenFile[0];
          const index = file.navtiveUrl.lastIndexOf(".");
          const suffix = file.navtiveUrl.substr(index + 1);
          dianJuFileOpen(file, file.initUrl, suffix);
        } else {
          // dsf.config.commonForm.dianJu.isEnable = false;
          vueData.$router.push({
            path: "/commonForm/" + params,
            query: query,
          });
        }
      })
      .catch((err) => console.log(err));
  },
  1500);
  function getFormAttachment(filesParams) {
    return new Promise((resolve, reject) => {
      dsf.http
        .post("fn/mobileAttachment/getFormAttachment", filesParams)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // 判断文件是否锁住状态,其他人无法继续签批
  async function isSignFileLock(fileId) {
    let isLocked = false;
    // 是否开启了第三方插件拦截多人签批功能
    if (dsf.config.commonForm.isInterceptMultiPersonSign) {
      await dsf.http
        .post("fn/office/isLock", {
          fileId: fileId,
        })
        .then((res) => {
          console.log("isLock-res", res);

          if (res.data.type == "error") {
            // 别人在操作
            dsf.layer.alert({
              message:
                "当前文件正在由" + res.data.data.uname + "办理，请稍后处理。",
            });
            isLocked = true;
          }
        });
    }
    return isLocked;
  }
  // 文件修改签批过程定时轮询
  function continueLockFile(fileId) {
    // 是否开启了第三方插件拦截多人签批功能
    if (dsf.config.commonForm.isInterceptMultiPersonSign) {
      fileTimer = setInterval(() => {
        dsf.http
          .post("fn/office/continueLock", {
            fileId: fileId,
          })
          .then((res) => {
            console.log(res, "文件定时上锁");
          });
      }, 30000);
    }
  }
  // 文件解锁
  function destroyFileInterval(fileId) {
    clearInterval(fileTimer);
    fileTimer = null;
    if (dsf.config.commonForm.isInterceptMultiPersonSign) {
      dsf.http
        .post("fn/office/unLock", {
          fileId: fileId,
        })
        .then((res) => {
          console.log(res, "文件解锁");
          // dsf.config.commonForm.dianJu.isEnable = false;
        });
    }
  }
  // 删除当前用户对应当前文件的所有附件锁
  function destroyFileIntervalAll(pk) {
    clearInterval(fileTimer);
    fileTimer = null;
    if (dsf.config.commonForm.isInterceptMultiPersonSign) {
      dsf.http
        .post("fn/office/releaseLock", {
          pk: pk,
        })
        .then((res) => {
          console.log(res, "所有文件解锁成功");
          // 关闭点聚权限
          // dsf.config.commonForm.dianJu.isEnable = false;
        });
    }
  }
  // 点击列表上的发送解锁文件
  exportObj.faSong = function (itemValue, vueData) {
    let handWrittenFile = [];
    // console.log(itemValue, vueData);
    let filesParams = {
      info_id: itemValue.dataValue.info_id,
      infoId: itemValue.dataValue.info_id,
      nodeId: itemValue.dataValue.nodeId,
      flowId: itemValue.dataValue.flowId,
      moduleId: itemValue.dataValue.moduleId,
      start: 1,
      limit: 100,
    };
    getFormAttachment(filesParams)
      .then((data) => {
        let rows = data.data.rows;
        rows.forEach((item) => {
          if (item.document) {
            item.document.forEach((doc, idx) => {
              let obj = {
                id: doc.id,
                isHandwrite: doc.isHandwrite,
              };
              if (obj.isHandwrite == "1") {
                //item.name == "手写签批" &&
                handWrittenFile.push(obj);
              }
            });
          }
          if (handWrittenFile.length != 0) {
            destroyFileInterval(handWrittenFile[0].id);
          }
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
    vueData["action-faSong"]({
      dataValue: itemValue.dataValue,
    });
  };
  // 点击列表节流
  function Throttle(func, time) {
    let wait = false;
    return (...args) => {
      console.log("args:", args);
      if (wait) return;
      func(...args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, time);
    };
  }
  window.spListJS = exportObj;
})();
