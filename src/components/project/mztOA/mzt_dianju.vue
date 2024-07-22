<template>
  <div class="mzt_dianju" ref="enclosurePre">
    <van-loading v-if="!alreadyLoaded" size="24px" style="text-align: center"
      >加载中...</van-loading
    >
    <!-- <van-tabs v-if="ifra">
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
    </van-tabs> -->
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
      :get-container="getContainer"
      v-model="showFlowBack"
      :close-on-click-overlay="false"
      lock-scroll
      position="bottom"
      round
    >
      <work-flow-dialog
        ref="wfDialog"
        :form-data="selected"
        @change="handleFlowBackChange"
        @close="
          showFlowBack = false;
          destroyFileInterval(FileIds);
        "
      />
    </van-popup>
  </div>
</template>
<script>
import sendFile from "@/components/sendFlow/sendFile";
import workFlowDialog from "@/components/dialog/WorkFlowDialog.vue";
export default {
  components: {
    sendFile,
    workFlowDialog,
  },
  data() {
    return {
      showFlowSend: false,
      moduleId: this.$route.query.moduleId,
      pk: this.$route.query.pk,
      todoId: this.$route.query.todoId || "",
      djAccount: "",
      fileData: {},
      pnid: "",
      nodeName: "",
      formUrl: "",
      attachmentUrl: "",
      fileTimer: null,
      user: dsf.util.loadSessionStore("user") || {},
      FileIds: "",
      showFlowBack: false,
      selected: {},
      alreadyLoaded: false,
    };
  },
  async mounted() {
    let power = dsf.util
      .loadSessionStore("user")
      .privileges.some((item) => item.name === "点聚手写签批授权");
    this.djAccount = (await this.getDianJuAcount()) || "";
    if (!power) {
      //进去普通表单
      dsf.config.commonForm.dianJu.isEnable = false;
      this.alreadyLoaded = true;
      this.$router.replace({
        path: `/commonForm/${this.moduleId}/${this.pk}/1`,
        query: {
          todoId: this.todoId,
          webViewBack: true,
          isdjOpen: 1,
          closePage: 1,
        },
      });
    } else {
      //进点聚
      this.link();
      this.formUrl = dsf.base64
        .encode(
          `/commonForm/${this.moduleId}/${this.pk}/1?${
            this.todoId ? "todoId=" + this.todoId : ""
          }&isShowHeader=0&isdjOpen=1&activeTab=formTab&hideOtherTab=1&needBtn=0`
        )
        .replace(new RegExp("/", "gm"), "@");
      this.attachmentUrl = dsf.base64
        .encode(
          `/commonForm/${this.moduleId}/${this.pk}/1?${
            this.todoId ? "todoId=" + this.todoId : ""
          }&isShowHeader=0&isdjOpen=1&activeTab=relevantFile&hideOtherTab=1&needBtn=0`
        )
        .replace(new RegExp("/", "gm"), "@");
    }

    // window.addEventListener("beforeunload", this.beforeUnload);
  },

  methods: {
    async dianJuFileOpen(part, fileUrl, suffix) {
      let self = this;
      let can_edit = String(part.canEdit) === "1" ? true : false;
      let rootPath = dsf.url.getRootPath();
      this.FileIds = part.id;
      const save_url =
        rootPath +
        `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${
          part.moduleId
        }&pnId=${this.pnid}&nodeName=${self.nodeName}&fileType=1&infoId=${
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
        // sendBtn:true,
        backBtn: true, //true有退回按钮，false没有退回按钮
        webData: {
          webDianjutTab: true,
          formUrl:
            location.href.split("#/")[0] +
            `#/autoLoginToUrl/${dsf.util.loadSessionStore("loginToken")}/${
              this.formUrl
            }/` +
            Math.random() +
            "?isdjOpen=1",
          attachmentUrl:
            location.href.split("#/")[0] +
            `#/autoLoginToUrl/${dsf.util.loadSessionStore("loginToken")}/${
              this.attachmentUrl
            }/` +
            Math.random() +
            "?isdjOpen=1",
        },
        useFingerWrite: "false", //是否能手指手写签批 String类型，true开启 false不开启，不使用此属性则传空字符串或者不传，因为本地配置文件也有开关控制此功能，不传参以本地开关为准，传了true或false，则以此参数为准
        tab: [
          { title: "签批单", type: "sign" },
          { title: "附件", type: "attachment" },
          { title: "表单", type: "form" },
        ],
      };
      console.log("点聚参数", obj);
      let isOpenSign = await this.isSignFileLock(part.id);
      obj.djAccount = this.djAccount;
      this.alreadyLoaded = true;
      if (!isOpenSign && this.djAccount) {
        xsfCommon.dianJuSdk(
          JSON.stringify(obj),
          function success(result) {
            result = JSON.parse(result);
            console.log("打开点聚的回调参数", result);
            if (result.message == "dianjuUploadSuccess") {
              self.send();
              // self.destroyFileInterval(part.id);
            } else if (result.message == "dianjuBackSuccess") {
              self.showFlowBack = true;
              self.$nextTick(() => {
                self.$refs.wfDialog.show({
                  text: "退回",
                });
              });
              self.handleFlowBackChange = function () {
                self.showFlowBack = false;
                self.onRefresh();
                self.destroyFileInterval(part.id);
              };
              // self.destroyFileInterval(part.id);
            } else if (result.message == "dianjuOpenSuccess") {
              // 轮询文件加锁接口
              self.continueLockFile(part.id);
            } else if (result.message == "dianjuOpenError") {
              dsf.layer.alert({
                message: "文件打开失败:" + down_url,
              });
            } else if (result.message == "dianjuFileClose") {
              // 关闭点聚界面两种情况,一种是外面签批单返回，需要关闭webview,一种是点聚附件中ofd再次打开点聚,返回不需要关闭secondOpen true表示二次打开
              // {\"message\":\"dianjuFileClose\",\"result\":true,\"type\":\"finish\",\"secondOpen\":true}
              if (!(result.type == "open" && result.result)) {
                //根据type判断，只要是open,且result为true，那就是加锁，其余情况回调，就是解锁
                if(!result.secondOpen){
                  self.destroyFileInterval(part.id);
                }

              } else if (result.type == "send") {
                //签批界面的发送按钮回调
                self.send();
              }
            }
          },
          function error(error) {
            console.log("open failed: ", error);
          }
        );
      } else {
        dsf.config.commonForm.dianJu.isEnable = false;
        this.$router.replace({
          path: `/commonForm/${this.moduleId}/${this.pk}/1`,
          query: {
            todoId: this.todoId,
            webViewBack: true,
            isdjOpen: 1,
            closePage: 1,
          },
        });
      }
    },
    link() {
      let form = {
        pk: this.pk,
        moduleId: this.moduleId,
      };
      let self = this;
      let filesParams = {};
      let handWrittenFile = [];
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
        this.selected = {
          pid: data.struct.parameters.pId,
          info_id: data.struct.parameters.pk,
          flowId: data.struct.parameters.flowId,
          pnId: data.struct.parameters.pnId,
        };
        this.fileData = {
          ...data.struct.parameters,
          pid: data.struct.parameters.pId,
          pnid: data.struct.parameters.pnId,
          id: data.struct.parameters.pk,
          sendType: "",
          bt: "",
          moduleName: "",
          infoId: data.struct.parameters.pk,
          info_id: data.struct.parameters.pk,
        };
        this.nodeName = data.struct.parameters.nodeName;
        this.pnid = data.struct.parameters.pnId;
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
                    initUrl: `fn/office/downloadFile?infoId=${doc.infoId}&fileId=${doc.id}&fileName=${doc.title}&nrType=${doc.type}&moduleId=${doc.moduleId}&x-auth-token=${loginToken}&fullfilename=${doc.title}&file=${doc.title}`,
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
                  if (obj.isHandwrite == "1" && obj.type == "-5") {
                    handWrittenFile.push(obj);
                  }
                });
              }
            });
            if (handWrittenFile.length) {
              let file = handWrittenFile[0];
              const index = file.navtiveUrl.lastIndexOf(".");
              const suffix = file.navtiveUrl.substr(index + 1);
              this.dianJuFileOpen(file, file.initUrl, suffix);
            } else {
              // dsf.layer.toast("没有签批单");
              dsf.config.commonForm.dianJu.isEnable = false;
              this.$router.replace({
                path: `/commonForm/${this.moduleId}/${this.pk}/1`,
                query: {
                  todoId: this.todoId,
                  webViewBack: true,
                  isdjOpen: 1,
                  closePage: 1,
                },
              });
            }
          })
          .catch((err) => console.log(err));
      });
    },
    handleFlowBackChange() {
      this.showFlowBack = false;
      this.destroyFileInterval(this.FileIds);
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

    getContainer() {
      return document.body;
    },
    async getDianJuAcount() {
      let result = "";
      await dsf.http
        .post("ctrl/thirdPartyInterfaces/getDianJuAcount")
        .then((res) => {
          console.log("isLock-res", res);
          if (res.data.code == "200") {
            result = res.data.data.djAccount;
          } else {
            dsf.layer.toast(res.data.message);
          }
        })
        .error((err) => {
          // dsf.layer.toast(err);
          console.log(err);
        });
      return result;
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
      clearInterval(this.fileTimer);
      this.fileTimerfileTimer = null;
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
  },
  destroyed: function () {
    this.destroyFileIntervalAll(this.pk);
  },
};
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
.mzt_dianju {
  height: 100vh;
  overflow: hidden;
}
</style>
