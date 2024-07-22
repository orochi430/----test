<template>
  <!-- <div class="ds-enclosure-item">
    <div class="__file_icon">
      <i :class="[typeConfig[type]]" class="iconfont"></i>
    </div>
    <div class="__file_body" @click="openFile">
      <div class="__file_title">
        <div class="elps">{{ name }}</div>
      </div>
      <div class="__file_size">{{ size||"默认尺寸" }}</div>
    </div>
    <div class="__file_bt">
      <div class="__file_button" @click="openFile">预览</div>
      <div class="__file_button" @click="handWrite" v-if="itemData&&itemData.isHandwrite>0">圈阅</div>
    </div>

  </div> -->
  <div class="fileBox EnclosureItemToWPS" v-if="fileData.allowMaintain > 0 || fileData.file.length > 0">
    <div class="fileTypeList">
      <!-- <div class="fileTypeName disfr jsb">
        <span>{{fileData.name}}</span>
        <van-button icon="plus" size="small" type="info" v-if="fileData.canEdit>0" />
      </div> -->
      <van-field style="" input-align="right" name="uploader">
        <template #label>
          <span style="font-size: var(--font_size_2);font-weight:600;">{{ fileData.name }}：</span>
        </template>
        <template #input>
          <div></div>
        </template>
        <template #right-icon v-if="fileData.allowMaintain > 0 && dsf.config.commonForm.canEditFile">
          <van-uploader :after-read="afterRead" class="upload-btn">
            <!-- <van-icon color="#1989fa" class="iconfont iconfujian1" v-if="fileData.canEdit>0" /> -->
            <!-- <van-button style="color:white;" icon="plus" size="small" type="info" v-if="fileData.canEdit>0" /> -->
            <van-icon color="#4d9ef1" size="24" name="add-o" />
          </van-uploader>
        </template>
      </van-field>
      <div class="fileList" v-for="(item, index) in fileData.file" :key="item.id">
        <div class="file disfr">
          <div class="fileIcon" @click="openFile(item.url, item)">
            <i :class="getIconClass(item.title)" class="iconfont"></i>
          </div>
          <div class="fileBody flex1" @click="openFile(item.url, item)">
            <div class="fileTitle ellipsis">
              <!-- //高密低流的文件密级 2023.10.21 @ZGH -->
              <span v-if="item.mjText" style="color:#E50012">[{{ item.mjText }}]</span>
              {{ item.title }}
            </div>
            <div class="fileSize">{{ item.size || "默认尺寸" }}</div>
          </div>
        </div>
        <div class="fileBtn">
          <div class="fileButton" @click="openFile(item.url, item, 'edit')"
            v-if="item.canEdit > 0 && dsf.config.commonForm.canEditFile && ifFile(item.title)">编辑</div>
          <div class="fileButton" v-if="dsf.config.ddSetting.isDing" @click="SaveDing(item, index)">存钉盘</div>
          <div class="fileButton" @click="deleteFile(item)"
            v-if="fileData.canDelete > 0 && dsf.config.commonForm.canEditFile">删除</div>
          <div class="fileButton" @click="handWrite(item, index)"
            v-if="fileData.document && fileData.document[index] && fileData.document[index].isHandwrite > 0">圈阅</div>
          <!--  -->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'EnclosureItemToWPS',
  props: {
    name: {
      type: String,
      require: true
    },
    size: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      require: true
    },
    itemData: {
      type: Object,
      require: true
    },
    index: {
      type: Number,
      default: 0
    },
    fileData: {
      type: Object,
      require: true
    },
    formInfo: {
      type: Object,
      require: true
    },
    params: {
      type: Object,
      require: true
    },
  },
  data() {
    return {
      typeConfig: {
        'IMAGE': 'iconIMAGE',
        'TXT': 'iconTXT',
        'PDF': 'iconPDF',
        'WORD': 'iconWORD',
        'EXCEL': 'iconEXCEL',
        'PPT': 'iconPPT',
        'OTHER': 'iconOTHER'
      },
      fileType: {
        'IMAGE': ['jpeg', 'bmp', 'webp', 'svgz', 'svg', 'gif', 'jpg', 'ico', 'png', 'tif'],
        'PDF': ['pdf'],
        'TXT': ['txt', 'sql', 'xml', 'html', 'css', 'js', 'java', 'php', 'bat', 'log'],
        'WORD': ['docx', 'docm', 'doc', 'dotx', 'dotm', 'dot'],
        'EXCEL': ['xlsx', 'xlsm', 'xlsb', 'xls', 'xltx', 'xltm', 'xlt', 'xlam', 'xla', 'ods'],
        'PPT': ['pptx', 'pptm', 'ppt', 'potx', 'potm', 'pot', 'ppsx', 'ppsm', 'pps', 'ppam', 'ppa']
      }
    };
  },
  computed: {
    suffix() {
      let startIndex = this.name.lastIndexOf('.');
      if (startIndex !== -1)
        return this.name.substring(startIndex + 1, this.name.length).toLowerCase();
      else return '';
    },
    type() {
      for (let key in this.fileType) {
        let value = this.fileType[key];
        if (value.indexOf(this.suffix) > -1) {
          return key
        }
      }
      return 'OTHER';
    }
  },
  methods: {
    ifFile(title) {
      if (title.includes(".png") || title.includes(".jpg") || title.includes(".mp4")) {
        return false
      } else {
        return true
      }
    },
    openFile(url, item, edit) {
      this.$emit('open', url, item, edit);
    },
    SaveDing(item, index) {
      dsf.http.post("fn/DingDing/upload2DingDrive", { fileId: item.id })
        .then(({ data }) => {
          console.log(data)
          dsf.dd.saveFile({
            corpId: data.data.corpId,
            mediaId: data.data.mediaId, // 文件在第三方服务器地址， 也可为通过服务端接口上传文件得到的media_id，详见参数说明
            name: item.title,
          })
        })
    },
    handWrite(item, index) {
      let that = this;
      console.log(item, ":154")
      if (dsf.config.previewSetting.previewType == 4) {
        let data = item
        dsf.http.get("fn/wdct/circle", { infoId: data.infoId, moduleId: data.moduleId, fileId: data.id })
          .then(res => {
            if (res.data.code == "200") {
              let resData = res.data.data
              resData.downloadUrl = dsf.url.getRootPath() + resData.downloadUrl + `&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`
              console.log(resData.downloadUrl, resData.saveUrl, "179")
              let param = {
                pageIndex: 1,
                url: resData.downloadUrl
              }
              dsf.commonForm.nativeCommon('documentannotate', param).then(resPdf => {
                console.log(resPdf, ":185")
                dsf.http.get(`${resData.saveUrl}`, { sourceUrl: `${resPdf.data}` })
                  .then(quanyue => {
                    console.log(quanyue)
                    dsf.layer.toast("批示成功");
                    that.$emit("quanyue")
                  })
              }).catch(err => {
                console.log(err, ":193")
              })
            } else {
              dsf.layer.toast(res.data.message)
            }
          })
      } else {
        let _loading = dsf.layer.loading();
        this.$emit("closePop")
        let data = item
        dsf.http.get("fn/handWrite/circle", { infoId: data.infoId, moduleId: data.moduleId, fileId: data.id })
          .then(res => {
            if (res.data.code == "200") {
              let resData = res.data.data
              resData.downloadUrl = dsf.url.getRootPath() + resData.downloadUrl
              console.log(resData)
              dsf.layer.closeLoading(_loading);
              dsf.dd.signature(resData, this)
                .then(res => {
                  this.$emit("quanyue")
                })
                .catch(err => {
                  console.log(err)
                  this.$emit("quanyue")
                })
            } else {
              dsf.layer.toast(res.data.message)
            }

          })
      }


    },
    getIconClass(title) {
      let startIndex = title.lastIndexOf('.');
      let str = startIndex > -1 ? title.substring(startIndex + 1, title.length).toLowerCase() : "";
      for (let key in this.fileType) {
        let value = this.fileType[key];
        if (value.indexOf(str) > -1) {
          return this.typeConfig[key]
        }
      }
      return 'OTHER';
    },
    afterRead(file) {
      let that = this
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0,
        overlay: true
      });
      that.doFileRead(file, this.fileData.attachType)

    },
    async doFileRead(file, filetype) {
      let self = this;
      let url =
        "/fn/mobileAttachment/upload?fileId=&moduleId=" + this.formInfo.moduleId + "&mid=" + this.formInfo.moduleId +
        `&pId=${this.formInfo.pId}&pnId=${this.formInfo.pnId}&nodeName=` + encodeURI("拟稿") + "&nrType=" + filetype + "&pk=" + this.formInfo.info_id +
        "&newFileFlag=0";
      dsf.http
        .upload(url, {}, file)
        .then(async function (data) {
          console.log(data.data)
          if (data.data.result) {
            let loginToken = dsf.util.loadSessionStore("loginToken");
            var timestamp = new Date().getTime()
            let uploadFile = data.data.data
            let obj = {
              id: uploadFile.fileId,
              title: uploadFile.fileName,
              size: uploadFile.showFileSize || "",
              infoId: self.params.info_id,
              moduleId: self.params.moduleId,
              isHandwrite: "-1",
              canEdit: uploadFile.canEdit
            }
            // if(dsf.config.previewSetting.previewType==4){
            //   let data=await  dsf.http.post(`fn/office/mobile/wpsPreview`,{fileId:uploadFile.fileId,readOnly:uploadFile.canEdit>0?true:false})
            //   obj.url=data.data.data
            // }else{
            //   obj.url=dsf.url.openOffice(encodeURIComponent(dsf.url.getServerUrl(
            //     `fn/file/download?infoId=${self.params.info_id}&fileId=${uploadFile.fileId}&fileName=${uploadFile.fileName}&nrType=${uploadFile.nrType}&moduleId=${self.params.moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${uploadFile.fileName}`
            //   )))
            // }
            obj.navtiveUrl = uploadFile.filePath
            obj.url = dsf.url.getServerUrl(
              `fn/office/openMobileOffice?fileId=${uploadFile.fileId}&moduleId=${self.params.moduleId}&x-auth-token=${loginToken}`
            )
            obj.editUrl = dsf.url.getServerUrl(
              `fn/mobileOffice/wordEdit?fileId=${uploadFile.fileId}&moduleId=${self.params.moduleId}&x-auth-token=${loginToken}`
            )
            obj.initUrl = `fn/file/download?infoId=${self.params.info_id}&fileId=${uploadFile.fileId}&fileName=${uploadFile.fileName}&nrType=${uploadFile.nrType}&moduleId=${self.params.moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${uploadFile.fileName}`
            if (uploadFile.fileName.includes(".png") || uploadFile.fileName.includes(".jpg")) {
              obj.url = dsf.url.getServerUrl(
                `fn/mobileFileDownload/download?fileId=${uploadFile.fileId}&moduleId=${self.params.moduleId}&fileName=${uploadFile.fileName}`
              )
            }
            if (uploadFile.fileName.includes(".mp4")) {
              obj.url = dsf.url.getServerUrl(
                `fn/mobileFileDownload/download?fileId=${uploadFile.fileId}&moduleId=${self.params.moduleId}&fileName=${uploadFile.fileName}`
              )
            }
            if (self.fileData.file) {
              self.fileData.file.push(obj)
            } else {
              self.fileData.file = [obj]
            }
            self.$set(self.fileData, "file", self.fileData.file)
            console.log(self.fileData)
            self.$emit("addFile", obj)

            // self.init()
          } else {
            self.$emit("closePop")
            setTimeout(dsf.layer.toast(data.data.message), 1000)
          }
          self.$toast.clear()
        });
    },
    deleteFile(data) {
      dsf.http.post(`/fn/mobileFileUpload/delete?pk=${this.formInfo.info_id}&fileId=${data.id}&nrType=${this.fileData.attachType}&moduleId=${this.formInfo.moduleId}&fileName=${data.title}`)
        .then(res => {
          console.log(res)
          if (res.data.result) {
            this.$emit("deleteFile", data)
            this.fileData.file.forEach((item, index) => {
              if (item.id == data.id) {
                this.fileData.file.splice(index, 1)
              }
            })
            this.$set(this.fileData, "file", this.fileData.file)
          } else {
            dsf.layer.toast(res.data.message)
          }

        })
    }
  }
};
</script>
<style lang="scss" scoped>
.ds-enclosure-item {
  .__file_bt {
    width: 102px;
  }

  .__file_button {
    width: 48px;
    margin: 0 2px;
  }
}

.EnclosureItemToWPS {
  >>>.fileTypeList {
    .van-field__label {
      width: 70%;
    }
  }
}
</style>
<style lang='scss' scoped>
// @import '../../assets/font/font.css';

@import '../../assets/styles/themes.scss';

@import '../../assets/styles/mixin.scss';

// 附件-悬浮按钮
.ds-enclosure-item {
  width: 100%;
  height: 64px;
  padding: 12px 102px 12px 56px;
  position: relative;

  .__file {
    &_icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 56px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;

      i {
        font-size: 36px;
        color: #999;
      }
    }

    &_title {
      line-height: 22px;
      @include font_4();
      color: #333;
      margin-bottom: 3px;
    }

    &_size {
      line-height: 19px;
      @include font_6();
      color: #999;
    }

    &_bt {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 10px;
      box-sizing: border-box;
      width: 102px;
      @include font_6();
      font-size: var(--font_size_3);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
    }

    &_button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 22px;
      color: #999;
      border: 1px solid #ebebeb;
      border-radius: 20px;
    }
  }

}

.iconIMAGE {
  color: #49C9A7 !important;
}

.iconTXT {
  color: #A6A6A6 !important;
}

.iconPDF {
  color: #E21607 !important;
}

.iconWORD {
  color: #2A5699 !important;
}

.iconEXCEL {
  color: #207245 !important;
}

.iconPPT {
  color: #D33922 !important;
}

.iconOTHER {
  color: #AEBFCD !important;
}
</style>
<style lang="scss" scoped>
@import '../common/common.scss';

.fileTypeList {
  padding: 0 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 6px;

  .fileTypeName {
    button {
      color: white;
    }
  }

  .fileBody {
    width: 80%;
  }

  .fileList {
    padding-left: 10px;
    // padding-bottom:6px;
    // border-bottom:1px solid #e5e5e5;
  }

  .fileIcon {
    width: 38px;
    height: 48px;
    margin-right: 10px;
    line-height: 48px;

    i {
      margin-top: 10px;
      font-size: 36px;
      color: #999;
    }
  }

  .fileBody {
    height: 48px;
  }

  .fileBtn {
    text-align: right;

    .fileButton {
      display: inline-block;
      // width:48px;
      margin: 0 2px;
      text-align: center;
      border-radius: 24px;
      border: 1px solid #e5e5e5;
      white-space: nowrap;
      padding: 0 12px;
      font-size: var(--font_size_3);
    }
  }
}
</style><style lang="scss">
.fileTypeList {
  .van-cell {
    padding: 15px 10px 5px;

    ::after {
      border: none;
    }
  }

  .van-cell:not(:last-child)::after {
    border: none;
  }
}
</style>
