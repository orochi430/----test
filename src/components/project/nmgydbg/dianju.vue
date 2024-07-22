<template>
  <div class="dianju" ref="enclosurePre">
    <van-tabs v-if="ifra">
      <van-tab :title="obj.name" v-for="(obj, index) in qydFiles" :key="obj.id">
        <iframe
          frameborder="0"
          width="100%"
          :src="obj.url"
          :key="obj.url"
          :id="'filePreview' + index"
          @load="changeFrameHeight(index)"
        ></iframe>
      </van-tab>
    </van-tabs>
    <van-popup
      :get-container="getContainer"
      ref="sendPop"
      v-model="showFlowSend"
      lock-scroll
      style="height: 90vh"
      position="bottom"
      round
      @close="closeSendFilePopup"
    >
      <sendFile
        v-show="showFlowSend"
        ref="sendFile"
        :form-data="fileData"
        :isShowWriteOpintionBtn="true"
        @change="handleFlowSendChange"
        @close="closeSendFile"
      />
    </van-popup>
    <van-popup
      v-model="showType"
      closeable
      round
      :close-on-click-overlay="false"
      :style="{ width: '60%' }"
      class="center"
      @click-close-icon="closealertPopup"
    >
      <van-cell-group>
        <van-cell title="呈批" clickable @click="sendtype('呈批')"> </van-cell>
        <van-cell title="阅件" clickable @click="sendtype('阅件')"> </van-cell>
        <van-cell title="外出报备" clickable @click="sendtype('外出报备')">
        </van-cell>
        <van-cell title="信息" clickable @click="sendtype('信息')"> </van-cell>
      </van-cell-group>
    </van-popup>
  </div>
</template>
<script>
import sendFile from "@/components/sendFlow/sendFile";
export default {
  components: {
    sendFile,
  },
  data() {
    return {
      showFlowSend: false,
      moduleId: this.$route.query.moduleId,
      pk: this.$route.query.pk,
      todoId: this.$route.query.todoId||"",
      // istype: this.$route.query.istype,
      fileData: {},
      formUrl: "",
      attachmentUrl: "",
      istopForm: -2,
      typedata: "",
      showType: false,
      istopSendstr: false,
      sendtypestr: false,
      infoId: "",
      distribIds: this.$route.query.distribIds,
      qydFlag: this.$route.query.qydFlag,
      fileTimer: null,
      flag_dy: this.$route.query.flag_dy || false,
      user: dsf.util.loadSessionStore("user") || {},
      qydFiles: [],
      ifra: false,
      FileIds: "",
      spHandleJS: {},
    };
  },
  mounted() {
    if (dsf.config.login.toRegularForm) {
      //进去普通表单
      this.$router.replace({
        path: `/commonForm/${this.moduleId}/${this.pk}/1`,
        query: { todoId: this.todoId, webViewBack: true },
      });
    } else {
      //进点聚
      this.link();
      this.formUrl = dsf.base64
        .encode(
          `/commonForm/${this.moduleId}/${this.pk}/1?${
            this.todoId ? "todoId=" + this.todoId : ""
          }&isShowHeader=0&isdjOpen=1&activeTab=formTab&hideOtherTab=1`
        )
        .replace(new RegExp("/", "gm"), "@");
      this.attachmentUrl = dsf.base64
        .encode(
          `/commonForm/${this.moduleId}/${this.pk}/1?${
            this.todoId ? "todoId=" + this.todoId : ""
          }&isShowHeader=0&isdjOpen=1&activeTab=relevantFile&hideOtherTab=1`
        )
        .replace(new RegExp("/", "gm"), "@");
    }

    // window.addEventListener("beforeunload", this.beforeUnload);
  },

  methods: {
    async dianJuFileOpen(
      files,
      mainButtons,
      unifyMessage,
      closeDianju = false
    ) {
      let self = this;
      let rootPath = dsf.url.getRootPath();
      let webData = [];
      let logUrl =
        rootPath +
        `ctrl/qpController/saveLogDate?infoId=${this.pk}&nodeId=${
          this.fileData.nodeId
        }&userId=${dsf.util.loadSessionStore("user").user_id}`;
      let mdUrl = rootPath + "ctrl/checkMD5/getMD5byFileId";
      files.forEach((part) => {
        let index = part.navtiveUrl.lastIndexOf(".");
        let suffix = part.navtiveUrl.substr(index + 1);
        let save_url =
          rootPath +
          `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${
            part.moduleId
          }&pnId=${this.fileData.pnId}&nodeName=${
            this.fileData.nodeName
          }&fileType=1&infoId=${
            part.infoId
          }&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore(
            "loginToken"
          )}`;
        let down_url = rootPath + part.initUrl;
        this.FileIds = this.FileIds ? this.FileIds + "," + part.id : part.id;
        let signData = {
          title: part.name,
          type: "sign",
          fileUrl: down_url,
          fileName: part.title,
          uploadUrl: save_url,
          canEdit: String(part.canEdit) == "1" ? true : false,
          templateUrl: "",
          fileID: part.id,
        };
        webData.push(signData);
      });
      let obj = {
        keyId: this.pk,
        userName: dsf.util.loadSessionStore("user").name,
        tab: webData,
        mainButtons,
        unifyMessage,
        closeDianju: closeDianju,
        logUrl,
        mdUrl,
      };

      let isOpenSign = await this.isSignFileLock(this.FileIds);
      if (!isOpenSign) {
        console.log("点聚参数", obj);
        xsfCommon.dianJuTabSdk(
          JSON.stringify(obj),
          function success(result) {
            result = JSON.parse(result);
            console.log("打开点聚的回调参数", result);
            // const actions = {
            //   setFocus: () => self.setFocus(),
            //   deleteFocus: () => self.deleteFocus(),
            //   agreeRecycle: () => self.agreeRecycle(),
            //   refuseRecycle: () => self.refuseRecycle(),
            //   dianjuUploadSuccess: () => {
            //     if (self.istopSendstr) {
            //       self.istopSend();
            //     } else if (self.sendtypestr) {
            //       self.showType = true;
            //     } else {
            //       self.send();
            //     }
            //   },
            //   dianjuOpenSuccess: () => {
            //     // 轮询文件加锁接口
            //     self.continueLockFile(self.pk);

            //     if (self.flag_dy) {
            //       let buttonParams = {
            //         infoIds: self.pk,
            //         distribIds: self.distribIds,
            //         shareContent: "已阅",
            //       };
            //       dsf.http
            //         .post("fn/mobileToReadOperation/readed", buttonParams)
            //         .then(({ data }) => {
            //           const { message, result, type } = data;
            //           if (type === "success" || result) {
            //             // dsf.layer.toast("阅毕成功");
            //           }
            //         })
            //         .error(() => {
            //           dsf.layer.clear();
            //         });
            //     }
            //   },
            //   dianjuOpenError: () => {
            //     dsf.layer.alert({ message: "文件打开失败:" + down_url });
            //   },
            //   dianjuFileClose: () => {
            //     if (!(result.type == "open" && result.result)) {
            //       //根据type判断，只要是open,且result为true，那就是加锁，其余情况回调，就是解锁
            //       self.destroyFileInterval(self.FileIds);
            //     } else if (result.type == "send") {
            //       //签批界面的发送按钮回调
            //       if (self.istopSendstr) {
            //         self.istopSend();
            //       } else if (self.sendtypestr) {
            //         self.showType = true;
            //       } else {
            //         self.send();
            //       }
            //     }
            //   },
            // };
            //这个优化有一些问题
            // const action = actions[result.type || result.message];
            // if (action) {
            //   action();
            // }
            if (result.type == "setFocus") {
              self.setFocus();
            } else if (result.type == "deleteFocus") {
              self.deleteFocus();
            } else if (result.type == "agreeRecycle") {
              self.agreeRecycle();
            } else if (result.type == "refuseRecycle") {
              self.refuseRecycle();
            } else if (result.message == "dianjuUploadSuccess") {
              if (self.istopSendstr) {
                self.istopSend();
              } else if (self.sendtypestr) {
                self.showType = true;
              } else {
                self.send();
              }
            } else if (result.message == "dianjuOpenSuccess") {
              // 轮询文件加锁接口
              self.continueLockFile(self.FileIds);

              if (self.flag_dy) {
                let buttonParams = {
                  infoIds: self.pk,
                  distribIds: self.distribIds,
                  shareContent: "已阅",
                };
                dsf.http
                  .post("fn/mobileToReadOperation/readed", buttonParams)
                  .then(({ data }) => {
                    const { message, result, type } = data;
                    if (type === "success" || result) {
                      // dsf.layer.toast("阅毕成功");
                    }
                  })
                  .error(() => {
                    dsf.layer.clear();
                  });
              }
            } else if (result.message == "dianjuOpenError") {
              dsf.layer.alert({ message: "文件打开失败:" + down_url });
            } else if (result.message == "dianjuFileClose") {
              if (!(result.type == "open" && result.result)) {
                //根据type判断，只要是open,且result为true，那就是加锁，其余情况回调，就是解锁
                self.destroyFileInterval(self.FileIds);
              } else if (result.type == "send") {
                //签批界面的发送按钮回调
                if (self.istopSendstr) {
                  self.istopSend();
                } else if (self.sendtypestr) {
                  self.showType = true;
                } else {
                  self.send();
                }
              }
            }
          },
          function error(error) {
            console.log("open file error: ", error);
          }
        );
      }
    },
    link(closeDianju = false) {
      let filesParams = {};
      let handWrittenFile = [];
      this.qydFiles = [];
      let form = {
        pk: this.pk,
        moduleId: this.moduleId,
      };
      if (this.todoId) form.todoId = this.todoId;
      dsf.http.get("fn/xform/getInfo", form).then(({ data }) => {
        filesParams = {
          info_id: data.struct.parameters.infoId || data.struct.parameters.pk,
          infoId: data.struct.parameters.infoId || data.struct.parameters.pk,
          nodeId: data.struct.parameters.nodeId,
          flowId: data.struct.parameters.flowId,
          moduleId: data.struct.parameters.moduleId,
          start: 1,
          limit: 100,
        };
        let sendButtonParams = {};
        let self = this;
        let privileges = dsf.util.loadSessionStore("user")?.privileges || [];
        let zy_privileges, fl_privileges;
        privileges.forEach((item) => {
          if (item.name == "发送设置重要") {
            zy_privileges = true;
          } else if (item.name == "发送设置分类") {
            fl_privileges = true;
          }
        });
        let mainButtons = [];
        let unifyMessage = "";
        if (data.struct.parameters.applyRecycleMessage) {
          unifyMessage = data.struct.parameters.applyRecycleMessage;
        }
        if (data.struct.parameters.distribId) {
          self.distribIds = data.struct.parameters.distribId;
        }
        function condition(item) {
          let temobj = {};
          if (item.action == "istopSend" && zy_privileges) {
            self.istopSendstr = true;
          } else if (item.action == "sendtype" && fl_privileges) {
            self.sendtypestr = true;
          } else if (item.action == "setFocus") {
            let tmp = item.parameters.find((it) => it.key == "infoId");
            self.infoId = tmp.value;
            temobj.action = "setFocus";
          } else if (item.action == "deleteFocus") {
            let tmp = item.parameters.find((it) => it.key == "infoId");
            self.infoId = tmp.value;
            temobj.action = "deleteFocus";
          } else if (item.action == "agreeRecycle") {
            temobj.action = "agreeRecycle";
          } else if (item.action == "refuseRecycle") {
            temobj.action = "refuseRecycle";
          }
          if (JSON.stringify(temobj) != "{}") {
            mainButtons.push(temobj);
          }
        }
        data.struct.buttons.mainButtons.forEach((item) => {
          condition(item);
        });
        data.struct.buttons.commonButtons.forEach((item) => {
          condition(item);
        });

        let sendButton =
          data.struct.buttons.commonButtons.find(
            (item) => item.action == "send"
          )?.parameters ||
          data.struct.buttons.mainButtons.find((item) => item.action == "send")
            ?.parameters;
        if (sendButton) {
          sendButton.forEach((item) => {
            sendButtonParams[item["key"]] = item["value"];
          });
        }
        let shoEditOpinion = 1;
        let hasControlOpinionTagView = false;
        data.struct.controls.forEach((item) => {
          if (
            item.controlType == "controlEditOpinion" &&
            item.privilege.visible == true
          ) {
            shoEditOpinion = 0;
          }
          if (item.controlType == "controlOpinionTagView") {
            hasControlOpinionTagView = true;
          }
        });
        const params = data.struct.parameters;

        this.fileData = {
          pk: params.pk,
          id: params.pk,
          moduleId: params.moduleId,
          pid: params.pId || 0,
          pId: params.pId || 0,
          pnid: params.pnId || 0,
          pnId: params.pnId || 0,
          flowId: params.flowId,
          infoId: params.pk,
          info_id: params.pk,
          moduleName: "",
          todo: this.todoId,
          allowEditOpinion: shoEditOpinion && params.allowEditOpinion,
          opinionRequired: params.opinionRequired,
          nodeId: params.nodeId,
          nodeName: params.nodeName,
          bt: data.data.main["B0001"].value,
          sendType: "",
          nextLineId: sendButtonParams?.isBackTrack || 0,
          direction: sendButtonParams?.isBackTrack,
          determineUser: sendButtonParams?.isBackTrack,
          nextNodeId: sendButtonParams?.isBackTrack,
          endOtherLink: 0,
          isBackTrack: sendButtonParams?.isBackTrack,
          hasControlOpinionTagView,
        };
        dsf.http
          .post("fn/mobileAttachment/getFormAttachment", filesParams)
          .then((data) => {
            // let rows = data.data.rows;
            let loginToken = dsf.util.loadSessionStore("loginToken");
            // rows.forEach((item) => {
            //   if (item.document) {
            //     item.document.forEach((doc, idx) => {
            //       let obj = {
            //         id: doc.id,
            //         title: doc.title,
            //         type: doc.type,
            //         size: doc.showFileSize || "",
            //         navtiveUrl: doc.url,
            //         url: dsf.url.getServerUrl(
            //           `fn/office/openMobileOffice?fileId=${doc.id}&moduleId=${doc.moduleId}&fileName=${doc.title}&nodeId=${params.nodeId}&flowId=${params.flowId}&x-auth-token=${loginToken}`
            //         ),
            //         initUrl: `fn/file/download?infoId=${doc.infoId}&fileId=${doc.id}&fileName=${doc.title}&nrType=${doc.type}&moduleId=${doc.moduleId}&x-auth-token=${loginToken}&fullfilename=${doc.title}`,
            //         infoId: doc.infoId,
            //         moduleId: doc.moduleId,
            //         isHandwrite: doc.isHandwrite,
            //         isRevise: doc.isRevise,
            //         isNoModify: doc.isNoModify,
            //         canEdit: doc.canEdit,
            //         canDownLoad: doc.canDownLoad,
            //         name:
            //           item.document.length > 1
            //             ? `${item.name}${idx + 1}`
            //             : item.name,
            //       };
            //       if (obj.isHandwrite == "1" || !this.qydFlag) {
            //         handWrittenFile.push(obj);
            //       } else if (this.qydFlag) {
            //         this.qydFiles.push(obj);
            //       }
            //     });
            //   }
            // });
            for (let item of data.data.rows) {
              if (!item.document) continue;

              for (let [idx, doc] of item.document.entries()) {
                let obj = {
                  id: doc.id,
                  title: doc.title,
                  type: doc.type,
                  size: doc.showFileSize || "",
                  navtiveUrl: doc.url,
                  url: dsf.url.getServerUrl(
                    `fn/office/openMobileOffice?fileId=${doc.id}&moduleId=${doc.moduleId}&fileName=${doc.title}&nodeId=${params.nodeId}&flowId=${params.flowId}&x-auth-token=${loginToken}&canEdit=${doc.canEdit}`
                  ),
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
                if (this.qydFlag) {
                  this.qydFiles.push(obj);
                } else if(!doc.hasOwnProperty("isHandwrite") || doc.isHandwrite==1){
                  handWrittenFile.push(obj);
                }
              }
            }
            if (handWrittenFile.length) {
              this.dianJuFileOpen(
                handWrittenFile,
                mainButtons,
                unifyMessage,
                closeDianju
              );
            } else if (this.qydFiles.length) {
              this.ifra = true;
            } else {
              this.$router.replace({
                path: `/commonForm/${this.moduleId}/${this.pk}/1`,
                query: { todoId: this.todoId, webViewBack: true },
              });
            }
          })
          .catch((err) => console.log(err));
      });
    },
    onClick(name) {
      console.log(name);
    },
    changeFrameHeight(index) {
      console.log("changeFrameHeight高度变化");
      let that = this;
      this.$nextTick(() => {
        try {
          let parentHeight = that.$refs.enclosurePre.offsetHeight;
          console.log("parentHeight高度变化" + parentHeight);
          document.querySelector("#filePreview" + index).style.height =
            parentHeight + "px";
        } catch (e) {
          //跨域获取不到
          throw new Error("自定义错误setIframeHeight Error");
        }
      });
    },
    send() {
      this.showFlowSend = true;
      this.$nextTick(() => {
        this.$refs.sendFile.show("isList");
      });
    },
    handleFlowSendChange() {
      this.showFlowSend = false;
    },
    closeSendFile() {
      this.showFlowSend = false;
    },
    closeSendFilePopup() {
      // setTimeout(() => {
      this.destroyFileInterval(this.FileIds);
      // xsfWindow.closeWebView();
      // }, 200);
    },
    closealertPopup() {
      // xsfWindow.closeWebView();
      this.destroyFileInterval(this.FileIds);
    },
    //取消收藏
    deleteFocus() {
      let loading = dsf.layer.loading("提交中");
      let paramsObj = {
        // fid: 0,
        infoId: this.infoId,
        "x-auth-token": dsf.util.loadSessionStore("loginToken"),
      };
      dsf.http
        .post("/fn/mobileFocus/deleteFocus", paramsObj)
        .then(({ data }) => {
          let { message } = data;
          dsf.layer.closeLoading(loading);
          dsf.layer.toast(message);
          if (message == "操作成功") {
            this.link();
          }
        });
    },
    //收藏
    setFocus() {
      if (dsf.config.setting["SYS-MOBILE-FORM-0018"] != 1) {
        let loading = dsf.layer.loading("提交中");

        let paramsObj = {
          fid: 0,
          infoId: this.infoId,
          "x-auth-token": dsf.util.loadSessionStore("loginToken"),
        };
        dsf.http.post("fn/mobileFocus/setFocus", paramsObj).then(({ data }) => {
          let { message } = data;
          dsf.layer.closeLoading(loading);
          dsf.layer.toast(message);
          this.link();
        });
      }
    },
    // 错发回收同意回收
    agreeRecycle() {
      let obj = {
        pk: this.pk,
        todoId: this.todoId,
        moduleId: this.moduleId,
      };
      dsf.http.post("fn/flow/agreeRecycle", obj).then((res) => {
        dsf.layer.toast("操作成功", true);
        this.link(true);
        // setTimeout(() => {
        //   xsfWindow.closeWebView();
        // }, 500);
      });
    },
    // 错发回收拒绝回收
    refuseRecycle() {
      let obj = {
        pk: this.pk,
        todoId: this.todoId,
        moduleId: this.moduleId,
      };
      dsf.http.post("fn/flow/refuseRecycle", obj).then((res) => {
        dsf.layer.toast("操作成功", true);
        this.link();
        // setTimeout(() => {
        //   xsfWindow.closeWebView();
        // }, 500);
      });
    },

    setInfos(col) {
      if (this.istopForm != -2) {
        /*修改发送类型*/
        dsf.http.post("fn/flow/istop", {
          pk: this.pk,
          type: this.istopForm,
          column: col,
        });
      }
    },
    istopSend() {
      dsf.layer.confirm(
        { message: "是否设置为重要文件?" },
        () => {
          this.istopForm = 2;
          this.setInfos(1);
          this.send();
        },
        () => {
          this.istopForm = 1;
          this.setInfos(1);
          this.send();
        }
      );
    },
    sendtype(name) {
      this.showType = false;
      switch (name) {
        case "呈批":
          this.istopForm = 2;
          this.setInfos(2);
          break;
        case "阅件":
          this.istopForm = 3;
          this.setInfos(2);
          break;
        case "外出报备":
          this.istopForm = 4;
          this.setInfos(2);
          break;
        case "信息":
          this.istopForm = 5;
          this.setInfos(2);
          break;
      }
      this.send();
    },
    getContainer() {
      return document.body;
    },
    // 判断文件是否锁住状态,其他人无法继续签批
    async isSignFileLock(fileId) {
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
              dsf.layer.alert(
                {
                  message:
                    "当前文件正在由" +
                    res.data.data.uname +
                    "办理，请稍后处理。",
                },
                () => {
                  xsfWindow.closeWebView();
                }
              );
              isLocked = true;
            }
          });
      }
      return isLocked;
    },

    // 文件修改签批过程定时轮询
    continueLockFile(fileId) {
      // 是否开启了第三方插件拦截多人签批功能
      if (dsf.config.commonForm.isInterceptMultiPersonSign) {
        this.fileTimer = setInterval(() => {
          dsf.http
            .post("fn/office/continueLock", {
              fileId: fileId,
            })
            .then((res) => {
              console.log(res, "文件定时上锁");
            });
        }, 30000);
      }
    },
    // 文件解锁
    destroyFileInterval(fileId) {
      clearInterval(this.fileTimer);
      this.fileTimer = null;
      if (dsf.config.commonForm.isInterceptMultiPersonSign) {
        dsf.http
          .post("fn/office/unLock", {
            fileId: fileId,
          })
          .then((res) => {
            console.log(res, "文件解锁");
            xsfWindow.closeWebView();
          });
      } else {
        xsfWindow.closeWebView();
      }
    },
    // 删除当前用户对应当前文件的所有附件锁
    destroyFileIntervalAll(pk) {
      clearInterval(fileTimer);
      fileTimer = null;
      if (dsf.config.commonForm.isInterceptMultiPersonSign) {
        dsf.http
          .post("fn/office/releaseLock", {
            pk: pk,
          })
          .then((res) => {
            console.log(res, "所有文件解锁成功");
          });
      }
    },
    beforeUnload() {
      // 在这里编写相关代码，比如发送异步请求，保存用户数据等。
      // dsf.layer.toast("保存用户数据");
      this.destroyFileInterval(this.FileIds);
    },
  },
  destroyed: function () {
    // window.removeEventListener("beforeunload", this.beforeUnload);
  },
};
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
.dianju {
  height: 100vh;
  overflow: hidden;
}
</style>
