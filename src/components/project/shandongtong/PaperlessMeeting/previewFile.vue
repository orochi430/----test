<template>
  <div>
    <div class="bts">
      <div class="topBts" v-if="!$route.query.method">
        <van-button type="default" @click="getMeeting">会议记录</van-button>
        <van-button type="default" @click="endorsement">签批</van-button>
      </div>

      <van-popup v-model="showMeeting" position="bottom" round :style="{ height: '270px' }">
        <div class="btsOut">
          <van-button type="default" class="cancelBt" @click="cancelMeeting">取消</van-button>
          <van-button type="default" class="saveBt" @click="saveMeeting">保存</van-button>
        </div>
        <div class="meetingReco">
          <add-record @RecoContent="RecoContent" :existRec="existRec"></add-record>
        </div>
      </van-popup>
    </div>
    <div id='wpsOffice' class='wps_office'></div>
  </div>
</template>
<script>
import addRecord from './addRecord.vue';
export default {
  components: { addRecord },
  name: "meeting_preview",
  data() {
    return {
      data: {},
      jssdk: null,
      showMeeting: false,
      saveMessage: '',
      existRec: ''
    };
  },
  created() {    
    console.log(this.$route.params, this.$route.query);
    this.data = this.$route.params.file;
    if (!this.$route.params.file) {

      this.data = this.$route.query
      console.log(!this.$route.params.file, this.data);
    }
  },
  mounted() {
    dsf.loadJs('static/js/webOffice/web-office-sdk-v1.1.19.umd.js').then(() => {
      this.getWpsUrl();
      this.$nextTick(() => {
        let wps_office = document.getElementsByClassName('wps_office');
        if (wps_office.length > 1) {
          window.location.reload()
        }
      })
    })

  },
  watch: {
  },

  methods: {
    getWpsUrl() {
      let url = 'fn/sdtongSSO/getPreviewUrl';
      this.getWdztUrl(this.data, url);
    },
    getWdztUrl(data, url) {

      let infoId = this.$route.query.infoId

      dsf.http.post(url, { fileId: data.fileId, fileName: data.fileName, infoId: infoId, moduleId: data.moduleId, pnId: data.nodeId, pId: data.flowId }).then((res => {
        if (res.data.code == '200') {
          this.wpsOpens(res.data.data.url)
        }
      }))

    },
    async wpsOpens(wpsUrl) {
      let wpsOffice = document.getElementById('wpsOffice');
      this.jssdk = WebOfficeSDK.config({
        url: wpsUrl,
        mount: wpsOffice,
      })
      this.jssdk.iframe.style.height = window.screen.availHeight - 100 + 'px'
      this.jssdk.iframe.style.width = window.screen.availWidth + 15 + 'px'
      // if (this.wpsData.isRevise) {
      //   await this.jssdk.ready();
      //   const app = jssdk.Application;
      //   // 将当前文档的编辑状态切换成修订模式
      //   let trackRevisions = dsf.config.commonForm.wdzt && dsf.config.commonForm.wdzt.trackRevisions ? dsf.config.commonForm.wdzt.trackRevisions : false
      //   app.ActiveDocument.TrackRevisions = trackRevisions;
      // }
    },
    getMeeting() {

      let param = {
        infoId: this.$route.query.infoId,
        userId: this.$user.user_id,
        attValue: 22,
      }
      dsf.http.get('ctrl/meetingRecord/getMeetingRecordContent', param).then((res) => {
        if (res.data.code == 200) {
          this.existRec = res.data.data.content;
          this.showMeeting = true;
        }
        else
          dsf.layer.toast("获取失败");
      })
    },
    saveMeeting() {
      let createParam = {
        infoId: this.$route.query.infoId,
        content: this.saveMessage,
        attValue: 22,
        attValueText: "会议记录",
        fileName:this.$route.query.title.split('：')[1]+"的会议记录"
      }
      this.showMeeting = false;
      dsf.http.post('ctrl/meetingRecord/createMeetingRecord', createParam).then(((postRes) => {
        if (postRes.data.code == 200) {
          dsf.layer.toast(postRes.data.message)
        }
        else
          dsf.layer.toast("保存失败");
      }))
    },
    RecoContent(val) {
      this.saveMessage = val
    },
    cancelMeeting() {
      console.log(this.existRec);
      this.showMeeting = false;
      setTimeout(() => {
        this.existRec = '';
      }, 200)
    },
    endorsement() {
      let self = this;
      let part = this.data;
      let loginToken = dsf.util.loadSessionStore("loginToken");
      let timestamp = new Date().getTime();
      let rootPath = dsf.url.getRootPath()
      let suffix = this.data.fileName.split('.')[1];
      let fileUrl = `fn/file/download?infoId=${this.$route.query.infoId}&fileId=${part.id}&fileName=${part.fileName}&nrType=${suffix}&moduleId=${part.moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${part.fileName}`;
      const down_url = rootPath + fileUrl;

      const backUrl = rootPath + `fn/swMobileCtrl/sendBack?infoId=${this.$route.query.infoId}&pid=${part.flowId}&pnid=${part.nodeId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
      // const save_url = rootPath + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${part.moduleId}&pnId=${this.fileData.pnId}&nodeName=${this.fileData.nodeName}&fileType=1&infoId=${part.infoId}&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
      const save_url = rootPath + `fn/mobileOffice/upload?fileId=${part.id}&moduleId=${part.moduleId}&pnId=${part.nodeId}&nodeName=&fileType=1&infoId=${this.$route.query.infoId}&extension=${suffix}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`;
   

      let write_photo = rootPath + "fn/getimage/downloadImage?userid=" + dsf.util.loadSessionStore("user").user_id;
      let can_edit = true;
      let isStamp = false;
      let externalStorage = dsf.config.commonForm.shuke.externalStorage ? dsf.config.commonForm.shuke.externalStorage : false;
      let screenshots = dsf.config.commonForm.shuke.screenshots ? dsf.config.commonForm.shuke.screenshots : false;
      let foldingScreen = dsf.config.commonForm.shuke.foldingScreen ? dsf.config.commonForm.shuke.foldingScreen : '';
      let penPad = dsf.config.commonForm.shuke.penPad ? dsf.config.commonForm.shuke.penPad : '';
      let project = dsf.config.commonForm.shuke.project ? dsf.config.commonForm.shuke.project : '';
      console.log(down_url);
      let obj = {
        downUrl: down_url,
        backUrl: backUrl,
        writePhoto: write_photo,
        externalStorage: externalStorage,// 文件是否放在外部存储，默认内部存储
        saveUrl: save_url,
        handTip: '',
        fileName: part.fileName,
        userName: dsf.util.loadSessionStore("user").name,
        foldingScreen: foldingScreen,//折叠屏设备适配，传设备型号，多个用英文逗号隔开
        penPad: penPad,//笔写设备型号适配，传设备型号，多个用英文逗号隔开
        stamp: {//戳记功能
          getCJInfo: rootPath + `fn/SZFcj/getCJInfo?userId=${dsf.util.loadSessionStore("user").user_id}&swh=&fromList=`,//戳记维护信息查询接口
          downloadCJInfo: rootPath + `fn/SZFcj/downloadCJInfo?userId=${dsf.util.loadSessionStore("user").user_id}&swh=&fromList=`,//戳记维护信息图片下载接口
          isStamp: isStamp ? true : false,//根据权限
        },
        screenshots: screenshots,//是否允许截屏，录屏
        canEdit: can_edit,
        project: project,
        pid: part.flowId,
        pnid: part.nodeId,
        fileId: part.id,
        Opinions: [],//常用意见，数组格式
        nodeOpinion: '',//签批建议，采用按钮填充的意见文本
        copyRight: dsf.config.commonForm.shuke.keyCode,
        buttonState:{//控制一些按钮是否显示,例如发送，退回功能按钮，通过true,false控制
                    // send：发送按钮
                    // Sign：署名按钮
                    // addBlank：增页按钮
                    // Record：记录按钮
                    // rectWrite：区域手写
                    // Text:文字签批
                    // signFontSize：署名文字大小
                    // signDate:署名日期选择
                    signFontSize:(dsf.config.commonForm.shuke.buttonState&&dsf.config.commonForm.shuke.buttonState.signFontSize)||false,
                    rectWrite:(dsf.config.commonForm.shuke.buttonState&&dsf.config.commonForm.shuke.buttonState.rectWrite)||false
                },
                secretData:{//署名相关，signKey：授权key,signSecret：授权signSecret
                    signKey:dsf.config.commonForm.shuke.secretData&&dsf.config.commonForm.shuke.secretData.signKey,
                    signSecret:dsf.config.commonForm.shuke.secretData&&dsf.config.commonForm.shuke.secretData.signSecret
                }
      };
      console.log("调用数科传的参数", obj, dsf.util.getClientName());
      if (suffix.toLocaleLowerCase() == 'pdf' || suffix.toLocaleLowerCase() == 'ofd') {
        if (dsf.util.getClientName() == 'wechat') {
          wx.invoke('ext_sySignSdk_startSign', {
            data: obj
          }, (res) => {
            if (res.result == "true") {
              if (JSON.parse(res.data).type == 'send' || JSON.parse(res.data).type == 'back') {
                this.isShow = false;
                this.$bus.emit("iSignatureSend", {
                  act: "send"
                })
              }
            }
          });
        } else {
          $suwell.openSuWell(JSON.stringify(obj), (res) => {
            if (String(res) === "send" || String(res) === "back") {
              // this.isShow = false;
              this.$bus.emit("iSignatureSend", {
                act: "send"
              })
            }
          }, (err) => {
            this.no_fileClick = false; //是否允许文件点击，山东金格签批
            alert("open failed: " + err);
          });
        }
      }
      else
        dsf.layer.toast('该类型的文件不支持签批')
    }
  },
};
</script>
<style scoped lang="scss">
.wps_office {
  height: 100%;
  width: 100%;
}

.bts {
  margin-right: 10px;
  .topBts {
    float: right;
  }
}

.saveBt {
  float: right;
}

.btsOut {
  height: 45px;

  ::v-deep .van-button--default {
    border: 0 solid #ebedf0;
  }

  ::v-deep .van-button--normal {
    padding: 0 0.3rem 0 0.3rem;
  }
}

.cancelBt {
  float: left;
}

.meetingReco {
  overflow: auto;

  ::v-deep .van-cell {
    padding: 0 16px 10px;
  }
}
</style>
